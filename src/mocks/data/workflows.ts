import { Workflow } from '../../types/workspace';

export const mockWorkflows: Workflow[] = [
  {
    id: 'wf_onboarding',
    name: 'Employee Onboarding',
    description: 'Automated new hire onboarding with IT setup, HR documentation, and buddy assignment',
    status: 'active',
    category: 'hr',
    version: 3,
    createdBy: {
      id: 'usr_sarah',
      name: 'Sarah Lee',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    stats: {
      totalRuns: 127,
      successRate: 92.1,
      avgDuration: '8.5 days',
      lastRun: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
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
            config: { method: 'POST', path: '/new-hire' }
          },
        },
        {
          id: '2',
          type: 'action',
          position: { x: 250, y: 200 },
          data: { 
            label: 'Create Email Account',
            description: 'Set up company email via Google Workspace',
            app: 'google-workspace'
          },
        },
        {
          id: '3',
          type: 'action',
          position: { x: 250, y: 350 },
          data: { 
            label: 'Send Welcome Email',
            description: 'Send welcome email with onboarding checklist',
            app: 'gmail'
          },
        },
        {
          id: '4',
          type: 'approval',
          position: { x: 250, y: 500 },
          data: { 
            label: 'Manager Approval',
            description: 'Manager approves equipment and access',
            approvers: ['manager']
          },
        },
        {
          id: '5',
          type: 'action',
          position: { x: 250, y: 650 },
          data: { 
            label: 'Assign Buddy',
            description: 'Assign onboarding buddy from team',
            app: 'slack'
          },
        },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
        { id: 'e4-5', source: '4', target: '5' },
      ],
    },
    createdAt: '2024-08-15T09:00:00Z',
    updatedAt: '2025-01-10T14:22:00Z',
  },
  {
    id: 'wf_invoice',
    name: 'Invoice Approval',
    description: 'Multi-level invoice approval workflow with smart routing based on amount',
    status: 'active',
    category: 'finance',
    version: 2,
    createdBy: {
      id: 'usr_john',
      name: 'John Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    stats: {
      totalRuns: 456,
      successRate: 98.2,
      avgDuration: '2.3 hours',
      lastRun: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
    definition: {
      nodes: [
        {
          id: '1',
          type: 'trigger',
          position: { x: 100, y: 50 },
          data: { 
            label: 'Invoice Received',
            description: 'Triggered when invoice is uploaded',
            triggerType: 'webhook'
          },
        },
        {
          id: '2',
          type: 'action',
          position: { x: 100, y: 200 },
          data: { 
            label: 'Extract Invoice Data',
            description: 'AI extracts invoice details',
            app: 'ai-ocr'
          },
        },
        {
          id: '3',
          type: 'condition',
          position: { x: 100, y: 350 },
          data: { 
            label: 'Check Amount',
            description: 'Route based on invoice amount',
          },
        },
        {
          id: '4',
          type: 'approval',
          position: { x: 300, y: 500 },
          data: { 
            label: 'Manager Approval',
            description: 'For amounts < $5000',
            approvers: ['manager']
          },
        },
        {
          id: '5',
          type: 'approval',
          position: { x: -100, y: 500 },
          data: { 
            label: 'CFO Approval',
            description: 'For amounts >= $5000',
            approvers: ['cfo']
          },
        },
        {
          id: '6',
          type: 'action',
          position: { x: 100, y: 650 },
          data: { 
            label: 'Process Payment',
            description: 'Initiate payment via accounting system',
            app: 'quickbooks'
          },
        },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4', label: '< $5000' },
        { id: 'e3-5', source: '3', target: '5', label: '>= $5000' },
        { id: 'e4-6', source: '4', target: '6' },
        { id: 'e5-6', source: '5', target: '6' },
      ],
    },
    createdAt: '2024-07-01T10:30:00Z',
    updatedAt: '2024-12-15T11:45:00Z',
  },
  {
    id: 'wf_support',
    name: 'Support Ticket Routing',
    description: 'AI-powered support ticket classification and routing to appropriate teams',
    status: 'active',
    category: 'support',
    version: 5,
    createdBy: {
      id: 'usr_mike',
      name: 'Mike Brown',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    },
    stats: {
      totalRuns: 1523,
      successRate: 94.3,
      avgDuration: '15 minutes',
      lastRun: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    definition: {
      nodes: [
        {
          id: '1',
          type: 'trigger',
          position: { x: 250, y: 50 },
          data: { 
            label: 'Ticket Created',
            description: 'New support ticket via email',
            triggerType: 'email'
          },
        },
        {
          id: '2',
          type: 'action',
          position: { x: 250, y: 200 },
          data: { 
            label: 'AI Classification',
            description: 'Classify ticket urgency and category',
            app: 'openai'
          },
        },
        {
          id: '3',
          type: 'condition',
          position: { x: 250, y: 350 },
          data: { 
            label: 'Route by Category',
            description: 'Determine team assignment',
          },
        },
        {
          id: '4',
          type: 'action',
          position: { x: 450, y: 500 },
          data: { 
            label: 'Assign to Tech Support',
            description: 'Technical issues',
            app: 'zendesk'
          },
        },
        {
          id: '5',
          type: 'action',
          position: { x: 50, y: 500 },
          data: { 
            label: 'Assign to Billing',
            description: 'Billing inquiries',
            app: 'zendesk'
          },
        },
      ],
      edges: [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4', label: 'Technical' },
        { id: 'e3-5', source: '3', target: '5', label: 'Billing' },
      ],
    },
    createdAt: '2024-06-10T08:15:00Z',
    updatedAt: '2025-01-08T16:30:00Z',
  },
  {
    id: 'wf_lead',
    name: 'Lead Distribution',
    description: 'Automatically score and distribute leads to sales team based on territory and performance',
    status: 'active',
    category: 'sales',
    version: 1,
    createdBy: {
      id: 'usr_lisa',
      name: 'Lisa Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    },
    stats: {
      totalRuns: 892,
      successRate: 96.7,
      avgDuration: '5 minutes',
      lastRun: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    createdAt: '2024-11-01T14:00:00Z',
    updatedAt: '2024-12-20T09:15:00Z',
  },
  {
    id: 'wf_content',
    name: 'Content Approval',
    description: 'Blog post and marketing content approval workflow with compliance checks',
    status: 'active',
    category: 'operations',
    version: 2,
    createdBy: {
      id: 'usr_sarah',
      name: 'Sarah Lee',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    stats: {
      totalRuns: 234,
      successRate: 91.5,
      avgDuration: '6 hours',
      lastRun: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    },
    createdAt: '2024-09-15T10:45:00Z',
    updatedAt: '2024-12-05T15:20:00Z',
  },
  {
    id: 'wf_procurement',
    name: 'Procurement Approval',
    description: 'Purchase request approval with budget validation and vendor verification',
    status: 'draft',
    category: 'finance',
    version: 1,
    createdBy: {
      id: 'usr_john',
      name: 'John Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    stats: {
      totalRuns: 0,
      successRate: 0,
      avgDuration: 'N/A',
    },
    createdAt: '2025-01-10T11:30:00Z',
    updatedAt: '2025-01-10T11:30:00Z',
  },
  {
    id: 'wf_customer_onboarding',
    name: 'Customer Onboarding',
    description: 'Automated customer onboarding with account setup and welcome sequence',
    status: 'draft',
    category: 'sales',
    version: 1,
    createdBy: {
      id: 'usr_lisa',
      name: 'Lisa Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    },
    stats: {
      totalRuns: 0,
      successRate: 0,
      avgDuration: 'N/A',
    },
    createdAt: '2025-01-12T09:00:00Z',
    updatedAt: '2025-01-12T09:00:00Z',
  },
  {
    id: 'wf_expense_report',
    name: 'Expense Report Processing',
    description: 'Automated expense report submission, approval, and reimbursement workflow',
    status: 'draft',
    category: 'finance',
    version: 1,
    createdBy: {
      id: 'usr_mike',
      name: 'Mike Brown',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    },
    stats: {
      totalRuns: 0,
      successRate: 0,
      avgDuration: 'N/A',
    },
    createdAt: '2025-01-13T14:20:00Z',
    updatedAt: '2025-01-13T14:20:00Z',
  },
  {
    id: 'wf_contract_review',
    name: 'Contract Review & Approval',
    description: 'Legal contract review workflow with multi-stakeholder approval',
    status: 'paused',
    category: 'operations',
    version: 4,
    createdBy: {
      id: 'usr_sarah',
      name: 'Sarah Lee',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    stats: {
      totalRuns: 67,
      successRate: 88.1,
      avgDuration: '3.2 days',
      lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    },
    createdAt: '2024-05-20T10:00:00Z',
    updatedAt: '2024-12-28T16:45:00Z',
  },
  {
    id: 'wf_it_provisioning',
    name: 'IT Resource Provisioning',
    description: 'Automated IT resource provisioning for new employees and projects',
    status: 'paused',
    category: 'operations',
    version: 2,
    createdBy: {
      id: 'usr_john',
      name: 'John Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    stats: {
      totalRuns: 143,
      successRate: 95.8,
      avgDuration: '45 minutes',
      lastRun: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    },
    createdAt: '2024-08-05T13:15:00Z',
    updatedAt: '2024-12-22T10:30:00Z',
  },
];

export function getWorkflowsByWorkspace(): Workflow[] {
  // Return all workflows for demo purposes
  return mockWorkflows;
}

export function getWorkflowById(workflowId: string): Workflow | undefined {
  return mockWorkflows.find(w => w.id === workflowId);
}

