const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config({ path: 'd:/workspace/projects/vidfly/backend/.env.development' });

async function test() {
  console.log('Testing HTTPS reachability...');
  try {
    const res = await axios.get('https://api.vidflyy.in/health');
    console.log('HTTPS api.vidflyy.in: OK', res.data);
  } catch (err) {
    console.error('HTTPS api.vidflyy.in: FAIL', err.message);
  }

  console.log('Testing MongoDB Atlas connection...');
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Atlas: OK');
    await mongoose.disconnect();
  } catch (err) {
    console.error('MongoDB Atlas: FAIL', err.message);
  }
}

test();
