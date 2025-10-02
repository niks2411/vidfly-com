# VidFly - YouTube Growth Services

A full-stack application for YouTube growth services with React frontend and Node.js backend.

## 🚀 Quick Start

### 1. Start the Backend
```bash
cd backend
npm run dev
```
Backend will run on: http://localhost:5000

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on: http://localhost:5173

## 📁 Project Structure

```
vidfly/
├── backend/                 # Node.js Express API
│   ├── config/             # Database and app configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── docs/              # API documentation
│   ├── server.js          # Main server file
│   └── package.json
│
├── frontend/               # React Vite application
│   ├── src/
│   │   ├── App.jsx        # Main application component
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Tailwind CSS styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

## 🛠 Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Joi** - Data validation
- **Swagger** - API documentation
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **ESLint** - Code linting

## 🎯 Features

### Backend API
- ✅ **Order Management** - Create, read, update orders
- ✅ **Authentication** - JWT-based auth system
- ✅ **Payment Integration** - Razorpay/Stripe support
- ✅ **Admin Panel** - Order status management
- ✅ **Lead Management** - Customer lead tracking
- ✅ **API Documentation** - Swagger UI at `/api-docs`
- ✅ **MongoDB Integration** - Persistent data storage
- ✅ **CORS Configuration** - Frontend-backend communication
- ✅ **Security** - Helmet, input validation

### Frontend Application
- ✅ **Responsive Design** - Mobile-friendly interface
- ✅ **Service Selection** - Views, Subscribers, Watch Time, Likes
- ✅ **Predefined Plans** - Quick selection options
- ✅ **Custom Plans** - Create custom service packages
- ✅ **Order Form** - Complete order creation workflow
- ✅ **Real-time Validation** - Form validation and error handling
- ✅ **Order Summary** - Live calculation and preview
- ✅ **Success Feedback** - Order confirmation with details
- ✅ **Backend Testing** - Built-in connection test
- ✅ **Modern UI** - Clean, professional design

## 📊 API Endpoints

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:orderId` - Get order by ID
- `PUT /api/orders/:orderId/status` - Update order status (Admin)

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password reset

### Payments
- `POST /api/payments/create` - Create payment order
- `POST /api/payments/verify` - Verify payment

### Admin
- `GET /api/admin/orders` - Get all orders
- `GET /api/admin/stats` - Get dashboard statistics

### Leads
- `POST /api/leads` - Create new lead
- `GET /api/leads` - Get all leads

## 🗄 Database Schema

### Order Model
```javascript
{
  orderId: String,           // Unique order identifier
  customerName: String,      // Customer full name
  email: String,            // Customer email
  phone: String,            // Customer phone (optional)
  youtubeLink: String,      // YouTube video/channel URL
  plan: {
    name: String,           // Plan name
    type: String,           // views, subscribers, watch_time, likes
    quantity: Number,       // Service quantity
    price: Number,          // Price in INR
    currency: String        // Currency (default: INR)
  },
  status: String,           // Order status
  payment: {               // Payment details
    gateway: String,
    paymentOrderId: String,
    paymentId: String,
    signature: String,
    amount: Number,
    currency: String,
    status: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vidflyy
JWT_SECRET=your_jwt_secret_here
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

#### Frontend (.env)
```env
VITE_API_BASE=http://localhost:5000
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vidfly
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000/api-docs

## 🧪 Testing the Application

1. **Test Backend Connection**
   - Click "Test Backend Connection" button in the frontend
   - Should show "Backend connection successful!"

2. **Create a Test Order**
   - Fill out the order form with test data
   - Select a service type (Views, Subscribers, etc.)
   - Choose a predefined plan or create custom
   - Submit the form

3. **Verify in Database**
   - Check MongoDB for the created order
   - Order should have status "Payment Pending"
   - All form data should be saved correctly

## 🔍 API Documentation

Visit http://localhost:5000/api-docs for interactive Swagger documentation.

## 🛡 Security Features

- **CORS Protection** - Configured for specific origins
- **Helmet** - Security headers
- **Input Validation** - Joi schema validation
- **JWT Authentication** - Secure token-based auth
- **Environment Variables** - Sensitive data protection

## 📱 Responsive Design

The frontend is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🎨 UI/UX Features

- **Modern Design** - Clean, professional interface
- **Intuitive Navigation** - Easy-to-use form flow
- **Visual Feedback** - Loading states, success/error messages
- **Accessibility** - Proper labels, keyboard navigation
- **Performance** - Fast loading with Vite

## 🔄 Development Workflow

1. **Backend Development**
   ```bash
   cd backend
   npm run dev  # Starts with nodemon for auto-reload
   ```

2. **Frontend Development**
   ```bash
   cd frontend
   npm run dev  # Starts Vite dev server with HMR
   ```

3. **Production Build**
   ```bash
   cd frontend
   npm run build  # Creates optimized production build
   ```

## 📈 Next Steps

- [ ] Add payment gateway integration
- [ ] Implement user authentication
- [ ] Add order tracking functionality
- [ ] Create admin dashboard
- [ ] Add email notifications
- [ ] Implement order status updates
- [ ] Add analytics and reporting
- [ ] Deploy to production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Happy Coding! 🚀**