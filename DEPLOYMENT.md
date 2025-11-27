# 🚀 GitHub Pages Deployment Guide for EduMart

## Prerequisites
- GitHub account
- Git installed on your computer
- Node.js and npm installed

## Step 1: Install gh-pages Package

```bash
cd client
npm install --save-dev gh-pages
cd ..
```

## Step 2: Update package.json (Already Done)

The `client/package.json` has been updated with:
- `homepage`: "https://arnavmarkali7-star.github.io/EduMart"
- `predeploy`: "npm run build"
- `deploy`: "gh-pages -d build"

## Step 3: Update Router for GitHub Pages

For GitHub Pages, we need to use `HashRouter` instead of `BrowserRouter` to avoid routing issues.

**Note**: If you're using BrowserRouter, you'll need to switch to HashRouter for GitHub Pages deployment.

## Step 4: Build and Deploy

```bash
cd client
npm run deploy
```

This will:
1. Build your React app (`npm run build`)
2. Deploy the `build` folder to the `gh-pages` branch
3. Push to GitHub

## Step 5: Configure GitHub Pages

1. Go to your GitHub repository: `https://github.com/arnavmarkali7-star/EduMart`
2. Click on **Settings**
3. Scroll down to **Pages** section
4. Under **Source**, select:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
5. Click **Save**

## Step 6: Wait for Deployment

- GitHub Pages usually takes 1-2 minutes to deploy
- You'll see a green checkmark in the Deployments section when it's ready
- Your site will be available at: `https://arnavmarkali7-star.github.io/EduMart/`

## Important Notes

### ⚠️ Backend API Issues

Since GitHub Pages only hosts static files, your backend API won't work directly. You have two options:

#### Option 1: Use Production Backend URL
Update your API calls in the client to point to your production backend:

1. Create a `.env.production` file in `client/`:
```env
REACT_APP_API_URL=https://your-backend-url.com
```

2. Update axios calls to use:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
axios.defaults.baseURL = API_URL;
```

#### Option 2: Deploy Backend Separately
Deploy your backend to:
- Heroku
- Railway
- Render
- Vercel (serverless)
- DigitalOcean
- AWS

### 🔧 Using HashRouter for GitHub Pages

If you're having routing issues, update `client/src/App.js`:

```javascript
// Change from BrowserRouter to HashRouter
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Rest of the code remains the same
```

**Note**: HashRouter adds `#` to URLs (e.g., `/#/products`), but it works perfectly on GitHub Pages.

## Troubleshooting

### Issue: 404 Error on Refresh
**Solution**: Use HashRouter instead of BrowserRouter (see above)

### Issue: Blank Page
**Solution**: 
1. Check browser console for errors
2. Verify `homepage` in `package.json` is correct
3. Make sure build was successful
4. Clear browser cache

### Issue: API Calls Not Working
**Solution**: 
1. Deploy backend to a cloud service
2. Update API URLs to point to production backend
3. Update CORS settings in backend to allow your GitHub Pages domain

### Issue: Images Not Loading
**Solution**:
1. Make sure image paths are relative (start with `/` or `./`)
2. Check that images are in the `public` folder
3. Rebuild and redeploy

### Issue: Deployment Fails
**Solution**:
1. Check if `gh-pages` is installed: `npm list gh-pages`
2. Verify you're in the `client` directory
3. Check GitHub repository permissions
4. Make sure you're logged in to GitHub via Git

## Updating Your Deployment

Every time you make changes:

```bash
cd client
npm run deploy
```

This will rebuild and redeploy your app automatically.

## Checking Deployment Status

1. Go to your repository on GitHub
2. Click on **Actions** tab
3. You'll see deployment status
4. Green checkmark = deployed successfully
5. Red X = deployment failed (check logs)

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file in `client/public/` with your domain name
2. Update DNS settings to point to GitHub Pages
3. Update `homepage` in `package.json` to your custom domain

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify all environment variables are set
3. Check GitHub Actions logs
4. Make sure backend is deployed and accessible

## Quick Deployment Commands

```bash
# Install gh-pages (one time)
cd client
npm install --save-dev gh-pages

# Deploy (every time you make changes)
cd client
npm run deploy

# Check deployment
# Go to: https://arnavmarkali7-star.github.io/EduMart/
```

Happy Deploying! 🎉

