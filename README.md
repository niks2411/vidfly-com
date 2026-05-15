# Vidfly - YouTube Growth Services 🚀

Vidfly is a comprehensive full-stack application designed to help creators and businesses scale their presence on YouTube. It provides a suite of tools for campaign management, SEO optimization, and revenue analytics.

## 🌟 Features

- **Campaign Management**: Strategize and manage your YouTube growth campaigns with ease.
- **Revenue Analytics**: Track and analyze your earnings with precision.
- **SEO Services**: Built-in tools for optimizing video reach and visibility.
- **Secure Authentication**: Robust user management using JWT and Google OAuth 2.0.
- **Interactive Dashboard**: Modern UI with real-time analytics and responsive design.
- **API Documentation**: Fully documented backend with Swagger UI.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) / Radix UI
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)
- **Charts**: [Recharts](https://recharts.org/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **Authentication**: JWT & [Passport.js](https://www.passportjs.org/) (Google OAuth)
- **Email**: [Resend](https://resend.com/)
- **Documentation**: [Swagger](https://swagger.io/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/niks2411/vidfly-com.git
   cd vidfly-com
   ```

2. **Install all dependencies:**
   Run the helper script from the root:
   ```bash
   npm run install:all
   ```

3. **Environment Setup:**
   - Create a `.env` file in the `backend` directory (refer to `.env.example`).
   - Create a `.env` file in the `frontend` directory.

   **Backend `.env` key variables:**
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   GOOGLE_CLIENT_ID=your_id
   GOOGLE_CLIENT_SECRET=your_secret
   RESEND_API_KEY=your_key
   ```

### Running the Application

Start both the frontend and backend concurrently:
```bash
npm run dev
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **API Docs**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## 📁 Project Structure

```text
├── backend/            # Express server & API logic
│   ├── config/         # DB & Passport configuration
│   ├── controllers/    # Route handlers
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   └── server.js       # Main entry point
├── frontend/           # Next.js client application
│   ├── src/app/        # App router pages
│   ├── src/components/ # Reusable UI components
│   └── src/lib/        # Utilities & hooks
└── package.json        # Root workspace configuration
```

---

## 📄 License
This project is licensed under the MIT License.
