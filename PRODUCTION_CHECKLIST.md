# ✅ Production Deployment Checklist
## Planet Nakshatra - Final Pre-Launch Verification

Use this checklist to ensure everything is ready for production deployment.

---

## 🔐 Environment Variables

### Backend (Railway/AWS)
- [ ] `NODE_ENV=production`
- [ ] `PORT=3000`
- [ ] `DATABASE_URL` - PostgreSQL connection string with SSL
- [ ] `FRONTEND_URL` - Your Vercel deployment URL (e.g., `https://your-app.vercel.app`)
- [ ] `JWT_SECRET` - Strong secret (32+ characters, generated randomly)
- [ ] `JWT_EXPIRES_IN=7d`
- [ ] `API_RATE_LIMIT_TTL=60`
- [ ] `API_RATE_LIMIT_MAX=100`
- [ ] `LOG_LEVEL=info`

### Frontend (Vercel)
- [ ] `VITE_API_URL` - Your backend URL (e.g., `https://your-backend.railway.app`)

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🗄️ Database Setup

- [ ] PostgreSQL instance created (Railway/AWS RDS/Supabase)
- [ ] Database connection string obtained
- [ ] SSL enabled in connection string (`?sslmode=require`)
- [ ] Prisma schema updated to PostgreSQL (not SQLite)
- [ ] Database migrations created: `npx prisma migrate dev --name production_init`
- [ ] Migrations deployed to production: `npx prisma migrate deploy`
- [ ] Prisma Client generated: `npx prisma generate`
- [ ] Test connection works: `npx prisma studio` (verify tables exist)

---

## 🔧 Backend Configuration

### Code Updates
- [ ] `src/main.ts` - Production logging, CORS, Helmet security
- [ ] `src/app.module.ts` - Rate limiting enabled
- [ ] `src/config/configuration.ts` - Environment config loaded
- [ ] All `console.log` removed or replaced with proper logging
- [ ] Error handling improved (no stack traces in production responses)

### Build & Deploy
- [ ] `package.json` has `start:prod` script: `"start:prod": "node dist/main.js"`
- [ ] `package.json` has `postinstall` script: `"postinstall": "prisma generate"`
- [ ] Build succeeds: `npm run build`
- [ ] Production build tested locally: `npm run start:prod`
- [ ] Health endpoint works: `curl http://localhost:3000/api/health`

### Docker (if using)
- [ ] `Dockerfile` created and tested
- [ ] Docker image builds: `docker build -t planet-nakshatra-backend .`
- [ ] Docker image runs: `docker run -p 3000:3000 planet-nakshatra-backend`

---

## 🎨 Frontend Configuration

### Code Updates
- [ ] `src/lib/api.ts` - API configuration using `VITE_API_URL`
- [ ] All hardcoded API URLs replaced with `apiUrl()` helper
- [ ] `vite.config.ts` - Production build optimizations
- [ ] `vercel.json` - Deployment configuration present
- [ ] No console.log statements in production build

### Build & Test
- [ ] Environment variable accessible: Check `import.meta.env.VITE_API_URL`
- [ ] Build succeeds: `npm run build`
- [ ] Preview build works: `npm run preview`
- [ ] All API calls use environment variable
- [ ] No hardcoded `localhost` URLs in production build

### Vercel Setup
- [ ] Repository connected to Vercel
- [ ] Framework preset: Vite
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Environment variables set in Vercel dashboard
- [ ] Custom domain configured (if applicable)

---

## 🌐 Network & Security

### CORS
- [ ] Backend CORS allows frontend domain
- [ ] CORS credentials enabled if needed
- [ ] No wildcard origins (`*`) in production

### HTTPS/SSL
- [ ] Vercel automatically provides HTTPS (verified)
- [ ] Backend behind HTTPS (Railway/AWS provides automatically)
- [ ] No mixed content warnings
- [ ] SSL certificate valid (check browser padlock)

### Security Headers
- [ ] Helmet configured in backend
- [ ] Security headers in `vercel.json`
- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: DENY
- [ ] X-XSS-Protection enabled

### Rate Limiting
- [ ] ThrottlerModule configured
- [ ] Rate limits set appropriately (100 req/min default)
- [ ] Error messages don't expose internal structure

---

## 🧪 Testing & Validation

### Backend API Tests
- [ ] Health check: `GET /api/health` returns 200
- [ ] CORS preflight: `OPTIONS /api/bookings` works
- [ ] Create booking: `POST /api/bookings` works
- [ ] Contact inquiry: `POST /api/contact/inquiry` works
- [ ] Rate limiting works (test with multiple rapid requests)
- [ ] Error responses don't leak stack traces

### Frontend Tests
- [ ] Homepage loads without errors
- [ ] Booking modal opens and submits successfully
- [ ] Contact form submits successfully
- [ ] Services section loads data
- [ ] Testimonials load data
- [ ] No console errors in browser
- [ ] No CORS errors in network tab
- [ ] All API calls use production backend URL

### Database Tests
- [ ] Connection successful
- [ ] Migrations applied
- [ ] Can create records (test booking)
- [ ] Can read records
- [ ] Indexes created (check with `\d+` in psql)

---

## 📊 Monitoring & Logging

### Logging
- [ ] Backend logs structured (not just console.log)
- [ ] Log levels configured (info, warn, error)
- [ ] Sensitive data not logged (passwords, tokens)
- [ ] Error logging captures context

### Monitoring Tools (Optional but Recommended)
- [ ] Error tracking (Sentry) configured
- [ ] Analytics (Vercel Analytics/Google Analytics)
- [ ] Uptime monitoring (UptimeRobot/Pingdom)
- [ ] Database monitoring (Railway metrics/AWS CloudWatch)

---

## 🚀 Deployment Steps

### Backend Deployment (Railway)
- [ ] Code pushed to GitHub
- [ ] Railway project created
- [ ] Repository connected
- [ ] Environment variables set
- [ ] Build command: `npm install && npm run build && npx prisma generate`
- [ ] Start command: `npm run start:prod`
- [ ] Database service added and connected
- [ ] Migrations run: `railway run npx prisma migrate deploy`
- [ ] Health check endpoint configured
- [ ] Deployment successful
- [ ] Backend URL obtained: `https://your-backend.railway.app`

### Frontend Deployment (Vercel)
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Repository connected
- [ ] Framework preset: Vite
- [ ] Build settings configured
- [ ] `VITE_API_URL` environment variable set to backend URL
- [ ] First deployment successful
- [ ] Frontend URL obtained: `https://your-app.vercel.app`
- [ ] Custom domain configured (if applicable)

### Post-Deployment
- [ ] Update backend `FRONTEND_URL` with Vercel URL
- [ ] Redeploy backend to apply CORS changes
- [ ] Test full flow end-to-end
- [ ] Verify HTTPS on both frontend and backend

---

## 🔍 Final Verification

### Smoke Tests
- [ ] Visit frontend URL - loads correctly
- [ ] Check browser console - no errors
- [ ] Check network tab - all API calls successful
- [ ] Test booking flow - complete end-to-end
- [ ] Test contact form - submits successfully
- [ ] Verify data appears in database

### Performance Checks
- [ ] Page load time < 3 seconds
- [ ] Lighthouse score > 90 (Performance, Accessibility, Best Practices, SEO)
- [ ] Mobile responsive - test on phone
- [ ] Images optimized
- [ ] Bundle size reasonable (< 500KB for main bundle)

### Security Checks
- [ ] No secrets in frontend code/build
- [ ] API endpoints require authentication where needed
- [ ] Input validation on all forms
- [ ] SQL injection protection (Prisma handles this)
- [ ] XSS protection (React escapes by default)

---

## 🐛 Common Issues & Quick Fixes

### "Cannot GET /"
**Fix**: Ensure `vercel.json` has SPA rewrite rules

### "Failed to fetch" / CORS Error
**Fix**: 
1. Check `FRONTEND_URL` in backend env vars
2. Verify CORS origin includes your Vercel domain
3. Check backend logs for CORS errors

### Database Connection Failed
**Fix**:
1. Verify `DATABASE_URL` format
2. Add `?sslmode=require` if missing
3. Check database firewall/security groups

### Environment Variables Not Working
**Fix**:
1. Frontend: Use `VITE_` prefix (already done)
2. Redeploy after adding env vars
3. Check variable names match exactly

### Build Fails
**Fix**:
1. Check build logs for specific error
2. Ensure all dependencies in `package.json`
3. Try building locally first: `npm run build`

---

## 📝 Post-Launch Tasks

### Immediate (First 24 Hours)
- [ ] Monitor error logs closely
- [ ] Check analytics for traffic
- [ ] Verify all forms submit correctly
- [ ] Test on multiple devices/browsers
- [ ] Check database for new records

### First Week
- [ ] Review error rates
- [ ] Optimize slow endpoints if any
- [ ] Check database performance
- [ ] Review user feedback
- [ ] Set up alerts for critical errors

### Ongoing
- [ ] Regular security updates
- [ ] Database backups verified
- [ ] Monitor API usage/costs
- [ ] Update dependencies monthly
- [ ] Review and optimize performance

---

## 🎯 Success Criteria

Your deployment is successful when:

✅ Frontend loads at production URL
✅ All API endpoints respond correctly
✅ Forms submit and data saves to database
✅ No console errors in browser
✅ No CORS errors
✅ HTTPS working on both frontend and backend
✅ Health checks passing
✅ Performance metrics acceptable
✅ Mobile responsive

---

## 🆘 Emergency Rollback Plan

If something goes wrong:

1. **Backend Issues:**
   ```bash
   # Railway: Revert to previous deployment
   # Or rollback database migration
   railway run npx prisma migrate resolve --rolled-back <migration_name>
   ```

2. **Frontend Issues:**
   - Vercel: Use "Revert" button in deployment history
   - Or redeploy previous commit

3. **Database Issues:**
   - Restore from backup
   - Or rollback last migration

---

## 📞 Support Resources

- **Vercel Support**: https://vercel.com/support
- **Railway Support**: https://railway.app/help
- **Prisma Docs**: https://www.prisma.io/docs
- **NestJS Docs**: https://docs.nestjs.com

---

## ✅ Ready to Launch?

If all items above are checked, you're ready for production! 

**Final command before launch:**
```bash
# Verify everything one last time
npm run build  # Frontend
cd planet-nakshatra-backend && npm run build  # Backend
```

**Then deploy! 🚀**
