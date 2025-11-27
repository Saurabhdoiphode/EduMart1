# Deploy EduMart Backend on Render

## Step 1: Prepare Your Code ✅

Your backend code is already pushed to GitHub. Render will pull from there.

---

## Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Click **"Sign Up"**
3. Sign up with GitHub
4. Authorize Render to access your repositories

---

## Step 3: Create Web Service

1. Go to your Render dashboard
2. Click **"New +"** → **"Web Service"**
3. Search for your **EduMart** repository
4. Click **"Connect"**

---

## Step 4: Configure Service

Fill in these fields:

| Field | Value |
|-------|-------|
| **Name** | `edumart-backend` |
| **Environment** | `Node` |
| **Region** | Choose closest to you (e.g., Singapore, US East) |
| **Branch** | `main` |
| **Build Command** | `cd server && npm install` |
| **Start Command** | `cd server && node index.js` |
| **Plan** | Free (or Paid for better performance) |

---

## Step 5: Add Environment Variables

Click **"Advanced"** and add these variables:

```
MONGODB_URI
mongodb+srv://<db_username>:<db_password>@cluster0.ofyt5ma.mongodb.net/edumart?retryWrites=true&w=majority

JWT_SECRET
your_super_secret_jwt_key_here_min_32_chars

NODE_ENV
production

PORT
5000

CORS_ORIGIN
https://your-site.netlify.app
```

**Replace:**
- `<db_username>` - Your MongoDB username
- `<db_password>` - Your MongoDB password
- `your-site.netlify.app` - Your actual Netlify frontend URL

---

## Step 6: Deploy

1. Click **"Create Web Service"**
2. Render will build and deploy
3. Wait 2-5 minutes ⏳
4. You'll get a URL like: `https://edumart-backend.onrender.com`

---

## Step 7: Update Frontend

Once backend is deployed:

1. Go to your **Netlify dashboard**
2. Go to **Site Settings** → **Build & Deploy** → **Environment**
3. Update or add:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```
4. Trigger a redeploy (push to GitHub or click "Trigger deploy")

---

## Step 8: Test Connection

Visit this URL to test:
```
https://edumart-backend.onrender.com/api/health
```

Should return:
```json
{
  "status": "healthy",
  "timestamp": "2025-11-28T..."
}
```

---

## Important Notes

### Free Tier Limitations:
- Spins down after 15 minutes of inactivity
- Takes 30 seconds to wake up
- Limited to 750 hours/month
- Shared resources

### To Keep Alive:
- Use paid plan ($7+/month)
- OR use a uptime monitor service (keeps it warm)

### CORS Configuration:
Backend CORS is already set to accept your Netlify URL.

---

## Troubleshooting

### Deploy Failed
- Check **Logs** in Render dashboard
- Ensure `server/package.json` exists
- Verify all dependencies are listed

### API Not Working
- Check `MONGODB_URI` is correct
- Verify MongoDB credentials
- Check Render function logs
- Test locally: `cd server && npm install && node index.js`

### Connection Timeout
- Free tier may be slow
- Consider upgrading to paid plan
- Or use Uptime Monitor to keep it warm

---

## Your Deployment Checklist

- [ ] Create Render account with GitHub
- [ ] Create new Web Service
- [ ] Connect EduMart repository
- [ ] Set build command: `cd server && npm install`
- [ ] Set start command: `cd server && node index.js`
- [ ] Add MONGODB_URI
- [ ] Add JWT_SECRET
- [ ] Add NODE_ENV = production
- [ ] Add CORS_ORIGIN = your Netlify URL
- [ ] Create Web Service
- [ ] Wait for deployment
- [ ] Test `/api/health` endpoint
- [ ] Update Netlify REACT_APP_API_URL
- [ ] Redeploy Netlify frontend

---

## Your Live URLs

**Frontend:** `https://your-site.netlify.app`  
**Backend:** `https://edumart-backend.onrender.com`  
**Database:** MongoDB Atlas (cloud)

**Everything is now LIVE!** 🚀

