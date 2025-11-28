const axios = require('axios');
const Joi = require('joi');

// Extract YouTube video ID from various URL formats
function extractVideoId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

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

    // Always return thumbnail (this always works)
    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    const thumbnailHQ = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    // Try YouTube Data API v3 first if API key is available (most reliable)
    if (process.env.YOUTUBE_API_KEY) {
      console.log('Using YouTube Data API v3 with API key');
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

    // Try YouTube oEmbed API (free, no API key required)
    try {
      const oEmbedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
      const response = await axios.get(oEmbedUrl, { timeout: 5000 });
      
      const videoData = {
        videoId: videoId,
        title: response.data.title,
        thumbnail: response.data.thumbnail_url || thumbnail,
        author: response.data.author_name,
        html: response.data.html
      };
      
      return res.json(videoData);
    } catch (oEmbedErr) {
      console.error('YouTube oEmbed API error:', oEmbedErr.message);
      
      // Fallback: return basic info with video ID and thumbnail (always works)
      return res.json({
        videoId: videoId,
        title: `YouTube Video (ID: ${videoId})`,
        thumbnail: thumbnail,
        author: 'YouTube',
        channelId: null,
        note: 'Video details could not be fetched, but thumbnail is available'
      });
    }
  } catch (err) {
    console.error('YouTube controller error:', err);
    return res.status(500).json({ message: 'Error fetching video information: ' + err.message });
  }
};

exports.getChannelVideos = async (req, res) => {
  try {
    if (!process.env.YOUTUBE_API_KEY) {
      return res
        .status(500)
        .json({ 
          message: 'YouTube API key missing. Set YOUTUBE_API_KEY in backend .env.',
          details: 'See YOUTUBE_API_SETUP.md for instructions'
        });
    }

    const schema = Joi.object({
      channelId: Joi.string().required(),
      query: Joi.string().allow(''),
      maxResults: Joi.number().integer().min(1).max(25).default(12),
      order: Joi.string().valid('date', 'viewCount', 'rating', 'relevance').default('date'),
    });

    const { error, value } = schema.validate(req.query);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const params = new URLSearchParams({
      key: process.env.YOUTUBE_API_KEY,
      part: 'snippet',
      channelId: value.channelId,
      maxResults: value.maxResults,
      order: value.order,
      type: 'video',
    });

    if (value.query) {
      params.append('q', value.query);
    }

    const apiUrl = `https://www.googleapis.com/youtube/v3/search?${params.toString()}`;
    console.log('Fetching channel videos from YouTube API...');
    
    const response = await axios.get(apiUrl, { timeout: 10000 });

    const items = response.data.items || [];
    const videos = items.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail:
        item.snippet.thumbnails.maxres?.url ||
        item.snippet.thumbnails.high?.url ||
        item.snippet.thumbnails.medium?.url,
      author: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      description: item.snippet.description,
    }));

    console.log(`Successfully fetched ${videos.length} videos from channel`);
    return res.json({ videos });
  } catch (err) {
    console.error('getChannelVideos error:', err.message);
    
    // Provide more detailed error message
    let errorMessage = 'Failed to load channel videos.';
    let errorDetails = '';
    
    if (err.response) {
      const status = err.response.status;
      if (status === 403) {
        errorMessage = 'YouTube API access forbidden (403)';
        errorDetails = 'This usually means: 1) Daily quota exceeded, 2) YouTube Data API v3 is not enabled, or 3) API key has restrictions. See YOUTUBE_API_SETUP.md for help.';
      } else if (status === 400) {
        errorMessage = 'Invalid YouTube API request (400)';
        errorDetails = err.response.data?.error?.message || 'Check if the channel ID is valid.';
      } else if (status === 404) {
        errorMessage = 'Channel not found (404)';
        errorDetails = 'The channel ID may be invalid or the channel may have been deleted.';
      }
    }
    
    return res.status(500).json({ 
      message: errorMessage,
      details: errorDetails,
      hint: 'You can still create campaigns by pasting video URLs directly.'
    });
  }
};

exports.getChannelInfo = async (req, res, next) => {
  try {
    const { channelId, videoUrl } = req.query;
    
    if (!channelId && !videoUrl) {
      return res.status(400).json({ message: 'Either channelId or videoUrl is required' });
    }

    let targetChannelId = channelId;

    // If videoUrl is provided, extract channelId from it
    if (videoUrl && !channelId) {
      // Check if it's a channel URL (not a video URL)
      const isChannelUrl = videoUrl.includes('youtube.com/channel/') || 
                          videoUrl.includes('youtube.com/@') || 
                          videoUrl.includes('youtube.com/c/') || 
                          videoUrl.includes('youtube.com/user/');
      
      if (isChannelUrl && !videoUrl.includes('watch') && !videoUrl.includes('youtu.be')) {
        // It's a channel URL, try to get channel ID directly or find a video from this channel
        if (videoUrl.includes('youtube.com/channel/')) {
          // Extract channel ID directly
          const match = videoUrl.match(/youtube\.com\/channel\/([^/?]+)/);
          if (match && match[1]) {
            targetChannelId = match[1];
          }
        } else if (process.env.YOUTUBE_API_KEY) {
          // For @username, /c/, or /user/ formats, we need to find the channel
          try {
            let handle = '';
            let searchType = 'channel';
            
            // Extract handle/username from URL
            if (videoUrl.includes('youtube.com/@')) {
              handle = videoUrl.match(/youtube\.com\/@([^/?]+)/)?.[1] || '';
              if (handle) {
                // For @username, search for channels and try to match by customUrl
                // First, get channel IDs from search
                const channelSearchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(handle)}&type=channel&maxResults=10&key=${process.env.YOUTUBE_API_KEY}`;
                const channelSearchResponse = await axios.get(channelSearchUrl, { timeout: 10000 });
                
                if (channelSearchResponse.data.items && channelSearchResponse.data.items.length > 0) {
                  // Get detailed info for top results to check customUrl
                  const channelIds = channelSearchResponse.data.items.slice(0, 5).map(item => item.snippet.channelId).join(',');
                  const channelsDetailUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=${channelIds}&key=${process.env.YOUTUBE_API_KEY}`;
                  
                  try {
                    const channelsDetailResponse = await axios.get(channelsDetailUrl, { timeout: 10000 });
                    if (channelsDetailResponse.data.items && channelsDetailResponse.data.items.length > 0) {
                      // Try to find exact match by customUrl (handle with or without @)
                      const exactMatch = channelsDetailResponse.data.items.find(item => {
                        const customUrl = item.snippet.customUrl;
                        if (!customUrl) return false;
                        const cleanCustomUrl = customUrl.replace(/^@/, '').toLowerCase();
                        const cleanHandle = handle.toLowerCase();
                        return cleanCustomUrl === cleanHandle || customUrl === `@${handle}` || customUrl === handle;
                      });
                      
                      if (exactMatch) {
                        targetChannelId = exactMatch.id;
                      } else {
                        // Use first result from search
                        targetChannelId = channelSearchResponse.data.items[0].snippet.channelId;
                      }
                    } else {
                      // Fallback to search result
                      targetChannelId = channelSearchResponse.data.items[0].snippet.channelId;
                    }
                  } catch (detailErr) {
                    // If detail fetch fails, use first search result
                    console.error('Error fetching channel details:', detailErr.message);
                    targetChannelId = channelSearchResponse.data.items[0].snippet.channelId;
                  }
                } else {
                  // Fallback: search for a video from this channel
                  const videoSearchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(handle)}&type=video&maxResults=1&key=${process.env.YOUTUBE_API_KEY}`;
                  const videoSearchResponse = await axios.get(videoSearchUrl, { timeout: 10000 });
                  
                  if (videoSearchResponse.data.items && videoSearchResponse.data.items.length > 0) {
                    const firstVideo = videoSearchResponse.data.items[0];
                    const videoApiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${firstVideo.id.videoId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`;
                    const videoResponse = await axios.get(videoApiUrl, { timeout: 10000 });
                    
                    if (videoResponse.data.items && videoResponse.data.items.length > 0) {
                      targetChannelId = videoResponse.data.items[0].snippet.channelId;
                    }
                  }
                }
              }
            } else if (videoUrl.includes('youtube.com/c/')) {
              const customUrl = videoUrl.match(/youtube\.com\/c\/([^/?]+)/)?.[1] || '';
              // Search for channel by custom URL
              const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(customUrl)}&type=channel&maxResults=5&key=${process.env.YOUTUBE_API_KEY}`;
              const searchResponse = await axios.get(searchUrl, { timeout: 10000 });
              
              if (searchResponse.data.items && searchResponse.data.items.length > 0) {
                // Find the channel that matches the custom URL
                const matchingChannel = searchResponse.data.items.find(item => 
                  item.snippet.customUrl && item.snippet.customUrl.includes(customUrl)
                );
                if (matchingChannel) {
                  targetChannelId = matchingChannel.snippet.channelId;
                } else {
                  // Use first result
                  targetChannelId = searchResponse.data.items[0].snippet.channelId;
                }
              }
            } else if (videoUrl.includes('youtube.com/user/')) {
              const username = videoUrl.match(/youtube\.com\/user\/([^/?]+)/)?.[1] || '';
              // Search for channel by username
              const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(username)}&type=channel&maxResults=1&key=${process.env.YOUTUBE_API_KEY}`;
              const searchResponse = await axios.get(searchUrl, { timeout: 10000 });
              
              if (searchResponse.data.items && searchResponse.data.items.length > 0) {
                targetChannelId = searchResponse.data.items[0].snippet.channelId;
              }
            }
          } catch (err) {
            console.error('Error searching for channel:', err.message);
            // If search fails, try to get a video from the channel URL
            try {
              // Try to fetch the channel page and extract channel ID from a video
              // This is a fallback approach
              const handle = videoUrl.match(/youtube\.com\/@([^/?]+)/)?.[1] || 
                           videoUrl.match(/youtube\.com\/c\/([^/?]+)/)?.[1] || 
                           videoUrl.match(/youtube\.com\/user\/([^/?]+)/)?.[1] || '';
              
              if (handle) {
                const videoSearchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(handle)}&type=video&maxResults=1&key=${process.env.YOUTUBE_API_KEY}`;
                const videoSearchResponse = await axios.get(videoSearchUrl, { timeout: 10000 });
                
                if (videoSearchResponse.data.items && videoSearchResponse.data.items.length > 0) {
                  const firstVideo = videoSearchResponse.data.items[0];
                  const videoApiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${firstVideo.id.videoId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`;
                  const videoResponse = await axios.get(videoApiUrl, { timeout: 10000 });
                  
                  if (videoResponse.data.items && videoResponse.data.items.length > 0) {
                    targetChannelId = videoResponse.data.items[0].snippet.channelId;
                  }
                }
              }
            } catch (fallbackErr) {
              console.error('Fallback channel search also failed:', fallbackErr.message);
            }
          }
        }
      } else {
        // It's a video URL, extract channelId from video
        const videoId = extractVideoId(videoUrl);
        if (!videoId) {
          return res.status(400).json({ message: 'Could not extract video ID from URL' });
        }

        // Get video info to extract channelId
        if (process.env.YOUTUBE_API_KEY) {
          try {
            const videoApiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`;
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

    // Get channel information
    if (process.env.YOUTUBE_API_KEY) {
      try {
        const channelApiUrl = `https://www.googleapis.com/youtube/v3/channels?id=${targetChannelId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet,statistics`;
        const channelResponse = await axios.get(channelApiUrl, { timeout: 10000 });
        
        if (channelResponse.data.items && channelResponse.data.items.length > 0) {
          const channel = channelResponse.data.items[0];
          return res.json({
            channelId: channel.id,
            name: channel.snippet.title,
            description: channel.snippet.description,
            avatar: channel.snippet.thumbnails.high?.url || channel.snippet.thumbnails.medium?.url || channel.snippet.thumbnails.default?.url,
            subscriberCount: channel.statistics?.subscriberCount || 0,
            videoCount: channel.statistics?.videoCount || 0,
            viewCount: channel.statistics?.viewCount || 0,
          });
        }
      } catch (err) {
        console.error('Error fetching channel info:', err.message);
        // Fallback: return basic info
        return res.json({
          channelId: targetChannelId,
          name: 'YouTube Channel',
          description: '',
          avatar: null,
          subscriberCount: 0,
          videoCount: 0,
          viewCount: 0,
          note: 'Channel details could not be fetched. API quota may be exceeded.'
        });
      }
    }

    // Fallback if no API key
    return res.json({
      channelId: targetChannelId,
      name: 'YouTube Channel',
      description: '',
      avatar: null,
      subscriberCount: 0,
      videoCount: 0,
      viewCount: 0,
      note: 'YouTube API key required for full channel information'
    });
  } catch (err) {
    console.error('getChannelInfo error:', err.message);
    return res.status(500).json({ message: 'Failed to fetch channel information' });
  }
};
