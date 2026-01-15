# 🔧 Environment Variables Setup Guide

## Important Note

**This project uses Vite + React, not Next.js.**

- ✅ Use: `VITE_API_URL`
- ❌ Don't use: `NEXT_PUBLIC_API_URL`

---

## 📋 Environment Variables

### Frontend (Vite)

**Variable Name:** `VITE_API_URL`

**Development (.env or .env.local):**
```env
VITE_API_URL=http://localhost:3000
```

**Production (Vercel Dashboard):**
```
VITE_API_URL=https://your-backend.railway.app
```

**Note:** In Vite, environment variables must be prefixed with `VITE_` to be accessible in the browser.

---

### Backend (NestJS)

**Environment Variables:**
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require
FRONTEND_URL=https://your-app.vercel.app
JWT_SECRET=<32-char-hex-string>
API_RATE_LIMIT_TTL=60
API_RATE_LIMIT_MAX=100
LOG_LEVEL=info
```

---

## 🚀 Setup Instructions

### Local Development

1. **Create `.env` file in project root:**
   ```bash
   echo "VITE_API_URL=http://localhost:3000" > .env
   ```

2. **Backend `.env` (already exists in `planet-nakshatra-backend/.env`):**
   ```env
   DATABASE_URL=file:./dev.db
   NODE_ENV=development
   PORT=3000
   FRONTEND_URL=http://localhost:8080
   ```

### Production (Vercel)

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```
3. Select environment: **Production** (and Preview if needed)
4. **Important:** Redeploy after adding environment variables!

---

## 🔍 Verify Environment Variables

### Frontend (Browser Console)

```javascript
// Check if environment variable is set
console.log(import.meta.env.VITE_API_URL);
```

### Backend (Terminal)

```bash
# Check environment variables
cd planet-nakshatra-backend
node -e "require('dotenv').config(); console.log(process.env.DATABASE_URL)"
```

---

## ⚠️ Common Mistakes

1. **Wrong prefix:** Using `NEXT_PUBLIC_API_URL` instead of `VITE_API_URL`
   - ❌ Wrong: `NEXT_PUBLIC_API_URL`
   - ✅ Correct: `VITE_API_URL`

2. **Not redeploying:** Forgetting to redeploy after adding env vars
   - Always redeploy Vercel after adding environment variables

3. **Wrong file:** Using `.env.local` when should use `.env`
   - For Vite, both `.env` and `.env.local` work
   - `.env.local` is typically ignored by git (better for secrets)

4. **Missing VITE_ prefix:** In Vite, variables without `VITE_` prefix won't be accessible in browser
   - ❌ Wrong: `API_URL=...`
   - ✅ Correct: `VITE_API_URL=...`

---

## 📚 Reference

- **Vite Environment Variables:** https://vitejs.dev/guide/env-and-mode.html
- **Next.js Environment Variables:** https://nextjs.org/docs/basic-features/environment-variables (for reference if migrating)

---

## ✅ Checklist

- [ ] `.env` file created with `VITE_API_URL`
- [ ] Backend `.env` configured correctly
- [ ] Environment variables set in Vercel (production)
- [ ] Frontend redeployed after adding env vars
- [ ] Backend CORS allows frontend domain
- [ ] All API calls use `apiUrl()` helper
- [ ] Test booking form works
