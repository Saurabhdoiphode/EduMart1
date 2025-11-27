# Deployment Guide for EduMart

## Frontend Deployment (Netlify)

### Steps:
1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Click "New site from Git"
4. Select your EduMart repository
5. Configure:
   - **Branch to deploy**: `main`
   - **Base directory**: (leave empty)
   - **Build Command**: `cd client && npm run build`
   - **Publish directory**: `client/build`
6. Add Environment Variables from your `.env` file
7. Click Deploy

**Frontend URL**: Will be provided by Netlify (https://your-site.netlify.app)

---

## Environment Variables for Netlify

Add these to Netlify Site Settings → Build & Deploy → Environment:

```
REACT_APP_API_URL=https://your-backend-url
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

---

## Quick Checklist

- [ ] Push code to GitHub ✅
- [ ] Connect repo to Netlify
- [ ] Configure build settings
- [ ] Add environment variables
- [ ] Deploy frontend
- [ ] Test the deployed app
- [ ] Setup custom domain (optional)

