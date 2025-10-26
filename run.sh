#!/bin/bash

MODE=${1:-local}   # default to 'local' if no argument is given

echo "🧹 Cleaning old containers..."
docker-compose down #-v

if [[ "$MODE" == "local" ]]; then
  BACKEND_URL="http://localhost:8080"
  FRONTEND_URL="http://localhost:5173"
  DATABASE_URL="localhost:5433"
elif [[ "$MODE" == "vm" ]]; then
  VM_IP=$(curl -s ifconfig.me)
  BACKEND_URL="http://${VM_IP}:8080"
  FRONTEND_URL="http://${VM_IP}:5173"
  DATABASE_URL="${VM_IP}:5433"
else
  echo "❌ Unknown mode: $MODE"
  echo "Usage: ./run.sh [local|vm]"
  exit 1
fi

echo "🌐 Using backend URL: $BACKEND_URL"

# Pass to docker-compose build
BACKEND_URL=$BACKEND_URL docker-compose up -d --build

echo "✅ All services are running!"
echo "Frontend: $FRONTEND_URL"
echo "Backend:  $BACKEND_URL"
echo "Database: $DATABASE_URL"
