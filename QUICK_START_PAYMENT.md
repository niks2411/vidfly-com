# 🚀 Quick Start - Cashfree Payment Integration

## ✅ You've Added Credentials - Now Let's Test!

### Step 1: Verify Your .env File

Make sure your `backend/.env` file looks like this:

```env
# Cashfree Configuration (REQUIRED)
CASHFREE_APP_ID=YOUR_TEST_APP_ID
CASHFREE_SECRET_KEY=YOUR_TEST_SECRET_KEY
CASHFREE_ENVIRONMENT=TEST

# Frontend & Backend URLs (REQUIRED)
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000

# Payment Gateway (REQUIRED)
DEFAULT_PAYMENT_GATEWAY=cashfree

# Other required variables
MONGODB_URI=mongodb://localhost:27017/vidflyy
JWT_SECRET=your_jwt_secret_here
```

**Important Notes:**
- Replace `YOUR_TEST_APP_ID` with your actual App ID
- Replace `YOUR_TEST_SECRET_KEY` with your actual Secret Key
- Make sure `CASHFREE_ENVIRONMENT=TEST` (not PRODUCTION)
- No spaces around the `=` sign
- No quotes needed around values

### Step 2: Test Cashfree Connection

Run this command to verify your credentials work:

```bash
cd backend
node scripts/test-cashfree.js
```

**✅ If successful, you'll see:**
```
✅ Authentication successful!
🎉 Cashfree integration is ready!
```

**❌ If you see errors:**
- Check your App ID and Secret Key are correct
- Make sure you're using TEST mode credentials
- Verify no extra spaces or quotes in .env file

### Step 3: Start Your Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Wait for: `Server running on port 5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Wait for: `Local: http://localhost:5173/`

### Step 4: Test Payment Flow

1. **Open your browser:** `http://localhost:5173`

2. **Create a Campaign:**
   - Go through the campaign creation flow
   - Enter a YouTube video link
   - Set a budget (e.g., ₹100)
   - Click "Continue"

3. **Payment Checkout:**
   - You should see the payment checkout page
   - Review order details
   - Click "Pay ₹XXX" button

4. **Cashfree Payment Page:**
   - You'll be redirected to Cashfree
   - Use test card:
     - **Card:** `4111 1111 1111 1111`
     - **CVV:** `123`
     - **Expiry:** Any future date (e.g., `12/25`)
   - Complete payment

5. **Success:**
   - You'll be redirected back
   - See "Payment Successful!" message
   - Order status will be "Paid"

## 🎯 Quick Test Checklist

Run through this checklist:

- [ ] `.env` file has all required variables
- [ ] Test script passes: `node scripts/test-cashfree.js`
- [ ] Backend server starts: `npm run dev` (in backend folder)
- [ ] Frontend server starts: `npm run dev` (in frontend folder)
- [ ] Can create a campaign
- [ ] Redirects to payment checkout page
- [ ] Can click "Pay" button
- [ ] Redirects to Cashfree payment page
- [ ] Can complete test payment
- [ ] Redirects back with success message

## 🐛 Common Issues & Quick Fixes

### "Cashfree credentials not configured"
**Fix:** 
- Check `.env` file exists in `backend/` folder
- Restart backend server after adding variables
- No spaces around `=` in .env file

### "Authentication failed"
**Fix:**
- Verify App ID and Secret Key are correct
- Make sure using TEST mode credentials
- Run test script to see detailed error

### "Payment session creation failed"
**Fix:**
- Verify credentials with test script first
- Check backend logs for detailed error
- Ensure order exists and has valid amount

### "Can't redirect to Cashfree"
**Fix:**
- Check `FRONTEND_URL` is set correctly
- Verify backend is running
- Check browser console for errors

## 📞 Need Help?

1. **Run the test script first:** `node backend/scripts/test-cashfree.js`
2. **Check backend logs** when creating payment
3. **Check browser console** for frontend errors
4. **Verify all environment variables** are set correctly

## ✅ You're Ready!

Once the test script passes and servers are running, you can start accepting test payments!

**Next:** Create a campaign and test the full payment flow! 🎉

