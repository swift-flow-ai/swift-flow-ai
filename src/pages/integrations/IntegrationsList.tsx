import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Settings,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import { integrationService } from '../../services/integration.service';
import { useWorkspace } from '../../hooks/useWorkspace';
import { Integration } from '../../types';
import { Button } from '../../components/common';
import { cn } from '../../utils';

export function IntegrationsList() {
  const navigate = useNavigate();
  const { currentWorkspace } = useWorkspace();
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshingId, setRefreshingId] = useState<string | null>(null);

  useEffect(() => {
    if (currentWorkspace) {
      loadIntegrations();
    }
  }, [currentWorkspace]);

  const loadIntegrations = async () => {
    if (!currentWorkspace) return;

    setIsLoading(true);
    try {
      const data = await integrationService.getIntegrations(currentWorkspace.id);
      setIntegrations(data.integrations);
    } catch (error) {
      console.error('Failed to load integrations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshToken = async (integrationId: string) => {
    if (!currentWorkspace) return;

    setRefreshingId(integrationId);
    try {
      await integrationService.refreshToken(currentWorkspace.id, integrationId);
      await loadIntegrations();
    } catch (error) {
      console.error('Failed to refresh token:', error);
    } finally {
      setRefreshingId(null);
    }
  };

  const handleDisconnect = async (integrationId: string) => {
    if (!currentWorkspace) return;
    if (!confirm('Are you sure you want to disconnect this integration?')) return;

    try {
      await integrationService.disconnectIntegration(currentWorkspace.id, integrationId);
      await loadIntegrations();
    } catch (error) {
      console.error('Failed to disconnect integration:', error);
    }
  };

  const getStatusIcon = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'disconnected':
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
      case 'configuring':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: Integration['status']) => {
    const styles = {
      connected: 'bg-green-500/10 text-green-600 dark:text-green-400',
      error: 'bg-red-500/10 text-red-600 dark:text-red-400',
      disconnected: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
      configuring: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
    };

    return (
      <span className={cn('px-2 py-1 rounded-md text-xs font-medium', styles[status])}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading integrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
          <p className="text-muted-foreground mt-2">
            Manage your connected apps and services
          </p>
        </div>
        <Button variant="primary" onClick={() => navigate('/app/integrations/add')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Integration
        </Button>
      </div>

      {/* Integrations List */}
      {integrations.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <div className="text-6xl mb-4">🔌</div>
          <h3 className="text-lg font-semibold mb-2">No integrations yet</h3>
          <p className="text-muted-foreground mb-6">
            Connect your favorite apps to automate workflows
          </p>
          <Button variant="primary" onClick={() => navigate('/app/integrations/add')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Integration
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 hover:shadow-lg transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{integration.appIcon}</span>
                  <div>
                    <h3 className="font-semibold text-lg">{integration.name}</h3>
                    <p className="text-xs text-muted-foreground">{integration.appName}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {getStatusIcon(integration.status)}
                  {getStatusBadge(integration.status)}
                </div>
              </div>

              {/* Auth Type */}
              <div className="mb-4">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  {integration.authType.replace('_', ' ')}
                </span>
              </div>

              {/* Metadata */}
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div>
                  <span className="font-medium">Connected:</span>{' '}
                  {new Date(integration.metadata.connectedAt).toLocaleDateString()}
                </div>
                {integration.metadata.lastTestedAt && (
                  <div>
                    <span className="font-medium">Last tested:</span>{' '}
                    {new Date(integration.metadata.lastTestedAt).toLocaleDateString()}
                  </div>
                )}
                {integration.metadata.lastError && (
                  <div className="text-red-500 text-xs mt-2">
                    {integration.metadata.lastError}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => navigate(`/app/integrations/${integration.id}`)}
                  className="flex-1"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
                {integration.status === 'error' && integration.authType === 'oauth2' && (
                  <Button
                    variant="secondary"
                    onClick={() => handleRefreshToken(integration.id)}
                    isLoading={refreshingId === integration.id}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="danger"
                  onClick={() => handleDisconnect(integration.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

