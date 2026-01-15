# ✅ Booking Form Production Checklist

## 🎯 Goal

Ensure booking form works correctly in production (Vercel deployment) with backend (Railway/AWS).

---

## ⚠️ Important Note

**This project uses Vite + React, NOT Next.js.**

- ✅ Environment Variable: `VITE_API_URL`
- ❌ NOT: `NEXT_PUBLIC_API_URL` (that's for Next.js)

---

## ✅ Code Status (Already Fixed)

- [x] All API calls use `apiUrl()` helper from `src/lib/api.ts`
- [x] Error messages updated (no hardcoded localhost URLs)
- [x] Backend CORS configured correctly
- [x] API configuration uses environment variables

---

## 🔧 Environment Variables Setup

### Frontend (Vercel Dashboard)

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Add environment variable:
   ```
   Name: VITE_API_URL
   Value: https://your-backend.railway.app
   Environment: Production (select all environments you use)
   ```
3. **⚠️ CRITICAL:** Click **"Redeploy"** after adding environment variable!

### Backend (Railway/AWS Dashboard)

1. Go to **Railway/AWS Dashboard** → Your Backend Service → **Variables**
2. Ensure these variables are set:
   ```
   NODE_ENV=production
   PORT=3000
   DATABASE_URL=postgresql://... (your PostgreSQL connection string)
   FRONTEND_URL=https://your-app.vercel.app (your Vercel deployment URL)
   JWT_SECRET=<32-character-hex-string>
   API_RATE_LIMIT_TTL=60
   API_RATE_LIMIT_MAX=100
   ```

---

## 🔒 Backend CORS Configuration

### Current Status: ✅ Correctly Configured

**File:** `planet-nakshatra-backend/src/main.ts`

The CORS configuration:
- ✅ Uses `FRONTEND_URL` environment variable in production
- ✅ Allows only your Vercel domain (not wildcard)
- ✅ Supports all necessary HTTP methods
- ✅ Includes proper headers

**To Verify CORS:**
1. Set `FRONTEND_URL` in backend environment variables
2. Redeploy backend
3. Test from Vercel deployment (not localhost)

---

## ✅ Pre-Deployment Checklist

### Frontend (Vite)
- [x] All API calls use `apiUrl()` helper
- [x] No hardcoded localhost URLs in code
- [x] Error messages are production-ready
- [ ] `VITE_API_URL` set in Vercel dashboard
- [ ] Frontend redeployed after adding env var
- [ ] Build succeeds: `npm run build`

### Backend (NestJS)
- [x] CORS configured correctly
- [x] Environment variables use `FRONTEND_URL`
- [ ] `FRONTEND_URL` set to Vercel domain
- [ ] Backend deployed and running
- [ ] Health endpoint works: `https://your-backend.railway.app/api/health`
- [ ] Database migrations run successfully

---

## 🧪 Testing Checklist

### Local Development Testing
- [ ] Backend runs: `cd planet-nakshatra-backend && npm run dev`
- [ ] Frontend runs: `npm run dev`
- [ ] Backend health check: `http://localhost:3000/api/health` returns 200
- [ ] Booking form opens and submits successfully
- [ ] Success message appears after booking
- [ ] No console errors in browser

### Production Testing
- [ ] Frontend loads: `https://your-app.vercel.app`
- [ ] Backend health check: `https://your-backend.railway.app/api/health` returns 200
- [ ] Booking form opens correctly
- [ ] Form submits successfully
- [ ] Success message appears
- [ ] No CORS errors in browser console
- [ ] No network errors in browser console
- [ ] Booking data saved in database

---

## 🐛 Common Issues & Fixes

### Issue 1: "Cannot connect to server" Error

**Cause:** `VITE_API_URL` not set in Vercel  
**Fix:**
1. Add `VITE_API_URL` in Vercel dashboard
2. Redeploy frontend
3. Verify environment variable is set

### Issue 2: CORS Error

**Cause:** Backend `FRONTEND_URL` doesn't match Vercel domain  
**Fix:**
1. Set `FRONTEND_URL` in backend to exact Vercel URL
2. Redeploy backend
3. Check CORS configuration allows your domain

### Issue 3: 404 Error on Booking Endpoint

**Cause:** Backend not deployed or wrong URL  
**Fix:**
1. Verify backend is running
2. Check backend URL is correct
3. Test health endpoint first: `https://your-backend.railway.app/api/health`

### Issue 4: Environment Variable Not Working

**Cause:** Forgot to redeploy after adding env var  
**Fix:**
1. Always redeploy after adding environment variables
2. For Vite, env vars are baked into build at build time
3. Must rebuild/redeploy for changes to take effect

---

## 📋 Final Deployment Steps

### 1. Backend Deployment (Railway)

```bash
# 1. Set environment variables in Railway dashboard
FRONTEND_URL=https://your-app.vercel.app
DATABASE_URL=postgresql://...
NODE_ENV=production
JWT_SECRET=<generate-with-command-below>
PORT=3000

# 2. Deploy (automatic on git push, or manual deploy)

# 3. Run migrations
railway run npx prisma migrate deploy

# 4. Test health endpoint
curl https://your-backend.railway.app/api/health
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Frontend Deployment (Vercel)

```bash
# 1. Set environment variable in Vercel dashboard
VITE_API_URL=https://your-backend.railway.app

# 2. Deploy (automatic on git push, or manual deploy via CLI)
vercel --prod

# 3. Verify deployment
# Check: https://your-app.vercel.app
```

---

## ✅ Success Criteria

Your booking form is working correctly when:

- ✅ Frontend loads at production URL
- ✅ Booking form opens without errors
- ✅ Form submission succeeds (no network errors)
- ✅ Success message appears after booking
- ✅ No CORS errors in browser console
- ✅ No "Failed to fetch" errors
- ✅ Booking data is saved in database
- ✅ Error messages are user-friendly (not technical)

---

## 🔍 Verification Commands

### Test Backend Health
```bash
curl https://your-backend.railway.app/api/health
```

Expected: `{"status":"ok","timestamp":"...","service":"planet-nakshatra-backend"}`

### Test Booking Endpoint
```bash
curl -X POST https://your-backend.railway.app/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "clientName": "Test User",
    "clientEmail": "test@example.com",
    "serviceType": "career",
    "scheduledDate": "2024-01-15",
    "timeSlot": "10:00 AM – 11:00 AM"
  }'
```

Expected: `{"id":"...","bookingReference":"...","status":"CONFIRMED",...}`

### Test Frontend (Browser)

1. Open: `https://your-app.vercel.app`
2. Open browser console (F12)
3. Check for errors
4. Test booking form
5. Verify API calls use correct URL (check Network tab)

---

## 📝 Summary

### What Was Fixed
- ✅ Error message updated (no hardcoded localhost)
- ✅ All API calls already use environment variables
- ✅ Backend CORS correctly configured

### What You Need to Do
1. Set `VITE_API_URL` in Vercel dashboard
2. Set `FRONTEND_URL` in Railway/AWS dashboard
3. Redeploy both frontend and backend
4. Test booking form in production

---

## 🎉 Ready for Production!

Follow this checklist step by step, and your booking form will work correctly in production! 🚀
