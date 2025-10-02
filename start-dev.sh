#!/bin/bash

echo "Starting VidFly Development Environment..."
echo ""

echo "Starting Backend Server..."
cd backend
npm run dev &
BACKEND_PID=$!

echo "Waiting for backend to start..."
sleep 3

echo "Starting Frontend Development Server..."
cd ../frontend
npm install
npm run dev &
FRONTEND_PID=$!

echo ""
echo "Development servers are running:"
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo "API Docs: http://localhost:5000/api-docs"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for user to stop
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait