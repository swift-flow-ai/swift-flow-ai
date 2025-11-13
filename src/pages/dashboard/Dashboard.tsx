import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWorkspace } from '../../hooks/useWorkspace';
import { workflowService } from '../../services/workflow.service';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { 
  Zap, 
  CheckSquare, 
  Play, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  User, 
  FileText,
  Plus,
  ArrowRight,
  TrendingUp,
  Inbox,
  BookOpen,
  Activity,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { Workflow } from '../../types/workspace';

export function Dashboard() {
  const { currentWorkspace, dashboard, isLoading } = useWorkspace();
  const [recentWorkflows, setRecentWorkflows] = useState<Workflow[]>([]);
  const [loadingWorkflows, setLoadingWorkflows] = useState(false);

  useEffect(() => {
    if (currentWorkspace) {
      loadRecentWorkflows();
    }
  }, [currentWorkspace]);

  const loadRecentWorkflows = async () => {
    if (!currentWorkspace) return;
    try {
      setLoadingWorkflows(true);
      const result = await workflowService.getWorkflows(currentWorkspace.id, {
        status: 'active',
        limit: 5,
        page: 1
      });
      setRecentWorkflows(result.workflows);
    } catch (error) {
      console.error('Failed to load recent workflows:', error);
    } finally {
      setLoadingWorkflows(false);
    }
  };

  if (isLoading || !dashboard) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const isNewUser = dashboard.stats.activeWorkflows === 0;

  const stats = [
    {
      label: 'Active Workflows',
      value: dashboard.stats.activeWorkflows,
      icon: Zap,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/30',
      borderColor: 'border-blue-200 dark:border-blue-800',
      link: '/app/workflows',
      trend: '+12%',
      trendUp: true,
    },
    {
      label: 'Pending Approvals',
      value: dashboard.stats.pendingApprovals,
      icon: CheckSquare,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      borderColor: 'border-amber-200 dark:border-amber-800',
      link: '/app/inbox?filter=actionable',
      urgent: dashboard.stats.pendingApprovals > 0,
    },
    {
      label: 'Running Executions',
      value: dashboard.stats.runningExecutions,
      icon: Play,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-950/30',
      borderColor: 'border-green-200 dark:border-green-800',
      link: '/app/executions?status=running',
    },
    {
      label: 'Completed Today',
      value: dashboard.stats.tasksCompletedToday,
      icon: CheckCircle2,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-950/30',
      borderColor: 'border-purple-200 dark:border-purple-800',
      link: '/app/executions?status=completed',
    },
  ];

  const quickActions = [
    {
      label: 'Create Workflow',
      icon: Plus,
      color: 'bg-primary hover:bg-primary/90',
      link: '/app/workflows/new',
      description: 'Build a new automation',
    },
    {
      label: 'View Inbox',
      icon: Inbox,
      color: 'bg-blue-600 hover:bg-blue-700',
      link: '/app/inbox',
      description: `${dashboard.stats.pendingApprovals} pending`,
      badge: dashboard.stats.pendingApprovals > 0 ? dashboard.stats.pendingApprovals : undefined,
    },
    {
      label: 'Browse Templates',
      icon: BookOpen,
      color: 'bg-purple-600 hover:bg-purple-700',
      link: '/app/templates',
      description: 'Start from a template',
    },
  ];

  const activityIcons = {
    workflow_completed: CheckCircle2,
    workflow_failed: AlertCircle,
    approval_needed: CheckSquare,
    member_joined: User,
    workflow_created: FileText,
  };

  const activityColors = {
    workflow_completed: 'text-green-600 dark:text-green-400',
    workflow_failed: 'text-red-600 dark:text-red-400',
    approval_needed: 'text-amber-600 dark:text-amber-400',
    member_joined: 'text-blue-600 dark:text-blue-400',
    workflow_created: 'text-purple-600 dark:text-purple-400',
  };

  const activityBgColors = {
    workflow_completed: 'bg-green-50 dark:bg-green-950/30',
    workflow_failed: 'bg-red-50 dark:bg-red-950/30',
    approval_needed: 'bg-amber-50 dark:bg-amber-950/30',
    member_joined: 'bg-blue-50 dark:bg-blue-950/30',
    workflow_created: 'bg-purple-50 dark:bg-purple-950/30',
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 dark:border-primary/10 p-8"
      >
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Welcome back{currentWorkspace?.name ? `, ${currentWorkspace.name}` : ''}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {isNewUser 
                  ? "Let's get started by creating your first workflow"
                  : "Here's what's happening in your workspace"
                }
              </p>
            </div>
            <div className="hidden md:block">
              <div className="p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 mt-6">
            {quickActions.map((action, index) => (
              <Link
                key={action.label}
                to={action.link}
                className="group relative"
              >
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl ${action.color} text-white shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-105`}
                >
                  <action.icon className="h-5 w-5" />
                  <div>
                    <div className="font-semibold text-sm">{action.label}</div>
                    <div className="text-xs opacity-90">{action.description}</div>
                  </div>
                  {action.badge && (
                    <Badge variant="danger" className="ml-2 bg-white/20 text-white border-white/30">
                      {action.badge}
                    </Badge>
                  )}
                  <ArrowRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats Grid - Modern Cards */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Link key={stat.label} to={stat.link}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`group relative overflow-hidden rounded-lg border ${stat.borderColor} bg-white dark:bg-gray-800 p-4 hover:shadow-md transition-all duration-200 cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className={`p-1.5 rounded-md ${stat.bg}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                {stat.trend && (
                  <div className={`flex items-center gap-1 text-xs font-medium ${
                    stat.trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    <TrendingUp className={`h-3 w-3 ${stat.trendUp ? '' : 'rotate-180'}`} />
                    {stat.trend}
                  </div>
                )}
                {stat.urgent && (
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                )}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-0.5">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Getting Started Section (for new users) */}
      {isNewUser && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Get Started with Your First Workflow
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Create your first automation to streamline your work. Start from a template or build from scratch.
              </p>
              <div className="flex gap-3">
                <Link
                  to="/app/workflows/new"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  Create Workflow
                </Link>
                <Link
                  to="/app/templates"
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Browse Templates
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Workflows */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="lg:col-span-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden"
        >
          <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Workflows</h2>
            </div>
            <Link
              to="/app/workflows"
              className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="p-5">
            {loadingWorkflows ? (
              <div className="flex items-center justify-center py-8">
                <LoadingSpinner size="sm" />
              </div>
            ) : recentWorkflows.length === 0 ? (
              <div className="text-center py-8">
                <Zap className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">No workflows yet</p>
                <Link
                  to="/app/workflows/new"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  <Plus className="h-4 w-4" />
                  Create Your First Workflow
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentWorkflows.map((workflow) => (
                  <Link
                    key={workflow.id}
                    to={`/app/workflows/${workflow.id}`}
                    className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
                            {workflow.name}
                          </h3>
                          <Badge
                            variant={workflow.status === 'active' ? 'success' : 'default'}
                            className="text-xs"
                          >
                            {workflow.status}
                          </Badge>
                        </div>
                        {workflow.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
                            {workflow.description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Activity className="h-3 w-3" />
                            {workflow.stats.totalRuns} runs
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            {workflow.stats.successRate.toFixed(1)}% success
                          </span>
                          {workflow.stats.lastRun && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDistanceToNow(new Date(workflow.stats.lastRun), { addSuffix: true })}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* My Tasks - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden"
        >
          <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">My Tasks</h2>
            </div>
            {dashboard.myTasks.length > 0 && (
              <Link
                to="/app/inbox"
                className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
          <div className="p-5">
            {dashboard.myTasks.length === 0 ? (
              <div className="text-center py-6">
                <CheckSquare className="h-10 w-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">No pending tasks</p>
              </div>
            ) : (
              <div className="space-y-3">
                {dashboard.myTasks.slice(0, 5).map((task) => (
                  <Link
                    key={task.id}
                    to={`/app/inbox/${task.id}`}
                    className="block p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                          {task.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <span className="truncate">{task.workflow}</span>
                          {task.dueAt && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1 whitespace-nowrap">
                                <Clock className="h-3 w-3" />
                                {formatDistanceToNow(new Date(task.dueAt), { addSuffix: true })}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <Badge
                        variant={
                          task.priority === 'critical' || task.priority === 'high' ? 'danger' :
                          task.priority === 'medium' ? 'warning' : 'default'
                        }
                        className="text-xs flex-shrink-0"
                      >
                        {task.priority}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden"
      >
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Activity</h2>
          </div>
        </div>
        <div className="p-5">
          {dashboard.recentActivity.length === 0 ? (
            <div className="text-center py-6">
              <Activity className="h-10 w-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">No recent activity</p>
            </div>
          ) : (
            <div className="space-y-4">
              {dashboard.recentActivity.map((activity) => {
                const Icon = activityIcons[activity.type];
                const color = activityColors[activity.type];
                const bgColor = activityBgColors[activity.type];
                
                return (
                  <div key={activity.id} className="flex gap-3 group">
                    <div className={`p-2 rounded-lg ${bgColor} flex-shrink-0`}>
                      <Icon className={`h-4 w-4 ${color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-0.5">
                        {activity.title}
                      </p>
                      {activity.description && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
                          {activity.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <Avatar 
                          src={activity.user.avatar} 
                          alt={activity.user.name} 
                          size="xs" 
                          className="h-4 w-4"
                        />
                        <span>{activity.user.name}</span>
                        <span>•</span>
                        <span>{formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
