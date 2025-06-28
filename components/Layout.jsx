import React, { useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import '../styles/responsive.css'

export default function Layout({ children }) {
  const { user, logout, isAuthenticated } = useAuth()
  const [categories, setCategories] = useState([])
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return '?'
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="wp-container">
      {/* WordPress-like Header */}
      <header className="wp-header">
        <button className="wp-menu-toggle show-mobile" onClick={toggleSidebar}>
          ☰
        </button>
        <a href="/" className="wp-logo">
          <span className="wp-logo-icon">W</span>
          VikePress
        </a>
        
        <nav className="wp-top-nav">
          {isAuthenticated ? (
            <>
              <a href="/products" className="wp-top-nav-item hide-mobile">
                📦 Products
              </a>
              <div className="wp-user-info">
                <div className="wp-avatar hide-mobile">
                  {getUserInitials()}
                </div>
                <span className="hide-mobile">{user?.name}</span>
                <button 
                  onClick={handleLogout}
                  className="wp-logout-btn"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <a href="/login" className="wp-top-nav-item">
                Login
              </a>
              <a href="/register" className="wp-top-nav-item">
                Register
              </a>
            </>
          )}
        </nav>
      </header>

      <div className="wp-content-area">
        {/* WordPress-like Sidebar */}
        {isAuthenticated && (
          <>
            <div className={`wp-mobile-overlay ${sidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}></div>
            <aside className={`wp-sidebar ${sidebarOpen ? 'open' : ''}`}>
              <ul className="wp-sidebar-menu">
                <li className="wp-sidebar-item">
                  <a href="/dashboard" className={`wp-sidebar-link ${window.location.pathname === '/dashboard' ? 'active' : ''}`}>
                    <span className="wp-sidebar-icon">🏠</span>
                    <span className="wp-sidebar-text">Dashboard</span>
                  </a>
                </li>
                <li className="wp-sidebar-item">
                  <a href="/products" className={`wp-sidebar-link ${window.location.pathname === '/products' ? 'active' : ''}`}>
                    <span className="wp-sidebar-icon">📦</span>
                    <span className="wp-sidebar-text">All Products</span>
                  </a>
                </li>
                <li className="wp-sidebar-item">
                  <a href="/products/add" className={`wp-sidebar-link ${window.location.pathname === '/products/add' ? 'active' : ''}`}>
                    <span className="wp-sidebar-icon">➕</span>
                    <span className="wp-sidebar-text">Add New</span>
                  </a>
                </li>
                
                {/* Categories Section */}
                <li className="wp-sidebar-item">
                  <div className="wp-sidebar-link">
                    <span className="wp-sidebar-icon">🏷️</span>
                    <span className="wp-sidebar-text">Categories</span>
                  </div>
                  <ul className="wp-sidebar-submenu open">
                    <li className="wp-sidebar-subitem">
                      <a href="/products" className="wp-sidebar-sublink">
                        All Categories
                        <span className="wp-category-count">
                          {categories.reduce((sum, cat) => sum + cat.count, 0)}
                        </span>
                      </a>
                    </li>
                    {categories.map(category => (
                      <li key={category.name} className="wp-sidebar-subitem">
                        <a 
                          href={`/products?category=${encodeURIComponent(category.name)}`}
                          className="wp-sidebar-sublink"
                        >
                          {category.name}
                          <span className="wp-category-count">{category.count}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                
                {/* Settings */}
                <li className="wp-sidebar-item">
                  <a href="/settings" className={`wp-sidebar-link ${window.location.pathname === '/settings' ? 'active' : ''}`}>
                    <span className="wp-sidebar-icon">⚙️</span>
                    <span className="wp-sidebar-text">Settings</span>
                  </a>
                </li>
                
                {/* User Profile */}
                <li className="wp-sidebar-item">
                  <a href="/profile" className={`wp-sidebar-link ${window.location.pathname === '/profile' ? 'active' : ''}`}>
                    <span className="wp-sidebar-icon">👤</span>
                    <span className="wp-sidebar-text">Profile</span>
                  </a>
                </li>
              </ul>
            </aside>
          </>
        )}
        
        {/* Main Content Area */}
        <main className={`wp-main ${!isAuthenticated ? 'ml-0' : ''}`}>
          {children}
        </main>
      </div>
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