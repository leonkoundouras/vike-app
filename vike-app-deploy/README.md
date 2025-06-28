# Vike SSR Application

A server-side rendered React application built with Vike (Vite SSR) and Express.js.

## Features

- ✅ Server-side rendering (SSR) with Vike
- ✅ Express.js backend server
- ✅ React 18 components
- ✅ File-based routing
- ✅ Hot module replacement in development
- ✅ CORS and iframe support enabled
- ✅ TypeScript ready

## Project Structure

```
vike-app/
├── pages/
│   ├── +config.js          # Vike configuration with vike-react
│   ├── index/
│   │   └── +Page.jsx       # Home page component
│   └── about/
│       └── +Page.jsx       # About page component
├── server.js               # Express server with Vike SSR
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to:
   - Home: http://localhost:12001/
   - About: http://localhost:12001/about

The server runs on port 12001 and is configured to accept connections from any host (0.0.0.0).

### Production

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run dev:prod
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Build and start production server
- `npm run dev:prod` - Start production server

## Technology Stack

- **Vike**: Modern SSR framework for Vite
- **React 18**: UI library with latest features
- **Express.js**: Web server framework
- **Vite**: Fast build tool and dev server
- **vike-react**: Official React integration for Vike

## Configuration

### Server Configuration

The Express server is configured with:
- CORS enabled for all origins
- X-Frame-Options set to ALLOWALL for iframe support
- Host binding to 0.0.0.0 for external access
- Port 12001 (configurable via PORT environment variable)

### Vike Configuration

- Uses `vike-react` for React integration
- File-based routing in the `pages/` directory
- SSR enabled by default
- Hot module replacement in development

## Adding New Pages

To add a new page:

1. Create a new directory under `pages/`
2. Add a `+Page.jsx` file with your React component
3. The route will be automatically available based on the directory name

Example for `/contact` page:
```bash
mkdir pages/contact
```

```jsx
// pages/contact/+Page.jsx
export default function Page() {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>Get in touch!</p>
    </div>
  )
}
```

## Deployment

The application is ready for deployment to any Node.js hosting platform:

1. Build the application: `npm run build`
2. Set the `NODE_ENV=production` environment variable
3. Start the server: `npm run dev:prod`

## External Access

The server is configured to accept connections from external hosts and supports:
- CORS for cross-origin requests
- Iframe embedding
- External host access via 0.0.0.0 binding

For the provided runtime environment, the application is accessible at:
- https://work-2-pomwomhvodjyxxpb.prod-runtime.all-hands.dev

## Troubleshooting

### Port Already in Use

If you get an "EADDRINUSE" error, either:
1. Kill existing processes: `pkill -f node`
2. Change the port in `server.js` and `vite.config.js`

### Vite Deprecation Warning

The warning about `vite.createServer()` being deprecated is expected and doesn't affect functionality. This will be resolved in future Vike updates.

## License

MIT