# 🚀 Production Deployment - Client-Ready Release

## 🎯 Goal

Deploy the application and generate a **single shareable product URL** for clients.

**Client URL:** `https://your-app.vercel.app` (frontend only - backend stays hidden)

---

## 📋 Pre-Deployment Checklist

### Code Status
- [x] All API calls use environment variables (`apiUrl()` helper)
- [x] No hardcoded localhost URLs
- [x] Error messages are production-ready
- [x] Backend CORS configured correctly
- [x] Security headers configured
- [x] Rate limiting enabled

---

## 🚀 Step 1: Deploy Backend (Railway)

### 1.1 Create Railway Account & Project

1. Go to [railway.app](https://railway.app)
2. Sign up / Login
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Select your repository
6. Choose **`planet-nakshatra-backend`** directory

### 1.2 Add PostgreSQL Database

1. In Railway project, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Wait for database to provision
4. Click on PostgreSQL service
5. Copy the **Connection URL** (DATABASE_URL)

### 1.3 Configure Environment Variables

In Railway → Your Backend Service → **Variables** tab, add:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:password@host:port/db?sslmode=require
FRONTEND_URL=https://your-app.vercel.app
JWT_SECRET=<generate-below>
JWT_EXPIRES_IN=7d
API_RATE_LIMIT_TTL=60
API_RATE_LIMIT_MAX=100
LOG_LEVEL=info
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 1.4 Update Prisma Schema for PostgreSQL

**Before deploying, update schema:**

```bash
cd planet-nakshatra-backend

# Backup SQLite schema
cp prisma/schema.prisma prisma/schema.sqlite.backup

# Use PostgreSQL schema
cp prisma/schema.postgresql.prisma prisma/schema.prisma

# Install PostgreSQL driver
npm install pg @types/pg
npm uninstall better-sqlite3 @prisma/adapter-libsql @libsql/client
```

### 1.5 Deploy Backend

Railway will auto-deploy on git push, or:

1. Click **"Deploy"** button
2. Wait for build to complete
3. Check **"Logs"** tab for startup messages
4. Note the **Public URL** (e.g., `https://your-backend.railway.app`)

### 1.6 Run Database Migrations

After first deployment:

1. Go to Railway → Your Backend Service
2. Click **"Deployments"** → **"View Logs"**
3. Or use Railway CLI:
   ```bash
   railway run npx prisma migrate deploy
   ```

### 1.7 Verify Backend

Test health endpoint:
```bash
curl https://your-backend.railway.app/api/health
```

**Expected:** `{"status":"ok","timestamp":"...","service":"planet-nakshatra-backend"}`

**✅ Backend URL:** `https://your-backend.railway.app`

---

## 🎨 Step 2: Deploy Frontend (Vercel)

### 2.1 Create Vercel Account & Project

1. Go to [vercel.com](https://vercel.com)
2. Sign up / Login with GitHub
3. Click **"Add New Project"**
4. Import your GitHub repository
5. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `.` (root)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### 2.2 Set Environment Variable

**Before deploying, set environment variable:**

1. In Vercel project → **Settings** → **Environment Variables**
2. Add:
   ```
   Name: VITE_API_URL
   Value: https://your-backend.railway.app
   Environment: Production, Preview, Development
   ```
3. Click **"Save"**

### 2.3 Deploy Frontend

1. Click **"Deploy"** button
2. Wait for build to complete
3. Vercel will provide a URL: `https://your-app.vercel.app`

**✅ Frontend URL:** `https://your-app.vercel.app`

### 2.4 Update Backend CORS

**Important:** After getting Vercel URL, update backend:

1. Go to Railway → Backend Service → **Variables**
2. Update `FRONTEND_URL` to your Vercel URL:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
3. Redeploy backend (Railway auto-redeploys on variable change)

---

## ✅ Step 3: Final Verification

### 3.1 Test Backend
```bash
curl https://your-backend.railway.app/api/health
```

### 3.2 Test Frontend
1. Open: `https://your-app.vercel.app`
2. Check browser console (F12) - no errors
3. Test booking form
4. Test contact form

### 3.3 Test API Connection
1. Open browser DevTools → Network tab
2. Submit booking form
3. Verify API call goes to: `https://your-backend.railway.app/api/bookings`
4. Check response is successful

---

## 📋 Production Checklist

### Backend
- [ ] Deployed on Railway
- [ ] PostgreSQL database connected
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] Health endpoint works
- [ ] CORS allows frontend domain
- [ ] HTTPS enabled (automatic on Railway)

### Frontend
- [ ] Deployed on Vercel
- [ ] `VITE_API_URL` environment variable set
- [ ] Build succeeds
- [ ] All pages load correctly
- [ ] API calls use production backend
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] No console errors

### End-to-End Testing
- [ ] Homepage loads
- [ ] Booking form opens
- [ ] Booking submission works
- [ ] Success message appears
- [ ] Contact form works
- [ ] Services section loads
- [ ] Testimonials section loads
- [ ] No CORS errors
- [ ] No network errors

---

## 🎉 Final Product URL

Once everything is verified:

**🌐 Client-Facing URL:**
```
https://your-app.vercel.app
```

**🔒 Backend URL (Hidden from Client):**
```
https://your-backend.railway.app
```

---

## 📧 Client Communication Template

### Option 1: Professional Email

```
Subject: Planet Nakshatra - Live Demo Access

Dear [Client Name],

I'm pleased to share our live demo of Planet Nakshatra, a premium Vedic astrology platform.

🌐 Access Link:
https://your-app.vercel.app

The platform includes:
• Interactive booking system
• Service catalog
• Contact inquiry form
• Responsive design for all devices

Please feel free to explore and test the booking flow. All features are fully functional.

If you have any questions or feedback, I'm happy to discuss.

Best regards,
[Your Name]
```

### Option 2: Short & Direct

```
Hi [Client Name],

Here's the live demo of Planet Nakshatra:

🌐 https://your-app.vercel.app

Feel free to test the booking form and explore the features. Let me know your thoughts!

Best,
[Your Name]
```

---

## 🔧 Troubleshooting

### Issue: Frontend shows "Cannot connect to server"

**Fix:**
1. Verify `VITE_API_URL` is set in Vercel
2. Verify backend is running
3. Redeploy frontend after setting env var

### Issue: CORS Error

**Fix:**
1. Set `FRONTEND_URL` in Railway to exact Vercel URL
2. Redeploy backend
3. Check CORS allows your domain

### Issue: 404 on API calls

**Fix:**
1. Verify backend URL is correct
2. Check backend health endpoint works
3. Verify API routes are correct

---

## 🎯 Success Criteria

Your application is client-ready when:

✅ Frontend loads at production URL
✅ All features work (booking, contact, etc.)
✅ No console errors
✅ No CORS errors
✅ Success messages appear correctly
✅ Professional appearance
✅ Fast loading times
✅ Mobile responsive

---

## 📝 Quick Deployment Commands

### Backend (Railway)
```bash
# Push to GitHub (auto-deploys)
git add .
git commit -m "Production deployment"
git push origin main

# Or manual deploy via Railway dashboard
```

### Frontend (Vercel)
```bash
# Via CLI
vercel --prod

# Or via GitHub integration (auto-deploys)
git push origin main
```

---

**Once deployed, you'll have a single client-ready URL! 🚀**
