import React from 'react'
import { useAuth } from './AuthContext'

const styles = {
  container: {
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5'
  },
  header: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: 'white'
  },
  nav: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.2s'
  },
  navLinkHover: {
    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  logoutBtn: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  main: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  }
}

export default function Layout({ children }) {
  const { user, logout, isAuthenticated } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = '/login'
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <a href="/" style={styles.logo}>
          Vike Product Manager
        </a>
        
        <nav style={styles.nav}>
          {isAuthenticated ? (
            <>
              <a href="/products" style={styles.navLink}>
                My Products
              </a>
              <div style={styles.userInfo}>
                <span>Welcome, {user?.name}!</span>
                <button 
                  onClick={handleLogout}
                  style={styles.logoutBtn}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <a href="/login" style={styles.navLink}>
                Login
              </a>
              <a href="/register" style={styles.navLink}>
                Register
              </a>
            </>
          )}
        </nav>
      </header>
      
      <main style={styles.main}>
        {children}
      </main>
    </div>
  )
}