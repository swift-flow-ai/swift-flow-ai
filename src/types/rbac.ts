// Role-Based Access Control Types
import { roleBadgeColors } from "../components/common/tokens";

export enum Role {
  Owner = "owner",
  Admin = "admin",
  Member = "member",
  Viewer = "viewer",
  Guest = "guest",
}

export enum Permission {
  // Workflow permissions
  WorkflowView = "workflow:view",
  WorkflowCreate = "workflow:create",
  WorkflowEdit = "workflow:edit",
  WorkflowDelete = "workflow:delete",
  WorkflowExecute = "workflow:execute",
  WorkflowPublish = "workflow:publish",
  // Analytics permissions
  AnalyticsView = "analytics:view",
  AnalyticsExport = "analytics:export",
  // Execution permissions
  ExecutionView = "execution:view",
  ExecutionCancel = "execution:cancel",
  ExecutionRetry = "execution:retry",
  // Approval permissions
  ApprovalView = "approval:view",
  ApprovalDecide = "approval:decide",
  // Team permissions
  TeamView = "team:view",
  TeamInvite = "team:invite",
  TeamRemove = "team:remove",
  TeamManageRoles = "team:manage_roles",
  // Integration permissions
  IntegrationView = "integration:view",
  IntegrationInstall = "integration:install",
  IntegrationConfigure = "integration:configure",
  IntegrationDelete = "integration:delete",
  // Workspace permissions
  WorkspaceView = "workspace:view",
  WorkspaceEdit = "workspace:edit",
  WorkspaceDelete = "workspace:delete",
  WorkspaceManageBilling = "workspace:manage_billing",
  // Template permissions
  TemplateView = "template:view",
  TemplateUse = "template:use",
  TemplateCreate = "template:create",
}

export interface RoleDefinition {
  name: Role;
  label: string;
  description: string;
  permissions: Permission[];
  color: string;
}

// Role definitions with their permissions
export const ROLE_DEFINITIONS: Record<Role, RoleDefinition> = {
  [Role.Owner]: {
    name: Role.Owner,
    label: "Owner",
    description:
      "Full access to all workspace features including billing and deletion",
    color: "purple",
    permissions: [
      Permission.WorkflowView,
      Permission.WorkflowCreate,
      Permission.WorkflowEdit,
      Permission.WorkflowDelete,
      Permission.WorkflowExecute,
      Permission.WorkflowPublish,
      Permission.AnalyticsView,
      Permission.AnalyticsExport,
      Permission.ExecutionView,
      Permission.ExecutionCancel,
      Permission.ExecutionRetry,
      Permission.ApprovalView,
      Permission.ApprovalDecide,
      Permission.TeamView,
      Permission.TeamInvite,
      Permission.TeamRemove,
      Permission.TeamManageRoles,
      Permission.IntegrationView,
      Permission.IntegrationInstall,
      Permission.IntegrationConfigure,
      Permission.IntegrationDelete,
      Permission.WorkspaceView,
      Permission.WorkspaceEdit,
      Permission.WorkspaceDelete,
      Permission.WorkspaceManageBilling,
      Permission.TemplateView,
      Permission.TemplateUse,
      Permission.TemplateCreate,
    ],
  },
  [Role.Admin]: {
    name: Role.Admin,
    label: "Admin",
    description:
      "Manage workflows, team, and integrations. Cannot delete workspace or manage billing.",
    color: "red",
    permissions: [
      Permission.WorkflowView,
      Permission.WorkflowCreate,
      Permission.WorkflowEdit,
      Permission.WorkflowDelete,
      Permission.WorkflowExecute,
      Permission.WorkflowPublish,
      Permission.AnalyticsView,
      Permission.AnalyticsExport,
      Permission.ExecutionView,
      Permission.ExecutionCancel,
      Permission.ExecutionRetry,
      Permission.ApprovalView,
      Permission.ApprovalDecide,
      Permission.TeamView,
      Permission.TeamInvite,
      Permission.TeamRemove,
      Permission.IntegrationView,
      Permission.IntegrationInstall,
      Permission.IntegrationConfigure,
      Permission.IntegrationDelete,
      Permission.WorkspaceView,
      Permission.WorkspaceEdit,
      Permission.TemplateView,
      Permission.TemplateUse,
      Permission.TemplateCreate,
    ],
  },
  [Role.Member]: {
    name: Role.Member,
    label: "Member",
    description:
      "Create and execute workflows. Can view analytics and manage approvals.",
    color: "blue",
    permissions: [
      Permission.WorkflowView,
      Permission.WorkflowCreate,
      Permission.WorkflowEdit,
      Permission.WorkflowExecute,
      Permission.AnalyticsView,
      Permission.ExecutionView,
      Permission.ExecutionCancel,
      Permission.ExecutionRetry,
      Permission.ApprovalView,
      Permission.ApprovalDecide,
      Permission.TeamView,
      Permission.IntegrationView,
      Permission.WorkspaceView,
      Permission.TemplateView,
      Permission.TemplateUse,
    ],
  },
  [Role.Viewer]: {
    name: Role.Viewer,
    label: "Viewer",
    description:
      "Read-only access to workflows and executions. Can handle assigned approvals.",
    color: "green",
    permissions: [
      Permission.WorkflowView,
      Permission.ExecutionView,
      Permission.ApprovalView,
      Permission.ApprovalDecide,
      Permission.TeamView,
      Permission.IntegrationView,
      Permission.WorkspaceView,
      Permission.TemplateView,
    ],
  },
  [Role.Guest]: {
    name: Role.Guest,
    label: "Guest",
    description:
      "Limited access to specific workflows only. Can handle assigned approvals.",
    color: "gray",
    permissions: [Permission.ApprovalView, Permission.ApprovalDecide],
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
export function hasAnyPermission(
  role: Role,
  permissions: Permission[]
): boolean {
  return permissions.some((permission) => hasPermission(role, permission));
}

// Check if a role has all of the specified permissions
export function hasAllPermissions(
  role: Role,
  permissions: Permission[]
): boolean {
  return permissions.every((permission) => hasPermission(role, permission));
}

// Get role badge color
export function getRoleBadgeColor(role: Role): string {
  const colors: Record<Role, string> = {
    [Role.Owner]: roleBadgeColors.owner,
    [Role.Admin]: roleBadgeColors.admin,
    [Role.Member]: roleBadgeColors.member,
    [Role.Viewer]: roleBadgeColors.viewer,
    [Role.Guest]: roleBadgeColors.guest,
  };
  return colors[role] || colors[Role.Guest];
}
