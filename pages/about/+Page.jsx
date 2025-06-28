import React from 'react'

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem'
  },
  title: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '2rem',
    textAlign: 'center'
  },
  section: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    color: '#34495e',
    marginBottom: '1rem'
  },
  techGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginTop: '1rem'
  },
  techItem: {
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    textAlign: 'center'
  },
  techName: {
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '0.5rem'
  },
  techDescription: {
    fontSize: '0.9rem',
    color: '#7f8c8d'
  },
  featureList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginTop: '1rem'
  },
  featureItem: {
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px'
  },
  featureTitle: {
    fontWeight: 'bold',
    color: '#27ae60',
    marginBottom: '0.5rem'
  },
  securityList: {
    listStyle: 'none',
    padding: 0
  },
  securityItem: {
    padding: '0.5rem 0',
    borderBottom: '1px solid #ecf0f1'
  },
  securityIcon: {
    color: '#27ae60',
    marginRight: '0.5rem'
  }
}

export default function Page() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About Vike Todo App</h1>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🚀 Technology Stack</h2>
        <p>This application is built with modern web technologies for optimal performance and developer experience:</p>
        
        <div style={styles.techGrid}>
          <div style={styles.techItem}>
            <div style={styles.techName}>Vike (Vite SSR)</div>
            <div style={styles.techDescription}>Server-side rendering framework</div>
          </div>
          <div style={styles.techItem}>
            <div style={styles.techName}>React 18</div>
            <div style={styles.techDescription}>Modern UI library with hooks</div>
          </div>
          <div style={styles.techItem}>
            <div style={styles.techName}>Express.js</div>
            <div style={styles.techDescription}>Fast Node.js web framework</div>
          </div>
          <div style={styles.techItem}>
            <div style={styles.techName}>JWT Authentication</div>
            <div style={styles.techDescription}>Secure token-based auth</div>
          </div>
          <div style={styles.techItem}>
            <div style={styles.techName}>bcrypt</div>
            <div style={styles.techDescription}>Password hashing library</div>
          </div>
          <div style={styles.techItem}>
            <div style={styles.techName}>Vite</div>
            <div style={styles.techDescription}>Lightning-fast build tool</div>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>✨ Key Features</h2>
        
        <div style={styles.featureList}>
          <div style={styles.featureItem}>
            <div style={styles.featureTitle}>User Authentication</div>
            <div>Secure registration and login with JWT tokens and password hashing</div>
          </div>
          <div style={styles.featureItem}>
            <div style={styles.featureTitle}>Todo Management</div>
            <div>Create, edit, delete, and organize todos with priorities and due dates</div>
          </div>
          <div style={styles.featureItem}>
            <div style={styles.featureTitle}>Real-time Statistics</div>
            <div>Track your productivity with completion rates and overdue items</div>
          </div>
          <div style={styles.featureItem}>
            <div style={styles.featureTitle}>Server-Side Rendering</div>
            <div>Fast initial page loads and SEO-friendly content</div>
          </div>
          <div style={styles.featureItem}>
            <div style={styles.featureTitle}>Responsive Design</div>
            <div>Works seamlessly on desktop, tablet, and mobile devices</div>
          </div>
          <div style={styles.featureItem}>
            <div style={styles.featureTitle}>API-First Architecture</div>
            <div>RESTful API endpoints for easy integration and testing</div>
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🔒 Security Features</h2>
        <p>Security is a top priority in this application:</p>
        
        <ul style={styles.securityList}>
          <li style={styles.securityItem}>
            <span style={styles.securityIcon}>✓</span>
            <strong>Password Hashing:</strong> bcrypt with salt rounds for secure password storage
          </li>
          <li style={styles.securityItem}>
            <span style={styles.securityIcon}>✓</span>
            <strong>JWT Tokens:</strong> Stateless authentication with expiration times
          </li>
          <li style={styles.securityItem}>
            <span style={styles.securityIcon}>✓</span>
            <strong>Input Validation:</strong> Server-side validation for all user inputs
          </li>
          <li style={styles.securityItem}>
            <span style={styles.securityIcon}>✓</span>
            <strong>Rate Limiting:</strong> Protection against brute force attacks
          </li>
          <li style={styles.securityItem}>
            <span style={styles.securityIcon}>✓</span>
            <strong>CORS Configuration:</strong> Proper cross-origin resource sharing setup
          </li>
          <li style={styles.securityItem}>
            <span style={styles.securityIcon}>✓</span>
            <strong>Helmet.js:</strong> Security headers for protection against common attacks
          </li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🏗️ Architecture</h2>
        <p>The application follows modern web development best practices:</p>
        
        <ul>
          <li><strong>File-based Routing:</strong> Intuitive page organization with Vike</li>
          <li><strong>Component Architecture:</strong> Reusable React components with hooks</li>
          <li><strong>API Layer:</strong> Separate authentication and todo management endpoints</li>
          <li><strong>Context Management:</strong> React Context for global state management</li>
          <li><strong>Middleware Pattern:</strong> Express middleware for authentication and validation</li>
          <li><strong>Error Handling:</strong> Comprehensive error handling and user feedback</li>
        </ul>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🚀 Deployment Ready</h2>
        <p>This application is optimized for production deployment:</p>
        
        <ul>
          <li><strong>Plesk Compatible:</strong> Ready for Plesk hosting with configuration files</li>
          <li><strong>Production Build:</strong> Optimized bundles with code splitting</li>
          <li><strong>Environment Variables:</strong> Configurable settings for different environments</li>
          <li><strong>Static Asset Optimization:</strong> Compressed and cached static files</li>
          <li><strong>PM2 Support:</strong> Process management for production servers</li>
        </ul>
      </div>
    </div>
  )
}