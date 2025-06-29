import React, { useState, useEffect } from 'react'
import { useAuth } from '../../components/AuthContext'
import '../../styles/responsive.css'
import '../../styles/wordpress.css'
import '../../styles/responsive-wp.css'

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
    <div className="wp-login-container">
      <div className="wp-login-form" style={{ maxWidth: '400px' }}>
        <div className="wp-login-logo">
          <h2 style={{ margin: 0, color: 'var(--wp-primary)' }}>VikePress</h2>
        </div>
        
        <h1 className="wp-login-title">Register</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="wp-form-row" style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="wp-login-input"
              placeholder="Full Name"
              disabled={loading}
            />
            {errors.name && <div className="wp-notice wp-notice-error" style={{ padding: '0.5rem', marginTop: '0.5rem', fontSize: '0.9rem' }}>{errors.name}</div>}
          </div>

          <div className="wp-form-row" style={{ marginBottom: '1rem' }}>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="wp-login-input"
              placeholder="Email Address"
              disabled={loading}
            />
            {errors.email && <div className="wp-notice wp-notice-error" style={{ padding: '0.5rem', marginTop: '0.5rem', fontSize: '0.9rem' }}>{errors.email}</div>}
          </div>

          <div className="wp-form-row" style={{ marginBottom: '1rem' }}>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="wp-login-input"
              placeholder="Password"
              disabled={loading}
            />
            <div style={{ fontSize: '0.8rem', color: 'var(--wp-light-text)', marginTop: '0.25rem' }}>
              Must contain at least 6 characters with uppercase, lowercase, and number
            </div>
            {errors.password && <div className="wp-notice wp-notice-error" style={{ padding: '0.5rem', marginTop: '0.5rem', fontSize: '0.9rem' }}>{errors.password}</div>}
          </div>

          <div className="wp-form-row" style={{ marginBottom: '1rem' }}>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="wp-login-input"
              placeholder="Confirm Password"
              disabled={loading}
            />
            {errors.confirmPassword && <div className="wp-notice wp-notice-error" style={{ padding: '0.5rem', marginTop: '0.5rem', fontSize: '0.9rem' }}>{errors.confirmPassword}</div>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="wp-login-button"
            style={loading ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>

          {message && (
            <div className={message.includes('successful') ? "wp-notice wp-notice-success" : "wp-notice wp-notice-error"} style={{ marginTop: '1rem', padding: '0.5rem', fontSize: '0.9rem' }}>
              {message}
            </div>
          )}
        </form>

        <div className="wp-login-footer">
          Already have an account?{' '}
          <a href="/login">
            Login here
          </a>
        </div>
      </div>
    </div>
  )
}