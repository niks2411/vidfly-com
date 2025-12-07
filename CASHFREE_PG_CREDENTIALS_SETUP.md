# ✅ Cashfree Payment Gateway Credentials Setup

## ⚠️ IMPORTANT: Use PG Credentials, NOT Payout Credentials!

**You need Payment Gateway (PG) credentials, NOT Payout credentials!**

---

## 📋 Step 1: Get Your PG Credentials

1. **Login to Cashfree Dashboard**: https://merchant.cashfree.com
2. **Go to**: Payment Gateway → Credentials → **Sandbox** (for testing)
3. **Copy these two values**:
   - **PG Test Client ID** (or Client ID)
   - **PG Test Client Secret** (or Client Secret)

**⚠️ DO NOT use:**
- App ID / Secret Key (these are for Payouts)
- API Key (wrong type)

**✅ USE:**
- Client ID / Client Secret (for Payment Gateway)

---

## 📝 Step 2: Update Your .env File

**In `backend/.env`, add/update:**

```env
# Cashfree Payment Gateway Credentials (PG, NOT Payout!)
CASHFREE_CLIENT_ID=your_pg_test_client_id_here
CASHFREE_CLIENT_SECRET=your_pg_test_client_secret_here
CASHFREE_ENVIRONMENT=TEST

# URLs
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000
```

**Important:**
- ✅ Use `CASHFREE_CLIENT_ID` (not CASHFREE_APP_ID)
- ✅ Use `CASHFREE_CLIENT_SECRET` (not CASHFREE_SECRET_KEY)
- ✅ Set `CASHFREE_ENVIRONMENT=TEST` for testing
- ✅ No spaces around `=`
- ✅ No quotes around values

---

## 🔄 Step 3: Restart Backend Server

```bash
cd backend
# Stop current server (Ctrl+C)
npm run dev
```

---

## ✅ Step 4: Test Your Credentials

```bash
cd backend
node scripts/test-cashfree.js
```

**Expected output:**
```
✅ Cashfree Payment Gateway API test successful!
🎉 Cashfree Payment Gateway integration is ready!
```

---

## 🎯 What Changed in the Code

1. ✅ Updated to use `CASHFREE_CLIENT_ID` and `CASHFREE_CLIENT_SECRET`
2. ✅ Changed base URL to include `/pg` endpoint
3. ✅ Using direct header authentication (no token needed)
4. ✅ Updated API endpoint to `/pg/orders`
5. ✅ Fixed all authentication methods

---

## 🚀 After Setup

1. **Restart backend**: `npm run dev`
2. **Test payment flow**: Create campaign → Click Pay
3. **Should work now!** ✅

---

## ❓ Still Not Working?

**Check:**
1. Are you using PG credentials (not Payout)?
2. Did you restart the backend after updating .env?
3. Run test script: `node scripts/test-cashfree.js`
4. Check backend logs when clicking "Pay"

---

**The code is now fixed to use Payment Gateway credentials correctly!** 🎉

