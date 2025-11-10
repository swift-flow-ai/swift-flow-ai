# Swift Flow AI

> **Stop Documenting. Start Executing.**

Transform your business processes from static documentation into executable, trackable workflows.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

**Open:** http://localhost:5173

### Demo Credentials (with RBAC roles)
- **Owner:** `admin@acme.com` (full access)
- **Admin:** `john@acme.com` (manage workflows, team)
- **Member:** `sarah@acme.com` (create & execute workflows)
- **Viewer:** `alice@acme.com` (read-only + inbox)
- **Guest:** `david@acme.com` (inbox only)
- **Password:** any password (MSW enabled)

---

## 📚 Documentation

- **[COMPLETE_DESIGN.md](./COMPLETE_DESIGN.md)** - Complete platform documentation
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Full API reference
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines

---

## 🎯 What is Swift Flow AI?

Swift Flow AI is an AI-native business process automation platform that helps organizations **execute and track** processes instead of just documenting them.

**Replace tools like:** Jira, Notion, Confluence for process management

**Key Features:**
- 🎨 Visual workflow builder (drag & drop)
- 🤖 AI-powered automation
- 👥 Team pools & smart assignment
- 🔐 **RBAC** (5 roles, 43 permissions)
- 📊 Real-time analytics & bottleneck detection
- 🔌 500+ integrations
- ⚡ Workflow execution tracking
- 📝 Complete audit logs

---

## 🏗️ Technology Stack

- **Frontend:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS + Framer Motion
- **State:** React Context + Custom Hooks
- **Canvas:** React Flow (workflow builder)
- **Charts:** Recharts (analytics)
- **Mocking:** MSW (Mock Service Worker)

---

## 📁 Project Structure

```
src/
├── pages/          # All application pages
├── components/     # Reusable UI components
├── contexts/       # React Context providers
├── hooks/          # Custom React hooks
├── services/       # API services
├── mocks/          # MSW handlers & mock data
├── types/          # TypeScript type definitions
└── utils/          # Helper functions
```

---

## 🎨 Key Features

### 1. Visual Workflow Builder
Drag-and-drop interface with:
- Triggers (Manual, Webhook, Schedule, etc.)
- AI Agents (GPT-4, Claude, Custom)
- Human Tasks (Approvals, Forms)
- Logic (Conditions, Loops, Routing)
- Integrations (500+ apps)

### 2. Team Pools
Assign tasks to pools instead of individuals:
- Round-robin assignment
- Load balancing
- Smart routing based on expertise
- Auto-assignment

### 3. Workflow Analytics
Comprehensive analytics for each workflow:
- Execution metrics & trends
- Bottleneck detection with AI recommendations
- Node performance analysis
- Peak time identification

### 4. RBAC (Role-Based Access Control)
**5 Roles with granular permissions:**
- **Owner** 👑 - Full control (43 permissions)
- **Admin** 🔴 - Manage workflows & team (38 permissions)
- **Member** 🔵 - Create & execute workflows (18 permissions)
- **Viewer** 🟢 - Read-only + inbox (7 permissions)
- **Guest** ⚪ - Inbox only (2 permissions)

See [COMPLETE_DESIGN.md](./COMPLETE_DESIGN.md#rbac---role-based-access-control) for full details.

### 5. Real-time Execution Tracking
- Live progress updates
- Detailed execution logs
- Error tracking & retry
- Cancel/pause workflows

### 6. Multi-Workspace Support
- Users can belong to multiple workspaces
- Easy workspace switching
- Isolated data per workspace

---

## 🛠️ Development

### Commands

```bash
npm run dev      # Start dev server (port 5173)
npm run mock     # Start dev server with MSW enabled (mock APIs)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Check code quality
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

### MSW Integration

Toggle between mock and real backend:

```bash
# Option 1: Use npm script (always mock)
npm run mock

# Option 2: Set environment variable
VITE_ENABLE_MSW=true npm run dev

# Option 3: Use .env file
# In .env: VITE_ENABLE_MSW=true
npm run dev

# Use real backend
VITE_ENABLE_MSW=false
VITE_API_BASE_URL=https://api.swiftflow.ai
```

**Recommended for development:** `npm run mock` - Guaranteed mock mode, no backend needed!

---

## 📊 Example Workflows

### HR Interview Coordination

Complete workflow demonstrating:
- Manual trigger by HR recruiter
- Candidate self-scheduling
- Smart pool assignment (interviewers)
- Approval workflow with retry
- AI agenda generation
- Calendar event creation
- Email confirmations & reminders
- Feedback form at interview start
- ATS updates

**View at:** http://localhost:5173/app/workflows/wf_recruitment

---

## 🎨 Theme Support

- **Light Mode** - Clean, bright interface
- **Dark Mode** - Easy on the eyes (default)
- **System Mode** - Follows OS preference

Toggle from top bar or settings page.

---

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Quick Contribution Guide

1. Fork the repository
2. Create your branch: `git checkout -b feature/my-feature`
3. Make changes and commit
4. Run linter: `npm run lint`
5. Build: `npm run build`
6. Push and create PR

---

## 📝 Current Status

### ✅ Completed Features

- [x] Authentication (Login, Signup, Logout)
- [x] Multi-workspace support
- [x] Team management & Pools
- [x] Dashboard with stats & activity
- [x] Workflow builder (visual canvas)
- [x] Workflow viewer & analytics
- [x] Execution tracking & history
- [x] Inbox (approvals & tasks) with improved UX
- [x] AI-powered recommendations
- [x] Template marketplace
- [x] Integration marketplace
- [x] Audit logs
- [x] Notifications
- [x] Theme toggle (Light/Dark/System)
- [x] Complete API documentation
- [x] MSW integration

---

## 📄 License

[Your License Here]

---

## 🌟 Demo

**Live Demo:** http://localhost:5173

**Credentials:**
- Email: `demo@flowai.com`
- Password: `demo123`

**Key Pages:**
- Dashboard: http://localhost:5173/app/dashboard
- Workflows: http://localhost:5173/app/workflows
- Analytics: http://localhost:5173/app/workflows/wf_recruitment/analytics
- Inbox: http://localhost:5173/app/inbox
- Team: http://localhost:5173/app/team
- Marketplace: http://localhost:5173/app/marketplace

---

**Built with ❤️ using React, TypeScript, Vite, and Tailwind CSS**

**Stop Documenting. Start Executing.** 🚀
