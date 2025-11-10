import { WorkflowComment } from '../../types/collaboration';

export const mockComments: WorkflowComment[] = [
  {
    id: 'comment_1',
    workflowId: 'wf_recruitment',
    nodeId: 'node_4',
    content: 'Should we reduce the wait time from 5 days to 3 days? Candidates are dropping off.',
    author: {
      id: 'usr_sarah',
      name: 'Sarah Lee',
      email: 'sarah@acme.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    mentions: ['usr_owner'],
    createdAt: '2025-01-10T14:30:00Z',
    updatedAt: '2025-01-10T14:30:00Z',
    isResolved: false,
    replyCount: 2,
    replies: [
      {
        id: 'comment_1_reply_1',
        workflowId: 'wf_recruitment',
        nodeId: 'node_4',
        parentId: 'comment_1',
        content: 'Good point! Let me check the analytics first.',
        author: {
          id: 'usr_owner',
          name: 'Admin User',
          email: 'admin@acme.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
        },
        mentions: [],
        createdAt: '2025-01-10T15:00:00Z',
        updatedAt: '2025-01-10T15:00:00Z',
        isResolved: false,
        replyCount: 0,
      },
      {
        id: 'comment_1_reply_2',
        workflowId: 'wf_recruitment',
        nodeId: 'node_4',
        parentId: 'comment_1',
        content: 'Analytics show 12% SLA breach rate. Reducing to 3 days makes sense. @sarah can you update?',
        author: {
          id: 'usr_owner',
          name: 'Admin User',
          email: 'admin@acme.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
        },
        mentions: ['usr_sarah'],
        createdAt: '2025-01-10T16:20:00Z',
        updatedAt: '2025-01-10T16:20:00Z',
        isResolved: false,
        replyCount: 0,
      },
    ],
  },
  {
    id: 'comment_2',
    workflowId: 'wf_recruitment',
    nodeId: 'node_8',
    content: 'The interviewer response timeout is too long. Can we add an escalation after 12 hours?',
    author: {
      id: 'usr_mike',
      name: 'Mike Brown',
      email: 'mike@acme.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    },
    mentions: ['usr_sarah', 'usr_owner'],
    createdAt: '2025-01-11T10:15:00Z',
    updatedAt: '2025-01-11T10:15:00Z',
    isResolved: true,
    resolvedBy: {
      id: 'usr_sarah',
      name: 'Sarah Lee',
    },
    resolvedAt: '2025-01-12T09:30:00Z',
    replyCount: 1,
    replies: [
      {
        id: 'comment_2_reply_1',
        workflowId: 'wf_recruitment',
        nodeId: 'node_8',
        parentId: 'comment_2',
        content: 'Done! Added escalation node after 12 hours.',
        author: {
          id: 'usr_sarah',
          name: 'Sarah Lee',
          email: 'sarah@acme.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        },
        mentions: ['usr_mike'],
        createdAt: '2025-01-12T09:30:00Z',
        updatedAt: '2025-01-12T09:30:00Z',
        isResolved: false,
        replyCount: 0,
      },
    ],
  },
  {
    id: 'comment_3',
    workflowId: 'wf_recruitment',
    content: 'Overall workflow looks great! Ready to publish once we address the wait time issue.',
    author: {
      id: 'usr_john',
      name: 'John Smith',
      email: 'john@acme.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    mentions: ['usr_sarah'],
    createdAt: '2025-01-12T11:00:00Z',
    updatedAt: '2025-01-12T11:00:00Z',
    isResolved: false,
    replyCount: 0,
  },
  {
    id: 'comment_4',
    workflowId: 'wf_onboarding',
    nodeId: 'node_2',
    content: 'Should we add a welcome email before the IT setup?',
    author: {
      id: 'usr_alice',
      name: 'Alice Johnson',
      email: 'alice@acme.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    },
    mentions: [],
    createdAt: '2025-01-13T14:20:00Z',
    updatedAt: '2025-01-13T14:20:00Z',
    isResolved: false,
    replyCount: 0,
  },
  {
    id: 'comment_5',
    workflowId: 'wf_invoice',
    nodeId: 'node_1',
    content: 'The approval threshold should be $5,000 not $10,000 per company policy.',
    author: {
      id: 'usr_john',
      name: 'John Smith',
      email: 'john@acme.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    mentions: ['usr_owner'],
    createdAt: '2025-01-14T09:45:00Z',
    updatedAt: '2025-01-14T09:45:00Z',
    isResolved: true,
    resolvedBy: {
      id: 'usr_owner',
      name: 'Admin User',
    },
    resolvedAt: '2025-01-14T10:30:00Z',
    replyCount: 1,
    replies: [
      {
        id: 'comment_5_reply_1',
        workflowId: 'wf_invoice',
        nodeId: 'node_1',
        parentId: 'comment_5',
        content: 'Updated! Thanks for catching that.',
        author: {
          id: 'usr_owner',
          name: 'Admin User',
          email: 'admin@acme.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
        },
        mentions: ['usr_john'],
        createdAt: '2025-01-14T10:30:00Z',
        updatedAt: '2025-01-14T10:30:00Z',
        isResolved: false,
        replyCount: 0,
      },
    ],
  },
];

export function getWorkflowComments(workflowId: string): WorkflowComment[] {
  return mockComments
    .filter(c => c.workflowId === workflowId && !c.parentId)
    .map(c => ({
      ...c,
      replies: mockComments.filter(r => r.parentId === c.id),
    }));
}

export function getNodeComments(workflowId: string, nodeId: string): WorkflowComment[] {
  return mockComments
    .filter(c => c.workflowId === workflowId && c.nodeId === nodeId && !c.parentId)
    .map(c => ({
      ...c,
      replies: mockComments.filter(r => r.parentId === c.id),
    }));
}

export function getUnresolvedCommentCount(workflowId: string): number {
  return mockComments.filter(c => c.workflowId === workflowId && !c.isResolved && !c.parentId).length;
}

export function getTotalCommentCount(workflowId: string): number {
  return mockComments.filter(c => c.workflowId === workflowId && !c.parentId).length;
}

export function getUserMentions(userId: string): WorkflowComment[] {
  return mockComments.filter(c => c.mentions.includes(userId));
}

