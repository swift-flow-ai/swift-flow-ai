import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Bell,
  CheckSquare,
  Zap,
  AlertCircle,
  UserPlus,
  FileText,
  CheckCircle2,
  Clock,
  Filter,
  Trash2,
  Search
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Button, Input } from '../../components/common';
import { Avatar } from '../../components/common/Avatar';

interface Notification {
  id: string;
  type: 'approval' | 'workflow_complete' | 'workflow_failed' | 'mention' | 'member_joined' | 'system';
  title: string;
  message: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  data?: {
    approvalId?: string;
    workflowId?: string;
    workflowName?: string;
    userId?: string;
    userName?: string;
    userAvatar?: string;
  };
}

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'approval',
    title: 'Approval Required: Equipment Purchase',
    message: 'Invoice #1234 needs your approval for $3,200 equipment purchase',
    read: false,
    priority: 'high',
    createdAt: new Date(Date.now() - 300000).toISOString(),
    data: {
      approvalId: 'apr_123',
      workflowName: 'Employee Onboarding',
    }
  },
  {
    id: '2',
    type: 'workflow_complete',
    title: 'Workflow Completed Successfully',
    message: 'Customer onboarding workflow for John Doe has been completed',
    read: false,
    priority: 'medium',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    data: {
      workflowId: 'wf_456',
      workflowName: 'Customer Onboarding',
    }
  },
  {
    id: '3',
    type: 'member_joined',
    title: 'New Team Member',
    message: 'Sarah Johnson joined your workspace',
    read: false,
    priority: 'low',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    data: {
      userId: 'usr_789',
      userName: 'Sarah Johnson',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    }
  },
  {
    id: '4',
    type: 'approval',
    title: 'Approval Required: Budget Request',
    message: 'Marketing budget increase request awaiting approval',
    read: true,
    priority: 'high',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    data: {
      approvalId: 'apr_124',
      workflowName: 'Budget Approval',
    }
  },
  {
    id: '5',
    type: 'workflow_failed',
    title: 'Workflow Failed',
    message: 'Invoice processing workflow encountered an error',
    read: true,
    priority: 'high',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    data: {
      workflowId: 'wf_457',
      workflowName: 'Invoice Processing',
    }
  },
  {
    id: '6',
    type: 'mention',
    title: 'You were mentioned',
    message: 'Mike Chen mentioned you in a comment on PR #123',
    read: true,
    priority: 'medium',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    data: {
      userId: 'usr_790',
      userName: 'Mike Chen',
    }
  },
  {
    id: '7',
    type: 'system',
    title: 'New Features Available',
    message: 'Check out the new workflow builder enhancements',
    read: true,
    priority: 'low',
    createdAt: new Date(Date.now() - 432000000).toISOString(),
  },
  {
    id: '8',
    type: 'workflow_complete',
    title: 'Weekly Report Generated',
    message: 'Your weekly analytics report is ready',
    read: true,
    priority: 'low',
    createdAt: new Date(Date.now() - 518400000).toISOString(),
    data: {
      workflowId: 'wf_458',
      workflowName: 'Weekly Reporting',
    }
  },
];

export function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | Notification['type']>('all');
  const [filterRead, setFilterRead] = useState<'all' | 'unread' | 'read'>('all');

  const filteredNotifications = notifications.filter(notif => {
    const matchesSearch = notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notif.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || notif.type === filterType;
    const matchesRead = filterRead === 'all' || 
                       (filterRead === 'unread' && !notif.read) ||
                       (filterRead === 'read' && notif.read);
    
    return matchesSearch && matchesType && matchesRead;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'approval': return CheckSquare;
      case 'workflow_complete': return CheckCircle2;
      case 'workflow_failed': return AlertCircle;
      case 'mention': return Bell;
      case 'member_joined': return UserPlus;
      case 'system': return FileText;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'approval': return 'text-yellow-500 bg-yellow-500/10';
      case 'workflow_complete': return 'text-green-500 bg-green-500/10';
      case 'workflow_failed': return 'text-red-500 bg-red-500/10';
      case 'mention': return 'text-blue-500 bg-blue-500/10';
      case 'member_joined': return 'text-purple-500 bg-purple-500/10';
      case 'system': return 'text-gray-500 bg-gray-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-300';
      case 'low': return 'bg-gray-100 dark:bg-gray-500/20 text-gray-800 dark:text-gray-300';
      default: return 'bg-gray-100 dark:bg-gray-500/20 text-gray-800 dark:text-gray-300';
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleNotificationClick = (notif: Notification) => {
    // Mark as read
    handleMarkAsRead(notif.id);
    
    // Navigate based on notification type
    if (notif.type === 'approval' && notif.data?.approvalId) {
      navigate(`/app/approvals/${notif.data.approvalId}`);
    } else if ((notif.type === 'workflow_complete' || notif.type === 'workflow_failed') && notif.data?.workflowId) {
      navigate(`/app/workflows/${notif.data.workflowId}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground mt-2">
            Stay updated with your workspace activities
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="secondary" onClick={handleMarkAllAsRead}>
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{notifications.length}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{unreadCount}</p>
              <p className="text-sm text-muted-foreground">Unread</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {notifications.filter(n => n.priority === 'high' && !n.read).length}
              </p>
              <p className="text-sm text-muted-foreground">High Priority</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {notifications.filter(n => n.type === 'approval' && !n.read).length}
              </p>
              <p className="text-sm text-muted-foreground">Pending Actions</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="all">All Types</option>
              <option value="approval">Approvals</option>
              <option value="workflow_complete">Workflow Complete</option>
              <option value="workflow_failed">Workflow Failed</option>
              <option value="mention">Mentions</option>
              <option value="member_joined">Team Updates</option>
              <option value="system">System</option>
            </select>

            <select
              value={filterRead}
              onChange={(e) => setFilterRead(e.target.value as any)}
              className="px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="all">All Notifications</option>
              <option value="unread">Unread Only</option>
              <option value="read">Read Only</option>
            </select>

            <div className="ml-auto text-sm text-muted-foreground">
              {filteredNotifications.length} {filteredNotifications.length === 1 ? 'notification' : 'notifications'}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-2"
      >
        {filteredNotifications.map((notification, index) => {
          const Icon = getNotificationIcon(notification.type);
          const colorClass = getNotificationColor(notification.type);

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-card border rounded-xl p-4 transition-all ${
                notification.read 
                  ? 'border-border hover:border-muted-foreground/50' 
                  : 'border-primary/30 bg-primary/5 hover:border-primary'
              }`}
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 
                          className={`font-semibold ${
                            notification.read ? 'text-foreground' : 'text-primary'
                          } ${notification.data?.approvalId || notification.data?.workflowId ? 'cursor-pointer hover:underline' : ''}`}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        )}
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityBadgeClass(notification.priority)}`}>
                          {notification.priority}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                      
                      {/* Additional Info */}
                      {notification.data?.workflowName && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Zap className="h-3 w-3" />
                          <span>{notification.data.workflowName}</span>
                        </div>
                      )}
                      
                      {notification.data?.userName && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          {notification.data.userAvatar && (
                            <Avatar 
                              src={notification.data.userAvatar} 
                              alt={notification.data.userName} 
                              size="sm"
                              className="h-4 w-4"
                            />
                          )}
                          <span>{notification.data.userName}</span>
                        </div>
                      )}
                    </div>

                    {/* Time */}
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-3">
                    {!notification.read && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-muted transition-colors text-xs text-muted-foreground hover:text-foreground"
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        Mark as read
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notification.id)}
                      className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-destructive/10 transition-colors text-xs text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12 bg-card border border-border rounded-xl">
            <Bell className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No notifications found</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

