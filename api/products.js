import { body, validationResult } from 'express-validator'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

// In-memory product storage (replace with database in production)
const products = new Map() // userId -> [products]

// Mock products for demo purposes
const mockProducts = [
  {
    id: 'mock-1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life. Perfect for music lovers and professionals.',
    price: 199.99,
    category: 'Electronics',
    stock: 25,
    sku: 'WBH-001',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'mock-2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and 7-day battery life. Track your health goals.',
    price: 299.99,
    category: 'Wearables',
    stock: 15,
    sku: 'SFW-002',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'mock-3',
    name: 'Ergonomic Office Chair',
    description: 'Professional ergonomic office chair with lumbar support and adjustable height. Comfortable for long work sessions.',
    price: 449.99,
    category: 'Furniture',
    stock: 8,
    sku: 'EOC-003',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: 'mock-4',
    name: 'Portable Coffee Maker',
    description: 'Compact espresso machine perfect for travel and small spaces. Brew barista-quality coffee anywhere.',
    price: 89.99,
    category: 'Kitchen',
    stock: 30,
    sku: 'PCM-004',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  },
  {
    id: 'mock-5',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.',
    price: 39.99,
    category: 'Electronics',
    stock: 50,
    sku: 'WCP-005',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1609592806596-4d8b5b1d7e7e?w=400&h=400&fit=crop',
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05')
  },
  {
    id: 'mock-6',
    name: 'Gaming Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with tactile switches. Perfect for gaming and professional typing.',
    price: 129.99,
    category: 'Electronics',
    stock: 20,
    sku: 'GMK-006',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10')
  }
]

// Initialize mock products for demo user
function initializeMockProducts() {
  const demoUserId = 'demo-user-id' // This should match the actual demo user ID
  if (!products.has(demoUserId)) {
    products.set(demoUserId, [...mockProducts])
  }
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/products'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed!'), false)
  }
}

export const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
})

// Product validation rules
export const validateProduct = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Product name must be between 1 and 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Description must not exceed 2000 characters'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('category')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Category must not exceed 100 characters'),
  body('sku')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('SKU must not exceed 50 characters'),
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  body('status')
    .optional()
    .isIn(['active', 'inactive', 'draft'])
    .withMessage('Status must be active, inactive, or draft')
]

export const validateProductUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Product name must be between 1 and 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Description must not exceed 2000 characters'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('category')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Category must not exceed 100 characters'),
  body('sku')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('SKU must not exceed 50 characters'),
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  body('status')
    .optional()
    .isIn(['active', 'inactive', 'draft'])
    .withMessage('Status must be active, inactive, or draft')
]

// Get all products for user
export const getProducts = (req, res) => {
  try {
    const userId = req.user.id
    
    // Initialize mock products for new users
    if (!products.has(userId)) {
      products.set(userId, [...mockProducts])
    }
    
    const userProducts = products.get(userId) || []

    // Sort by creation date (newest first)
    const sortedProducts = userProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    res.json({
      success: true,
      data: { 
        products: sortedProducts,
        total: sortedProducts.length
      }
    })
  } catch (error) {
    console.error('Get products error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// Create new product
export const createProduct = (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // Delete uploaded file if validation fails
      if (req.file) {
        fs.unlinkSync(req.file.path)
      }
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const userId = req.user.id
    const { name, description, price, category, sku, stock = 0, status = 'active' } = req.body

    // Check if SKU already exists for this user
    const userProducts = products.get(userId) || []
    if (sku && userProducts.some(product => product.sku === sku)) {
      if (req.file) {
        fs.unlinkSync(req.file.path)
      }
      return res.status(400).json({
        success: false,
        message: 'SKU already exists'
      })
    }

    // Create product
    const product = {
      id: Date.now().toString(),
      name,
      description: description || '',
      price: parseFloat(price),
      category: category || '',
      sku: sku || '',
      stock: parseInt(stock),
      status,
      image: req.file ? `/uploads/products/${req.file.filename}` : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId
    }

    // Add to user's products
    userProducts.push(product)
    products.set(userId, userProducts)

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product }
    })

  } catch (error) {
    console.error('Create product error:', error)
    // Delete uploaded file if error occurs
    if (req.file) {
      fs.unlinkSync(req.file.path)
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// Update product
export const updateProduct = (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // Delete uploaded file if validation fails
      if (req.file) {
        fs.unlinkSync(req.file.path)
      }
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const userId = req.user.id
    const productId = req.params.id
    const updates = req.body

    // Get user's products
    const userProducts = products.get(userId) || []
    const productIndex = userProducts.findIndex(product => product.id === productId)

    if (productIndex === -1) {
      if (req.file) {
        fs.unlinkSync(req.file.path)
      }
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    const existingProduct = userProducts[productIndex]

    // Check if SKU already exists for this user (excluding current product)
    if (updates.sku && updates.sku !== existingProduct.sku) {
      if (userProducts.some(product => product.sku === updates.sku && product.id !== productId)) {
        if (req.file) {
          fs.unlinkSync(req.file.path)
        }
        return res.status(400).json({
          success: false,
          message: 'SKU already exists'
        })
      }
    }

    // Handle image update
    let imageUrl = existingProduct.image
    if (req.file) {
      // Delete old image if it exists
      if (existingProduct.image) {
        const oldImagePath = path.join(process.cwd(), existingProduct.image)
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath)
        }
      }
      imageUrl = `/uploads/products/${req.file.filename}`
    }

    // Convert numeric fields
    if (updates.price) updates.price = parseFloat(updates.price)
    if (updates.stock) updates.stock = parseInt(updates.stock)

    // Update product
    const updatedProduct = {
      ...existingProduct,
      ...updates,
      image: imageUrl,
      updatedAt: new Date().toISOString()
    }

    userProducts[productIndex] = updatedProduct
    products.set(userId, userProducts)

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: { product: updatedProduct }
    })

  } catch (error) {
    console.error('Update product error:', error)
    // Delete uploaded file if error occurs
    if (req.file) {
      fs.unlinkSync(req.file.path)
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// Delete product
export const deleteProduct = (req, res) => {
  try {
    const userId = req.user.id
    const productId = req.params.id

    // Get user's products
    const userProducts = products.get(userId) || []
    const productIndex = userProducts.findIndex(product => product.id === productId)

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    // Remove product and delete image
    const deletedProduct = userProducts.splice(productIndex, 1)[0]
    
    // Delete associated image file
    if (deletedProduct.image) {
      const imagePath = path.join(process.cwd(), deletedProduct.image)
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
      }
    }

    products.set(userId, userProducts)

    res.json({
      success: true,
      message: 'Product deleted successfully',
      data: { product: deletedProduct }
    })

  } catch (error) {
    console.error('Delete product error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// Get single product
export const getProduct = (req, res) => {
  try {
    const userId = req.user.id
    const productId = req.params.id

    // Get user's products
    const userProducts = products.get(userId) || []
    const product = userProducts.find(product => product.id === productId)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    res.json({
      success: true,
      data: { product }
    })

  } catch (error) {
    console.error('Get product error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// Get product statistics
export const getProductStats = (req, res) => {
  try {
    const userId = req.user.id
    const userProducts = products.get(userId) || []

    const stats = {
      total: userProducts.length,
      active: userProducts.filter(product => product.status === 'active').length,
      inactive: userProducts.filter(product => product.status === 'inactive').length,
      draft: userProducts.filter(product => product.status === 'draft').length,
      totalValue: userProducts.reduce((sum, product) => sum + (product.price * product.stock), 0),
      totalStock: userProducts.reduce((sum, product) => sum + product.stock, 0),
      lowStock: userProducts.filter(product => product.stock < 10).length,
      categories: [...new Set(userProducts.map(product => product.category).filter(Boolean))].length
    }

    res.json({
      success: true,
      data: { stats }
    })

  } catch (error) {
    console.error('Get product stats error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// Update product image only
export const updateProductImage = (req, res) => {
  try {
    const userId = req.user.id
    const productId = req.params.id

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      })
    }

    // Get user's products
    const userProducts = products.get(userId) || []
    const productIndex = userProducts.findIndex(product => product.id === productId)

    if (productIndex === -1) {
      fs.unlinkSync(req.file.path)
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    const existingProduct = userProducts[productIndex]

    // Delete old image if it exists
    if (existingProduct.image) {
      const oldImagePath = path.join(process.cwd(), existingProduct.image)
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath)
      }
    }

    // Update product with new image
    const updatedProduct = {
      ...existingProduct,
      image: `/uploads/products/${req.file.filename}`,
      updatedAt: new Date().toISOString()
    }

    userProducts[productIndex] = updatedProduct
    products.set(userId, userProducts)

    res.json({
      success: true,
      message: 'Product image updated successfully',
      data: { product: updatedProduct }
    })

  } catch (error) {
    console.error('Update product image error:', error)
    if (req.file) {
      fs.unlinkSync(req.file.path)
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}