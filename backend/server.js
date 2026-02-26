// Load environment-specific .env file
const envFile = process.env.NODE_ENV === 'development' ? '.env.development' : '.env';
require('dotenv').config({ path: envFile });

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// CORS setup: restrict to configured frontend origin(s)
// Set FRONTEND_ORIGIN to your deployed frontend, e.g. https://myproject.vercel.app
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;
const LOCAL_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:3001',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'http://localhost:8080',
  'http://127.0.0.1:8080',
];
const ALLOWED_ORIGIN_REGEX = [
  /^https:\/\/vidflyy\.in$/,
  /^https:\/\/www\.vidflyy\.in$/,
  /^http:\/\/localhost:\d+$/,
  /^http:\/\/127\.0\.0\.1:\d+$/
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // server-to-server

    const isAllowed = ALLOWED_ORIGIN_REGEX.some((regex) =>
      regex.test(origin)
    );

    if (isAllowed) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'x-client-id',
    'x-client-secret',
    'x-api-version',
    'x-cashfree-signature'
  ],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

// When running behind a reverse proxy (nginx), trust the proxy for correct protocol/ip
app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());

// DB Connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/vidflyy';
mongoose
  .connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Health endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Swagger docs
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/payments', require('./routes/payment.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/user-preferences', require('./routes/userPreferences.routes'));
app.use('/api/youtube', require('./routes/youtube.routes'));
app.use('/api/pricing', require('./routes/pricing.routes'));
app.use('/api/free-views', require('./routes/freeViews.routes'));

// Global error handler placeholder (real handler will be in middleware)
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
});

// Start payment reminder cron job
try {
  const { startPaymentReminderJob } = require('./jobs/paymentReminderJob');
  startPaymentReminderJob();
} catch (error) {
  console.warn('Failed to start payment reminder job:', error.message);
  console.warn('Install node-cron package: npm install node-cron');
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


