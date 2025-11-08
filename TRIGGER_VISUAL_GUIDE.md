# Workflow Trigger Types - Visual Guide

## 🎨 UI Overview

### Workflow Builder - Trigger Configuration

```
┌─────────────────────────────────────────────────────────────────────┐
│  ◀ Back to Workflows          Untitled Workflow          Save  ▶    │
├─────────────────────────────────────────────────────────────────────┤
│ Palette │                                                │ Config    │
│ ──────  │                                                │ ──────    │
│         │                                                │           │
│ Triggers│              ┌──────────────┐                  │ Selected  │
│  🎯 Manual             │              │                  │ Node      │
│  ⚡ Webhook            │   Trigger    │                  │           │
│  🔀 Workflow           │   Node       │                  │ Label:    │
│  ⏰ Schedule           │              │                  │ [Manual T]│
│  📧 Email              └──────────────┘                  │           │
│         │                      │                         │ Type:     │
│ Actions │                      ↓                         │ [Manual ▼]│
│  📤 Send                ┌──────────────┐                  │           │
│  📥 Receive             │              │                  │ Config:   │
│  💾 Store               │    Action    │                  │ ────────  │
│  🔄 Transform           │    Node      │                  │ Allowed:  │
│         │               └──────────────┘                  │ [users@...]│
│ Logic   │                                                │           │
│  ❓ Condition                                            │ [Info txt]│
│  ✅ Approval                                             │           │
│         │                                                │           │
└─────────┴────────────────────────────────────────────────┴───────────┘
```

---

## 📋 Trigger Type Configurations

### 1️⃣ Manual Trigger

```
┌────────────────────────────────────┐
│ ⚙️ Trigger Configuration          │
├────────────────────────────────────┤
│                                    │
│ Label:                             │
│ ┌────────────────────────────────┐ │
│ │ Manual Trigger                 │ │
│ └────────────────────────────────┘ │
│                                    │
│ Description:                       │
│ ┌────────────────────────────────┐ │
│ │ Start workflow manually        │ │
│ └────────────────────────────────┘ │
│                                    │
│ Trigger Type: ⭐                   │
│ ┌────────────────────────────────┐ │
│ │ Manual (by users)          ▼ │ │
│ └────────────────────────────────┘ │
│                                    │
│ Allowed Users:                     │
│ ┌────────────────────────────────┐ │
│ │ user@example.com, user2@...   │ │
│ └────────────────────────────────┘ │
│ ℹ️ Leave empty to allow all        │
│    workspace members               │
│                                    │
└────────────────────────────────────┘
```

### 2️⃣ Webhook Trigger

```
┌────────────────────────────────────┐
│ ⚙️ Trigger Configuration          │
├────────────────────────────────────┤
│                                    │
│ Trigger Type:                      │
│ ┌────────────────────────────────┐ │
│ │ Webhook (HTTP)             ▼ │ │
│ └────────────────────────────────┘ │
│                                    │
│ HTTP Method:                       │
│ ┌────────────────────────────────┐ │
│ │ POST                       ▼ │ │
│ └────────────────────────────────┘ │
│                                    │
│ Webhook URL:                       │
│ ┌────────────────────┬───────────┐ │
│ │ /webhooks/my-flow  │ Copy      │ │
│ └────────────────────┴───────────┘ │
│ ℹ️ Full URL:                       │
│ https://api.swiftflow.ai           │
│    /webhooks/my-workflow           │
│                                    │
└────────────────────────────────────┘
```

### 3️⃣ Workflow Complete Trigger

```
┌────────────────────────────────────┐
│ ⚙️ Trigger Configuration          │
├────────────────────────────────────┤
│                                    │
│ Trigger Type:                      │
│ ┌────────────────────────────────┐ │
│ │ After Workflow Completes   ▼ │ │
│ └────────────────────────────────┘ │
│                                    │
│ Source Workflow:                   │
│ ┌────────────────────────────────┐ │
│ │ Employee Onboarding        ▼ │ │
│ └────────────────────────────────┘ │
│ ℹ️ This workflow will start when   │
│    the selected workflow completes │
│                                    │
│ Available Workflows:               │
│ • Employee Onboarding              │
│ • Customer Onboarding              │
│ • Invoice Processing               │
│                                    │
└────────────────────────────────────┘
```

### 4️⃣ Schedule Trigger

```
┌────────────────────────────────────┐
│ ⚙️ Trigger Configuration          │
├────────────────────────────────────┤
│                                    │
│ Trigger Type:                      │
│ ┌────────────────────────────────┐ │
│ │ Schedule (Cron)            ▼ │ │
│ └────────────────────────────────┘ │
│                                    │
│ Schedule Type:                     │
│ ┌────────────────────────────────┐ │
│ │ Cron Expression            ▼ │ │
│ └────────────────────────────────┘ │
│                                    │
│ Cron Expression:                   │
│ ┌────────────────────────────────┐ │
│ │ 0 9 * * 1-5                   │ │
│ └────────────────────────────────┘ │
│ ℹ️ Example: Every weekday at 9 AM  │
│                                    │
│ Common Patterns:                   │
│ • 0 9 * * 1-5  - Weekdays 9 AM     │
│ • 0 0 1 * *    - Monthly 1st       │
│ • */15 * * * * - Every 15 mins     │
│                                    │
└────────────────────────────────────┘
```

### 5️⃣ Email Trigger (Coming Soon)

```
┌────────────────────────────────────┐
│ ⚙️ Trigger Configuration          │
├────────────────────────────────────┤
│                                    │
│ Trigger Type:                      │
│ ┌────────────────────────────────┐ │
│ │ Email Received             ▼ │ │
│ └────────────────────────────────┘ │
│                                    │
│ Email Address:                     │
│ ┌────────────────────┬───────────┐ │
│ │ workflow@swift...  │ Copy      │ │
│ └────────────────────┴───────────┘ │
│                                    │
│ Sender Whitelist:                  │
│ ┌────────────────────────────────┐ │
│ │ @company.com, @partner.com    │ │
│ └────────────────────────────────┘ │
│                                    │
│ ℹ️ Only emails from whitelisted    │
│    addresses will trigger workflow │
│                                    │
└────────────────────────────────────┘
```

---

## 🎯 Node Palette - Trigger Section

```
┌─────────────────────────────────┐
│ Node Palette                    │
├─────────────────────────────────┤
│                                 │
│ TRIGGERS                        │
│ ────────                        │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 🎯 Manual Trigger           │ │
│ │ Start manually by users     │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ ⚡ Webhook                  │ │
│ │ Trigger via HTTP webhook    │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 🔀 Workflow Complete        │ │
│ │ After another workflow ends │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ ⏰ Schedule                 │ │
│ │ Run on a schedule           │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 📧 Email Received           │ │
│ │ Trigger on new email        │ │
│ └─────────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
```

---

## 🔄 Example Workflow Chains

### Example 1: Employee Onboarding → IT Setup → Welcome

```
┌────────────────────┐
│   Manual Trigger   │ ← HR Admin starts
│  (HR Admin only)   │
└──────────┬─────────┘
           │
           ↓
┌────────────────────┐
│   Generate Plan    │
│    (AI Agent)      │
└──────────┬─────────┘
           │
           ↓
┌────────────────────┐
│  Manager Approval  │
└──────────┬─────────┘
           │
           ↓ (on approval)
┌────────────────────┐
│  Complete          │
└──────────┬─────────┘
           │
           ↓ (triggers next workflow)
┌────────────────────┐
│ Workflow Complete  │ ← IT Setup Workflow
│    Trigger         │
└──────────┬─────────┘
           │
           ↓
┌────────────────────┐
│  Create Accounts   │
│  Assign Equipment  │
└──────────┬─────────┘
           │
           ↓ (triggers next workflow)
┌────────────────────┐
│ Workflow Complete  │ ← Welcome Email
│    Trigger         │
└──────────┬─────────┘
           │
           ↓
┌────────────────────┐
│  Send Welcome      │
│  Email + Slack     │
└────────────────────┘
```

### Example 2: Webhook Integration

```
External System          Swift Flow AI
──────────────          ─────────────

     CRM
      │
      │ POST /webhooks/lead
      │ { lead: {...} }
      ↓
┌────────────────────┐
│  Webhook Trigger   │
└──────────┬─────────┘
           │
           ↓
┌────────────────────┐
│  Enrich Lead Data  │
│    (API Calls)     │
└──────────┬─────────┘
           │
           ↓
┌────────────────────┐
│ AI Lead Scoring    │
└──────────┬─────────┘
           │
      ┌────┴────┐
      │         │
High Score   Low Score
      │         │
      ↓         ↓
  [Notify]  [Nurture]
  [Sales]   [Campaign]
```

### Example 3: Scheduled Report

```
Time                     Swift Flow AI
────                     ─────────────

Daily 9 AM
    │
    ↓
┌────────────────────┐
│ Schedule Trigger   │
│  (Cron: 0 9 * * *) │
└──────────┬─────────┘
           │
           ↓
┌────────────────────┐
│  Fetch Data from   │
│  Multiple Sources  │
└──────────┬─────────┘
           │
           ↓
┌────────────────────┐
│  AI Analysis &     │
│  Insights          │
└──────────┬─────────┘
           │
           ↓
┌────────────────────┐
│  Generate PDF      │
└──────────┬─────────┘
           │
      ┌────┴────┐
      │         │
      ↓         ↓
   [Slack]   [Email]
   [Team]    [Execs]
```

---

## 🎨 Color & Icon Legend

| Icon | Trigger Type        | Color | Use Case                    |
|------|---------------------|-------|-----------------------------|
| 🎯   | Manual              | Blue  | User-initiated workflows    |
| ⚡   | Webhook             | Blue  | External integrations       |
| 🔀   | Workflow Complete   | Blue  | Workflow orchestration      |
| ⏰   | Schedule            | Blue  | Time-based automation       |
| 📧   | Email               | Blue  | Email-based triggers        |

---

## 📱 Responsive Design

### Desktop (1920x1080)
```
├─ Palette (280px) ─┤├────── Canvas (1360px) ──────┤├─ Config (280px) ─┤
```

### Tablet (768px)
```
├─ Palette (240px) ─┤├──── Canvas (528px) ────┤
                     Config panel overlays on selection
```

### Mobile (< 768px)
```
Full-width canvas with floating palette and config modals
```

---

## 🚀 User Journey

### Creating a Workflow with Trigger

1. **Navigate to Workflows**
   - Click "Workflows" in sidebar
   - See list of existing workflows

2. **Create New Workflow**
   - Click "Create Workflow" button
   - Navigate to workflow builder

3. **Default Trigger**
   - Canvas starts with Manual Trigger node
   - Click to configure

4. **Configure Trigger**
   - Select trigger type from dropdown
   - Fill type-specific configuration
   - See real-time updates

5. **Add More Nodes**
   - Drag actions, conditions, approvals
   - Connect nodes with edges
   - Build complete workflow

6. **Save Workflow**
   - Click "Save" button
   - Name workflow
   - Activate or keep as draft

7. **Test Trigger**
   - Manual: Click "Run Workflow"
   - Webhook: Send test HTTP request
   - Schedule: View next execution time
   - Workflow Complete: Complete parent workflow

---

## ✅ Accessibility

- **Keyboard Navigation:** Tab through trigger types
- **Screen Reader Support:** ARIA labels on all inputs
- **High Contrast:** Dark/Light themes supported
- **Focus Indicators:** Visible focus states
- **Error Messages:** Clear validation feedback

---

## 🎯 Success Metrics

### User Experience
- ✅ Trigger type selection < 3 clicks
- ✅ Configuration intuitive (no docs needed)
- ✅ Visual feedback on trigger status
- ✅ Clear error messages

### Technical
- ✅ Zero TypeScript errors
- ✅ Build time < 3 seconds
- ✅ Bundle size optimized
- ✅ MSW integration working

### Business
- ✅ Support all major trigger patterns
- ✅ Enable workflow orchestration
- ✅ External system integration
- ✅ Scheduled automation

---

This visual guide complements the technical documentation in `WORKFLOW_TRIGGERS.md` and provides a clear understanding of the UI implementation.

