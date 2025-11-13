import { useWorkspace } from '../../hooks/useWorkspace';
import { LoadingSpinner, Container, Button, Avatar, Badge } from '../../components/common';
import { 
  Plus, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  Clock,
  ArrowRight,
  Zap,
  Activity,
  AlertCircle,
  User,
  FileText,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { WorkflowRunStatus, Priority, ActivityType } from '../../types/workspace';
import { cn } from '../../utils';

export function Home() {
  const { currentWorkspace, home, isLoading } = useWorkspace();
  const navigate = useNavigate();

  if (isLoading || !home) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const getStatusIcon = (status: WorkflowRunStatus) => {
    switch (status) {
      case WorkflowRunStatus.Success:
        return <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case WorkflowRunStatus.Failure:
        return <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />;
      case WorkflowRunStatus.Running:
        return <Loader2 className="h-4 w-4 text-blue-600 dark:text-blue-400 animate-spin" />;
      case WorkflowRunStatus.Waiting:
        return <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />;
      default:
        return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: WorkflowRunStatus) => {
    switch (status) {
      case WorkflowRunStatus.Success:
        return 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800';
      case WorkflowRunStatus.Failure:
        return 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800';
      case WorkflowRunStatus.Running:
        return 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800';
      case WorkflowRunStatus.Waiting:
        return 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  const formatDuration = (ms?: number) => {
    if (!ms) return '—';
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };

  return (
    <Container size="xl" className="py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {currentWorkspace?.name || 'Home'}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {home.overview.activeWorkflows} active workflow{home.overview.activeWorkflows !== 1 ? 's' : ''}
          </p>
        </div>
        <Button
          onClick={() => navigate('/app/workflows/new')}
          variant="primary"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create workflow
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content - Recent Runs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Runs */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent runs
              </h2>
              <Link
                to="/app/executions"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors flex items-center gap-1"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {home.recentRuns.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-12 text-center">
                <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">
                  No runs yet
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Workflow runs will appear here once you start executing workflows
                </p>
                <Button
                  onClick={() => navigate('/app/workflows/new')}
                  variant="primary"
                  size="sm"
                >
                  Create your first workflow
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {home.recentRuns.map((run) => (
                  <Link
                    key={run.id}
                    to={`/app/executions/${run.id}`}
                    className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className={cn(
                          "p-2 rounded-lg border flex-shrink-0",
                          getStatusColor(run.status)
                        )}>
                          {getStatusIcon(run.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors truncate">
                              {run.workflowName}
                            </h3>
                            <Badge
                              variant={
                                run.status === WorkflowRunStatus.Success ? 'success' :
                                run.status === WorkflowRunStatus.Failure ? 'danger' :
                                run.status === WorkflowRunStatus.Running ? 'info' : 'default'
                              }
                              className="text-xs"
                            >
                              {run.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            {run.triggeredBy && (
                              <div className="flex items-center gap-1.5">
                                <Avatar
                                  src={run.triggeredBy.avatar}
                                  alt={run.triggeredBy.name}
                                  size="xs"
                                  className="h-3.5 w-3.5"
                                />
                                <span>{run.triggeredBy.name}</span>
                              </div>
                            )}
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDistanceToNow(new Date(run.startedAt), { addSuffix: true })}
                            </span>
                            {run.duration && (
                              <span>{formatDuration(run.duration)}</span>
                            )}
                            {run.taskCount !== undefined && (
                              <span>{run.taskCount} task{run.taskCount !== 1 ? 's' : ''}</span>
                            )}
                          </div>
                          {run.error && (
                            <p className="text-xs text-red-600 dark:text-red-400 mt-1 line-clamp-1">
                              {run.error}
                            </p>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity */}
          {home.activity.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent activity
              </h2>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                {home.activity.map((activity) => {
                  const getActivityIcon = () => {
                    switch (activity.type) {
                      case ActivityType.WorkflowCompleted:
                        return <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />;
                      case ActivityType.WorkflowFailed:
                        return <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />;
                      case ActivityType.ApprovalNeeded:
                        return <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />;
                      case ActivityType.MemberJoined:
                        return <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
                      case ActivityType.WorkflowCreated:
                        return <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />;
                      default:
                        return <Activity className="h-4 w-4 text-gray-400" />;
                    }
                  };

                  return (
                    <div key={activity.id} className="p-4 flex items-start gap-3">
                      <div className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-700 flex-shrink-0">
                        {getActivityIcon()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-0.5">
                          {activity.title}
                        </p>
                        {activity.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 line-clamp-1">
                            {activity.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          {activity.user && (
                            <>
                              <Avatar
                                src={activity.user.avatar}
                                alt={activity.user.name}
                                size="xs"
                                className="h-3.5 w-3.5"
                              />
                              <span>{activity.user.name}</span>
                              <span>•</span>
                            </>
                          )}
                          <span>{formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Overview
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total workflows</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {home.overview.totalWorkflows}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Active</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {home.overview.activeWorkflows}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total runs</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {home.overview.totalRuns.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Success rate</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {home.overview.successRate.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Pending Items */}
          {home.pendingItems.length > 0 && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Needs attention
                </h3>
                <Link
                  to="/app/inbox"
                  className="text-xs text-primary hover:text-primary/80 transition-colors"
                >
                  View all
                </Link>
              </div>
              <div className="space-y-2">
                {home.pendingItems.slice(0, 5).map((item) => (
                  <Link
                    key={item.id}
                    to={`/app/inbox/${item.id}`}
                    className="block p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <Badge
                        variant={
                          item.priority === Priority.Critical || item.priority === Priority.High
                            ? 'danger'
                            : item.priority === Priority.Medium
                            ? 'warning'
                            : 'default'
                        }
                        className="text-xs flex-shrink-0"
                      >
                        {item.priority}
                      </Badge>
                    </div>
                    {item.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-1">
                        {item.description}
                      </p>
                    )}
                    {item.dueAt && (
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>Due {formatDistanceToNow(new Date(item.dueAt), { addSuffix: true })}</span>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Workflow Status */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Workflow status
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Active</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {home.workflowStatus.active}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Paused</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {home.workflowStatus.paused}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Draft</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {home.workflowStatus.draft}
                </span>
              </div>
              {home.workflowStatus.error > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Error</span>
                  <span className="font-medium text-red-600 dark:text-red-400">
                    {home.workflowStatus.error}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
