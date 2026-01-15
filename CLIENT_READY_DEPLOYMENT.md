# 🚀 Client-Ready Deployment - Single Product URL

## 🎯 Your Goal

**Generate a single shareable URL:** `https://your-app.vercel.app`

This is the ONLY URL you'll share with clients. Backend stays hidden.

---

## ⚠️ Important Note

**This project uses Vite + React (NOT Next.js).**

- ✅ Use: `VITE_API_URL` (for Vite)
- ❌ NOT: `NEXT_PUBLIC_API_URL` (that's for Next.js)

---

## 🚂 Step 1: Deploy Backend (Railway) - 10 minutes

### 1.1 Create Railway Project

1. Go to [railway.app](https://railway.app) → Sign up
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Choose **`planet-nakshatra-backend`** directory

### 1.2 Add PostgreSQL Database

1. In Railway project → **"+ New"** → **"Database"** → **"Add PostgreSQL"**
2. Wait for provisioning
3. Click PostgreSQL service → Copy **Connection URL**

### 1.3 Update Prisma Schema (One-Time)

```bash
cd planet-nakshatra-backend

# Backup SQLite schema
cp prisma/schema.prisma prisma/schema.sqlite.backup

# Use PostgreSQL schema
cp prisma/schema.postgresql.prisma prisma/schema.prisma

# Install PostgreSQL driver
npm install pg @types/pg
npm uninstall better-sqlite3 @prisma/adapter-libsql @libsql/client

# Commit changes
git add .
git commit -m "Switch to PostgreSQL for production"
git push
```

### 1.4 Set Environment Variables

In Railway → Backend Service → **Variables** tab:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:pass@host:port/db?sslmode=require
FRONTEND_URL=https://your-app.vercel.app
JWT_SECRET=<generate-below>
JWT_EXPIRES_IN=7d
API_RATE_LIMIT_TTL=60
API_RATE_LIMIT_MAX=100
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 1.5 Deploy & Get Backend URL

1. Railway auto-deploys on git push
2. Wait for deployment to complete
3. Check **"Settings"** → **"Domains"** → Copy **Public URL**
4. **Backend URL:** `https://your-backend.railway.app`

### 1.6 Run Database Migrations

In Railway → Backend Service → **Deployments** → Click **"..."** → **"Open Shell"**:

```bash
npx prisma migrate deploy
npx prisma generate
```

### 1.7 Verify Backend

```bash
curl https://your-backend.railway.app/api/health
```

**Expected:** `{"status":"ok","timestamp":"...","service":"planet-nakshatra-backend"}`

---

## ☁️ Step 2: Deploy Frontend (Vercel) - 5 minutes

### 2.1 Create Vercel Project

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `.` (root)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### 2.2 Set Environment Variable (CRITICAL)

**Before deploying, set this:**

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
2. Wait for build (2-3 minutes)
3. Vercel provides URL: `https://your-app.vercel.app`

**✅ Frontend URL:** `https://your-app.vercel.app`

### 2.4 Update Backend CORS

**After getting Vercel URL:**

1. Go to Railway → Backend Service → **Variables**
2. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
3. Railway auto-redeploys

---

## ✅ Step 3: Final Testing - 5 minutes

### 3.1 Test Backend
```bash
curl https://your-backend.railway.app/api/health
```

### 3.2 Test Frontend
1. Open: `https://your-app.vercel.app`
2. Check browser console (F12) - **no errors**
3. Test booking form:
   - Click "Begin Your Journey"
   - Fill form
   - Submit
   - Should see success message ✅

### 3.3 Test API Connection
1. Open DevTools → **Network** tab
2. Submit booking form
3. Verify API call: `POST https://your-backend.railway.app/api/bookings`
4. Response: **200 OK** ✅

---

## 🎉 Your Client-Ready URL

Once all tests pass:

**🌐 Share This URL With Clients:**
```
https://your-app.vercel.app
```

**🔒 Backend URL (Keep Hidden):**
```
https://your-backend.railway.app
```

---

## 📧 Client Communication Template

### Professional Email

```
Subject: Planet Nakshatra - Live Demo Access

Dear [Client Name],

I'm pleased to share our live demo of Planet Nakshatra, a premium 
Vedic astrology platform.

🌐 Access Link:
https://your-app.vercel.app

The platform includes:
• Interactive booking system
• Service catalog
• Contact inquiry form
• Responsive design for all devices

Please feel free to explore and test the booking flow. All features 
are fully functional and ready for your review.

If you have any questions or feedback, I'm happy to discuss.

Best regards,
[Your Name]
```

### Short & Direct

```
Hi [Client Name],

Here's the live demo of Planet Nakshatra:

🌐 https://your-app.vercel.app

Feel free to test the booking form and explore the features. 
Let me know your thoughts!

Best,
[Your Name]
```

---

## ✅ Final Checklist

### Code Status
- [x] All API calls use `apiUrl()` helper
- [x] No hardcoded localhost URLs
- [x] Error messages are user-friendly
- [x] Backend CORS configured
- [x] Security headers enabled

### Backend Deployment
- [ ] Deployed on Railway
- [ ] PostgreSQL connected
- [ ] Environment variables set
- [ ] Migrations run
- [ ] Health endpoint works
- [ ] Backend URL: `https://your-backend.railway.app`

### Frontend Deployment
- [ ] Deployed on Vercel
- [ ] `VITE_API_URL` set correctly
- [ ] Build succeeds
- [ ] Frontend URL: `https://your-app.vercel.app`

### End-to-End Testing
- [ ] Homepage loads
- [ ] Booking form works
- [ ] Contact form works
- [ ] No console errors
- [ ] No CORS errors
- [ ] Success messages appear
- [ ] Mobile responsive

---

## 🐛 Quick Troubleshooting

### "Cannot connect to server"
- Verify `VITE_API_URL` in Vercel
- Redeploy frontend

### CORS Error
- Set `FRONTEND_URL` in Railway to exact Vercel URL
- Redeploy backend

### 404 on API
- Verify backend URL is correct
- Check backend health endpoint

---

## 🎯 Success!

Once all items are checked, you have:

**✅ Single Client-Ready URL:** `https://your-app.vercel.app`

**Share this URL with confidence!** 🚀

---

## 📋 Quick Reference

### Backend URL (Hidden)
```
https://your-backend.railway.app
```

### Frontend URL (Share with Client)
```
https://your-app.vercel.app
```

### Environment Variables

**Vercel:**
```
VITE_API_URL=https://your-backend.railway.app
```

**Railway:**
```
FRONTEND_URL=https://your-app.vercel.app
DATABASE_URL=postgresql://...
NODE_ENV=production
```

---

**Total Deployment Time: ~20 minutes**

**Result: Single shareable client URL** ✨
