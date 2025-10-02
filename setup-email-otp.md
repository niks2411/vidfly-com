# 🚀 Quick Setup: Email OTP Verification

## ✅ Your System Status

**Good News!** Your email OTP verification system is already fully implemented. You just need to configure the email settings.

---

## 🔧 Step 1: Configure Email Settings

Add these lines to your `backend/.env` file:

```env
# Gmail SMTP Configuration (Recommended for testing)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Email sender address
EMAIL_FROM=no-reply@vidflyy.com
```

---

## 📧 Step 2: Gmail App Password Setup

### For Gmail Users:

1. **Enable 2-Factor Authentication:**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Generate App Password:**
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" as the app
   - Copy the generated 16-character password
   - Use this password in `SMTP_PASS` (not your regular Gmail password)

### For Other Email Providers:

```env
# Example for Outlook/Hotmail
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password

# Example for Yahoo
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
```

---

## 🧪 Step 3: Test the System

### Test 1: Backend API

```bash
# Start your backend
cd backend
npm run dev

# Test OTP sending (in another terminal)
curl -X POST http://localhost:5000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "your-test-email@gmail.com"}'

# Check your email for OTP, then test verification
curl -X POST http://localhost:5000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "your-test-email@gmail.com", "otp": "123456"}'
```

### Test 2: Frontend Integration

1. **Option A: Use Enhanced App (Recommended)**
   ```bash
   # Replace your current App.jsx with the OTP version
   cd frontend/src
   mv App.jsx App-original.jsx
   mv AppWithOtp.jsx App.jsx
   ```

2. **Option B: Keep Original App**
   ```bash
   # Keep your current App.jsx and test OTP separately
   # The OTP system works independently via API calls
   ```

---

## 🎯 Step 4: Integration Options

### Option 1: Full Integration (Recommended)

Replace your `frontend/src/App.jsx` with the enhanced version:

```bash
cd frontend/src
cp AppWithOtp.jsx App.jsx
```

**Features:**
- ✅ Email verification before order submission
- ✅ OTP modal with resend functionality
- ✅ Visual verification status
- ✅ Enhanced user experience

### Option 2: API-Only Integration

Keep your current frontend and add OTP calls manually:

```javascript
// Send OTP
const sendOtp = async (email) => {
  const response = await fetch('/api/auth/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  return response.json();
};

// Verify OTP
const verifyOtp = async (email, otp) => {
  const response = await fetch('/api/auth/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp })
  });
  return response.json();
};
```

---

## 🔍 Step 5: Verify Everything Works

### Checklist:

- [ ] **Backend starts** without errors
- [ ] **Email settings** configured in `.env`
- [ ] **OTP API** responds successfully
- [ ] **Email delivery** works (check spam folder)
- [ ] **OTP verification** accepts correct codes
- [ ] **Frontend integration** (if using enhanced version)

### Expected Flow:

1. **User enters email** → Click "Verify Email"
2. **OTP sent** → Check email inbox
3. **Enter OTP** → Verification successful
4. **Submit order** → Order created with verified email

---

## 🚨 Troubleshooting

### Email Not Sending?

**Check:**
- [ ] SMTP credentials in `.env` file
- [ ] Gmail app password (not regular password)
- [ ] 2-Factor authentication enabled
- [ ] Internet connection
- [ ] Backend logs for errors

**Debug:**
```bash
# Check backend logs when sending OTP
cd backend
npm run dev
# Look for email-related errors in console
```

### OTP Not Working?

**Check:**
- [ ] MongoDB connection
- [ ] OTP expiration (10 minutes)
- [ ] Correct email address
- [ ] Case sensitivity

**Debug:**
```bash
# Check MongoDB for OTP records
# In MongoDB Atlas: vidflyy → otptokens collection
```

---

## 📊 Database Collections

Your MongoDB will have these collections:

1. **`orders`** - Your existing orders
2. **`otptokens`** - OTP verification codes (auto-expires)

### OTP Token Structure:
```json
{
  "email": "user@example.com",
  "otp": "123456",
  "expiresAt": "2024-01-15T10:40:00.000Z",
  "verified": false,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

---

## 🎉 Success!

When everything is working:

✅ **Backend:** OTP APIs respond successfully  
✅ **Email:** OTP codes delivered to inbox  
✅ **Verification:** Correct OTPs accepted  
✅ **Frontend:** Enhanced form with verification  
✅ **Database:** Orders created with verified emails  

**Your email verification system is now live!** 🚀

---

## 📞 Quick Commands

```bash
# Start backend
cd backend && npm run dev

# Start frontend
cd frontend && npm run dev

# Test OTP API
curl -X POST http://localhost:5000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

# Access application
# Frontend: http://localhost:5173
# Backend: http://localhost:5000
```