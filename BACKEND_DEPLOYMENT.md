# Backend Deployment Guide for EduMart

## Option 1: Deploy on Render.com (Recommended - Free)

### Step 1: Push Backend Code to GitHub ✅ (Already done)

### Step 2: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Authorize Render to access your repositories

### Step 3: Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Search for your **EduMart** repository
3. Click **"Connect"**

### Step 4: Configure Deployment
Fill in these fields:
- **Name**: `edumart-backend`
- **Environment**: `Node`
- **Region**: Choose closest to you
- **Branch**: `main`
- **Build Command**: `cd server && npm install`
- **Start Command**: `cd server && node index.js`
- **Plan**: Free (or Paid for more resources)

### Step 5: Add Environment Variables
Click **"Advanced"** and add these variables:

```
MONGODB_URI=mongodb+srv://<db_username>:<db_password>@cluster0.ofyt5ma.mongodb.net/edumart?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://your-site.netlify.app
```

### Step 6: Deploy
Click **"Create Web Service"**
- Render will automatically build and deploy
- You'll get a URL like: `https://edumart-backend.onrender.com`

---

## Option 2: Deploy on Railway.app (Alternative)

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Authorize Railway

### Step 2: New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Select your **EduMart** repository

### Step 3: Configure
1. Set **Root Directory**: `server`
2. Set **Start Command**: `node index.js`

### Step 4: Add Variables
Go to **Variables** tab and add:
```
MONGODB_URI=mongodb+srv://<db_username>:<db_password>@cluster0.ofyt5ma.mongodb.net/edumart?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
NODE_ENV=production
```

### Step 5: Deploy
Railway auto-deploys on push. Get your URL from the Railway dashboard.

---

## Option 3: Deploy on Heroku (Legacy but still works)

### Note: Heroku free tier ended in Nov 2022
Consider Render or Railway instead.

---

## Backend Configuration Checklist

- [ ] Backend code pushed to GitHub ✅
- [ ] Create account on Render/Railway
- [ ] Connect GitHub repository
- [ ] Configure build & start commands
- [ ] Add MongoDB URI
- [ ] Add JWT_SECRET
- [ ] Deploy
- [ ] Get backend URL
- [ ] Update CORS in backend
- [ ] Add backend URL to Netlify frontend

---

## Update Backend CORS

After getting your backend URL, update `server/index.js`:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'https://your-site.netlify.app',      // Netlify frontend URL
    'http://localhost:3000'                // Local development
  ],
  credentials: true
}));
```

---

## Update Frontend Environment Variables

After backend deployment, add to Netlify:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

Then redeploy frontend on Netlify.

---

## Test Backend Deployment

Once deployed, test your API:

```bash
curl https://your-backend-url/api/health
```

If you get a response, your backend is running! ✅

---

## Recommended: Render.com Steps Summary

1. ✅ Code on GitHub
2. Go to render.com
3. Sign in with GitHub
4. Click "New Web Service"
5. Select EduMart repo
6. Set build: `cd server && npm install`
7. Set start: `cd server && node index.js`
8. Add MongoDB & JWT environment variables
9. Click Deploy
10. Wait 2-5 minutes
11. Copy your backend URL
12. Update frontend REACT_APP_API_URL
13. Redeploy frontend on Netlify

**Done!** Your full-stack app is live! 🚀

