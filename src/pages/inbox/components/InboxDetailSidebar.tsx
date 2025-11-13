import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Calendar, AlertTriangle, User, Zap, Copy, ExternalLink } from 'lucide-react';
import { Avatar } from '../../../components/common/Avatar';
import { InboxItem } from '../../../services/inbox.service';
import { Approval } from '../../../types/workspace';
import { formatDistanceToNow, format } from 'date-fns';
import { getPriorityConfig, isUrgent, isOverdue } from '../utils';

interface InboxDetailSidebarProps {
  item: InboxItem;
  approval?: Approval;
  onCopyExecutionId: () => void;
}

export function InboxDetailSidebar({ item, approval, onCopyExecutionId }: InboxDetailSidebarProps) {
  const priorityConfig = getPriorityConfig(item.priority);
  const urgent = isUrgent(item.dueAt);
  const overdue = isOverdue(item.dueAt);
  const executionId = item.executionId || approval?.executionId;

  return (
    <div className="space-y-3">
      {/* Workflow Info */}
      {(item.workflowName || executionId) && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-3.5 w-3.5 text-primary" />
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Workflow</h3>
          </div>
          <div className="space-y-2 text-sm">
            {item.workflowName && (
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Name</p>
                <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">{item.workflowName}</p>
              </div>
            )}
            {executionId && (
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Execution ID</p>
                <div className="flex items-center gap-1.5">
                  <p className="font-mono text-xs text-gray-900 dark:text-gray-100">{executionId}</p>
                  <button
                    onClick={onCopyExecutionId}
                    className="p-0.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Copy execution ID"
                  >
                    <Copy className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                  </button>
                  <Link
                    to={`/app/executions/${executionId}`}
                    className="p-0.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="View execution"
                  >
                    <ExternalLink className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-3"
      >
        <div className="flex items-center gap-2 mb-2">
          <Clock className="h-3.5 w-3.5 text-primary" />
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Timeline</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <div className={`p-1 rounded ${priorityConfig.bg} flex-shrink-0 mt-0.5`}>
              <Calendar className={`h-3 w-3 ${priorityConfig.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-900 dark:text-gray-100">Created</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {format(new Date(item.createdAt), 'MMM d, yyyy h:mm a')}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>

          {item.dueAt && (
            <div className="flex items-start gap-2">
              <div className={`p-1 rounded ${
                overdue ? 'bg-red-500/10' : urgent ? 'bg-orange-500/10' : 'bg-blue-500/10'
              } flex-shrink-0 mt-0.5`}>
                <AlertTriangle className={`h-3 w-3 ${
                  overdue ? 'text-red-500' : urgent ? 'text-orange-500' : 'text-blue-500'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900 dark:text-gray-100">Due Date</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {format(new Date(item.dueAt), 'MMM d, yyyy h:mm a')}
                </p>
                <p className={`text-xs font-medium ${
                  overdue ? 'text-red-500' : urgent ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {overdue ? 'OVERDUE: ' : urgent ? 'URGENT: ' : ''}
                  {formatDistanceToNow(new Date(item.dueAt), { addSuffix: true })}
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Submitted By */}
      {item.submittedBy && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <User className="h-3.5 w-3.5 text-primary" />
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {item.type === 'approval' ? 'Submitted By' : 'From'}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Avatar 
              src={item.submittedBy.avatar} 
              alt={item.submittedBy.name}
              size="sm"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{item.submittedBy.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.type === 'approval' ? 'Workflow Initiator' : 'Sender'}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Assigned To - For approvals */}
      {item.type === 'approval' && approval?.assignedTo && approval.assignedTo.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <User className="h-3.5 w-3.5 text-primary" />
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Assigned To</h3>
          </div>
          <div className="space-y-2">
            {approval.assignedTo.map((assignee) => (
              <div key={assignee.id} className="flex items-center gap-2">
                <Avatar 
                  src={assignee.avatar} 
                  alt={assignee.name}
                  size="sm"
                />
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{assignee.name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
