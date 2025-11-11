import { WorkflowTemplate } from "../../types/workspace";
import { Node, Edge } from "reactflow";

export const mockTemplates: WorkflowTemplate[] = [
  {
    id: "tpl_employee_onboarding",
    name: "Employee Onboarding",
    description:
      "Replace your scattered Notion docs and Jira tickets. One executable process from offer letter to day one. Never miss a step, never lose track of a new hire.",
    category: "hr",
    icon: "👤",
    thumbnail:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
    featured: true,
    verified: true,
    usageCount: 1247,
    rating: 4.8,
    definition: {
      nodes: [
        {
          id: "1",
          type: "trigger",
          position: { x: 250, y: 50 },
          data: {
            label: "New Hire Webhook",
            description: "Triggered when HR adds a new employee",
            triggerType: "webhook",
          },
        },
        {
          id: "2",
          type: "action",
          position: { x: 250, y: 200 },
          data: {
            label: "Send Welcome Email",
            description: "Send welcome email with onboarding checklist",
            integrationId: "gmail",
            actionKey: "send_email",
            installedAppId: "inst_gmail_hr",
            icon: "https://logo.clearbit.com/gmail.com",
            app: "Gmail",
            config: {
              to: "{{trigger.email}}",
              subject: "Welcome to {{company_name}}!",
              body: "Welcome to the team! Here is your onboarding checklist...",
            },
          },
        },
        {
          id: "3",
          type: "action",
          position: { x: 250, y: 350 },
          data: {
            label: "Create Calendar Event",
            description: "Schedule first day orientation",
            integrationId: "google-calendar",
            actionKey: "create_event",
            installedAppId: "inst_google_calendar_main",
            icon: "https://logo.clearbit.com/google.com",
            app: "Google Calendar",
            config: {
              summary: "First Day Orientation - {{trigger.name}}",
              start_time: "{{trigger.start_date}}T09:00:00",
              duration: 60,
            },
          },
        },
        {
          id: "4",
          type: "action",
          position: { x: 250, y: 500 },
          data: {
            label: "Manager Approval",
            description: "Manager approves equipment and access",
            integrationId: "approval",
            actionKey: "request_approval",
            installedAppId: "inst_approval_acme",
            icon: "✅",
            app: "Approval",
            config: {
              title: "Approve Equipment for New Hire",
              description: "Manager needs to approve equipment and access",
              assignees: ["{{manager_email}}"],
              priority: "high",
            },
          },
        },
      ] as Node[],
      edges: [
        { id: "e1-2", source: "1", target: "2" },
        { id: "e2-3", source: "2", target: "3" },
        { id: "e3-4", source: "3", target: "4" },
      ] as Edge[],
    },
    variables: [
      {
        key: "department",
        label: "Department",
        type: "select",
        required: true,
        options: ["Engineering", "Sales", "Marketing", "Operations", "HR"],
      },
      {
        key: "manager_email",
        label: "Manager Email",
        type: "email",
        required: true,
      },
    ],
    createdBy: {
      id: "system",
      name: "Swift Flow AI",
      type: "system",
    },
    tags: ["onboarding", "hr", "automation", "popular"],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-12-01T14:30:00Z",
  },
  {
    id: "tpl_invoice_approval",
    name: "Invoice Approval Workflow",
    description:
      "End the email chain nightmare. See every invoice, who needs to approve, where it's stuck. Full visibility into company spend from submission to payment.",
    category: "finance",
    icon: "💰",
    thumbnail:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    featured: true,
    verified: true,
    usageCount: 892,
    rating: 4.9,
    definition: {
      nodes: [
        {
          id: "1",
          type: "trigger",
          position: { x: 100, y: 50 },
          data: {
            label: "Invoice Received",
            triggerType: "webhook",
          },
        },
        {
          id: "2",
          type: "action",
          position: { x: 100, y: 200 },
          data: {
            label: "Extract Invoice Data",
            description: "AI extracts invoice details",
            integrationId: "openai",
            actionKey: "chat_completion",
            installedAppId: "inst_openai_main",
            icon: "https://logo.clearbit.com/openai.com",
            app: "OpenAI",
            config: {
              model: "gpt-4-vision-preview",
              messages: [
                {
                  role: "user",
                  content:
                    "Extract invoice number, amount, vendor, and due date from this document: {{trigger.document}}",
                },
              ],
              temperature: 0.3,
            },
          },
        },
        {
          id: "3",
          type: "condition",
          position: { x: 100, y: 350 },
          data: {
            label: "Check Amount",
          },
        },
        {
          id: "4",
          type: "action",
          position: { x: 300, y: 500 },
          data: {
            label: "Manager Approval",
            description: "Manager approves invoice",
            integrationId: "approval",
            actionKey: "request_approval",
            installedAppId: "inst_approval_acme",
            icon: "✅",
            app: "Approval",
            config: {
              title: "Invoice Approval Required",
              description: "Please review and approve this invoice",
              assignees: ["{{manager_email}}"],
              priority: "medium",
            },
          },
        },
      ] as Node[],
      edges: [
        { id: "e1-2", source: "1", target: "2" },
        { id: "e2-3", source: "2", target: "3" },
        { id: "e3-4", source: "3", target: "4" },
      ] as Edge[],
    },
    variables: [
      {
        key: "approval_threshold",
        label: "Approval Threshold ($)",
        type: "number",
        required: true,
        defaultValue: "5000",
      },
      {
        key: "manager_email",
        label: "Manager Email",
        type: "email",
        required: true,
      },
      {
        key: "cfo_email",
        label: "CFO Email (for high amounts)",
        type: "email",
        required: true,
      },
    ],
    createdBy: {
      id: "system",
      name: "Swift Flow AI",
      type: "system",
    },
    tags: ["finance", "approval", "invoice", "popular"],
    createdAt: "2024-02-10T09:00:00Z",
    updatedAt: "2024-11-28T16:45:00Z",
  },
  {
    id: "tpl_support_routing",
    name: "AI Support Ticket Routing",
    description:
      "Customer issues never get lost. Automatic classification, smart routing, SLA tracking. Everyone knows what tickets they own and what's urgent.",
    category: "support",
    icon: "🎫",
    thumbnail:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
    featured: true,
    verified: true,
    usageCount: 1523,
    rating: 4.7,
    definition: {
      nodes: [
        {
          id: "1",
          type: "trigger",
          position: { x: 250, y: 50 },
          data: {
            label: "Ticket Created",
            triggerType: "email",
          },
        },
        {
          id: "2",
          type: "action",
          position: { x: 250, y: 200 },
          data: {
            label: "AI Classification",
            description: "Classify ticket urgency and category",
            integrationId: "openai",
            actionKey: "chat_completion",
            installedAppId: "inst_openai_main",
            icon: "https://logo.clearbit.com/openai.com",
            app: "OpenAI",
            config: {
              prompt: "Classify this support ticket: {{trigger.message}}",
              model: "gpt-4",
            },
          },
        },
        {
          id: "3",
          type: "condition",
          position: { x: 250, y: 350 },
          data: {
            label: "Route by Category",
          },
        },
      ] as Node[],
      edges: [
        { id: "e1-2", source: "1", target: "2" },
        { id: "e2-3", source: "2", target: "3" },
      ] as Edge[],
    },
    variables: [
      {
        key: "support_email",
        label: "Support Email Address",
        type: "email",
        required: true,
        defaultValue: "support@company.com",
      },
      {
        key: "tech_team",
        label: "Technical Team Email",
        type: "email",
        required: true,
      },
      {
        key: "billing_team",
        label: "Billing Team Email",
        type: "email",
        required: true,
      },
    ],
    createdBy: {
      id: "system",
      name: "Swift Flow AI",
      type: "system",
    },
    tags: ["support", "ai", "routing", "customer-service", "popular"],
    createdAt: "2024-03-05T11:30:00Z",
    updatedAt: "2024-12-10T10:15:00Z",
  },
  {
    id: "tpl_lead_distribution",
    name: "Lead Distribution & Scoring",
    description:
      "Stop losing leads in Salesforce chaos. Every lead automatically scored, routed to the right rep, tracked from contact to close. No lead left behind.",
    category: "sales",
    icon: "🎯",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    featured: false,
    verified: true,
    usageCount: 634,
    rating: 4.6,
    definition: {
      nodes: [
        {
          id: "1",
          type: "trigger",
          position: { x: 200, y: 50 },
          data: {
            label: "New Lead",
            triggerType: "webhook",
          },
        },
        {
          id: "2",
          type: "action",
          position: { x: 200, y: 200 },
          data: {
            label: "Score Lead",
            description: "AI scores lead quality",
            integrationId: "openai",
            actionKey: "chat_completion",
            installedAppId: "inst_openai_main",
            icon: "https://logo.clearbit.com/openai.com",
            app: "OpenAI",
            config: {
              prompt:
                "Score this lead based on company size, industry, and engagement: {{trigger.data}}",
              model: "gpt-4",
            },
          },
        },
      ] as Node[],
      edges: [{ id: "e1-2", source: "1", target: "2" }] as Edge[],
    },
    variables: [
      {
        key: "crm_integration",
        label: "CRM System",
        type: "select",
        required: true,
        options: ["Salesforce", "HubSpot", "Pipedrive"],
      },
      {
        key: "min_score",
        label: "Minimum Lead Score",
        type: "number",
        required: true,
        defaultValue: "50",
      },
    ],
    createdBy: {
      id: "system",
      name: "Swift Flow AI",
      type: "system",
    },
    tags: ["sales", "lead-management", "crm", "scoring"],
    createdAt: "2024-04-12T14:00:00Z",
    updatedAt: "2024-11-15T09:30:00Z",
  },
  {
    id: "tpl_content_approval",
    name: "Content Approval & Publishing",
    description:
      "End the Google Docs version nightmare. Track every draft, every review, every approval. See exactly where content is stuck and who needs to act.",
    category: "operations",
    icon: "📝",
    thumbnail:
      "https://images.unsplash.com/photo-1542435503-956c469947f6?w=400&h=300&fit=crop",
    featured: false,
    verified: true,
    usageCount: 445,
    rating: 4.5,
    definition: {
      nodes: [
        {
          id: "1",
          type: "trigger",
          position: { x: 250, y: 50 },
          data: {
            label: "Content Submitted",
            triggerType: "manual",
          },
        },
        {
          id: "2",
          type: "action",
          position: { x: 250, y: 200 },
          data: {
            label: "Editor Review",
            description: "Editor reviews content before publishing",
            integrationId: "approval",
            actionKey: "request_approval",
            installedAppId: "inst_approval_acme",
            icon: "✅",
            app: "Approval",
            config: {
              title: "Content Review Required",
              description: "Please review this content before publishing",
              assignees: ["{{editor_email}}"],
              priority: "medium",
            },
          },
        },
        {
          id: "3",
          type: "action",
          position: { x: 250, y: 350 },
          data: {
            label: "Compliance Check",
            description: "AI checks content for compliance",
            integrationId: "openai",
            actionKey: "chat_completion",
            installedAppId: "inst_openai_main",
            icon: "https://logo.clearbit.com/openai.com",
            app: "OpenAI",
            config: {
              prompt:
                "Review this content for compliance issues: {{trigger.content}}",
              model: "gpt-4",
            },
          },
        },
      ] as Node[],
      edges: [
        { id: "e1-2", source: "1", target: "2" },
        { id: "e2-3", source: "2", target: "3" },
      ] as Edge[],
    },
    variables: [
      {
        key: "editor_email",
        label: "Editor Email",
        type: "email",
        required: true,
      },
      {
        key: "compliance_officer",
        label: "Compliance Officer Email",
        type: "email",
        required: true,
      },
      {
        key: "publish_channels",
        label: "Publishing Channels",
        type: "select",
        required: true,
        options: ["Website", "Social Media", "Email Newsletter", "All"],
      },
    ],
    createdBy: {
      id: "system",
      name: "Swift Flow AI",
      type: "system",
    },
    tags: ["content", "approval", "publishing", "compliance"],
    createdAt: "2024-05-20T10:45:00Z",
    updatedAt: "2024-10-30T15:20:00Z",
  },
  {
    id: "tpl_expense_report",
    name: "Expense Report Processing",
    description:
      "End the receipt nightmare. Submit, approve, reimburse - all visible. No more \"where's my expense report?\" See exactly who needs to approve and why it's stuck.",
    category: "finance",
    icon: "💳",
    thumbnail:
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400&h=300&fit=crop",
    featured: false,
    verified: true,
    usageCount: 567,
    rating: 4.7,
    definition: {
      nodes: [
        {
          id: "1",
          type: "trigger",
          position: { x: 200, y: 50 },
          data: {
            label: "Expense Submitted",
            triggerType: "manual",
          },
        },
        {
          id: "2",
          type: "action",
          position: { x: 200, y: 200 },
          data: {
            label: "Validate Receipts",
            description: "AI extracts and validates receipt data",
            integrationId: "openai",
            actionKey: "chat_completion",
            installedAppId: "inst_openai_main",
            icon: "https://logo.clearbit.com/openai.com",
            app: "OpenAI",
            config: {
              model: "gpt-4-vision-preview",
              messages: [
                {
                  role: "user",
                  content:
                    "Extract date, amount, vendor, and category from this receipt: {{trigger.receipt}}",
                },
              ],
              temperature: 0.3,
            },
          },
        },
        {
          id: "3",
          type: "action",
          position: { x: 200, y: 350 },
          data: {
            label: "Manager Approval",
            description: "Manager approves expense report",
            integrationId: "approval",
            actionKey: "request_approval",
            installedAppId: "inst_approval_acme",
            icon: "✅",
            app: "Approval",
            config: {
              title: "Expense Report Approval",
              description: "Please review and approve this expense report",
              assignees: ["{{manager_email}}"],
              priority: "medium",
            },
          },
        },
      ] as Node[],
      edges: [
        { id: "e1-2", source: "1", target: "2" },
        { id: "e2-3", source: "2", target: "3" },
      ] as Edge[],
    },
    variables: [
      {
        key: "max_amount",
        label: "Maximum Amount Without Approval ($)",
        type: "number",
        required: true,
        defaultValue: "500",
      },
      {
        key: "finance_email",
        label: "Finance Team Email",
        type: "email",
        required: true,
      },
    ],
    createdBy: {
      id: "system",
      name: "Swift Flow AI",
      type: "system",
    },
    tags: ["finance", "expenses", "reimbursement", "approval"],
    createdAt: "2024-06-08T13:15:00Z",
    updatedAt: "2024-11-22T11:40:00Z",
  },
];

export function getTemplates(
  category?: string,
  featured?: boolean,
  search?: string
): WorkflowTemplate[] {
  let templates = [...mockTemplates];

  if (category) {
    templates = templates.filter((t) => t.category === category);
  }

  if (featured !== undefined) {
    templates = templates.filter((t) => t.featured === featured);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    templates = templates.filter(
      (t) =>
        t.name.toLowerCase().includes(searchLower) ||
        t.description.toLowerCase().includes(searchLower) ||
        t.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  }

  return templates;
}

export function getTemplateById(
  templateId: string
): WorkflowTemplate | undefined {
  return mockTemplates.find((t) => t.id === templateId);
}
