import { body, validationResult } from 'express-validator'

// In-memory todo storage (replace with database in production)
const todos = new Map() // userId -> [todos]

// Todo validation rules
export const validateTodo = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid ISO 8601 date')
]

export const validateTodoUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid ISO 8601 date')
]

// Get all todos for user
export const getTodos = (req, res) => {
  try {
    const userId = req.user.id
    const userTodos = todos.get(userId) || []
    
    // Sort by creation date (newest first)
    const sortedTodos = userTodos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    
    res.json({
      success: true,
      data: { todos: sortedTodos }
    })
  } catch (error) {
    console.error('Get todos error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// Create new todo
export const createTodo = (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const userId = req.user.id
    const { title, description, priority = 'medium', dueDate } = req.body

    // Create todo
    const todo = {
      id: Date.now().toString(),
      title,
      description: description || '',
      completed: false,
      priority,
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId
    }

    // Add to user's todos
    const userTodos = todos.get(userId) || []
    userTodos.push(todo)
    todos.set(userId, userTodos)

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: { todo }
    })

  } catch (error) {
    console.error('Create todo error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// Update todo
export const updateTodo = (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const userId = req.user.id
    const todoId = req.params.id
    const updates = req.body

    // Get user's todos
    const userTodos = todos.get(userId) || []
    const todoIndex = userTodos.findIndex(todo => todo.id === todoId)

    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      })
    }

    // Update todo
    const updatedTodo = {
      ...userTodos[todoIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    userTodos[todoIndex] = updatedTodo
    todos.set(userId, userTodos)

    res.json({
      success: true,
      message: 'Todo updated successfully',
      data: { todo: updatedTodo }
    })

  } catch (error) {
    console.error('Update todo error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// Delete todo
export const deleteTodo = (req, res) => {
  try {
    const userId = req.user.id
    const todoId = req.params.id

    // Get user's todos
    const userTodos = todos.get(userId) || []
    const todoIndex = userTodos.findIndex(todo => todo.id === todoId)

    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      })
    }

    // Remove todo
    const deletedTodo = userTodos.splice(todoIndex, 1)[0]
    todos.set(userId, userTodos)

    res.json({
      success: true,
      message: 'Todo deleted successfully',
      data: { todo: deletedTodo }
    })

  } catch (error) {
    console.error('Delete todo error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// Get single todo
export const getTodo = (req, res) => {
  try {
    const userId = req.user.id
    const todoId = req.params.id

    // Get user's todos
    const userTodos = todos.get(userId) || []
    const todo = userTodos.find(todo => todo.id === todoId)

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      })
    }

    res.json({
      success: true,
      data: { todo }
    })

  } catch (error) {
    console.error('Get todo error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// Toggle todo completion
export const toggleTodo = (req, res) => {
  try {
    const userId = req.user.id
    const todoId = req.params.id

    // Get user's todos
    const userTodos = todos.get(userId) || []
    const todoIndex = userTodos.findIndex(todo => todo.id === todoId)

    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      })
    }

    // Toggle completion
    const updatedTodo = {
      ...userTodos[todoIndex],
      completed: !userTodos[todoIndex].completed,
      updatedAt: new Date().toISOString()
    }

    userTodos[todoIndex] = updatedTodo
    todos.set(userId, userTodos)

    res.json({
      success: true,
      message: 'Todo toggled successfully',
      data: { todo: updatedTodo }
    })

  } catch (error) {
    console.error('Toggle todo error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// Get todo statistics
export const getTodoStats = (req, res) => {
  try {
    const userId = req.user.id
    const userTodos = todos.get(userId) || []

    const stats = {
      total: userTodos.length,
      completed: userTodos.filter(todo => todo.completed).length,
      pending: userTodos.filter(todo => !todo.completed).length,
      overdue: userTodos.filter(todo => {
        if (!todo.dueDate || todo.completed) return false
        return new Date(todo.dueDate) < new Date()
      }).length,
      byPriority: {
        high: userTodos.filter(todo => todo.priority === 'high').length,
        medium: userTodos.filter(todo => todo.priority === 'medium').length,
        low: userTodos.filter(todo => todo.priority === 'low').length
      }
    }

    res.json({
      success: true,
      data: { stats }
    })

  } catch (error) {
    console.error('Get todo stats error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}