# ⚡ Production Deployment - Quick Reference

## 🎯 Goal

Deploy app so it runs **24/7 independently** without your terminal or local machine.

---

## 🔴 Why App Stops When Terminal Closes

**Simple Explanation:**
- Process is attached to terminal
- Terminal closes → Process dies
- App stops

**Solution:** Deploy to cloud platforms (they manage processes automatically)

---

## ✅ Solution: Deploy to Cloud

### Backend → Railway
- Runs 24/7 automatically
- No terminal needed
- Process managed by Railway

### Frontend → Vercel
- Runs 24/7 automatically
- No terminal needed
- Process managed by Vercel

---

## 🚀 Quick Deployment Steps

### 1. Deploy Backend (Railway) - 10 min

```bash
# 1. Create Railway account → New Project → Deploy from GitHub
# 2. Add PostgreSQL database
# 3. Update Prisma schema (SQLite → PostgreSQL)
# 4. Set environment variables in Railway
# 5. Deploy (auto-deploys on git push)
# 6. Run migrations: railway run npx prisma migrate deploy
```

**Result:** `https://your-backend.railway.app`

### 2. Deploy Frontend (Vercel) - 5 min

```bash
# 1. Create Vercel account → Add New Project → Import GitHub
# 2. Configure: Framework = Vite, Build = npm run build, Output = dist
# 3. Set environment variable: VITE_API_URL=https://your-backend.railway.app
# 4. Deploy
```

**Result:** `https://your-app.vercel.app`

### 3. Update Backend CORS

```bash
# In Railway → Variables → Set:
FRONTEND_URL=https://your-app.vercel.app
```

---

## 📋 Environment Variables

### Vercel (Frontend)
```
VITE_API_URL=https://your-backend.railway.app
```

### Railway (Backend)
```
FRONTEND_URL=https://your-app.vercel.app
DATABASE_URL=postgresql://...
NODE_ENV=production
JWT_SECRET=<32-char-hex>
```

---

## ✅ Verification

### Test Independence

1. **Close all terminals**
2. **Stop local dev servers**
3. **Visit:** `https://your-app.vercel.app`
4. **Test booking form**
5. **Should work perfectly** ✅

### Test Backend
```bash
curl https://your-backend.railway.app/api/health
```

### Test Frontend
- Open: `https://your-app.vercel.app`
- Check console (F12) - no errors
- Test booking form

---

## 🎉 Result

### Before
- ❌ Requires terminal open
- ❌ Requires local machine running
- ❌ Stops when terminal closes

### After
- ✅ Runs 24/7 independently
- ✅ No terminal needed
- ✅ Works after closing terminal
- ✅ Accessible from anywhere
- ✅ Auto-deploys on git push

---

## 📚 Full Guides

- **`PRODUCTION_24_7_DEPLOYMENT.md`** - Complete step-by-step guide
- **`WHY_APP_STOPS_WHEN_TERMINAL_CLOSES.md`** - Technical explanation

---

## 🎯 Final Checklist

- [ ] Backend deployed on Railway
- [ ] Frontend deployed on Vercel
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] CORS configured
- [ ] Test: Close terminal → App still works ✅

---

**Your app now runs 24/7 independently!** 🚀
