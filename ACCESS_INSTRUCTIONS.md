# FlowAI - Access Instructions

## ✅ Server is Running!

The development server is now running successfully at:

**http://localhost:5173**

## 🔧 Recent Fixes Applied

### API Client Fix
- Fixed response interceptor to return full axios response
- Updated type definitions for proper data access
- Services now correctly access `response.data`

### Files Modified
1. `src/services/api.ts` - Fixed response interceptor and type annotations
2. `src/types/auth.ts` - Added avatar field to User interface
3. `src/components/layout/ProtectedRoute.tsx` - Added children prop support
4. `src/contexts/AuthContext.tsx` - Exported AuthContext properly
5. Multiple service files - Added generic types to axios calls

## 🚀 How to Access the App

### Option 1: Browser
Open your browser and navigate to:
```
http://localhost:5173
```

### Option 2: Debug Console
For detailed console output, visit:
```
http://localhost:5173/debug.html
```
This page shows:
- Real-time console messages
- Error tracking
- App preview in iframe

## 🔑 Login Credentials

```
Email: demo@flowai.com
Password: demo123
```

## 📊 What to Test

1. **Login Flow**
   - Go to http://localhost:5173
   - Should redirect to `/login`
   - Enter credentials above
   - Should redirect to workspace selector

2. **Workspace Selector**
   - Should see 3 workspaces:
     - Acme Corp (15 members, 12 workflows)
     - TechStart Inc (8 members, 5 workflows)
     - Client Project (12 members, 8 workflows)
   - Select "Acme Corp"

3. **Dashboard**
   - Should see stats cards (Active Workflows, Pending Approvals, etc.)
   - Activity feed with recent events
   - "My Tasks" section

4. **Workflows Page** (`/workflows`)
   - Grid of 6 workflows
   - Search and filter functionality
   - Status badges (active/draft)

5. **Approvals Page** (`/approvals`)
   - List of 3 pending approvals
   - Priority badges
   - AI recommendation indicators
   - Click any approval to see detail page

6. **Approval Detail**
   - Full approval information
   - AI recommendation with confidence score
   - Approve/Reject buttons
   - Decision flow

## 🔍 Debugging

### Check Console
Open browser DevTools (F12) and check:
- Console tab for errors/warnings
- Network tab to verify MSW is intercepting requests
- Look for MSW startup message: "🔶 MSW is enabled..."

### Common Issues

**Issue**: Blank white screen
- **Check**: Browser console for errors
- **Check**: Network tab shows failed requests
- **Solution**: Verify MSW service worker is running

**Issue**: Login doesn't work
- **Check**: MSW is enabled (VITE_ENABLE_MSW=true)
- **Check**: Auth handler is responding in Network tab
- **Solution**: Hard refresh (Cmd+Shift+R / Ctrl+Shift+F5)

**Issue**: API errors (404/500)
- **Check**: API base URL in config (should be http://localhost:3000/api)
- **Check**: MSW handlers match the URL pattern
- **Solution**: Check `src/mocks/handlers/*.handlers.ts`

## 🛠️ Development Commands

```bash
# Start dev server with MSW
VITE_ENABLE_MSW=true npm run dev

# Start dev server with real backend
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── common/      # Button, Input, Card, Badge, etc.
│   └── layout/      # AppLayout, ProtectedRoute
├── contexts/        # React contexts (Auth, Workspace)
├── mocks/           # MSW handlers and mock data
│   ├── handlers/    # API request handlers
│   └── data/        # Mock data generators
├── pages/           # Page components
│   ├── auth/        # Login, Signup
│   ├── dashboard/   # Dashboard
│   ├── workflows/   # Workflows list
│   ├── approvals/   # Approvals inbox & detail
│   └── workspace/   # Workspace selector
├── services/        # API service layer
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## 🎨 UI Features

- ✅ Dark theme (sleek like OpenAI AgentKit)
- ✅ Green accent color (#22C55E)
- ✅ Inter font
- ✅ Framer Motion animations
- ✅ Responsive layout
- ✅ Icon library (lucide-react)

## 🤖 MSW Configuration

MSW (Mock Service Worker) is configured to intercept:
- `/api/auth/*` - Authentication endpoints
- `/api/workspaces/*` - Workspace management
- `/api/workspaces/:id/workflows/*` - Workflow operations
- `/api/workspaces/:id/approvals/*` - Approval operations

All mock data is realistic and includes:
- 3 workspaces with different roles
- 6 workflows across various categories
- 3 pending approvals with AI recommendations
- Recent activity feed
- Dashboard statistics

## 🔥 Next Steps

Once you verify the app is working:
1. Test all user flows
2. Check MSW is intercepting requests (Network tab)
3. Verify data displays correctly
4. Test interactive features (search, filters, approve/reject)
5. Report any errors you see in console

---

**Current Status**: ✅ Server Running  
**URL**: http://localhost:5173  
**MSW**: ✅ Enabled  
**Build**: ✅ Successful

