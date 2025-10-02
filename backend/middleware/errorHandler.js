function errorHandler(err, req, res, next) {
  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const details = err.details || undefined;
  if (process.env.NODE_ENV !== 'test') {
    // Log errors in non-test environments
    console.error('[ErrorHandler]', statusCode, message, details || '');
  }
  res.status(statusCode).json({ message, details });
}

module.exports = errorHandler;


