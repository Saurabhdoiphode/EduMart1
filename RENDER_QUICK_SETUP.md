# Render Deployment Quick Reference

## Environment Variables to Add in Render

Copy these exactly as shown:

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
https://your-netlify-site.netlify.app
```

---

## Build & Start Commands

**Build Command:**
```
cd server && npm install
```

**Start Command:**
```
cd server && node index.js
```

---

## Steps to Deploy

1. Go to render.com
2. Click "New Web Service"
3. Select your EduMart repository
4. Name it: `edumart-backend`
5. Environment: Node
6. Add build & start commands (see above)
7. Click "Advanced"
8. Add all environment variables
9. Click "Create Web Service"
10. Wait for deployment
11. Copy your backend URL
12. Add to Netlify as REACT_APP_API_URL
13. Redeploy frontend

---

## Test Your Backend

After deployment, visit:
```
https://your-backend-url.onrender.com/api/health
```

Should show:
```json
{
  "status": "healthy",
  "timestamp": "..."
}
```

---

## Important

- Render free tier spins down after 15 minutes
- Each request wakes it up (30 seconds delay)
- To keep always on: upgrade to paid plan
- Or use uptime monitoring service

