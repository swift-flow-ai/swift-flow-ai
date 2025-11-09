import { createContext, useState, useEffect, ReactNode } from 'react';
import { Workspace, WorkspaceDashboard } from '../types/workspace';
import { workspaceService } from '../services/workspace.service';

interface WorkspaceContextType {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  dashboard: WorkspaceDashboard | null;
  isLoading: boolean;
  error: string | null;
  selectWorkspace: (workspaceId: string) => Promise<void>;
  refreshDashboard: () => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export { WorkspaceContext };

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [dashboard, setDashboard] = useState<WorkspaceDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load workspaces on mount
  useEffect(() => {
    loadWorkspaces();
  }, []);

  // Load dashboard when workspace changes
  useEffect(() => {
    if (currentWorkspace) {
      loadDashboard(currentWorkspace.id);
    }
  }, [currentWorkspace]);

  const loadWorkspaces = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await workspaceService.getWorkspaces();
      setWorkspaces(data);
      
      // Auto-select first workspace or last active
      if (data.length > 0) {
        const lastWorkspaceId = localStorage.getItem('lastWorkspaceId');
        const workspaceId = lastWorkspaceId && data.find(w => w.id === lastWorkspaceId)
          ? lastWorkspaceId
          : data[0].id;
        
        // Fetch full workspace details including members for RBAC
        try {
          const fullWorkspace = await workspaceService.getWorkspace(workspaceId);
          setCurrentWorkspace(fullWorkspace);
        } catch (err) {
          console.error('Failed to load full workspace details:', err);
          // Fallback to workspace from list
          const workspace = data.find(w => w.id === workspaceId) || data[0];
          setCurrentWorkspace(workspace);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load workspaces');
    } finally {
      setIsLoading(false);
    }
  };

  const loadDashboard = async (workspaceId: string) => {
    try {
      const data = await workspaceService.getDashboard(workspaceId);
      setDashboard(data);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    }
  };

  const selectWorkspace = async (workspaceId: string) => {
    try {
      // Fetch full workspace details including members for RBAC
      const workspace = await workspaceService.getWorkspace(workspaceId);
      setCurrentWorkspace(workspace);
      localStorage.setItem('lastWorkspaceId', workspaceId);
    } catch (err) {
      console.error('Failed to load workspace:', err);
      // Fallback to workspace from list (without members)
      const workspace = workspaces.find(w => w.id === workspaceId);
      if (workspace) {
        setCurrentWorkspace(workspace);
        localStorage.setItem('lastWorkspaceId', workspaceId);
      }
    }
  };

  const refreshDashboard = async () => {
    if (currentWorkspace) {
      await loadDashboard(currentWorkspace.id);
    }
  };

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        currentWorkspace,
        dashboard,
        isLoading,
        error,
        selectWorkspace,
        refreshDashboard,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

