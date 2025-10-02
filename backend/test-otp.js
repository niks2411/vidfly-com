require('dotenv').config();
const axios = require('axios');

const API_BASE = 'http://localhost:5000';

async function testOTP() {
  console.log('🧪 Testing OTP System...\n');

  // Test email
  const testEmail = 'ramlaldevi121@gmail.com';

  try {
    // Step 1: Send OTP
    console.log('📧 Step 1: Sending OTP...');
    const sendResponse = await axios.post(`${API_BASE}/api/auth/send-otp`, {
      email: testEmail
    });
    
    console.log('✅ OTP Send Response:', sendResponse.data);
    
    // Step 2: Prompt for OTP (in real scenario, user gets this from email)
    console.log('\n📱 Step 2: Check your email for OTP');
    console.log('💡 In development, check backend console for OTP or email');
    
    console.log('\n🔐 Step 3: OTP sent successfully!');
    console.log('📱 Check your email inbox for the 6-digit OTP code');
    console.log('💡 You can now test verification by calling:');
    console.log(`   curl -X POST ${API_BASE}/api/auth/verify-otp \\`);
    console.log(`     -H "Content-Type: application/json" \\`);
    console.log(`     -d '{"email": "${testEmail}", "otp": "YOUR_OTP_FROM_EMAIL"}'`);
    
    console.log('\n🧪 Step 4: Testing order creation (will fail without verification)');
    try {
      const orderResponse = await axios.post(`${API_BASE}/api/orders`, {
        customerName: 'Test Customer',
        email: testEmail,
        phone: '+91 9876543210',
        youtubeLink: 'https://youtube.com/watch?v=test',
        plan: {
          name: 'Test Plan',
          type: 'views',
          quantity: 1000,
          price: 299,
          currency: 'INR'
        }
      });
      console.log('❌ Unexpected: Order created without verification:', orderResponse.data);
    } catch (orderError) {
      if (orderError.response?.data?.code === 'EMAIL_NOT_VERIFIED') {
        console.log('✅ Correct: Order blocked due to unverified email');
        console.log('📧 Message:', orderError.response.data.message);
      } else {
        console.log('❌ Unexpected error:', orderError.response?.data || orderError.message);
      }
    }
    
    console.log('\n🎉 OTP sending test completed!');
    console.log('📝 Next: Check your email and verify with real OTP');
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure your backend server is running:');
      console.log('   cd backend && npm run dev');
    }
    
    if (error.response?.status === 500) {
      console.log('\n💡 Check your email configuration in .env file');
    }
  }
}

// Run the test
testOTP();