import { WorkflowFolder } from '../../types/collaboration';

export const mockFolders: WorkflowFolder[] = [
  {
    id: 'folder_hr',
    name: 'HR Workflows',
    description: 'All human resources related workflows',
    parentId: null,
    workspaceId: 'ws_acme',
    color: '#3b82f6',
    icon: '👥',
    createdBy: {
      id: 'usr_owner',
      name: 'Admin User',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2025-01-10T14:30:00Z',
    workflowCount: 3,
    subfolderCount: 2,
    path: ['folder_hr'],
  },
  {
    id: 'folder_hr_recruitment',
    name: 'Recruitment',
    description: 'Hiring and recruitment workflows',
    parentId: 'folder_hr',
    workspaceId: 'ws_acme',
    color: '#10b981',
    icon: '🎯',
    createdBy: {
      id: 'usr_sarah',
      name: 'Sarah Lee',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2025-01-12T11:20:00Z',
    workflowCount: 2,
    subfolderCount: 0,
    path: ['folder_hr', 'folder_hr_recruitment'],
  },
  {
    id: 'folder_hr_onboarding',
    name: 'Onboarding',
    description: 'Employee onboarding workflows',
    parentId: 'folder_hr',
    workspaceId: 'ws_acme',
    color: '#8b5cf6',
    icon: '🚀',
    createdBy: {
      id: 'usr_sarah',
      name: 'Sarah Lee',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    createdAt: '2024-02-05T10:30:00Z',
    updatedAt: '2025-01-11T16:45:00Z',
    workflowCount: 1,
    subfolderCount: 0,
    path: ['folder_hr', 'folder_hr_onboarding'],
  },
  {
    id: 'folder_finance',
    name: 'Finance',
    description: 'Financial workflows and approvals',
    parentId: null,
    workspaceId: 'ws_acme',
    color: '#f59e0b',
    icon: '💰',
    createdBy: {
      id: 'usr_john',
      name: 'John Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    createdAt: '2024-03-01T08:00:00Z',
    updatedAt: '2025-01-13T09:15:00Z',
    workflowCount: 2,
    subfolderCount: 0,
    path: ['folder_finance'],
  },
  {
    id: 'folder_it',
    name: 'IT Operations',
    description: 'IT and infrastructure workflows',
    parentId: null,
    workspaceId: 'ws_acme',
    color: '#ef4444',
    icon: '🖥️',
    createdBy: {
      id: 'usr_owner',
      name: 'Admin User',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    },
    createdAt: '2024-01-20T11:00:00Z',
    updatedAt: '2025-01-14T13:00:00Z',
    workflowCount: 1,
    subfolderCount: 0,
    path: ['folder_it'],
  },
];

export function getFoldersByWorkspace(workspaceId: string): WorkflowFolder[] {
  return mockFolders.filter(f => f.workspaceId === workspaceId);
}

export function getFolderById(folderId: string): WorkflowFolder | undefined {
  return mockFolders.find(f => f.id === folderId);
}

export function getRootFolders(workspaceId: string): WorkflowFolder[] {
  return mockFolders.filter(f => f.workspaceId === workspaceId && f.parentId === null);
}

export function getSubfolders(parentId: string): WorkflowFolder[] {
  return mockFolders.filter(f => f.parentId === parentId);
}

export function getFolderPath(folderId: string): WorkflowFolder[] {
  const folder = getFolderById(folderId);
  if (!folder) return [];
  
  return folder.path.map(id => getFolderById(id)).filter(Boolean) as WorkflowFolder[];
}

