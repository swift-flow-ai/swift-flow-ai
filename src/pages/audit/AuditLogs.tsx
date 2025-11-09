import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  Calendar,
  User,
  Activity,
  AlertTriangle,
  Info,
  XCircle,
  FileText,
  BarChart3,
} from 'lucide-react';
import { auditService } from '../../services/audit.service';
import { useWorkspace } from '../../hooks/useWorkspace';
import { AuditLog, AuditAction } from '../../types';
import { Button } from '../../components/common';
import { cn } from '../../utils';

export function AuditLogs() {
  const navigate = useNavigate();
  const { currentWorkspace } = useWorkspace();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [resourceTypeFilter, setResourceTypeFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    if (currentWorkspace) {
      loadAuditLogs();
    }
  }, [currentWorkspace, actionFilter, resourceTypeFilter, severityFilter, startDate, endDate]);

  const loadAuditLogs = async () => {
    if (!currentWorkspace) return;

    setIsLoading(true);
    try {
      const filters: Record<string, string> = {};
      if (actionFilter !== 'all') filters.action = actionFilter;
      if (resourceTypeFilter !== 'all') filters.resourceType = resourceTypeFilter;
      if (severityFilter !== 'all') filters.severity = severityFilter;
      if (startDate) filters.startDate = startDate;
      if (endDate) filters.endDate = endDate;
      if (search) filters.search = search;

      const data = await auditService.getAuditLogs(currentWorkspace.id, filters);
      setLogs(data.logs);
    } catch (error) {
      console.error('Failed to load audit logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    loadAuditLogs();
  };

  const handleExport = async (format: 'csv' | 'json') => {
    if (!currentWorkspace) return;

    setIsExporting(true);
    try {
      const filters: Record<string, string> = {};
      if (actionFilter !== 'all') filters.action = actionFilter;
      if (resourceTypeFilter !== 'all') filters.resourceType = resourceTypeFilter;
      if (severityFilter !== 'all') filters.severity = severityFilter;
      if (startDate) filters.startDate = startDate;
      if (endDate) filters.endDate = endDate;

      const blob = await auditService.exportAuditLogs(currentWorkspace.id, filters, format);
      
      // Download the file
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-logs-${Date.now()}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to export audit logs:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const getActionColor = (action: AuditAction) => {
    const colors: Record<string, string> = {
      created: 'bg-green-500/10 text-green-600 dark:text-green-400',
      updated: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      deleted: 'bg-red-500/10 text-red-600 dark:text-red-400',
      viewed: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
      executed: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      approved: 'bg-green-500/10 text-green-600 dark:text-green-400',
      rejected: 'bg-red-500/10 text-red-600 dark:text-red-400',
      invited: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      removed: 'bg-red-500/10 text-red-600 dark:text-red-400',
      connected: 'bg-green-500/10 text-green-600 dark:text-green-400',
      disconnected: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
      exported: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      imported: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      login: 'bg-green-500/10 text-green-600 dark:text-green-400',
      logout: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
      settings_changed: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
    };
    return colors[action] || 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const actions: AuditAction[] = [
    'created',
    'updated',
    'deleted',
    'executed',
    'approved',
    'rejected',
    'connected',
    'disconnected',
    'invited',
    'removed',
    'login',
    'logout',
    'settings_changed',
  ];

  const resourceTypes = ['workflow', 'integration', 'workspace', 'user', 'execution', 'approval', 'template', 'settings'];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading audit logs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
          <p className="text-muted-foreground mt-2">
            Track all changes and user activity for compliance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => navigate('/app/audit/stats')}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Statistics
          </Button>
          <div className="relative">
            <Button
              variant="secondary"
              onClick={() => setIsExporting(!isExporting)}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            {isExporting && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-10">
                <button
                  onClick={() => handleExport('csv')}
                  className="w-full px-4 py-2 text-left hover:bg-muted transition-colors"
                >
                  Export as CSV
                </button>
                <button
                  onClick={() => handleExport('json')}
                  className="w-full px-4 py-2 text-left hover:bg-muted transition-colors"
                >
                  Export as JSON
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by resource name, action, or user..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border-0 focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-card border border-border rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <div>
              <label className="block text-sm font-medium mb-2">Action</label>
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Actions</option>
                {actions.map((action) => (
                  <option key={action} value={action}>
                    {action.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Resource Type</label>
              <select
                value={resourceTypeFilter}
                onChange={(e) => setResourceTypeFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Types</option>
                {resourceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Severity</label>
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Severities</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Date Range</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Audit Logs List */}
      {logs.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No audit logs found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search criteria
          </p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="divide-y divide-border">
            {logs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                onClick={() => navigate(`/app/audit/${log.id}`)}
                className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getSeverityIcon(log.severity)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={cn(
                            'px-2 py-0.5 rounded text-xs font-medium',
                            getActionColor(log.action)
                          )}
                        >
                          {log.action.replace('_', ' ')}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {log.resourceType}
                        </span>
                      </div>
                      <p className="font-medium mb-1">
                        {log.userName} {log.action} {log.resourceName}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{log.userEmail}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(log.timestamp).toLocaleString()}</span>
                        </div>
                        {log.ipAddress && (
                          <div className="flex items-center gap-1">
                            <Activity className="h-3 w-3" />
                            <span>{log.ipAddress}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {logs.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          Showing {logs.length} audit log{logs.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}
