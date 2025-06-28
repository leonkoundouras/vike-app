import React, { useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import '../styles/responsive.css'

const styles = {
  container: {
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5'
  },
  header: {
    backgroundColor: '#2c3e50',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  logo: {
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'white'
  },
  nav: {
    display: 'flex',
    alignItems: 'center'
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    transition: 'background-color 0.2s'
  },
  navLinkHover: {
    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center'
  },
  logoutBtn: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  categoryNav: {
    backgroundColor: '#34495e',
    borderTop: '1px solid #2c3e50'
  },
  categoryList: {
    display: 'flex',
    alignItems: 'center'
  },
  categoryLabel: {
    color: '#bdc3c7',
    fontSize: '0.9rem',
    fontWeight: '600',
    marginRight: '0.5rem'
  },
  categoryLink: {
    color: '#ecf0f1',
    textDecoration: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '15px',
    fontSize: '0.85rem',
    transition: 'all 0.2s',
    border: '1px solid transparent',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem'
  },
  categoryLinkHover: {
    backgroundColor: '#3498db',
    color: 'white',
    transform: 'translateY(-1px)'
  },
  categoryLinkActive: {
    backgroundColor: '#2980b9',
    color: 'white',
    border: '1px solid #3498db'
  },
  categoryCount: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: '0.1rem 0.4rem',
    borderRadius: '10px',
    fontSize: '0.75rem',
    fontWeight: '600'
  },
  dropdown: {
    position: 'relative',
    display: 'inline-block'
  },
  dropdownButton: {
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.3)',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.2s'
  },
  dropdownContent: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: 'white',
    minWidth: '200px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    borderRadius: '8px',
    zIndex: 1000,
    border: '1px solid #ddd',
    marginTop: '0.5rem'
  },
  dropdownItem: {
    color: '#2c3e50',
    padding: '0.75rem 1rem',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'background-color 0.2s',
    borderBottom: '1px solid #eee'
  },
  dropdownItemHover: {
    backgroundColor: '#f8f9fa'
  }
}

export default function Layout({ children }) {
  const { user, logout, isAuthenticated } = useAuth()
  const [categories, setCategories] = useState([])
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState(null)

  useEffect(() => {
    if (isAuthenticated) {
      fetchCategories()
    }
  }, [isAuthenticated])

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/products/categories', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      
      if (data.success) {
        setCategories(data.data.categories)
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err)
    }
  }

  const handleLogout = () => {
    logout()
    window.location.href = '/login'
  }

  const handleCategoryClick = (categoryName) => {
    const params = new URLSearchParams()
    params.set('category', categoryName)
    window.location.href = `/products?${params.toString()}`
  }

  return (
    <div style={styles.container}>
      <header style={styles.header} className="layout-header">
        <a href="/" style={styles.logo} className="layout-logo">
          🛍️ Vike Product Manager
        </a>
        
        <nav style={styles.nav} className="layout-nav">
          {isAuthenticated ? (
            <>
              <a href="/products" style={styles.navLink} className="layout-nav-link">
                📦 All Products
              </a>
              <div style={styles.dropdown}>
                <button 
                  style={styles.dropdownButton}
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                >
                  🏷️ Categories {showCategoryDropdown ? '▲' : '▼'}
                </button>
                {showCategoryDropdown && (
                  <div style={styles.dropdownContent} className="layout-dropdown-content">
                    <a 
                      href="/products" 
                      style={styles.dropdownItem}
                      onClick={() => setShowCategoryDropdown(false)}
                    >
                      <span>All Categories</span>
                      <span style={styles.categoryCount}>
                        {categories.reduce((sum, cat) => sum + cat.count, 0)}
                      </span>
                    </a>
                    {categories.map(category => (
                      <a
                        key={category.name}
                        href={`/products?category=${encodeURIComponent(category.name)}`}
                        style={{
                          ...styles.dropdownItem,
                          ...(hoveredCategory === category.name ? styles.dropdownItemHover : {})
                        }}
                        onMouseEnter={() => setHoveredCategory(category.name)}
                        onMouseLeave={() => setHoveredCategory(null)}
                        onClick={() => setShowCategoryDropdown(false)}
                      >
                        <span>{category.name}</span>
                        <span style={styles.categoryCount}>{category.count}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <div style={styles.userInfo} className="layout-user-info">
                <span className="hide-mobile">Welcome, {user?.name}!</span>
                <span className="show-mobile">{user?.name}</span>
                <button 
                  onClick={handleLogout}
                  style={styles.logoutBtn}
                  className="layout-logout-btn"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <a href="/login" style={styles.navLink} className="layout-nav-link">
                Login
              </a>
              <a href="/register" style={styles.navLink} className="layout-nav-link">
                Register
              </a>
            </>
          )}
        </nav>
      </header>

      {/* Category Navigation Bar */}
      {isAuthenticated && categories.length > 0 && (
        <div style={styles.categoryNav} className="layout-category-nav">
          <div style={styles.categoryList} className="layout-category-list">
            <span style={styles.categoryLabel} className="hide-mobile">Quick Browse:</span>
            <a 
              href="/products" 
              style={{
                ...styles.categoryLink,
                ...(window.location.pathname === '/products' && !window.location.search ? styles.categoryLinkActive : {})
              }}
              className="layout-category-link"
            >
              🏠 All Products
              <span style={styles.categoryCount}>
                {categories.reduce((sum, cat) => sum + cat.count, 0)}
              </span>
            </a>
            {categories.slice(0, 6).map(category => (
              <a
                key={category.name}
                href={`/products?category=${encodeURIComponent(category.name)}`}
                style={styles.categoryLink}
                className="layout-category-link"
                onMouseEnter={(e) => Object.assign(e.target.style, styles.categoryLinkHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, styles.categoryLink)}
              >
                {getCategoryIcon(category.name)} {category.name}
                <span style={styles.categoryCount}>{category.count}</span>
              </a>
            ))}
            {categories.length > 6 && (
              <span style={{...styles.categoryLink, cursor: 'default', opacity: 0.7}} className="layout-category-link">
                +{categories.length - 6} more...
              </span>
            )}
          </div>
        </div>
      )}
      
      <main style={styles.main} className="layout-main">
        {children}
      </main>
    </div>
  )
}

// Helper function to get category icons
function getCategoryIcon(categoryName) {
  const icons = {
    'Electronics': '📱',
    'Wearables': '⌚',
    'Furniture': '🪑',
    'Kitchen': '🍳',
    'Audio': '🎧',
    'Photography': '📷',
    'Smart Home': '🏠',
    'Outdoor': '🏕️',
    'Home & Garden': '🌱',
    'Gaming': '🎮',
    'Sports': '⚽',
    'Books': '📚',
    'Clothing': '👕',
    'Beauty': '💄',
    'Health': '💊'
  }
  return icons[categoryName] || '📦'
}