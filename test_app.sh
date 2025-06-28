#!/bin/bash

echo "=== COMPREHENSIVE APPLICATION TEST ==="
echo "1. Testing server health..."
curl -s http://localhost:12001/api/health | jq '.'

echo -e "\n2. Testing homepage rendering..."
curl -s http://localhost:12001/ | grep -q "Welcome to Vike Product Manager" && echo "✅ Homepage renders correctly" || echo "❌ Homepage failed"

echo -e "\n3. Testing login page..."
curl -s http://localhost:12001/login | grep -q "pageId.*login" && echo "✅ Login page renders correctly" || echo "❌ Login page failed"

echo -e "\n4. Testing products page..."
curl -s http://localhost:12001/products | grep -q "pageId.*products" && echo "✅ Products page renders correctly" || echo "❌ Products page failed"

echo -e "\n5. Testing authentication API..."
curl -s -X POST http://localhost:12001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test2@example.com","password":"TestPass123"}' | jq '.success'

echo -e "\n6. Testing products API with auth..."
TOKEN=$(curl -s -X POST http://localhost:12001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test2@example.com","password":"TestPass123"}' | jq -r '.data.token')
curl -s -H "Authorization: Bearer $TOKEN" http://localhost:12001/api/products | jq '.success'

echo -e "\n7. Testing todos API with auth..."
curl -s -H "Authorization: Bearer $TOKEN" http://localhost:12001/api/todos | jq '.success'

echo -e "\n8. Testing register page..."
curl -s http://localhost:12001/register | grep -q "pageId.*register" && echo "✅ Register page renders correctly" || echo "❌ Register page failed"

echo -e "\n9. Testing about page..."
curl -s http://localhost:12001/about | grep -q "pageId.*about" && echo "✅ About page renders correctly" || echo "❌ About page failed"

echo -e "\n=== TEST COMPLETE ==="