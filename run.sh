#!/bin/bash

echo "🧹 Cleaning old containers..."
docker-compose down #-v   # remove containers + volumes (optional: -v removes pgdata)

echo "🚀 Starting Notes App stack..."
docker-compose up -d #--build

echo "✅ All services are running!"
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:8080"
echo "Database: localhost:5433"

echo "📚 Enjoy your Notes App!"