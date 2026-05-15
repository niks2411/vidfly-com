# Vidfly - YouTube Growth Services

Vidfly is a full-stack application designed to help creators and businesses manage their YouTube presence. The platform provides tools for campaign management, SEO optimization, and revenue analytics.

## Features

- **Campaign Management**: Strategize and manage YouTube growth campaigns.
- **Revenue Analytics**: Track and analyze earnings data.
- **SEO Services**: Built-in tools for video reach and visibility optimization.
- **Authentication**: User management using JWT and Google OAuth 2.0.
- **Dashboard**: Modern interface with real-time analytics.
- **API Documentation**: Backend endpoints documented via Swagger UI.

## Tech Stack

### Frontend
- **Framework**: Next.js (React 19)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI / Radix UI
- **Animations**: Framer Motion
- **State Management**: TanStack Query
- **Charts**: Recharts

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT & Passport.js (Google OAuth)
- **Email**: Resend
- **Documentation**: Swagger

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/niks2411/vidfly-com.git
   cd vidfly-com
   ```

2. **Install dependencies:**
   Run the helper script from the root:
   ```bash
   npm run install:all
   ```

3. **Environment Setup:**
   - Create a `.env` file in the `backend` directory (refer to `.env.example`).
   - Create a `.env` file in the `frontend` directory.

   **Backend .env key variables:**
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

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Docs**: http://localhost:5000/api-docs

---

## Project Structure

```text
├── backend/            # Express server and API logic
│   ├── config/         # DB and Passport configuration
│   ├── controllers/    # Route handlers
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   └── server.js       # Main entry point
├── frontend/           # Next.js client application
│   ├── src/app/        # App router pages
│   ├── src/components/ # Reusable UI components
│   └── src/lib/        # Utilities and hooks
└── package.json        # Root workspace configuration
```

---

## License
This project is licensed under the MIT License.
