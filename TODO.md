# Stock Check Tool - Project TODO List

## 📋 Project Overview
A PWA (Progressive Web App) for Myanmar staff to check ingredient stock levels and send WhatsApp notifications for restocking needs.

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (v19.2.0) - UI Framework
- **Tailwind CSS** (v3.4.1) - Styling
- **Vite** (v7.2.4) - Build tool & dev server
- **FontAwesome** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - API framework
- **SQLite** - Database (for user authentication & daily tracking)

### Hosting
- **Vercel** - Frontend hosting (free)
- **Railway/Render** - Backend + Database hosting (free tier)

### PWA
- **Service Worker** - Offline functionality
- **Web App Manifest** - Install to home screen

### Tools
- **Git** - Version control
- **npm** - Package manager

---

## 📁 Project Folder Structure (Component-Based)

```
stockchecktool/
│
├── READ.md                              # Requirements document
├── TODO.md                              # This file
│
├── client/                              # Frontend (React PWA)
│   ├── public/
│   │   ├── images/                      # Ingredient photos
│   │   │   ├── tofu.jpg
│   │   │   ├── cabbage.jpg
│   │   │   ├── shiitake.jpg
│   │   │   ├── egg.jpg
│   │   │   ├── pickles.jpg
│   │   │   ├── sambal.jpg
│   │   │   ├── sauce.jpg
│   │   │   ├── rice.jpg
│   │   │   ├── container-3.jpg
│   │   │   ├── container-round.jpg
│   │   │   ├── plastic-bag.jpg
│   │   │   ├── spoon.jpg
│   │   │   └── sambal-container.jpg
│   │   ├── icons/                       # PWA icons
│   │   │   ├── icon-192.png
│   │   │   └── icon-512.png
│   │   ├── manifest.json                # PWA manifest
│   │   └── sw.js                        # Service worker
│   │
│   ├── src/
│   │   ├── components/                  # React components
│   │   │   ├── Header.jsx               # App header with language toggle & logout
│   │   │   ├── Tabs.jsx                 # Main/Packaging/Others tabs
│   │   │   ├── ItemGrid.jsx             # Grid of ingredient items
│   │   │   ├── SelectedItems.jsx        # Bottom section with selected items
│   │   │   └── LoginForm.jsx            # Login page
│   │   │
│   │   ├── data/                        # Data files
│   │   │   ├── items.js                 # All ingredients with translations
│   │   │   └── users.js                 # User credentials (temp, will move to backend)
│   │   │
│   │   ├── utils/                       # Helper functions
│   │   │   ├── whatsapp.js              # WhatsApp link generator
│   │   │   ├── storage.js               # localStorage utilities
│   │   │   ├── dateUtils.js             # Date/time utilities (Malaysia timezone)
│   │   │   └── api.js                   # Backend API calls
│   │   │
│   │   ├── context/                     # React Context (state management)
│   │   │   └── AppContext.jsx           # Global state (user, language, selected items)
│   │   │
│   │   ├── App.jsx                      # Main app component
│   │   ├── App.css                      # Custom CSS
│   │   ├── main.jsx                     # Entry point
│   │   └── index.css                    # Tailwind imports
│   │
│   ├── index.html                       # HTML template
│   ├── package.json                     # Dependencies
│   ├── vite.config.js                   # Vite config
│   ├── tailwind.config.js               # Tailwind config
│   └── postcss.config.js                # PostCSS config
│
└── server/                              # Backend (Node.js + Express)
    ├── src/
    │   ├── routes/
    │   │   ├── auth.js                  # Login/logout routes
    │   │   └── submissions.js           # Track daily submissions
    │   │
    │   ├── middleware/
    │   │   └── auth.js                  # Authentication middleware
    │   │
    │   ├── database/
    │   │   ├── db.js                    # SQLite connection
    │   │   └── schema.sql               # Database schema
    │   │
    │   ├── controllers/
    │   │   ├── authController.js        # Auth logic
    │   │   └── submissionController.js  # Submission logic
    │   │
    │   ├── scripts/
    │   │   └── manageUsers.js           # CLI tool to add/remove users
    │   │
    │   └── server.js                    # Main server file
    │
    ├── .env                             # Environment variables
    ├── package.json                     # Backend dependencies
    └── README.md                        # Backend documentation
```

---

## 👥 User Management Approach

Since this is a small team with infrequent user changes, we're using a **simple CLI-based approach** instead of building an admin UI:

### How to Manage Users:

**Add a new user:**
```bash
cd server
npm run add-user <username> <password> <language>
# Example: npm run add-user worker4 pass123 mm
```

**Remove a user:**
```bash
npm run remove-user <username>
# Example: npm run remove-user worker1
```

**List all users:**
```bash
npm run list-users
```

### Database Schema:
```sql
users (
  id INTEGER PRIMARY KEY,
  username TEXT UNIQUE,
  password TEXT (hashed),
  language TEXT ('mm', 'en', or 'zh')
)
```

**No role column needed** - all users have the same permissions and app experience.

---

## ✅ TODO List

### Phase 1: Frontend - Component Structure ✨
- [x] Create folder structure (`components/`, `data/`, `utils/`, `context/`)
- [x] Split `App.jsx` into separate components
  - [x] Create `Header.jsx` component
  - [x] Create `Tabs.jsx` component
  - [x] Create `ItemGrid.jsx` component
  - [x] Create `SelectedItems.jsx` component
  - [x] Create `LoginForm.jsx` component
- [x] Set up React Context for global state management
  - [x] Create `AppContext.jsx` with user, language, selectedItems state
  - [x] Wrap `App.jsx` with Context Provider

### Phase 2: Data & Translations 🌍
- [x] Create `data/items.js` with all ingredient data
  - [x] Add Main category items (8 items)
  - [x] Add Packaging category items (5 items)
  - [x] Add Others category items (4 items)
  - [x] Include Myanmar, English, Chinese translations for each item
- [x] Create `data/users.js` (temporary user credentials)
  - [x] Add 3 worker accounts with usernames & passwords
  - [x] Add 1 account for you (owner)
  - [x] Set default language per user (workers: Myanmar, owner: English)

### Phase 3: Core Functionality - Item Selection 🎯
- [x] Implement click handler for ingredient items
  - [x] Move item from top grid to bottom selected list
  - [x] Remove item from top grid when selected
  - [x] Update selected items count
- [x] Implement delete functionality in bottom section
  - [x] Add delete button click handler
  - [x] Move item back to top grid
  - [x] Update selected items count
- [x] Implement notes textarea functionality
  - [x] Store note value in state
  - [x] Include notes in WhatsApp message

### Phase 4: Submit & WhatsApp Integration 📱
- [x] Create `utils/whatsapp.js` helper
  
  - [x] Function to format message in Chinese
  - [x] Include username of submitter
  - [x] Include selected items list
  - [x] Include additional notes
- [x] Implement submit button functionality
  - [x] Generate WhatsApp link with formatted message when clicked
  - [x] Open WhatsApp in new tab/window
  - [x] Lock submit button after submission
  - [x] Keep selected items visible (read-only)
  - [x] Allow adding new items after submission

### Phase 5: Daily Reset & Storage 🕐
- [x] Create `utils/dateUtils.js` helper
  - [x] Function to get current Malaysia time
  - [x] Function to check if it's a new day
- [x] Create `utils/storage.js` helper
  - [x] Save submission state to localStorage
  - [x] Load submission state on app start
  - [x] Save last submission date
  - [x] Clear state at midnight Malaysia time
- [x] Implement daily reset logic
  - [x] Check date on app load
  - [x] Reset selected items if new day
  - [x] Unlock submit button if new day or new items
  - [x] Keep track of submission status

### Phase 6: Login & Authentication (Frontend) 🔐
- [x] Create `LoginForm.jsx` component
  - [x] Username input field
  - [x] Password input field
  - [x] Login button
  - [x] Error message display
- [x] Implement login logic (temporary, local validation)
  - [x] Validate credentials against `data/users.js`
  - [x] Set user in global state
  - [x] Auto-set language based on user's language preference
  - [x] Redirect to main app after login
- [x] Implement logout functionality
  - [x] Clear user from state
  - [x] Clear localStorage
  - [x] Redirect to login page
- [x] Add protected route logic
  - [x] Show login page if not authenticated
  - [x] Show main app if authenticated

### Phase 7: PWA Configuration 📲
- [x] Create placeholder PWA icons
  - [x] Generate 192x192 icon
  - [x] Generate 512x512 icon
- [ ] Update `manifest.json`
  - [x] Set correct app name & description
  - [x] Link to icon files
  - [x] Set theme colors
  - [x] Set display mode to standalone
- [x] Create basic service worker (`public/sw.js`)
  - [x] Cache static assets
  - [x] Enable offline functionality
  - [x] Register service worker in `main.jsx`
- [] Test PWA installation on mobile
  - [] Test "Add to Home Screen" on Android
  - [] Test "Add to Home Screen" on iOS

### Phase 8: Backend Setup 🖥️
- [x] Create `server/` folder structure
- [x] Initialize Node.js project
  - [x] Run `npm init -y`
  - [x] Install dependencies (express, cors, bcrypt, dotenv)
- [x] Create `server.js` main file
  - [x] Set up Express app
  - [x] Configure CORS
  - [x] Set up middleware (body-parser, etc.)
  - [x] Define port
- [x] Create database
  - [x] Define `users` table (id, username, password, language)
  - [x] Define `submissions` table (id, user_id, submission_date, items, notes)
  - [x] Create `database/db.js` connection file
  - [x] Initialize database on server start
- [x] Create CLI script for user management
  - [x] Create `scripts/manageUsers.js`
  - [x] Add command to add new user: `npm run add-user <username> <password> <language>`
  - [x] Add command to remove user: `npm run remove-user <username>`
  - [x] Add command to list all users: `npm run list-users`
  - [x] Update `package.json` with npm scripts

### Phase 9: Backend API - Authentication 🔑
- [x] Create authentication routes (`routes/auth.js`)
  - [x] POST `/api/auth/login` - Login endpoint
  - [x] POST `/api/auth/logout` - Logout endpoint
  - [x] GET `/api/auth/verify` - Verify token
- [x] Create auth controller (`controllers/authController.js`)
  - [x] Implement login logic (validate credentials)
  - [x] Hash password comparison
  - [x] Return user data (without password)
- [x] Create auth middleware (`middleware/auth.js`)
  - [x] Verify user session/token
  - [x] Protect routes

### Phase 10: Backend API - Submissions 📊
- [x] Create submission routes (`routes/submissions.js`)
  - [x] POST `/api/submissions` - Record new submission
  - [x] GET `/api/submissions/today/:userId` - Check if user submitted today
- [x] Create submission controller (`controllers/submissionController.js`)
  - [x] Save submission to database
  - [x] Check submission status
  - [x] Handle daily reset logic

### Phase 11: Frontend-Backend Integration 🔗
- [x] Create `utils/api.js` for API calls
  - [x] `login(username, password)` - Call login API
  - [x] `logout()` - Call logout API
  - [x] `checkSubmissionStatus(userId)` - Check if submitted today
  - [x] `saveSubmission(userId, items, notes)` - Save submission
- [x] Update `LoginForm.jsx` to use API
  - [x] Replace local validation with API call
  - [x] Handle loading state
  - [x] Handle error responses
- [x] Update submit functionality to use API
  - [x] Save submission to database before WhatsApp
  - [x] Lock UI based on database status
  - [x] Handle API errors

### Phase 12: Testing & Debugging 🧪
- [x] Test login flow
  - [x] Test with all 4 users
  - [x] Verify language auto-switch
  - [x] Test logout
- [x] Test item selection flow
  - [x] Select items across all tabs
  - [x] Delete items
  - [x] Add notes
- [x] Test WhatsApp integration
  - [x] Verify message format
  - [x] Test Chinese translation
  - [x] Test on mobile device
- [x] Test daily reset
  - [x] Manually change system date
  - [x] Verify reset at midnight
  - [x] Test submission lock/unlock
- [ ] Test PWA installation
  - [ ] Install on Android
  - [ ] Install on iOS
  - [ ] Test offline functionality
- [x] Test CLI user management
  - [x] Test add user command
  - [x] Test remove user command
  - [x] Test list users command
- [x] Test database operations
  - [x] View submission history
  - [x] Test data persistence

### Phase 13: Deployment 🚀
- [x] Deploy Frontend to Vercel
  - [x] Create Vercel account
  - [x] Connect GitHub repository
  - [x] Configure build settings
  - [x] Set environment variables
  - [x] Deploy and get URL
- [x] Deploy Backend to Railway/Render
  - [x] Create Render account
  - [x] Create new web service
  - [x] Connect GitHub repository
  - [x] Configure environment variables (NODE_ENV, CLIENT_URL)
  - [x] Deploy and get API URL (https://stockcheck-api.onrender.com)
- [x] Update frontend API endpoint
  - [x] Point to production backend URL
  - [x] Test production deployment
- [x] Get custom domain (optional)
  - [x] Free subdomain from Vercel (https://client-sooty-gamma-16.vercel.app)
  - [x] Configure DNS if needed
- [x] Additional Features Added:
  - [x] Team submission sync (prevents duplicate orders)
  - [x] Real-time polling (10-second auto-sync)
  - [x] Manual refresh button for instant sync
  - [x] Update notification banner for PWA
  - [x] PWA install button with fallback instructions
  - [x] Network-first service worker strategy
  - [x] Auto-deploy from GitHub to Render
- [ ] **PENDING: Firebase Migration (Planned for Thursday)**
  - [ ] Replace Render backend with Firebase Firestore
  - [ ] Add Firebase Authentication
  - [ ] Implement real-time WebSocket sync
  - [ ] Test instant updates across devices

### Phase 14: User Images & Final Touches 🎨
- [ ] Create `public/images/` folder
- [ ] Get ingredient photos from user
  - [ ] 8 photos for Main category
  - [ ] 5 photos for Packaging category
  - [ ] No images for Others (pills only)
- [ ] Optimize images
  - [ ] Resize to 300x300 pixels
  - [ ] Compress to <100KB each
  - [ ] Convert to WebP if needed
- [ ] Update `data/items.js` with image paths
- [ ] Test image loading on all devices
- [x] Create app icons (192x192, 512x512)
  - [x] Use company logo or stock icon
  - [x] Update manifest.json

### Phase 15: Documentation 📝
- [ ] Create user guide (Myanmar language)
  - [ ] How to install PWA
  - [ ] How to login
  - [ ] How to select items
  - [ ] How to submit
- [ ] Create owner guide (English)
  - [ ] How to add/remove users via CLI
  - [ ] How to update ingredient list in code
  - [ ] How to view submissions in database
  - [ ] How to redeploy after code changes
- [ ] Update README.md
  - [ ] Project description
  - [ ] Setup instructions
  - [ ] Deployment guide
  - [ ] CLI commands reference

---

## 🎯 Current Status
- [x] Frontend UI/UX Design Complete
- [x] React + Tailwind Setup Complete
- [x] Color scheme & styling applied
- [x] Language toggle working
- [x] Tab navigation working
- [ ] Functionality implementation - **NEXT STEP**

---

## 📌 Notes
- User wants **minimal backend** for security (not frontend-only)
- WhatsApp group option chosen (send to one group, message in Chinese)
- Images will be added later by user
- Myanmar translations to be filled in by Myanmar speaker
- No overengineering - keep it simple and functional
- **No admin role or user management UI** - all users have same permissions
- User management done via CLI scripts (add/remove users in code/database)
- Owner can edit code directly for ingredient changes
- **No confirmation modal** - submit button directly opens WhatsApp (one-click flow)
