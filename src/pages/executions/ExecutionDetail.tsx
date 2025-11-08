import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Play,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Pause,
  RotateCcw,
  Ban,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { executionService } from '../../services/execution.service';
import { useWorkspace } from '../../hooks/useWorkspace';
import { WorkflowExecution } from '../../types';
import { Button } from '../../components/common';
import { cn } from '../../utils';

export function ExecutionDetail() {
  const { executionId } = useParams<{ executionId: string }>();
  const navigate = useNavigate();
  const { currentWorkspace } = useWorkspace();
  const [execution, setExecution] = useState<WorkflowExecution | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [isCancelling, setIsCancelling] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    if (executionId && currentWorkspace) {
      loadExecution();
    }
  }, [executionId, currentWorkspace]);

  const loadExecution = async () => {
    if (!executionId || !currentWorkspace) return;

    setIsLoading(true);
    try {
      const data = await executionService.getExecution(currentWorkspace.id, executionId);
      setExecution(data);
    } catch (error) {
      console.error('Failed to load execution:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!executionId || !currentWorkspace || !execution) return;

    setIsCancelling(true);
    try {
      await executionService.cancelExecution(currentWorkspace.id, executionId);
      await loadExecution(); // Reload to get updated status
    } catch (error) {
      console.error('Failed to cancel execution:', error);
    } finally {
      setIsCancelling(false);
    }
  };

  const handleRetry = async () => {
    if (!executionId || !currentWorkspace) return;

    setIsRetrying(true);
    try {
      const result = await executionService.retryExecution(currentWorkspace.id, executionId);
      navigate(`/app/executions/${result.newExecutionId}`);
    } catch (error) {
      console.error('Failed to retry execution:', error);
    } finally {
      setIsRetrying(false);
    }
  };

  const toggleNodeExpanded = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Play className="h-5 w-5" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5" />;
      case 'failed':
        return <XCircle className="h-5 w-5" />;
      case 'waiting':
        return <Clock className="h-5 w-5" />;
      case 'cancelled':
        return <Pause className="h-5 w-5" />;
      case 'queued':
        return <AlertCircle className="h-5 w-5" />;
      case 'pending':
        return <Clock className="h-5 w-5 opacity-50" />;
      case 'skipped':
        return <AlertCircle className="h-5 w-5 opacity-50" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'completed':
        return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20';
      case 'failed':
        return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
      case 'waiting':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20';
      case 'cancelled':
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20';
      case 'queued':
      case 'pending':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      case 'skipped':
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20 opacity-60';
      default:
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'N/A';
    if (seconds < 60) return `${seconds.toFixed(1)}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds.toFixed(0)}s`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading execution details...</p>
        </div>
      </div>
    );
  }

  if (!execution) {
    return (
      <div className="text-center py-12">
        <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Execution not found</h3>
        <Button onClick={() => navigate('/app/executions')}>Back to Executions</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/app/executions')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Executions
        </button>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold tracking-tight">{execution.workflowName}</h1>
              <span className={cn('inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border', getStatusColor(execution.status))}>
                {getStatusIcon(execution.status)}
                {execution.status}
              </span>
            </div>
            <p className="text-muted-foreground">
              Execution ID: <span className="font-mono text-sm">{execution.id}</span>
            </p>
          </div>

          <div className="flex gap-2">
            {(execution.status === 'running' || execution.status === 'waiting') && (
              <Button
                variant="danger"
                onClick={handleCancel}
                isLoading={isCancelling}
              >
                <Ban className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            )}
            {execution.status === 'failed' && (
              <Button
                variant="primary"
                onClick={handleRetry}
                isLoading={isRetrying}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {(execution.status === 'running' || execution.status === 'waiting') && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Progress</h3>
            <span className="text-2xl font-bold">{execution.progress}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${execution.progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          {execution.currentNode && (
            <p className="text-sm text-muted-foreground mt-3">
              Currently executing: <span className="font-medium text-foreground">{execution.currentNode}</span>
            </p>
          )}
        </div>
      )}

      {/* Error Message */}
      {execution.error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-destructive mb-1">Execution Failed</h3>
              <p className="text-sm text-destructive/90">{execution.error.message}</p>
              {execution.error.nodeId && (
                <p className="text-xs text-destructive/70 mt-2">
                  Failed at node: {execution.error.nodeId}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Execution Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Started</p>
          <p className="font-semibold">{formatTimestamp(execution.startedAt)}</p>
        </div>
        {execution.completedAt && (
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Completed</p>
            <p className="font-semibold">{formatTimestamp(execution.completedAt)}</p>
          </div>
        )}
        {execution.duration && (
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Duration</p>
            <p className="font-semibold">{execution.duration}</p>
          </div>
        )}
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Triggered By</p>
          <p className="font-semibold capitalize">{execution.triggeredBy.type}</p>
          {execution.triggeredBy.user && (
            <p className="text-xs text-muted-foreground mt-1">{execution.triggeredBy.user.name}</p>
          )}
        </div>
      </div>

      {/* Execution Trace */}
      {execution.trace && execution.trace.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Execution Trace</h3>
          <div className="space-y-2">
            {execution.trace.map((trace) => (
              <div key={trace.nodeId} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleNodeExpanded(trace.nodeId)}
                  className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-left"
                >
                  <span className={cn('inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-medium border', getStatusColor(trace.status))}>
                    {getStatusIcon(trace.status)}
                    {trace.status}
                  </span>
                  <span className="flex-1 font-medium">{trace.nodeName}</span>
                  {trace.duration !== undefined && (
                    <span className="text-sm text-muted-foreground">
                      {formatDuration(trace.duration)}
                    </span>
                  )}
                  {expandedNodes.has(trace.nodeId) ? (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>

                {expandedNodes.has(trace.nodeId) && (
                  <div className="border-t border-border p-4 bg-muted/30 space-y-4">
                    {/* Timestamps */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {trace.startedAt && (
                        <div>
                          <p className="text-muted-foreground mb-1">Started</p>
                          <p className="font-mono text-xs">{formatTimestamp(trace.startedAt)}</p>
                        </div>
                      )}
                      {trace.completedAt && (
                        <div>
                          <p className="text-muted-foreground mb-1">Completed</p>
                          <p className="font-mono text-xs">{formatTimestamp(trace.completedAt)}</p>
                        </div>
                      )}
                    </div>

                    {/* Error */}
                    {trace.error && (
                      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                        <p className="text-sm text-destructive font-medium">{trace.error}</p>
                      </div>
                    )}

                    {/* Logs */}
                    {trace.logs && trace.logs.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Logs</p>
                        <div className="bg-background rounded-lg p-3 space-y-1 max-h-60 overflow-y-auto font-mono text-xs">
                          {trace.logs.map((log, logIndex) => (
                            <div
                              key={logIndex}
                              className={cn(
                                'flex items-start gap-2',
                                log.level === 'error' && 'text-red-400',
                                log.level === 'warn' && 'text-yellow-400',
                                log.level === 'info' && 'text-blue-400',
                                log.level === 'debug' && 'text-gray-400'
                              )}
                            >
                              <span className="text-muted-foreground whitespace-nowrap">
                                {new Date(log.timestamp).toLocaleTimeString()}
                              </span>
                              <span className="uppercase font-semibold w-12">{log.level}</span>
                              <span className="flex-1">{log.message}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input/Output */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Input</h3>
          <pre className="bg-background rounded-lg p-4 text-xs overflow-auto max-h-96">
            {JSON.stringify(execution.input, null, 2)}
          </pre>
        </div>
        {execution.output && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Output</h3>
            <pre className="bg-background rounded-lg p-4 text-xs overflow-auto max-h-96">
              {JSON.stringify(execution.output, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

