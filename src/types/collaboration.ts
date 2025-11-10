// Collaboration Types for Workflow Sharing, Comments, Folders, etc.

export type SharePermission = 'viewer' | 'commenter' | 'editor' | 'owner';
export type WorkflowStatus = 'draft' | 'published' | 'archived';
export type ReviewStatus = 'pending' | 'approved' | 'changes_requested' | 'rejected';

// Folder Types
export interface WorkflowFolder {
  id: string;
  name: string;
  description?: string;
  parentId: string | null; // null for root folders
  workspaceId: string;
  color?: string;
  icon?: string;
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  workflowCount: number;
  subfolderCount: number;
  path: string[]; // Array of folder IDs from root to current
  shares?: FolderShare[];
}

// Sharing Types
export interface WorkflowShare {
  id: string;
  workflowId: string;
  userId?: string; // undefined for link shares
  user?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  permission: SharePermission;
  sharedBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  sharedAt: string;
  expiresAt?: string;
  lastAccessedAt?: string;
}

export interface FolderShare {
  id: string;
  folderId: string;
  userId?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  permission: SharePermission;
  sharedBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  sharedAt: string;
  expiresAt?: string;
  inherited: boolean; // true if inherited from parent folder
}

export interface ShareLink {
  id: string;
  resourceId: string; // workflow or folder ID
  resourceType: 'workflow' | 'folder';
  token: string;
  url: string;
  permission: SharePermission;
  password?: string;
  expiresAt?: string;
  createdBy: {
    id: string;
    name: string;
  };
  createdAt: string;
  accessCount: number;
  lastAccessedAt?: string;
  isActive: boolean;
}

// Comment Types
export interface WorkflowComment {
  id: string;
  workflowId: string;
  nodeId?: string; // undefined for general workflow comments
  parentId?: string; // for threaded replies
  content: string;
  author: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  mentions: string[]; // user IDs mentioned in comment
  createdAt: string;
  updatedAt: string;
  isResolved: boolean;
  resolvedBy?: {
    id: string;
    name: string;
  };
  resolvedAt?: string;
  replies?: WorkflowComment[];
  replyCount: number;
}

// Draft & Review Types
export interface WorkflowDraft {
  id: string;
  workflowId: string;
  version: number;
  status: WorkflowStatus;
  reviewStatus?: ReviewStatus;
  definition: unknown; // workflow definition
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  reviewers?: ReviewRequest[];
  changesSummary?: string;
}

export interface ReviewRequest {
  id: string;
  workflowId: string;
  draftVersion: number;
  reviewer: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  status: ReviewStatus;
  requestedBy: {
    id: string;
    name: string;
  };
  requestedAt: string;
  reviewedAt?: string;
  feedback?: string;
  changes?: ReviewChange[];
}

export interface ReviewChange {
  id: string;
  type: 'add' | 'remove' | 'modify';
  nodeId?: string;
  field?: string;
  oldValue?: unknown;
  newValue?: unknown;
  description: string;
}

// Version History Types
export interface WorkflowVersion {
  id: string;
  workflowId: string;
  version: number;
  definition: unknown;
  changesSummary: string;
  changedBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  isCurrentVersion: boolean;
  changes: VersionChange[];
}

export interface VersionChange {
  type: 'node_added' | 'node_removed' | 'node_modified' | 'edge_added' | 'edge_removed' | 'metadata_changed';
  nodeId?: string;
  edgeId?: string;
  field?: string;
  oldValue?: unknown;
  newValue?: unknown;
  description: string;
}

// Live Presence Types
export interface UserPresence {
  userId: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  workflowId: string;
  status: 'viewing' | 'editing';
  lastSeen: string;
  cursorPosition?: {
    nodeId?: string;
    x?: number;
    y?: number;
  };
}

// Extended Workflow Type with Collaboration
export interface CollaborativeWorkflow {
  id: string;
  name: string;
  description: string;
  folderId: string | null;
  status: WorkflowStatus;
  reviewStatus?: ReviewStatus;
  definition: unknown;
  owner: {
    id: string;
    name: string;
    avatar?: string;
  };
  shares: WorkflowShare[];
  shareLink?: ShareLink;
  commentCount: number;
  unresolvedCommentCount: number;
  currentVersion: number;
  versionCount: number;
  activeUsers: UserPresence[];
  lastEditedBy?: {
    id: string;
    name: string;
    avatar?: string;
  };
  lastEditedAt?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

// Permission Helpers
export function canView(permission: SharePermission): boolean {
  return ['viewer', 'commenter', 'editor', 'owner'].includes(permission);
}

export function canComment(permission: SharePermission): boolean {
  return ['commenter', 'editor', 'owner'].includes(permission);
}

export function canEdit(permission: SharePermission): boolean {
  return ['editor', 'owner'].includes(permission);
}

export function canManageSharing(permission: SharePermission): boolean {
  return permission === 'owner';
}

export function canDelete(permission: SharePermission): boolean {
  return permission === 'owner';
}

