# 🚀 Quick Start Guide

## How to Start the Application Locally

Follow these simple steps to run the application on your machine.

---

## 📋 Prerequisites

- Node.js 18+ installed
- npm installed
- Git repository cloned

---

## 🔧 Step 1: Start Backend (Terminal 1)

### Open Terminal 1 and run:

```bash
cd planet-nakshatra-backend
npm install
npm run dev
```

**Wait for this message:**
```
🚀 Application is running on: http://0.0.0.0:3000
📊 Health check: http://0.0.0.0:3000/api/health
```

✅ **Backend is running on:** `http://localhost:3000`

**Keep this terminal open!**

---

## 🎨 Step 2: Start Frontend (Terminal 2)

### Open a NEW Terminal and run:

```bash
# Make sure you're in the project root (not planet-nakshatra-backend)
cd celestial-strategy-website-e4d10988-main
npm install
npm run dev
```

**Wait for this message:**
```
  VITE v7.x.x  ready in XXX ms
  ➜  Local:   http://localhost:8080/
```

✅ **Frontend is running on:** `http://localhost:8080`

**Keep this terminal open!**

---

## ✅ Step 3: Open in Browser

Open your browser and go to:

```
http://localhost:8080
```

You should see the Planet Nakshatra homepage!

---

## 🧪 Test the Application

### 1. Test Backend Health
Open in browser:
```
http://localhost:3000/api/health
```

**Expected:** `{"status":"ok","timestamp":"...","service":"planet-nakshatra-backend"}`

### 2. Test Frontend
- Homepage loads correctly
- Click "Begin Your Journey" button
- Booking modal opens
- Fill in the form and submit
- Should see success message ✅

### 3. Check for Errors
- Open browser console (F12)
- Check for any red errors
- Should see no errors if everything is working

---

## 🛑 How to Stop

### Stop Backend
- Go to Terminal 1
- Press `Ctrl + C`

### Stop Frontend
- Go to Terminal 2
- Press `Ctrl + C`

---

## 🐛 Troubleshooting

### Port 3000 Already in Use

**Error:** `EADDRINUSE: address already in use 0.0.0.0:3000`

**Fix:**
```powershell
# Find and kill process using port 3000
Get-NetTCPConnection -LocalPort 3000 | Select-Object OwningProcess
Stop-Process -Id <PID> -Force
```

### Port 8080 Already in Use

Vite will automatically try the next port (8081, 8082, etc.)
- Check the terminal output for the actual port number
- Use that port in your browser

### Backend Not Starting

1. Check if dependencies are installed:
   ```bash
   cd planet-nakshatra-backend
   npm install
   ```

2. Check if database file exists:
   ```bash
   ls planet-nakshatra-backend/dev.db
   ```

3. Check terminal for specific error messages

### Frontend Can't Connect to Backend

1. Make sure backend is running (check Terminal 1)
2. Test backend health: `http://localhost:3000/api/health`
3. Check browser console (F12) for specific errors

---

## 📝 Quick Commands Reference

### Backend
```bash
cd planet-nakshatra-backend
npm install      # First time only
npm run dev     # Start development server
```

### Frontend
```bash
# Make sure you're in project root
npm install      # First time only
npm run dev      # Start development server
```

---

## ✅ Success Indicators

### Backend is Running When You See:
```
🚀 Application is running on: http://0.0.0.0:3000
📊 Health check: http://0.0.0.0:3000/api/health
🌍 Environment: development
```

### Frontend is Running When You See:
```
  VITE v7.x.x  ready in XXX ms
  ➜  Local:   http://localhost:8080/
```

### Everything Works When:
- ✅ Homepage loads at `http://localhost:8080`
- ✅ Backend health check works at `http://localhost:3000/api/health`
- ✅ Booking form opens and submits successfully
- ✅ No errors in browser console

---

## 🎉 You're All Set!

Once both terminals show the success messages above:

1. **Backend:** Running on `http://localhost:3000`
2. **Frontend:** Running on `http://localhost:8080`

**Open `http://localhost:8080` in your browser and start testing!** 🚀

---

## 💡 Tips

- **Keep both terminals open** while developing
- **Backend must run first** before frontend can connect
- **Check terminal output** for any error messages
- **Use browser DevTools (F12)** to debug frontend issues

---

**Need help?** Check the terminal output for specific error messages!
