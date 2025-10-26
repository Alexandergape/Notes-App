#!/bin/bash

echo "🧹 Cleaning old containers..."
docker-compose down #-v   # remove containers + volumes (optional: -v removes pgdata)

echo "🚀 Starting Notes App stack..."

VM_IP=$(curl -s ifconfig.me)
echo "🌐 VM IP detected: $VM_IP"
VITE_API_URL="http://${VM_IP}:8080" docker-compose up -d --build

# docker-compose up -d #--build

echo "✅ All services are running!"
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:8080"
echo "Database: localhost:5433"

echo "📚 Enjoy your Notes App!"