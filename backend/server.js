require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

// CORS setup: restrict to configured frontend origin(s)
// Set FRONTEND_ORIGIN to your deployed frontend, e.g. https://myproject.vercel.app
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || '';
const LOCAL_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];
const allowedOrigins = [
  ...LOCAL_ORIGINS,
  ...(FRONTEND_ORIGIN ? [FRONTEND_ORIGIN] : []),
];

const corsOptions = {
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser clients (curl/postman)
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// When running behind a reverse proxy (nginx), trust the proxy for correct protocol/ip
app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.use('/api/leads', require('./routes/lead.routes'));

// Global error handler placeholder (real handler will be in middleware)
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


