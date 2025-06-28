import React, { useState, useEffect } from 'react'
import { useAuth } from '../../components/AuthContext'

const styles = {
  container: {
    maxWidth: '400px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#2c3e50'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  formGroup: {
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
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem'
  },
  buttonDisabled: {
    backgroundColor: '#bdc3c7',
    cursor: 'not-allowed'
  },
  error: {
    color: '#e74c3c',
    fontSize: '0.9rem',
    marginTop: '0.5rem'
  },
  success: {
    color: '#27ae60',
    fontSize: '0.9rem',
    marginTop: '0.5rem'
  },
  link: {
    textAlign: 'center',
    marginTop: '1rem'
  },
  linkText: {
    color: '#3498db',
    textDecoration: 'none'
  }
}

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const { login, isAuthenticated, loading: authLoading } = useAuth()

  // Redirect if already authenticated (only after auth loading is complete)
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      window.location.href = '/products'
    }
  }, [isAuthenticated, authLoading])

  // Don't render the form if we're still checking auth or if user is authenticated
  if (authLoading) {
    return (
      <div style={styles.container}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          Loading...
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <div style={styles.container}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          Redirecting...
        </div>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setLoading(true)
    setErrors({})
    setMessage('')

    const result = await login(formData.email, formData.password)
    
    if (result.success) {
      setMessage('Login successful! Redirecting...')
      setTimeout(() => {
        window.location.href = '/products'
      }, 1000)
    } else {
      if (result.errors) {
        const errorObj = {}
        result.errors.forEach(error => {
          errorObj[error.path] = error.msg
        })
        setErrors(errorObj)
      } else {
        setMessage(result.message || 'Login failed')
      }
    }
    
    setLoading(false)
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Login</h1>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter your email"
            disabled={loading}
          />
          {errors.email && <div style={styles.error}>{errors.email}</div>}
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter your password"
            disabled={loading}
          />
          {errors.password && <div style={styles.error}>{errors.password}</div>}
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {})
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {message && (
          <div style={message.includes('successful') ? styles.success : styles.error}>
            {message}
          </div>
        )}
      </form>

      <div style={styles.link}>
        Don't have an account?{' '}
        <a href="/register" style={styles.linkText}>
          Register here
        </a>
      </div>
    </div>
  )
}