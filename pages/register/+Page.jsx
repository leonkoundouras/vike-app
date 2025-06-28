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
    backgroundColor: '#27ae60',
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
  },
  passwordHint: {
    fontSize: '0.8rem',
    color: '#7f8c8d',
    marginTop: '0.25rem'
  }
}

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const { register, isAuthenticated, loading: authLoading } = useAuth()

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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
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

    const result = await register(formData.name, formData.email, formData.password)
    
    if (result.success) {
      setMessage('Registration successful! Redirecting...')
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
        setMessage(result.message || 'Registration failed')
      }
    }
    
    setLoading(false)
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Register</h1>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter your full name"
            disabled={loading}
          />
          {errors.name && <div style={styles.error}>{errors.name}</div>}
        </div>

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
          <div style={styles.passwordHint}>
            Must contain at least 6 characters with uppercase, lowercase, and number
          </div>
          {errors.password && <div style={styles.error}>{errors.password}</div>}
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={styles.input}
            placeholder="Confirm your password"
            disabled={loading}
          />
          {errors.confirmPassword && <div style={styles.error}>{errors.confirmPassword}</div>}
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {})
          }}
        >
          {loading ? 'Creating Account...' : 'Register'}
        </button>

        {message && (
          <div style={message.includes('successful') ? styles.success : styles.error}>
            {message}
          </div>
        )}
      </form>

      <div style={styles.link}>
        Already have an account?{' '}
        <a href="/login" style={styles.linkText}>
          Login here
        </a>
      </div>
    </div>
  )
}