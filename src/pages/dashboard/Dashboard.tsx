import { motion } from 'framer-motion';
import { useWorkspace } from '../../hooks/useWorkspace';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { Zap, CheckSquare, Play, CheckCircle2, Clock, AlertCircle, User, FileText } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const { currentWorkspace, dashboard, isLoading } = useWorkspace();

  if (isLoading || !dashboard) {
    return <LoadingSpinner />;
  }

  const stats = [
    {
      label: 'Active Workflows',
      value: dashboard.stats.activeWorkflows,
      icon: Zap,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Pending Approvals',
      value: dashboard.stats.pendingApprovals,
      icon: CheckSquare,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
    },
    {
      label: 'Running Executions',
      value: dashboard.stats.runningExecutions,
      icon: Play,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
    },
    {
      label: 'Tasks Completed Today',
      value: dashboard.stats.tasksCompletedToday,
      icon: CheckCircle2,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
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
    workflow_completed: 'text-green-500',
    workflow_failed: 'text-red-500',
    approval_needed: 'text-yellow-500',
    member_joined: 'text-blue-500',
    workflow_created: 'text-purple-500',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back to {currentWorkspace?.name}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-xl border bg-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* My Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border bg-card"
        >
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">My Tasks</h2>
          </div>
          <div className="p-6 space-y-4">
            {dashboard.myTasks.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No pending tasks
              </p>
            ) : (
              dashboard.myTasks.map((task) => (
                <Link
                  key={task.id}
                  to={task.type === 'approval' ? `/approvals/${task.id}` : '#'}
                  className="block p-4 rounded-lg border hover:border-primary hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{task.title}</h3>
                      {task.description && (
                        <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                      )}
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {task.workflow}
                        </span>
                        {task.dueAt && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Due {formatDistanceToNow(new Date(task.dueAt), { addSuffix: true })}
                          </span>
                        )}
                      </div>
                    </div>
                    <Badge
                      variant={
                        task.priority === 'critical' || task.priority === 'high' ? 'danger' :
                        task.priority === 'medium' ? 'warning' : 'default'
                      }
                    >
                      {task.priority}
                    </Badge>
                  </div>
                </Link>
              ))
            )}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border bg-card"
        >
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </div>
          <div className="p-6 space-y-4">
            {dashboard.recentActivity.map((activity) => {
              const Icon = activityIcons[activity.type];
              const color = activityColors[activity.type];
              
              return (
                <div key={activity.id} className="flex gap-3">
                  <div className={`p-2 rounded-lg bg-muted flex-shrink-0`}>
                    <Icon className={`h-4 w-4 ${color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium mb-1">{activity.title}</p>
                    {activity.description && (
                      <p className="text-xs text-muted-foreground mb-1">{activity.description}</p>
                    )}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Avatar src={activity.user.avatar} alt={activity.user.name} size="sm" className="h-4 w-4" />
                      <span>{activity.user.name}</span>
                      <span>•</span>
                      <span>{formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

