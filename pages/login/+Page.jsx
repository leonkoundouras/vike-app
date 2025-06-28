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
    <div className="wp-login-container">
      <div className="wp-login-form">
        <div className="wp-login-logo">
          <h2 style={{ margin: 0, color: 'var(--wp-primary)' }}>VikePress</h2>
        </div>
        
        <h1 className="wp-login-title">Log In</h1>
        
        <form onSubmit={handleSubmit}>
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
          {errors.email && <div className="wp-notice wp-notice-error" style={{ padding: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem' }}>{errors.email}</div>}

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
          {errors.password && <div className="wp-notice wp-notice-error" style={{ padding: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem' }}>{errors.password}</div>}

          <button
            type="submit"
            disabled={loading}
            className="wp-login-button"
            style={loading ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>

          {message && (
            <div className={message.includes('successful') ? "wp-notice wp-notice-success" : "wp-notice wp-notice-error"} style={{ marginTop: '1rem', padding: '0.5rem', fontSize: '0.9rem' }}>
              {message}
            </div>
          )}
        </form>

        <div className="wp-login-footer">
          Don't have an account?{' '}
          <a href="/register">
            Register here
          </a>
        </div>
      </div>
    </div>
  )
}