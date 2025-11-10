# Swift Flow AI - Complete Documentation

> **Stop Documenting. Start Executing.**  
> Transform your business processes from static documentation into executable, trackable workflows.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Platform Overview](#platform-overview)
3. [Core Features](#core-features)
4. [Architecture](#architecture)
5. [RBAC - Role-Based Access Control](#rbac---role-based-access-control)
6. [API Documentation](#api-documentation-reference)
7. [Workflow Triggers](#workflow-triggers)
8. [Development Guide](#development-guide)
9. [MSW Integration](#msw-integration)
10. [Contributing](#contributing)

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

**Collaboration Features:**

- 📁 **Folder Organization** - Organize workflows in nested folders
- 🔗 **Share with Link** - Anyone with link can access (Viewer/Editor/Commenter)
- 👥 **Share with Users** - Invite specific users with custom permissions
- 📝 **Draft State** - Save workflows as drafts for review before publishing
- 💬 **Live Comments** - Real-time commenting like Google Docs
- 👀 **Live Presence** - See who's viewing/editing in real-time
- 📜 **Version History** - Track changes and restore previous versions

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

### 7. Workflow Collaboration (Google Drive-style)

**Folder Organization:**

- Create nested folders to organize workflows
- Move workflows between folders (drag & drop)
- Folder-level permissions (share entire folders)
- Breadcrumb navigation
- Search across folders

**Sharing & Permissions:**

- **Share with Link:**

  - Anyone with link (Viewer, Commenter, Editor)
  - Link expiration dates
  - Password protection (optional)
  - Revoke link access anytime

- **Share with Users:**

  - Invite specific workspace members
  - Custom permissions per user:
    - **Viewer** - Can view only
    - **Commenter** - Can view and comment
    - **Editor** - Can view, comment, and edit
    - **Owner** - Full control (transfer ownership)
  - Remove access anytime

- **Folder Sharing:**
  - Share entire folders with users/teams
  - Inherited permissions (workflows inherit folder permissions)
  - Override permissions at workflow level

**Draft & Review Workflow:**

- **Draft State:**

  - Save workflows as drafts (not executable)
  - Request review from specific users
  - Review workflow before publishing
  - Track review status (Pending, Approved, Changes Requested)

- **Review Process:**
  - Reviewers can add comments
  - Approve or request changes
  - Workflow owner addresses feedback
  - Publish after approval

**Live Comments:**

- Add comments on specific workflow nodes
- Reply to comments (threaded discussions)
- Mention users (@username) for notifications
- Resolve comments when addressed
- Comment history and timestamps
- Real-time updates (see new comments instantly)

**Live Presence:**

- See who's currently viewing the workflow
- See who's editing (with cursor position)
- Avatars of active users
- Real-time collaboration indicators

**Version History:**

- Auto-save every change
- View previous versions
- Compare versions (diff view)
- Restore previous version
- See who made each change

### 8. Audit Logs

Complete audit trail of all actions:

- Who did what, when
- Workflow executions
- Configuration changes
- Team modifications
- Sharing and permission changes
- Comment activity

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
│   ├── inbox/           # InboxPage, InboxDetail
│   ├── templates/       # TemplateMarketplace, TemplateDetail
│   ├── marketplace/     # MarketplacePage, AppDetailPage
│   ├── integrations/    # IntegrationsList, AddIntegration, IntegrationConfig
│   ├── analytics/       # AnalyticsDashboard
│   ├── team/            # TeamPage (Members & Pools)
│   ├── audit/           # AuditLogs, AuditLogDetail
│   ├── profile/         # ProfilePage
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

## 🔐 RBAC - Role-Based Access Control

Swift Flow AI implements a comprehensive Role-Based Access Control system to manage user permissions across workspaces.

### Roles

#### 1. Owner 👑

**Full control over the workspace**

- All 43 permissions (complete access)
- Can delete workspace
- Can manage billing
- Can transfer ownership
- Cannot be removed from workspace

**Use case:** Workspace creator, primary administrator

#### 2. Admin 🔴

**Manage workflows, team, and integrations**

- 38 permissions
- Can create, edit, delete workflows
- Can manage team and integrations
- Cannot delete workspace or manage billing
- Cannot change member roles (only owner can)

**Use case:** Team leads, department managers

#### 3. Member 🔵

**Create and execute workflows**

- 18 permissions
- Can create, edit, and execute workflows
- Can view analytics
- Can handle approvals
- Cannot delete workflows, invite members, or configure integrations

**Use case:** Regular team members, workflow creators

#### 4. Viewer 🟢

**Read-only access with approval handling**

- 7 permissions
- Can view workflows and executions
- Can handle assigned approvals
- Cannot create, edit, or execute workflows
- Cannot view analytics

**Use case:** Stakeholders, approvers, auditors

#### 5. Guest ⚪

**Limited access for external collaborators**

- 2 permissions
- Can only view and decide on assigned approvals
- Cannot access any other features

**Use case:** External approvers, contractors, clients

### Permission Matrix

| Feature              | Owner | Admin | Member | Viewer | Guest |
| -------------------- | ----- | ----- | ------ | ------ | ----- |
| **Workflows**        |
| View workflows       | ✅    | ✅    | ✅     | ✅     | ❌    |
| Create workflows     | ✅    | ✅    | ✅     | ❌     | ❌    |
| Edit workflows       | ✅    | ✅    | ✅     | ❌     | ❌    |
| Delete workflows     | ✅    | ✅    | ❌     | ❌     | ❌    |
| Execute workflows    | ✅    | ✅    | ✅     | ❌     | ❌    |
| **Analytics**        |
| View analytics       | ✅    | ✅    | ✅     | ❌     | ❌    |
| Export analytics     | ✅    | ✅    | ❌     | ❌     | ❌    |
| **Executions**       |
| Cancel executions    | ✅    | ✅    | ✅     | ❌     | ❌    |
| **Approvals**        |
| Handle approvals     | ✅    | ✅    | ✅     | ✅     | ✅    |
| **Team**             |
| Invite members       | ✅    | ✅    | ❌     | ❌     | ❌    |
| Remove members       | ✅    | ✅    | ❌     | ❌     | ❌    |
| Manage roles         | ✅    | ❌    | ❌     | ❌     | ❌    |
| **Integrations**     |
| Install integrations | ✅    | ✅    | ❌     | ❌     | ❌    |
| **Workspace**        |
| Delete workspace     | ✅    | ❌    | ❌     | ❌     | ❌    |
| Manage billing       | ✅    | ❌    | ❌     | ❌     | ❌    |

### Using RBAC in Code

#### Method 1: usePermissions Hook

```typescript
import { usePermissions } from "../../hooks/usePermissions";

function MyComponent() {
  const { can, canAny, canAll, userRole, isOwner, isAdminOrOwner } =
    usePermissions();

  // Check single permission
  if (can("workflow:create")) {
    // Show create button
  }

  // Check multiple permissions (any)
  if (canAny(["workflow:edit", "workflow:delete"])) {
    // Show edit or delete
  }

  // Check role
  if (isAdminOrOwner) {
    // Show admin features
  }
}
```

#### Method 2: PermissionGate Component

```typescript
import { PermissionGate } from "../../components/common/PermissionGate";

function MyComponent() {
  return (
    <div>
      <PermissionGate permission="workflow:create">
        <button>Create Workflow</button>
      </PermissionGate>

      <PermissionGate
        permission="analytics:view"
        fallback={<p>No access to analytics</p>}
      >
        <AnalyticsDashboard />
      </PermissionGate>
    </div>
  );
}
```

### Demo Users for Testing

| Email          | Role   | Password | Access Level               |
| -------------- | ------ | -------- | -------------------------- |
| admin@acme.com | Owner  | any      | Full access                |
| john@acme.com  | Admin  | any      | Manage workflows, team     |
| sarah@acme.com | Member | any      | Create & execute workflows |
| alice@acme.com | Viewer | any      | Read-only + approvals      |
| david@acme.com | Guest  | any      | Approvals only             |

### Testing RBAC

```bash
# Start app with mock data
npm run mock

# Open browser
http://localhost:5173

# Test as Member (can create workflows)
Login: sarah@acme.com
Password: demo123
Navigate to Workflows → See "Create Workflow" button ✅

# Test as Viewer (read-only)
Logout → Login: alice@acme.com
Navigate to Workflows → "Create Workflow" button hidden ❌
```

### RBAC Implementation Files

**Core System:**

- `src/types/rbac.ts` - Role & permission definitions (43 permissions)
- `src/hooks/usePermissions.ts` - Permission checking hook
- `src/components/common/PermissionGate.tsx` - Conditional rendering component

**Protected Pages:**

- `src/pages/workflows/WorkflowsList.tsx` - "Create Workflow" button
- `src/pages/workflows/WorkflowViewer.tsx` - "Run", "Edit", "Analytics", "Delete" buttons
- `src/pages/team/TeamPage.tsx` - "Invite Members", "Create Pool" buttons

**Mock Data:**

- `src/mocks/data/team.ts` - Team members with roles
- `src/mocks/handlers/workspace.handlers.ts` - Returns members with workspace

### Best Practices

1. **Default to Least Privilege** - Grant minimum permissions required
2. **Use Roles Appropriately** - Owner (1), Admin (2-3), Member (most), Viewer (stakeholders), Guest (external)
3. **Regular Audits** - Review roles quarterly, remove inactive members
4. **Onboarding** - Start new members as "Member" or "Viewer", promote based on trust
5. **Security** - All API endpoints validate permissions server-side; frontend checks are for UX only

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
- `POST /workspaces/:id/workflows/:workflowId/publish` - Publish draft workflow
- `POST /workspaces/:id/workflows/:workflowId/request-review` - Request review
- `GET /workspaces/:id/workflows/:workflowId/versions` - Get version history
- `POST /workspaces/:id/workflows/:workflowId/versions/:versionId/restore` - Restore version

#### Folders

- `GET /workspaces/:id/folders` - List folders
- `POST /workspaces/:id/folders` - Create folder
- `GET /workspaces/:id/folders/:folderId` - Get folder details
- `PATCH /workspaces/:id/folders/:folderId` - Update folder
- `DELETE /workspaces/:id/folders/:folderId` - Delete folder
- `POST /workspaces/:id/folders/:folderId/move` - Move folder
- `POST /workspaces/:id/workflows/:workflowId/move` - Move workflow to folder

#### Sharing

- `POST /workspaces/:id/workflows/:workflowId/share` - Share workflow
- `POST /workspaces/:id/folders/:folderId/share` - Share folder
- `GET /workspaces/:id/workflows/:workflowId/shares` - List shares
- `DELETE /workspaces/:id/workflows/:workflowId/shares/:shareId` - Remove share
- `POST /workspaces/:id/workflows/:workflowId/share-link` - Generate share link
- `DELETE /workspaces/:id/workflows/:workflowId/share-link` - Revoke share link

#### Comments

- `GET /workspaces/:id/workflows/:workflowId/comments` - List comments
- `POST /workspaces/:id/workflows/:workflowId/comments` - Add comment
- `PATCH /workspaces/:id/workflows/:workflowId/comments/:commentId` - Update comment
- `DELETE /workspaces/:id/workflows/:workflowId/comments/:commentId` - Delete comment
- `POST /workspaces/:id/workflows/:workflowId/comments/:commentId/resolve` - Resolve comment
- `POST /workspaces/:id/workflows/:workflowId/comments/:commentId/reply` - Reply to comment

#### Executions

- `GET /workspaces/:id/executions` - List executions
- `GET /workspaces/:id/executions/:executionId` - Get execution details
- `POST /workspaces/:id/executions/:executionId/cancel` - Cancel execution
- `POST /workspaces/:id/executions/:executionId/retry` - Retry execution

#### Inbox (Approvals & Tasks)

- `GET /workspaces/:id/approvals` - List inbox items
- `GET /workspaces/:id/approvals/:approvalId` - Get inbox item details
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
import { MyFeaturePage } from "./pages/myfeature/MyFeaturePage";

// Inside /app routes:
<Route path="myfeature" element={<MyFeaturePage />} />;
```

#### 3. Add Navigation

```typescript
// src/components/layout/AppLayout.tsx
const navigation = [
  // ... existing items
  {
    name: "My Feature",
    href: "/app/myfeature",
    icon: YourIcon,
  },
];
```

#### 4. Add MSW Handler (Optional)

```typescript
// src/mocks/handlers/myfeature.handlers.ts
import { http, HttpResponse, delay } from "msw";
import { config } from "../../config";

export const myFeatureHandlers = [
  http.get(`${config.apiBaseUrl}/myfeature`, async () => {
    await delay(500);
    return HttpResponse.json({
      success: true,
      data: {
        /* your data */
      },
    });
  }),
];
```

#### 5. Add Service

```typescript
// src/services/myfeature.service.ts
import { api } from "./api";

export const myFeatureService = {
  async getData() {
    const response = await api.get("/myfeature");
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

### Demo Users (with RBAC roles)

```typescript
// Owner - Full access
Email: admin@acme.com
Password: any

// Admin - Manage workflows, team
Email: john@acme.com
Password: any

// Member - Create & execute workflows
Email: sarah@acme.com
Password: any

// Viewer - Read-only + approvals
Email: alice@acme.com
Password: any

// Guest - Approvals only
Email: david@acme.com
Password: any
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
- [x] Inbox (approvals & tasks) with improved UX
- [x] AI-powered approval recommendations
- [x] Quick actions (approve/reject from list)
- [x] Smart grouping by priority
- [x] Template marketplace
- [x] Integration marketplace
- [x] Multiple integrations per app (named instances)
- [x] Audit logs
- [x] Notifications
- [x] Theme toggle (Light/Dark/System)
- [x] Responsive design
- [x] MSW integration
- [x] Complete API documentation
- [x] **RBAC System** (5 roles, 43 permissions)
- [x] Profile page
- [x] Permission-based UI rendering
- [ ] **Workflow Collaboration** (Google Drive-style)
  - [ ] Folder organization
  - [ ] Share with link/users
  - [ ] Draft & review workflow
  - [ ] Live comments
  - [ ] Version history

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

1. **Inbox (Renamed from Approvals)** - Modern inbox UI with improved UX
   - Quick actions (approve/reject from list view)
   - Smart grouping by priority (critical, high, medium, low)
   - Better filters (status, priority, search)
   - Stats cards (total, urgent, due today, AI-assisted)
   - Improved detail page with better layout
2. **RBAC System** - Complete role-based access control with 5 roles and 43 granular permissions
3. **Profile Page** - New user profile page with preferences and account information
4. **Permission-Based UI** - Buttons and features hidden/shown based on user role
5. **Workflow Analytics** - Comprehensive analytics page with charts and bottleneck detection
6. **Team Pools** - Support for assigning tasks to pools of people
7. **HR Interview Workflow** - Complete example workflow with all features
8. **Navigation Fixes** - All routes updated to use `/app` prefix
9. **Theme Improvements** - Fixed dropdown backgrounds and contrast
10. **Mock Data** - Realistic data for all features with proper roles

### Demo Users with Roles

- **admin@acme.com** - Owner (full access)
- **john@acme.com** - Admin (manage workflows, team)
- **sarah@acme.com** - Member (create & execute workflows)
- **alice@acme.com** - Viewer (read-only + approvals)
- **david@acme.com** - Guest (approvals only)

### Known Issues

- Some useEffect exhaustive-deps warnings (safe to ignore)
- TeamPage has some unused RBAC imports (non-critical)

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

## 📋 Collaboration Implementation Guide

### Phase-by-Phase Implementation Plan

#### Phase 1: Folder Organization UI (Priority: Must Have)

**Files to Create:**

```
src/pages/workflows/WorkflowsListWithFolders.tsx  # Replace WorkflowsList
src/components/workflows/FolderTree.tsx            # Folder navigation
src/components/workflows/CreateFolderModal.tsx     # Create folder
src/components/workflows/MoveToFolderModal.tsx     # Move workflow/folder
src/services/folder.service.ts                     # Folder API service
src/mocks/handlers/folder.handlers.ts              # MSW handlers
```

**Features:**

- Folder tree navigation (left sidebar)
- Breadcrumb navigation
- Drag & drop to move workflows
- Create/rename/delete folders
- Folder icons and colors

**Folder Service:**

```typescript
// src/services/folder.service.ts
export const folderService = {
  getFolders(workspaceId: string): Promise<WorkflowFolder[]>
  createFolder(workspaceId: string, data: CreateFolderData): Promise<WorkflowFolder>
  updateFolder(workspaceId: string, folderId: string, data: UpdateFolderData): Promise<WorkflowFolder>
  deleteFolder(workspaceId: string, folderId: string): Promise<void>
  moveFolder(workspaceId: string, folderId: string, parentId: string | null): Promise<void>
  moveWorkflow(workspaceId: string, workflowId: string, folderId: string | null): Promise<void>
}
```

#### Phase 2: Sharing Modal (Priority: Must Have)

**Files to Create:**

```
src/components/workflows/ShareModal.tsx            # Main sharing modal
src/components/workflows/ShareWithUsers.tsx        # Invite users
src/components/workflows/ShareWithLink.tsx         # Generate link
src/components/workflows/ShareList.tsx             # List of shares
src/services/share.service.ts                      # Share API service
src/mocks/handlers/share.handlers.ts               # MSW handlers
```

**Features:**

- Share with specific users (search & select)
- Permission dropdown (Viewer, Commenter, Editor, Owner)
- Generate shareable link
- Link settings (expiration, password)
- Remove access
- Transfer ownership

**Share Service:**

```typescript
// src/services/share.service.ts
export const shareService = {
  shareWorkflow(workspaceId: string, workflowId: string, data: ShareData): Promise<WorkflowShare>
  shareFolder(workspaceId: string, folderId: string, data: ShareData): Promise<FolderShare>
  getShares(workspaceId: string, resourceId: string, type: 'workflow' | 'folder'): Promise<Share[]>
  removeShare(workspaceId: string, shareId: string): Promise<void>
  generateShareLink(workspaceId: string, resourceId: string, data: ShareLinkData): Promise<ShareLink>
  revokeShareLink(workspaceId: string, linkId: string): Promise<void>
}
```

#### Phase 3: Live Comments (Priority: Must Have)

**Files to Create:**

```
src/components/workflows/CommentsPanel.tsx         # Comments sidebar
src/components/workflows/CommentThread.tsx         # Comment + replies
src/components/workflows/AddComment.tsx            # Add comment form
src/components/workflows/CommentBubble.tsx         # Node comment indicator
src/services/comment.service.ts                    # Comment API service
src/mocks/handlers/comment.handlers.ts             # MSW handlers
```

**Features:**

- Add comments on nodes
- Reply to comments (threaded)
- Mention users (@username)
- Resolve comments
- Comment count badges
- Real-time updates (WebSocket)

**Comment Service:**

```typescript
// src/services/comment.service.ts
export const commentService = {
  getComments(workspaceId: string, workflowId: string): Promise<WorkflowComment[]>
  addComment(workspaceId: string, workflowId: string, data: CommentData): Promise<WorkflowComment>
  updateComment(workspaceId: string, commentId: string, content: string): Promise<WorkflowComment>
  deleteComment(workspaceId: string, commentId: string): Promise<void>
  resolveComment(workspaceId: string, commentId: string): Promise<WorkflowComment>
  replyToComment(workspaceId: string, commentId: string, content: string): Promise<WorkflowComment>
}
```

#### Phase 4: Draft & Review Workflow (Priority: Should Have)

**Files to Create:**

```
src/components/workflows/DraftBadge.tsx            # Draft indicator
src/components/workflows/RequestReviewModal.tsx    # Request review
src/components/workflows/ReviewPanel.tsx           # Review UI
src/components/workflows/PublishWorkflowModal.tsx  # Publish confirmation
src/services/draft.service.ts                      # Draft API service
src/mocks/handlers/draft.handlers.ts               # MSW handlers
```

**Features:**

- Save as draft (not executable)
- Request review from users
- Review status badges
- Approve/request changes
- Publish workflow

**Draft Service:**

```typescript
// src/services/draft.service.ts
export const draftService = {
  saveDraft(workspaceId: string, workflowId: string, definition: unknown): Promise<WorkflowDraft>
  getDraft(workspaceId: string, workflowId: string): Promise<WorkflowDraft>
  publishDraft(workspaceId: string, workflowId: string): Promise<Workflow>
  requestReview(workspaceId: string, workflowId: string, reviewers: string[]): Promise<ReviewRequest[]>
  submitReview(workspaceId: string, reviewId: string, data: ReviewData): Promise<ReviewRequest>
}
```

#### Phase 5: Version History (Priority: Should Have)

**Files to Create:**

```
src/components/workflows/VersionHistoryPanel.tsx   # Version list
src/components/workflows/VersionDiff.tsx           # Compare versions
src/components/workflows/RestoreVersionModal.tsx   # Restore confirmation
src/services/version.service.ts                    # Version API service
src/mocks/handlers/version.handlers.ts             # MSW handlers
```

**Features:**

- List all versions
- View version details
- Compare versions (diff view)
- Restore previous version
- Auto-save on changes

**Version Service:**

```typescript
// src/services/version.service.ts
export const versionService = {
  getVersions(workspaceId: string, workflowId: string): Promise<WorkflowVersion[]>
  getVersion(workspaceId: string, workflowId: string, versionId: string): Promise<WorkflowVersion>
  compareVersions(workspaceId: string, workflowId: string, v1: string, v2: string): Promise<VersionDiff>
  restoreVersion(workspaceId: string, workflowId: string, versionId: string): Promise<Workflow>
}
```

#### Phase 6: Live Presence (Priority: Nice to Have)

**Files to Create:**

```
src/components/workflows/ActiveUsers.tsx           # Active user avatars
src/components/workflows/UserCursor.tsx            # Other user cursors
src/hooks/usePresence.ts                           # Presence hook
```

**Features:**

- Show active users
- Real-time cursor positions
- User avatars
- "Viewing" vs "Editing" status

### UI Components Architecture

#### Workflow Builder with Collaboration

```
WorkflowBuilder
├── TopBar
│   ├── DraftBadge (if draft)
│   ├── ActiveUsers (live presence)
│   ├── ShareButton → ShareModal
│   ├── RequestReviewButton
│   └── PublishButton
├── LeftSidebar
│   ├── FolderTree (navigation)
│   └── NodePalette
├── Canvas (React Flow)
│   ├── Nodes (with comment bubbles)
│   └── UserCursors (live presence)
└── RightSidebar (tabs)
    ├── CommentsPanel
    ├── VersionHistoryPanel
    └── PropertiesPanel
```

#### Workflows List with Folders

```
WorkflowsListWithFolders
├── Header
│   ├── Breadcrumbs
│   ├── CreateFolderButton
│   └── CreateWorkflowButton
├── LeftSidebar
│   └── FolderTree
└── MainContent
    ├── FolderCards (current folder's subfolders)
    └── WorkflowCards (current folder's workflows)
        ├── DraftBadge
        ├── CommentCount
        ├── ShareIndicator
        └── ActiveUsers
```

### Quick Start Implementation

#### Step 1: Update Workflow Type

```typescript
// src/types/workspace.ts
import { CollaborativeWorkflow } from "./collaboration";

export interface Workflow extends CollaborativeWorkflow {
  // Existing workflow fields...
}
```

#### Step 2: Update Mock Workflows

```typescript
// src/mocks/data/workflows.ts
import { mockFolders } from "./folders";
import { mockWorkflowShares } from "./shares";
import {
  mockComments,
  getTotalCommentCount,
  getUnresolvedCommentCount,
} from "./comments";

// Add folder IDs to workflows
export const mockWorkflows = [
  {
    // ... existing fields
    folderId: "folder_hr_recruitment",
    status: "published",
    shares: mockWorkflowShares.filter((s) => s.workflowId === "wf_recruitment"),
    commentCount: getTotalCommentCount("wf_recruitment"),
    unresolvedCommentCount: getUnresolvedCommentCount("wf_recruitment"),
    currentVersion: 3,
    versionCount: 5,
    activeUsers: [],
  },
  // ... more workflows
];
```

#### Step 3: Create Folder Navigation Component

```typescript
// src/components/workflows/FolderTree.tsx
import { WorkflowFolder } from "../../types/collaboration";
import { Folder, ChevronRight, ChevronDown } from "lucide-react";

export function FolderTree({ folders, onSelectFolder }: Props) {
  // Render tree with expand/collapse
  // Highlight selected folder
  // Show workflow count
}
```

#### Step 4: Update WorkflowsList

```typescript
// src/pages/workflows/WorkflowsList.tsx
import { FolderTree } from "../../components/workflows/FolderTree";
import { mockFolders } from "../../mocks/data/folders";

export function WorkflowsList() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  // Filter workflows by folder
  const filteredWorkflows = workflows.filter(
    (w) => w.folderId === selectedFolder
  );

  return (
    <div className="flex gap-6">
      <FolderTree folders={folders} onSelectFolder={setSelectedFolder} />
      <WorkflowGrid workflows={filteredWorkflows} />
    </div>
  );
}
```

### Testing Checklist

#### Folder Organization

- [ ] Create folder
- [ ] Create nested folder
- [ ] Rename folder
- [ ] Delete folder (empty)
- [ ] Delete folder (with workflows - move to parent)
- [ ] Move workflow to folder (drag & drop)
- [ ] Move folder to another folder
- [ ] Navigate folder tree
- [ ] Breadcrumb navigation
- [ ] Search workflows across folders

#### Sharing

- [ ] Share workflow with user (Viewer)
- [ ] Share workflow with user (Editor)
- [ ] Share folder with user
- [ ] Remove user access
- [ ] Generate share link
- [ ] Access workflow via share link
- [ ] Revoke share link
- [ ] Link expiration
- [ ] Inherited folder permissions

#### Comments

- [ ] Add comment on workflow
- [ ] Add comment on specific node
- [ ] Reply to comment
- [ ] Mention user (@username)
- [ ] Edit comment
- [ ] Delete comment
- [ ] Resolve comment
- [ ] View comment history
- [ ] Filter by unresolved comments

#### Draft & Review

- [ ] Save workflow as draft
- [ ] Request review from users
- [ ] Approve workflow
- [ ] Request changes
- [ ] Publish workflow
- [ ] Draft indicator visible
- [ ] Cannot execute draft workflow

#### Version History

- [ ] View version history
- [ ] View version details
- [ ] Compare two versions
- [ ] Restore previous version
- [ ] Auto-save on changes

### Design Tokens

#### Folder Colors

```typescript
const folderColors = {
  blue: "#3b82f6",
  green: "#10b981",
  purple: "#8b5cf6",
  orange: "#f59e0b",
  red: "#ef4444",
  pink: "#ec4899",
  yellow: "#eab308",
  gray: "#6b7280",
};
```

#### Permission Badge Colors

```typescript
const permissionColors = {
  owner: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  editor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  commenter: "bg-green-500/10 text-green-500 border-green-500/20",
  viewer: "bg-gray-500/10 text-gray-500 border-gray-500/20",
};
```

#### Status Badge Colors

```typescript
const statusColors = {
  draft: "bg-yellow-500/10 text-yellow-500",
  published: "bg-green-500/10 text-green-500",
  archived: "bg-gray-500/10 text-gray-500",
};
```

### Implementation Effort Estimate

| Phase               | Effort          | Priority     |
| ------------------- | --------------- | ------------ |
| Folder Organization | 8-12 hours      | Must Have    |
| Sharing Modal       | 6-8 hours       | Must Have    |
| Comments System     | 10-14 hours     | Must Have    |
| Draft & Review      | 6-8 hours       | Should Have  |
| Version History     | 8-10 hours      | Should Have  |
| Live Presence       | 6-8 hours       | Nice to Have |
| **Total**           | **44-60 hours** |              |

### Related Files

**Types:**

- `src/types/collaboration.ts` - All collaboration types

**Mock Data:**

- `src/mocks/data/folders.ts` - Folder mock data (5 sample folders)
- `src/mocks/data/shares.ts` - Share mock data (workflow & folder shares, links)
- `src/mocks/data/comments.ts` - Comment mock data (comments with replies)

**Services to Create:**

- `src/services/folder.service.ts` - Folder operations
- `src/services/share.service.ts` - Sharing operations
- `src/services/comment.service.ts` - Comment operations
- `src/services/draft.service.ts` - Draft & review operations
- `src/services/version.service.ts` - Version history operations

**MSW Handlers to Create:**

- `src/mocks/handlers/folder.handlers.ts` - Folder API endpoints
- `src/mocks/handlers/share.handlers.ts` - Share API endpoints
- `src/mocks/handlers/comment.handlers.ts` - Comment API endpoints
- `src/mocks/handlers/draft.handlers.ts` - Draft API endpoints
- `src/mocks/handlers/version.handlers.ts` - Version API endpoints

---

## 📄 License

[Your License Here]

---

**Built with ❤️ using React, TypeScript, Vite, and Tailwind CSS**

**Stop Documenting. Start Executing.** 🚀
