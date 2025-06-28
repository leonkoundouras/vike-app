# Plesk Deployment Guide for Vike SSR App

This guide will help you deploy your Vike SSR application to a Plesk hosting environment.

## Prerequisites

- Plesk hosting account with Node.js support
- SSH access (recommended) or File Manager access
- Node.js 18+ enabled in Plesk

## Deployment Methods

### Method 1: Direct Node.js App (Recommended)

#### Step 1: Prepare Your Files

1. Build the application locally:
```bash
npm run build
```

2. Create a deployment package with these files:
```
vike-app/
├── dist/                    # Built assets (required)
├── node_modules/           # Dependencies (or install on server)
├── pages/                  # Source pages (required for SSR)
├── package.json           # Dependencies list
├── package-lock.json      # Lock file
├── server-production.js   # Production server
├── app.js                 # Plesk entry point
├── ecosystem.config.js    # PM2 config (optional)
└── web.config            # IIS config (if using Windows/IIS)
```

#### Step 2: Upload to Plesk

1. **Via SSH (Recommended):**
```bash
# Upload your files to the domain's directory
scp -r vike-app/* user@yourserver.com:/var/www/vhosts/yourdomain.com/httpdocs/

# Or use rsync
rsync -avz --exclude 'node_modules' vike-app/ user@yourserver.com:/var/www/vhosts/yourdomain.com/httpdocs/
```

2. **Via File Manager:**
   - Zip your project files (excluding node_modules)
   - Upload via Plesk File Manager
   - Extract in the domain's root directory

#### Step 3: Configure Node.js in Plesk

1. Go to **Websites & Domains** → Your domain → **Node.js**
2. Enable Node.js for your domain
3. Set the following configuration:
   - **Node.js version:** 18.x or higher
   - **Application mode:** Production
   - **Application startup file:** `app.js`
   - **Application root:** `/httpdocs` (or your domain's document root)

#### Step 4: Install Dependencies

1. In Plesk Node.js settings, click **NPM Install** or use SSH:
```bash
cd /var/www/vhosts/yourdomain.com/httpdocs
npm install --production
```

#### Step 5: Environment Variables

Set these environment variables in Plesk Node.js settings:
- `NODE_ENV=production`
- `PORT=3000` (or the port assigned by Plesk)

#### Step 6: Start the Application

1. Click **Restart App** in Plesk Node.js settings
2. Or via SSH:
```bash
npm run start
```

### Method 2: Using PM2 (Advanced)

If your Plesk supports PM2:

1. Install PM2 globally:
```bash
npm install -g pm2
```

2. Start with PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## File Structure Explanation

### Required Files for Deployment

- **`dist/`** - Contains built client and server assets
- **`pages/`** - Source pages needed for SSR routing
- **`server-production.js`** - Production Express server
- **`package.json`** - Dependencies and scripts
- **`app.js`** - Plesk entry point

### Configuration Files

- **`.htaccess`** - Apache configuration (if using Apache)
- **`web.config`** - IIS configuration (if using Windows/IIS)
- **`ecosystem.config.js`** - PM2 process manager configuration

## Troubleshooting

### Common Issues

1. **"Cannot find module" errors:**
   - Ensure all dependencies are installed: `npm install --production`
   - Check that `node_modules` exists and is complete

2. **Port binding errors:**
   - Plesk usually assigns a specific port
   - Check Plesk Node.js settings for the assigned port
   - Update `PORT` environment variable if needed

3. **Static files not loading:**
   - Ensure `dist/client` directory is uploaded
   - Check file permissions (755 for directories, 644 for files)
   - Verify `.htaccess` or `web.config` is properly configured

4. **SSR not working:**
   - Ensure `pages/` directory is uploaded
   - Check that `vike` and `vike-react` are in dependencies
   - Verify Node.js version compatibility (18+)

### Debug Steps

1. **Check application logs:**
   - Plesk: Go to Node.js settings → View logs
   - SSH: `tail -f /var/www/vhosts/yourdomain.com/logs/error_log`

2. **Test the application:**
```bash
# SSH into your server
cd /var/www/vhosts/yourdomain.com/httpdocs
node server-production.js
```

3. **Verify build:**
```bash
# Check if dist directory exists and has content
ls -la dist/
ls -la dist/client/
ls -la dist/server/
```

## Performance Optimization

### For Production

1. **Enable compression** in Plesk or via `.htaccess`:
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

2. **Set up caching** for static assets (already configured in `.htaccess`)

3. **Use CDN** for static assets if available

## Security Considerations

1. **Environment Variables:**
   - Never commit sensitive data to version control
   - Use Plesk environment variables for secrets

2. **File Permissions:**
   - Set appropriate permissions: `chmod 755` for directories, `chmod 644` for files
   - Ensure `app.js` is executable: `chmod +x app.js`

3. **Updates:**
   - Regularly update dependencies: `npm audit fix`
   - Keep Node.js version updated in Plesk

## Support

If you encounter issues:

1. Check Plesk documentation for Node.js applications
2. Contact your hosting provider for Plesk-specific support
3. Review application logs for specific error messages

## Quick Deployment Checklist

- [ ] Build application locally (`npm run build`)
- [ ] Upload all required files to Plesk
- [ ] Configure Node.js in Plesk panel
- [ ] Set `app.js` as startup file
- [ ] Install dependencies (`npm install --production`)
- [ ] Set environment variables (`NODE_ENV=production`)
- [ ] Restart application in Plesk
- [ ] Test application functionality
- [ ] Monitor logs for errors

Your Vike SSR application should now be running on Plesk!