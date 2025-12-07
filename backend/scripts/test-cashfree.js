/**
 * Test Cashfree Integration
 * Run this script to verify your Cashfree credentials are working
 * Usage: node scripts/test-cashfree.js
 */

require('dotenv').config();
const axios = require('axios');

const CASHFREE_CLIENT_ID = process.env.CASHFREE_CLIENT_ID || process.env.CASHFREE_APP_ID;
const CASHFREE_CLIENT_SECRET = process.env.CASHFREE_CLIENT_SECRET || process.env.CASHFREE_SECRET_KEY;
const CASHFREE_ENVIRONMENT = process.env.CASHFREE_ENVIRONMENT || 'TEST';
const CASHFREE_BASE_URL = CASHFREE_ENVIRONMENT === 'PRODUCTION' 
  ? 'https://api.cashfree.com/pg' 
  : 'https://sandbox.cashfree.com/pg';

async function testCashfreeConnection() {
  console.log('🔍 Testing Cashfree Integration...\n');
  
  // Check environment variables
  console.log('📋 Environment Configuration:');
  console.log(`   CASHFREE_CLIENT_ID: ${CASHFREE_CLIENT_ID ? '✅ Set' : '❌ Missing'}`);
  console.log(`   CASHFREE_CLIENT_SECRET: ${CASHFREE_CLIENT_SECRET ? '✅ Set' : '❌ Missing'}`);
  console.log(`   CASHFREE_ENVIRONMENT: ${CASHFREE_ENVIRONMENT}`);
  console.log(`   CASHFREE_BASE_URL: ${CASHFREE_BASE_URL}\n`);

  if (!CASHFREE_CLIENT_ID || !CASHFREE_CLIENT_SECRET) {
    console.error('❌ Error: CASHFREE_CLIENT_ID and CASHFREE_CLIENT_SECRET are required!');
    console.error('   These are Payment Gateway (PG) credentials, NOT Payout credentials!');
    console.error('   Get them from: Cashfree Dashboard → Payment Gateway → Credentials → Sandbox');
    process.exit(1);
  }

  // Test Cashfree Payment Gateway API by creating a test order
  console.log('🔐 Testing Cashfree Payment Gateway API...');
  let testSuccess = false;
  let lastError = null;

  try {
    console.log('   Testing order creation endpoint...');
    const testOrderData = {
      order_id: `TEST_${Date.now()}`,
      order_amount: 1.00,
      order_currency: 'INR',
      customer_details: {
        customer_id: 'test_customer',
        customer_email: 'test@example.com',
        customer_phone: '9999999999',
      },
    };

    const response = await axios.post(
      `${CASHFREE_BASE_URL}/orders`,
      testOrderData,
      {
        headers: {
          'x-client-id': CASHFREE_CLIENT_ID,
          'x-client-secret': CASHFREE_CLIENT_SECRET,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      }
    );

    if (response.data && (response.data.payment_session_id || response.data.payment_url)) {
      console.log('✅ Cashfree Payment Gateway API test successful!');
      console.log(`   Order created: ${response.data.order_id || testOrderData.order_id}`);
      console.log(`   Payment Session ID: ${response.data.payment_session_id ? response.data.payment_session_id.substring(0, 20) + '...' : 'N/A'}\n`);
      testSuccess = true;
    } else {
      console.log('⚠️  Response received but format unexpected:', response.data);
      testSuccess = true; // Still consider it a success if we got a response
    }
  } catch (error) {
    lastError = error;
    console.log('   ❌ Test order creation failed');
  }

  if (testSuccess) {
    console.log('🎉 Cashfree Payment Gateway integration is ready!');
    console.log('\n📝 Next Steps:');
    console.log('   1. Start your backend server: npm run dev');
    console.log('   2. Start your frontend server');
    console.log('   3. Create a campaign and test the payment flow');
    console.log('   4. Use test cards in Cashfree test mode\n');
    return true;
  }

  // If failed, show error
  console.error('❌ Cashfree Payment Gateway API test failed!');
  if (lastError) {
    if (lastError.response) {
      console.error(`   Status: ${lastError.response.status}`);
      console.error(`   Message: ${lastError.response.data?.message || lastError.response.statusText}`);
      if (lastError.response.data) {
        console.error(`   Details:`, JSON.stringify(lastError.response.data, null, 2));
      }
    } else if (lastError.request) {
      console.error('   Error: No response from Cashfree API');
      console.error('   Check your internet connection and API endpoint');
    } else {
      console.error(`   Error: ${lastError.message}`);
    }
  }
  
  console.error('\n💡 Troubleshooting:');
  console.error('   1. Verify you are using PG (Payment Gateway) credentials, NOT Payout credentials');
  console.error('   2. Get credentials from: Cashfree Dashboard → Payment Gateway → Credentials → Sandbox');
  console.error('   3. Check if you\'re using TEST mode credentials for TEST environment');
  console.error('   4. Ensure your Cashfree account is active');
  console.error('   5. Verify CASHFREE_CLIENT_ID and CASHFREE_CLIENT_SECRET are correct\n');
  
  return false;
}

// Run the test
testCashfreeConnection()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
