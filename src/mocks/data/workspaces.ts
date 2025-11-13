import {
  Workspace,
  WorkspaceHome,
  WorkflowRun,
  PendingItem,
  Activity,
  WorkflowRunStatus,
  PendingItemType,
  Priority,
  ActivityType,
} from "../../types/workspace";
import { Role } from "../../types/rbac";

// Helper function to generate random lastActiveAt time (between 5 minutes and 7 days ago)
const getRandomLastActiveAt = (): string => {
  const minutesAgo = Math.random() * (7 * 24 * 60) + 5; // 5 minutes to 7 days
  return new Date(Date.now() - minutesAgo * 60 * 1000).toISOString();
};

export const mockWorkspaces: Workspace[] = [
  {
    id: "ws_vercel",
    name: "Vercel",
    slug: "vercel",
    logo: "https://logo.clearbit.com/vercel.com",
    color: "#000000",
    role: Role.Owner,
    memberCount: 15,
    activeWorkflows: 0,
    pendingApprovals: 0,
    unreadNotifications: 5,
    lastActiveAt: getRandomLastActiveAt(),
    createdAt: "2024-06-01T10:00:00Z",
  },
  {
    id: "ws_stripe",
    name: "Stripe",
    slug: "stripe",
    logo: "https://logo.clearbit.com/stripe.com",
    color: "#635bff",
    role: Role.Member,
    memberCount: 8,
    activeWorkflows: 0,
    pendingApprovals: 0,
    unreadNotifications: 2,
    lastActiveAt: getRandomLastActiveAt(),
    createdAt: "2024-09-15T14:30:00Z",
  },
  {
    id: "ws_linear",
    name: "Linear",
    slug: "linear",
    logo: "https://logo.clearbit.com/linear.app",
    color: "#5e6ad2",
    role: Role.Viewer,
    memberCount: 12,
    activeWorkflows: 0,
    pendingApprovals: 0,
    unreadNotifications: 8,
    lastActiveAt: getRandomLastActiveAt(),
    createdAt: "2024-10-20T09:15:00Z",
  },
];

export function getMockHome(): WorkspaceHome {
  const now = Date.now();

  const recentRuns: WorkflowRun[] = [
    {
      id: "run_1",
      workflowId: "wf_1",
      workflowName: "Customer Onboarding",
      status: WorkflowRunStatus.Success,
      startedAt: new Date(now - 15 * 60 * 1000).toISOString(),
      completedAt: new Date(now - 14 * 60 * 1000).toISOString(),
      duration: 60000,
      triggeredBy: {
        id: "usr_1",
        name: "Sarah Lee",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
      taskCount: 5,
      successCount: 5,
      failureCount: 0,
    },
    {
      id: "run_2",
      workflowId: "wf_2",
      workflowName: "Invoice Processing",
      status: WorkflowRunStatus.Running,
      startedAt: new Date(now - 5 * 60 * 1000).toISOString(),
      triggeredBy: {
        id: "usr_2",
        name: "Mike Brown",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      },
      taskCount: 3,
      successCount: 2,
      failureCount: 0,
    },
    {
      id: "run_3",
      workflowId: "wf_3",
      workflowName: "Lead Qualification",
      status: WorkflowRunStatus.Success,
      startedAt: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
      completedAt: new Date(now - 2 * 60 * 60 * 1000 + 45000).toISOString(),
      duration: 45000,
      triggeredBy: {
        id: "usr_3",
        name: "John Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      },
      taskCount: 4,
      successCount: 4,
      failureCount: 0,
    },
  ];

  const pendingItems: PendingItem[] = [
    {
      id: "pending_1",
      type: PendingItemType.Approval,
      title: "Approve equipment purchase",
      description: "MacBook Pro M3 + accessories for new hire",
      workflowId: "wf_1",
      workflowName: "Employee Onboarding",
      priority: Priority.High,
      dueAt: new Date(now + 4 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(now - 45 * 60 * 1000).toISOString(),
      assignedTo: {
        id: "usr_current",
        name: "You",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      },
    },
    {
      id: "pending_2",
      type: PendingItemType.Review,
      title: "Review contract terms",
      description: "Vendor contract renewal - $50k annual",
      workflowId: "wf_2",
      workflowName: "Procurement Approval",
      priority: Priority.Critical,
      dueAt: new Date(now + 30 * 60 * 1000).toISOString(),
      createdAt: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const activity: Activity[] = [
    {
      id: "act_1",
      type: ActivityType.MemberJoined,
      title: "New member joined",
      description: "Mike Brown joined the workspace",
      user: {
        id: "usr_mike",
        name: "Mike Brown",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      },
      timestamp: new Date(now - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "act_2",
      type: ActivityType.WorkflowCreated,
      title: "New workflow created",
      description: "Customer Support Automation",
      workflow: {
        id: "wf_new",
        name: "Customer Support Automation",
      },
      user: {
        id: "usr_sarah",
        name: "Sarah Lee",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
      timestamp: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
    },
  ];

  return {
    recentRuns,
    overview: {
      totalWorkflows: 12,
      activeWorkflows: 8,
      totalRuns: 1247,
      successRate: 94.2,
    },
    workflowStatus: {
      active: 8,
      paused: 2,
      draft: 1,
      error: 1,
    },
    activity,
    pendingItems,
  };
}

// Mock workspace members for workspace settings
export const mockWorkspaceMembers = [
  {
    id: 'usr_admin',
    name: 'Admin User',
    email: 'admin@vercel.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    role: 'owner',
    status: 'active',
    joinedAt: '2024-06-01T10:00:00Z',
    lastActiveAt: '2025-11-13T15:00:00Z',
  },
  {
    id: 'usr_john_ws',
    name: 'John Smith',
    email: 'john@vercel.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnWS',
    role: 'admin',
    status: 'active',
    joinedAt: '2024-06-05T09:00:00Z',
    lastActiveAt: '2025-11-13T14:30:00Z',
  },
  {
    id: 'usr_sarah_ws',
    name: 'Sarah Connor',
    email: 'sarah@vercel.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahWS',
    role: 'member',
    status: 'active',
    joinedAt: '2024-06-10T11:15:00Z',
    lastActiveAt: '2025-11-13T13:45:00Z',
  },
  {
    id: 'usr_mike_ws',
    name: 'Mike Johnson',
    email: 'mike@vercel.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MikeWS',
    role: 'member',
    status: 'active',
    joinedAt: '2024-07-01T08:30:00Z',
    lastActiveAt: '2025-11-13T12:20:00Z',
  },
  {
    id: 'usr_lisa_ws',
    name: 'Lisa Park',
    email: 'lisa@vercel.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LisaWS',
    role: 'viewer',
    status: 'active',
    joinedAt: '2024-08-15T14:00:00Z',
    lastActiveAt: '2025-11-13T11:50:00Z',
  },
  {
    id: 'usr_pending',
    name: 'Alex Thompson',
    email: 'alex@vercel.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexWS',
    role: 'member',
    status: 'invited',
    joinedAt: '2025-11-12T16:00:00Z',
    invitedBy: {
      id: 'usr_admin',
      name: 'Admin User'
    },
  },
];
