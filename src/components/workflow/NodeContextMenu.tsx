import { motion } from 'framer-motion';
import {
  Edit,
  Copy,
  Trash2,
  Play,
  EyeOff,
  FileText,
} from 'lucide-react';

interface NodeContextMenuProps {
  x: number;
  y: number;
  nodeId: string;
  nodeType: string;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onTest?: () => void;
  onToggleSkip?: () => void;
  onClose: () => void;
  isSkipped?: boolean;
}

export function NodeContextMenu({
  x,
  y,
  nodeId,
  nodeType,
  onEdit,
  onDuplicate,
  onDelete,
  onTest,
  onToggleSkip,
  onClose,
  isSkipped = false,
}: NodeContextMenuProps) {
  const menuItems = [
    {
      icon: Edit,
      label: 'Edit',
      onClick: onEdit,
      shortcut: 'Enter',
      show: true,
    },
    {
      icon: Copy,
      label: 'Duplicate',
      onClick: onDuplicate,
      shortcut: '⌘D',
      show: true,
    },
    {
      icon: Play,
      label: 'Test',
      onClick: onTest,
      shortcut: '⌘T',
      show: nodeType === 'action' && onTest,
    },
    {
      icon: EyeOff,
      label: isSkipped ? 'Enable' : 'Skip',
      onClick: onToggleSkip,
      shortcut: '⌘K',
      show: nodeType !== 'trigger' && onToggleSkip,
    },
    {
      icon: FileText,
      label: 'View Details',
      onClick: () => {
        console.log('View details:', nodeId);
        onClose();
      },
      show: true,
    },
    {
      icon: Trash2,
      label: 'Delete',
      onClick: onDelete,
      shortcut: 'Del',
      show: nodeType !== 'trigger', // Can't delete trigger
      danger: true,
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Menu */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.1 }}
        className="fixed z-50 bg-card border border-border rounded-lg shadow-xl py-1 min-w-[200px]"
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}
      >
        {menuItems
          .filter((item) => item.show)
          .map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick?.();
                onClose();
              }}
              className={`w-full px-4 py-2 flex items-center gap-3 hover:bg-muted transition-colors text-left ${
                item.danger
                  ? 'text-red-600 dark:text-red-400 hover:bg-red-500/10'
                  : 'text-foreground'
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1 text-sm">{item.label}</span>
              {item.shortcut && (
                <span className="text-xs text-muted-foreground">
                  {item.shortcut}
                </span>
              )}
            </button>
          ))}
      </motion.div>
    </>
  );
}

