import React, { useState, useEffect } from 'react'
import { useAuth } from '../../components/AuthContext'

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  title: {
    color: '#2c3e50',
    margin: 0
  },
  addButton: {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#3498db'
  },
  statLabel: {
    color: '#7f8c8d',
    fontSize: '0.9rem'
  },
  todoForm: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  formRow: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem'
  },
  formGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontWeight: 'bold',
    color: '#34495e'
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  textarea: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    minHeight: '80px',
    resize: 'vertical'
  },
  select: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  submitButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  cancelButton: {
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginLeft: '1rem'
  },
  todoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  todoItem: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  todoContent: {
    flex: 1
  },
  todoTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#2c3e50'
  },
  todoDescription: {
    color: '#7f8c8d',
    marginBottom: '0.5rem'
  },
  todoMeta: {
    display: 'flex',
    gap: '1rem',
    fontSize: '0.9rem',
    color: '#95a5a6'
  },
  priorityBadge: {
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  },
  todoActions: {
    display: 'flex',
    gap: '0.5rem',
    flexDirection: 'column'
  },
  actionButton: {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  completeButton: {
    backgroundColor: '#27ae60',
    color: 'white'
  },
  editButton: {
    backgroundColor: '#f39c12',
    color: 'white'
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: 'white'
  },
  completedTodo: {
    opacity: 0.6
  },
  completedTitle: {
    textDecoration: 'line-through'
  },
  error: {
    color: '#e74c3c',
    backgroundColor: '#fdf2f2',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem'
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
    color: '#7f8c8d'
  },
  empty: {
    textAlign: 'center',
    padding: '3rem',
    color: '#7f8c8d'
  }
}

const priorityColors = {
  high: { backgroundColor: '#e74c3c', color: 'white' },
  medium: { backgroundColor: '#f39c12', color: 'white' },
  low: { backgroundColor: '#27ae60', color: 'white' }
}

export default function TodosPage() {
  const [todos, setTodos] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  })

  const { getAuthHeaders, isAuthenticated } = useAuth()

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login'
      return
    }
    fetchTodos()
    fetchStats()
  }, [isAuthenticated])

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos', {
        headers: getAuthHeaders()
      })
      const data = await response.json()
      
      if (data.success) {
        setTodos(data.data.todos)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Failed to fetch todos')
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/todos/stats', {
        headers: getAuthHeaders()
      })
      const data = await response.json()
      
      if (data.success) {
        setStats(data.data.stats)
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const url = editingTodo ? `/api/todos/${editingTodo.id}` : '/api/todos'
      const method = editingTodo ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (data.success) {
        await fetchTodos()
        await fetchStats()
        resetForm()
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Failed to save todo')
    }
  }

  const handleDelete = async (todoId) => {
    if (!confirm('Are you sure you want to delete this todo?')) return
    
    try {
      const response = await fetch(`/api/todos/${todoId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })
      
      const data = await response.json()
      
      if (data.success) {
        await fetchTodos()
        await fetchStats()
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Failed to delete todo')
    }
  }

  const handleToggle = async (todoId) => {
    try {
      const response = await fetch(`/api/todos/${todoId}/toggle`, {
        method: 'PATCH',
        headers: getAuthHeaders()
      })
      
      const data = await response.json()
      
      if (data.success) {
        await fetchTodos()
        await fetchStats()
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Failed to toggle todo')
    }
  }

  const startEdit = (todo) => {
    setEditingTodo(todo)
    setFormData({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      dueDate: todo.dueDate ? todo.dueDate.split('T')[0] : ''
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    })
    setEditingTodo(null)
    setShowForm(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (loading) {
    return <div style={styles.loading}>Loading todos...</div>
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>My Todos</h1>
        <button
          onClick={() => setShowForm(true)}
          style={styles.addButton}
        >
          Add Todo
        </button>
      </div>

      {error && (
        <div style={styles.error}>
          {error}
          <button onClick={() => setError('')} style={{ float: 'right', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
        </div>
      )}

      {/* Stats */}
      {stats.total > 0 && (
        <div style={styles.stats}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{stats.total}</div>
            <div style={styles.statLabel}>Total</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{stats.pending}</div>
            <div style={styles.statLabel}>Pending</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{stats.completed}</div>
            <div style={styles.statLabel}>Completed</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{stats.overdue}</div>
            <div style={styles.statLabel}>Overdue</div>
          </div>
        </div>
      )}

      {/* Todo Form */}
      {showForm && (
        <form onSubmit={handleSubmit} style={styles.todoForm}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={styles.textarea}
            />
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>

          <div>
            <button type="submit" style={styles.submitButton}>
              {editingTodo ? 'Update Todo' : 'Add Todo'}
            </button>
            <button type="button" onClick={resetForm} style={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Todo List */}
      <div style={styles.todoList}>
        {todos.length === 0 ? (
          <div style={styles.empty}>
            <h3>No todos yet!</h3>
            <p>Click "Add Todo" to create your first todo item.</p>
          </div>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              style={{
                ...styles.todoItem,
                ...(todo.completed ? styles.completedTodo : {})
              }}
            >
              <div style={styles.todoContent}>
                <div
                  style={{
                    ...styles.todoTitle,
                    ...(todo.completed ? styles.completedTitle : {})
                  }}
                >
                  {todo.title}
                </div>
                {todo.description && (
                  <div style={styles.todoDescription}>
                    {todo.description}
                  </div>
                )}
                <div style={styles.todoMeta}>
                  <span
                    style={{
                      ...styles.priorityBadge,
                      ...priorityColors[todo.priority]
                    }}
                  >
                    {todo.priority.toUpperCase()}
                  </span>
                  {todo.dueDate && (
                    <span>Due: {new Date(todo.dueDate).toLocaleDateString()}</span>
                  )}
                  <span>Created: {new Date(todo.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div style={styles.todoActions}>
                <button
                  onClick={() => handleToggle(todo.id)}
                  style={{
                    ...styles.actionButton,
                    ...styles.completeButton
                  }}
                >
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                  onClick={() => startEdit(todo)}
                  style={{
                    ...styles.actionButton,
                    ...styles.editButton
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  style={{
                    ...styles.actionButton,
                    ...styles.deleteButton
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}