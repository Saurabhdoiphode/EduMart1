# Complete Render Deployment Setup Guide

## Your App Structure
- Frontend: React (in `client/` folder)
- Backend: Express.js (in `server/` folder)
- Database: MongoDB Atlas (cloud)

---

## Step-by-Step Deployment

### Step 1: Delete Old Render Service

1. Go to [render.com](https://render.com) dashboard
2. Click on your **edumart** service
3. Click **Settings** (at bottom of left sidebar)
4. Scroll to bottom → Click **"Delete Service"**
5. Confirm deletion

---

### Step 2: Create New Web Service

1. Click **"New +"** button
2. Select **"Web Service"**
3. Choose your **EduMart** repository
4. Click **"Connect"**

---

### Step 3: Configure Service

Fill in these exact values:

| Field | Value |
|-------|-------|
| **Name** | `edumart` |
| **Environment** | `Docker` |
| **Region** | `Singapore` (or closest) |
| **Branch** | `main` |
| **Plan** | `Free` (or Paid) |

---

### Step 4: Add Environment Variables

Click **"Advanced"** and add these variables:

**Key:** `MONGODB_URI`  
**Value:** `mongodb+srv://<db_username>:<db_password>@cluster0.ofyt5ma.mongodb.net/edumart?retryWrites=true&w=majority`

**Key:** `JWT_SECRET`  
**Value:** `your_super_secret_jwt_key_here_min_32_characters`

**Key:** `NODE_ENV`  
**Value:** `production`

**Key:** `PORT`  
**Value:** `10000`

**Key:** `CORS_ORIGIN`  
**Value:** `https://edumart.onrender.com` (update after deployment)

---

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Render will:
   - Detect Dockerfile
   - Build your app (5-10 minutes)
   - Deploy to production
3. You'll get a URL like: `https://edumart.onrender.com`

---

## After Deployment

### ✅ Test Your App

Visit: `https://your-render-url.onrender.com`

You should see your EduMart home page!

### ✅ Test API

Visit: `https://your-render-url.onrender.com/api/health`

Should return:
```json
{
  "status": "healthy",
  "timestamp": "2025-11-28T..."
}
```

---

## Environment Variables - Replace These

| Variable | Replace With |
|----------|--------------|
| `<db_username>` | Your MongoDB Atlas username |
| `<db_password>` | Your MongoDB Atlas password |
| `your_super_secret_jwt_key_here_min_32_characters` | Any random string (min 32 chars) |
| `https://edumart.onrender.com` | Your actual Render URL (after deploy) |

---

## Troubleshooting

### Build Fails
- Check that Dockerfile exists in root
- Verify all package.json files exist (root, server/, client/)
- Check Render build logs for errors

### App Won't Start
- Check environment variables are correct
- Verify MONGODB_URI connection string
- Check server logs in Render dashboard

### Frontend Not Loading
- Clear browser cache
- Check that React build succeeded
- Verify server is serving static files

### API Calls Fail
- Verify REACT_APP_API_URL points to same domain
- Check MongoDB connection
- Enable CORS on backend (already done)

---

## Important Notes

### Free Tier:
- Auto-spins down after 15 min inactivity
- 30-second startup on first request
- Limited hours per month

### Keep Always Running:
- Upgrade to paid plan ($7+/month)
- Use uptime monitor (keeps it warm)

---

## Your Production URLs

**Frontend & Backend:** `https://edumart.onrender.com`  
**API Base:** `https://edumart.onrender.com/api/`  
**Health Check:** `https://edumart.onrender.com/api/health`

🎉 **Your full-stack app is LIVE!**

