import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useWorkspace } from '../../hooks/useWorkspace';
import { workflowService } from '../../services/workflow.service';
import { Workflow } from '../../types/workspace';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { EmptyState } from '../../components/common/EmptyState';
import { Zap, Plus, Search, Play, Pause, Archive } from 'lucide-react';

export function WorkflowsList() {
  const navigate = useNavigate();
  const { currentWorkspace } = useWorkspace();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const loadWorkflows = useCallback(async () => {
    if (!currentWorkspace) return;
    
    try {
      setIsLoading(true);
      const params: Record<string, string> = {};
      if (filter !== 'all') params.status = filter;
      if (search) params.search = search;
      
      const data = await workflowService.getWorkflows(currentWorkspace.id, params);
      setWorkflows(data.workflows);
    } catch (error) {
      console.error('Failed to load workflows:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentWorkspace, filter, search]);

  useEffect(() => {
    if (currentWorkspace) {
      loadWorkflows();
    }
  }, [currentWorkspace, loadWorkflows]);

  const statusVariants = {
    active: { variant: 'success' as const, icon: Play },
    draft: { variant: 'default' as const, icon: Pause },
    paused: { variant: 'warning' as const, icon: Pause },
    archived: { variant: 'default' as const, icon: Archive },
  };

  const categoryColors: Record<string, string> = {
    hr: 'bg-blue-500/10 text-blue-500',
    sales: 'bg-green-500/10 text-green-500',
    support: 'bg-purple-500/10 text-purple-500',
    finance: 'bg-yellow-500/10 text-yellow-500',
    operations: 'bg-pink-500/10 text-pink-500',
    custom: 'bg-gray-500/10 text-gray-500',
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Workflows</h1>
          <p className="text-muted-foreground">
            Manage and monitor your automation workflows
          </p>
        </div>
        <button 
          onClick={() => navigate('/workflows/new')}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create Workflow
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search workflows..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted/50 border-0 focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'active' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'draft' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
            }`}
          >
            Draft
          </button>
        </div>
      </div>

      {/* Workflows Grid */}
      {workflows.length === 0 ? (
        <EmptyState
          icon={Zap}
          title="No workflows found"
          description="Create your first workflow to automate your business processes"
          action={{
            label: 'Create Workflow',
            onClick: () => {},
          }}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workflows.map((workflow, index) => {
            const statusConfig = statusVariants[workflow.status];
            const StatusIcon = statusConfig.icon;
            
            return (
              <motion.div
                key={workflow.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/workflows/${workflow.id}`}
                  className="block group rounded-xl border bg-card p-6 hover:border-primary hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {workflow.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {workflow.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant={statusConfig.variant} icon={StatusIcon}>
                      {workflow.status}
                    </Badge>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[workflow.category]}`}>
                      {workflow.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Avatar 
                        src={workflow.createdBy.avatar} 
                        alt={workflow.createdBy.name}
                        size="sm"
                        className="h-5 w-5"
                      />
                      <span>{workflow.createdBy.name}</span>
                    </div>
                    <span>v{workflow.version}</span>
                  </div>

                  <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-muted-foreground mb-1">Runs</div>
                      <div className="font-medium">{workflow.stats.totalRuns}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Success Rate</div>
                      <div className="font-medium">{workflow.stats.successRate}%</div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

