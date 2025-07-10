#!/bin/bash

# Start Metabase Analytics for CortexCatalyst
echo "🚀 Starting CortexCatalyst Analytics with Metabase..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if docker-compose.yml exists
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ docker-compose.yml not found. Please ensure you're in the correct directory."
    exit 1
fi

# Start the containers
echo "📦 Starting Metabase containers..."
docker-compose up -d

# Wait for containers to be ready
echo "⏳ Waiting for Metabase to initialize..."
sleep 10

# Check container status
echo "📊 Container Status:"
docker-compose ps

# Show logs
echo "📝 Recent logs:"
docker-compose logs --tail=20 metabase

echo ""
echo "✅ Metabase is starting up!"
echo "🌐 Access Metabase at: http://localhost:3001"
echo "⏱️  First startup may take 2-3 minutes"
echo ""
echo "📋 Next steps:"
echo "1. Open http://localhost:3001 in your browser"
echo "2. Complete the initial setup"
echo "3. Connect to your Supabase database"
echo "4. Create the challenges pie chart"
echo ""
echo "🛑 To stop: docker-compose down"
echo "📊 To view logs: docker-compose logs metabase"
