# Cashfree Payment Gateway Integration Guide for Vidfly

## 📋 Overview
This guide will help you integrate Cashfree payment gateway (merchant.cashfree.com) into your Vidfly application. The integration includes both backend and frontend components.

---

## 🔑 Step 1: Get Cashfree Credentials

### 1.1 Sign Up for Cashfree Account
1. Go to **https://merchant.cashfree.com**
2. Sign up for a merchant account
3. Complete KYC verification (required for production)

### 1.2 Get Your API Credentials
1. Log in to your Cashfree dashboard
2. Go to **Settings** → **Developer** → **API Keys**
3. You'll need:
   - **App ID** (Client ID)
   - **Secret Key** (Client Secret)
   - **Webhook Secret** (for webhook verification)

### 1.3 Test vs Production
- **Test Mode**: Use sandbox credentials for development
- **Production Mode**: Use live credentials after KYC approval

---

## ⚙️ Step 2: Backend Configuration

### 2.1 Environment Variables
Add these to your `backend/.env` file:

```env
# Cashfree Configuration
CASHFREE_APP_ID=your_app_id_here
CASHFREE_SECRET_KEY=your_secret_key_here
CASHFREE_ENVIRONMENT=TEST  # or PRODUCTION
CASHFREE_WEBHOOK_SECRET=your_webhook_secret_here

# Frontend & Backend URLs (for callbacks)
FRONTEND_URL=http://localhost:5173  # Your frontend URL
BACKEND_URL=http://localhost:5000    # Your backend URL

# Payment Gateway Default
DEFAULT_PAYMENT_GATEWAY=cashfree

# Checkout URL (optional, for custom checkout page)
CHECKOUT_URL=http://localhost:5173/payment/checkout
```

### 2.2 Verify Backend Code
The backend integration is already implemented in:
- `backend/controllers/payment.controller.js` - Payment creation and verification
- `backend/routes/payment.routes.js` - Payment routes
- `backend/models/Payment.js` - Payment model

**No additional backend code changes needed!** ✅

---

## 🎨 Step 3: Frontend Implementation

### 3.1 Create Payment Checkout Page
A payment checkout page will be created at:
- `frontend/src/pages/PaymentCheckout.tsx`

This page will:
- Display order details
- Create Cashfree payment session
- Redirect to Cashfree payment page

### 3.2 Create Payment Callback Page
A payment callback page will be created at:
- `frontend/src/pages/PaymentCallback.tsx`

This page will:
- Handle payment success/failure
- Verify payment status
- Redirect to appropriate page

### 3.3 Add Routes
Routes will be added to `frontend/src/App.tsx`:
- `/payment/checkout` - Payment checkout page
- `/payment/callback` - Payment callback page

---

## 🔄 Step 4: Payment Flow

### 4.1 Complete Payment Flow

```
1. User creates campaign → Order created
2. User clicks "Continue" → Redirects to /payment/checkout?orderId=VID...
3. Payment Checkout Page:
   - Fetches order details
   - Creates Cashfree payment session via API
   - Redirects user to Cashfree payment page
4. User completes payment on Cashfree
5. Cashfree redirects to /payment/callback?orderId=...&paymentId=...
6. Payment Callback Page:
   - Verifies payment with backend
   - Updates order status
   - Shows success/failure message
   - Redirects to My Campaigns page
```

### 4.2 Webhook Flow (Automatic)

```
1. Cashfree sends webhook to: /api/payments/cashfree-webhook
2. Backend verifies webhook signature
3. Backend updates payment and order status
4. Order status automatically updated to "paid"
```

---

## 🧪 Step 5: Testing

### 5.1 Test Mode Setup
1. Use Cashfree **Test Mode** credentials
2. Set `CASHFREE_ENVIRONMENT=TEST` in `.env`

### 5.2 Test Payment Methods
Cashfree Test Mode provides test cards:
- **Success**: Use any card with CVV 123
- **Failure**: Use specific test cards provided by Cashfree

### 5.3 Test Webhooks
1. Use Cashfree webhook testing tool
2. Or use ngrok to expose local backend:
   ```bash
   ngrok http 5000
   ```
3. Configure webhook URL in Cashfree dashboard:
   ```
   https://your-ngrok-url.ngrok.io/api/payments/cashfree-webhook
   ```

---

## 🚀 Step 6: Production Deployment

### 6.1 Pre-Production Checklist
- [ ] Complete Cashfree KYC verification
- [ ] Switch to Production credentials
- [ ] Set `CASHFREE_ENVIRONMENT=PRODUCTION`
- [ ] Configure production webhook URL
- [ ] Test end-to-end payment flow
- [ ] Verify SSL certificate (required for webhooks)

### 6.2 Webhook Configuration
1. Go to Cashfree Dashboard → Settings → Webhooks
2. Add webhook URL:
   ```
   https://your-domain.com/api/payments/cashfree-webhook
   ```
3. Copy webhook secret to `CASHFREE_WEBHOOK_SECRET`

### 6.3 Security Checklist
- [ ] Webhook signature verification enabled
- [ ] HTTPS enabled for all payment endpoints
- [ ] Environment variables secured
- [ ] Payment amount validation in place
- [ ] Duplicate payment prevention active

---

## 📝 Step 7: What You Need to Provide

To complete the integration, please provide:

1. **Cashfree Credentials**:
   - App ID (Client ID)
   - Secret Key (Client Secret)
   - Webhook Secret (optional but recommended)

2. **Environment**:
   - Test or Production mode?
   - Frontend URL (for callbacks)
   - Backend URL (for webhooks)

3. **Customization** (Optional):
   - Custom success page design
   - Custom failure page design
   - Additional payment methods to enable

---

## 🔍 Step 8: API Endpoints Reference

### Backend Endpoints

#### Create Payment Session
```
POST /api/payments/create
Body: {
  "orderId": "VID123...",
  "gateway": "cashfree"
}
Response: {
  "paymentUrl": "https://cashfree.com/pay/...",
  "paymentSessionId": "...",
  "orderId": "VID123..."
}
```

#### Verify Payment
```
POST /api/payments/verify
Body: {
  "orderId": "VID123...",
  "paymentId": "cf_payment_...",
  "gateway": "cashfree"
}
```

#### Webhook (Cashfree calls this)
```
POST /api/payments/cashfree-webhook
Headers: {
  "x-cashfree-signature": "..."
}
```

---

## 🐛 Troubleshooting

### Common Issues

1. **"Cashfree credentials not configured"**
   - Check `.env` file has all required variables
   - Restart backend server after adding env variables

2. **"Payment session creation failed"**
   - Verify App ID and Secret Key are correct
   - Check environment (TEST vs PRODUCTION)
   - Verify order exists and has valid amount

3. **"Webhook not receiving"**
   - Check webhook URL is publicly accessible
   - Verify webhook secret matches
   - Check Cashfree dashboard for webhook logs

4. **"Payment verification failed"**
   - Ensure payment was actually completed
   - Check payment ID format
   - Verify order exists

---

## 📞 Support

- Cashfree Documentation: https://docs.cashfree.com
- Cashfree Support: support@cashfree.com
- Cashfree Dashboard: https://merchant.cashfree.com

---

## ✅ Next Steps

Once you provide the credentials, I will:
1. ✅ Update environment configuration
2. ✅ Create payment checkout page
3. ✅ Create payment callback page
4. ✅ Add routes to frontend
5. ✅ Test the integration
6. ✅ Provide testing instructions

**Ready to proceed? Please provide your Cashfree credentials!**

