const https = require('https');

function getCDNUrl(photoId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'unsplash.com',
      port: 443,
      path: `/photos/${photoId}`,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`Failed with status code ${res.statusCode}`));
          return;
        }
        
        // Match the CDN URL containing the ID
        // The CDN URL usually looks like https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1...
        // Let's search for any images.unsplash.com/photo-
        const regex = new RegExp(`images\\.unsplash\\.com/(photo-[a-zA-Z0-9\\-]+)`, 'g');
        const matches = new Set();
        let match;
        while ((match = regex.exec(data)) !== null) {
          matches.add(match[1]);
        }
        resolve(Array.from(matches));
      });
    });

    req.on('error', (e) => {
      reject(e);
    });
    req.end();
  });
}

async function run() {
  const ids = ['BtRXlT90ZPk', 'fWa8ZtfjUHI', 'Ne2J4xeXomQ', 'VuM21ojgYv0', 'LKN6tpAWbaw', 'fO2myfwWhU0'];
  for (const id of ids) {
    try {
      console.log(`Fetching CDN URL for ${id}...`);
      const urls = await getCDNUrl(id);
      console.log(`Results for ${id}:`, urls);
    } catch (e) {
      console.log(`Error for ${id}:`, e.message);
    }
  }
}

run();
