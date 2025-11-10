import { WorkflowShare, ShareLink, FolderShare } from '../../types/collaboration';

export const mockWorkflowShares: WorkflowShare[] = [
  {
    id: 'share_1',
    workflowId: 'wf_recruitment',
    userId: 'usr_sarah',
    user: {
      id: 'usr_sarah',
      name: 'Sarah Lee',
      email: 'sarah@acme.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    permission: 'editor',
    sharedBy: {
      id: 'usr_owner',
      name: 'Admin User',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    },
    sharedAt: '2024-12-01T10:00:00Z',
    lastAccessedAt: '2025-01-14T15:30:00Z',
  },
  {
    id: 'share_2',
    workflowId: 'wf_recruitment',
    userId: 'usr_mike',
    user: {
      id: 'usr_mike',
      name: 'Mike Brown',
      email: 'mike@acme.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    },
    permission: 'commenter',
    sharedBy: {
      id: 'usr_owner',
      name: 'Admin User',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    },
    sharedAt: '2024-12-05T14:20:00Z',
    lastAccessedAt: '2025-01-13T11:15:00Z',
  },
  {
    id: 'share_3',
    workflowId: 'wf_onboarding',
    userId: 'usr_john',
    user: {
      id: 'usr_john',
      name: 'John Smith',
      email: 'john@acme.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    permission: 'editor',
    sharedBy: {
      id: 'usr_sarah',
      name: 'Sarah Lee',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    sharedAt: '2024-11-20T09:00:00Z',
    lastAccessedAt: '2025-01-12T16:45:00Z',
  },
  {
    id: 'share_4',
    workflowId: 'wf_invoice',
    userId: 'usr_alice',
    user: {
      id: 'usr_alice',
      name: 'Alice Johnson',
      email: 'alice@acme.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    },
    permission: 'viewer',
    sharedBy: {
      id: 'usr_john',
      name: 'John Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    sharedAt: '2025-01-05T13:30:00Z',
    lastAccessedAt: '2025-01-10T10:20:00Z',
  },
];

export const mockShareLinks: ShareLink[] = [
  {
    id: 'link_1',
    resourceId: 'wf_recruitment',
    resourceType: 'workflow',
    token: 'abc123xyz789',
    url: 'https://swiftflow.ai/share/abc123xyz789',
    permission: 'viewer',
    createdBy: {
      id: 'usr_owner',
      name: 'Admin User',
    },
    createdAt: '2024-12-15T10:00:00Z',
    accessCount: 24,
    lastAccessedAt: '2025-01-14T14:20:00Z',
    isActive: true,
  },
  {
    id: 'link_2',
    resourceId: 'folder_hr',
    resourceType: 'folder',
    token: 'def456uvw012',
    url: 'https://swiftflow.ai/share/def456uvw012',
    permission: 'commenter',
    password: 'hashed_password_here',
    expiresAt: '2025-02-28T23:59:59Z',
    createdBy: {
      id: 'usr_sarah',
      name: 'Sarah Lee',
    },
    createdAt: '2025-01-01T08:00:00Z',
    accessCount: 12,
    lastAccessedAt: '2025-01-13T16:30:00Z',
    isActive: true,
  },
];

export const mockFolderShares: FolderShare[] = [
  {
    id: 'fshare_1',
    folderId: 'folder_hr',
    userId: 'usr_john',
    user: {
      id: 'usr_john',
      name: 'John Smith',
      email: 'john@acme.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    permission: 'editor',
    sharedBy: {
      id: 'usr_owner',
      name: 'Admin User',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    },
    sharedAt: '2024-11-01T10:00:00Z',
    inherited: false,
  },
  {
    id: 'fshare_2',
    folderId: 'folder_hr_recruitment',
    userId: 'usr_john',
    user: {
      id: 'usr_john',
      name: 'John Smith',
      email: 'john@acme.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    permission: 'editor',
    sharedBy: {
      id: 'usr_owner',
      name: 'Admin User',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    },
    sharedAt: '2024-11-01T10:00:00Z',
    inherited: true, // Inherited from parent folder_hr
  },
  {
    id: 'fshare_3',
    folderId: 'folder_finance',
    userId: 'usr_alice',
    user: {
      id: 'usr_alice',
      name: 'Alice Johnson',
      email: 'alice@acme.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    },
    permission: 'viewer',
    sharedBy: {
      id: 'usr_john',
      name: 'John Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    sharedAt: '2024-12-10T14:00:00Z',
    inherited: false,
  },
];

export function getWorkflowShares(workflowId: string): WorkflowShare[] {
  return mockWorkflowShares.filter(s => s.workflowId === workflowId);
}

export function getFolderShares(folderId: string): FolderShare[] {
  return mockFolderShares.filter(s => s.folderId === folderId);
}

export function getShareLink(resourceId: string, resourceType: 'workflow' | 'folder'): ShareLink | undefined {
  return mockShareLinks.find(l => l.resourceId === resourceId && l.resourceType === resourceType && l.isActive);
}

export function getUserWorkflowPermission(workflowId: string, userId: string): 'viewer' | 'commenter' | 'editor' | 'owner' | null {
  const share = mockWorkflowShares.find(s => s.workflowId === workflowId && s.userId === userId);
  return share ? share.permission : null;
}

