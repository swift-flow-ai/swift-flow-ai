# MSW (Mock Service Worker) Setup Guide

## Overview

The FlowAI application uses MSW to mock backend APIs during development. You can easily toggle between using **mock APIs** (via MSW) or **real backend APIs** using an environment variable.

---

## 🎯 Quick Start

### Use Mock APIs (MSW)
```bash
# In .env file
VITE_ENABLE_MSW=true

# Start dev server
npm run dev
```

You'll see: `🔶 MSW is enabled. API calls will be mocked.`

### Use Real Backend
```bash
# In .env file
VITE_ENABLE_MSW=false

# Start dev server
npm run dev
```

You'll see: `🌐 MSW is disabled. API calls will hit the real backend.`

---

## 📝 Configuration

### Environment Variables

Edit your `.env` file:

```bash
# API base URL (update to your backend)
VITE_API_BASE_URL=http://localhost:3000/api

# App name
VITE_APP_NAME=FlowAI

# Enable/Disable MSW
VITE_ENABLE_MSW=true  # or false
```

### Toggle Options

| Value | Behavior |
|-------|----------|
| `true` | Use MSW mock APIs (no real backend needed) |
| `false` | Use real backend APIs (backend must be running) |

---

## 🔧 API Contracts

**All API calls use the same contract regardless of MSW or real backend!**

### Authentication Endpoints

#### 1. Login
```typescript
POST /api/auth/login

Request:
{
  "email": "string",
  "password": "string"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "string",
      "email": "string",
      "name": "string",
      "role": "admin" | "user" | "viewer",
      "createdAt": "ISO date string",
      "updatedAt": "ISO date string"
    },
    "token": "string"
  }
}

Error (401):
{
  "success": false,
  "message": "Invalid email or password",
  "data": null
}
```

#### 2. Signup
```typescript
POST /api/auth/signup

Request:
{
  "name": "string",
  "email": "string",
  "password": "string",
  "confirmPassword": "string"
}

Response (201):
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user": { /* same as login */ },
    "token": "string"
  }
}

Error (409):
{
  "success": false,
  "message": "User with this email already exists",
  "data": null
}
```

#### 3. Get Current User
```typescript
GET /api/auth/me
Headers: Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "admin" | "user" | "viewer",
    "createdAt": "ISO date string",
    "updatedAt": "ISO date string"
  }
}

Error (401):
{
  "success": false,
  "message": "Unauthorized - Invalid token",
  "data": null
}
```

#### 4. Logout
```typescript
POST /api/auth/logout
Headers: Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Logged out successfully",
  "data": null
}
```

---

## 🧪 Testing with MSW

### Default Mock Users

When MSW is enabled, these users are pre-configured:

```typescript
// Admin user
Email: admin@flowai.com
Password: any password (all passwords work in mock)

// Regular user
Email: user@flowai.com
Password: any password (all passwords work in mock)
```

### Testing Login
1. Set `VITE_ENABLE_MSW=true`
2. Start dev server
3. Go to login page
4. Enter `admin@flowai.com` with any password
5. You'll be logged in successfully!

### Testing Signup
1. Set `VITE_ENABLE_MSW=true`
2. Start dev server
3. Go to signup page
4. Fill in the form with a NEW email
5. User will be created and logged in

**Note:** If you try to signup with `admin@flowai.com` or `user@flowai.com`, you'll get an error since they already exist.

---

## 🔄 Switching Between Mock and Real Backend

### Scenario 1: Development (No Backend Yet)
```bash
# .env
VITE_ENABLE_MSW=true
VITE_API_BASE_URL=http://localhost:3000/api  # doesn't matter, won't be called
```

✅ All API calls are mocked by MSW
✅ No backend server needed
✅ Instant responses with realistic delays

### Scenario 2: Testing with Real Backend
```bash
# .env
VITE_ENABLE_MSW=false
VITE_API_BASE_URL=http://localhost:3000/api  # your actual backend
```

✅ All API calls hit real backend
✅ Backend must be running
✅ Real authentication flow

### Scenario 3: Production
```bash
# .env.production
VITE_ENABLE_MSW=false
VITE_API_BASE_URL=https://api.flowai.com
```

✅ MSW automatically disabled
✅ All calls to production backend

---

## 📦 MSW File Structure

```
src/
├── mocks/
│   ├── browser.ts           # MSW browser setup
│   ├── handlers.ts          # Main handlers export
│   └── handlers/
│       ├── auth.handlers.ts # Auth endpoint mocks
│       └── index.ts
└── main.tsx                 # MSW initialization
```

---

## ➕ Adding New Mock Endpoints

### Step 1: Create Handler File
```typescript
// src/mocks/handlers/workflow.handlers.ts
import { http, HttpResponse, delay } from 'msw';
import { config } from '../../config';

export const workflowHandlers = [
  http.get(`${config.apiBaseUrl}/workflows`, async () => {
    await delay(500);
    
    return HttpResponse.json({
      success: true,
      message: 'Workflows retrieved',
      data: [
        { id: '1', name: 'Customer Onboarding', status: 'active' },
        { id: '2', name: 'Invoice Processing', status: 'active' },
      ],
    });
  }),
];
```

### Step 2: Add to Main Handlers
```typescript
// src/mocks/handlers.ts
import { authHandlers } from './handlers/auth.handlers';
import { workflowHandlers } from './handlers/workflow.handlers';

export const handlers = [
  ...authHandlers,
  ...workflowHandlers, // Add new handlers
];
```

### Step 3: Use in Your App
```typescript
// src/services/workflow.service.ts
export const workflowService = {
  async getWorkflows() {
    const response = await api.get('/workflows');
    return response.data;
  },
};
```

**That's it!** The contract works with both MSW and real backend.

---

## 🚀 Benefits

### With MSW Enabled
- ✅ **No Backend Required** - Start frontend development immediately
- ✅ **Realistic Network Delays** - Simulates real API latency
- ✅ **Instant Feedback** - No waiting for backend deployment
- ✅ **Offline Development** - Work anywhere without network
- ✅ **Consistent Testing** - Predictable responses
- ✅ **Error Simulation** - Easy to test error scenarios

### With MSW Disabled
- ✅ **Real Integration** - Test with actual backend
- ✅ **Production-like** - Identical to production behavior
- ✅ **E2E Testing** - Full stack integration tests
- ✅ **Backend Validation** - Verify API contracts

---

## 🎯 Best Practices

### 1. Match Real API Contracts
Ensure MSW handlers return the exact same structure as your real backend.

### 2. Use Realistic Delays
```typescript
await delay(800); // Simulate real network latency
```

### 3. Handle All Status Codes
Mock both success and error responses:
```typescript
// Success
return HttpResponse.json({ success: true, data: {...} }, { status: 200 });

// Error
return HttpResponse.json({ success: false, message: 'Error' }, { status: 400 });
```

### 4. Keep .env.example Updated
Always document the MSW toggle in `.env.example`:
```bash
VITE_ENABLE_MSW=true  # true for mock, false for real backend
```

### 5. Console Logging
MSW automatically logs which mode you're in:
- `🔶 MSW is enabled` - Using mocks
- `🌐 MSW is disabled` - Using real backend

---

## 🐛 Troubleshooting

### Issue: MSW not intercepting requests
**Solution:** Check browser console for MSW worker messages. Restart dev server.

### Issue: "Service worker not found"
**Solution:** Run `npx msw init public/ --save` again.

### Issue: Wrong mode after changing .env
**Solution:** Restart the dev server after changing `VITE_ENABLE_MSW`.

### Issue: 404 errors with MSW enabled
**Solution:** Check that your handler matches the API path exactly:
```typescript
http.post(`${config.apiBaseUrl}/auth/login`, ...)  // Correct
http.post('/auth/login', ...)  // Wrong - missing base URL
```

---

## 📚 Resources

- [MSW Documentation](https://mswjs.io/)
- [MSW GitHub](https://github.com/mswjs/msw)
- [API Mocking Best Practices](https://mswjs.io/docs/best-practices/)

---

## 🎉 Summary

**Toggle MSW in one place:**
```bash
# .env
VITE_ENABLE_MSW=true   # Use mocks
VITE_ENABLE_MSW=false  # Use real backend
```

**All API contracts remain identical!**

Your frontend code doesn't change. Just flip the switch! 🔄

