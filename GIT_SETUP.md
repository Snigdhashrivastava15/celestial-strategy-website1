# 🔧 Git Repository Setup Guide

## ✅ Git Repository Initialized

Your git repository has been set up and connected to GitHub.

---

## 📋 Current Status

- ✅ Git repository initialized
- ✅ Remote origin added: `https://github.com/Snigdhashrivastava/pythonproject4.git`

---

## 🚀 Next Steps for Deployment

### 1. Add Files to Git

```bash
# Add all files
git add .

# Commit changes
git commit -m "Initial commit - Planet Nakshatra website"
```

### 2. Push to GitHub

```bash
# Push to GitHub (first time)
git push -u origin main

# Or if your default branch is master:
git push -u origin master
```

### 3. Deploy to Production

Once code is on GitHub:

#### Deploy Backend (Railway)
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select your repository: `pythonproject4`
4. Choose directory: `planet-nakshatra-backend`
5. Railway will auto-deploy

#### Deploy Frontend (Vercel)
1. Go to [vercel.com](https://vercel.com)
2. Add New Project → Import GitHub repo
3. Select your repository: `pythonproject4`
4. Configure: Framework = Vite
5. Vercel will auto-deploy

---

## 📝 Git Commands Reference

### Check Status
```bash
git status
```

### Add Files
```bash
git add .
git add <specific-file>
```

### Commit Changes
```bash
git commit -m "Your commit message"
```

### Push to GitHub
```bash
git push origin main
```

### Pull from GitHub
```bash
git pull origin main
```

---

## ⚠️ Important Files to Exclude

Make sure you have a `.gitignore` file with:

```
node_modules/
dist/
.env
.env.local
*.log
.DS_Store
```

**Never commit:**
- `.env` files (contain secrets)
- `node_modules/` (too large)
- `dist/` (build output)

---

## ✅ Verification

### Check Git Status
```bash
git status
```

### Check Remote
```bash
git remote -v
```

Should show:
```
origin  https://github.com/Snigdhashrivastava/pythonproject4.git (fetch)
origin  https://github.com/Snigdhashrivastava/pythonproject4.git (push)
```

---

## 🎯 Quick Start

1. **Add files:**
   ```bash
   git add .
   ```

2. **Commit:**
   ```bash
   git commit -m "Initial commit"
   ```

3. **Push:**
   ```bash
   git push -u origin main
   ```

4. **Deploy:**
   - Railway: Connect GitHub repo
   - Vercel: Connect GitHub repo

---

**Your git repository is ready for deployment!** 🚀
