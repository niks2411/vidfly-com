# Cashfree Payment Gateway Integration Guide

## Overview
This guide explains how to integrate Cashfree payment gateway into the Vidfly application.

## Prerequisites
1. Cashfree Merchant Account - Sign up at https://merchant.cashfree.com
2. Get your API credentials:
   - **App ID** (Client ID)
   - **Secret Key** (Client Secret)
   - **Environment** (Test/Production)

## Setup Steps

### 1. Install Cashfree SDK
```bash
cd backend
npm install cashfree-sdk
```

### 2. Environment Variables
Add to your `.env` file:
```env
CASHFREE_APP_ID=your_app_id_here
CASHFREE_SECRET_KEY=your_secret_key_here
CASHFREE_ENVIRONMENT=TEST  # or PRODUCTION
CASHFREE_WEBHOOK_SECRET=your_webhook_secret_here
```

### 3. Cashfree Integration Flow

#### Payment Flow:
1. **Create Payment Session** - Generate payment link/order
2. **Redirect to Cashfree** - User completes payment
3. **Webhook/Callback** - Cashfree notifies your server
4. **Verify Payment** - Verify payment signature and update order

## API Endpoints

### Create Payment Order
`POST /api/payments/create-cashfree`

### Verify Payment
`POST /api/payments/verify-cashfree`

### Webhook Handler
`POST /api/payments/cashfree-webhook`

## Testing
- Use Cashfree Test credentials for development
- Test payment IDs: Use Cashfree test mode
- Webhook testing: Use Cashfree webhook testing tool

## Production Checklist
- [ ] Update to Production credentials
- [ ] Configure webhook URL in Cashfree dashboard
- [ ] Test payment flow end-to-end
- [ ] Set up proper error handling
- [ ] Configure SSL certificate (required for webhooks)

