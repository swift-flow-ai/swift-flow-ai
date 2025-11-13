import { WorkflowFolder } from '../../types/collaboration';

export const mockFolders: WorkflowFolder[] = [
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

