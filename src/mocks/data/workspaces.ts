import { Workspace, WorkspaceDashboard, Activity, Task } from '../../types/workspace';

export const mockWorkspaces: Workspace[] = [
  {
    id: 'ws_acme',
    name: 'Acme Corp',
    slug: 'acme-corp',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Acme',
    color: '#f87855', // Primary coral (brand color)
    role: 'owner',
    memberCount: 15,
    activeWorkflows: 12,
    pendingApprovals: 3,
    unreadNotifications: 5,
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
    createdAt: '2024-06-01T10:00:00Z',
  },
  {
    id: 'ws_techstart',
    name: 'TechStart Inc',
    slug: 'techstart',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=TechStart',
    color: '#f85c39', // Accent coral/orange (brand color)
    role: 'member',
    memberCount: 8,
    activeWorkflows: 5,
    pendingApprovals: 1,
    unreadNotifications: 2,
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    createdAt: '2024-09-15T14:30:00Z',
  },
  {
    id: 'ws_client',
    name: 'Client Project',
    slug: 'client-project',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=Client',
    color: '#10b981', // Green (alternative)
    role: 'viewer',
    memberCount: 12,
    activeWorkflows: 8,
    pendingApprovals: 5,
    unreadNotifications: 8,
    lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    createdAt: '2024-10-20T09:15:00Z',
  },
];

export function getMockDashboard(): WorkspaceDashboard {
  const recentActivities: Activity[] = [
    {
      id: 'act_1',
      type: 'workflow_completed',
      title: 'Employee Onboarding completed',
      description: 'Sarah Johnson onboarded successfully',
      workflow: {
        id: 'wf_onboarding',
        name: 'Employee Onboarding',
      },
      user: {
        id: 'usr_system',
        name: 'System',
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    {
      id: 'act_2',
      type: 'approval_needed',
      title: 'New approval request',
      description: 'Equipment purchase awaiting approval',
      workflow: {
        id: 'wf_onboarding',
        name: 'Employee Onboarding',
      },
      user: {
        id: 'usr_john',
        name: 'John Smith',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    },
    {
      id: 'act_3',
      type: 'workflow_created',
      title: 'New workflow created',
      description: 'Invoice Approval workflow',
      workflow: {
        id: 'wf_invoice',
        name: 'Invoice Approval',
      },
      user: {
        id: 'usr_sarah',
        name: 'Sarah Lee',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
      id: 'act_4',
      type: 'member_joined',
      title: 'New member joined',
      description: 'Mike Brown joined the workspace',
      user: {
        id: 'usr_mike',
        name: 'Mike Brown',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    },
    {
      id: 'act_5',
      type: 'workflow_failed',
      title: 'Workflow execution failed',
      description: 'Customer Support Ticket - Timeout error',
      workflow: {
        id: 'wf_support',
        name: 'Support Ticket Routing',
      },
      user: {
        id: 'usr_system',
        name: 'System',
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    },
  ];

  const myTasks: Task[] = [
    {
      id: 'task_1',
      type: 'approval',
      title: 'Approve equipment purchase',
      description: 'MacBook Pro M3 + accessories for new hire',
      workflow: 'Employee Onboarding',
      priority: 'high',
      dueAt: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString(), // 4 hours from now
      createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    },
    {
      id: 'task_2',
      type: 'approval',
      title: 'Review contract terms',
      description: 'Vendor contract renewal - $50k annual',
      workflow: 'Procurement Approval',
      priority: 'critical',
      dueAt: new Date(Date.now() + 1000 * 60 * 30).toISOString(), // 30 mins from now
      createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    },
    {
      id: 'task_3',
      type: 'review',
      title: 'Review marketing content',
      description: 'Q1 campaign materials',
      workflow: 'Content Approval',
      priority: 'medium',
      dueAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 1 day from now
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    },
  ];

  return {
    stats: {
      activeWorkflows: 12,
      pendingApprovals: 3,
      runningExecutions: 5,
      tasksCompletedToday: 87,
    },
    recentActivity: recentActivities,
    myTasks,
  };
}

