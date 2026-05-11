# AWS SES Setup Guide for Vidflyy

This guide will help you set up AWS SES (Simple Email Service) for sending emails in both production and local development environments.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [AWS Account Setup](#aws-account-setup)
3. [SES Configuration](#ses-configuration)
4. [IAM User Setup](#iam-user-setup)
5. [Environment Configuration](#environment-configuration)
6. [Local Testing (Sandbox Mode)](#local-testing-sandbox-mode)
7. [Production Setup](#production-setup)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- AWS Account (create one at [aws.amazon.com](https://aws.amazon.com))
- Access to AWS Console
- A domain or email address you control

---

## AWS Account Setup

1. **Sign in to AWS Console**: Go to [console.aws.amazon.com](https://console.aws.amazon.com)
2. **Navigate to SES**: Search for "SES" or "Simple Email Service" in the AWS Console search bar
3. **Select a Region**: Choose a region close to your users (e.g., `us-east-1`, `ap-south-1`, `eu-west-1`)
   - **Important**: Remember this region, you'll need it for your `.env` file

---

## SES Configuration

### Step 1: Verify Your Sender Email Address

1. In the SES Console, go to **Verified Identities**
2. Click **Create Identity**
3. Select **Email address**
4. Enter your sender email (e.g., `noreply@yourdomain.com`)
5. Click **Create Identity**
6. Check your email inbox and click the verification link
7. Wait for the status to show **Verified** (may take a few minutes)

### Step 2: Verify Recipient Emails (For Sandbox Testing)

While in sandbox mode, you can only send emails to verified addresses:

1. Go to **Verified Identities** again
2. Click **Create Identity**
3. Add each test recipient email address
4. Each recipient must click the verification link in their inbox

---

## IAM User Setup

Create an IAM user with SES sending permissions:

### Step 1: Create IAM User

1. Go to **IAM** service in AWS Console
2. Click **Users** → **Create User**
3. Enter username (e.g., `vidflyy-ses-sender`)
4. Click **Next**

### Step 2: Attach Permissions

1. Select **Attach policies directly**
2. Search for and select **AmazonSESFullAccess** (or create a custom policy with `ses:SendEmail` permission)
3. Click **Next** → **Create User**

### Step 3: Create Access Keys

1. Click on the newly created user
2. Go to **Security credentials** tab
3. Scroll to **Access keys** section
4. Click **Create access key**
5. Select **Application running outside AWS**
6. Click **Next** → **Create access key**
7. **IMPORTANT**: Copy both:
   - Access Key ID
   - Secret Access Key
   - You won't be able to see the secret key again!

---

## Environment Configuration

### For Local Development

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update your `.env` file with AWS credentials:
   ```env
   # AWS SES Configuration
   AWS_REGION=us-east-1                           # Your SES region
   AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE         # Your IAM access key
   AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG... # Your IAM secret key
   AWS_SES_FROM_EMAIL=noreply@yourdomain.com      # Your verified sender email
   
   # Other settings
   FRONTEND_URL=http://localhost:5173
   ```

### For Production (Deployment)

Set environment variables in your hosting platform:
- **Vercel/Netlify**: Add in Environment Variables settings
- **Heroku**: Use `heroku config:set`
- **AWS EC2/ECS**: Use IAM roles (no need for access keys)
- **Docker**: Pass via docker-compose or Kubernetes secrets

---

## Local Testing (Sandbox Mode)

### Install Dependencies

```bash
cd backend
npm install
```

### Test Email Sending

1. Start your backend server:
   ```bash
   npm run dev
   ```

2. Trigger an email (e.g., user registration)

3. Check console output:
   - ✅ Success: `Email sent via AWS SES to user@example.com`
   - ❌ Error: Check the error message

### Common Sandbox Limitations

- ✅ Can send to verified email addresses only
- ✅ Daily limit: 200 emails
- ✅ Rate limit: 1 email per second
- ❌ Cannot send to unverified addresses

---

## Production Setup

### Request Production Access

1. In SES Console, go to **Account Dashboard**
2. Click **Request production access**
3. Fill out the form:
   - **Use case**: Describe your application (e.g., "Transactional emails for YouTube promotion platform")
   - **Website URL**: Your production website
   - **Email content**: Describe what emails you'll send
   - **Bounce handling**: Explain how you handle bounces
4. Submit the request
5. Wait for AWS approval (usually 24-48 hours)

### After Approval

Once approved, you can:
- ✅ Send to any email address
- ✅ Higher sending limits (50,000 emails/day by default)
- ✅ Request limit increases if needed

### Verify Domain (Recommended for Production)

Instead of individual emails, verify your entire domain:

1. Go to **Verified Identities** → **Create Identity**
2. Select **Domain**
3. Enter your domain (e.g., `yourdomain.com`)
4. Choose **Easy DKIM**
5. Add the provided DNS records to your domain
6. Wait for verification (may take up to 72 hours)

Benefits:
- Send from any email address at your domain
- Better email deliverability
- Professional appearance

---

## Troubleshooting

### Error: "Email address is not verified"

**Solution**: Verify the sender email in SES Console → Verified Identities

### Error: "MessageRejected: Email address is not verified"

**Solution**: In sandbox mode, verify the recipient email address as well

### Error: "Missing credentials in config"

**Solution**: Check that `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` are set in `.env`

### Error: "InvalidParameterValue: Missing region in config"

**Solution**: Set `AWS_REGION` in your `.env` file

### Emails not being sent (no error)

**Solution**: Check if AWS credentials are missing. The app falls back to console logging:
```
📧 ===== EMAIL (Console Mode - No AWS SES Configured) =====
```

### High bounce rate

**Solutions**:
- Use double opt-in for email verification
- Remove invalid emails from your list
- Set up SNS notifications for bounces
- Monitor SES reputation dashboard

### Rate limit exceeded

**Solutions**:
- Implement email queuing
- Request higher sending limits from AWS
- Spread emails over time

---

## Testing Checklist

- [ ] AWS SES region selected
- [ ] Sender email verified in SES
- [ ] IAM user created with SES permissions
- [ ] Access keys generated and saved
- [ ] Environment variables configured in `.env`
- [ ] Dependencies installed (`npm install`)
- [ ] Test recipient email verified (for sandbox)
- [ ] Test email sent successfully
- [ ] Email received in inbox (check spam folder)
- [ ] Email templates render correctly

---

## Additional Resources

- [AWS SES Documentation](https://docs.aws.amazon.com/ses/)
- [SES Sending Limits](https://docs.aws.amazon.com/ses/latest/dg/manage-sending-quotas.html)
- [SES Best Practices](https://docs.aws.amazon.com/ses/latest/dg/best-practices.html)
- [Monitoring SES](https://docs.aws.amazon.com/ses/latest/dg/monitor-sending-activity.html)

---

## Support

If you encounter issues:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review AWS SES Console for error messages
3. Check your application logs for detailed error messages
4. Verify all environment variables are set correctly
