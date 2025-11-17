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
        note: 'Video details could not be fetched, but thumbnail is available'
      });
    }
  } catch (err) {
    console.error('YouTube controller error:', err);
    return res.status(500).json({ message: 'Error fetching video information: ' + err.message });
  }
};
