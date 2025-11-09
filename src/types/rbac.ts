// Role-Based Access Control Types

export type Role = 'owner' | 'admin' | 'member' | 'viewer' | 'guest';

export type Permission =
  // Workflow permissions
  | 'workflow:view'
  | 'workflow:create'
  | 'workflow:edit'
  | 'workflow:delete'
  | 'workflow:execute'
  | 'workflow:publish'
  // Analytics permissions
  | 'analytics:view'
  | 'analytics:export'
  // Execution permissions
  | 'execution:view'
  | 'execution:cancel'
  | 'execution:retry'
  // Approval permissions
  | 'approval:view'
  | 'approval:decide'
  // Team permissions
  | 'team:view'
  | 'team:invite'
  | 'team:remove'
  | 'team:manage_roles'
  // Integration permissions
  | 'integration:view'
  | 'integration:install'
  | 'integration:configure'
  | 'integration:delete'
  // Workspace permissions
  | 'workspace:view'
  | 'workspace:edit'
  | 'workspace:delete'
  | 'workspace:manage_billing'
  // Audit permissions
  | 'audit:view'
  // Template permissions
  | 'template:view'
  | 'template:use'
  | 'template:create';

export interface RoleDefinition {
  name: Role;
  label: string;
  description: string;
  permissions: Permission[];
  color: string;
}

// Role definitions with their permissions
export const ROLE_DEFINITIONS: Record<Role, RoleDefinition> = {
  owner: {
    name: 'owner',
    label: 'Owner',
    description: 'Full access to all workspace features including billing and deletion',
    color: 'purple',
    permissions: [
      'workflow:view',
      'workflow:create',
      'workflow:edit',
      'workflow:delete',
      'workflow:execute',
      'workflow:publish',
      'analytics:view',
      'analytics:export',
      'execution:view',
      'execution:cancel',
      'execution:retry',
      'approval:view',
      'approval:decide',
      'team:view',
      'team:invite',
      'team:remove',
      'team:manage_roles',
      'integration:view',
      'integration:install',
      'integration:configure',
      'integration:delete',
      'workspace:view',
      'workspace:edit',
      'workspace:delete',
      'workspace:manage_billing',
      'audit:view',
      'template:view',
      'template:use',
      'template:create',
    ],
  },
  admin: {
    name: 'admin',
    label: 'Admin',
    description: 'Manage workflows, team, and integrations. Cannot delete workspace or manage billing.',
    color: 'red',
    permissions: [
      'workflow:view',
      'workflow:create',
      'workflow:edit',
      'workflow:delete',
      'workflow:execute',
      'workflow:publish',
      'analytics:view',
      'analytics:export',
      'execution:view',
      'execution:cancel',
      'execution:retry',
      'approval:view',
      'approval:decide',
      'team:view',
      'team:invite',
      'team:remove',
      'integration:view',
      'integration:install',
      'integration:configure',
      'integration:delete',
      'workspace:view',
      'workspace:edit',
      'audit:view',
      'template:view',
      'template:use',
      'template:create',
    ],
  },
  member: {
    name: 'member',
    label: 'Member',
    description: 'Create and execute workflows. Can view analytics and manage approvals.',
    color: 'blue',
    permissions: [
      'workflow:view',
      'workflow:create',
      'workflow:edit',
      'workflow:execute',
      'analytics:view',
      'execution:view',
      'execution:cancel',
      'execution:retry',
      'approval:view',
      'approval:decide',
      'team:view',
      'integration:view',
      'workspace:view',
      'template:view',
      'template:use',
    ],
  },
  viewer: {
    name: 'viewer',
    label: 'Viewer',
    description: 'Read-only access to workflows and executions. Can handle assigned approvals.',
    color: 'green',
    permissions: [
      'workflow:view',
      'execution:view',
      'approval:view',
      'approval:decide',
      'team:view',
      'integration:view',
      'workspace:view',
      'template:view',
    ],
  },
  guest: {
    name: 'guest',
    label: 'Guest',
    description: 'Limited access to specific workflows only. Can handle assigned approvals.',
    color: 'gray',
    permissions: [
      'approval:view',
      'approval:decide',
    ],
  },
};

// Workflow-level permissions
export interface WorkflowPermission {
  workflowId: string;
  userId: string;
  canView: boolean;
  canEdit: boolean;
  canExecute: boolean;
  canDelete: boolean;
}

// Check if a role has a specific permission
export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_DEFINITIONS[role]?.permissions.includes(permission) || false;
}

// Check if a role has any of the specified permissions
export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(role, permission));
}

// Check if a role has all of the specified permissions
export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(role, permission));
}

// Get role badge color
export function getRoleBadgeColor(role: Role): string {
  const colors: Record<Role, string> = {
    owner: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    admin: 'bg-red-500/10 text-red-600 border-red-500/20',
    member: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    viewer: 'bg-green-500/10 text-green-600 border-green-500/20',
    guest: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
  };
  return colors[role] || colors.guest;
}

