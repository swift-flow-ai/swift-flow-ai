import { motion } from 'framer-motion';
import { Bell, Info, ExternalLink, FileText, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InboxItem } from '../../../services/inbox.service';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '../../../components/common/Badge';

interface NotificationDetailContentProps {
  item: InboxItem;
}

export function NotificationDetailContent({ item }: NotificationDetailContentProps) {
  const notificationMetadata = item.metadata as {
    category?: string;
    actionUrl?: string;
    actionLabel?: string;
    relatedItems?: Array<{ id: string; type: string; title: string; url?: string }>;
    richContent?: {
      html?: string;
      markdown?: string;
    };
    priority?: 'low' | 'medium' | 'high';
    source?: string;
  } | undefined;

  return (
    <div className="space-y-3">
      {/* Actions - At Top */}
      {(notificationMetadata?.actionUrl || item.actionUrl) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <ExternalLink className="h-3.5 w-3.5 text-primary" />
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Actions</h3>
          </div>
          <div className="flex gap-2">
            <Link
              to={notificationMetadata?.actionUrl || item.actionUrl || '#'}
              className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-primary/20 flex items-center gap-2 text-sm font-semibold"
            >
              <FileText className="h-4 w-4" />
              {notificationMetadata?.actionLabel || 'View Details'}
            </Link>
          </div>
        </motion.div>
      )}

      {/* Notification Content - Compact */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-3"
      >
        <div className="flex items-start gap-2">
          <div className="p-1.5 rounded bg-blue-500/10 flex-shrink-0">
            <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Notification</h3>
              {notificationMetadata?.category && (
                <Badge variant="info" className="text-xs px-1.5 py-0">
                  {notificationMetadata.category}
                </Badge>
              )}
              {notificationMetadata?.priority && (
                <Badge 
                  variant={notificationMetadata.priority === 'high' ? 'warning' : 'default'} 
                  className="text-xs px-1.5 py-0"
                >
                  {notificationMetadata.priority}
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              {item.description}
            </p>

            {/* Rich Content */}
            {notificationMetadata?.richContent?.markdown && (
              <div className="prose prose-sm dark:prose-invert max-w-none mb-2">
                <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {notificationMetadata.richContent.markdown}
                </div>
              </div>
            )}

            {/* Source & Time */}
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              {notificationMetadata?.source && (
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{notificationMetadata.source}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Related Items - Compact */}
      {notificationMetadata?.relatedItems && notificationMetadata.relatedItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-3.5 w-3.5 text-primary" />
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Related ({notificationMetadata.relatedItems.length})
            </h3>
          </div>
          <div className="space-y-1">
            {notificationMetadata.relatedItems.map((related) => (
              <div
                key={related.id}
                className="p-2 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {related.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {related.type}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
