# Swift Flow AI - Complete Documentation

> **Stop Documenting. Start Executing.**  
> Transform your business processes from static documentation into executable, trackable workflows.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Platform Overview](#platform-overview)
3. [Core Features](#core-features)
4. [Architecture](#architecture)
5. [API Documentation](#api-documentation-reference)
6. [Workflow Triggers](#workflow-triggers)
7. [Development Guide](#development-guide)
8. [MSW Integration](#msw-integration)
9. [Contributing](#contributing)

---

## 🚀 Quick Start

### Start Development
```bash
cd /Users/nabajit.das/Documents/dev/experiments/dots
npm run dev
```
**Open:** http://localhost:5173

### Demo Credentials
- **Email:** `demo@flowai.com` or `admin@acme.com`
- **Password:** `demo123` or any password (MSW enabled)

### Key Commands
```bash
npm run dev      # Start dev server (port 5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Check code quality
```

---

## 🎯 Platform Overview

**Swift Flow AI** is an AI-native business process automation platform that helps organizations:

- **Execute processes** instead of just documenting them
- **Track workflow progress** in real-time
- **Optimize operations** with AI-powered insights
- **Replace tools like** Jira, Notion, Confluence for process management

### Core Value Proposition

Traditional tools (Jira, Notion, etc.) help you **document** processes.  
Swift Flow AI helps you **execute and track** them.

**Example Use Cases:**
- HR Interview Coordination
- Employee Onboarding
- Invoice Processing
- Customer Support Workflows
- Approval Chains
- Data Processing Pipelines

---

## 🎨 Core Features

### 1. Visual Workflow Builder

Drag-and-drop interface for creating executable workflows:

```
Available Node Types:
├── 🔵 Triggers (Manual, Webhook, Schedule, Workflow Complete, Email)
├── 🤖 AI Agents (GPT-4, Claude, Custom AI)
├── ✅ Human Tasks (Approval, Review, Form Fill)
├── 🔀 Logic (If/Then, Loop, Switch, Wait)
├── 🧠 Smart Routing (AI-powered intelligent routing)
├── 🔌 Integrations (Slack, Email, Database, 500+ apps)
├── 🔧 MCP Servers (Custom tools from marketplace)
├── 📊 Data Operations (Transform, Filter, Aggregate)
└── 📤 Actions (Send Email, Save DB, Notify, API Call)
```

### 2. Multi-Workspace Support

- Users can belong to multiple workspaces
- Each workspace has its own workflows, team, and settings
- Easy workspace switching from top bar

### 3. Team Pools

Assign tasks to pools of people instead of individuals:
- **HR Recruiters Pool** - Round-robin assignment
- **Approval Pool** - Load-balanced approvals
- **Support Tier 1** - Smart routing based on expertise
- **Custom Pools** - Define your own

### 4. Workflow Analytics

Comprehensive analytics for each workflow:
- **Execution metrics** - Success rate, duration, cost
- **Bottleneck detection** - AI-powered recommendations
- **Node performance** - Identify slow steps
- **Peak times** - Optimize scheduling
- **Trend analysis** - Track improvements over time

### 5. Real-time Execution Tracking

- Live progress updates
- Detailed execution logs
- Error tracking and retry
- Cancel/pause running workflows

### 6. Marketplace & Integrations

- 500+ pre-built integrations
- MCP server support
- Custom API connections
- OAuth flows

### 7. Audit Logs

Complete audit trail of all actions:
- Who did what, when
- Workflow executions
- Configuration changes
- Team modifications

---

## 🏗️ Architecture

### Technology Stack

**Frontend:**
- React 19 + TypeScript
- Vite (dev server & build)
- React Router v7 (routing)
- Tailwind CSS (styling)
- Framer Motion (animations)
- React Flow (workflow canvas)
- Recharts (analytics)
- MSW (API mocking)

**State Management:**
- React Context (Auth, Workspace, Theme)
- Custom hooks (useAuth, useWorkspace, useTheme)

**API Layer:**
- Axios (HTTP client)
- Service pattern (per-domain services)
- MSW handlers (mock backend)

### Project Structure

```
src/
├── components/
│   ├── common/          # Button, Input, Card, Badge, Avatar, etc.
│   ├── layout/          # AppLayout, Sidebar, TopBar
│   └── workflow/        # NodePalette, WorkflowCanvas, Node components
├── pages/
│   ├── auth/            # Login, Signup
│   ├── workspace/       # WorkspaceSelector, WorkspaceCreate
│   ├── dashboard/       # Dashboard
│   ├── workflows/       # WorkflowsList, WorkflowBuilder, WorkflowViewer, WorkflowAnalytics
│   ├── executions/      # ExecutionsList, ExecutionDetail
│   ├── approvals/       # ApprovalsList, ApprovalDetail
│   ├── templates/       # TemplateMarketplace, TemplateDetail
│   ├── marketplace/     # MarketplacePage, AppDetailPage
│   ├── integrations/    # IntegrationsList, AddIntegration, IntegrationConfig
│   ├── analytics/       # AnalyticsDashboard
│   ├── team/            # TeamPage (Members & Pools)
│   ├── audit/           # AuditLogs, AuditLogDetail
│   └── notifications/   # NotificationsPage
├── contexts/
│   ├── AuthContext.tsx       # Authentication state
│   ├── WorkspaceContext.tsx  # Workspace state
│   └── ThemeContext.tsx      # Theme (light/dark/system)
├── hooks/
│   ├── useAuth.ts
│   ├── useWorkspace.ts
│   └── useTheme.ts
├── services/
│   ├── api.ts                # Axios instance
│   ├── auth.service.ts
│   ├── workspace.service.ts
│   ├── workflow.service.ts
│   ├── execution.service.ts
│   ├── approval.service.ts
│   ├── template.service.ts
│   ├── integration.service.ts
│   ├── analytics.service.ts
│   └── audit.service.ts
├── mocks/
│   ├── browser.ts           # MSW setup
│   ├── handlers.ts          # Handler exports
│   ├── handlers/            # MSW request handlers
│   │   ├── auth.handlers.ts
│   │   ├── workspace.handlers.ts
│   │   ├── workflow.handlers.ts
│   │   ├── execution.handlers.ts
│   │   ├── approval.handlers.ts
│   │   ├── template.handlers.ts
│   │   ├── integration.handlers.ts
│   │   ├── analytics.handlers.ts
│   │   ├── team.handlers.ts
│   │   └── audit.handlers.ts
│   └── data/                # Mock data
│       ├── workspaces.ts
│       ├── workflows.ts
│       ├── executions.ts
│       ├── approvals.ts
│       ├── templates.ts
│       ├── integrations.ts
│       ├── team.ts
│       ├── pools.ts
│       └── auditLogs.ts
├── types/
│   ├── auth.ts
│   ├── api.ts
│   └── workspace.ts         # All domain types
└── utils/
    └── helpers.ts
```

---

## 📡 API Documentation Reference

**Full API documentation:** See `API_DOCUMENTATION.md`

**Base URL:** `https://api.swiftflow.ai/v1`  
**Authentication:** Bearer token in Authorization header

### Key Endpoints

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `GET /auth/me` - Get current user
- `POST /auth/logout` - Logout

#### Workspaces
- `GET /workspaces` - List workspaces
- `POST /workspaces` - Create workspace
- `GET /workspaces/:id` - Get workspace details
- `GET /workspaces/:id/dashboard` - Dashboard data

#### Workflows
- `GET /workspaces/:id/workflows` - List workflows
- `POST /workspaces/:id/workflows` - Create workflow
- `GET /workspaces/:id/workflows/:workflowId` - Get workflow
- `PATCH /workspaces/:id/workflows/:workflowId` - Update workflow
- `POST /workspaces/:id/workflows/:workflowId/execute` - Execute workflow
- `GET /workspaces/:id/workflows/:workflowId/analytics` - Workflow analytics

#### Executions
- `GET /workspaces/:id/executions` - List executions
- `GET /workspaces/:id/executions/:executionId` - Get execution details
- `POST /workspaces/:id/executions/:executionId/cancel` - Cancel execution
- `POST /workspaces/:id/executions/:executionId/retry` - Retry execution

#### Approvals
- `GET /workspaces/:id/approvals` - List approvals
- `GET /workspaces/:id/approvals/:approvalId` - Get approval details
- `POST /workspaces/:id/approvals/:approvalId/decide` - Approve/reject

#### Team & Pools
- `GET /workspaces/:id/members` - List team members
- `POST /workspaces/:id/members/invite` - Invite member
- `GET /workspaces/:id/pools` - List team pools
- `POST /workspaces/:id/pools` - Create pool
- `POST /workspaces/:id/pools/:poolId/members` - Add member to pool

#### Templates
- `GET /workspaces/:id/templates` - List templates
- `POST /workspaces/:id/templates/:templateId/use` - Use template

#### Integrations
- `GET /integrations/marketplace` - Browse marketplace
- `GET /workspaces/:id/integrations` - List installed integrations
- `POST /workspaces/:id/integrations` - Install integration

#### Analytics
- `GET /workspaces/:id/analytics/overview` - Workspace analytics
- `GET /workspaces/:id/analytics/workflows/:workflowId` - Workflow analytics

#### Audit Logs
- `GET /workspaces/:id/audit-logs` - List audit logs
- `GET /workspaces/:id/audit-logs/:logId` - Get log details

---

## 🎯 Workflow Triggers

Swift Flow AI supports multiple trigger types for flexible automation:

### 1. Manual Trigger

**Use Case:** User-initiated workflows requiring explicit permission

**Configuration:**
- Allowed Users: Specify who can trigger
- Require Approval: Optional admin approval

**Example:** Expense report approval, custom report generation

### 2. Webhook Trigger

**Use Case:** External systems triggering workflows via HTTP

**Configuration:**
- HTTP Method: POST, GET, PUT
- Webhook URL: Auto-generated unique endpoint
- Authentication: HMAC signature verification

**Example:** New customer signup → onboarding workflow

### 3. Workflow Complete Trigger

**Use Case:** Chain workflows together

**Configuration:**
- Source Workflow: Select parent workflow
- Trigger Condition: On success, failure, or always
- Data Mapping: Pass output to next workflow

**Example:** Employee onboarding → IT setup → Welcome email

### 4. Schedule Trigger

**Use Case:** Time-based automation

**Configuration:**
- Schedule Type: Cron expression or interval
- Timezone: Workspace timezone or custom
- Run Window: Optional start/end times

**Cron Examples:**
- `0 9 * * 1-5` - Every weekday at 9 AM
- `0 0 1 * *` - First day of month
- `*/15 * * * *` - Every 15 minutes

**Example:** Daily reports, weekly cleanup, monthly billing

### 5. Email Trigger

**Use Case:** Workflows triggered by incoming emails

**Configuration:**
- Email Address: Auto-generated workflow email
- Sender Whitelist: Only accept from specific addresses
- Subject Filter: Optional regex matching
- Attachment Handling: Parse and extract

**Example:** Support tickets, invoice processing, order processing

---

## 💻 Development Guide

### Setup

```bash
# Clone repository
git clone https://github.com/swift-flow-ai/swift-flow-ai.git
cd swift-flow-ai

# Install dependencies
npm install

# Start development server
VITE_ENABLE_MSW=true npm run dev
```

### Environment Variables

Create `.env` file:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Swift Flow AI

# MSW Toggle (true = mock API, false = real backend)
VITE_ENABLE_MSW=true
```

### Development Workflow

1. **Start dev server:** `npm run dev`
2. **Open browser:** http://localhost:5173
3. **Login:** Use demo credentials
4. **Make changes:** Hot reload enabled
5. **Check lints:** `npm run lint`
6. **Build:** `npm run build`

### Key Features

#### Theme Support
- Light, Dark, and System themes
- Toggle from top bar or settings
- Persisted in localStorage
- CSS variables for easy customization

#### Multi-Workspace
- Switch workspaces from top bar dropdown
- Each workspace has isolated data
- Last-used workspace remembered

#### Protected Routes
- All `/app/*` routes require authentication
- Automatic redirect to login if not authenticated
- Workspace selection after login

### Adding New Features

#### 1. Add a New Page

```typescript
// src/pages/myfeature/MyFeaturePage.tsx
export function MyFeaturePage() {
  const { currentWorkspace } = useWorkspace();
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">My Feature</h1>
      {/* Your content */}
    </div>
  );
}
```

#### 2. Add Route

```typescript
// src/App.tsx
import { MyFeaturePage } from './pages/myfeature/MyFeaturePage';

// Inside /app routes:
<Route path="myfeature" element={<MyFeaturePage />} />
```

#### 3. Add Navigation

```typescript
// src/components/layout/AppLayout.tsx
const navigation = [
  // ... existing items
  {
    name: 'My Feature',
    href: '/app/myfeature',
    icon: YourIcon,
  },
];
```

#### 4. Add MSW Handler (Optional)

```typescript
// src/mocks/handlers/myfeature.handlers.ts
import { http, HttpResponse, delay } from 'msw';
import { config } from '../../config';

export const myFeatureHandlers = [
  http.get(`${config.apiBaseUrl}/myfeature`, async () => {
    await delay(500);
    return HttpResponse.json({
      success: true,
      data: { /* your data */ },
    });
  }),
];
```

#### 5. Add Service

```typescript
// src/services/myfeature.service.ts
import { api } from './api';

export const myFeatureService = {
  async getData() {
    const response = await api.get('/myfeature');
    return response.data.data;
  },
};
```

---

## 🎭 MSW Integration

### Overview

Swift Flow AI uses Mock Service Worker (MSW) to mock backend APIs during development.

**Toggle between mock and real backend:**

```bash
# Use mock APIs (no backend needed)
VITE_ENABLE_MSW=true

# Use real backend
VITE_ENABLE_MSW=false
VITE_API_BASE_URL=http://localhost:3000/api
```

### Benefits

**With MSW Enabled:**
- ✅ No backend required
- ✅ Instant responses
- ✅ Offline development
- ✅ Consistent testing
- ✅ Realistic delays

**With MSW Disabled:**
- ✅ Real integration testing
- ✅ Production-like behavior
- ✅ API validation

### Mock Data

All mock data is in `src/mocks/data/`:
- **workspaces.ts** - 3 demo workspaces
- **workflows.ts** - 6 example workflows (including HR Interview Coordination)
- **executions.ts** - Sample workflow executions
- **approvals.ts** - Pending approvals
- **templates.ts** - Workflow templates
- **integrations.ts** - Installed integrations
- **team.ts** - Team members
- **pools.ts** - Team pools (HR Ops, Recruiters, CAB, etc.)
- **auditLogs.ts** - Audit trail

### Demo Users

```typescript
// Admin user
Email: admin@flowai.com
Password: any password

// Regular user
Email: user@flowai.com
Password: any password

// Demo user
Email: demo@flowai.com
Password: demo123
```

---

## 🤝 Contributing

### Code Style

- **TypeScript:** Use proper types, avoid `any`
- **React:** Functional components with hooks
- **Styling:** Tailwind CSS utility classes
- **Naming:** Descriptive names, camelCase for variables

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add workflow analytics page
fix: resolve authentication token expiry
docs: update API documentation
style: format code with prettier
refactor: reorganize component structure
test: add tests for approval service
chore: update dependencies
```

### Pull Request Process

1. Fork the repo
2. Create your branch: `git checkout -b feature/my-feature`
3. Make changes and commit
4. Run linter: `npm run lint`
5. Build: `npm run build`
6. Push and create PR

### Testing

```bash
# Run linter
npm run lint

# Build (checks TypeScript)
npm run build

# Test with MSW
VITE_ENABLE_MSW=true npm run dev
```

---

## 📊 Current Status

### ✅ Completed Features

- [x] Authentication (Login, Signup, Logout)
- [x] Multi-workspace support
- [x] Workspace creation & settings
- [x] Team management & invites
- [x] Team Pools (HR Ops, Recruiters, CAB, etc.)
- [x] Dashboard with stats & activity
- [x] Workflow list & filters
- [x] Workflow builder (visual canvas)
- [x] Workflow viewer
- [x] Workflow analytics (comprehensive)
- [x] Workflow execution tracking
- [x] Execution history & logs
- [x] Approvals inbox & detail
- [x] AI-powered approval recommendations
- [x] Template marketplace
- [x] Integration marketplace
- [x] Multiple integrations per app (named instances)
- [x] Audit logs
- [x] Notifications
- [x] Theme toggle (Light/Dark/System)
- [x] Responsive design
- [x] MSW integration
- [x] Complete API documentation

### 🎯 Example Workflows

#### HR Interview Coordination

Complete workflow demonstrating:
- Manual trigger by HR recruiter
- Candidate details form
- Candidate self-scheduling (availability link)
- Pool query (fetch available interviewers)
- Smart pool assignment (round-robin, load-balanced)
- Interviewer request with approval
- Retry on rejection (select next interviewer)
- AI agenda generation
- Calendar event creation (Google Meet link)
- Email confirmations
- Reminders
- Feedback form trigger (at event start)
- Wait for feedback
- ATS update
- Slack notification
- Complete

**View at:** http://localhost:5173/app/workflows/wf_recruitment

---

## 🎨 Design System

### Colors

```css
/* Dark Theme (Default) */
--background: 0 0% 3.9%
--foreground: 0 0% 98%
--card: 0 0% 7%
--primary: 142 76% 36%    /* Green accent */
--muted: 0 0% 15%
--border: 240 3.7% 15.9%

/* Light Theme */
--background: 0 0% 100%
--foreground: 0 0% 3.9%
--card: 0 0% 100%
--primary: 142 76% 36%    /* Green accent */
--muted: 240 4.8% 95.9%
--border: 240 5.9% 90%
```

### Typography

- **Font:** Inter (Google Fonts)
- **Weights:** 400, 500, 600, 700
- **Scale:** text-xs to text-3xl

### Spacing

- **Cards:** p-6 (24px)
- **Gaps:** gap-4 (16px) or gap-6 (24px)
- **Sections:** space-y-8 (32px)
- **Main content:** p-8 (32px padding from AppLayout)

---

## 📝 Recent Updates

### Latest Changes

1. **Workflow Analytics** - Comprehensive analytics page with charts, bottleneck detection, and AI recommendations
2. **Team Pools** - Support for assigning tasks to pools of people
3. **HR Interview Workflow** - Complete example workflow with all features
4. **Navigation Fixes** - All routes updated to use `/app` prefix
5. **Lint Fixes** - Removed `any` types, fixed TypeScript errors
6. **Theme Improvements** - Fixed dropdown backgrounds and contrast
7. **Mock Data** - Realistic data for all features

### Known Issues

- Some useEffect exhaustive-deps warnings (safe to ignore)
- A few remaining 'any' types in mock handlers (non-critical)

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

Output: `dist/` directory

### Environment Variables (Production)

```bash
VITE_ENABLE_MSW=false
VITE_API_BASE_URL=https://api.swiftflow.ai
VITE_APP_NAME=Swift Flow AI
```

### Deploy

Deploy the `dist/` folder to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Your preferred hosting

---

## 📞 Support

For questions or issues:
- Check this documentation
- Review `API_DOCUMENTATION.md` for API details
- Check the codebase - it's well-documented
- All code follows React and TypeScript best practices

---

## 📄 License

[Your License Here]

---

**Built with ❤️ using React, TypeScript, Vite, and Tailwind CSS**

**Stop Documenting. Start Executing.** 🚀
