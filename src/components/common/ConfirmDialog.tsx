import { motion } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import Button from './Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  icon?: React.ReactNode;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  icon,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      iconBg: 'bg-red-500/10',
      iconColor: 'text-red-500',
      confirmButton: 'danger' as const,
    },
    warning: {
      iconBg: 'bg-yellow-500/10',
      iconColor: 'text-yellow-500',
      confirmButton: 'primary' as const,
    },
    info: {
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-500',
      confirmButton: 'primary' as const,
    },
  };

  const styles = variantStyles[variant];

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border border-border rounded-xl max-w-md w-full overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full ${styles.iconBg} flex items-center justify-center flex-shrink-0`}>
                {icon || <AlertTriangle className={`h-6 w-6 ${styles.iconColor}`} />}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{title}</h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted rounded transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-muted-foreground">{message}</p>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-border flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant={styles.confirmButton} onClick={handleConfirm}>
            {confirmText}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

