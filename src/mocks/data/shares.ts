import {
  WorkflowShare,
  ShareLink,
  FolderShare,
} from "../../types/collaboration";

export const mockWorkflowShares: WorkflowShare[] = [];

export const mockShareLinks: ShareLink[] = [];

export const mockFolderShares: FolderShare[] = [
  {
    id: "fshare_1",
    folderId: "folder_hr",
    userId: "usr_john",
    user: {
      id: "usr_john",
      name: "John Smith",
      email: "john@acme.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    permission: "editor",
    sharedBy: {
      id: "usr_owner",
      name: "Admin User",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    },
    sharedAt: "2024-11-01T10:00:00Z",
    inherited: false,
  },
  {
    id: "fshare_2",
    folderId: "folder_hr_recruitment",
    userId: "usr_john",
    user: {
      id: "usr_john",
      name: "John Smith",
      email: "john@acme.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    permission: "editor",
    sharedBy: {
      id: "usr_owner",
      name: "Admin User",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    },
    sharedAt: "2024-11-01T10:00:00Z",
    inherited: true, // Inherited from parent folder_hr
  },
  {
    id: "fshare_3",
    folderId: "folder_finance",
    userId: "usr_alice",
    user: {
      id: "usr_alice",
      name: "Alice Johnson",
      email: "alice@acme.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    },
    permission: "viewer",
    sharedBy: {
      id: "usr_john",
      name: "John Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    sharedAt: "2024-12-10T14:00:00Z",
    inherited: false,
  },
];

/* eslint-disable @typescript-eslint/no-unused-vars */
export function getWorkflowShares(_workflowId: string): WorkflowShare[] {
  return [];
}
/* eslint-enable @typescript-eslint/no-unused-vars */

export function getFolderShares(folderId: string): FolderShare[] {
  return mockFolderShares.filter((s) => s.folderId === folderId);
}

export function getShareLink(
  resourceId: string,
  resourceType: "workflow" | "folder"
): ShareLink | undefined {
  if (resourceType === "workflow") {
    return undefined;
  }
  return mockShareLinks.find(
    (l) =>
      l.resourceId === resourceId &&
      l.resourceType === resourceType &&
      l.isActive
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export function getUserWorkflowPermission(
  _workflowId: string,
  _userId: string
): "viewer" | "commenter" | "editor" | "owner" | null {
  return null;
}
/* eslint-enable @typescript-eslint/no-unused-vars */
