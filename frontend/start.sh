#!/bin/bash

echo "Installing frontend dependencies..."
npm install

echo ""
echo "Starting development server..."
echo "Frontend will be available at: http://localhost:5173"
echo "Backend should be running at: http://localhost:5000"
echo ""

npm run dev