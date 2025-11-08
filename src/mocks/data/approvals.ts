import { Approval } from '../../types/workspace';

export const mockApprovals: Approval[] = [
  {
    id: 'apr_1',
    workflowName: 'Employee Onboarding',
    executionId: 'exec_123',
    title: 'Approve equipment purchase',
    description: 'Review and approve equipment request for Sarah Johnson',
    priority: 'high',
    status: 'pending',
    data: {
      employee: {
        name: 'Sarah Johnson',
        role: 'Software Engineer',
        department: 'Engineering',
        startDate: '2025-02-01',
      },
      equipment: {
        laptop: 'MacBook Pro M3 (16GB RAM)',
        monitor: '27" External Display',
        accessories: 'Keyboard, Mouse, Headset',
        totalCost: 3200,
      },
    },
    aiRecommendation: {
      decision: 'approve',
      confidence: 95,
      reasoning: 'Within budget, standard configuration for Software Engineer role. Similar requests approved in average 2 hours.',
      similarCases: 12,
    },
    sla: {
      dueAt: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(),
      remainingTime: '3h 45m',
      breached: false,
    },
    submittedBy: {
      id: 'usr_system',
      name: 'System',
    },
    assignedTo: [
      {
        id: 'usr_tom',
        name: 'Tom Wilson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom',
      },
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'apr_2',
    workflowName: 'Procurement Approval',
    executionId: 'exec_456',
    title: 'Vendor contract renewal',
    description: 'Annual contract renewal with CloudServices Inc',
    priority: 'critical',
    status: 'pending',
    data: {
      vendor: {
        name: 'CloudServices Inc',
        service: 'Cloud Infrastructure',
        contractValue: 50000,
        term: '12 months',
        renewalDate: '2025-02-15',
      },
      changes: {
        priceIncrease: '5%',
        newFeatures: ['Advanced monitoring', '24/7 support'],
      },
    },
    aiRecommendation: {
      decision: 'approve',
      confidence: 88,
      reasoning: 'Price increase is below market rate. Vendor has excellent track record (99.9% uptime). Recommended to approve with minor contract adjustments.',
      similarCases: 8,
    },
    sla: {
      dueAt: new Date(Date.now() + 1000 * 60 * 30).toISOString(),
      remainingTime: '25m',
      breached: false,
    },
    submittedBy: {
      id: 'usr_john',
      name: 'John Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    assignedTo: [
      {
        id: 'usr_sarah',
        name: 'Sarah Lee',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      },
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'apr_3',
    workflowName: 'Content Approval',
    executionId: 'exec_789',
    title: 'Review marketing blog post',
    description: 'Q1 Product Launch announcement - "Introducing AI-Powered Workflows"',
    priority: 'medium',
    status: 'pending',
    data: {
      content: {
        title: 'Introducing AI-Powered Workflows',
        author: 'Marketing Team',
        wordCount: 1250,
        targetDate: '2025-01-20',
        category: 'Product Announcement',
      },
      aiAnalysis: {
        sentiment: 'positive',
        readabilityScore: 82,
        seoScore: 88,
        complianceIssues: 0,
      },
    },
    aiRecommendation: {
      decision: 'approve',
      confidence: 92,
      reasoning: 'Content meets all quality standards. SEO optimization is good. No compliance or legal issues detected. Tone is appropriate for target audience.',
      similarCases: 15,
    },
    sla: {
      dueAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      remainingTime: '23h 15m',
      breached: false,
    },
    submittedBy: {
      id: 'usr_lisa',
      name: 'Lisa Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    },
    assignedTo: [
      {
        id: 'usr_mike',
        name: 'Mike Brown',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      },
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
];

export function getApprovalsByWorkspace(): Approval[] {
  return mockApprovals.filter(a => a.status === 'pending');
}

export function getApprovalById(approvalId: string): Approval | undefined {
  return mockApprovals.find(a => a.id === approvalId);
}

