# FlowAI - Complete Design Documentation

## 🎯 Platform Overview

**FlowAI** is an AI-native business process automation SaaS platform where users can:

- **Visually design workflows** using drag-and-drop interface
- **Add AI agents as workflow nodes** (GPT-4, Claude, custom agents)
- **Integrate apps & MCP servers** from marketplace as nodes
- **Set human approval/review points** as nodes in the workflow
- **Collaborate in workspaces** (like Slack - users can be in multiple workspaces)
- **Monitor, analyze, and optimize** workflows with AI-powered insights

---

## 📐 Core Concept: Visual Workflow Designer

Users build workflows by **dragging nodes onto a canvas and connecting them**:

```
Available Node Types (Drag & Drop):
├── 🔵 Triggers (Webhook, Schedule, Manual, Email)
├── 🤖 AI Agents (GPT-4, Claude, Custom AI)
├── ✅ Human Tasks (Approval, Review, Form Fill)
├── 🔀 Logic (If/Then, Loop, Switch, Wait)
├── 🧠 Smart Routing (AI-powered intelligent routing)
├── 🔌 Integrations (Slack, Email, Database, 500+ apps)
├── 🔧 MCP Servers (Custom tools from marketplace)
├── 📊 Data Operations (Transform, Filter, Aggregate)
└── 📤 Actions (Send Email, Save DB, Notify, API Call)
```

**Example: User creating an approval workflow:**

1. Drag "Webhook Trigger" node → Canvas
2. Drag "AI Agent (GPT-4)" node → Connect to trigger
3. Drag "Human Approval" node → Connect to AI agent
4. Drag "If/Then" node → Connect to approval (branch on approve/reject)
5. Drag "Slack Notification" → Connect to approved branch
6. Configure each node, test, deploy!

---

## 🎨 Visual Workflow Builder Interface

### **Main Builder Screen:**

```
┌────────────────────────────────────────────────────────────────────────────┐
│ FlowAI - Employee Onboarding Workflow              [Save] [Test] [Deploy]  │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ LEFT PANEL: NODE LIBRARY (Drag from here)                                  │
│ ┌─────────────────────────────┐                                           │
│ │ 🔍 Search nodes...          │                                           │
│ ├─────────────────────────────┤                                           │
│ │ 🔵 TRIGGERS                 │                                           │
│ │   📡 Webhook                │  ← Drag these                            │
│ │   ⏰ Schedule (Cron)        │     onto                                 │
│ │   👆 Manual Trigger         │     canvas →                             │
│ │   📧 Email Received         │                                           │
│ │                             │                                           │
│ │ 🤖 AI AGENTS                │                                           │
│ │   🧠 GPT-4 Agent            │                                           │
│ │   🤖 Claude Agent           │                                           │
│ │   ⚡ Custom AI Agent        │                                           │
│ │   📄 Document Analyzer      │                                           │
│ │   🔍 Data Extractor         │                                           │
│ │                             │                                           │
│ │ ✅ HUMAN TASKS              │                                           │
│ │   👤 Approval Request       │                                           │
│ │   📝 Form Fill              │                                           │
│ │   👁️ Review Task            │                                           │
│ │   ✍️ Manual Task            │                                           │
│ │                             │                                           │
│ │ 🔀 LOGIC & CONTROL          │                                           │
│ │   🔀 If/Then/Else           │                                           │
│ │   🔄 Loop                   │                                           │
│ │   ⏸️ Wait/Delay             │                                           │
│ │   🔗 Parallel Split         │                                           │
│ │   🔗 Merge Paths            │                                           │
│ │                             │                                           │
│ │ 🧠 SMART ROUTING            │                                           │
│ │   🎯 AI Router              │                                           │
│ │   👥 Load Balancer          │                                           │
│ │   📊 Priority Router        │                                           │
│ │   🎰 Round Robin            │                                           │
│ │   ⚖️ Weighted Distribution  │                                           │
│ │                             │                                           │
│ │ 🔌 INTEGRATIONS             │                                           │
│ │   💬 Slack                  │                                           │
│ │   📧 Gmail/Outlook          │                                           │
│ │   📊 Google Sheets          │                                           │
│ │   💳 Stripe                 │                                           │
│ │   🗄️ PostgreSQL            │                                           │
│ │   📦 Airtable               │                                           │
│ │   [Browse 500+ more...]     │                                           │
│ │                             │                                           │
│ │ 🔧 MCP SERVERS              │                                           │
│ │   🛠️ Custom Tool Server     │                                           │
│ │   🔍 Web Search MCP         │                                           │
│ │   📁 File System MCP        │                                           │
│ │   [Browse marketplace...]   │                                           │
│ │                             │                                           │
│ │ 📊 DATA OPERATIONS          │                                           │
│ │   🔄 Transform Data         │                                           │
│ │   🎯 Filter                 │                                           │
│ │   📊 Aggregate              │                                           │
│ │                             │                                           │
│ │ 📤 ACTIONS                  │                                           │
│ │   📧 Send Email             │                                           │
│ │   💬 Post to Slack          │                                           │
│ │   💾 Save to Database       │                                           │
│ │   🔔 Send Notification      │                                           │
│ │   🌐 API Request            │                                           │
│ └─────────────────────────────┘                                           │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ CENTER: CANVAS (Drop nodes here & connect them)                            │
│                                                                             │
│   [User builds workflow by dragging nodes from left panel]                 │
│                                                                             │
│   Example workflow built by user:                                          │
│                                                                             │
│   ┌──────────────────────────┐                                            │
│   │ 📡 Webhook Trigger       │                                            │
│   │ When: New hire data      │                                            │
│   └────────┬─────────────────┘                                            │
│            │                                                               │
│            ↓                                                               │
│   ┌──────────────────────────┐                                            │
│   │ 🧠 AI Agent: GPT-4       │                                            │
│   │ Task: Generate plan      │                                            │
│   │ Confidence: 95%          │                                            │
│   └────────┬─────────────────┘                                            │
│            │                                                               │
│            ↓                                                               │
│   ┌──────────────────────────┐                                            │
│   │ 👤 Human Approval        │                                            │
│   │ Approver: Manager        │                                            │
│   │ SLA: 4 hours             │                                            │
│   └────────┬─────────────────┘                                            │
│            │                                                               │
│            ↓                                                               │
│   ┌──────────────────────────┐                                            │
│   │ 🔀 If: Approved?         │                                            │
│   └────┬──────────────┬──────┘                                            │
│        │ Yes          │ No                                                │
│        ↓              ↓                                                    │
│   ┌────────────┐  ┌────────────┐                                          │
│   │ 🔗 Parallel│  │ 📧 Notify  │                                          │
│   │ Split      │  │ HR Team    │                                          │
│   └──┬──┬──┬───┘  └────────────┘                                          │
│      │  │  │                                                               │
│      ↓  ↓  ↓                                                               │
│   [IT][HR][Security]  ← More nodes added by user                          │
│      │  │  │                                                               │
│      └──┴──┘                                                               │
│         ↓                                                                  │
│   ┌──────────────────────────┐                                            │
│   │ 🔗 Wait All Complete     │                                            │
│   └────────┬─────────────────┘                                            │
│            ↓                                                               │
│   ┌──────────────────────────┐                                            │
│   │ 💬 Send Slack Message    │                                            │
│   │ Channel: #announcements  │                                            │
│   └──────────────────────────┘                                            │
│                                                                             │
│   [Users can zoom in/out, pan canvas, select/delete nodes]                │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ RIGHT PANEL: NODE CONFIGURATION (When node selected)                       │
│                                                                             │
│ ┌─────────────────────────────────────────────┐                          │
│ │ 🧠 AI Agent: GPT-4 - Plan Generator         │                          │
│ ├─────────────────────────────────────────────┤                          │
│ │                                             │                          │
│ │ Display Name:                               │                          │
│ │ ┌─────────────────────────────────────────┐ │                          │
│ │ │ Onboarding Plan Generator               │ │                          │
│ │ └─────────────────────────────────────────┘ │                          │
│ │                                             │                          │
│ │ AI Model:                                   │                          │
│ │ ◉ GPT-4o  ○ Claude 3.5  ○ Gemini Pro       │                          │
│ │                                             │                          │
│ │ System Prompt:                              │                          │
│ │ ┌─────────────────────────────────────────┐ │                          │
│ │ │ You are an expert HR onboarding        │ │                          │
│ │ │ coordinator. Based on the employee     │ │                          │
│ │ │ details provided, generate a           │ │                          │
│ │ │ comprehensive onboarding plan.         │ │                          │
│ │ │                                         │ │                          │
│ │ │ Input variables:                        │ │                          │
│ │ │ - {{employee.name}}                     │ │                          │
│ │ │ - {{employee.role}}                     │ │                          │
│ │ │ - {{employee.department}}               │ │                          │
│ │ │ - {{employee.startDate}}                │ │                          │
│ │ │                                         │ │                          │
│ │ │ Generate JSON with:                     │ │                          │
│ │ │ - Timeline (pre-boarding to day 90)    │ │                          │
│ │ │ - Tasks for each stakeholder           │ │                          │
│ │ │ - Suggested equipment                   │ │                          │
│ │ │ - Training modules                      │ │                          │
│ │ └─────────────────────────────────────────┘ │                          │
│ │                                             │                          │
│ │ Input Data (from previous node):            │                          │
│ │ ☑ webhook.body.employee                    │                          │
│ │                                             │                          │
│ │ Output Variable Name:                       │                          │
│ │ ┌─────────────────────────────────────────┐ │                          │
│ │ │ onboardingPlan                          │ │                          │
│ │ └─────────────────────────────────────────┘ │                          │
│ │                                             │                          │
│ │ Advanced Settings:                          │                          │
│ │ Temperature: [====|-----] 0.7               │                          │
│ │ Max Tokens: 2000                            │                          │
│ │ Confidence Threshold: 80%                   │                          │
│ │                                             │                          │
│ │ Error Handling:                             │                          │
│ │ On Failure: [Retry 3x then notify admin ▼] │                          │
│ │                                             │                          │
│ │ [Test Node] [Save] [Delete Node]            │                          │
│ └─────────────────────────────────────────────┘                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

Bottom Toolbar:
├── 🔍 Zoom [50% 75% 100% 150% 200%]
├── ↩️ Undo  ↪️ Redo
├── 💾 Auto-save: Last saved 30s ago
├── 🤖 AI Assistant [Chat to get help]
└── 📊 View Analytics
```

---

## 🧠 Smart Routing - AI-Powered Intelligent Routing

### **What is Smart Routing?**

Smart Routing nodes intelligently route workflow execution to different paths based on AI analysis, load balancing, priority, or custom rules. Instead of simple if/then logic, Smart Routing uses ML to make intelligent decisions.

### **Smart Routing Node Types:**

#### **1. 🎯 AI Router**

Routes based on AI analysis of content/context.

**Use Cases:**

- Route support tickets to right department based on content
- Assign tasks to best-suited team member based on skills
- Route approvals to appropriate manager based on amount/type
- Direct documents to right processor based on document type

**Example Configuration:**

```
┌─────────────────────────────────────────────┐
│ 🎯 AI Router Configuration                  │
├─────────────────────────────────────────────┤
│ Route Based On: [Content Analysis ▼]       │
│                                             │
│ AI Model: GPT-4 (for routing decisions)    │
│                                             │
│ Routing Logic:                              │
│ ┌─────────────────────────────────────────┐ │
│ │ Analyze the incoming support ticket    │ │
│ │ and route to:                           │ │
│ │                                         │ │
│ │ - Technical Support: If technical issue│ │
│ │ - Billing: If payment/invoice related  │ │
│ │ - Sales: If upgrade/new feature request│ │
│ │ - General: If unclear or multi-topic   │ │
│ │                                         │ │
│ │ Consider:                               │ │
│ │ - Ticket urgency                        │ │
│ │ - Customer tier (Free/Pro/Enterprise)  │ │
│ │ - Historical routing for similar cases │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ Output Paths (4):                           │
│ ├─ Technical Support                        │
│ ├─ Billing                                  │
│ ├─ Sales                                    │
│ └─ General                                  │
│                                             │
│ Confidence Threshold: 80%                   │
│ If below threshold: Route to General        │
│                                             │
│ [Test Routing] [Save]                       │
└─────────────────────────────────────────────┘

Workflow Visualization:
[Support Ticket Received]
         │
         ↓
[🎯 AI Router: Analyze & Route]
         │
    ┌────┼────┬────────┐
    │    │    │        │
    ↓    ↓    ↓        ↓
[Tech] [Billing] [Sales] [General]
```

#### **2. 👥 Load Balancer**

Distributes work evenly across team members or systems.

**Use Cases:**

- Distribute approvals among available approvers
- Balance work across AI agents to avoid rate limits
- Assign tasks to least busy team member
- Route requests to available API endpoints

**Example Configuration:**

```
┌─────────────────────────────────────────────┐
│ 👥 Load Balancer Configuration              │
├─────────────────────────────────────────────┤
│ Balance Across:                             │
│ ☑ Team Members                              │
│                                             │
│ Team: Approval Managers                     │
│ ├─ John Smith (Available)                   │
│ ├─ Sarah Lee (Available)                    │
│ ├─ Mike Brown (Busy - 5 pending)            │
│ └─ Lisa Chen (On PTO)                       │
│                                             │
│ Strategy: [Least Busy ▼]                    │
│   Options:                                  │
│   • Least Busy (fewest pending tasks)       │
│   • Round Robin (rotate evenly)             │
│   • Weighted (by skill/experience)          │
│   • Fastest Response (historical avg)       │
│                                             │
│ Consider:                                   │
│ ☑ Current workload                          │
│ ☑ Availability status                       │
│ ☑ Historical performance                    │
│ ☑ Skills match (if applicable)              │
│                                             │
│ Fallback: If no one available               │
│ [Queue for next available ▼]                │
│                                             │
│ [Test Balance] [Save]                       │
└─────────────────────────────────────────────┘

Workflow Visualization:
[Approval Request]
         │
         ↓
[👥 Load Balancer: Find Best Approver]
         │
    ┌────┼────┬────────┐
    │    │    │        │
    ↓    ↓    ↓        ↓
[John] [Sarah] [Mike] [Queue]
(0)    (1)     (5)
```

#### **3. 📊 Priority Router**

Routes based on priority/urgency with SLA tracking.

**Use Cases:**

- Escalate urgent requests to senior staff
- Route high-value deals to experienced sales reps
- Fast-track VIP customer requests
- Prioritize critical system alerts

**Example Configuration:**

```
┌─────────────────────────────────────────────┐
│ 📊 Priority Router Configuration            │
├─────────────────────────────────────────────┤
│ Priority Determination:                     │
│ ◉ AI-Based (analyze and assign priority)   │
│ ○ Rule-Based (use explicit rules)           │
│ ○ Input Field (priority in data)            │
│                                             │
│ AI Priority Analysis:                       │
│ ┌─────────────────────────────────────────┐ │
│ │ Analyze request and assign priority:   │ │
│ │                                         │ │
│ │ 🔴 Critical (P0):                       │ │
│ │ - System down                           │ │
│ │ - Security breach                       │ │
│ │ - Revenue-blocking issue                │ │
│ │ → Route to: On-call team (immediate)   │ │
│ │                                         │ │
│ │ 🟠 High (P1):                           │ │
│ │ - Enterprise customer issue             │ │
│ │ - Major feature broken                  │ │
│ │ → Route to: Senior team (SLA: 1 hour)  │ │
│ │                                         │ │
│ │ 🟡 Medium (P2):                         │ │
│ │ - Standard customer request             │ │
│ │ - Non-critical bug                      │ │
│ │ → Route to: Regular team (SLA: 4 hours)│ │
│ │                                         │ │
│ │ 🟢 Low (P3):                            │ │
│ │ - Feature request                       │ │
│ │ - General inquiry                       │ │
│ │ → Route to: Junior team (SLA: 24 hours)│ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ SLA Tracking:                               │
│ ☑ Enable SLA monitoring                    │
│ ☑ Auto-escalate on SLA breach               │
│ ☑ Notify manager if approaching deadline    │
│                                             │
│ Escalation Path:                            │
│ Junior → Regular → Senior → Manager         │
│                                             │
│ [Test Priority] [Save]                      │
└─────────────────────────────────────────────┘

Workflow Visualization:
[Incoming Request]
         │
         ↓
[📊 Priority Router: Analyze & Prioritize]
         │
    ┌────┼────┬────────┬────────┐
    │    │    │        │        │
    ↓    ↓    ↓        ↓        ↓
[P0:  [P1:   [P2:     [P3:     [Unknown]
 On-   Senior Regular Junior   Default
 Call] Team]  Team]   Team]    Path]
 ⏱️1h  ⏱️4h   ⏱️24h
```

#### **4. 🎰 Round Robin Router**

Rotates assignments evenly across team/resources.

**Use Cases:**

- Fairly distribute incoming leads to sales team
- Rotate code reviews among developers
- Evenly assign support tickets
- Distribute training opportunities

**Example Configuration:**

```
┌─────────────────────────────────────────────┐
│ 🎰 Round Robin Configuration                │
├─────────────────────────────────────────────┤
│ Rotate Among:                               │
│ ☑ Sales Team                                │
│   ├─ Alex Johnson                           │
│   ├─ Maria Garcia                           │
│   ├─ Tom Wilson                             │
│   └─ Emma Davis                             │
│                                             │
│ Current Position: Maria Garcia (next)       │
│                                             │
│ Options:                                    │
│ ☑ Skip if unavailable (on PTO/busy)        │
│ ☑ Reset rotation: [Monthly ▼]              │
│ ☐ Weight by capacity (handle more/less)    │
│                                             │
│ History (Last 10):                          │
│ Alex → Maria → Tom → Emma → Alex → ...     │
│                                             │
│ [Reset Rotation] [Save]                     │
└─────────────────────────────────────────────┘
```

#### **5. ⚖️ Weighted Distribution Router**

Distributes based on custom weights/percentages.

**Use Cases:**

- A/B testing (70% route A, 30% route B)
- Gradual rollout of new process
- Skill-based distribution (experts get complex cases)
- Region-based routing

**Example Configuration:**

```
┌─────────────────────────────────────────────┐
│ ⚖️ Weighted Distribution Configuration      │
├─────────────────────────────────────────────┤
│ Distribute By: [Custom Weights ▼]          │
│                                             │
│ Paths & Weights:                            │
│ ┌─────────────────────────────────────────┐ │
│ │ Path A: New Onboarding Process          │ │
│ │ Weight: [========|--] 80%               │ │
│ │ Description: Automated AI-first flow    │ │
│ ├─────────────────────────────────────────┤ │
│ │ Path B: Legacy Onboarding               │ │
│ │ Weight: [==|--------] 20%               │ │
│ │ Description: Manual HR-led process      │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ Total: 100% ✓                               │
│                                             │
│ Use Case: [Gradual Migration ▼]            │
│                                             │
│ Options:                                    │
│ ☑ Track conversion metrics per path        │
│ ☑ Adjust weights based on performance      │
│ ☐ Time-based weights (different per day)   │
│                                             │
│ Current Distribution (Last 100):            │
│ Path A: 82 (82%)  ✓ Within target          │
│ Path B: 18 (18%)  ✓ Within target          │
│                                             │
│ [Auto-optimize] [Save]                      │
└─────────────────────────────────────────────┘

Workflow Visualization:
[New Employee Onboarding]
         │
         ↓
[⚖️ Weighted Router: 80/20 Split]
         │
    ┌────┴────┐
    │ 80%     │ 20%
    ↓         ↓
[New AI    [Legacy
 Process]   Process]
```

---

### **🎯 Smart Routing Use Cases**

#### **Use Case 1: Intelligent Support Ticket Routing**

```
[Email: Support Ticket]
         │
         ↓
[🧠 AI Agent: Extract Details]
├── Subject, body, attachments
├── Customer info, tier
└── Sentiment analysis
         │
         ↓
[🎯 AI Router: Determine Department]
├── Analyzes content
├── Checks customer history
└── Considers urgency
         │
    ┌────┼────┬────────┬────────┐
    │    │    │        │        │
    ↓    ↓    ↓        ↓        ↓
[Tech] [Billing] [Sales] [Product]
    │
    ↓
[📊 Priority Router: Assign Urgency]
    │
  ┌─┴─┬──────┐
  │   │      │
  ↓   ↓      ↓
[P0] [P1]  [P2]
  │
  ↓
[👥 Load Balancer: Assign Agent]
  │
  └──> Least busy available agent
```

#### **Use Case 2: Approval Routing with Escalation**

```
[Purchase Request: $15,000]
         │
         ↓
[📊 Priority Router: Determine Level]
├── Amount-based routing:
│   ├── < $1,000: Team Lead
│   ├── $1K-$10K: Manager
│   ├── $10K-$50K: Director
│   └── > $50K: VP + CFO
│
├── This case: $15,000 → Director
└── SLA: 4 hours
         │
         ↓
[👥 Load Balancer: Select Director]
├── Check availability
├── Current workload
└── Assign to: Sarah Lee
         │
         ↓
[👤 Human Approval: Sarah Lee]
         │
    ┌────┴────┐
    │ Approve │ Takes > 4 hours (SLA breach)
    │         │
    │         ↓
    │    [🔔 Auto-Escalate]
    │         │
    │         ↓
    │    [👤 Approval: VP Fallback]
    ↓
[✅ Approved] → Continue workflow
```

#### **Use Case 3: Lead Distribution**

```
[New Lead: Inbound Form]
         │
         ↓
[🧠 AI Agent: Lead Scoring]
├── Company size
├── Industry
├── Budget indication
├── Urgency signals
└── Score: 85/100 (High value)
         │
         ↓
[🎯 AI Router: Territory & Expertise]
├── Geographic: West Coast
├── Industry: SaaS
├── Deal size: Enterprise
└── Route to: Enterprise Sales Team
         │
         ↓
[⚖️ Weighted Distribution: By Performance]
├── Sarah (Top performer): 40%
├── John (High performer): 30%
├── Lisa (Medium): 20%
├── Mike (Training): 10%
         │
         └──> Assigned to: Sarah
              │
              ↓
         [🔔 Notify Sarah]
         [📧 Auto-send Introduction Email]
         [📅 Schedule Follow-up Task]
```

#### **Use Case 4: Content Approval Workflow**

```
[Blog Post Submitted]
         │
         ↓
[🧠 AI Agent: Content Analysis]
├── Topic category
├── Sensitivity check
├── Compliance scan
├── Quality score
└── Target audience
         │
         ↓
[🎯 AI Router: Approval Path]
├── Standard content → Editor only
├── Technical content → Editor + Tech Lead
├── Marketing content → Editor + Marketing Manager
├── Sensitive/Legal → Editor + Legal + Manager
└── High-value/Strategic → All + VP
         │
         └──> This post: Marketing content
              │
              ↓
         [🔗 Parallel Split]
              │
         ┌────┴────┐
         │         │
         ↓         ↓
    [Editor]  [Marketing Mgr]
         │         │
         └────┬────┘
              │
              ↓
         [🔗 Merge: All Approved?]
              │
         ┌────┴────┐
         │ Yes     │ No
         ↓         ↓
    [Publish]  [Revisions Needed]
```

---

### **📊 Smart Routing Analytics**

**Routing Performance Dashboard:**

```
┌────────────────────────────────────────────────────────────────────────────┐
│ Smart Routing Analytics - Support Ticket Router                            │
│ Last 30 Days                                                               │
└────────────────────────────────────────────────────────────────────────────┘

ROUTING ACCURACY:
┌──────────────────────────────────────────────────────────────────────────┐
│ AI Router Accuracy: 94.3%                                                │
│ ├── Correctly routed (no reassignment): 1,087 / 1,153                   │
│ ├── Reassigned after initial route: 66 (5.7%)                           │
│ └── AI Confidence > 90% → 98.5% accuracy                                 │
│                                                                           │
│ Top Routing Paths:                                                        │
│ 1. Technical Support: 524 tickets (45.4%)                                │
│ 2. Billing: 312 tickets (27.0%)                                          │
│ 3. Sales: 198 tickets (17.2%)                                            │
│ 4. General: 119 tickets (10.3%)                                          │
└──────────────────────────────────────────────────────────────────────────┘

LOAD BALANCING EFFECTIVENESS:
┌──────────────────────────────────────────────────────────────────────────┐
│ Distribution Across Team Members:                                         │
│                                                                           │
│ Sarah Lee:     215 tickets [████████████████░░] 41% (Target: 40%)       │
│ John Smith:    198 tickets [██████████████░░░░] 38% (Target: 40%)       │
│ Mike Brown:     89 tickets [████████░░░░░░░░░░] 17% (Target: 20%)       │
│ Lisa Chen:      21 tickets [███░░░░░░░░░░░░░░░]  4% (On PTO)            │
│                                                                           │
│ Balance Score: 92/100 (Excellent)                                        │
│ Avg Response Time: 2.3 hours (Target: 4 hours) ✓                        │
└──────────────────────────────────────────────────────────────────────────┘

PRIORITY ROUTING IMPACT:
┌──────────────────────────────────────────────────────────────────────────┐
│ SLA Compliance by Priority:                                              │
│                                                                           │
│ 🔴 P0 (Critical):  28 tickets → 27 met SLA (96.4%) ⏱️ Avg: 15 mins     │
│ 🟠 P1 (High):     156 tickets → 142 met SLA (91.0%) ⏱️ Avg: 45 mins    │
│ 🟡 P2 (Medium):   687 tickets → 623 met SLA (90.7%) ⏱️ Avg: 3.2 hours  │
│ 🟢 P3 (Low):      282 tickets → 271 met SLA (96.1%) ⏱️ Avg: 18 hours   │
│                                                                           │
│ Overall SLA Compliance: 91.8% ✓ (Target: 90%)                           │
│                                                                           │
│ Escalations: 23 (2.0%)                                                   │
│ └── Avg time before escalation: 4.8 hours                               │
└──────────────────────────────────────────────────────────────────────────┘

AI RECOMMENDATIONS:
┌──────────────────────────────────────────────────────────────────────────┐
│ 💡 Routing Optimization Suggestions:                                     │
│                                                                           │
│ 1. ⚡ Improve Billing Router Accuracy (89% → 95%)                        │
│    Current issue: Billing + Technical overlap                           │
│    Suggestion: Add "contains payment keywords" pre-filter               │
│    Impact: Reduce reassignments by ~15/month                            │
│                                                                           │
│ 2. 👥 Rebalance Load for Mike Brown                                     │
│    Current: 17% (Target: 20%)                                           │
│    Suggestion: Increase weight or reduce others                         │
│    Impact: Better utilization of team capacity                          │
│                                                                           │
│ 3. 📊 Add Intermediate Priority P1.5                                     │
│    Observation: Large gap between P1 (1h) and P2 (4h)                  │
│    Suggestion: Create P1.5 with 2h SLA for borderline cases            │
│    Impact: Better SLA alignment with urgency                            │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Real Example: Employee Onboarding Workflow

### **How a User Would Design This Workflow:**

#### **Step 1: Define Trigger**

User drags **Webhook Trigger** node to canvas

- Configure: Endpoint `/api/webhooks/new-hire`
- Expected data: employee info (name, role, department, start date)

#### **Step 2: Add AI Agent for Planning**

User drags **AI Agent (GPT-4)** node

- Configure prompt: "Generate onboarding plan based on employee data"
- Input: `{{webhook.employee}}`
- Output variable: `onboardingPlan`

#### **Step 3: Manager Approval**

User drags **Human Approval** node

- Approver: Hiring Manager (from employee data)
- Display: AI-generated plan
- SLA: 4 hours
- Actions: Approve/Reject/Request Changes

#### **Step 4: Branch on Decision**

User drags **If/Then** node

- Condition: `approval.decision == "approved"`
- Creates two paths: Yes/No

#### **Step 5a: If Rejected → Notify HR**

User drags **Send Email** node to "No" branch

- To: HR Team
- Subject: "Onboarding plan rejected"
- Body: Include rejection reason

#### **Step 5b: If Approved → Parallel Execution**

User drags **Parallel Split** node to "Yes" branch

- This creates 4 parallel branches

#### **Step 6a: IT Branch (Parallel Track 1)**

User builds IT workflow:

```
[Parallel Branch 1: IT Setup]
│
├─> Drag: AI Agent "IT Equipment Suggester"
│   ├─ Prompt: "Suggest equipment based on role"
│   ├─ Input: employee.role, employee.department
│   └─ Output: equipmentList
│
├─> Drag: Human Approval "IT Manager Approval"
│   ├─ Show: Equipment list + cost
│   ├─ Approver: IT Manager
│   └─ SLA: 4 hours
│
├─> Drag: Integration "Procurement System API"
│   ├─ Action: Create purchase order
│   ├─ Input: approved equipment list
│   └─ Returns: order ID + tracking
│
├─> Drag: Wait node "Wait for Delivery"
│   ├─ Trigger: Webhook from vendor
│   └─ Timeout: 7 days
│
├─> Drag: AI Agent "Account Creator"
│   ├─ Task: Create email, Slack, GitHub accounts
│   ├─ Integration: Google Workspace API, Slack API, GitHub API
│   └─ Output: credentials
│
├─> Drag: Human Task "IT Setup & Configuration"
│   ├─ Assigned to: IT Team
│   ├─ Task: Configure laptop, install software
│   └─ Mark complete when done
│
└─> Drag: Integration "Shipping API"
    ├─ Action: Create shipping label
    └─ Send tracking to employee
```

#### **Step 6b: HR Branch (Parallel Track 2)**

User builds HR workflow:

```
[Parallel Branch 2: HR Documentation]
│
├─> Drag: AI Agent "HR Document Generator"
│   ├─ Prompt: "Generate employment documents"
│   ├─ Input: employee data, position details
│   └─ Output: documents (contract, tax forms, etc.)
│
├─> Drag: Human Review "HR Specialist Review"
│   ├─ Reviewer: HR Team
│   ├─ Show: Generated documents
│   └─ Can edit before sending
│
├─> Drag: Integration "DocuSign"
│   ├─ Action: Send for e-signature
│   ├─ Signer: New employee
│   └─ Webhook: On completion
│
├─> Drag: Wait "Wait for Signature"
│   ├─ Timeout: 48 hours
│   └─ If timeout: Send reminder
│
└─> Drag: Integration "Payroll System (Gusto)"
    ├─ Action: Add employee to payroll
    └─ Setup benefits enrollment
```

#### **Step 6c: Buddy Assignment Branch (Parallel Track 3)**

User builds buddy workflow:

```
[Parallel Branch 3: Buddy Assignment]
│
├─> Drag: AI Agent "Buddy Matcher"
│   ├─ Prompt: "Match new hire with best buddy"
│   ├─ Input: New hire profile, team members, past success rates
│   └─ Output: Top 3 recommendations with scores
│
├─> Drag: Human Decision "Manager Selects Buddy"
│   ├─ Show: AI recommendations
│   ├─ Decision maker: Hiring Manager
│   └─ Output: selected buddy
│
├─> Drag: Human Task "Buddy Acceptance"
│   ├─ Assigned to: Selected buddy
│   ├─ Show: New hire info, time commitment
│   ├─ Decision: Accept/Decline
│   └─ If decline: Loop back to AI suggestions
│
├─> Drag: Integration "Google Calendar"
│   ├─ Action: Schedule meetings (Day 1, Week 1, etc.)
│   └─ Attendees: New hire + buddy
│
└─> Drag: AI Agent "Buddy Guide Generator"
    ├─ Task: Create personalized guide for buddy
    └─ Send via email
```

#### **Step 6d: Security Branch (Parallel Track 4)**

User builds security workflow:

```
[Parallel Branch 4: Security & Compliance]
│
├─> Drag: AI Agent "Security Access Analyzer"
│   ├─ Input: Role, department, data classification
│   └─ Output: Required access levels + training
│
├─> Drag: Human Approval "Security Team Approval"
│   ├─ Show: Access request + risk score
│   └─ Approver: Security Team
│
├─> Drag: Integration "Security System API"
│   ├─ Actions: Setup VPN, 2FA, SSH keys
│   └─ Grant repository access
│
└─> Drag: Human Task "Complete Security Training"
    ├─ Assigned to: New employee
    ├─ Training modules assigned
    └─ Deadline: Before Day 1
```

#### **Step 7: Merge Parallel Branches**

User drags **Merge/Wait All Complete** node

- Waits for all 4 branches to finish
- Then proceeds to next step

#### **Step 8: Day 1 Orchestration**

User drags nodes for Day 1:

```
├─> Drag: Wait "Wait Until Start Date"
│   └─ Trigger: employee.startDate at 9:00 AM
│
├─> Drag: AI Agent "Day 1 Coordinator"
│   ├─ Task: Send welcome email with schedule
│   └─ Auto-join Slack channels
│
├─> Drag: Integration "Calendar"
│   ├─ Create Day 1 events
│   └─ Send invites
│
└─> Drag: Slack Integration "Post Announcement"
    ├─ Channel: #team-announcements
    └─ Message: "Welcome {{employee.name}}!"
```

#### **Step 9: Ongoing Monitoring**

User adds monitoring nodes:

```
├─> Drag: AI Agent "Progress Monitor"
│   ├─ Runs daily for 90 days
│   ├─ Tracks: Task completion, engagement
│   └─ Alerts manager if issues detected
│
├─> Drag: AI Agent "Pulse Survey Bot"
│   ├─ Schedule: Day 3, 7, 14, 30
│   └─ Send survey + collect feedback
│
└─> Drag: AI Agent "Performance Analyzer"
    ├─ Runs at Day 30, 60, 90
    ├─ Generate performance report
    └─> Human Review "Manager Check-in"
```

### **Complete Workflow Visualization (As Built by User):**

```
┌────────────────────────────────────────────────────────────────────────────┐
│ Employee Onboarding Workflow - Built by User                               │
└────────────────────────────────────────────────────────────────────────────┘

[📡 Webhook: New Hire]
         │
         ↓
[🧠 AI: Generate Plan] ──────→ Input: Employee data
         │                      Output: Onboarding plan
         ↓
[👤 Approval: Manager] ────────→ Show AI plan + recommendations
         │
         ↓
[🔀 If: Approved?]
         │
    ┌────┴────┐
    │ Yes     │ No
    ↓         ↓
[🔗 Split]  [📧 Notify HR] ──→ [End]
    │
 ┌──┼──┬──┬──┐
 │  │  │  │  │
 ↓  ↓  ↓  ↓  ↓
[IT Branch]  [HR Branch]  [Buddy Branch]  [Security Branch]
 │            │             │               │
 │  [🧠 AI: Equipment]      [🧠 AI: Docs]  [🧠 AI: Match]  [🧠 AI: Access]
 │  [👤 IT Approval]        [👁️ HR Review] [👤 Manager]    [👤 Security]
 │  [🔌 Procurement]        [🔌 DocuSign]  [👤 Buddy]      [🔌 VPN/2FA]
 │  [⏸️ Wait Delivery]      [⏸️ Wait Sign] [📅 Calendar]   [👤 Training]
 │  [🧠 AI: Accounts]       [🔌 Payroll]   [📧 Guide]      │
 │  [👤 IT Config]          │              │               │
 │  [🔌 Shipping]           │              │               │
 │            │             │               │               │
 └────────────┴─────────────┴───────────────┴───────────────┘
              │
              ↓
         [🔗 Merge: Wait All]
              │
              ↓
         [⏸️ Wait: Start Date]
              │
              ↓
         [🧠 AI: Day 1 Coordinator]
              │
              ↓
         [📅 Create Calendar Events]
              │
              ↓
         [💬 Slack: Welcome Message]
              │
              ↓
         [🔄 Loop: Week 1-4]
              │
              ├──→ [🧠 AI: Progress Monitor] (Daily)
              ├──→ [📋 AI: Pulse Surveys] (Day 3, 7, 14, 30)
              └──→ [🧠 AI: Performance Report] (Day 30, 60, 90)
                        │
                        ↓
                   [👤 Manager: Check-in Meeting]
                        │
                        ↓
                   [🔀 On Track?]
                        │
                   ┌────┴────┐
                   │ Yes     │ No
                   ↓         ↓
              [🎉 Complete]  [🧠 AI: Suggest Support] ──→ [Loop Back]
```

---

## 🏢 Multi-Workspace Architecture

### **Users Can Be Part of Multiple Workspaces:**

```
user@example.com (Single Login)
│
├── Workspace A: Acme Corp (Admin)
├── Workspace B: Client Project (Editor)
├── Workspace C: Freelance (Admin)
└── Workspace D: Startup (Approver)
```

### **After Login: Workspace Selector**

```
┌──────────────────────────────────────────────┐
│ Select Workspace                             │
├──────────────────────────────────────────────┤
│                                              │
│ 🏢 Acme Corp                    [Admin]     │
│    Last active: 5 mins ago                   │
│    3 pending approvals                       │
│    ────────────────────────────              │
│                                              │
│ 🏢 Client Project               [Editor]    │
│    Last active: 2 hours ago                  │
│    1 workflow running                        │
│    ────────────────────────────              │
│                                              │
│ 🏢 Freelance                    [Admin]     │
│    Last active: Yesterday                    │
│    All quiet                                 │
│    ────────────────────────────              │
│                                              │
│ [+ Create New Workspace]                     │
│ [+ Join Existing Workspace]                  │
│                                              │
└──────────────────────────────────────────────┘
```

### **Top Bar - Workspace Switcher (Always Visible):**

```
┌────────────────────────────────────────────────────────────────────┐
│ 🏢 [Acme Corp ▼]    🔍 Search...    🔔 (8)    👤 John Smith      │
└────────────────────────────────────────────────────────────────────┘
      │
      └──> Click to switch:
           ┌──────────────────────────────┐
           │ ✓ Acme Corp (Admin)          │
           │   Client Project (Editor)    │
           │   Freelance (Admin)          │
           │ ──────────────────────────── │
           │ 🏢 Create New Workspace      │
           │ ➕ Join Workspace            │
           │ ⚙️ Manage My Workspaces      │
           └──────────────────────────────┘
```

---

## 🎯 Complete User Flow

### **Phase 1: Onboarding**

```
New User:
Sign Up → Email Verification → Create/Join Workspace → Workspace Selector → Dashboard

Existing User:
Login → Workspace Selector → Select Workspace → Dashboard
```

### **Phase 2: Creating a Workflow**

```
Dashboard → Click "Create Workflow"
    ↓
Choose Template or Blank Canvas
    ↓
Visual Builder Opens
    ↓
Drag Nodes from Left Panel → Drop on Canvas
    ↓
Connect Nodes (Draw arrows)
    ↓
Configure Each Node (Click to open right panel)
    ↓
Test Workflow (Run with sample data)
    ↓
Deploy & Activate
```

### **Phase 3: Execution & Monitoring**

```
Workflow Triggered (Webhook/Schedule/Manual)
    ↓
Real-time Execution View
    ↓
Nodes light up as they execute
    ↓
Human approval nodes → Send notification to approver
    ↓
Approver gets notification (Email/Slack/In-app)
    ↓
Approver reviews (sees AI recommendations)
    ↓
Approver decides → Workflow continues
    ↓
Completion → Logs + Analytics updated
```

---

## 📊 Advanced Analytics & AI Insights

### **Workflow Analytics Dashboard:**

```
┌────────────────────────────────────────────────────────────────────────────┐
│ Workflow Analytics - Employee Onboarding                                   │
│ Last 30 Days                                                 [Export PDF]  │
└────────────────────────────────────────────────────────────────────────────┘

OVERVIEW:
┌──────────────────────────────────────────────────────────────────────────┐
│ Total Runs: 127    Avg Duration: 8.5 days    Success Rate: 92.1%        │
│ Cost/Run: $12.50   Time Saved: 18h/run       ROI: 340%                  │
└──────────────────────────────────────────────────────────────────────────┘

EXECUTION TIMELINE:
┌──────────────────────────────────────────────────────────────────────────┐
│   15 ┤                              ●        ●   ●                       │
│   12 ┤            ●           ●     ●   ●   ●   ●                        │
│    9 ┤      ●  ●  ●     ●  ●  ●  ●  ●  ●   ●   ●   ●                    │
│    6 ┤   ●  ●  ●  ●  ●  ●  ●  ●  ●  ●  ●  ●   ●   ●  ●                 │
│      └────────────────────────────────────────────────────────           │
│      Nov 1    5    10   15   20   25   30                               │
│                                                                           │
│  ✅ Success: 117    ❌ Failed: 8    ⏸️ In Progress: 2                    │
└──────────────────────────────────────────────────────────────────────────┘

🚨 BOTTLENECK ANALYSIS (AI-Powered):
┌──────────────────────────────────────────────────────────────────────────┐
│ 1. ⚠️ IT Manager Approval (Node #4)                                     │
│    ├─ Avg Delay: 6.2 hours (SLA: 4 hours)                              │
│    ├─ Breach Rate: 45% of cases                                         │
│    └─ 💡 AI Suggests:                                                   │
│        • Add backup approver                                            │
│        • Auto-escalate after 3 hours                                    │
│        • Pre-approve standard configs                                   │
│    [Implement] [Details]                                                │
│                                                                           │
│ 2. 🔴 Document Signature (Node #8)                                      │
│    ├─ Avg Delay: 18 hours (Expected: 4 hours)                          │
│    ├─ Issue: New hires forget to sign                                  │
│    └─ 💡 AI Suggests:                                                   │
│        • Add SMS reminder after 6 hours                                 │
│        • Gamify with progress bar                                       │
│    [Implement] [Details]                                                │
└──────────────────────────────────────────────────────────────────────────┘

NODE PERFORMANCE:
┌──────────────────────────────────────────────────────────────────────────┐
│ Node Name                  Avg Time    Success    Status                │
│ ─────────────────────────────────────────────────────────────────────── │
│ Webhook Trigger            < 1s        100%       ✅                    │
│ AI Plan Generator          15s         98.4%      ✅                    │
│ Manager Approval           2.1h        95.3%      ✅                    │
│ IT Manager Approval        6.2h        89.5%      🚨 BOTTLENECK         │
│ Equipment Order            2.5d        96.8%      ⚠️ Slow              │
│ AI Doc Generator           8s          99.1%      ✅                    │
│ HR Review                  45m         97.2%      ✅                    │
│ Document Signature         18h         75.3%      🚨 BOTTLENECK         │
│ AI Buddy Matcher           5s          100%       ✅                    │
│ Buddy Acceptance           4h          88.0%      🟡 Monitor            │
│ Security Approval          3h          94.5%      ✅                    │
└──────────────────────────────────────────────────────────────────────────┘

💡 AI RECOMMENDATIONS:
┌──────────────────────────────────────────────────────────────────────────┐
│ 💰 COST OPTIMIZATION (Save $634/month)                                  │
│ ├─ Cache AI responses for similar roles → $406/month                   │
│ ├─ Batch equipment orders weekly → $150/month                           │
│ └─ Use GPT-3.5 for simple tasks → $78/month                             │
│                                                                           │
│ ⚡ SPEED IMPROVEMENTS (Save 3.5 hours/run)                              │
│ ├─ Parallelize IT & Security setup → 2.5 hours                         │
│ └─ Pre-create email accounts at offer stage → 1 hour                   │
│                                                                           │
│ 🎯 QUALITY ENHANCEMENTS                                                 │
│ ├─ Add 48-hour check-in survey → Better early feedback                 │
│ ├─ Personalize welcome by role → +15% engagement                        │
│ └─ ML-based buddy matching → Lower decline rate                         │
│                                                                           │
│ 📊 PREDICTIONS                                                           │
│ ├─ Next run success probability: 94.3%                                  │
│ ├─ Expected duration: 8.2 days                                          │
│ └─ Likely bottleneck: IT approval (62% probability)                     │
└──────────────────────────────────────────────────────────────────────────┘

INDUSTRY BENCHMARK:
┌──────────────────────────────────────────────────────────────────────────┐
│ Metric            Your Performance    Industry Avg    Top 10%           │
│ ───────────────────────────────────────────────────────────────────────  │
│ Duration          8.5 days ✅         12.3 days        6.2 days          │
│ Success Rate      92.1% ✅            87.4%            95.8%             │
│ Cost/Hire         $12.50 ✅           $18.30           $9.20             │
│ Automation        70% ✅              52%              82%               │
│                                                                           │
│ 🏆 Your Rank: Top 15% of onboarding workflows                           │
│ 💡 To reach Top 10%: Reduce approval times, increase automation         │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 🏪 Marketplace & Integrations

### **Users Browse & Install Integrations:**

```
┌────────────────────────────────────────────────────────────────────────────┐
│ Marketplace                                          🔍 Search integrations│
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│ CATEGORIES:                                                                 │
│ ├── 💼 CRM (Salesforce, HubSpot, Pipedrive)                                │
│ ├── 💬 Communication (Slack, Teams, Discord)                               │
│ ├── 💳 Payment (Stripe, PayPal, Square)                                    │
│ ├── 🗄️ Database (PostgreSQL, MongoDB, Airtable)                           │
│ ├── 🤖 AI/LLM (OpenAI, Anthropic, Gemini)                                  │
│ ├── 🔧 MCP Servers (Custom tools)                                          │
│ └── 🌐 Utilities (Webhooks, HTTP, Email)                                   │
│                                                                             │
│ FEATURED:                                                                   │
│ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐                 │
│ │ 💬 Slack       │ │ 🤖 GPT-4      │ │ 📧 Gmail       │                 │
│ │ ⭐ 4.9         │ │ ⭐ 4.8        │ │ ⭐ 4.7         │                 │
│ │ 12.5k installs │ │ 8.3k installs │ │ 15k installs   │                 │
│ │ [Install]      │ │ [Install]     │ │ [Install]      │                 │
│ └────────────────┘ └────────────────┘ └────────────────┘                 │
│                                                                             │
│ MCP SERVERS:                                                                │
│ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐                 │
│ │ 🔍 Web Search  │ │ 📁 File Sys   │ │ 🗄️ SQL DB     │                 │
│ │ MCP Server     │ │ MCP Server    │ │ MCP Server     │                 │
│ │ [Install]      │ │ [Install]     │ │ [Install]      │                 │
│ └────────────────┘ └────────────────┘ └────────────────┘                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

After installing, these appear in the Node Library as draggable nodes!
```

---

## 🎨 Navigation Structure

```
┌────────────────────────────────────────────────────────────────────────┐
│ TOP BAR (Always Visible):                                             │
├────────────────────────────────────────────────────────────────────────┤
│ 🏢 [Workspace Switcher ▼]  🔍 Search  🔔 (8)  👤 [User Menu ▼]       │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│ SIDEBAR (Workspace-Specific):                                          │
├────────────────────────────────────────────────────────────────────────┤
│ 🏠 Dashboard                                                           │
│ ⚡ Workflows (Create, view all)                                        │
│ 🤖 AI Agents (Manage agents)                                           │
│ ✅ Approvals (Pending inbox)                                           │
│ 🏪 Marketplace (Browse integrations)                                   │
│ 📊 Analytics (Performance insights)                                    │
│ 👥 Team (Members & roles)                                              │
│ ⚙️ Settings (Workspace settings)                                       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Key Differentiators

### **1. Everything is a Node**

- AI agents → Drag & drop nodes
- Human approvals → Drag & drop nodes
- Integrations → Drag & drop nodes
- MCP servers → Drag & drop nodes
- Logic/control → Drag & drop nodes

### **2. AI Throughout**

- **AI in Builder:** Suggestions, validation, optimization
- **AI as Nodes:** GPT-4, Claude agents in workflows
- **AI in Analytics:** Bottleneck detection, recommendations, predictions

### **3. Human-in-the-Loop Native**

- Human approval nodes with rich context
- AI provides recommendations to approvers
- SLA tracking, escalation rules
- Audit trails for compliance

### **4. Multi-Workspace**

- Users can be in multiple workspaces
- Different roles per workspace
- Cross-workspace notifications
- Instant switching

### **5. Enterprise-Grade**

- Visual workflow builder (no code)
- Real-time monitoring
- Advanced analytics
- Marketplace with 500+ integrations
- MCP server support

---

## ✅ Summary

This platform allows users to:

1. **Visually design workflows** by dragging and dropping nodes
2. **Add AI agents** as nodes (GPT-4, Claude, custom)
3. **Integrate apps & MCP servers** from marketplace as nodes
4. **Set human approval/review points** as nodes
5. **Monitor & optimize** with AI-powered analytics
6. **Work across multiple workspaces** with different roles

The **Employee Onboarding example** shows how a user would **build this workflow** by dragging the various nodes (AI agents, human approvals, integrations) and connecting them visually!

---

**Ready to proceed with detailed screen designs?** 🎨
