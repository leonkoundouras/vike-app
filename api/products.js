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
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life. Perfect for music lovers and professionals. Features include touch controls, voice assistant support, and a comfortable over-ear design for extended listening sessions.',
    price: 199.99,
    category: 'Electronics',
    stock: 25,
    sku: 'WBH-001',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    featured: true,
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Noise Cancellation': 'Active',
      'Weight': '250g',
      'Charging': 'USB-C'
    }
  },
  {
    id: 'mock-2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and 7-day battery life. Track your health goals with precision. Includes sleep tracking, stress monitoring, and customizable workout modes for a complete health overview.',
    price: 299.99,
    category: 'Wearables',
    stock: 15,
    sku: 'SFW-002',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    featured: true,
    specifications: {
      'Battery Life': '7 days',
      'Water Resistance': '5 ATM',
      'Display': 'AMOLED Touchscreen',
      'Sensors': 'Heart Rate, GPS, Accelerometer',
      'Compatibility': 'iOS, Android'
    }
  },
  {
    id: 'mock-3',
    name: 'Ergonomic Office Chair',
    description: 'Professional ergonomic office chair with lumbar support and adjustable height. Comfortable for long work sessions. The breathable mesh back provides excellent ventilation, while the adjustable armrests and headrest ensure perfect positioning for any body type.',
    price: 449.99,
    category: 'Furniture',
    stock: 8,
    sku: 'EOC-003',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
    featured: false,
    specifications: {
      'Material': 'Mesh and Premium Fabric',
      'Weight Capacity': '300 lbs',
      'Adjustable Height': 'Yes',
      'Armrests': 'Adjustable 3D',
      'Recline': '135 degrees'
    }
  },
  {
    id: 'mock-4',
    name: 'Portable Coffee Maker',
    description: 'Compact espresso machine perfect for travel and small spaces. Brew barista-quality coffee anywhere. This manual espresso maker requires no electricity, making it ideal for camping, road trips, or office use. The stainless steel construction ensures durability and easy cleaning.',
    price: 89.99,
    category: 'Kitchen',
    stock: 30,
    sku: 'PCM-004',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    featured: true,
    specifications: {
      'Material': 'Stainless Steel',
      'Capacity': '80ml',
      'Weight': '340g',
      'Dimensions': '17 x 7 x 7 cm',
      'Pressure': '8 Bar'
    }
  },
  {
    id: 'mock-5',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator. The non-slip surface keeps your device secure while charging, and the intelligent temperature control prevents overheating for safe, efficient charging.',
    price: 39.99,
    category: 'Electronics',
    stock: 50,
    sku: 'WCP-005',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1609592806596-4d8b5b1d7e7e?w=600&h=600&fit=crop',
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05'),
    featured: false,
    specifications: {
      'Input': '5V/2A, 9V/1.67A',
      'Output': '10W Max',
      'Compatibility': 'All Qi-enabled devices',
      'Dimensions': '10 x 10 x 1.2 cm',
      'Cable Length': '1.5m'
    }
  },
  {
    id: 'mock-6',
    name: 'Gaming Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with tactile switches. Perfect for gaming and professional typing. The customizable RGB lighting offers 16.8 million colors and multiple lighting effects. The durable mechanical switches are rated for 50 million keystrokes.',
    price: 129.99,
    category: 'Electronics',
    stock: 20,
    sku: 'GMK-006',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
    featured: true,
    specifications: {
      'Switch Type': 'Mechanical (Blue)',
      'Layout': 'Full-size (104 keys)',
      'Backlight': 'RGB (16.8M colors)',
      'Connection': 'USB-C (Detachable)',
      'Anti-ghosting': 'N-key rollover'
    }
  },
  {
    id: 'mock-7',
    name: 'Professional DSLR Camera',
    description: 'High-performance DSLR camera with 24.2MP sensor and 4K video recording capabilities. Perfect for professional photographers and videographers. Features include a vari-angle touchscreen, built-in Wi-Fi and Bluetooth, and an extensive range of compatible lenses.',
    price: 1299.99,
    category: 'Photography',
    stock: 5,
    sku: 'DSLR-007',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=600&fit=crop',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
    featured: true,
    specifications: {
      'Sensor': '24.2MP APS-C CMOS',
      'Video': '4K UHD at 30fps',
      'ISO Range': '100-25600 (expandable)',
      'Autofocus': '45-point all cross-type',
      'Storage': 'Dual SD card slots'
    }
  },
  {
    id: 'mock-8',
    name: 'Smart Home Security System',
    description: 'Comprehensive home security system with HD cameras, motion sensors, and smartphone integration. Monitor your home from anywhere with real-time alerts and video streaming. The system is easy to install with no professional help required.',
    price: 349.99,
    category: 'Smart Home',
    stock: 12,
    sku: 'SHSS-008',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=600&fit=crop',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
    featured: false,
    specifications: {
      'Camera Resolution': '1080p HD',
      'Night Vision': 'Infrared (30ft range)',
      'Storage': 'Cloud + Local',
      'Power': 'Wired with battery backup',
      'Connectivity': 'Wi-Fi, Ethernet'
    }
  },
  {
    id: 'mock-9',
    name: 'Ultralight Hiking Backpack',
    description: 'Durable, waterproof hiking backpack with 45L capacity and ergonomic design. Perfect for multi-day treks and adventures. Features multiple compartments, hydration system compatibility, and adjustable straps for optimal comfort during long hikes.',
    price: 129.99,
    category: 'Outdoor',
    stock: 18,
    sku: 'UHB-009',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=600&h=600&fit=crop',
    createdAt: new Date('2024-02-25'),
    updatedAt: new Date('2024-02-25'),
    featured: false,
    specifications: {
      'Capacity': '45L',
      'Weight': '1.2kg',
      'Material': 'Ripstop Nylon',
      'Waterproof': 'Yes',
      'Frame': 'Internal Aluminum'
    }
  },
  {
    id: 'mock-10',
    name: 'Premium Noise-Cancelling Earbuds',
    description: 'True wireless earbuds with active noise cancellation and premium sound quality. The perfect companion for commuting, travel, and workouts. Features include touch controls, voice assistant support, and a compact charging case that provides up to 24 hours of total battery life.',
    price: 179.99,
    category: 'Audio',
    stock: 22,
    sku: 'NCE-010',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
    featured: true,
    specifications: {
      'Battery Life': '8 hours (ANC on)',
      'Charging Case': '24 hours total',
      'Water Resistance': 'IPX4',
      'Connectivity': 'Bluetooth 5.2',
      'Noise Cancellation': 'Hybrid ANC'
    }
  },
  {
    id: 'mock-11',
    name: 'Adjustable Standing Desk',
    description: 'Electric height-adjustable standing desk with memory settings and spacious work surface. Transition seamlessly between sitting and standing positions for improved productivity and health. The sturdy construction supports up to 100kg of equipment.',
    price: 499.99,
    category: 'Furniture',
    stock: 7,
    sku: 'ASD-011',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&h=600&fit=crop',
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-05'),
    featured: false,
    specifications: {
      'Height Range': '72-120cm',
      'Desktop Size': '140 x 70cm',
      'Weight Capacity': '100kg',
      'Memory Settings': '4 positions',
      'Material': 'Bamboo + Steel'
    }
  },
  {
    id: 'mock-12',
    name: 'Smart Indoor Garden',
    description: 'Automated indoor garden system for growing herbs, vegetables, and flowers year-round. The built-in LED grow lights and self-watering system ensure optimal growing conditions with minimal maintenance. Perfect for urban apartments and spaces with limited natural light.',
    price: 199.99,
    category: 'Home & Garden',
    stock: 14,
    sku: 'SIG-012',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1585400473049-716c3dc4d7d3?w=600&h=600&fit=crop',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10'),
    featured: true,
    specifications: {
      'Capacity': '9 plant pods',
      'Lighting': 'Full spectrum LED',
      'Water Tank': '3L capacity',
      'Power': '24W',
      'Dimensions': '40 x 30 x 40cm'
    }
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

// Get all products for user with filtering and sorting
export const getProducts = (req, res) => {
  try {
    const userId = req.user.id
    
    // Initialize mock products for new users
    if (!products.has(userId)) {
      products.set(userId, [...mockProducts])
    }
    
    let userProducts = products.get(userId) || []

    // Apply filters
    const { category, minPrice, maxPrice, sortBy, sortOrder, search } = req.query

    // Filter by category
    if (category && category !== 'all') {
      userProducts = userProducts.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      )
    }

    // Filter by price range
    if (minPrice) {
      userProducts = userProducts.filter(product => product.price >= parseFloat(minPrice))
    }
    if (maxPrice) {
      userProducts = userProducts.filter(product => product.price <= parseFloat(maxPrice))
    }

    // Filter by search term
    if (search) {
      const searchTerm = search.toLowerCase()
      userProducts = userProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.sku.toLowerCase().includes(searchTerm)
      )
    }

    // Apply sorting
    if (sortBy) {
      userProducts.sort((a, b) => {
        let aValue, bValue
        
        switch (sortBy) {
          case 'price':
            aValue = a.price
            bValue = b.price
            break
          case 'name':
            aValue = a.name.toLowerCase()
            bValue = b.name.toLowerCase()
            break
          case 'category':
            aValue = a.category.toLowerCase()
            bValue = b.category.toLowerCase()
            break
          case 'stock':
            aValue = a.stock
            bValue = b.stock
            break
          case 'createdAt':
          default:
            aValue = new Date(a.createdAt)
            bValue = new Date(b.createdAt)
            break
        }

        if (sortOrder === 'desc') {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
        } else {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
        }
      })
    } else {
      // Default sort by creation date (newest first)
      userProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    res.json({
      success: true,
      data: { 
        products: userProducts,
        total: userProducts.length
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

// Get all available categories
export const getCategories = (req, res) => {
  try {
    const userId = req.user.id
    
    // Initialize mock products for new users
    if (!products.has(userId)) {
      products.set(userId, [...mockProducts])
    }
    
    const userProducts = products.get(userId) || []
    
    // Extract unique categories
    const categories = [...new Set(userProducts
      .map(product => product.category)
      .filter(category => category && category.trim() !== '')
    )].sort()

    // Calculate product count per category
    const categoriesWithCount = categories.map(category => ({
      name: category,
      count: userProducts.filter(product => product.category === category).length
    }))

    res.json({
      success: true,
      data: { 
        categories: categoriesWithCount,
        total: categories.length
      }
    })
  } catch (error) {
    console.error('Get categories error:', error)
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