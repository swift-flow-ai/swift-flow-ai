import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  User,
  Calendar,
  Activity,
  Monitor,
  AlertTriangle,
  Info,
  XCircle,
} from 'lucide-react';
import { auditService } from '../../services/audit.service';
import { useWorkspace } from '../../hooks/useWorkspace';
import { AuditLog } from '../../types';
import { Button } from '../../components/common';
import { cn } from '../../utils';

export function AuditLogDetail() {
  const { logId } = useParams<{ logId: string }>();
  const navigate = useNavigate();
  const { currentWorkspace } = useWorkspace();
  const [log, setLog] = useState<AuditLog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadAuditLog = useCallback(async () => {
    if (!logId || !currentWorkspace) return;

    setIsLoading(true);
    try {
      const data = await auditService.getAuditLog(currentWorkspace.id, logId);
      setLog(data);
    } catch (error) {
      console.error('Failed to load audit log:', error);
    } finally {
      setIsLoading(false);
    }
  }, [logId, currentWorkspace]);

  useEffect(() => {
    if (logId && currentWorkspace) {
      loadAuditLog();
    }
  }, [logId, currentWorkspace, loadAuditLog]);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />;
      case 'info':
        return <Info className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
      default:
        return <Info className="h-6 w-6" />;
    }
  };

  const getActionColor = (action: string) => {
    const colors: Record<string, string> = {
      created: 'bg-green-500/10 text-green-600 dark:text-green-400',
      updated: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      deleted: 'bg-red-500/10 text-red-600 dark:text-red-400',
      executed: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      approved: 'bg-green-500/10 text-green-600 dark:text-green-400',
      rejected: 'bg-red-500/10 text-red-600 dark:text-red-400',
      connected: 'bg-green-500/10 text-green-600 dark:text-green-400',
      disconnected: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
    };
    return colors[action] || 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading audit log...</p>
        </div>
      </div>
    );
  }

  if (!log) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">Audit log not found</h3>
        <Button onClick={() => navigate('/app/audit')}>Back to Audit Logs</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/app/audit')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Audit Logs
        </button>

        <div className="flex items-start gap-4">
          {getSeverityIcon(log.severity)}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={cn(
                  'px-3 py-1 rounded-lg text-sm font-medium',
                  getActionColor(log.action)
                )}
              >
                {log.action.replace('_', ' ').toUpperCase()}
              </span>
              <span className="px-3 py-1 rounded-lg text-sm font-medium bg-muted text-muted-foreground">
                {log.resource.type}
              </span>
              <span
                className={cn(
                  'px-3 py-1 rounded-lg text-sm font-medium',
                  log.severity === 'critical'
                    ? 'bg-red-500/10 text-red-600 dark:text-red-400'
                    : log.severity === 'warning'
                    ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'
                    : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                )}
              >
                {log.severity}
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-2">
              {log.actor.name} {log.action} {log.resource.name}
            </h1>
            <p className="text-muted-foreground">
              Audit Log ID: {log.id}
            </p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            User Information
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground">Name</label>
              <p className="font-medium">{log.actor.name}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Email</label>
              <p className="font-medium">{log.actor.email}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">User ID</label>
              <p className="font-medium font-mono text-sm">{log.actor.id}</p>
            </div>
          </div>
        </motion.div>

        {/* Timestamp & Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Timestamp & Location
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground">Timestamp</label>
              <p className="font-medium">{new Date(log.timestamp).toLocaleString()}</p>
            </div>
            {log.actor.ipAddress && (
              <div>
                <label className="text-sm text-muted-foreground">IP Address</label>
                <p className="font-medium font-mono text-sm">{log.actor.ipAddress}</p>
              </div>
            )}
            {log.metadata?.userAgent && (
              <div>
                <label className="text-sm text-muted-foreground">User Agent</label>
                <p className="font-medium text-sm line-clamp-2">{log.metadata.userAgent as string}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Resource Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Resource Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">Resource Type</label>
            <p className="font-medium">{log.resource.type}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Resource Name</label>
            <p className="font-medium">{log.resource.name}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Resource ID</label>
            <p className="font-medium font-mono text-sm">{log.resource.id}</p>
          </div>
        </div>
      </motion.div>

      {/* Changes */}
      {log.changes && log.changes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Changes</h2>
          <div className="space-y-3">
            {log.changes.map((change, index) => (
              <div key={index} className="p-3 bg-muted rounded-lg">
                <p className="font-medium mb-2">{change.field}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="text-muted-foreground">Before</label>
                    <p className="font-mono mt-1">
                      {JSON.stringify(change.oldValue)}
                    </p>
                  </div>
                  <div>
                    <label className="text-muted-foreground">After</label>
                    <p className="font-mono mt-1">
                      {JSON.stringify(change.newValue)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Metadata */}
      {log.metadata && Object.keys(log.metadata).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Additional Metadata</h2>
          <pre className="text-sm bg-muted p-4 rounded-lg overflow-auto">
            {JSON.stringify(log.metadata, null, 2)}
          </pre>
        </motion.div>
      )}

      {/* Full Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Monitor className="h-5 w-5 text-primary" />
          Full Audit Log (JSON)
        </h2>
        <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto max-h-96">
          {JSON.stringify(log, null, 2)}
        </pre>
      </motion.div>
    </div>
  );
}

