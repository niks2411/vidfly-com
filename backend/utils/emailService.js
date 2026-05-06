const { Resend } = require('resend');

// --- Resend Client helper ---
function createResendClient() {
  // Check if Resend is configured
  if (process.env.RESEND_API_KEY) {
    return new Resend(process.env.RESEND_API_KEY);
  }
  // Return null if Resend is not configured (will fall back to console logging)
  return null;
}

// --- Base HTML wrapper ---
function getEmailTemplate(title, content, buttonText, buttonUrl) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#f5f5f5;">
  <table role="presentation" style="width:100%;border-collapse:collapse;background-color:#f5f5f5;">
    <tr>
      <td style="padding:20px 0;">
        <table role="presentation" style="width:600px;margin:0 auto;background-color:#ffffff;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding:30px 40px;background:linear-gradient(135deg,#dc2626 0%,#ec4899 100%);border-radius:8px 8px 0 0;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:bold;">Vidflyy</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              ${content}
            </td>
          </tr>
          ${buttonText && buttonUrl ? `
          <tr>
            <td style="padding:0 40px 40px;text-align:center;">
              <a href="${buttonUrl}" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#dc2626 0%,#ec4899 100%);color:#ffffff;text-decoration:none;border-radius:6px;font-weight:600;font-size:16px;">${buttonText}</a>
            </td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding:30px 40px;background-color:#f9fafb;border-radius:0 0 8px 8px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0 0 10px;color:#6b7280;font-size:14px;">
                © ${new Date().getFullYear()} Vidflyy. All rights reserved.
              </p>
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                This is an automated email. Please do not reply.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

// --- Specific templates ---
function getWelcomeEmailTemplate() {
  const content = `
    <h2 style="margin:0 0 20px;color:#111827;font-size:24px;font-weight:bold;">Welcome to Vidflyy! 🎉</h2>
    <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.6;">
      Hi there!
    </p>
    <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.6;">
      Thank you for verifying your email address. Your Vidflyy account is now active and ready to use.
    </p>
    <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.6;">
      With Vidflyy, you can:
    </p>
    <ul style="margin:0 0 24px;padding-left:20px;color:#374151;font-size:16px;line-height:1.8;">
      <li>Promote your YouTube videos and channel</li>
      <li>Get real views, subscribers, and engagement</li>
      <li>Track your campaign performance</li>
      <li>Earn free views through referrals</li>
    </ul>
    <p style="margin:0 0 24px;color:#374151;font-size:16px;line-height:1.6;">
      Ready to grow your YouTube channel? Let's get started!
    </p>
  `;

  const url = process.env.FRONTEND_URL || 'http://localhost:5173/campaign';

  return {
    subject: 'Welcome to Vidflyy! 🎉',
    html: getEmailTemplate('Welcome to Vidflyy', content, 'Get Started', url),
    text: `Welcome to Vidflyy!\n\nThank you for verifying your email address. Your Vidflyy account is now active and ready to use.\n\nVisit ${url} to get started.`,
  };
}

function getPaymentSummaryEmailTemplate(order, payment) {
  const currency = order.plan?.currency || 'INR';
  const symbol = currency === 'USD' ? '$' : '₹';
  const amount = payment.amount || order.plan?.price || 0;
  const orderId = order.orderId;
  const packageName = order.packageInfo?.name || order.plan?.name || 'Campaign Package';
  const views = order.plan?.quantity || 0;

  const content = `
    <h2 style="margin:0 0 20px;color:#111827;font-size:24px;font-weight:bold;">Payment Successful! ✅</h2>
    <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.6;">
      Hi there!
    </p>
    <p style="margin:0 0 24px;color:#374151;font-size:16px;line-height:1.6;">
      Thank you for your payment! Your order has been confirmed and your campaign is being processed.
    </p>
    <div style="background-color:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:24px;margin:24px 0;">
      <h3 style="margin:0 0 16px;color:#111827;font-size:18px;font-weight:bold;">Order Details</h3>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:14px;">Order ID:</td>
          <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;text-align:right;">${orderId}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:14px;">Package:</td>
          <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;text-align:right;">${packageName}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:14px;">Views:</td>
          <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;text-align:right;">${views.toLocaleString()}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:14px;">Amount Paid:</td>
          <td style="padding:8px 0;color:#10b981;font-size:16px;font-weight:bold;text-align:right;">
            ${symbol}${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:14px;">Payment Status:</td>
          <td style="padding:8px 0;color:#10b981;font-size:14px;font-weight:600;text-align:right;">Paid</td>
        </tr>
      </table>
    </div>
    <p style="margin:24px 0 16px;color:#374151;font-size:16px;line-height:1.6;">
      Your campaign is now in our queue and will be processed shortly. You'll receive updates as your campaign progresses.
    </p>
  `;

  const url = (process.env.FRONTEND_URL || 'http://localhost:5173') + '/campaign';

  return {
    subject: `Payment Successful - Order ${orderId}`,
    html: getEmailTemplate('Payment Successful', content, 'View Order', url),
    text: `Payment Successful!\n\nOrder ID: ${orderId}\nPackage: ${packageName}\nViews: ${views.toLocaleString()}\nAmount Paid: ${symbol}${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n\nYour campaign is being processed.`,
  };
}

function getPaymentReminderEmailTemplate(order) {
  const currency = order.plan?.currency || 'INR';
  const symbol = currency === 'USD' ? '$' : '₹';
  const amount = order.plan?.price || 0;
  const orderId = order.orderId;
  const packageName = order.packageInfo?.name || order.plan?.name || 'Campaign Package';

  const content = `
    <h2 style="margin:0 0 20px;color:#111827;font-size:24px;font-weight:bold;">Payment Reminder ⏰</h2>
    <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.6;">
      Hi there!
    </p>
    <p style="margin:0 0 24px;color:#374151;font-size:16px;line-height:1.6;">
      We noticed that your order is still pending payment. Complete your payment to start your campaign.
    </p>
    <div style="background-color:#fef3c7;border:1px solid #fbbf24;border-radius:8px;padding:24px;margin:24px 0;">
      <h3 style="margin:0 0 16px;color:#111827;font-size:18px;font-weight:bold;">Pending Order</h3>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:14px;">Order ID:</td>
          <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;text-align:right;">${orderId}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:14px;">Package:</td>
          <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;text-align:right;">${packageName}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:14px;">Amount:</td>
          <td style="padding:8px 0;color:#dc2626;font-size:16px;font-weight:bold;text-align:right;">
            ${symbol}${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </td>
        </tr>
      </table>
    </div>
    <p style="margin:24px 0 16px;color:#374151;font-size:16px;line-height:1.6;">
      Complete your payment now to activate your campaign and start growing your YouTube channel.
    </p>
  `;

  const paymentUrl =
    (process.env.FRONTEND_URL || 'http://localhost:5173') +
    `/payment/checkout?orderId=${orderId}`;

  return {
    subject: `Complete Your Payment - Order ${orderId}`,
    html: getEmailTemplate('Payment Reminder', content, 'Complete Payment', paymentUrl),
    text: `Payment Reminder\n\nYour order ${orderId} is pending payment.\n\nPackage: ${packageName}\nAmount: ${symbol}${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n\nComplete your payment: ${paymentUrl}`,
  };
}

function getStatusUpdateEmailTemplate(order, oldStatus, newStatus) {
  const orderId = order.orderId;
  const packageName = order.packageInfo?.name || order.plan?.name || 'Campaign Package';

  const statusMessages = {
    payment_pending: 'Payment Pending',
    paid: 'Payment Received',
    promotion_scheduled: 'Campaign Scheduled',
    in_progress: 'Campaign In Progress',
    completed: 'Campaign Completed',
    failed: 'Campaign Failed',
  };

  const statusColors = {
    payment_pending: '#f59e0b',
    paid: '#10b981',
    promotion_scheduled: '#3b82f6',
    in_progress: '#8b5cf6',
    completed: '#10b981',
    failed: '#ef4444',
  };

  const statusMessage = statusMessages[newStatus] || newStatus;
  const statusColor = statusColors[newStatus] || '#6b7280';

  let extra;
  if (newStatus === 'completed') {
    extra =
      '🎉 Congratulations! Your campaign has been completed successfully. Check your YouTube channel to see the results.';
  } else if (newStatus === 'in_progress') {
    extra =
      "Your campaign is now live and generating views! You'll see results on your YouTube channel soon.";
  } else if (newStatus === 'failed') {
    extra =
      'We encountered an issue with your campaign. Our support team will contact you shortly to resolve this.';
  } else {
    extra = "Your campaign is being processed. We'll keep you updated on the progress.";
  }

  const content = `
    <h2 style="margin:0 0 20px;color:#111827;font-size:24px;font-weight:bold;">Campaign Status Updated 📊</h2>
    <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.6;">
      Hi there!
    </p>
    <p style="margin:0 0 24px;color:#374151;font-size:16px;line-height:1.6;">
      Your campaign status has been updated. Here are the details:
    </p>
    <div style="background-color:#f9fafb;border:2px solid ${statusColor};border-radius:8px;padding:24px;margin:24px 0;text-align:center;">
      <div style="display:inline-block;padding:8px 16px;background-color:${statusColor};color:#ffffff;border-radius:6px;font-weight:600;font-size:16px;margin-bottom:16px;">
        ${statusMessage}
      </div>
      <p style="margin:16px 0 0;color:#6b7280;font-size:14px;">
        Order ID: <strong style="color:#111827;">${orderId}</strong>
      </p>
      <p style="margin:8px 0 0;color:#6b7280;font-size:14px;">
        Package: <strong style="color:#111827;">${packageName}</strong>
      </p>
    </div>
    <p style="margin:24px 0 16px;color:#374151;font-size:16px;line-height:1.6;">
      ${extra}
    </p>
  `;

  const url = (process.env.FRONTEND_URL || 'http://localhost:5173') + '/campaign';

  return {
    subject: `Campaign Status Updated - ${statusMessage}`,
    html: getEmailTemplate('Campaign Status Updated', content, 'View Campaign', url),
    text: `Campaign Status Updated\n\nOrder ID: ${orderId}\nStatus: ${statusMessage}\nPackage: ${packageName}\n\nVisit ${url} to view your campaign.`,
  };
}

function getAdminNewOrderNotificationTemplate(order, payment) {
  const currency = order.plan?.currency || 'INR';
  const symbol = currency === 'USD' ? '$' : '₹';
  const amount = payment.amount || order.plan?.price || 0;
  const orderId = order.orderId;
  const packageName = order.packageInfo?.name || order.plan?.name || 'Campaign Package';
  const views = order.plan?.quantity || 0;
  const customerName = order.userId?.name || 'N/A';
  const customerEmail = order.userId?.email || 'N/A';
  const campaignType = order.campaignType || 'N/A';
  const notes = order.notes || 'None';
  const targetingNotes = order.targeting?.notes || 'None';
  
  // Targeting Details
  const country = order.targeting?.country || 'Any';
  const goal = order.targeting?.goal || 'Not specified';
  const duration = order.targeting?.duration || 'Default';
  const strategy = (order.targeting?.autoTargeting !== false) ? 'AI Assistant' : 'Manual';
  const gender = order.targeting?.gender || 'All';
  const ages = (order.targeting?.ages || ['All Ages']).join(', ');
  const interests = (order.targeting?.interests || ['All Interests']).join(', ');
  const keywords = (order.targeting?.keywords && order.targeting.keywords.length > 0) ? order.targeting.keywords.join(', ') : 'None';

  // Content Source
  const channelName = order.channel?.name || 'N/A';
  const channelLink = order.channel?.link || 'N/A';

  // Video List HTML
  let videoListHtml = '';
  if (order.videos && order.videos.length > 0) {
    videoListHtml = order.videos.map((v, i) => `
      <div style="padding:12px;background-color:#ffffff;border:1px solid #e5e7eb;border-radius:8px;margin-bottom:8px;">
        <p style="margin:0 0 4px;font-weight:bold;color:#111827;font-size:14px;">Video ${i + 1}: ${v.title || 'Untitled'}</p>
        <p style="margin:0 0 4px;font-size:12px;"><a href="${v.link || '#'}" style="color:#3b82f6;text-decoration:none;">${v.link || 'No link'}</a></p>
        ${v.viewsRequested ? `<p style="margin:0;font-size:11px;color:#6b7280;font-weight:bold;">Requested: ${v.viewsRequested.toLocaleString()} Views</p>` : ''}
      </div>
    `).join('');
  } else if (order.youtubeLink) {
    videoListHtml = `
      <div style="padding:12px;background-color:#ffffff;border:1px solid #e5e7eb;border-radius:8px;">
        <p style="margin:0 0 4px;font-weight:bold;color:#111827;font-size:14px;">Legacy YouTube Link</p>
        <p style="margin:0;font-size:12px;"><a href="${order.youtubeLink}" style="color:#3b82f6;text-decoration:none;">${order.youtubeLink}</a></p>
      </div>
    `;
  } else {
    videoListHtml = '<p style="margin:0;font-size:13px;color:#9ca3af;font-style:italic;">No videos specified</p>';
  }

  const content = `
    <h2 style="margin:0 0 20px;color:#111827;font-size:24px;font-weight:bold;">🚀 New Successful Order!</h2>
    <p style="margin:0 0 20px;color:#374151;font-size:16px;line-height:1.6;">
      Great news! A new order has been paid and verified.
    </p>

    <div style="background-color:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin-bottom:24px;">
      <h3 style="margin:0 0-16px;color:#111827;font-size:16px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">General Info</h3>
      <table style="width:100%;border-collapse:collapse;margin-top:12px;">
        <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Order ID:</td><td style="padding:6px 0;color:#111827;font-size:13px;font-weight:600;text-align:right;">${orderId}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Customer:</td><td style="padding:6px 0;color:#111827;font-size:13px;font-weight:600;text-align:right;">${customerName} (${customerEmail})</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Campaign Type:</td><td style="padding:6px 0;color:#111827;font-size:13px;font-weight:600;text-align:right;">${campaignType.replace(/_/g, ' ').toUpperCase()}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Package:</td><td style="padding:6px 0;color:#111827;font-size:13px;font-weight:600;text-align:right;">${packageName}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Budget:</td><td style="padding:6px 0;color:#dc2626;font-size:15px;font-weight:bold;text-align:right;">${symbol}${amount.toLocaleString()}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Order Notes:</td><td style="padding:6px 0;color:#111827;font-size:13px;font-weight:600;text-align:right;">${notes}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Targeting Notes:</td><td style="padding:6px 0;color:#111827;font-size:13px;font-weight:600;text-align:right;">${targetingNotes}</td></tr>
      </table>
    </div>

    <div style="background-color:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin-bottom:24px;">
      <h3 style="margin:0 0 16px;color:#111827;font-size:16px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Targeting & Preferences</h3>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Country:</td><td style="padding:6px 0;color:#111827;font-size:13px;font-weight:600;text-align:right;">${country}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Goal:</td><td style="padding:6px 0;color:#111827;font-size:13px;font-weight:600;text-align:right;">${goal}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Duration:</td><td style="padding:6px 0;color:#111827;font-size:13px;font-weight:600;text-align:right;">${duration}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Strategy:</td><td style="padding:6px 0;color:#111827;font-size:13px;font-weight:600;text-align:right;">${strategy}</td></tr>
        ${strategy === 'Manual' ? `
          <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Gender:</td><td style="padding:6px 0;color:#111827;font-size:13px;font-weight:600;text-align:right;">${gender}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Ages:</td><td style="padding:6px 0;color:#111827;font-size:13px;font-weight:600;text-align:right;">${ages}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Interests:</td><td style="padding:6px 0;color:#111827;font-size:13px;font-weight:600;text-align:right;">${interests}</td></tr>
          <tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Keywords:</td><td style="padding:6px 0;color:#111827;font-size:13px;font-weight:600;text-align:right;">${keywords}</td></tr>
        ` : ''}
      </table>
    </div>

    <div style="background-color:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin-bottom:24px;">
      <h3 style="margin:0 0 16px;color:#111827;font-size:16px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;">Videos & Content</h3>
      ${videoListHtml}
      <div style="margin-top:16px;padding-top:12px;border-top:1px solid #f3f4f6;">
        <p style="margin:0;color:#6b7280;font-size:12px;">Channel: <strong style="color:#111827;">${channelName}</strong></p>
        <p style="margin:4px 0 0;font-size:12px;"><a href="${channelLink}" style="color:#3b82f6;text-decoration:none;">Go to Channel Link</a></p>
      </div>
    </div>

    <div style="background-color:#fef2f2;border:1px solid #fee2e2;border-radius:12px;padding:16px;margin-bottom:24px;">
      <p style="margin:0;color:#991b1b;font-size:12px;font-weight:bold;">PAYMENT INFO</p>
      <p style="margin:4px 0 0;color:#b91c1c;font-size:13px;">Gateway: <strong style="text-transform:uppercase;">${payment.gateway}</strong></p>
      <p style="margin:2px 0 0;color:#b91c1c;font-size:13px;">Ref ID: <strong>${payment.paymentId || 'N/A'}</strong></p>
    </div>
  `;

  const adminUrl = (process.env.FRONTEND_URL || 'http://localhost:5173') + '/admin';

  return {
    subject: `🚀 SUCCESSFUL ORDER: ${orderId} - ${symbol}${amount.toLocaleString()}`,
    html: getEmailTemplate('New Order Notification', content, 'Go to Admin Dashboard', adminUrl),
    text: `New Successful Order Details:\n\nOrder ID: ${orderId}\nCustomer: ${customerName} (${customerEmail})\nAmount: ${symbol}${amount}\n\nTargeting: ${country}, ${goal}, ${duration}\nStrategy: ${strategy}\n\nVideos:\n${(order.videos || []).map(v => `- ${v.title}: ${v.link}`).join('\n')}\n\nManage at: ${adminUrl}`,
  };
}

// --- send wrapper ---
async function sendEmail(to, subject, html, text) {
  const resendClient = createResendClient();
  const fromEmail = process.env.RESEND_FROM_EMAIL || process.env.EMAIL_FROM || 'no-reply@vidflyy.com';

  // If Resend is configured, use it
  if (resendClient) {
    try {
      const response = await resendClient.emails.send({
        from: fromEmail,
        to: Array.isArray(to) ? to : [to],
        subject: subject,
        html: html,
        text: text,
      });

      console.log(`✅ Email sent via Resend to ${to}`, response.data?.id);
      return { messageId: response.data?.id || `resend-${Date.now()}`, provider: 'Resend' };
    } catch (error) {
      console.error('❌ Failed to send email via Resend:', error.message);
      if (error.response) {
        console.error('Resend Error Details:', error.response);
      }
      throw error;
    }
  }

  // Fallback: log email to console (for local development without Resend)
  console.log('\n📧 ===== EMAIL (Console Mode - No Resend Configured) =====');
  console.log(`From: ${fromEmail}`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Text: ${text.substring(0, 200)}...`);
  console.log('==========================================================\n');

  return { messageId: 'console-' + Date.now(), provider: 'Console (Dev Mode)' };
}

// --- OTP Email Template ---
function getOtpEmailTemplate(otp) {
  const content = `
    <h2 style="margin:0 0 20px;color:#111827;font-size:24px;font-weight:bold;">Your Verification Code 🔐</h2>
    <p style="margin:0 0 16px;color:#374151;font-size:16px;line-height:1.6;">
      Hi there!
    </p>
    <p style="margin:0 0 24px;color:#374151;font-size:16px;line-height:1.6;">
      Use the following code to verify your email address and continue with Vidflyy:
    </p>
    <div style="background:linear-gradient(135deg,#dc2626 0%,#ec4899 100%);border-radius:12px;padding:24px;margin:24px 0;text-align:center;">
      <div style="background-color:#ffffff;border-radius:8px;padding:20px;display:inline-block;">
        <p style="margin:0;color:#111827;font-size:36px;font-weight:bold;letter-spacing:8px;font-family:monospace;">
          ${otp}
        </p>
      </div>
    </div>
    <p style="margin:24px 0 16px;color:#374151;font-size:16px;line-height:1.6;">
      This code will expire in <strong>10 minutes</strong>.
    </p>
    <p style="margin:0;color:#6b7280;font-size:14px;line-height:1.6;">
      If you didn't request this code, please ignore this email.
    </p>
  `;

  return {
    subject: 'Your Vidflyy Verification Code',
    html: getEmailTemplate('Verification Code', content),
    text: `Your Vidflyy verification code is: ${otp}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this code, please ignore this email.`,
  };
}

// --- exported helpers ---
exports.sendOtpEmail = async (email, otp) => {
  const tpl = getOtpEmailTemplate(otp);
  return sendEmail(email, tpl.subject, tpl.html, tpl.text);
};

exports.sendWelcomeEmail = async (email) => {
  const tpl = getWelcomeEmailTemplate();
  return sendEmail(email, tpl.subject, tpl.html, tpl.text);
};

exports.sendPaymentSummaryEmail = async (email, order, payment) => {
  const tpl = getPaymentSummaryEmailTemplate(order, payment);
  return sendEmail(email, tpl.subject, tpl.html, tpl.text);
};

exports.sendPaymentReminderEmail = async (email, order) => {
  const tpl = getPaymentReminderEmailTemplate(order);
  return sendEmail(email, tpl.subject, tpl.html, tpl.text);
};

exports.sendStatusUpdateEmail = async (email, order, oldStatus, newStatus) => {
  const tpl = getStatusUpdateEmailTemplate(order, oldStatus, newStatus);
  return sendEmail(email, tpl.subject, tpl.html, tpl.text);
};

exports.sendAdminNewOrderNotification = async (order, payment) => {
  const adminEmails = ['Shlok455@gmail.com', 'nikhilmendiratta2003@gmail.com'];
  const tpl = getAdminNewOrderNotificationTemplate(order, payment);
  return sendEmail(adminEmails, tpl.subject, tpl.html, tpl.text);
};

