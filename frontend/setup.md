# Frontend Setup Instructions

## Quick Start

1. **Install Dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```

3. **Access the Application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## What's Included

✅ **Vite React App** - Fast development server
✅ **Tailwind CSS** - Utility-first CSS framework  
✅ **Axios** - HTTP client for API calls
✅ **Responsive Design** - Mobile-friendly interface
✅ **Order Form** - Complete form to test MongoDB integration
✅ **API Integration** - Connected to your backend at localhost:5000
✅ **Error Handling** - User-friendly error messages
✅ **Success Feedback** - Order confirmation with details

## Features

- **Service Selection**: Views, Subscribers, Watch Time, Likes
- **Predefined Plans**: Quick selection with preset quantities and prices
- **Custom Plans**: Ability to create custom service packages
- **Order Summary**: Real-time calculation and preview
- **Backend Testing**: Built-in connection test button
- **MongoDB Integration**: Orders are saved to your MongoDB database

## API Endpoints Used

- `GET /health` - Test backend connection
- `POST /api/orders` - Create new orders

## Environment Variables

The app uses `VITE_API_BASE=http://localhost:5000` to connect to your backend.

## Next Steps

1. Make sure your backend is running on port 5000
2. Install frontend dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Test the form by creating an order
5. Check your MongoDB database to see the saved orders