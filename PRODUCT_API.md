# Product Management API Documentation

This document describes the complete Product Management API endpoints for creating, viewing, editing, and managing products with image upload capabilities.

## 🚀 Features

- **Complete CRUD Operations**: Create, Read, Update, Delete products
- **Image Upload & Management**: Upload, update, and serve product images
- **Product Information**: Name, description, price, category, SKU, stock, status
- **User Isolation**: Each user manages their own products
- **Statistics**: Product counts, inventory value, stock levels
- **Validation**: Server-side validation for all inputs
- **File Management**: Automatic image cleanup on product deletion

## 📚 API Endpoints

### Authentication Required
All product endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <jwt-token>
```

### 1. Get All Products
**GET** `/api/products`

Returns a list of all products for the authenticated user with total count.

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "1751120625964",
        "name": "Updated Test Product",
        "description": "A test product for demonstration",
        "price": 39.99,
        "category": "Electronics",
        "sku": "TEST001",
        "stock": 75,
        "status": "active",
        "image": "/uploads/products/product-1751120678180-158028157.jpg",
        "createdAt": "2025-06-28T14:23:45.964Z",
        "updatedAt": "2025-06-28T14:24:38.181Z",
        "userId": "1751120612632"
      }
    ],
    "total": 1
  }
}
```

### 2. Create Product (without image)
**POST** `/api/products`

**Content-Type:** `application/json`

**Request Body:**
```json
{
  "name": "Product Name",
  "description": "Product description (optional)",
  "price": 29.99,
  "category": "Category Name (optional)",
  "sku": "UNIQUE-SKU (optional)",
  "stock": 100,
  "status": "active"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "product": {
      "id": "1751120625964",
      "name": "Product Name",
      "description": "Product description",
      "price": 29.99,
      "category": "Category Name",
      "sku": "UNIQUE-SKU",
      "stock": 100,
      "status": "active",
      "image": null,
      "createdAt": "2025-06-28T14:23:45.964Z",
      "updatedAt": "2025-06-28T14:23:45.964Z",
      "userId": "1751120612632"
    }
  }
}
```

### 3. Create Product (with image)
**POST** `/api/products`

**Content-Type:** `multipart/form-data`

**Form Fields:**
- `name`: Product name (required)
- `description`: Product description (optional)
- `price`: Product price (required, positive number)
- `category`: Product category (optional)
- `sku`: Stock Keeping Unit (optional, must be unique per user)
- `stock`: Stock quantity (optional, default: 0)
- `status`: Product status (optional, default: "active", values: "active", "inactive", "draft")
- `image`: Image file (optional, max 5MB, images only)

**cURL Example:**
```bash
curl -X POST http://localhost:12001/api/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "name=Laptop Computer" \
  -F "description=High-performance laptop" \
  -F "price=999.99" \
  -F "category=Electronics" \
  -F "sku=LAPTOP001" \
  -F "stock=25" \
  -F "status=active" \
  -F "image=@product-image.jpg"
```

### 4. Get Single Product
**GET** `/api/products/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "product": {
      "id": "1751120625964",
      "name": "Product Name",
      "description": "Product description",
      "price": 29.99,
      "category": "Electronics",
      "sku": "TEST001",
      "stock": 75,
      "status": "active",
      "image": "/uploads/products/product-1751120678180-158028157.jpg",
      "createdAt": "2025-06-28T14:23:45.964Z",
      "updatedAt": "2025-06-28T14:24:38.181Z",
      "userId": "1751120612632"
    }
  }
}
```

### 5. Update Product Information
**PUT** `/api/products/:id`

**Content-Type:** `application/json` or `multipart/form-data`

Update product information. All fields are optional. Include `image` field for multipart requests to update the image.

**JSON Request:**
```json
{
  "name": "Updated Product Name",
  "price": 39.99,
  "stock": 150,
  "status": "inactive"
}
```

**Multipart Request (with image):**
```bash
curl -X PUT http://localhost:12001/api/products/PRODUCT_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "name=Updated Product Name" \
  -F "price=39.99" \
  -F "image=@new-image.jpg"
```

### 6. Update Product Image Only
**PATCH** `/api/products/:id/image`

**Content-Type:** `multipart/form-data`

Updates only the product image. Replaces the existing image if one exists.

**Form Fields:**
- `image`: Image file (required, max 5MB, images only)

**cURL Example:**
```bash
curl -X PATCH http://localhost:12001/api/products/PRODUCT_ID/image \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "image=@new-product-image.jpg"
```

### 7. Delete Product
**DELETE** `/api/products/:id`

Deletes the product and its associated image file.

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": {
    "product": {
      "id": "1751120659101",
      "name": "Deleted Product",
      "description": "This product was deleted",
      "price": 999.99,
      "category": "Electronics",
      "sku": "DELETED001",
      "stock": 25,
      "status": "active",
      "image": "/uploads/products/product-1751120659098-389334530.jpg",
      "createdAt": "2025-06-28T14:24:19.101Z",
      "updatedAt": "2025-06-28T14:24:19.101Z",
      "userId": "1751120612632"
    }
  }
}
```

### 8. Get Product Statistics
**GET** `/api/products/stats`

Returns comprehensive statistics about the user's products.

**Response:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "total": 5,
      "active": 4,
      "inactive": 1,
      "draft": 0,
      "totalValue": 2499.95,
      "totalStock": 150,
      "lowStock": 2,
      "categories": 3
    }
  }
}
```

**Statistics Explanation:**
- `total`: Total number of products
- `active`: Number of active products
- `inactive`: Number of inactive products
- `draft`: Number of draft products
- `totalValue`: Total inventory value (price × stock for all products)
- `totalStock`: Total stock quantity across all products
- `lowStock`: Number of products with stock < 10
- `categories`: Number of unique categories

### 9. Access Product Images
**GET** `/uploads/products/:filename`

Product images are served statically and can be accessed directly via their URL path.

**Example:**
```
http://localhost:12001/uploads/products/product-1751120678180-158028157.jpg
```

## 📋 Product Fields

### Required Fields
- **name**: Product name (1-200 characters)
- **price**: Product price (positive number)

### Optional Fields
- **description**: Product description (max 2000 characters)
- **category**: Product category (max 100 characters)
- **sku**: Stock Keeping Unit (max 50 characters, must be unique per user)
- **stock**: Stock quantity (non-negative integer, default: 0)
- **status**: Product status ("active", "inactive", "draft", default: "active")
- **image**: Product image file (max 5MB, images only)

### Auto-Generated Fields
- **id**: Unique product identifier
- **createdAt**: Product creation timestamp
- **updatedAt**: Last update timestamp
- **userId**: Owner user ID

## 🔒 Validation Rules

### Product Name
- Required
- 1-200 characters
- Trimmed of whitespace

### Price
- Required
- Must be a positive number (≥ 0)
- Automatically converted to float

### Description
- Optional
- Maximum 2000 characters
- Trimmed of whitespace

### Category
- Optional
- Maximum 100 characters
- Trimmed of whitespace

### SKU (Stock Keeping Unit)
- Optional
- Maximum 50 characters
- Must be unique per user
- Trimmed of whitespace

### Stock
- Optional
- Must be a non-negative integer (≥ 0)
- Default value: 0
- Automatically converted to integer

### Status
- Optional
- Must be one of: "active", "inactive", "draft"
- Default value: "active"

### Image
- Optional
- Maximum file size: 5MB
- Allowed types: All image formats (image/*)
- Automatically generates unique filename
- Old images are deleted when updated

## 🚨 Error Responses

### Validation Errors
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "type": "field",
      "value": "",
      "msg": "Product name must be between 1 and 200 characters",
      "path": "name",
      "location": "body"
    }
  ]
}
```

### Authentication Errors
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

### Not Found Errors
```json
{
  "success": false,
  "message": "Product not found"
}
```

### Duplicate SKU Error
```json
{
  "success": false,
  "message": "SKU already exists"
}
```

### File Upload Errors
```json
{
  "success": false,
  "message": "Only image files are allowed!"
}
```

## 🧪 Testing Examples

### Complete Testing Workflow

1. **Register and Login:**
```bash
# Register user
curl -X POST http://localhost:12001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Product Manager","email":"products@test.com","password":"ProductTest123"}'

# Login and get token
curl -X POST http://localhost:12001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"products@test.com","password":"ProductTest123"}'
```

2. **Create Products:**
```bash
# Create product without image
curl -X POST http://localhost:12001/api/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":29.99,"category":"Electronics","stock":50}'

# Create product with image
curl -X POST http://localhost:12001/api/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "name=Laptop" \
  -F "price=999.99" \
  -F "image=@laptop.jpg"
```

3. **View Products:**
```bash
# Get all products
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:12001/api/products

# Get single product
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:12001/api/products/PRODUCT_ID

# Get statistics
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:12001/api/products/stats
```

4. **Update Products:**
```bash
# Update product info
curl -X PUT http://localhost:12001/api/products/PRODUCT_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Product","price":39.99}'

# Update product image
curl -X PATCH http://localhost:12001/api/products/PRODUCT_ID/image \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@new-image.jpg"
```

5. **Delete Product:**
```bash
curl -X DELETE http://localhost:12001/api/products/PRODUCT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🔧 Implementation Notes

### File Storage
- Images are stored in `uploads/products/` directory
- Filenames are auto-generated with timestamp and random suffix
- Old images are automatically deleted when updated or product is deleted

### Security
- All endpoints require JWT authentication
- File upload validation prevents non-image files
- File size limited to 5MB
- User isolation ensures users only see their own products

### Performance
- Products are sorted by creation date (newest first)
- In-memory storage for development (replace with database for production)
- Efficient file handling with automatic cleanup

### Database Schema (for production)
```sql
CREATE TABLE products (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(100),
  sku VARCHAR(50),
  stock INTEGER DEFAULT 0,
  status ENUM('active', 'inactive', 'draft') DEFAULT 'active',
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  user_id VARCHAR(255) NOT NULL,
  UNIQUE KEY unique_sku_per_user (user_id, sku),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

**🎉 The Product Management API is now fully functional with all CRUD operations, image upload capabilities, and comprehensive validation!**