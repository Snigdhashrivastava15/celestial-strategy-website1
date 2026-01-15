# 🌐 How to Get Your Independent Production URL

## 🎯 Goal

Get a **shareable production URL** that works independently (not localhost).

**Example:** `https://your-app.vercel.app`

---

## ⚠️ Current Status

**Right now, your app runs on:**
- ❌ `http://localhost:3000` (backend - only works on your machine)
- ❌ `http://localhost:8080` (frontend - only works on your machine)

**These URLs:**
- Only work when your terminal is running
- Only work on your local machine
- Cannot be shared with others
- Stop when you close terminal

---

## ✅ Solution: Deploy to Production

Deploy to cloud platforms to get **independent production URLs**:

- **Frontend:** Vercel → `https://your-app.vercel.app`
- **Backend:** Railway → `https://your-backend.railway.app`

**These URLs:**
- ✅ Work 24/7 independently
- ✅ Can be shared with anyone
- ✅ Work from any device
- ✅ Don't require your terminal

---

## 🚀 Step-by-Step: Get Your Production URL

### Step 1: Deploy Backend to Railway (10 minutes)

#### 1.1 Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. Sign up with GitHub (free)

#### 1.2 Create Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your repository
4. Select **`planet-nakshatra-backend`** directory

#### 1.3 Add PostgreSQL Database
1. In Railway project → Click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Wait 30 seconds for provisioning
4. Click PostgreSQL service → Copy **`DATABASE_URL`**

#### 1.4 Update Prisma Schema (One-Time)
```bash
cd planet-nakshatra-backend

# Switch to PostgreSQL
cp prisma/schema.postgresql.prisma prisma/schema.prisma

# Install PostgreSQL driver
npm install pg @types/pg
npm uninstall better-sqlite3 @prisma/adapter-libsql @libsql/client

# Commit and push
git add .
git commit -m "Switch to PostgreSQL for production"
git push origin main
```

#### 1.5 Set Environment Variables
In Railway → Backend Service → **"Variables"** tab:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://... (from step 1.3)
FRONTEND_URL=https://your-app.vercel.app (set after Vercel)
JWT_SECRET=<generate-below>
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### 1.6 Deploy & Get Backend URL
1. Railway auto-deploys on git push (or click **"Deploy"**)
2. Wait 2-3 minutes for build
3. Go to **"Settings"** → **"Domains"**
4. Copy **Public URL**: `https://your-backend.railway.app`

**✅ Backend URL:** `https://your-backend.railway.app`

#### 1.7 Run Migrations
In Railway → Backend Service → **"Deployments"** → **"..."** → **"Open Shell"**:
```bash
npx prisma migrate deploy
npx prisma generate
```

---

### Step 2: Deploy Frontend to Vercel (5 minutes)

#### 2.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Sign up with GitHub (free)

#### 2.2 Create Project
1. Click **"Add New Project"**
2. Import your GitHub repository
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `.` (root)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

#### 2.3 Set Environment Variable (CRITICAL)
**Before deploying:**

1. In Vercel project → **"Settings"** → **"Environment Variables"**
2. Click **"Add New"**
3. Add:
   ```
   Name: VITE_API_URL
   Value: https://your-backend.railway.app (from Step 1.6)
   Environment: Production, Preview, Development
   ```
4. Click **"Save"**

#### 2.4 Deploy & Get Frontend URL
1. Click **"Deploy"** button
2. Wait 2-3 minutes for build
3. Vercel provides URL: `https://your-app.vercel.app`

**✅ Frontend URL (Share with Clients):** `https://your-app.vercel.app`

#### 2.5 Update Backend CORS
**After getting Vercel URL:**

1. Go to Railway → Backend Service → **"Variables"**
2. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
3. Railway auto-redeploys (1-2 minutes)

---

## 🎉 Your Production URLs

### Share This URL (Frontend)
```
🌐 https://your-app.vercel.app
```

**This is the URL you share with clients!**

### Keep This Hidden (Backend)
```
🔒 https://your-backend.railway.app
```

**Don't share this - it's for API calls only.**

---

## ✅ Verify Your Production URL Works

### Test Independence

1. **Close all terminals**
2. **Stop local dev servers**
3. **Open browser** (on any device)
4. **Visit:** `https://your-app.vercel.app`
5. **Test booking form**
6. **Should work perfectly** ✅

### Test Backend
```bash
curl https://your-backend.railway.app/api/health
```

**Expected:** `{"status":"ok",...}`

### Test Frontend
- Open: `https://your-app.vercel.app`
- Check console (F12) - no errors
- Test booking form - should work

---

## 📋 Quick Checklist

### To Get Production URL:

- [ ] Create Railway account
- [ ] Deploy backend to Railway
- [ ] Get backend URL: `https://your-backend.railway.app`
- [ ] Create Vercel account
- [ ] Deploy frontend to Vercel
- [ ] Set `VITE_API_URL` environment variable
- [ ] Get frontend URL: `https://your-app.vercel.app`
- [ ] Update backend `FRONTEND_URL`
- [ ] Test: Close terminal → App still works ✅

---

## 🎯 Summary

### Current (Localhost)
- ❌ `http://localhost:3000` (not shareable)
- ❌ `http://localhost:8080` (not shareable)
- ❌ Requires your terminal

### After Deployment (Production)
- ✅ `https://your-app.vercel.app` (shareable!)
- ✅ `https://your-backend.railway.app` (hidden)
- ✅ Works independently 24/7

---

## 💡 Quick Start

**Fastest way to get your production URL:**

1. **Deploy backend to Railway** (10 min)
   - Get: `https://your-backend.railway.app`

2. **Deploy frontend to Vercel** (5 min)
   - Get: `https://your-app.vercel.app`

3. **Share frontend URL with clients!** 🎉

**Total time: ~15 minutes**

---

## 📚 Detailed Guides

For complete step-by-step instructions, see:
- **`PRODUCTION_24_7_DEPLOYMENT.md`** - Full deployment guide
- **`CLIENT_READY_DEPLOYMENT.md`** - Client-ready setup

---

**Follow these steps to get your independent production URL!** 🚀
