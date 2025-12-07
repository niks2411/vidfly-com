# Payment Error Fix Instructions

## Error
```
POST http://localhost:5000/api/payments/create 500 (Internal Server Error)
Failed to create Cashfree payment session
```

## Root Cause
The backend server needs to be restarted to load the updated environment variables.

## Solution Steps

### Step 1: Stop the Backend Server
Press `Ctrl + C` in the terminal where the backend is running.

### Step 2: Restart the Backend Server
```bash
cd backend
npm start
```

Or if using nodemon:
```bash
npm run dev
```

### Step 3: Verify Environment Variables are Loaded
After the server starts, you should see logs indicating Cashfree credentials are loaded.

### Step 4: Test the Payment Flow
1. Go to http://localhost:8080 (or your frontend URL)
2. Create a campaign
3. Proceed to payment
4. The payment should now work

## What Was Fixed

Updated `.env` file to include the correct Cashfree environment variable names:

```env
# Cashfree Payment Gateway Credentials
CASHFREE_CLIENT_ID=TEST108991075b5a14894918c74d7f0d70199801
CASHFREE_CLIENT_SECRET=cfsk_ma_test_daee5c4f82e17b7879b44d8acd8011b5_088b7883
```

## Troubleshooting

### If Error Persists After Restart

1. **Check Backend Logs**
   Look for error messages in the terminal where backend is running.

2. **Verify Environment Variables**
   Add this temporary log in `backend/controllers/payment.controller.js` at line 48:
   ```javascript
   console.log('Cashfree Credentials Check:', {
     CLIENT_ID: process.env.CASHFREE_CLIENT_ID,
     CLIENT_SECRET: process.env.CASHFREE_CLIENT_SECRET ? 'SET' : 'NOT SET',
     ENVIRONMENT: process.env.CASHFREE_ENVIRONMENT
   });
   ```

3. **Check if Order Exists**
   The error might be "Order not found". Make sure you're creating an order before trying to pay.

4. **Check Payment Record**
   The error might be "Payment record not found". This means the Payment document wasn't created when the order was created.

### Common Issues

#### Issue: "Payment record not found"
**Solution:** The order creation process should create a Payment record. Check `backend/controllers/order.controller.js` to ensure it creates a Payment document.

#### Issue: "Cashfree credentials not configured"
**Solution:** Verify the `.env` file has the correct credentials and restart the server.

#### Issue: "Invalid response from Cashfree API"
**Solution:** The Cashfree credentials might be incorrect or expired. Get new credentials from Cashfree Dashboard.

## Testing in Sandbox Mode

The current credentials are for TEST/Sandbox environment:
- Environment: `TEST`
- Base URL: `https://sandbox.cashfree.com/pg`

Use test card details from Cashfree documentation for testing.

## Need Help?

Check the backend terminal logs for detailed error messages. The payment controller has extensive logging that will show exactly what's failing.
