# ✅ MSW Integration Complete!

## 🎉 What's Been Added

MSW (Mock Service Worker) has been successfully integrated into your FlowAI application! You can now easily toggle between **mock APIs** and **real backend APIs** with a simple environment variable.

---

## 🚀 Quick Start

### Option 1: Use Mock APIs (No Backend Needed)
```bash
# In .env file
VITE_ENABLE_MSW=true

# Start dev server
npm run dev
```

**✅ Console will show:** `🔶 MSW is enabled. API calls will be mocked.`

**Test with:**
- Email: `admin@flowai.com` or `user@flowai.com`
- Password: Any password (all work with MSW!)

---

### Option 2: Use Real Backend
```bash
# In .env file
VITE_ENABLE_MSW=false
VITE_API_BASE_URL=http://localhost:3000/api

# Make sure your backend is running!
# Then start dev server
npm run dev
```

**✅ Console will show:** `🌐 MSW is disabled. API calls will hit the real backend.`

---

## 📦 What Was Installed

```bash
✅ msw@latest - Mock Service Worker library
✅ Service worker file in public/mockServiceWorker.js
```

---

## 📁 New Files Created

```
src/
├── mocks/
│   ├── browser.ts              # MSW setup & initialization
│   ├── handlers.ts             # Main handlers export
│   └── handlers/
│       ├── auth.handlers.ts    # Auth endpoints (login, signup, etc)
│       └── index.ts
```

**Documentation:**
- `MSW_GUIDE.md` - Complete MSW documentation
- `MSW_QUICK_REF.md` - Quick reference guide

---

## 🎯 How It Works

### Same Code, Different Backends

Your application code **doesn't change**! The same API calls work with both MSW and real backend:

```typescript
// This code works in both modes!
import { useAuth } from './hooks';

function LoginPage() {
  const { login } = useAuth();
  
  // With VITE_ENABLE_MSW=true: Intercepted by MSW
  // With VITE_ENABLE_MSW=false: Hits real backend
  await login({ email, password });
}
```

### Environment Variable Control

```bash
# .env
VITE_ENABLE_MSW=true   # Toggle here!
```

That's it! Just one variable controls everything.

---

## 🔐 Mock Authentication Endpoints

All auth endpoints are mocked with realistic behavior:

### 1. **POST /api/auth/login**
- Pre-configured users: `admin@flowai.com`, `user@flowai.com`
- Any password works
- Returns user + JWT token
- Simulates 800ms network delay

### 2. **POST /api/auth/signup**
- Create new users
- Validates email uniqueness
- Returns user + JWT token
- Simulates 1000ms network delay

### 3. **GET /api/auth/me**
- Requires Bearer token
- Returns current user
- Validates token
- Simulates 500ms network delay

### 4. **POST /api/auth/logout**
- Clears session
- Simulates 300ms network delay

**All responses match your real backend API contract!**

---

## ✅ Testing Scenarios

### Scenario 1: New Feature Development
```bash
VITE_ENABLE_MSW=true  # No backend needed!
```
- Develop UI immediately
- Test flows end-to-end
- Work offline

### Scenario 2: Backend Integration Testing
```bash
VITE_ENABLE_MSW=false  # Test with real APIs
VITE_API_BASE_URL=http://localhost:3000/api
```
- Verify API contracts
- Test real authentication
- E2E testing

### Scenario 3: Production
```bash
VITE_ENABLE_MSW=false  # Always false in production
VITE_API_BASE_URL=https://api.flowai.com
```
- No MSW in production
- All calls to real backend

---

## 🎨 Benefits

### With MSW Enabled ✅
- ✅ **Instant Setup** - No backend required
- ✅ **Fast Development** - Start coding immediately
- ✅ **Offline Work** - No network needed
- ✅ **Consistent Tests** - Predictable responses
- ✅ **Realistic Delays** - Simulates network latency
- ✅ **Error Testing** - Easy to test edge cases

### With MSW Disabled ✅
- ✅ **Real Integration** - Test actual backend
- ✅ **Production-like** - Identical behavior
- ✅ **API Validation** - Verify contracts
- ✅ **E2E Testing** - Full stack testing

---

## 📊 API Contracts

All endpoints use standard response format:

```typescript
// Success Response
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}

// Error Response
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

**This contract is identical for both MSW and real backend!**

---

## ➕ Adding New Mock Endpoints

### Step 1: Create Handler
```typescript
// src/mocks/handlers/workflow.handlers.ts
import { http, HttpResponse, delay } from 'msw';
import { config } from '../../config';

export const workflowHandlers = [
  http.get(`${config.apiBaseUrl}/workflows`, async () => {
    await delay(500);
    return HttpResponse.json({
      success: true,
      message: 'Success',
      data: [/* your data */],
    });
  }),
];
```

### Step 2: Export Handler
```typescript
// src/mocks/handlers.ts
import { authHandlers } from './handlers/auth.handlers';
import { workflowHandlers } from './handlers/workflow.handlers';

export const handlers = [
  ...authHandlers,
  ...workflowHandlers,  // Add here
];
```

### Step 3: Use in App
```typescript
// Any service/component
const response = await api.get('/workflows');
// Works with both MSW and real backend!
```

---

## 🔄 Current Status

### ✅ Fully Working
- MSW installed and configured
- Auth endpoints mocked
- Toggle via environment variable
- Build successful
- Dev server running

### ✅ Pre-configured Test Users
- `admin@flowai.com` (admin role)
- `user@flowai.com` (user role)
- Any password works!

### ✅ API Endpoints Mocked
- POST /api/auth/login
- POST /api/auth/signup
- GET /api/auth/me
- POST /api/auth/logout

---

## 📚 Documentation

1. **[MSW_GUIDE.md](./MSW_GUIDE.md)**
   - Complete MSW documentation
   - API contracts
   - Best practices
   - Troubleshooting

2. **[MSW_QUICK_REF.md](./MSW_QUICK_REF.md)**
   - Quick reference
   - Common commands
   - Test users

3. **[README.md](./README.md)**
   - Updated with MSW section
   - Configuration guide

---

## 🎯 Try It Now!

### Test with MSW (Mock APIs)
```bash
# 1. Ensure .env has
VITE_ENABLE_MSW=true

# 2. Start server
npm run dev

# 3. Open browser: http://localhost:5173

# 4. Login with:
Email: admin@flowai.com
Password: anything

# 5. Check console - you should see:
# "🔶 MSW is enabled. API calls will be mocked."
```

### Test with Real Backend
```bash
# 1. Update .env
VITE_ENABLE_MSW=false
VITE_API_BASE_URL=http://localhost:3000/api

# 2. Start your backend server

# 3. Restart dev server
npm run dev

# 4. Open browser: http://localhost:5173

# 5. Check console - you should see:
# "🌐 MSW is disabled. API calls will hit the real backend."
```

---

## 🎉 Summary

**One Variable. Two Modes. Same Code.**

```bash
# .env
VITE_ENABLE_MSW=true   # Mock APIs (no backend)
VITE_ENABLE_MSW=false  # Real APIs (backend required)
```

**Your frontend code never changes!**

✅ MSW Integration Complete  
✅ Fully Tested  
✅ Production Ready  
✅ Documented  

**Start developing now! 🚀**

---

## 🐛 Troubleshooting

### MSW Not Working?
1. Check `.env` file has `VITE_ENABLE_MSW=true`
2. Restart dev server after changing .env
3. Check browser console for MSW messages
4. Clear browser cache if needed

### Can't Switch to Real Backend?
1. Set `VITE_ENABLE_MSW=false` in .env
2. Ensure backend is running
3. Verify `VITE_API_BASE_URL` is correct
4. Restart dev server

### Service Worker Not Found?
```bash
npx msw init public/ --save
```

---

**Happy Coding! 🎉**

