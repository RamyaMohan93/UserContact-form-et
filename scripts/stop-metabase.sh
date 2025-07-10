#!/bin/bash

# Stop Metabase Analytics
echo "🛑 Stopping CortexCatalyst Analytics..."

# Stop and remove containers
docker-compose down

echo "✅ Metabase containers stopped"
echo ""
echo "💾 Data is preserved in Docker volumes"
echo "🚀 To restart: ./scripts/start-metabase.sh"
