const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // 1. Try HTTPOnly cookie first
  let token = req.cookies && req.cookies.vidfly_token;

  // 2. Fallback to Authorization header (backward compat)
  if (!token) {
    const authHeader = req.headers.authorization || '';
    token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  }

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = authMiddleware;
