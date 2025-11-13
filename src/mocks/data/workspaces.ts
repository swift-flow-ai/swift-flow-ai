import {
  Workspace,
  WorkspaceHome,
  WorkflowRun,
  PendingItem,
  Activity,
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
      status: "success",
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
      status: "running",
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
      status: "success",
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
      type: "approval",
      title: "Approve equipment purchase",
      description: "MacBook Pro M3 + accessories for new hire",
      workflowId: "wf_1",
      workflowName: "Employee Onboarding",
      priority: "high",
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
      type: "review",
      title: "Review contract terms",
      description: "Vendor contract renewal - $50k annual",
      workflowId: "wf_2",
      workflowName: "Procurement Approval",
      priority: "critical",
      dueAt: new Date(now + 30 * 60 * 1000).toISOString(),
      createdAt: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const activity: Activity[] = [
    {
      id: "act_1",
      type: "member_joined",
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
      type: "workflow_created",
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
