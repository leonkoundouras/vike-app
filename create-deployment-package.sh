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
cp ecosystem.config.js $DEPLOY_DIR/
cp PLESK_DEPLOYMENT.md $DEPLOY_DIR/
cp README.md $DEPLOY_DIR/

# Create logs directory
mkdir -p $DEPLOY_DIR/logs

# Create deployment archive
echo "Creating archive..."
tar -czf vike-app-plesk-deployment.tar.gz $DEPLOY_DIR/

echo "Deployment package created: vike-app-plesk-deployment.tar.gz"
echo "Upload this file to your Plesk server and extract it in your domain's root directory."
echo ""
echo "Quick deployment steps:"
echo "1. Upload vike-app-plesk-deployment.tar.gz to your Plesk server"
echo "2. Extract: tar -xzf vike-app-plesk-deployment.tar.gz"
echo "3. Move files: mv vike-app-deploy/* ."
echo "4. Configure Node.js in Plesk with app.js as startup file"
echo "5. Run: npm install --production"
echo "6. Restart the app in Plesk"
echo ""
echo "See PLESK_DEPLOYMENT.md for detailed instructions."