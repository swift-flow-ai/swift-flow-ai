import { TeamMember, MemberStatus } from '../../types/workspace';
import { Role } from '../../types/rbac';

export const mockTeamMembers: TeamMember[] = [
  {
    id: 'usr_owner',
    name: 'Admin User',
    email: 'admin@acme.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    role: Role.Owner,
    status: MemberStatus.Active,
    stats: {
      workflowsCreated: 25,
      approvalsHandled: 150,
      avgApprovalTime: '2.1h',
    },
    joinedAt: '2024-01-01T10:00:00Z',
    lastActiveAt: '2025-01-15T15:00:00Z',
    poolIds: [],
  },
  {
    id: 'usr_john',
    name: 'John Smith',
    email: 'john@acme.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    role: Role.Admin,
    status: MemberStatus.Active,
    stats: {
      workflowsCreated: 12,
      approvalsHandled: 234,
      avgApprovalTime: '4.2h',
    },
    joinedAt: '2024-01-15T10:00:00Z',
    lastActiveAt: '2025-01-15T14:30:00Z',
    poolIds: ['pool_change_advisory', 'pool_finance_approvers'],
  },
  {
    id: 'usr_sarah',
    name: 'Sarah Lee',
    email: 'sarah@acme.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    role: Role.Member,
    status: MemberStatus.Active,
    stats: {
      workflowsCreated: 18,
      approvalsHandled: 156,
      avgApprovalTime: '3.1h',
    },
    joinedAt: '2024-02-01T09:00:00Z',
    lastActiveAt: '2025-01-15T13:45:00Z',
    poolIds: ['pool_hr_ops', 'pool_hr_recruiters', 'pool_content_reviewers'],
  },
  {
    id: 'usr_mike',
    name: 'Mike Brown',
    email: 'mike@acme.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    role: Role.Member,
    status: MemberStatus.Active,
    stats: {
      workflowsCreated: 8,
      approvalsHandled: 89,
      avgApprovalTime: '2.8h',
    },
    joinedAt: '2024-03-10T11:30:00Z',
    lastActiveAt: '2025-01-15T12:20:00Z',
    poolIds: ['pool_hr_ops', 'pool_change_advisory', 'pool_support_tier1'],
  },
  {
    id: 'usr_lisa',
    name: 'Lisa Chen',
    email: 'lisa@acme.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    role: Role.Member,
    status: MemberStatus.Active,
    stats: {
      workflowsCreated: 15,
      approvalsHandled: 203,
      avgApprovalTime: '3.5h',
    },
    joinedAt: '2024-04-05T08:15:00Z',
    lastActiveAt: '2025-01-15T11:50:00Z',
    poolIds: ['pool_hr_recruiters', 'pool_support_tier1', 'pool_content_reviewers'],
  },
  {
    id: 'usr_alice',
    name: 'Alice Johnson',
    email: 'alice@acme.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    role: Role.Viewer,
    status: MemberStatus.Active,
    stats: {
      workflowsCreated: 0,
      approvalsHandled: 312,
      avgApprovalTime: '2.3h',
    },
    joinedAt: '2024-05-20T10:45:00Z',
    lastActiveAt: '2025-01-15T14:10:00Z',
    poolIds: ['pool_hr_ops', 'pool_change_advisory', 'pool_support_tier1', 'pool_content_reviewers'],
  },
  {
    id: 'usr_bob',
    name: 'Bob Williams',
    email: 'bob@acme.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    role: Role.Viewer,
    status: MemberStatus.Active,
    stats: {
      workflowsCreated: 0,
      approvalsHandled: 278,
      avgApprovalTime: '3.8h',
    },
    joinedAt: '2024-06-10T14:00:00Z',
    lastActiveAt: '2025-01-15T10:30:00Z',
    poolIds: ['pool_change_advisory', 'pool_finance_approvers'],
  },
  {
    id: 'usr_emma',
    name: 'Emma Davis',
    email: 'emma@acme.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    role: Role.Viewer,
    status: MemberStatus.Active,
    stats: {
      workflowsCreated: 0,
      approvalsHandled: 0,
      avgApprovalTime: 'N/A',
    },
    joinedAt: '2024-08-15T09:30:00Z',
    lastActiveAt: '2025-01-15T09:15:00Z',
    poolIds: [],
  },
  {
    id: 'usr_david',
    name: 'David Martinez',
    email: 'david@acme.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    role: Role.Guest,
    status: MemberStatus.Invited,
    stats: {
      workflowsCreated: 0,
      approvalsHandled: 0,
      avgApprovalTime: 'N/A',
    },
    joinedAt: '2025-01-12T16:00:00Z',
    lastActiveAt: '2025-01-12T16:00:00Z',
    poolIds: [],
  },
];

export function getTeamMembersByWorkspace(): TeamMember[] {
  return mockTeamMembers;
}

export function getTeamMemberById(memberId: string): TeamMember | undefined {
  return mockTeamMembers.find(m => m.id === memberId);
}

export function getTeamMembersByPool(poolId: string): TeamMember[] {
  return mockTeamMembers.filter(m => m.poolIds?.includes(poolId));
}

