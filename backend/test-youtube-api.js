require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.YOUTUBE_API_KEY;
const TEST_CHANNEL_ID = 'UCstnglENMRhOF17cD6iH6kA'; // DesiNerd channel

console.log('='.repeat(60));
console.log('YouTube API Key Test');
console.log('='.repeat(60));
console.log();

if (!API_KEY) {
  console.error('❌ YOUTUBE_API_KEY not found in .env file');
  process.exit(1);
}

console.log('✅ API Key found:', API_KEY.substring(0, 10) + '...');
console.log();

async function testAPI() {
  try {
    // Test 1: Search for videos in a channel
    console.log('Test 1: Searching for videos in channel...');
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&channelId=${TEST_CHANNEL_ID}&maxResults=5&order=date&type=video`;
    
    const searchResponse = await axios.get(searchUrl);
    console.log('✅ Search API works!');
    console.log(`   Found ${searchResponse.data.items.length} videos`);
    console.log('   Sample video:', searchResponse.data.items[0]?.snippet?.title || 'N/A');
    console.log();

    // Test 2: Get quota usage info
    console.log('Test 2: Checking API quota...');
    console.log('   Note: This test uses 100 quota units');
    console.log('   Daily free quota: 10,000 units (~100 searches)');
    console.log('   Current usage: Check Google Cloud Console');
    console.log();

    // Test 3: Get video details
    console.log('Test 3: Getting video details...');
    const videoId = 'UeMRWvrt7q4'; // Sample video
    const videoUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`;
    
    const videoResponse = await axios.get(videoUrl);
    if (videoResponse.data.items && videoResponse.data.items.length > 0) {
      console.log('✅ Video API works!');
      console.log('   Video:', videoResponse.data.items[0].snippet.title);
      console.log('   Channel:', videoResponse.data.items[0].snippet.channelTitle);
    }
    console.log();

    console.log('='.repeat(60));
    console.log('✅ ALL TESTS PASSED!');
    console.log('='.repeat(60));
    console.log();
    console.log('Your YouTube API key is working correctly.');
    console.log('If you still see errors in the app:');
    console.log('  1. Restart the backend server');
    console.log('  2. Clear browser cache');
    console.log('  3. Check that the channel ID is valid');
    console.log();

  } catch (error) {
    console.error('❌ API Test Failed!');
    console.error();
    
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      
      console.error(`Status: ${status}`);
      console.error(`Message: ${data.error?.message || 'Unknown error'}`);
      console.error();
      
      if (status === 403) {
        console.error('⚠️  403 Forbidden Error - Possible causes:');
        console.error('   1. Daily quota exceeded (10,000 units/day)');
        console.error('   2. YouTube Data API v3 not enabled for this key');
        console.error('   3. API key has restrictions (IP/referrer)');
        console.error();
        console.error('Solutions:');
        console.error('   1. Check quota: https://console.cloud.google.com/apis/api/youtube.googleapis.com/quotas');
        console.error('   2. Enable API: https://console.cloud.google.com/apis/library/youtube.googleapis.com');
        console.error('   3. Check key restrictions: https://console.cloud.google.com/apis/credentials');
      } else if (status === 400) {
        console.error('⚠️  400 Bad Request - Possible causes:');
        console.error('   1. Invalid API key format');
        console.error('   2. Invalid parameters in request');
        console.error('   3. API key may be revoked');
      } else if (status === 404) {
        console.error('⚠️  404 Not Found - Channel ID may be invalid');
      }
      
      console.error();
      console.error('See YOUTUBE_API_SETUP.md for detailed setup instructions.');
    } else {
      console.error('Error:', error.message);
    }
    
    console.error();
    console.error('='.repeat(60));
    process.exit(1);
  }
}

testAPI();

