# Vike Product Management App

A modern, secure product management application built with Vike SSR, React, and Express.js featuring JWT authentication, bcrypt password hashing, and comprehensive product management with image uploads.

## 🚀 Features

### Authentication & Security
- **JWT Authentication**: Secure token-based authentication system
- **Password Hashing**: bcrypt for secure password storage
- **Input Validation**: Server-side validation with express-validator
- **Rate Limiting**: Protection against brute force attacks
- **Security Headers**: Helmet.js for security headers
- **CORS Support**: Configurable cross-origin resource sharing

### Product Management
- **Complete CRUD**: Create, read, update, delete products
- **Image Upload**: Upload and manage product images (max 5MB)
- **Product Information**: Name, description, price, category, SKU, stock, status
- **Image Management**: Update or change product images
- **Statistics**: Product counts, inventory value, stock levels
- **User Isolation**: Each user manages their own products
- **File Serving**: Direct access to uploaded product images

### Frontend Features
- **Server-Side Rendering**: Fast initial page loads with Vike SSR
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Immediate UI feedback
- **Form Validation**: Client-side and server-side validation
- **Error Handling**: Comprehensive error messages
- **Loading States**: User feedback during operations

## 📁 Project Structure

```
vike-app/
├── api/
│   ├── auth.js          # Authentication endpoints and logic
│   └── todos.js         # Todo CRUD operations and validation
├── components/
│   ├── AuthContext.jsx  # Authentication context provider
│   └── Layout.jsx       # Main layout component with navigation
├── pages/
│   ├── index/
│   │   └── +Page.jsx    # Home page
│   ├── login/
│   │   └── +Page.jsx    # Login page
│   ├── register/
│   │   └── +Page.jsx    # Registration page
│   ├── todos/
│   │   └── +Page.jsx    # Todo management page
│   ├── about/
│   │   └── +Page.jsx    # About page
│   ├── +config.js       # Vike configuration
│   └── +Layout.jsx      # Root layout wrapper
├── server.js            # Express server with API routes
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to:
   - Home: http://localhost:12001/
   - Login: http://localhost:12001/login
   - Register: http://localhost:12001/register
   - Todos: http://localhost:12001/todos (requires authentication)
   - About: http://localhost:12001/about
   - API Health: http://localhost:12001/api/health

The server runs on port 12001 and is configured to accept connections from any host (0.0.0.0).

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

#### Get User Profile
```http
GET /api/auth/profile
Authorization: Bearer <jwt-token>
```

### Todo Endpoints

#### Get All Todos
```http
GET /api/todos
Authorization: Bearer <jwt-token>
```

#### Create Todo
```http
POST /api/todos
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the todo application",
  "priority": "high",
  "dueDate": "2025-12-31"
}
```

#### Update Todo
```http
PUT /api/todos/:id
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "Updated title",
  "completed": true,
  "priority": "medium"
}
```

#### Delete Todo
```http
DELETE /api/todos/:id
Authorization: Bearer <jwt-token>
```

#### Toggle Todo Completion
```http
PATCH /api/todos/:id/toggle
Authorization: Bearer <jwt-token>
```

#### Get Todo Statistics
```http
GET /api/todos/stats
Authorization: Bearer <jwt-token>
```

### Health Check
```http
GET /api/health
```

### Product Endpoints

#### Get All Products
```http
GET /api/products
Authorization: Bearer <jwt-token>
```

#### Create Product (with image)
```http
POST /api/products
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data

Form fields:
- name: Product name (required)
- description: Product description (optional)
- price: Product price (required)
- category: Product category (optional)
- sku: Stock Keeping Unit (optional)
- stock: Stock quantity (optional)
- status: Product status (optional)
- image: Image file (optional, max 5MB)
```

#### Update Product
```http
PUT /api/products/:id
Authorization: Bearer <jwt-token>
Content-Type: application/json or multipart/form-data

{
  "name": "Updated Product Name",
  "price": 39.99,
  "stock": 150
}
```

#### Update Product Image
```http
PATCH /api/products/:id/image
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data

Form fields:
- image: Image file (required, max 5MB)
```

#### Delete Product
```http
DELETE /api/products/:id
Authorization: Bearer <jwt-token>
```

#### Get Product Statistics
```http
GET /api/products/stats
Authorization: Bearer <jwt-token>
```

#### Access Product Images
```http
GET /uploads/products/:filename
```

### Production

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run dev:prod
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Build and start production server
- `npm run dev:prod` - Start production server

## 🛠️ Technology Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **express-validator**: Input validation
- **express-rate-limit**: Rate limiting
- **helmet**: Security headers
- **cors**: Cross-origin resource sharing
- **multer**: File upload handling for product images

### Frontend
- **React**: UI library
- **Vike**: SSR framework
- **Vite**: Build tool and dev server
- **CSS-in-JS**: Inline styles for component styling

## Configuration

### Server Configuration

The Express server is configured with:
- CORS enabled for all origins
- X-Frame-Options set to ALLOWALL for iframe support
- Host binding to 0.0.0.0 for external access
- Port 12001 (configurable via PORT environment variable)

### Vike Configuration

- Uses `vike-react` for React integration
- File-based routing in the `pages/` directory
- SSR enabled by default
- Hot module replacement in development

## Adding New Pages

To add a new page:

1. Create a new directory under `pages/`
2. Add a `+Page.jsx` file with your React component
3. The route will be automatically available based on the directory name

Example for `/contact` page:
```bash
mkdir pages/contact
```

```jsx
// pages/contact/+Page.jsx
export default function Page() {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>Get in touch!</p>
    </div>
  )
}
```

## Deployment

The application is ready for deployment to any Node.js hosting platform:

1. Build the application: `npm run build`
2. Set the `NODE_ENV=production` environment variable
3. Start the server: `npm run dev:prod`

## External Access

The server is configured to accept connections from external hosts and supports:
- CORS for cross-origin requests
- Iframe embedding
- External host access via 0.0.0.0 binding

For the provided runtime environment, the application is accessible at:
- https://work-2-pomwomhvodjyxxpb.prod-runtime.all-hands.dev

## Troubleshooting

### Port Already in Use

If you get an "EADDRINUSE" error, either:
1. Kill existing processes: `pkill -f node`
2. Change the port in `server.js` and `vite.config.js`

### Vite Deprecation Warning

The warning about `vite.createServer()` being deprecated is expected and doesn't affect functionality. This will be resolved in future Vike updates.

## License

MIT