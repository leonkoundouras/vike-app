#!/bin/bash

echo "🧪 Testing Enhanced Product Features"
echo "===================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_TOTAL=0

# Function to run test
run_test() {
    local test_name="$1"
    local test_command="$2"
    local expected_result="$3"
    
    TESTS_TOTAL=$((TESTS_TOTAL + 1))
    echo -e "\n${BLUE}Test $TESTS_TOTAL: $test_name${NC}"
    
    result=$(eval "$test_command" 2>/dev/null)
    
    if [[ "$result" == *"$expected_result"* ]] || [[ "$expected_result" == "SUCCESS" && $? -eq 0 ]]; then
        echo -e "${GREEN}✅ PASSED${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}❌ FAILED${NC}"
        echo "Expected: $expected_result"
        echo "Got: $result"
    fi
}

# Check if server is running
echo -e "\n${BLUE}🔍 Checking server status...${NC}"
if ! curl -s http://localhost:12001/api/health > /dev/null; then
    echo -e "${RED}❌ Server is not running on port 12001${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Server is running${NC}"

# Register a test user and get token
echo -e "\n${BLUE}🔐 Setting up test user...${NC}"
REGISTER_RESPONSE=$(curl -s -X POST http://localhost:12001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Enhanced Test User","email":"enhanced@example.com","password":"TestPass123"}')

if [[ "$REGISTER_RESPONSE" == *"token"* ]]; then
    TOKEN=$(echo "$REGISTER_RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
    echo -e "${GREEN}✅ Test user registered and token obtained${NC}"
elif [[ "$REGISTER_RESPONSE" == *"already exists"* ]]; then
    # User exists, try to login
    LOGIN_RESPONSE=$(curl -s -X POST http://localhost:12001/api/auth/login \
      -H "Content-Type: application/json" \
      -d '{"email":"enhanced@example.com","password":"TestPass123"}')
    TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
    echo -e "${GREEN}✅ Logged in with existing user${NC}"
else
    echo -e "${RED}❌ Failed to setup test user${NC}"
    exit 1
fi

# Test 1: Categories endpoint
run_test "Categories API endpoint" \
    "curl -s -H 'Authorization: Bearer $TOKEN' http://localhost:12001/api/products/categories | jq -r '.success'" \
    "true"

# Test 2: Category filtering
run_test "Filter products by Electronics category" \
    "curl -s -H 'Authorization: Bearer $TOKEN' 'http://localhost:12001/api/products?category=Electronics' | jq -r '.data.products | length'" \
    "3"

# Test 3: Price filtering (min price)
run_test "Filter products with minimum price $200" \
    "curl -s -H 'Authorization: Bearer $TOKEN' 'http://localhost:12001/api/products?minPrice=200' | jq -r '.data.products | length'" \
    "7"

# Test 4: Price filtering (max price)
run_test "Filter products with maximum price $100" \
    "curl -s -H 'Authorization: Bearer $TOKEN' 'http://localhost:12001/api/products?maxPrice=100' | jq -r '.data.products | length'" \
    "2"

# Test 5: Price range filtering
run_test "Filter products between $100-$300" \
    "curl -s -H 'Authorization: Bearer $TOKEN' 'http://localhost:12001/api/products?minPrice=100&maxPrice=300' | jq -r '.data.products | length'" \
    "5"

# Test 6: Search functionality
run_test "Search for 'wireless' products" \
    "curl -s -H 'Authorization: Bearer $TOKEN' 'http://localhost:12001/api/products?search=wireless' | jq -r '.data.products | length'" \
    "3"

# Test 7: Price sorting (ascending)
run_test "Sort products by price ascending" \
    "curl -s -H 'Authorization: Bearer $TOKEN' 'http://localhost:12001/api/products?sortBy=price&sortOrder=asc' | jq -r '.data.products[0].price'" \
    "39.99"

# Test 8: Price sorting (descending)
run_test "Sort products by price descending" \
    "curl -s -H 'Authorization: Bearer $TOKEN' 'http://localhost:12001/api/products?sortBy=price&sortOrder=desc' | jq -r '.data.products[0].price'" \
    "1299.99"

# Test 9: Name sorting
run_test "Sort products by name ascending" \
    "curl -s -H 'Authorization: Bearer $TOKEN' 'http://localhost:12001/api/products?sortBy=name&sortOrder=asc' | jq -r '.data.products[0].name'" \
    "Adjustable Standing Desk"

# Test 10: Combined filters
run_test "Combined filter: Electronics under $200" \
    "curl -s -H 'Authorization: Bearer $TOKEN' 'http://localhost:12001/api/products?category=Electronics&maxPrice=200' | jq -r '.data.products | length'" \
    "2"

# Test 11: Category count verification
run_test "Verify Electronics category has 3 products" \
    "curl -s -H 'Authorization: Bearer $TOKEN' http://localhost:12001/api/products/categories | jq -r '.data.categories[] | select(.name==\"Electronics\") | .count'" \
    "3"

# Test 12: Frontend page loading
run_test "Products page loads successfully" \
    "curl -s http://localhost:12001/products | grep -c 'Product'" \
    "SUCCESS"

# Test 13: Frontend with category parameter
run_test "Products page with category parameter" \
    "curl -s 'http://localhost:12001/products?category=Electronics' | grep -c 'Product'" \
    "SUCCESS"

# Test 14: Create new product with category
echo -e "\n${BLUE}Test 14: Create product with new category${NC}"
CREATE_RESPONSE=$(curl -s -X POST http://localhost:12001/api/products \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Gaming Mouse",
    "description": "High-precision gaming mouse with RGB lighting",
    "price": 79.99,
    "category": "Gaming",
    "stock": 15
  }')

if [[ "$CREATE_RESPONSE" == *"success\":true"* ]]; then
    echo -e "${GREEN}✅ PASSED${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
    
    # Test 15: Verify new category appears in categories list
    run_test "New Gaming category appears in categories" \
        "curl -s -H 'Authorization: Bearer $TOKEN' http://localhost:12001/api/products/categories | jq -r '.data.categories[] | select(.name==\"Gaming\") | .name'" \
        "Gaming"
else
    echo -e "${RED}❌ FAILED${NC}"
    echo "Response: $CREATE_RESPONSE"
fi
TESTS_TOTAL=$((TESTS_TOTAL + 1))

# Summary
echo -e "\n${BLUE}📊 Test Summary${NC}"
echo "==============="
echo -e "Tests Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Tests Total:  ${BLUE}$TESTS_TOTAL${NC}"

if [ $TESTS_PASSED -eq $TESTS_TOTAL ]; then
    echo -e "\n${GREEN}🎉 All tests passed! Enhanced features are working perfectly!${NC}"
    exit 0
else
    echo -e "\n${RED}❌ Some tests failed. Please check the implementation.${NC}"
    exit 1
fi