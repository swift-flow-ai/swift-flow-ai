import { createContext, useState, useEffect, ReactNode, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Workspace, WorkspaceHome } from '../types/workspace';
import { workspaceService } from '../services/workspace.service';

interface WorkspaceContextType {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  home: WorkspaceHome | null;
  isLoading: boolean;
  error: string | null;
  selectWorkspace: (workspaceId: string) => Promise<void>;
  refreshHome: () => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export { WorkspaceContext };

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [home, setHome] = useState<WorkspaceHome | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasAutoSelectedRef = useRef(false);

  // Load workspaces on mount
  useEffect(() => {
    loadWorkspaces();
  }, []);

  // Load home when workspace changes
  useEffect(() => {
    if (currentWorkspace) {
      loadHome(currentWorkspace.id);
    }
  }, [currentWorkspace]);

  const loadWorkspaces = async (skipAutoSelect = false) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await workspaceService.getWorkspaces();
      setWorkspaces(data);
      
      // Don't auto-select if we're on the workspace selector page
      const isOnSelectorPage = location.pathname === '/select-workspace';
      
      // Auto-select first workspace or last active (only if not on selector page and not already selected)
      if (data.length > 0 && !skipAutoSelect && !isOnSelectorPage && !hasAutoSelectedRef.current && !currentWorkspace) {
        hasAutoSelectedRef.current = true;
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

  const loadHome = async (workspaceId: string) => {
    try {
      const data = await workspaceService.getHome(workspaceId);
      setHome(data);
    } catch (err) {
      console.error('Failed to load home:', err);
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

  const refreshHome = async () => {
    if (currentWorkspace) {
      await loadHome(currentWorkspace.id);
    }
  };

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        currentWorkspace,
        home,
        isLoading,
        error,
        selectWorkspace,
        refreshHome,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

