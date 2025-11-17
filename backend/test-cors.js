const axios = require('axios');

async function testCORS() {
  try {
    console.log('Testing CORS and backend connectivity...');
    
    // Test health endpoint
    const healthResponse = await axios.get('http://localhost:5000/health');
    console.log('✅ Health check passed:', healthResponse.data);
    
    // Test CORS with send-otp endpoint
    const otpResponse = await axios.post('http://localhost:5000/api/auth/send-otp', {
      email: 'test@example.com'
    }, {
      headers: {
        'Origin': 'http://localhost:5174',
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ OTP endpoint test passed:', otpResponse.data);
    
  } catch (error) {
    console.error('❌ Test failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received:', error.message);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testCORS();