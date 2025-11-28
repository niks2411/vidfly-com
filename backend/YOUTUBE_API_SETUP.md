# YouTube API Setup Guide

## Current Issue
Your YouTube API key is returning 403 (Forbidden) errors when fetching channel videos. This usually means:

1. **Daily Quota Exceeded** - Free tier has 10,000 units/day
2. **API Not Enabled** - YouTube Data API v3 Search must be enabled
3. **API Key Restrictions** - The key might have IP/referrer restrictions

## Solution Steps

### Option 1: Check Current API Key (Recommended)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Find your API key: `AIzaSyDlHcAM3-sl35iFJVpXqckinK2kErhdZCc`
5. Check:
   - **Quota**: Go to **APIs & Services** → **Dashboard** → **YouTube Data API v3**
   - Click on "Quotas" to see usage
   - **Enabled APIs**: Ensure "YouTube Data API v3" is enabled
   - **API Restrictions**: Click "Edit API key" and check restrictions
     - Should be set to "Don't restrict key" or include "YouTube Data API v3"
   - **Application Restrictions**: 
     - Should be "None" or
     - Add your server IP if using IP restrictions

### Option 2: Create New API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing)
3. Enable **YouTube Data API v3**:
   - Go to **APIs & Services** → **Library**
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. Create credentials:
   - Go to **APIs & Services** → **Credentials**
   - Click **+ CREATE CREDENTIALS** → **API Key**
   - Copy the new API key
5. Update `.env` file:
   ```
   YOUTUBE_API_KEY=YOUR_NEW_API_KEY_HERE
   ```
6. Restart the backend server

### Option 3: Use Alternative Method (No API Key)

If you don't want to deal with API keys, we can modify the code to work without channel video fetching:

1. Users can still create campaigns by pasting video URLs
2. Skip the "Select Videos" step for channel promotion
3. Use the basic video info (which works without Search API)

## Testing

After updating the API key, test with:

```bash
# In backend directory
node test-youtube-api.js
```

Or test the endpoint directly:
```
GET http://localhost:5000/api/youtube/channel-videos?channelId=UCstnglENMRhOF17cD6iH6kA&maxResults=5&order=date
```

## API Quota Info

YouTube Data API v3 costs:
- Search: 100 units per request
- Videos.list: 1 unit per request
- Daily free quota: 10,000 units = ~100 searches/day

To increase quota:
1. Go to Google Cloud Console
2. **APIs & Services** → **YouTube Data API v3** → **Quotas**
3. Request quota increase (may require billing account)

## Current Configuration

Your `.env` file has:
```
YOUTUBE_API_KEY=AIzaSyDlHcAM3-sl35iFJVpXqckinK2kErhdZCc
```

**Action Required**: Check this key in Google Cloud Console and verify:
- ✅ YouTube Data API v3 is enabled
- ✅ Quota is not exceeded (< 10,000 units today)
- ✅ No API restrictions blocking the request
- ✅ No application restrictions (IP/referrer) blocking your server

