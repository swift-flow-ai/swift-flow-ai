import { useState, useEffect, useCallback } from 'react';
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
import { Container, EmptyState } from '@/design-system/components';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { Badge } from '@/components/common/Badge';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export function ExecutionsList() {
  const { currentWorkspace } = useWorkspace();
  const [executions, setExecutions] = useState<WorkflowExecution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const loadExecutions = useCallback(async () => {
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
  }, [currentWorkspace, filter]);

  useEffect(() => {
    if (currentWorkspace) {
      loadExecutions();
    }
  }, [currentWorkspace, loadExecutions]);

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
      <Container size="lg">
        <div className="flex items-center justify-center h-96">
          <LoadingSpinner size="lg" />
        </div>
      </Container>
    );
  }

  return (
    <Container size="lg" className="space-y-6">
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
              <Button
                key={f.value}
                onClick={() => setFilter(f.value)}
                variant={filter === f.value ? 'primary' : 'ghost'}
                size="sm"
              >
                {f.label}
                {filter === f.value && f.count > 0 && (
                  <Badge variant="info" className="ml-2">
                    {f.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search executions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Executions List */}
      {filteredExecutions.length === 0 ? (
        <EmptyState
          icon={AlertCircle}
          title="No executions found"
          description={search ? 'Try adjusting your search' : 'No workflow executions yet'}
        />
      ) : (
        <div className="space-y-3">
          {filteredExecutions.map((execution, index) => (
            <motion.div
              key={execution.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                padding="md"
                variant="default"
                hover
                onClick={() => window.location.href = `/app/executions/${execution.id}`}
                className="cursor-pointer"
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
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </Container>
  );
}

