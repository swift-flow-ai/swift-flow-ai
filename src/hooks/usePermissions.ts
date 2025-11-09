import { useAuth } from './useAuth';
import { useWorkspace } from './useWorkspace';
import { Permission, hasPermission, hasAnyPermission, hasAllPermissions, Role } from '../types/rbac';

export function usePermissions() {
  const { user } = useAuth();
  const { currentWorkspace } = useWorkspace();

  // Get user's role in current workspace
  const getUserRole = (): Role => {
    if (!user || !currentWorkspace) return 'guest';
    
    // Find user's membership in current workspace
    const member = currentWorkspace.members?.find(m => m.id === user.id);
    return (member?.role as Role) || 'guest';
  };

  const userRole = getUserRole();

  // Check if user has a specific permission
  const can = (permission: Permission): boolean => {
    return hasPermission(userRole, permission);
  };

  // Check if user has any of the specified permissions
  const canAny = (permissions: Permission[]): boolean => {
    return hasAnyPermission(userRole, permissions);
  };

  // Check if user has all of the specified permissions
  const canAll = (permissions: Permission[]): boolean => {
    return hasAllPermissions(userRole, permissions);
  };

  // Check if user can access a specific workflow
  const canAccessWorkflow = (_workflowId: string): boolean => {
    // For now, use role-based permissions
    // In production, this would also check workflow-level permissions
    return can('workflow:view');
  };

  // Check if user is owner
  const isOwner = userRole === 'owner';

  // Check if user is admin or owner
  const isAdminOrOwner = userRole === 'owner' || userRole === 'admin';

  return {
    userRole,
    can,
    canAny,
    canAll,
    canAccessWorkflow,
    isOwner,
    isAdminOrOwner,
  };
}

