const crypto = require('crypto');

const EMAIL_COOKIE_NAME = 'vidfly_verified_email';
const EMAIL_COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

const getSecret = () =>
  process.env.EMAIL_COOKIE_SECRET ||
  process.env.JWT_SECRET ||
  'vidfly-cookie-secret';

const signEmail = (email) =>
  crypto.createHmac('sha256', getSecret()).update(email.toLowerCase()).digest('hex');

const encode = (payload) =>
  Buffer.from(JSON.stringify(payload)).toString('base64url');

const decode = (value) => {
  try {
    return JSON.parse(Buffer.from(value, 'base64url').toString());
  } catch (err) {
    return null;
  }
};

const buildEmailCookieValue = (email) =>
  encode({ email: email.toLowerCase(), signature: signEmail(email) });

const verifyEmailCookieValue = (value, email) => {
  if (!value) return false;
  const decoded = decode(value);
  if (!decoded || !decoded.email || !decoded.signature) return false;
  if (decoded.email !== email.toLowerCase()) return false;
  return decoded.signature === signEmail(email);
};

module.exports = {
  EMAIL_COOKIE_NAME,
  EMAIL_COOKIE_MAX_AGE,
  buildEmailCookieValue,
  verifyEmailCookieValue,
};


