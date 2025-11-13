import { TeamPool, PoolType } from '../../types/workspace';

export const mockTeamPools: TeamPool[] = [
  {
    id: 'pool_hr_ops',
    name: 'HR Operations',
    description: 'Handles all HR operational tasks including onboarding, offboarding, and employee lifecycle management',
    type: PoolType.Functional,
    color: '#3b82f6',
    icon: '👥',
    memberIds: ['usr_sarah', 'usr_alice', 'usr_mike'],
    settings: {
      autoAssignment: true,
      roundRobin: true,
      loadBalancing: true,
      notifyOnAssignment: true,
    },
    stats: {
      activeMembers: 3,
      totalAssignments: 247,
      avgResponseTime: '2.5h',
      currentLoad: 12,
    },
    createdBy: {
      id: 'usr_john',
      name: 'John Smith',
    },
    createdAt: '2024-06-15T10:00:00Z',
    updatedAt: '2025-01-10T14:30:00Z',
  },
  {
    id: 'pool_hr_recruiters',
    name: 'HR Recruiters',
    description: 'Recruitment team responsible for candidate sourcing, screening, and interview coordination',
    type: PoolType.Functional,
    color: '#10b981',
    icon: '🎯',
    memberIds: ['usr_lisa', 'usr_sarah'],
    settings: {
      autoAssignment: true,
      roundRobin: true,
      loadBalancing: false,
      notifyOnAssignment: true,
    },
    stats: {
      activeMembers: 2,
      totalAssignments: 189,
      avgResponseTime: '4.2h',
      currentLoad: 8,
    },
    createdBy: {
      id: 'usr_john',
      name: 'John Smith',
    },
    createdAt: '2024-07-01T09:00:00Z',
    updatedAt: '2025-01-08T11:15:00Z',
  },
  {
    id: 'pool_change_advisory',
    name: 'Change Advisory Board',
    description: 'Reviews and approves all production changes, code reviews, and infrastructure updates',
    type: PoolType.Approval,
    color: '#f59e0b',
    icon: '🛡️',
    memberIds: ['usr_john', 'usr_alice', 'usr_bob', 'usr_mike'],
    settings: {
      autoAssignment: false,
      roundRobin: false,
      loadBalancing: false,
      notifyOnAssignment: true,
    },
    stats: {
      activeMembers: 4,
      totalAssignments: 156,
      avgResponseTime: '6.8h',
      currentLoad: 5,
    },
    createdBy: {
      id: 'usr_john',
      name: 'John Smith',
    },
    createdAt: '2024-05-20T14:00:00Z',
    updatedAt: '2025-01-12T16:45:00Z',
  },
  {
    id: 'pool_finance_approvers',
    name: 'Finance Approvers',
    description: 'Approves invoices, expenses, and procurement requests above threshold amounts',
    type: PoolType.Approval,
    color: '#8b5cf6',
    icon: '💰',
    memberIds: ['usr_john', 'usr_bob'],
    settings: {
      autoAssignment: true,
      roundRobin: true,
      loadBalancing: true,
      notifyOnAssignment: true,
    },
    stats: {
      activeMembers: 2,
      totalAssignments: 423,
      avgResponseTime: '3.2h',
      currentLoad: 15,
    },
    createdBy: {
      id: 'usr_john',
      name: 'John Smith',
    },
    createdAt: '2024-08-10T11:30:00Z',
    updatedAt: '2025-01-09T09:20:00Z',
  },
  {
    id: 'pool_support_tier1',
    name: 'Support Tier 1',
    description: 'First line support handling initial customer inquiries and basic troubleshooting',
    type: PoolType.Functional,
    color: '#06b6d4',
    icon: '🎫',
    memberIds: ['usr_mike', 'usr_alice', 'usr_lisa'],
    settings: {
      autoAssignment: true,
      roundRobin: true,
      loadBalancing: true,
      notifyOnAssignment: true,
    },
    stats: {
      activeMembers: 3,
      totalAssignments: 1247,
      avgResponseTime: '15m',
      currentLoad: 23,
    },
    createdBy: {
      id: 'usr_mike',
      name: 'Mike Brown',
    },
    createdAt: '2024-06-01T08:00:00Z',
    updatedAt: '2025-01-14T10:30:00Z',
  },
  {
    id: 'pool_content_reviewers',
    name: 'Content Reviewers',
    description: 'Reviews marketing content, blog posts, and external communications for compliance and quality',
    type: PoolType.Approval,
    color: '#ec4899',
    icon: '📝',
    memberIds: ['usr_sarah', 'usr_lisa', 'usr_alice'],
    settings: {
      autoAssignment: false,
      roundRobin: false,
      loadBalancing: false,
      notifyOnAssignment: true,
    },
    stats: {
      activeMembers: 3,
      totalAssignments: 89,
      avgResponseTime: '5.4h',
      currentLoad: 4,
    },
    createdBy: {
      id: 'usr_sarah',
      name: 'Sarah Lee',
    },
    createdAt: '2024-09-15T13:00:00Z',
    updatedAt: '2025-01-11T15:20:00Z',
  },
];

export function getPoolsByWorkspace(): TeamPool[] {
  return mockTeamPools;
}

export function getPoolById(poolId: string): TeamPool | undefined {
  return mockTeamPools.find(p => p.id === poolId);
}

export function getPoolsByMember(memberId: string): TeamPool[] {
  return mockTeamPools.filter(p => p.memberIds.includes(memberId));
}

