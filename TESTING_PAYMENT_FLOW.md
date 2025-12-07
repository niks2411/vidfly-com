# Testing Cashfree Payment Integration

## ✅ Step 1: Verify Environment Variables

Make sure your `backend/.env` file has:

```env
CASHFREE_APP_ID=YOUR_TEST_APP_ID
CASHFREE_SECRET_KEY=YOUR_TEST_SECRET_KEY
CASHFREE_ENVIRONMENT=TEST
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000
DEFAULT_PAYMENT_GATEWAY=cashfree
```

## ✅ Step 2: Test Cashfree Connection

Run the test script to verify your credentials:

```bash
cd backend
node scripts/test-cashfree.js
```

**Expected Output:**
```
🔍 Testing Cashfree Integration...

📋 Environment Configuration:
   CASHFREE_APP_ID: ✅ Set
   CASHFREE_SECRET_KEY: ✅ Set
   CASHFREE_ENVIRONMENT: TEST
   CASHFREE_BASE_URL: https://sandbox.cashfree.com

🔐 Testing Authentication...
✅ Authentication successful!
   Token received: eyJhbGciOiJIUzI1NiIs...

🎉 Cashfree integration is ready!
```

If you see errors, check:
- Credentials are correct
- You're using TEST mode credentials
- Your Cashfree account is active

## ✅ Step 3: Start Your Servers

### Backend Server
```bash
cd backend
npm run dev
```

**Expected output:**
```
MongoDB connected
Server running on port 5000
```

### Frontend Server
```bash
cd frontend
npm run dev
```

**Expected output:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

## ✅ Step 4: Test Payment Flow

### 4.1 Create a Campaign

1. Go to `http://localhost:5173`
2. Click "Get Started" or navigate to campaign creation
3. Enter a YouTube video link
4. Select videos (if promoting channel)
5. Set budget (e.g., ₹100)
6. Configure targeting options
7. Click "Continue"

### 4.2 Payment Checkout

You should be redirected to: `/payment/checkout?orderId=VID...`

**What you'll see:**
- Order summary with amount
- Order ID
- Campaign details
- "Pay ₹XXX" button

### 4.3 Initiate Payment

1. Click the "Pay ₹XXX" button
2. You should be redirected to Cashfree payment page
3. The page should show your order amount

### 4.4 Complete Test Payment

**In Cashfree Test Mode, use:**
- **Card Number**: Any valid format (e.g., `4111 1111 1111 1111`)
- **CVV**: `123`
- **Expiry**: Any future date (e.g., `12/25`)
- **Name**: Any name

**OR use Cashfree test cards:**
- Check Cashfree dashboard → Test Cards section

### 4.5 Payment Success

After successful payment:
1. You'll be redirected to `/payment/callback?orderId=...&paymentId=...`
2. You should see "Payment Successful!" message
3. Click "View My Campaigns"
4. Your order status should be "Paid"

## 🧪 Testing Different Scenarios

### Test Successful Payment
- Use valid test card → Should show success

### Test Failed Payment
- Use invalid card or cancel payment → Should show failure message

### Test Payment Verification
- Check backend logs for payment verification
- Check order status in database

## 📊 Verify in Backend

### Check Order Status
```bash
# In your browser or Postman
GET http://localhost:5000/api/orders/VID123...
```

**Expected response:**
```json
{
  "status": "paid",
  "paymentId": {
    "status": "captured",
    "amount": 100,
    "currency": "INR"
  }
}
```

### Check Payment Record
The payment should be stored in the database with:
- `status: "captured"`
- `gateway: "cashfree"`
- `paymentId: "cf_payment_..."`

## 🐛 Troubleshooting

### Issue: "Cashfree credentials not configured"
**Solution:**
1. Check `.env` file exists in `backend/` directory
2. Verify variable names are correct (no typos)
3. Restart backend server after adding variables
4. Run test script: `node scripts/test-cashfree.js`

### Issue: "Payment session creation failed"
**Solution:**
1. Verify credentials with test script
2. Check order exists: `GET /api/orders/{orderId}`
3. Verify order has valid amount
4. Check backend logs for detailed error

### Issue: "Redirect to Cashfree not working"
**Solution:**
1. Check `FRONTEND_URL` is set correctly
2. Verify payment session was created (check backend logs)
3. Check browser console for errors
4. Verify `paymentUrl` is returned from `/api/payments/create`

### Issue: "Payment callback not working"
**Solution:**
1. Check `FRONTEND_URL` includes `/payment/callback`
2. Verify Cashfree return URL is correct
3. Check browser console for errors
4. Manually verify payment: `POST /api/payments/verify`

### Issue: "Order status not updating"
**Solution:**
1. Check webhook is configured (for production)
2. Verify payment verification endpoint works
3. Check database for payment record
4. Manually update order if needed

## 📝 Test Checklist

- [ ] Environment variables set correctly
- [ ] Test script passes authentication
- [ ] Backend server starts without errors
- [ ] Frontend server starts without errors
- [ ] Can create a campaign
- [ ] Redirects to payment checkout page
- [ ] Payment checkout shows correct order details
- [ ] Can create payment session
- [ ] Redirects to Cashfree payment page
- [ ] Can complete test payment
- [ ] Redirects back to callback page
- [ ] Shows success message
- [ ] Order status updates to "paid"
- [ ] Can view order in "My Campaigns"

## 🎯 Expected Flow Summary

```
1. Create Campaign
   ↓
2. /payment/checkout?orderId=VID...
   ↓
3. Click "Pay" → POST /api/payments/create
   ↓
4. Redirect to Cashfree payment page
   ↓
5. Complete payment on Cashfree
   ↓
6. /payment/callback?orderId=...&paymentId=...
   ↓
7. POST /api/payments/verify
   ↓
8. Order status = "paid"
   ↓
9. Show success message
   ↓
10. Redirect to My Campaigns
```

## 🚀 Ready to Test!

1. ✅ Run: `node backend/scripts/test-cashfree.js`
2. ✅ Start backend: `cd backend && npm run dev`
3. ✅ Start frontend: `cd frontend && npm run dev`
4. ✅ Create a campaign and test payment!

**If everything passes, you're ready to accept payments!** 🎉

