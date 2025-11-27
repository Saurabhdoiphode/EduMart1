# EduMart Complete Deployment Checklist

## Phase 1: Prepare Code ✅

- [x] Push code to GitHub
- [x] MongoDB connection string ready
- [x] Environment variables configured

---

## Phase 2: Deploy Backend (Render.com)

### Quick Steps:
1. Go to [render.com](https://render.com)
2. Sign in with GitHub
3. Click "New Web Service"
4. Select **EduMart** repository
5. Configure:
   - Build: `cd server && npm install`
   - Start: `cd server && node index.js`
6. Add Environment Variables:
   - `MONGODB_URI` = your MongoDB connection string
   - `JWT_SECRET` = random secret key
   - `NODE_ENV` = production
   - `CORS_ORIGIN` = your Netlify URL (add later)
7. Click "Create Web Service"
8. Wait 3-5 minutes for deployment
9. **Copy your backend URL** (e.g., `https://edumart-backend.onrender.com`)

### After Backend Deploys:
- [ ] Backend URL obtained
- [ ] Test: Visit `https://your-backend-url/api/health` (or any endpoint)
- [ ] Update `CORS_ORIGIN` in Render with your Netlify URL

---

## Phase 3: Deploy Frontend (Netlify)

### Quick Steps:
1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Click "New site from Git"
4. Select **EduMart** repository
5. Configure:
   - Base directory: (empty)
   - Build command: `cd client && npm run build`
   - Publish directory: `client/build`
6. Add Environment Variables:
   - `REACT_APP_API_URL` = `https://your-backend-url.onrender.com`
   - `REACT_APP_FIREBASE_API_KEY` = your Firebase key
   - `REACT_APP_FIREBASE_AUTH_DOMAIN` = your Firebase domain
   - (add other Firebase variables)
7. Click "Deploy site"
8. Wait 2-3 minutes
9. **Copy your frontend URL** (e.g., `https://your-site.netlify.app`)

### After Frontend Deploys:
- [ ] Frontend URL obtained
- [ ] Visit your Netlify URL to test
- [ ] Check browser console for errors

---

## Phase 4: Connect Frontend & Backend

### Update Backend CORS:
1. Go to Render dashboard
2. Find your backend service
3. Go to Environment → add/update:
   ```
   CORS_ORIGIN=https://your-site.netlify.app
   ```
4. Click "Save" (auto redeploys)

### Update Backend Code (Optional):
In `server/index.js`, update CORS:
```javascript
const cors = require('cors');
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
```

Then push to GitHub (auto-redeploys on Render).

---

## Phase 5: Test Everything

### Frontend Tests:
- [ ] App loads without errors
- [ ] Can navigate to different pages
- [ ] Can see console logs

### Backend Tests:
- [ ] API calls work
- [ ] Database operations work
- [ ] Authentication works
- [ ] Check Render logs for errors

### Integration Tests:
- [ ] Login/Register works
- [ ] Can fetch products
- [ ] Can create/update items
- [ ] File uploads work

---

## Emergency Troubleshooting

### Frontend not loading:
- Check Netlify build logs
- Verify `REACT_APP_*` variables are added
- Clear browser cache

### API calls failing:
- Check `REACT_APP_API_URL` is correct
- Check Render backend logs
- Verify CORS is enabled
- Check MongoDB connection

### Build fails on Render:
- Check Render deployment logs
- Ensure `package.json` in server folder
- Test locally: `cd server && npm install && node index.js`

---

## Final URLs

**Frontend:** `https://your-site.netlify.app`
**Backend:** `https://edumart-backend.onrender.com`
**GitHub:** `https://github.com/Saurabhdoiphode/EduMart`

---

## Important Environment Variables Summary

### Backend (Render):
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret
NODE_ENV=production
CORS_ORIGIN=https://your-site.netlify.app
```

### Frontend (Netlify):
```
REACT_APP_API_URL=https://edumart-backend.onrender.com
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
...
```

