import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useWorkspace } from '../../hooks/useWorkspace';
import { workflowService } from '../../services/workflow.service';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { StatCard, Container, QuickAction, EmptyState } from '../../components/common';
import Card from '@/components/common/Card';
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
  Inbox,
  BookOpen,
  Activity,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { Workflow } from '../../types/workspace';

export function Home() {
  const { currentWorkspace, home, isLoading } = useWorkspace();
  const [recentWorkflows, setRecentWorkflows] = useState<Workflow[]>([]);
  const [loadingWorkflows, setLoadingWorkflows] = useState(false);

  const loadRecentWorkflows = useCallback(async () => {
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
  }, [currentWorkspace]);

  useEffect(() => {
    if (currentWorkspace) {
      loadRecentWorkflows();
    }
  }, [currentWorkspace, loadRecentWorkflows]);

  if (isLoading || !home) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const isNewUser = home.overview.activeWorkflows === 0;

  const stats = [
    {
      label: 'Active Workflows',
      value: home.overview.activeWorkflows,
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
      value: home.pendingItems.length,
      icon: CheckSquare,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      borderColor: 'border-amber-200 dark:border-amber-800',
      link: '/app/inbox?filter=actionable',
      urgent: home.pendingItems.length > 0,
    },
    {
      label: 'Running Executions',
      value: home.recentRuns.filter(r => r.status === 'running').length,
      icon: Play,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-950/30',
      borderColor: 'border-green-200 dark:border-green-800',
      link: '/app/executions?status=running',
    },
    {
      label: 'Completed Today',
      value: home.overview.totalRuns,
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
      description: `${home.pendingItems.length} pending`,
      badge: home.pendingItems.length > 0 ? home.pendingItems.length : undefined,
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
    <Container size="xl" className="space-y-6">
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
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <QuickAction
                  label={action.label}
                  description={action.description}
                  icon={action.icon}
                  href={action.link}
                  color={action.color}
                  badge={action.badge}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats Grid - Using StatCard Component */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <StatCard
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              iconColor={stat.color}
              iconBg={stat.bg}
              trend={stat.trend ? { value: stat.trend, isPositive: stat.trendUp } : undefined}
              urgent={stat.urgent}
              link={stat.link}
            />
          </motion.div>
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
          className="lg:col-span-2"
        >
          <Card
            title="Recent Workflows"
            headerAction={
              <Link
                to="/app/workflows"
                className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            }
            padding="lg"
            variant="default"
          >
            {loadingWorkflows ? (
              <div className="flex items-center justify-center py-8">
                <LoadingSpinner size="sm" />
              </div>
            ) : recentWorkflows.length === 0 ? (
              <EmptyState
                icon={Zap}
                title="No workflows yet"
                description="Create your first workflow to automate your work"
                action={{
                  label: "Create Your First Workflow",
                  onClick: () => window.location.href = '/app/workflows/new',
                  variant: "primary"
                }}
              />
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
          </Card>
        </motion.div>

        {/* My Tasks - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card
            title="My Tasks"
            headerAction={
              home.pendingItems.length > 0 ? (
                <Link
                  to="/app/inbox"
                  className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1"
                >
                  View all
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : undefined
            }
            padding="lg"
            variant="default"
          >
            {home.pendingItems.length === 0 ? (
              <EmptyState
                icon={CheckSquare}
                title="No pending tasks"
                description="You're all caught up!"
              />
            ) : (
              <div className="space-y-3">
                {home.pendingItems.slice(0, 5).map((item) => (
                  <Link
                    key={item.id}
                    to={`/app/inbox/${item.id}`}
                    className="block p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          {item.workflowName && <span className="truncate">{item.workflowName}</span>}
                          {item.dueAt && (
                            <>
                              {item.workflowName && <span>•</span>}
                              <span className="flex items-center gap-1 whitespace-nowrap">
                                <Clock className="h-3 w-3" />
                                {formatDistanceToNow(new Date(item.dueAt), { addSuffix: true })}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <Badge
                        variant={
                          item.priority === 'critical' || item.priority === 'high' ? 'danger' :
                          item.priority === 'medium' ? 'warning' : 'default'
                        }
                        className="text-xs flex-shrink-0"
                      >
                        {item.priority}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <Card
          title="Recent Activity"
          padding="lg"
          variant="default"
        >
          {home.activity.length === 0 ? (
            <EmptyState
              icon={Activity}
              title="No recent activity"
              description="Activity will appear here as it happens"
            />
          ) : (
            <div className="space-y-4">
              {home.activity.map((activity) => {
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
        </Card>
      </motion.div>
    </Container>
  );
}
