import React, { useState, useEffect } from 'react'
import { useAuth } from '../../components/AuthContext'
import '../../styles/responsive.css'
import '../../styles/wordpress.css'
import '../../styles/responsive-wp.css'

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
      <div className="wp-login-container">
        <div className="wp-login-form">
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            Loading...
          </div>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <div className="wp-login-container">
        <div className="wp-login-form">
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            Redirecting...
          </div>
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
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email format is invalid'
    } else if (formData.email.length > 100) {
      newErrors.email = 'Email is too long (max 100 characters)'
    } else if (formData.email.length < 5) {
      newErrors.email = 'Email is too short (min 5 characters)'
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Email contains invalid characters'
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    } else if (formData.password.length > 50) {
      newErrors.password = 'Password is too long (max 50 characters)'
    } else if (!/\S+/.test(formData.password)) {
      newErrors.password = 'Password cannot contain only whitespace'
    } else if (/^\s|\s$/.test(formData.password)) {
      newErrors.password = 'Password cannot start or end with whitespace'
    }
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Clear previous errors and messages
    setErrors({})
    setMessage('')
    
    // Validate form
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      // Focus the first field with an error
      const firstErrorField = Object.keys(formErrors)[0]
      document.getElementById(firstErrorField)?.focus()
      return
    }

    // Set loading state
    setLoading(true)
    
    try {
      // Trim input values to prevent whitespace issues
      const trimmedEmail = formData.email.trim()
      const result = await login(trimmedEmail, formData.password)
      
      if (result.success) {
        // Show success message with screen reader announcement
        setMessage('Login successful! Redirecting...')
        
        // Add a slight delay before redirect for better user experience
        setTimeout(() => {
          window.location.href = '/products'
        }, 1000)
      } else {
        // Handle server validation errors
        if (result.errors && result.errors.length > 0) {
          const errorObj = {}
          result.errors.forEach(error => {
            errorObj[error.path] = error.msg
          })
          setErrors(errorObj)
          
          // Focus the first field with an error
          const firstErrorField = Object.keys(errorObj)[0]
          document.getElementById(firstErrorField)?.focus()
        } else {
          // Handle general error message
          setMessage(result.message || 'Invalid email or password')
        }
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('Login error:', error)
      setMessage('An unexpected error occurred. Please try again.')
    } finally {
      // Always reset loading state
      setLoading(false)
    }
  }

  return (
    <div className="wp-login-container">
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="wp-skip-link">Skip to main content</a>
      
      <div className="wp-login-form" id="main-content">
        <div className="wp-login-logo" aria-hidden="true">
          <h2 style={{ margin: 0, color: 'var(--wp-primary)' }}>VikePress</h2>
        </div>
        
        <h1 className="wp-login-title">Log In</h1>
        
        <form onSubmit={handleSubmit} noValidate aria-label="Login form">
          <div className="wp-form-group">
            <label htmlFor="email" className="wp-form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`wp-login-input ${errors.email ? 'wp-input-error' : ''}`}
              placeholder="Email Address"
              disabled={loading}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              autoComplete="email"
              autoFocus
              required
              maxLength={100}
              aria-required="true"
            />
            {errors.email && (
              <div 
                id="email-error" 
                className="wp-notice wp-notice-error" 
                role="alert"
              >
                {errors.email}
              </div>
            )}
          </div>

          <div className="wp-form-group">
            <label htmlFor="password" className="wp-form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`wp-login-input ${errors.password ? 'wp-input-error' : ''}`}
              placeholder="Password"
              disabled={loading}
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error' : undefined}
              autoComplete="current-password"
              required
              minLength={6}
              maxLength={50}
              aria-required="true"
            />
            {errors.password && (
              <div 
                id="password-error" 
                className="wp-notice wp-notice-error" 
                role="alert"
              >
                {errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="wp-login-button"
            aria-busy={loading ? 'true' : 'false'}
            aria-disabled={loading ? 'true' : 'false'}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          {message && (
            <div 
              className={message.includes('successful') ? "wp-notice wp-notice-success" : "wp-notice wp-notice-error"} 
              role="alert"
              aria-live="assertive"
            >
              {message}
            </div>
          )}
        </form>

        <div className="wp-login-footer">
          Don't have an account?{' '}
          <a href="/register" className="wp-register-link">
            Register here
          </a>
        </div>
      </div>
    </div>
  )
}