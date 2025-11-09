import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Pause,
  Filter,
  Search,
} from 'lucide-react';
import { executionService } from '../../services/execution.service';
import { useWorkspace } from '../../hooks/useWorkspace';
import { WorkflowExecution } from '../../types';
import { cn } from '../../utils';

export function ExecutionsList() {
  const { currentWorkspace } = useWorkspace();
  const [executions, setExecutions] = useState<WorkflowExecution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (currentWorkspace) {
      loadExecutions();
    }
  }, [currentWorkspace, filter]);

  const loadExecutions = async () => {
    if (!currentWorkspace) return;

    setIsLoading(true);
    try {
      const params: { status?: string } = {};
      if (filter !== 'all') {
        params.status = filter;
      }

      const data = await executionService.getExecutions(currentWorkspace.id, params);
      setExecutions(data.executions);
    } catch (error) {
      console.error('Failed to load executions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Play className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'failed':
        return <XCircle className="h-4 w-4" />;
      case 'waiting':
        return <Clock className="h-4 w-4" />;
      case 'cancelled':
        return <Pause className="h-4 w-4" />;
      case 'queued':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
      case 'completed':
        return 'bg-green-500/10 text-green-600 dark:text-green-400';
      case 'failed':
        return 'bg-red-500/10 text-red-600 dark:text-red-400';
      case 'waiting':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400';
      case 'cancelled':
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
      case 'queued':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400';
      default:
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
    }
  };

  const formatDuration = (duration?: string) => {
    if (!duration) return 'N/A';
    return duration;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const filteredExecutions = executions.filter((execution) =>
    execution.workflowName.toLowerCase().includes(search.toLowerCase())
  );

  const filters = [
    { value: 'all', label: 'All', count: executions.length },
    { value: 'running', label: 'Running', count: executions.filter((e) => e.status === 'running').length },
    { value: 'completed', label: 'Completed', count: executions.filter((e) => e.status === 'completed').length },
    { value: 'failed', label: 'Failed', count: executions.filter((e) => e.status === 'failed').length },
    { value: 'waiting', label: 'Waiting', count: executions.filter((e) => e.status === 'waiting').length },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading executions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Executions</h1>
        <p className="text-muted-foreground mt-2">
          Track and monitor workflow execution progress
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  filter === f.value
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
              >
                {f.label}
                {filter === f.value && f.count > 0 && (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-primary-foreground/20 text-xs">
                    {f.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search executions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border-0 focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      {/* Executions List */}
      {filteredExecutions.length === 0 ? (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No executions found</h3>
          <p className="text-muted-foreground">
            {search ? 'Try adjusting your search' : 'No workflow executions yet'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredExecutions.map((execution, index) => (
            <motion.div
              key={execution.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/app/executions/${execution.id}`}
                className="block bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium', getStatusColor(execution.status))}>
                        {getStatusIcon(execution.status)}
                        {execution.status}
                      </span>
                      <h3 className="text-lg font-semibold">{execution.workflowName}</h3>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Started {formatTimestamp(execution.startedAt)}</span>
                      </div>
                      {execution.duration && (
                        <div>
                          Duration: {formatDuration(execution.duration)}
                        </div>
                      )}
                      {execution.currentNode && (
                        <div>
                          Current: <span className="font-medium">{execution.currentNode}</span>
                        </div>
                      )}
                      <div>
                        Triggered by: <span className="font-medium capitalize">{execution.triggeredBy.type}</span>
                        {execution.triggeredBy.user && ` (${execution.triggeredBy.user.name})`}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {(execution.status === 'running' || execution.status === 'waiting') && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>Progress</span>
                          <span>{execution.progress}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-500"
                            style={{ width: `${execution.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Error Message */}
                    {execution.error && (
                      <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <p className="text-sm text-destructive font-medium">
                          {execution.error.message}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

