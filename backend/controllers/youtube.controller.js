const axios = require('axios');
const Joi = require('joi');

// In-memory cache for channel data (uploads playlist IDs)
// In production, use Redis or MongoDB
const channelCache = new Map();
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

// Extract YouTube video ID from various URL formats
function extractVideoId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

// Extract channel handle from URL (e.g., @ChannelName)
function extractChannelHandle(url) {
  const patterns = [
    /youtube\.com\/@([^/?]+)/,
    /youtube\.com\/c\/([^/?]+)/,
    /youtube\.com\/user\/([^/?]+)/,
    /youtube\.com\/channel\/([^/?]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return { handle: match[1], isChannelId: pattern.source.includes('channel') };
    }
  }
  return null;
}

// Get cached channel data or fetch fresh
async function getCachedChannelData(channelId) {
  const cached = channelCache.get(channelId);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    console.log(`📦 Using cached data for channel: ${channelId}`);
    return cached.data;
  }
  return null;
}

// Cache channel data
function setCachedChannelData(channelId, data) {
  channelCache.set(channelId, {
    data,
    timestamp: Date.now()
  });
}

// QUOTA-OPTIMIZED: Get uploads playlist ID from channel (1 unit)
async function getUploadsPlaylistId(channelId, apiKey) {
  // Check cache first
  const cached = await getCachedChannelData(channelId);
  if (cached?.uploadsPlaylistId) {
    return cached;
  }

  console.log(`🔍 Fetching uploads playlist for channel: ${channelId}`);

  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/channels`,
    {
      params: {
        part: 'contentDetails,snippet',
        id: channelId,
        key: apiKey
      },
      timeout: 10000
    }
  );

  if (!response.data.items || response.data.items.length === 0) {
    throw new Error('Channel not found');
  }

  const channel = response.data.items[0];
  const uploadsPlaylistId = channel.contentDetails?.relatedPlaylists?.uploads;

  if (!uploadsPlaylistId) {
    throw new Error('Could not find uploads playlist for this channel');
  }

  const channelData = {
    channelId: channel.id,
    name: channel.snippet.title,
    description: channel.snippet.description,
    avatar: channel.snippet.thumbnails?.high?.url ||
      channel.snippet.thumbnails?.medium?.url ||
      channel.snippet.thumbnails?.default?.url,
    uploadsPlaylistId
  };

  // Cache the data
  setCachedChannelData(channelId, channelData);

  return channelData;
}

// QUOTA-OPTIMIZED: Get videos from uploads playlist (1 unit instead of 100!)
async function getVideosFromPlaylist(playlistId, apiKey, maxResults = 10) {
  console.log(`🎬 Fetching videos from playlist: ${playlistId} (max: ${maxResults})`);

  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/playlistItems`,
    {
      params: {
        part: 'snippet',
        playlistId: playlistId,
        maxResults: Math.min(maxResults, 50), // API limit is 50
        key: apiKey
      },
      timeout: 10000
    }
  );

  const items = response.data.items || [];

  return items.map(item => ({
    videoId: item.snippet.resourceId?.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails?.maxres?.url ||
      item.snippet.thumbnails?.high?.url ||
      item.snippet.thumbnails?.medium?.url ||
      item.snippet.thumbnails?.default?.url,
    author: item.snippet.channelTitle,
    channelId: item.snippet.channelId,
    publishedAt: item.snippet.publishedAt,
    description: item.snippet.description
  })).filter(video => video.videoId); // Filter out deleted videos
}

// Get video info - uses oEmbed first (FREE), then API as fallback
exports.getVideoInfo = async (req, res, next) => {
  try {
    const schema = Joi.object({
      url: Joi.string().required()
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Invalid YouTube URL' });
    }

    const videoId = extractVideoId(value.url);
    if (!videoId) {
      return res.status(400).json({ message: 'Could not extract video ID from URL. Please use a valid YouTube URL format.' });
    }

    console.log('Extracted video ID:', videoId);

    // Always have thumbnail ready (this always works)
    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const thumbnailHQ = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    // Try YouTube oEmbed API FIRST (FREE, no API key, no quota!)
    try {
      const oEmbedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
      const response = await axios.get(oEmbedUrl, { timeout: 5000 });

      // oEmbed doesn't give us channelId, so we need to get it from API if available
      let channelId = null;
      if (process.env.YOUTUBE_API_KEY) {
        try {
          const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`;
          const apiResponse = await axios.get(apiUrl, { timeout: 5000 });
          if (apiResponse.data.items && apiResponse.data.items.length > 0) {
            channelId = apiResponse.data.items[0].snippet.channelId;
          }
        } catch (apiErr) {
          console.warn('Could not fetch channelId from API, continuing without it');
        }
      }

      return res.json({
        videoId: videoId,
        title: response.data.title,
        thumbnail: response.data.thumbnail_url || thumbnail,
        author: response.data.author_name,
        channelId: channelId,
        html: response.data.html
      });
    } catch (oEmbedErr) {
      console.error('YouTube oEmbed API error:', oEmbedErr.message);
    }

    // Fallback: Try YouTube Data API v3 if oEmbed fails
    if (process.env.YOUTUBE_API_KEY) {
      console.log('Using YouTube Data API v3 as fallback');
      try {
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`;
        console.log('Fetching from YouTube API:', apiUrl.replace(process.env.YOUTUBE_API_KEY, 'API_KEY_HIDDEN'));
        const apiResponse = await axios.get(apiUrl, { timeout: 10000 });

        if (apiResponse.data.items && apiResponse.data.items.length > 0) {
          const snippet = apiResponse.data.items[0].snippet;
          console.log('Successfully fetched video:', snippet.title);
          return res.json({
            videoId: videoId,
            title: snippet.title,
            thumbnail: snippet.thumbnails.maxres?.url || snippet.thumbnails.standard?.url || snippet.thumbnails.high?.url || thumbnail,
            author: snippet.channelTitle,
            channelId: snippet.channelId,
            description: snippet.description
          });
        }
      } catch (apiErr) {
        console.error('YouTube Data API error:', apiErr.message);
      }
    }

    // Final fallback: return basic info with video ID and thumbnail
    return res.json({
      videoId: videoId,
      title: `YouTube Video (ID: ${videoId})`,
      thumbnail: thumbnail,
      author: 'YouTube',
      channelId: null,
      note: 'Video details could not be fetched, but thumbnail is available'
    });
  } catch (err) {
    console.error('YouTube controller error:', err);
    return res.status(500).json({ message: 'Error fetching video information: ' + err.message });
  }
};

// QUOTA-OPTIMIZED: Get channel videos using playlistItems (1-3 units total!)
exports.getChannelVideos = async (req, res) => {
  try {
    if (!process.env.YOUTUBE_API_KEY) {
      return res.status(500).json({
        message: 'YouTube API key missing. Set YOUTUBE_API_KEY in backend .env.',
        details: 'See YOUTUBE_API_SETUP.md for instructions'
      });
    }

    const schema = Joi.object({
      channelId: Joi.string().required(),
      query: Joi.string().allow(''),
      maxResults: Joi.number().integer().min(1).max(50).default(15),
      order: Joi.string().valid('date', 'viewCount', 'rating', 'relevance').default('date'),
    });

    const { error, value } = schema.validate(req.query);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;

    // Step 1: Get uploads playlist ID (cached, 1 unit if not cached)
    let channelData;
    try {
      channelData = await getUploadsPlaylistId(value.channelId, apiKey);
    } catch (err) {
      console.error('Error getting uploads playlist:', err.message);
      return res.status(500).json({
        message: 'Failed to fetch channel data.',
        details: err.message,
        hint: 'The channel may not exist or the API quota may be exceeded.'
      });
    }

    // Step 2: Get videos from uploads playlist (1 unit!)
    let videos;
    try {
      videos = await getVideosFromPlaylist(
        channelData.uploadsPlaylistId,
        apiKey,
        value.maxResults
      );
    } catch (err) {
      console.error('Error getting playlist videos:', err.message);

      // Handle specific errors
      if (err.response?.status === 403) {
        return res.status(500).json({
          message: 'YouTube API quota exceeded or access denied.',
          details: 'Your daily quota may be exceeded. Try again tomorrow or contact support.',
          hint: 'You can still create campaigns by pasting video URLs directly.'
        });
      }

      return res.status(500).json({
        message: 'Failed to load channel videos.',
        details: err.message,
        hint: 'You can still create campaigns by pasting video URLs directly.'
      });
    }

    // If query is provided, filter results (no API call needed!)
    if (value.query && value.query.trim()) {
      const query = value.query.toLowerCase().trim();
      videos = videos.filter(video =>
        video.title.toLowerCase().includes(query)
      );
    }

    console.log(`✅ Successfully fetched ${videos.length} videos from channel (quota-optimized)`);
    return res.json({ videos });

  } catch (err) {
    console.error('getChannelVideos error:', err.message);
    return res.status(500).json({
      message: 'Failed to load channel videos.',
      details: err.message,
      hint: 'You can still create campaigns by pasting video URLs directly.'
    });
  }
};

// Get channel info - optimized with caching
exports.getChannelInfo = async (req, res, next) => {
  try {
    const { channelId, videoUrl } = req.query;

    if (!channelId && !videoUrl) {
      return res.status(400).json({ message: 'Either channelId or videoUrl is required' });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    let targetChannelId = channelId;

    // If videoUrl is provided, extract channelId from it
    if (videoUrl && !channelId) {
      // Check if it's a channel URL
      const channelHandle = extractChannelHandle(videoUrl);

      if (channelHandle) {
        if (channelHandle.isChannelId) {
          // Direct channel ID from URL
          targetChannelId = channelHandle.handle;
        } else if (apiKey) {
          // Need to resolve handle to channel ID (1 search call - cache this!)
          try {
            // Check cache first
            const cacheKey = `handle_${channelHandle.handle}`;
            const cached = await getCachedChannelData(cacheKey);
            if (cached?.channelId) {
              targetChannelId = cached.channelId;
            } else {
              console.log(`🔍 Resolving handle @${channelHandle.handle} to channel ID`);
              const searchResponse = await axios.get(
                `https://www.googleapis.com/youtube/v3/search`,
                {
                  params: {
                    part: 'snippet',
                    q: channelHandle.handle,
                    type: 'channel',
                    maxResults: 1,
                    key: apiKey
                  },
                  timeout: 10000
                }
              );

              if (searchResponse.data.items && searchResponse.data.items.length > 0) {
                targetChannelId = searchResponse.data.items[0].snippet.channelId;
                // Cache the handle -> channelId mapping
                setCachedChannelData(cacheKey, { channelId: targetChannelId });
              }
            }
          } catch (err) {
            console.error('Error resolving channel handle:', err.message);
          }
        }
      } else {
        // It's a video URL, extract channelId from video
        const videoId = extractVideoId(videoUrl);
        if (videoId && apiKey) {
          try {
            // Try oEmbed first, but we need channelId from API
            const videoApiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;
            const videoResponse = await axios.get(videoApiUrl, { timeout: 10000 });

            if (videoResponse.data.items && videoResponse.data.items.length > 0) {
              targetChannelId = videoResponse.data.items[0].snippet.channelId;
            }
          } catch (err) {
            console.error('Error fetching video info:', err.message);
          }
        }
      }
    }

    if (!targetChannelId) {
      return res.status(400).json({ message: 'Could not determine channel ID' });
    }

    // Get channel information (uses cache)
    if (apiKey) {
      try {
        const channelData = await getUploadsPlaylistId(targetChannelId, apiKey);
        return res.json({
          channelId: channelData.channelId,
          name: channelData.name,
          description: channelData.description,
          avatar: channelData.avatar,
          uploadsPlaylistId: channelData.uploadsPlaylistId
        });
      } catch (err) {
        console.error('Error fetching channel info:', err.message);

        // Handle quota exceeded
        if (err.response?.status === 403) {
          return res.status(500).json({
            message: 'YouTube API quota exceeded',
            details: 'Daily quota limit reached. Try again tomorrow.',
            channelId: targetChannelId
          });
        }

        // Fallback: return basic info
        return res.json({
          channelId: targetChannelId,
          name: 'YouTube Channel',
          description: '',
          avatar: null,
          note: 'Channel details could not be fetched. API quota may be exceeded.'
        });
      }
    }

    // No API key fallback
    return res.json({
      channelId: targetChannelId,
      name: 'YouTube Channel',
      description: '',
      avatar: null,
      note: 'YouTube API key required for full channel information'
    });
  } catch (err) {
    console.error('getChannelInfo error:', err.message);
    return res.status(500).json({ message: 'Failed to fetch channel information' });
  }
};

// Utility: Clear cache (for admin use)
exports.clearCache = async (req, res) => {
  try {
    const cacheSize = channelCache.size;
    channelCache.clear();
    console.log(`🗑️ Cache cleared. Removed ${cacheSize} entries.`);
    return res.json({
      message: 'Cache cleared successfully',
      entriesRemoved: cacheSize
    });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to clear cache' });
  }
};

// Utility: Get cache stats (for admin use)
exports.getCacheStats = async (req, res) => {
  try {
    const stats = {
      size: channelCache.size,
      entries: []
    };

    channelCache.forEach((value, key) => {
      stats.entries.push({
        key,
        age: Math.round((Date.now() - value.timestamp) / 1000 / 60) + ' minutes',
        hasData: !!value.data
      });
    });

    return res.json(stats);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to get cache stats' });
  }
};
