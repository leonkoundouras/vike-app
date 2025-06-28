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