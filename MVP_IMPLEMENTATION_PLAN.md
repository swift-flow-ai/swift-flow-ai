# FlowAI MVP - Implementation Plan

## 🎯 MVP Scope

Building enterprise-grade workflow automation platform with:
- Sleek UI inspired by OpenAI AgentKit & Google Opal
- Full MSW integration for realistic interactions
- All core screens and user flows
- Smooth animations and transitions

---

## 📱 Screens to Implement

### ✅ Already Built (Auth Base)
1. Login Page
2. Signup Page  
3. Basic Auth Flow

### 🎨 New Screens Required

#### Phase 1: Core Navigation & Dashboard
4. **Workspace Selector** - Select workspace after login
5. **App Layout** - Top bar + sidebar navigation
6. **Dashboard** - Stats cards, activity feed, quick actions

#### Phase 2: Workflow Management
7. **Workflows List** - Grid/list view of all workflows
8. **Workflow Builder** - Visual drag-and-drop canvas
9. **Node Configuration Panel** - Configure each node type
10. **Workflow Execution View** - Real-time progress tracking

#### Phase 3: Approvals
11. **Approvals Inbox** - List of pending approvals
12. **Approval Detail** - Full approval view with AI recommendations

#### Phase 4: Additional Features
13. **Marketplace** - Browse & install integrations
14. **Analytics Dashboard** - Charts & insights
15. **Team Management** - Members, roles, invites
16. **Settings** - Workspace & user settings

---

## 🎨 Design System

### Colors (Dark Theme Primary)
```css
--background: 0 0% 3.9%
--foreground: 0 0% 98%
--card: 0 0% 7%
--card-foreground: 0 0% 98%
--primary: 142 76% 36%    /* Green accent */
--primary-foreground: 144 61% 20%
--secondary: 240 3.7% 15.9%
--secondary-foreground: 0 0% 98%
--muted: 0 0% 15%
--muted-foreground: 240 5% 64.9%
--accent: 142 76% 36%
--accent-foreground: 144 61% 20%
--destructive: 0 84% 60%
--destructive-foreground: 0 0% 98%
--border: 240 3.7% 15.9%
--input: 240 3.7% 15.9%
--ring: 142 76% 36%
--radius: 0.5rem
```

### Typography
- **Font Family**: Inter (system font stack fallback)
- **Headings**: font-semibold, tracking-tight
- **Body**: font-normal, text-sm
- **Code**: font-mono

### Spacing
- Consistent 4px grid (0.25rem)
- Card padding: 1.5rem (24px)
- Section gaps: 2rem (32px)

### Components Style
- Rounded corners (radius: 0.5rem)
- Subtle shadows for elevation
- Smooth transitions (150-200ms)
- Hover states with slight scale/opacity
- Focus rings for accessibility

---

## 🔧 Technical Stack

### UI Components
- **Base**: Radix UI primitives
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Drag & Drop**: DnD Kit

### State Management
- **Auth**: React Context (existing)
- **Workspace**: React Context (new)
- **Workflows**: React Query + MSW
- **Local State**: useState, useReducer

### Routing
- React Router DOM v7
- Protected routes
- Workspace-scoped routes

---

## 📊 MSW Handlers to Create

### Workspaces
- GET /workspaces
- POST /workspaces
- GET /workspaces/:id
- GET /workspaces/:id/dashboard

### Workflows  
- GET /workspaces/:id/workflows
- POST /workspaces/:id/workflows
- GET /workspaces/:id/workflows/:workflowId
- PATCH /workspaces/:id/workflows/:workflowId
- POST /workspaces/:id/workflows/:workflowId/execute

### Approvals
- GET /workspaces/:id/approvals
- GET /workspaces/:id/approvals/:approvalId
- POST /workspaces/:id/approvals/:approvalId/decide

### Integrations
- GET /integrations/marketplace
- GET /workspaces/:id/integrations
- POST /workspaces/:id/integrations/:integrationId/install

### Analytics
- GET /workspaces/:id/analytics/overview
- GET /workspaces/:id/analytics/workflows/:workflowId

### Executions
- GET /workspaces/:id/executions
- GET /workspaces/:id/executions/:executionId

### Team
- GET /workspaces/:id/members
- POST /workspaces/:id/members/invite

### Notifications
- GET /notifications

---

## 🎬 Animation Strategy

### Page Transitions
```javascript
// Fade + slide up on mount
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3 }}
```

### List Items (Stagger)
```javascript
variants={{
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}}
```

### Modals/Dialogs
```javascript
// Scale + fade
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0.95 }}
```

### Workflow Canvas
- Smooth node dragging
- Animated connections
- Pulse on node execution
- Success/error state transitions

---

## 🗂️ Folder Structure

```
src/
├── components/
│   ├── common/          # Button, Input, Card (existing)
│   ├── layout/          # AppLayout, Sidebar, TopBar
│   ├── workflows/       # WorkflowBuilder, NodeLibrary, Canvas
│   ├── approvals/       # ApprovalCard, ApprovalDetail
│   ├── dashboard/       # StatsCard, ActivityFeed
│   ├── marketplace/     # IntegrationCard, CategoryFilter
│   └── analytics/       # Chart components
├── pages/
│   ├── auth/           # Login, Signup (existing)
│   ├── workspace/      # WorkspaceSelector
│   ├── dashboard/      # Dashboard
│   ├── workflows/      # WorkflowsList, WorkflowBuilder, Execution
│   ├── approvals/      # ApprovalsList, ApprovalDetail
│   ├── marketplace/    # Marketplace
│   ├── analytics/      # Analytics
│   └── settings/       # Settings, Team
├── contexts/
│   ├── AuthContext.tsx      (existing)
│   ├── WorkspaceContext.tsx (new)
│   └── ThemeContext.tsx     (new)
├── services/
│   ├── api.ts              (existing)
│   ├── auth.service.ts     (existing)
│   ├── workspace.service.ts (new)
│   ├── workflow.service.ts  (new)
│   └── approval.service.ts  (new)
├── mocks/
│   ├── handlers/
│   │   ├── auth.handlers.ts      (existing)
│   │   ├── workspace.handlers.ts (new)
│   │   ├── workflow.handlers.ts  (new)
│   │   ├── approval.handlers.ts  (new)
│   │   ├── integration.handlers.ts (new)
│   │   └── analytics.handlers.ts  (new)
│   ├── data/           # Mock data generators
│   │   ├── workspaces.ts
│   │   ├── workflows.ts
│   │   ├── approvals.ts
│   │   └── executions.ts
│   └── browser.ts      (existing)
├── hooks/
│   ├── useAuth.ts          (existing)
│   ├── useWorkspace.ts     (new)
│   ├── useWorkflows.ts     (new)
│   └── useApprovals.ts     (new)
├── types/
│   ├── auth.ts        (existing)
│   ├── workspace.ts   (new)
│   ├── workflow.ts    (new)
│   ├── approval.ts    (new)
│   └── index.ts       (existing)
└── utils/
    ├── cn.ts          (existing)
    ├── formatters.ts  (new - date, number formatting)
    └── validators.ts  (new)
```

---

## 🚀 Implementation Order

### Sprint 1: Foundation (Current)
1. ✅ API Documentation
2. ✅ Dependencies installed
3. ⏳ Design system & theme
4. ⏳ Base component library
5. ⏳ Workspace context & routing

### Sprint 2: Core Flows
6. Workspace selector
7. App layout & navigation
8. Dashboard with mock data
9. Workflows list view
10. MSW handlers for workspaces & workflows

### Sprint 3: Workflow Builder
11. Canvas component
12. Node library
13. Drag & drop implementation
14. Node configuration panel
15. Save/load workflows

### Sprint 4: Approvals & Execution
16. Approvals inbox
17. Approval detail with AI recommendations
18. Workflow execution view
19. Real-time progress updates (simulated)

### Sprint 5: Polish & Additional Features
20. Marketplace
21. Analytics dashboard
22. Team management
23. Settings
24. Animations & transitions
25. Responsive design

---

## 🎯 Success Criteria

- ✅ All screens implemented with sleek UI
- ✅ Smooth animations and transitions
- ✅ Full MSW integration (no backend needed)
- ✅ Realistic data and interactions
- ✅ Responsive design (desktop + tablet)
- ✅ Accessible (keyboard navigation, ARIA)
- ✅ Fast performance (<100ms interactions)
- ✅ Clean, maintainable code
- ✅ Runs in Cursor Browser

---

## 📝 Notes

- Focus on desktop-first (1440px+), then tablet (768px+)
- Use Framer Motion for all animations
- Keep MSW data realistic and varied
- Add loading states everywhere
- Error states with helpful messages
- Empty states with CTAs

---

Let's build this! 🚀

