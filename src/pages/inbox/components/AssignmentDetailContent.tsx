import { motion } from 'framer-motion';
import { UserPlus, CheckCircle2, Clock, Users, Calendar, User } from 'lucide-react';
import { Avatar } from '../../../components/common/Avatar';
import { InboxItem } from '../../../services/inbox.service';
import { format, formatDistanceToNow } from 'date-fns';
import { Badge } from '../../../components/common/Badge';

interface AssignmentDetailContentProps {
  item: InboxItem;
  onAccept?: (assignmentId: string) => void;
  onDecline?: (assignmentId: string) => void;
}

export function AssignmentDetailContent({ item, onAccept, onDecline }: AssignmentDetailContentProps) {
  const assignmentMetadata = item.metadata as {
    role?: string;
    team?: string;
    responsibilities?: string[];
    startDate?: string;
    endDate?: string;
    assigner?: { name: string; avatar?: string };
    status?: 'pending' | 'accepted' | 'declined';
  } | undefined;

  const isPending = assignmentMetadata?.status === 'pending' || !assignmentMetadata?.status;

  return (
    <div className="space-y-3">
      {/* Actions - At Top for Pending */}
      {isPending && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-3.5 w-3.5 text-primary" />
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Respond</h3>
          </div>
          <div className="flex gap-2">
            {onAccept && (
              <button
                onClick={() => onAccept(item.id)}
                className="flex-1 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-green-500/20 flex items-center justify-center gap-2 text-sm font-semibold"
              >
                <CheckCircle2 className="h-4 w-4" />
                Accept Assignment
              </button>
            )}
            {onDecline && (
              <button
                onClick={() => onDecline(item.id)}
                className="px-4 py-2.5 border border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 hover:border-red-400 transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] text-sm font-medium"
              >
                Decline
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Status - At Top for Resolved */}
      {!isPending && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-3"
        >
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-sm font-medium ${
            assignmentMetadata?.status === 'accepted'
              ? 'bg-green-500/20 text-green-700 dark:text-green-300'
              : 'bg-red-500/20 text-red-700 dark:text-red-300'
          }`}>
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span className="capitalize">Assignment {assignmentMetadata?.status}</span>
          </div>
        </motion.div>
      )}

      {/* Assignment Details - Compact */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-3"
      >
        <div className="flex items-start gap-2">
          <div className="p-1.5 rounded bg-indigo-500/10 flex-shrink-0">
            <UserPlus className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Assignment</h3>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              {item.description}
            </p>

            {/* Assignment Info Grid */}
            <div className="grid grid-cols-2 gap-2 text-sm mb-2">
              {assignmentMetadata?.role && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Role</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{assignmentMetadata.role}</p>
                </div>
              )}
              {assignmentMetadata?.team && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Team</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{assignmentMetadata.team}</p>
                </div>
              )}
              {assignmentMetadata?.startDate && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Start Date</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {format(new Date(assignmentMetadata.startDate), 'MMM d, yyyy')}
                  </p>
                </div>
              )}
              {assignmentMetadata?.endDate && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">End Date</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {format(new Date(assignmentMetadata.endDate), 'MMM d, yyyy')}
                  </p>
                </div>
              )}
            </div>

            {/* Responsibilities - Compact */}
            {assignmentMetadata?.responsibilities && assignmentMetadata.responsibilities.length > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Responsibilities</p>
                <ul className="space-y-0.5">
                  {assignmentMetadata.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start gap-1.5 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Assigner - Compact */}
            {assignmentMetadata?.assigner && (
              <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Assigned By</p>
                <div className="flex items-center gap-1.5">
                  <Avatar 
                    src={assignmentMetadata.assigner.avatar} 
                    alt={assignmentMetadata.assigner.name}
                    size="xs"
                  />
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {assignmentMetadata.assigner.name}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
