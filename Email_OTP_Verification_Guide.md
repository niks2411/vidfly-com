# 📧 Email OTP Verification Implementation Guide

## 🎉 Great News! Your OTP System is Already Built!

Your VidFly application already has a complete email OTP verification system implemented. Here's how to set it up and use it:

---

## 📋 Current Implementation Overview

### ✅ **What's Already Built:**

1. **OTP Model** (`backend/models/OtpToken.js`)
   - Stores OTP tokens with expiration
   - Auto-cleanup after expiration
   - Email indexing for fast lookups

2. **Auth Controller** (`backend/controllers/auth.controller.js`)
   - `sendOtp()` - Generates and sends OTP via email
   - `verifyOtp()` - Validates OTP and marks as verified

3. **Auth Routes** (`backend/routes/auth.routes.js`)
   - `POST /api/auth/send-otp` - Send OTP to email
   - `POST /api/auth/verify-otp` - Verify OTP code

4. **Email Integration** - Uses Nodemailer for sending emails

---

## 🔧 Setup Steps

### Step 1: Configure Email Settings

Add these email configuration variables to your `backend/.env` file:

```env
# Email Configuration (Choose one method)

# Method 1: Gmail SMTP (Recommended for testing)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Method 2: Other SMTP providers
# SMTP_HOST=smtp.your-provider.com
# SMTP_PORT=587
# SMTP_USER=your-username
# SMTP_PASS=your-password

# Email sender address
EMAIL_FROM=no-reply@vidflyy.com
```

### Step 2: Gmail App Password Setup (If using Gmail)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password in `SMTP_PASS`

### Step 3: Test the System

Your backend is already configured! Just start it:

```bash
cd backend
npm run dev
```

---

## 🚀 API Usage

### Send OTP

**Endpoint:** `POST /api/auth/send-otp`

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "OTP sent",
  "id": "message-id-from-email-provider"
}
```

### Verify OTP

**Endpoint:** `POST /api/auth/verify-otp`

**Request:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response:**
```json
{
  "message": "OTP verified"
}
```

---

## 🧪 Testing with cURL

### Send OTP
```bash
curl -X POST http://localhost:5000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### Verify OTP
```bash
curl -X POST http://localhost:5000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "otp": "123456"}'
```

---

## 🎨 Frontend Integration

### Basic HTML Form Example

```html
<!-- Send OTP Form -->
<form id="sendOtpForm">
  <input type="email" id="email" placeholder="Enter your email" required>
  <button type="submit">Send OTP</button>
</form>

<!-- Verify OTP Form -->
<form id="verifyOtpForm" style="display: none;">
  <input type="text" id="otp" placeholder="Enter 6-digit OTP" maxlength="6" required>
  <button type="submit">Verify OTP</button>
</form>

<script>
// Send OTP
document.getElementById('sendOtpForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  
  try {
    const response = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    
    const result = await response.json();
    if (response.ok) {
      alert('OTP sent to your email!');
      document.getElementById('verifyOtpForm').style.display = 'block';
    } else {
      alert('Error: ' + result.message);
    }
  } catch (error) {
    alert('Network error: ' + error.message);
  }
});

// Verify OTP
document.getElementById('verifyOtpForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const otp = document.getElementById('otp').value;
  
  try {
    const response = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });
    
    const result = await response.json();
    if (response.ok) {
      alert('Email verified successfully!');
      // Proceed with your application logic
    } else {
      alert('Error: ' + result.message);
    }
  } catch (error) {
    alert('Network error: ' + error.message);
  }
});
</script>
```

---

## 🔄 Integration with Order Creation

### Modified Order Flow with Email Verification

1. **User enters email** in order form
2. **Send OTP** to verify email
3. **User enters OTP** to verify
4. **Create order** only after email verification

### Example Integration

```javascript
// Step 1: Send OTP before creating order
const sendOtpForOrder = async (email) => {
  const response = await fetch('/api/auth/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  return response.json();
};

// Step 2: Verify OTP
const verifyOtpForOrder = async (email, otp) => {
  const response = await fetch('/api/auth/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp })
  });
  return response.json();
};

// Step 3: Create order after verification
const createOrderWithVerification = async (orderData) => {
  // First verify email
  const otpResult = await verifyOtpForOrder(orderData.email, orderData.otp);
  
  if (otpResult.message === 'OTP verified') {
    // Now create the order
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return response.json();
  } else {
    throw new Error('Email verification failed');
  }
};
```

---

## 📧 Email Templates

### Current Email Template
```
Subject: Your Vidflyy OTP
Body: Your OTP is 123456. It expires in 10 minutes.
```

### Enhanced Email Template (Optional)

You can modify the email template in `auth.controller.js`:

```javascript
const info = await transporter.sendMail({
  from: process.env.EMAIL_FROM || 'no-reply@vidflyy.com',
  to: email,
  subject: '🔐 Your VidFly Verification Code',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">🎬 VidFly Email Verification</h2>
      <p>Hello!</p>
      <p>Your verification code is:</p>
      <div style="background: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
        <h1 style="color: #2563eb; font-size: 32px; margin: 0;">${otp}</h1>
      </div>
      <p>This code will expire in <strong>10 minutes</strong>.</p>
      <p>If you didn't request this code, please ignore this email.</p>
      <hr>
      <p style="color: #6b7280; font-size: 12px;">
        This is an automated message from VidFly. Please do not reply.
      </p>
    </div>
  `,
  text: `Your VidFly verification code is ${otp}. It expires in 10 minutes.`
});
```

---

## 🔒 Security Features

### ✅ **Built-in Security:**

1. **OTP Expiration** - 10 minutes timeout
2. **Single Use** - OTP deleted after verification
3. **Email Validation** - Joi schema validation
4. **Rate Limiting** - Previous OTPs deleted before sending new ones
5. **Auto Cleanup** - MongoDB TTL index removes expired tokens

### 🛡️ **Additional Security (Optional):**

```javascript
// Add rate limiting (install express-rate-limit)
const rateLimit = require('express-rate-limit');

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many OTP requests, please try again later.'
});

// Apply to OTP routes
router.post('/send-otp', otpLimiter, sendOtp);
```

---

## 🧪 Testing Scenarios

### Test Case 1: Valid Email
1. Send OTP to valid email
2. Check email inbox for OTP
3. Verify with correct OTP
4. Should return success

### Test Case 2: Invalid Email
1. Send OTP to invalid email format
2. Should return validation error

### Test Case 3: Expired OTP
1. Send OTP
2. Wait 11 minutes
3. Try to verify
4. Should return "OTP expired"

### Test Case 4: Wrong OTP
1. Send OTP
2. Verify with wrong code
3. Should return "Invalid OTP"

---

## 🚨 Troubleshooting

### Email Not Sending

**Check:**
1. SMTP credentials in `.env`
2. Gmail app password (not regular password)
3. Network connectivity
4. Backend logs for errors

**Debug Mode:**
```javascript
// Add to auth.controller.js for debugging
console.log('SMTP Config:', {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  // Don't log password
});
```

### OTP Not Working

**Check:**
1. MongoDB connection
2. OtpToken model imported correctly
3. Database has `otptokens` collection
4. Check expiration time

---

## 📊 Database Structure

### OtpToken Collection
```javascript
{
  "_id": "ObjectId(...)",
  "email": "user@example.com",
  "otp": "123456",
  "expiresAt": "2024-01-15T10:40:00.000Z",
  "verified": false,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

---

## 🎯 Next Steps

### 1. Configure Email Settings
- [ ] Add SMTP credentials to `.env`
- [ ] Test email sending

### 2. Test the System
- [ ] Send OTP via API
- [ ] Check email delivery
- [ ] Verify OTP works

### 3. Integrate with Frontend
- [ ] Add OTP forms to your React app
- [ ] Implement verification flow
- [ ] Handle success/error states

### 4. Enhance (Optional)
- [ ] Add rate limiting
- [ ] Improve email templates
- [ ] Add SMS OTP option
- [ ] Add resend OTP functionality

---

## 🎉 Summary

Your email OTP verification system is **already fully implemented**! You just need to:

1. **Configure email settings** in `.env`
2. **Test the API endpoints**
3. **Integrate with your frontend**

The system includes:
- ✅ OTP generation and storage
- ✅ Email sending via Nodemailer
- ✅ OTP verification and expiration
- ✅ Security features and validation
- ✅ Auto-cleanup of expired tokens

**Ready to use!** 🚀