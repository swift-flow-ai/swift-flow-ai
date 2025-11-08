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
];

export function getWorkflowsByWorkspace(): Workflow[] {
  // Return all workflows for demo purposes
  return mockWorkflows;
}

export function getWorkflowById(workflowId: string): Workflow | undefined {
  return mockWorkflows.find(w => w.id === workflowId);
}

