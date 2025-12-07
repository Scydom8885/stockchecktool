# 🚀 Deployment Guide - Stock Check Tool

Complete manual deployment guide for updating your PWA.

---

## 📋 Quick Deployment Checklist

- [ ] Make your code changes
- [ ] Increment service worker version
- [ ] Git commit and push
- [ ] Deploy to Vercel
- [ ] Verify deployment (optional alias update)

---

## 🔧 Step-by-Step Deployment

### Step 1: Make Your Code Changes
Edit whatever files you need (components, styles, features, etc.)

### Step 2: Update Service Worker Version ⚠️ IMPORTANT
Open `client/public/sw.js` and increment the version number:

```javascript
// Find this line:
const CACHE_VERSION = '5.2'  // UPDATE THIS ON EACH DEPLOYMENT!

// Change to (increment the number):
const CACHE_VERSION = '5.3'  // UPDATE THIS ON EACH DEPLOYMENT!
```

**Why?** This forces users to download the new version instead of using old cached files.

### Step 3: Git Commit & Push

```bash
# Stage all changed files
git add .

# Create commit with descriptive message
git commit -m "Describe what you changed here"

# Push to GitHub
git push
```

### Step 4: Deploy to Vercel

```bash
# Navigate to client folder (if not already there)
cd client

# Deploy to production with API URL
vercel --prod --yes --build-env VITE_API_URL=https://stockcheck-api.onrender.com/api
```

**Wait for deployment to complete** (~20-30 seconds)

You'll see output like:
```
Production: https://client-xxxxx-scydom-chins-projects.vercel.app
```

### Step 5: Update Vercel Alias (Usually Automatic)

Vercel usually auto-updates the alias, but if you want to manually update:

```bash
# Copy the deployment URL from Step 4 output
# Then run:
vercel alias set client-xxxxx-scydom-chins-projects.vercel.app client-scydom-chins-projects.vercel.app
```

**Most of the time you can skip this step** - Vercel handles it automatically!

---

## 🎯 Complete Example

Let's say you changed a button color to blue:

```bash
# 1. Already made changes to Button.jsx

# 2. Open client/public/sw.js and change:
#    const CACHE_VERSION = '5.2'
#    to
#    const CACHE_VERSION = '5.3'

# 3. Commit and push
git add .
git commit -m "Change submit button color to blue"
git push

# 4. Deploy to Vercel
cd client
vercel --prod --yes --build-env VITE_API_URL=https://stockcheck-api.onrender.com/api

# 5. (Optional) Manually update alias if needed
vercel alias set client-NEW-URL.vercel.app client-scydom-chins-projects.vercel.app
```

---

## 🔗 Understanding Vercel Aliases

### What is an Alias?

Every deployment creates a unique URL:
- `client-abc123-scydom-chins-projects.vercel.app` (1st deploy)
- `client-def456-scydom-chins-projects.vercel.app` (2nd deploy)
- `client-ghi789-scydom-chins-projects.vercel.app` (3rd deploy)

An **alias** is a permanent URL that never changes:
- `client-scydom-chins-projects.vercel.app` ← **Your stable URL**

### Why Use Aliases?

**Benefits:**
- ✅ Same URL forever - never changes
- ✅ Render's `CLIENT_URL` stays the same
- ✅ Users don't need new URL every time
- ✅ Alias automatically points to latest deployment

**Without Aliases:**
- ❌ New URL every deployment
- ❌ Must update Render's CORS settings every time
- ❌ Users confused by changing URLs

---

## 📱 What Users Will See

After you deploy:
1. Within **30 seconds**, users will see a **yellow update notification**
2. They click the notification (or refresh page)
3. New version loads with your changes
4. Done! ✨

---

## ⚠️ Important Notes

### Always Remember:
1. **Increment service worker version** before deploying
2. **Push to GitHub first** before deploying to Vercel
3. **Include API URL** in Vercel deploy command
4. **Test the deployment** after it completes

### Version Numbering:
- Small fixes: `5.2` → `5.3` (increment decimal)
- Big features: `5.9` → `6.0` (increment major)
- Just be consistent!

---

## 🔄 When to Deploy Backend (Render)

**You only need to update Render if:**
- ❌ You changed files in `server/` folder
- ❌ You modified API routes
- ❌ You changed database logic

**You DON'T need to update Render if:**
- ✅ You only changed frontend (client) code
- ✅ You updated UI/styles/components
- ✅ You modified client-side logic only

**Most deployments only need Vercel update!**

---

## 🆘 Troubleshooting

### Users Not Seeing Update Notification?
- Check service worker version was incremented
- Wait 30 seconds (update checker runs every 30s)
- Ask users to hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### Deployment Failed?
- Check if you're in the `client` folder
- Verify `vercel.json` exists in client folder
- Check internet connection
- Try running `vercel login` first

### Alias Not Working?
- Run `vercel alias ls` to see current aliases
- Manually set alias using command in Step 5
- Contact Vercel support if issue persists

---

## 📞 Quick Commands Reference

```bash
# Deploy to Vercel
cd client
vercel --prod --yes --build-env VITE_API_URL=https://stockcheck-api.onrender.com/api

# List deployments
vercel ls

# List aliases
vercel alias ls

# Set alias manually
vercel alias set SOURCE_URL TARGET_ALIAS

# Check deployment logs
vercel inspect DEPLOYMENT_URL --logs

# Git commands
git add .
git commit -m "Your message"
git push
```

---

## 🎓 Learning Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Service Worker Guide](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)

---

**Last Updated:** December 2025
**Current Version:** 5.2
**Production URL:** https://client-scydom-chins-projects.vercel.app
