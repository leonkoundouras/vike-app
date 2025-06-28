# Complete Guide: Vike SSR App from Scratch to Plesk Deployment

This comprehensive guide walks you through creating a Vike (Vite SSR) application with Node.js Express server from scratch and deploying it to Plesk hosting.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Creating the Application Structure](#creating-the-application-structure)
4. [Building Pages and Components](#building-pages-and-components)
5. [Server Configuration](#server-configuration)
6. [Development and Testing](#development-and-testing)
7. [Production Build](#production-build)
8. [Plesk Deployment](#plesk-deployment)
9. [Troubleshooting](#troubleshooting)

## Prerequisites

Before starting, ensure you have:

- **Node.js 18+** installed on your development machine
- **npm** or **yarn** package manager
- **Code editor** (VS Code, WebStorm, etc.)
- **Plesk hosting account** with Node.js support
- **SSH access** to your server (recommended)

## Project Setup

### Step 1: Initialize the Project

```bash
# Create project directory
mkdir vike-ssr-app
cd vike-ssr-app

# Initialize npm project
npm init -y
```

### Step 2: Install Dependencies

```bash
# Core dependencies
npm install express vike vike-react react react-dom vite @vitejs/plugin-react

# Development dependencies
npm install --save-dev @types/express @types/node typescript
```

### Step 3: Configure Package.json

Edit `package.json` to add the module type and scripts:

```json
{
  "name": "vike-ssr-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node server.js",
    "build": "vite build",
    "start": "NODE_ENV=production node server-production.js",
    "preview": "npm run build && npm run start",
    "dev:prod": "NODE_ENV=production node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "vike": "^0.4.196",
    "vike-react": "^0.5.7",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "vite": "^5.4.19",
    "@vitejs/plugin-react": "^4.3.4"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.14.0",
    "typescript": "^5.5.4"
  }
}
```

## Creating the Application Structure

### Step 4: Create Vite Configuration

Create `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'

export default defineConfig({
  plugins: [react(), vike()],
  server: {
    host: '0.0.0.0',
    port: 12001,
    allowedHosts: true
  }
})
```

### Step 5: Create Project Structure

```bash
# Create pages directory structure
mkdir -p pages/index pages/about

# Create the directory structure
vike-ssr-app/
├── pages/
│   ├── +config.js
│   ├── index/
│   │   └── +Page.jsx
│   └── about/
│       └── +Page.jsx
├── server.js
├── server-production.js
├── vite.config.js
└── package.json
```

## Building Pages and Components

### Step 6: Configure Vike

Create `pages/+config.js`:

```javascript
import vikeReact from 'vike-react/config'

export default {
  ...vikeReact
}
```

### Step 7: Create Home Page

Create `pages/index/+Page.jsx`:

```jsx
export default function Page() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome to Vike SSR App</h1>
      <p>This is a server-side rendered React application built with Vike and Express.</p>
      <nav style={{ marginTop: '20px' }}>
        <a href="/" style={{ marginRight: '20px', color: '#0066cc' }}>Home</a>
        <a href="/about" style={{ color: '#0066cc' }}>About</a>
      </nav>
    </div>
  )
}
```

### Step 8: Create About Page

Create `pages/about/+Page.jsx`:

```jsx
export default function Page() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>About This App</h1>
      <p>This application demonstrates:</p>
      <ul>
        <li>Server-side rendering with Vike</li>
        <li>Express.js backend</li>
        <li>React components</li>
        <li>File-based routing</li>
      </ul>
      <nav style={{ marginTop: '20px' }}>
        <a href="/" style={{ marginRight: '20px', color: '#0066cc' }}>Home</a>
        <a href="/about" style={{ color: '#0066cc' }}>About</a>
      </nav>
    </div>
  )
}
```

## Server Configuration

### Step 9: Create Development Server

Create `server.js`:

```javascript
import express from 'express'
import { renderPage } from 'vike/server'
import { createServer } from 'vite'

const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 12001

async function startServer() {
  const app = express()

  // Enable CORS and iframe support
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.header('X-Frame-Options', 'ALLOWALL')
    next()
  })

  let viteDevServer
  if (!isProduction) {
    // Development mode with Vite dev server
    viteDevServer = await createServer({
      server: { middlewareMode: true },
      appType: 'custom'
    })
    app.use(viteDevServer.ssrLoadModule)
  } else {
    // Production mode - serve static files
    app.use(express.static('dist/client'))
  }

  // Handle all routes with Vike
  app.get('*', async (req, res, next) => {
    try {
      const pageContextInit = {
        urlOriginal: req.originalUrl
      }
      
      const pageContext = await renderPage(pageContextInit)
      const { httpResponse } = pageContext
      
      if (!httpResponse) {
        return next()
      }
      
      const { body, statusCode, headers } = httpResponse
      
      headers.forEach(([name, value]) => res.setHeader(name, value))
      res.status(statusCode).send(body)
    } catch (err) {
      console.error('SSR Error:', err)
      if (viteDevServer) {
        viteDevServer.ssrFixStacktrace(err)
      }
      res.status(500).send('Internal Server Error')
    }
  })

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`)
  })
}

startServer().catch(err => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
```

### Step 10: Create Production Server

Create `server-production.js`:

```javascript
import express from 'express'
import { renderPage } from 'vike/server'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 3000

async function startServer() {
  const app = express()

  // Enable CORS and iframe support
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.header('X-Frame-Options', 'ALLOWALL')
    next()
  })

  if (isProduction) {
    // Serve static files from dist/client
    app.use(express.static(join(__dirname, 'dist/client')))
  }

  // Handle all routes with Vike
  app.get('*', async (req, res, next) => {
    try {
      const pageContextInit = {
        urlOriginal: req.originalUrl
      }
      
      const pageContext = await renderPage(pageContextInit)
      const { httpResponse } = pageContext
      
      if (!httpResponse) {
        return next()
      }
      
      const { body, statusCode, headers } = httpResponse
      
      headers.forEach(([name, value]) => res.setHeader(name, value))
      res.status(statusCode).send(body)
    } catch (err) {
      console.error('SSR Error:', err)
      res.status(500).send('Internal Server Error')
    }
  })

  app.listen(port, '0.0.0.0', () => {
    console.log(`Production server running at http://localhost:${port}`)
  })
}

startServer().catch(err => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
```

## Development and Testing

### Step 11: Start Development Server

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Your application should now be running at `http://localhost:12001`

### Step 12: Test the Application

1. **Home Page**: Navigate to `http://localhost:12001/`
2. **About Page**: Navigate to `http://localhost:12001/about`
3. **SSR Verification**: View page source to confirm server-side rendering

```bash
# Test SSR with curl
curl http://localhost:12001/ | grep "<h1>"
curl http://localhost:12001/about | grep "<h1>"
```

## Production Build

### Step 13: Build for Production

```bash
# Create production build
npm run build
```

This creates a `dist/` directory with:
- `dist/client/` - Static assets (CSS, JS, images)
- `dist/server/` - Server-side rendering modules

### Step 14: Test Production Build

```bash
# Start production server
npm run start

# Test production build
curl http://localhost:3000/ | grep "<h1>"
```

## Plesk Deployment

### Step 15: Create Plesk Configuration Files

#### Create Plesk Entry Point

Create `app.js`:

```javascript
#!/usr/bin/env node

// Plesk Node.js entry point
// This file should be set as the "Application Startup File" in Plesk

import './server-production.js'
```

#### Create Apache Configuration

Create `.htaccess`:

```apache
# Redirect all requests to Node.js app
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /app.js [L]

# Enable CORS
Header always set Access-Control-Allow-Origin "*"
Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
Header always set Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept, Authorization"
Header always set X-Frame-Options "ALLOWALL"

# Cache static assets
<FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 month"
    Header set Cache-Control "public, max-age=2592000"
</FilesMatch>
```

#### Create IIS Configuration (Windows servers)

Create `web.config`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="iisnode" path="app.js" verb="*" modules="iisnode"/>
    </handlers>
    <rewrite>
      <rules>
        <rule name="StaticContent">
          <action type="Rewrite" url="public{REQUEST_URI}"/>
        </rule>
        <rule name="DynamicContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True"/>
          </conditions>
          <action type="Rewrite" url="app.js"/>
        </rule>
      </rules>
    </rewrite>
    <iisnode 
      node_env="production"
      nodeProcessCommandLine="node"
      interceptor="iisnode/interceptor.js" />
  </system.webServer>
</configuration>
```

### Step 16: Create Deployment Package Script

Create `create-deployment-package.sh`:

```bash
#!/bin/bash

# Create deployment package for Plesk
echo "Creating deployment package for Plesk..."

# Build the application
echo "Building application..."
npm run build

# Create deployment directory
DEPLOY_DIR="vike-app-deploy"
rm -rf $DEPLOY_DIR
mkdir $DEPLOY_DIR

# Copy required files
echo "Copying files..."
cp -r dist/ $DEPLOY_DIR/
cp -r pages/ $DEPLOY_DIR/
cp package.json $DEPLOY_DIR/
cp package-lock.json $DEPLOY_DIR/
cp server-production.js $DEPLOY_DIR/
cp app.js $DEPLOY_DIR/
cp .htaccess $DEPLOY_DIR/
cp web.config $DEPLOY_DIR/

# Create logs directory
mkdir -p $DEPLOY_DIR/logs

# Create deployment archive
echo "Creating archive..."
tar -czf vike-app-plesk-deployment.tar.gz $DEPLOY_DIR/

echo "Deployment package created: vike-app-plesk-deployment.tar.gz"
echo "Upload this file to your Plesk server and extract it in your domain's root directory."
```

### Step 17: Create Deployment Package

```bash
# Make script executable
chmod +x create-deployment-package.sh

# Create deployment package
./create-deployment-package.sh
```

### Step 18: Deploy to Plesk

#### Method 1: File Manager Upload

1. **Login to Plesk** control panel
2. **Go to File Manager** for your domain
3. **Upload** `vike-app-plesk-deployment.tar.gz`
4. **Extract** the archive in your domain's root directory
5. **Move files** from `vike-app-deploy/` to root:
   ```bash
   mv vike-app-deploy/* .
   rm -rf vike-app-deploy/
   ```

#### Method 2: SSH Upload (Recommended)

```bash
# Upload via SCP
scp vike-app-plesk-deployment.tar.gz user@yourserver.com:/var/www/vhosts/yourdomain.com/httpdocs/

# SSH into server
ssh user@yourserver.com

# Navigate to domain directory
cd /var/www/vhosts/yourdomain.com/httpdocs/

# Extract and setup
tar -xzf vike-app-plesk-deployment.tar.gz
mv vike-app-deploy/* .
rm -rf vike-app-deploy/ vike-app-plesk-deployment.tar.gz
```

### Step 19: Configure Node.js in Plesk

1. **Navigate** to Websites & Domains → Your Domain → Node.js
2. **Enable Node.js** for your domain
3. **Configure settings**:
   - **Node.js version**: 18.x or higher
   - **Application mode**: Production
   - **Application startup file**: `app.js`
   - **Application root**: `/httpdocs` (or your domain's document root)

### Step 20: Install Dependencies and Start

1. **Install dependencies** in Plesk Node.js panel:
   - Click "NPM Install" button
   - Or via SSH: `npm install --production`

2. **Set environment variables**:
   - `NODE_ENV=production`
   - `PORT=3000` (or assigned by Plesk)

3. **Start the application**:
   - Click "Restart App" in Plesk
   - Or via SSH: `npm run start`

### Step 21: Verify Deployment

1. **Test your domain**:
   - `https://yourdomain.com/` - Should show home page
   - `https://yourdomain.com/about` - Should show about page

2. **Check SSR is working**:
   ```bash
   curl https://yourdomain.com/ | grep "<h1>"
   ```

3. **Monitor logs** in Plesk Node.js panel for any errors

## Troubleshooting

### Common Issues and Solutions

#### 1. "Cannot find module" errors
```bash
# Ensure all dependencies are installed
npm install --production

# Check node_modules exists
ls -la node_modules/
```

#### 2. Port binding errors
- Check Plesk assigns the correct port
- Update `PORT` environment variable in Plesk
- Ensure no other applications use the same port

#### 3. Static files not loading
```bash
# Verify dist directory exists
ls -la dist/client/

# Check file permissions
chmod 755 dist/
chmod 644 dist/client/*
```

#### 4. SSR not working
```bash
# Ensure pages directory is uploaded
ls -la pages/

# Check Vike dependencies
npm list vike vike-react
```

#### 5. Application won't start
```bash
# Check logs in Plesk or via SSH
tail -f /var/www/vhosts/yourdomain.com/logs/error_log

# Test manually
cd /var/www/vhosts/yourdomain.com/httpdocs
node server-production.js
```

### Debug Commands

```bash
# Check application structure
find . -name "*.js" -o -name "*.jsx" -o -name "*.json" | head -20

# Verify build output
ls -la dist/client/assets/
ls -la dist/server/

# Test local server
NODE_ENV=production node server-production.js

# Check dependencies
npm list --depth=0
```

## Adding New Features

### Adding a New Page

1. **Create page directory**:
   ```bash
   mkdir pages/contact
   ```

2. **Create page component**:
   ```jsx
   // pages/contact/+Page.jsx
   export default function Page() {
     return (
       <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
         <h1>Contact Us</h1>
         <p>Get in touch with us!</p>
         <nav style={{ marginTop: '20px' }}>
           <a href="/" style={{ marginRight: '20px', color: '#0066cc' }}>Home</a>
           <a href="/about" style={{ marginRight: '20px', color: '#0066cc' }}>About</a>
           <a href="/contact" style={{ color: '#0066cc' }}>Contact</a>
         </nav>
       </div>
     )
   }
   ```

3. **Rebuild and redeploy**:
   ```bash
   npm run build
   ./create-deployment-package.sh
   # Upload and extract new package
   ```

### Adding API Routes

1. **Modify server files** to add API endpoints:
   ```javascript
   // In server.js and server-production.js, before the '*' route
   app.get('/api/hello', (req, res) => {
     res.json({ message: 'Hello from API!' })
   })
   ```

2. **Rebuild and redeploy**

### Adding Styling

1. **Create CSS files** in `pages/` or create a `styles/` directory
2. **Import in components**:
   ```jsx
   import './styles.css'
   ```
3. **Rebuild and redeploy**

## Performance Optimization

### Production Optimizations

1. **Enable compression** in `.htaccess`:
   ```apache
   <IfModule mod_deflate.c>
       AddOutputFilterByType DEFLATE text/plain text/html text/css application/javascript
   </IfModule>
   ```

2. **Use CDN** for static assets
3. **Enable caching** (already configured in `.htaccess`)
4. **Monitor performance** with Plesk tools

## Security Best Practices

1. **Environment Variables**: Store secrets in Plesk environment variables
2. **File Permissions**: Set correct permissions (755 for directories, 644 for files)
3. **Updates**: Regularly update dependencies with `npm audit fix`
4. **HTTPS**: Enable SSL/TLS in Plesk
5. **Firewall**: Configure appropriate firewall rules

## Conclusion

You now have a complete Vike SSR application deployed on Plesk! This setup provides:

- ✅ Server-side rendering for better SEO and performance
- ✅ Modern React development with Vite
- ✅ Production-ready Express server
- ✅ File-based routing system
- ✅ CORS and iframe support
- ✅ Optimized build process
- ✅ Comprehensive deployment workflow

The application is scalable and ready for additional features like API routes, database integration, authentication, and more complex UI components.

---

**Happy coding! 🚀**