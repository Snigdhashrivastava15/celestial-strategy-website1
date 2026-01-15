# 🚀 How to Run the Application

## Quick Start Guide

Run both backend and frontend to test the complete application.

---

## 📋 Prerequisites

- Node.js 18+ installed
- npm installed
- Git repository cloned

---

## 🔧 Step 1: Start Backend (Terminal 1)

### Navigate to Backend Directory
```bash
cd planet-nakshatra-backend
```

### Install Dependencies (if not already installed)
```bash
npm install
```

### Start Backend Server
```bash
npm run dev
```

**Expected Output:**
```
[Nest] LOG [NestFactory] Starting Nest application...
[Nest] LOG [InstanceLoader] ...
[Nest] LOG [RouterExplorer] Mapped {/api/health, GET} route
...
🚀 Application is running on: http://0.0.0.0:3000
📊 Health check: http://0.0.0.0:3000/api/health
```

**Backend will run on:** `http://localhost:3000`

---

## 🎨 Step 2: Start Frontend (Terminal 2)

### Navigate to Project Root
```bash
# If you're in planet-nakshatra-backend, go back to root
cd ..

# Or if starting fresh:
cd celestial-strategy-website-e4d10988-main
```

### Install Dependencies (if not already installed)
```bash
npm install
```

### Start Frontend Server
```bash
npm run dev
```

**Expected Output:**
```
  VITE v7.x.x  ready in XXX ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: use --host to expose
```

**Frontend will run on:** `http://localhost:8080`

---

## ✅ Step 3: Verify Everything Works

### 1. Test Backend Health
Open in browser or use curl:
```
http://localhost:3000/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-08T...",
  "service": "planet-nakshatra-backend"
}
```

### 2. Test Frontend
Open in browser:
```
http://localhost:8080
```

**What to Check:**
- ✅ Homepage loads correctly
- ✅ No errors in browser console (F12)
- ✅ Booking modal opens when clicking "Begin Your Journey"
- ✅ Contact form works
- ✅ Services section loads
- ✅ Testimonials section loads

### 3. Test Booking Form
1. Click "Begin Your Journey" button
2. Fill in the booking form:
   - Name: Test User
   - Email: test@example.com
   - Service Type: Select one
   - Date: Select a future date
   - Time Slot: Select a time
3. Click "Confirm Booking"
4. Should see success message ✅

---

## 🐛 Troubleshooting

### Issue 1: Port 3000 Already in Use

**Error:** `EADDRINUSE: address already in use 0.0.0.0:3000`

**Fix:**
```powershell
# Find and kill process using port 3000
Get-NetTCPConnection -LocalPort 3000 | Select-Object OwningProcess
Stop-Process -Id <PID> -Force

# Or kill all Node processes (be careful!)
Get-Process node | Stop-Process -Force
```

### Issue 2: Port 8080 Already in Use

**Fix:**
- Vite will automatically try the next available port (8081, 8082, etc.)
- Check the terminal output for the actual port number
- Or change port in `vite.config.ts`:
  ```typescript
  server: {
    port: 3001, // Change to any available port
  }
  ```

### Issue 3: Backend Not Starting

**Check:**
1. Are dependencies installed? Run `npm install` in backend directory
2. Is database file present? Check `planet-nakshatra-backend/dev.db` exists
3. Check error messages in terminal for specific issues

### Issue 4: Frontend Can't Connect to Backend

**Check:**
1. Is backend running? Check `http://localhost:3000/api/health`
2. Check browser console for CORS errors
3. Verify frontend is using correct API URL

### Issue 5: "Cannot connect to server" Error

**Fix:**
1. Ensure backend is running on port 3000
2. Check backend health endpoint works
3. Check browser console for specific error messages
4. Verify no firewall blocking localhost connections

---

## 📝 Quick Reference Commands

### Backend
```bash
# Start development server
cd planet-nakshatra-backend
npm run dev

# Build for production
npm run build

# Run production build
npm run start:prod
```

### Frontend
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🎯 Complete Setup (First Time)

If this is your first time running the application:

### 1. Install Backend Dependencies
```bash
cd planet-nakshatra-backend
npm install
```

### 2. Set Up Database (if needed)
```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations (if needed)
npm run prisma:migrate
```

### 3. Start Backend
```bash
npm run dev
```

### 4. Install Frontend Dependencies
```bash
cd ..
npm install
```

### 5. Start Frontend
```bash
npm run dev
```

---

## ✅ Success Indicators

### Backend is Running When You See:
```
🚀 Application is running on: http://0.0.0.0:3000
📊 Health check: http://0.0.0.0:3000/api/health
🌍 Environment: development
🔗 Frontend URL: http://localhost:8080
```

### Frontend is Running When You See:
```
  VITE v7.x.x  ready in XXX ms
  ➜  Local:   http://localhost:8080/
```

### Everything Works When:
- ✅ Health endpoint returns 200 OK
- ✅ Frontend loads without errors
- ✅ Booking form submits successfully
- ✅ No CORS errors in browser console
- ✅ Success messages appear correctly

---

## 🎉 You're All Set!

Once both servers are running:
- **Backend:** http://localhost:3000
- **Frontend:** http://localhost:8080

Open http://localhost:8080 in your browser and test the booking form!

---

## 📞 Quick Help

**Backend won't start?**
- Check port 3000 is free
- Ensure dependencies are installed
- Check terminal for error messages

**Frontend won't start?**
- Check port 8080 is free (or check terminal for actual port)
- Ensure dependencies are installed
- Check terminal for error messages

**Booking form not working?**
- Ensure backend is running
- Check browser console (F12) for errors
- Verify API calls in Network tab
- Test backend health endpoint first
