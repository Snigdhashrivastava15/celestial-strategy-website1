# 🚀 Production Deployment Guide
## Planet Nakshatra - Full-Stack Deployment

This guide covers deploying the Planet Nakshatra website to production with:
- **Frontend**: Vite + React → Vercel
- **Backend**: NestJS → Railway or AWS
- **Database**: PostgreSQL (migrated from SQLite)

---

## 📋 Pre-Deployment Checklist

### Before You Start
- [ ] All code is committed to Git
- [ ] Environment variables documented
- [ ] Database backup strategy planned
- [ ] Domain names ready (if using custom domains)
- [ ] SSL certificates configured (automatic with Vercel/Railway)

---

## 🔧 Step 1: Prepare Backend for Production

### 1.1 Update Prisma Schema for PostgreSQL

```bash
cd planet-nakshatra-backend

# Backup current SQLite schema
cp prisma/schema.prisma prisma/schema.sqlite.backup

# Use PostgreSQL schema
cp prisma/schema.postgresql.prisma prisma/schema.prisma
```

### 1.2 Install PostgreSQL Dependencies

```bash
cd planet-nakshatra-backend
npm install pg @types/pg
npm uninstall better-sqlite3 @prisma/adapter-libsql @libsql/client
```

### 1.3 Update package.json Scripts

Ensure these scripts exist in `planet-nakshatra-backend/package.json`:

```json
{
  "scripts": {
    "build": "nest build",
    "start:prod": "node dist/main.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate:deploy": "prisma migrate deploy",
    "postinstall": "prisma generate"
  }
}
```

### 1.4 Remove Console Logs

The production build already uses proper logging. Check for any remaining `console.log` statements:

```bash
# Find console.log statements (keep only in development)
grep -r "console.log" planet-nakshatra-backend/src --exclude-dir=node_modules
```

---

## 🗄️ Step 2: Set Up PostgreSQL Database

### Option A: Railway PostgreSQL

1. Go to [Railway.app](https://railway.app)
2. Create new project → Add PostgreSQL
3. Copy the `DATABASE_URL` from the PostgreSQL service
4. Format: `postgresql://user:password@host:port/database?sslmode=require`

### Option B: AWS RDS PostgreSQL

1. Create RDS PostgreSQL instance
2. Configure security groups (allow inbound on port 5432)
3. Get connection string from RDS console
4. Format: `postgresql://user:password@host:5432/database?sslmode=require`

### Option C: Supabase / Neon / Other Managed PostgreSQL

1. Create database instance
2. Copy connection string
3. Ensure SSL is enabled

---

## 🚂 Step 3: Deploy Backend to Railway

### 3.1 Connect Repository

1. Go to [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Select the `planet-nakshatra-backend` directory

### 3.2 Configure Environment Variables

In Railway dashboard, add these environment variables:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:password@host:port/db?sslmode=require
FRONTEND_URL=https://your-app.vercel.app
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRES_IN=7d
API_RATE_LIMIT_TTL=60
API_RATE_LIMIT_MAX=100
LOG_LEVEL=info
```

**⚠️ Important**: Generate a strong JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3.3 Run Database Migrations

After first deployment, run migrations:

**Option 1: Via Railway CLI**
```bash
railway run npx prisma migrate deploy
```

**Option 2: Via Railway Dashboard**
- Add a one-off command: `npx prisma migrate deploy`
- Or use Railway's database console

### 3.4 Verify Deployment

1. Check Railway logs for startup messages
2. Test health endpoint: `https://your-backend.railway.app/api/health`
3. Should return: `{"status":"ok","timestamp":"...","service":"planet-nakshatra-backend"}`

---

## ☁️ Step 4: Deploy Backend to AWS (Alternative)

### 4.1 Using AWS Elastic Beanstalk

1. Install EB CLI: `pip install awsebcli`
2. Initialize: `eb init -p "Node.js" planet-nakshatra-backend`
3. Create environment: `eb create production-env`
4. Set environment variables: `eb setenv NODE_ENV=production DATABASE_URL=...`
5. Deploy: `eb deploy`

### 4.2 Using AWS ECS/Fargate

1. Build Docker image: `docker build -t planet-nakshatra-backend .`
2. Push to ECR
3. Create ECS task definition
4. Deploy to Fargate cluster

### 4.3 Using AWS EC2

1. Launch EC2 instance (Ubuntu 22.04)
2. Install Node.js 20, PM2, Nginx
3. Clone repository
4. Set up environment variables
5. Run with PM2: `pm2 start dist/main.js --name api`

---

## 🎨 Step 5: Deploy Frontend to Vercel

### 5.1 Prepare Frontend

1. Create `.env.production` (or set in Vercel dashboard):
```env
VITE_API_URL=https://your-backend.railway.app
```

2. Update API calls to use environment variable:

Create `src/config/api.ts`:
```typescript
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

Update fetch calls:
```typescript
// Before
fetch('http://localhost:3000/api/bookings')

// After
fetch(`${API_BASE_URL}/api/bookings`)
```

### 5.2 Deploy to Vercel

**Option 1: Via Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**Option 2: Via GitHub Integration**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `.` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 5.3 Set Environment Variables in Vercel

In Vercel dashboard → Settings → Environment Variables:

```env
VITE_API_URL=https://your-backend.railway.app
```

**Important**: Redeploy after adding environment variables!

### 5.4 Configure Custom Domain (Optional)

1. In Vercel dashboard → Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions
4. SSL is automatic

---

## 🔒 Step 6: Security & Performance

### 6.1 Backend Security (Already Implemented)

✅ Helmet for security headers
✅ CORS configured for frontend domain
✅ Rate limiting enabled
✅ Input validation with class-validator
✅ Environment variables for secrets

### 6.2 Frontend Security

✅ Security headers in `vercel.json`
✅ No secrets in frontend code
✅ API URL from environment variables

### 6.3 Database Security

- [ ] Enable SSL for PostgreSQL connection
- [ ] Use connection pooling
- [ ] Regular backups configured
- [ ] Database user has minimal required permissions

### 6.4 Monitoring

**Recommended Tools:**
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Vercel Analytics**: Frontend analytics
- **Railway Metrics**: Backend monitoring

---

## ✅ Step 7: Post-Deployment Validation

### 7.1 Frontend Checks

```bash
# Test frontend loads
curl https://your-app.vercel.app

# Check API calls work
# Open browser console and verify no CORS errors
```

### 7.2 Backend Checks

```bash
# Health check
curl https://your-backend.railway.app/api/health

# Test booking endpoint
curl -X POST https://your-backend.railway.app/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"clientName":"Test","clientEmail":"test@example.com",...}'
```

### 7.3 Database Checks

```bash
# Connect to database
railway connect postgres

# Verify tables exist
\dt

# Check data
SELECT * FROM consultations LIMIT 5;
```

---

## 🐛 Common Deployment Issues & Fixes

### Issue 1: "Cannot GET /"

**Cause**: Frontend routing not configured  
**Fix**: Ensure `vercel.json` has rewrite rules for SPA routing

### Issue 2: "Failed to fetch" / CORS Error

**Cause**: Backend CORS not allowing frontend domain  
**Fix**: 
1. Check `FRONTEND_URL` in backend env vars
2. Verify CORS origin includes your Vercel domain
3. Check backend logs for CORS errors

### Issue 3: Database Connection Failed

**Cause**: Wrong DATABASE_URL or SSL not enabled  
**Fix**:
1. Verify DATABASE_URL format
2. Add `?sslmode=require` to connection string
3. Check database security groups/firewall

### Issue 4: Prisma Client Not Generated

**Cause**: Missing postinstall script  
**Fix**: Add to package.json:
```json
"postinstall": "prisma generate"
```

### Issue 5: Environment Variables Not Working

**Cause**: Variables not set or not redeployed  
**Fix**:
1. Verify variables in deployment dashboard
2. Redeploy after adding variables
3. Check variable names (VITE_ prefix for frontend)

### Issue 6: Build Fails

**Cause**: Missing dependencies or TypeScript errors  
**Fix**:
1. Run `npm install` locally first
2. Check build logs for specific errors
3. Ensure all dependencies are in package.json

---

## 📊 Production Checklist

### Pre-Launch
- [ ] All environment variables set
- [ ] Database migrations run successfully
- [ ] Health check endpoint working
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] Security headers configured
- [ ] SSL/HTTPS enabled
- [ ] Error logging configured
- [ ] Monitoring tools set up

### Post-Launch
- [ ] Frontend loads correctly
- [ ] All API endpoints working
- [ ] Database connection stable
- [ ] Forms submit successfully
- [ ] No console errors
- [ ] Performance acceptable (Lighthouse score > 90)
- [ ] Mobile responsive
- [ ] SEO meta tags present

### Ongoing
- [ ] Regular database backups
- [ ] Monitor error rates
- [ ] Review security logs
- [ ] Update dependencies regularly
- [ ] Monitor API usage and costs

---

## 🔄 Deployment Commands Reference

### Backend (Railway)
```bash
# Deploy
git push origin main  # Auto-deploys on Railway

# Run migrations
railway run npx prisma migrate deploy

# View logs
railway logs

# Connect to database
railway connect postgres
```

### Frontend (Vercel)
```bash
# Deploy
vercel --prod

# Preview deployment
vercel

# View logs
vercel logs
```

### Local Production Testing
```bash
# Backend
cd planet-nakshatra-backend
npm run build
npm run start:prod

# Frontend
npm run build
npm run preview
```

---

## 📞 Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **NestJS Deployment**: https://docs.nestjs.com/recipes/deployment
- **Prisma Deployment**: https://www.prisma.io/docs/guides/deployment

---

## 🎉 Success!

Once all checks pass, your website is live in production! Monitor the first few days closely and be ready to address any issues quickly.

**Remember**: Always test in a staging environment first before deploying to production!
