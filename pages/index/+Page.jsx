import React from 'react'
import { useAuth } from '../../components/AuthContext'

const styles = {
  container: {
    textAlign: 'center',
    padding: '3rem 2rem'
  },
  hero: {
    marginBottom: '3rem'
  },
  title: {
    fontSize: '3rem',
    color: '#2c3e50',
    marginBottom: '1rem'
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#7f8c8d',
    marginBottom: '2rem'
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem'
  },
  feature: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  featureTitle: {
    fontSize: '1.3rem',
    color: '#2c3e50',
    marginBottom: '1rem'
  },
  featureDescription: {
    color: '#7f8c8d'
  },
  cta: {
    marginTop: '3rem'
  },
  ctaButton: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    margin: '0 1rem'
  },
  secondaryButton: {
    backgroundColor: '#27ae60',
    color: 'white',
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    margin: '0 1rem'
  }
}

export default function Page() {
  const { isAuthenticated, user } = useAuth()

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>
          {isAuthenticated ? `Welcome back, ${user?.name}!` : 'Welcome to Vike Product Manager'}
        </h1>
        <p style={styles.subtitle}>
          {isAuthenticated 
            ? 'Manage your product inventory efficiently with our powerful product management system'
            : 'A modern, secure product management application built with Vike SSR, React, and Express'
          }
        </p>
      </div>

      <div style={styles.features}>
        <div style={styles.feature}>
          <div style={styles.featureIcon}>🔐</div>
          <h3 style={styles.featureTitle}>Secure Authentication</h3>
          <p style={styles.featureDescription}>
            JWT-based authentication with bcrypt password hashing for maximum security
          </p>
        </div>

        <div style={styles.feature}>
          <div style={styles.featureIcon}>🛍️</div>
          <h3 style={styles.featureTitle}>Product Management</h3>
          <p style={styles.featureDescription}>
            Create, edit, delete, and organize your products with images, pricing, and inventory tracking
          </p>
        </div>

        <div style={styles.feature}>
          <div style={styles.featureIcon}>⚡</div>
          <h3 style={styles.featureTitle}>Server-Side Rendering</h3>
          <p style={styles.featureDescription}>
            Fast initial page loads and SEO-friendly content with Vike SSR
          </p>
        </div>

        <div style={styles.feature}>
          <div style={styles.featureIcon}>📊</div>
          <h3 style={styles.featureTitle}>Inventory Analytics</h3>
          <p style={styles.featureDescription}>
            Track your inventory with detailed statistics, stock levels, and product insights
          </p>
        </div>
      </div>

      <div style={styles.cta}>
        {isAuthenticated ? (
          <>
            <a href="/products" style={styles.ctaButton}>
              Go to My Products
            </a>
            <a href="/about" style={styles.secondaryButton}>
              Learn More
            </a>
          </>
        ) : (
          <>
            <a href="/register" style={styles.ctaButton}>
              Get Started
            </a>
            <a href="/login" style={styles.secondaryButton}>
              Login
            </a>
          </>
        )}
      </div>
    </div>
  )
}