import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWorkspace } from '../../hooks/useWorkspace';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Building2, Users, Zap, Plus } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function WorkspaceSelector() {
  const { workspaces, isLoading, selectWorkspace } = useWorkspace();
  const navigate = useNavigate();

  const handleSelectWorkspace = async (workspaceId: string) => {
    await selectWorkspace(workspaceId);
    navigate('/app/dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Select a workspace to continue</p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {workspaces.map((workspace, index) => (
            <motion.button
              key={workspace.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSelectWorkspace(workspace.id)}
              className="group relative overflow-hidden rounded-xl border bg-card p-6 text-left transition-all hover:border-primary hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                  {workspace.logo ? (
                    <img src={workspace.logo} alt={workspace.name} className="h-8 w-8" />
                  ) : (
                    <Building2 className="h-8 w-8 text-primary" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1">{workspace.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 capitalize">{workspace.role}</p>
                  
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{workspace.memberCount} members</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      <span>{workspace.activeWorkflows} workflows</span>
                    </div>
                  </div>

                  {workspace.pendingApprovals > 0 && (
                    <div className="mt-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-300 text-xs font-medium">
                      {workspace.pendingApprovals} pending approvals
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t text-xs text-muted-foreground">
                Last active {formatDistanceToNow(new Date(workspace.lastActiveAt), { addSuffix: true })}
              </div>
            </motion.button>
          ))}

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: workspaces.length * 0.1 }}
            onClick={() => navigate('/app/workspace-create')}
            className="group relative overflow-hidden rounded-xl border border-dashed bg-card p-6 text-center transition-all hover:border-primary hover:shadow-lg flex flex-col items-center justify-center min-h-[200px]"
          >
            <div className="h-14 w-14 rounded-lg bg-muted flex items-center justify-center mb-4">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-1">Create new workspace</h3>
            <p className="text-sm text-muted-foreground">Start fresh with a new workspace</p>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

