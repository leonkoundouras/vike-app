import express from 'express'
import { renderPage } from 'vike/server'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

// Import API routes
import { 
  register, 
  login, 
  getProfile, 
  authenticateToken, 
  validateRegister, 
  validateLogin,
  getAllUsers 
} from './api/auth.js'
import { 
  getTodos, 
  createTodo, 
  updateTodo, 
  deleteTodo, 
  getTodo, 
  toggleTodo, 
  getTodoStats,
  validateTodo,
  validateTodoUpdate 
} from './api/todos.js'
import { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  getProduct, 
  getProductStats,
  getCategories,
  updateProductImage,
  validateProduct,
  validateProductUpdate,
  upload 
} from './api/products.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 12001

async function startServer() {
  const app = express()

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: false, // Disable for development
    crossOriginEmbedderPolicy: false
  }))

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
      success: false,
      message: 'Too many requests, please try again later'
    }
  })
  app.use('/api/', limiter)

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ extended: true, limit: '10mb' }))

  // Enable CORS and iframe support
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.header('X-Frame-Options', 'ALLOWALL')
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200)
    }
    next()
  })

  // API Routes (must be before Vite middleware)
  
  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ 
      success: true, 
      message: 'API is healthy',
      timestamp: new Date().toISOString()
    })
  })

  // Authentication routes
  app.post('/api/auth/register', validateRegister, register)
  app.post('/api/auth/login', validateLogin, login)
  app.get('/api/auth/profile', authenticateToken, getProfile)
  app.get('/api/auth/users', getAllUsers) // Debug route - remove in production

  // Todo routes (all protected)
  app.get('/api/todos', authenticateToken, getTodos)
  app.post('/api/todos', authenticateToken, validateTodo, createTodo)
  app.get('/api/todos/stats', authenticateToken, getTodoStats)
  app.get('/api/todos/:id', authenticateToken, getTodo)
  app.put('/api/todos/:id', authenticateToken, validateTodoUpdate, updateTodo)
  app.delete('/api/todos/:id', authenticateToken, deleteTodo)
  app.patch('/api/todos/:id/toggle', authenticateToken, toggleTodo)

  // Product routes (all protected)
  app.get('/api/products', authenticateToken, getProducts)
  app.post('/api/products', authenticateToken, upload.single('image'), validateProduct, createProduct)
  app.get('/api/products/stats', authenticateToken, getProductStats)
  app.get('/api/products/categories', authenticateToken, getCategories)
  app.get('/api/products/:id', authenticateToken, getProduct)
  app.put('/api/products/:id', authenticateToken, upload.single('image'), validateProductUpdate, updateProduct)
  app.delete('/api/products/:id', authenticateToken, deleteProduct)
  app.patch('/api/products/:id/image', authenticateToken, upload.single('image'), updateProductImage)

  // Serve uploaded files
  app.use('/uploads', express.static('uploads'))

  if (isProduction) {
    // Serve static files from dist/client
    app.use(express.static(join(__dirname, 'dist/client')))
  }

  // Handle all routes with Vike
  app.get('*', async (req, res, next) => {
    try {
      const pageContextInit = {
        urlOriginal: req.originalUrl
      }
      
      const pageContext = await renderPage(pageContextInit)
      const { httpResponse } = pageContext
      
      if (!httpResponse) {
        return next()
      }
      
      const { body, statusCode, headers } = httpResponse
      
      headers.forEach(([name, value]) => res.setHeader(name, value))
      res.status(statusCode).send(body)
    } catch (err) {
      console.error('SSR Error:', err)
      res.status(500).send('Internal Server Error')
    }
  })

  app.listen(port, '0.0.0.0', () => {
    console.log(`Production server running at http://localhost:${port}`)
  })
}

startServer().catch(err => {
  console.error('Failed to start server:', err)
  process.exit(1)
})