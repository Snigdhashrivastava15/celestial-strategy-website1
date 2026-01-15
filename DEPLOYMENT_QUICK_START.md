# 🚀 Quick Start Deployment Guide

## Prerequisites
- GitHub account with repository
- Railway account (free tier available)
- Vercel account (free tier available)
- PostgreSQL database (Railway, AWS RDS, or Supabase)

---

## ⚡ Fast Track (5 Steps)

### 1. Set Up Database
```bash
# Get PostgreSQL connection string from Railway/AWS/Supabase
# Format: postgresql://user:password@host:port/db?sslmode=require
```

### 2. Deploy Backend (Railway)

1. Go to [railway.app](https://railway.app) → New Project → GitHub
2. Select your repo → Choose `planet-nakshatra-backend` directory
3. Add PostgreSQL service → Copy DATABASE_URL
4. Set environment variables:
   ```
   NODE_ENV=production
   PORT=3000
   DATABASE_URL=<your-postgres-url>
   FRONTEND_URL=<will-update-after-vercel>
   JWT_SECRET=<generate-with-command-below>
   ```
5. Deploy! Railway auto-detects NestJS

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**After deployment, run migrations:**
```bash
railway run npx prisma migrate deploy
```

### 3. Deploy Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com) → Add New Project
2. Import your GitHub repository
3. Configure:
   - Framework: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variable:
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```
5. Deploy!

### 4. Update Backend CORS

1. Go to Railway → Your Backend → Variables
2. Update `FRONTEND_URL` to your Vercel URL
3. Redeploy backend

### 5. Test Everything

```bash
# Test backend
curl https://your-backend.railway.app/api/health

# Test frontend
# Visit https://your-app.vercel.app
# Check browser console for errors
# Test booking form submission
```

---

## 🔧 Important: PostgreSQL Migration

Before deploying, update Prisma schema:

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

---

## 📋 Environment Variables Quick Reference

### Backend (Railway)
```
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://...
FRONTEND_URL=https://your-app.vercel.app
JWT_SECRET=<32-char-hex-string>
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.railway.app
```

---

## ✅ Verify Deployment

- [ ] Backend health check: `https://your-backend.railway.app/api/health`
- [ ] Frontend loads: `https://your-app.vercel.app`
- [ ] Booking form submits successfully
- [ ] Contact form submits successfully
- [ ] No CORS errors in browser console
- [ ] Database has new records

---

## 🆘 Common Fixes

**"Cannot GET /"**: Check `vercel.json` has SPA rewrite rules ✓ (already done)

**"Failed to fetch"**: 
1. Verify `VITE_API_URL` in Vercel
2. Check `FRONTEND_URL` in Railway matches Vercel URL
3. Redeploy both after changes

**Database connection failed**:
- Add `?sslmode=require` to DATABASE_URL
- Check database is accessible from Railway

---

For detailed instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
For complete checklist, see [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md)
