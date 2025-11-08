import { WorkflowTemplate } from '../../types/workspace';
import { Node, Edge } from 'reactflow';

export const mockTemplates: WorkflowTemplate[] = [
  {
    id: 'tpl_employee_onboarding',
    name: 'Employee Onboarding',
    description: 'Complete employee onboarding workflow with IT setup, HR documentation, manager approval, and buddy assignment. Automates the entire new hire process.',
    category: 'hr',
    icon: '👤',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
    featured: true,
    verified: true,
    usageCount: 1247,
    rating: 4.8,
    definition: {
      nodes: [
        {
          id: '1',
          type: 'trigger',
          position: { x: 250, y: 50 },
          data: {
            label: 'New Hire Webhook',
            description: 'Triggered when HR adds a new employee',
            triggerType: 'webhook',
          },
        },
        {
          id: '2',
          type: 'action',
          position: { x: 250, y: 200 },
          data: {
            label: 'Create Email Account',
            description: 'Set up company email',
            app: 'google-workspace',
          },
        },
        {
          id: '3',
          type: 'action',
          position: { x: 250, y: 350 },
          data: {
            label: 'Send Welcome Email',
            description: 'Send welcome email with onboarding checklist',
            app: 'gmail',
          },
        },
        {
          id: '4',
          type: 'approval',
          position: { x: 250, y: 500 },
          data: {
            label: 'Manager Approval',
            description: 'Manager approves equipment and access',
          },
        },
      ] as Node[],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
      ] as Edge[],
    },
    variables: [
      {
        key: 'department',
        label: 'Department',
        type: 'select',
        required: true,
        options: ['Engineering', 'Sales', 'Marketing', 'Operations', 'HR'],
      },
      {
        key: 'manager_email',
        label: 'Manager Email',
        type: 'email',
        required: true,
      },
    ],
    createdBy: {
      id: 'system',
      name: 'Swift Flow AI',
      type: 'system',
    },
    tags: ['onboarding', 'hr', 'automation', 'popular'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-12-01T14:30:00Z',
  },
  {
    id: 'tpl_invoice_approval',
    name: 'Invoice Approval Workflow',
    description: 'Multi-level invoice approval with smart routing based on amount. Includes AI-powered data extraction and automatic payment processing.',
    category: 'finance',
    icon: '💰',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    featured: true,
    verified: true,
    usageCount: 892,
    rating: 4.9,
    definition: {
      nodes: [
        {
          id: '1',
          type: 'trigger',
          position: { x: 100, y: 50 },
          data: {
            label: 'Invoice Received',
            triggerType: 'webhook',
          },
        },
        {
          id: '2',
          type: 'action',
          position: { x: 100, y: 200 },
          data: {
            label: 'Extract Invoice Data',
            app: 'ai-ocr',
          },
        },
        {
          id: '3',
          type: 'condition',
          position: { x: 100, y: 350 },
          data: {
            label: 'Check Amount',
          },
        },
        {
          id: '4',
          type: 'approval',
          position: { x: 300, y: 500 },
          data: {
            label: 'Manager Approval',
          },
        },
      ] as Node[],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
      ] as Edge[],
    },
    variables: [
      {
        key: 'approval_threshold',
        label: 'Approval Threshold ($)',
        type: 'number',
        required: true,
        defaultValue: '5000',
      },
      {
        key: 'manager_email',
        label: 'Manager Email',
        type: 'email',
        required: true,
      },
      {
        key: 'cfo_email',
        label: 'CFO Email (for high amounts)',
        type: 'email',
        required: true,
      },
    ],
    createdBy: {
      id: 'system',
      name: 'Swift Flow AI',
      type: 'system',
    },
    tags: ['finance', 'approval', 'invoice', 'popular'],
    createdAt: '2024-02-10T09:00:00Z',
    updatedAt: '2024-11-28T16:45:00Z',
  },
  {
    id: 'tpl_support_routing',
    name: 'AI Support Ticket Routing',
    description: 'Automatically classify and route support tickets using AI. Assigns tickets to the right team based on content analysis and urgency.',
    category: 'support',
    icon: '🎫',
    thumbnail: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
    featured: true,
    verified: true,
    usageCount: 1523,
    rating: 4.7,
    definition: {
      nodes: [
        {
          id: '1',
          type: 'trigger',
          position: { x: 250, y: 50 },
          data: {
            label: 'Ticket Created',
            triggerType: 'email',
          },
        },
        {
          id: '2',
          type: 'action',
          position: { x: 250, y: 200 },
          data: {
            label: 'AI Classification',
            app: 'openai',
          },
        },
        {
          id: '3',
          type: 'condition',
          position: { x: 250, y: 350 },
          data: {
            label: 'Route by Category',
          },
        },
      ] as Node[],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
      ] as Edge[],
    },
    variables: [
      {
        key: 'support_email',
        label: 'Support Email Address',
        type: 'email',
        required: true,
        defaultValue: 'support@company.com',
      },
      {
        key: 'tech_team',
        label: 'Technical Team Email',
        type: 'email',
        required: true,
      },
      {
        key: 'billing_team',
        label: 'Billing Team Email',
        type: 'email',
        required: true,
      },
    ],
    createdBy: {
      id: 'system',
      name: 'Swift Flow AI',
      type: 'system',
    },
    tags: ['support', 'ai', 'routing', 'customer-service', 'popular'],
    createdAt: '2024-03-05T11:30:00Z',
    updatedAt: '2024-12-10T10:15:00Z',
  },
  {
    id: 'tpl_lead_distribution',
    name: 'Lead Distribution & Scoring',
    description: 'Automatically score incoming leads and distribute them to sales reps based on territory, capacity, and performance metrics.',
    category: 'sales',
    icon: '🎯',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    featured: false,
    verified: true,
    usageCount: 634,
    rating: 4.6,
    definition: {
      nodes: [
        {
          id: '1',
          type: 'trigger',
          position: { x: 200, y: 50 },
          data: {
            label: 'New Lead',
            triggerType: 'webhook',
          },
        },
        {
          id: '2',
          type: 'action',
          position: { x: 200, y: 200 },
          data: {
            label: 'Score Lead',
            app: 'ai',
          },
        },
      ] as Node[],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
      ] as Edge[],
    },
    variables: [
      {
        key: 'crm_integration',
        label: 'CRM System',
        type: 'select',
        required: true,
        options: ['Salesforce', 'HubSpot', 'Pipedrive'],
      },
      {
        key: 'min_score',
        label: 'Minimum Lead Score',
        type: 'number',
        required: true,
        defaultValue: '50',
      },
    ],
    createdBy: {
      id: 'system',
      name: 'Swift Flow AI',
      type: 'system',
    },
    tags: ['sales', 'lead-management', 'crm', 'scoring'],
    createdAt: '2024-04-12T14:00:00Z',
    updatedAt: '2024-11-15T09:30:00Z',
  },
  {
    id: 'tpl_content_approval',
    name: 'Content Approval & Publishing',
    description: 'Multi-stage content approval workflow with compliance checks, stakeholder reviews, and automated publishing to multiple channels.',
    category: 'operations',
    icon: '📝',
    thumbnail: 'https://images.unsplash.com/photo-1542435503-956c469947f6?w=400&h=300&fit=crop',
    featured: false,
    verified: true,
    usageCount: 445,
    rating: 4.5,
    definition: {
      nodes: [
        {
          id: '1',
          type: 'trigger',
          position: { x: 250, y: 50 },
          data: {
            label: 'Content Submitted',
            triggerType: 'manual',
          },
        },
        {
          id: '2',
          type: 'approval',
          position: { x: 250, y: 200 },
          data: {
            label: 'Editor Review',
          },
        },
        {
          id: '3',
          type: 'action',
          position: { x: 250, y: 350 },
          data: {
            label: 'Compliance Check',
            app: 'ai',
          },
        },
      ] as Node[],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
      ] as Edge[],
    },
    variables: [
      {
        key: 'editor_email',
        label: 'Editor Email',
        type: 'email',
        required: true,
      },
      {
        key: 'compliance_officer',
        label: 'Compliance Officer Email',
        type: 'email',
        required: true,
      },
      {
        key: 'publish_channels',
        label: 'Publishing Channels',
        type: 'select',
        required: true,
        options: ['Website', 'Social Media', 'Email Newsletter', 'All'],
      },
    ],
    createdBy: {
      id: 'system',
      name: 'Swift Flow AI',
      type: 'system',
    },
    tags: ['content', 'approval', 'publishing', 'compliance'],
    createdAt: '2024-05-20T10:45:00Z',
    updatedAt: '2024-10-30T15:20:00Z',
  },
  {
    id: 'tpl_expense_report',
    name: 'Expense Report Processing',
    description: 'Automated expense report submission, approval, and reimbursement workflow with receipt validation and policy compliance checks.',
    category: 'finance',
    icon: '💳',
    thumbnail: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400&h=300&fit=crop',
    featured: false,
    verified: true,
    usageCount: 567,
    rating: 4.7,
    definition: {
      nodes: [
        {
          id: '1',
          type: 'trigger',
          position: { x: 200, y: 50 },
          data: {
            label: 'Expense Submitted',
            triggerType: 'manual',
          },
        },
        {
          id: '2',
          type: 'action',
          position: { x: 200, y: 200 },
          data: {
            label: 'Validate Receipts',
            app: 'ai-ocr',
          },
        },
        {
          id: '3',
          type: 'approval',
          position: { x: 200, y: 350 },
          data: {
            label: 'Manager Approval',
          },
        },
      ] as Node[],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
      ] as Edge[],
    },
    variables: [
      {
        key: 'max_amount',
        label: 'Maximum Amount Without Approval ($)',
        type: 'number',
        required: true,
        defaultValue: '500',
      },
      {
        key: 'finance_email',
        label: 'Finance Team Email',
        type: 'email',
        required: true,
      },
    ],
    createdBy: {
      id: 'system',
      name: 'Swift Flow AI',
      type: 'system',
    },
    tags: ['finance', 'expenses', 'reimbursement', 'approval'],
    createdAt: '2024-06-08T13:15:00Z',
    updatedAt: '2024-11-22T11:40:00Z',
  },
];

export function getTemplates(category?: string, featured?: boolean, search?: string): WorkflowTemplate[] {
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

export function getTemplateById(templateId: string): WorkflowTemplate | undefined {
  return mockTemplates.find((t) => t.id === templateId);
}

