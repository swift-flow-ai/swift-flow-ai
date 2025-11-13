import {
  Workspace,
  WorkspaceDashboard,
  Activity,
  Task,
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

export function getMockDashboard(): WorkspaceDashboard {
  const recentActivities: Activity[] = [];

  const myTasks: Task[] = [];

  return {
    stats: {
      activeWorkflows: 0,
      pendingApprovals: 0,
      runningExecutions: 0,
      tasksCompletedToday: 0,
    },
    recentActivity: recentActivities,
    myTasks,
  };
}
