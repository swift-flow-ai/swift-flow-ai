import { motion } from 'framer-motion';
import { Info, FileText } from 'lucide-react';
import { InboxItem } from '../../../services/inbox.service';

interface GenericDetailContentProps {
  item: InboxItem;
}

export function GenericDetailContent({ item }: GenericDetailContentProps) {
  // Show metadata if available
  if (item.metadata && Object.keys(item.metadata).length > 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-3"
      >
        <div className="flex items-center gap-2 mb-2">
          <Info className="h-3.5 w-3.5 text-primary" />
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Details</h3>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded border border-gray-200 dark:border-gray-700 p-2 overflow-auto max-h-[300px]">
          <pre className="text-xs font-mono text-gray-800 dark:text-gray-200">
            {JSON.stringify(item.metadata, null, 2)}
          </pre>
        </div>
      </motion.div>
    );
  }

  // Fallback: just show description
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-3"
    >
      <div className="flex items-start gap-2">
        <FileText className="h-3.5 w-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
