import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  ExternalLink,
  TestTube,
  Save,
  Trash2,
  RefreshCw,
} from 'lucide-react';
import { integrationService } from '../../services/integration.service';
import { useWorkspace } from '../../hooks/useWorkspace';
import { Integration, IntegrationApp, ConnectionTestResult } from '../../types';
import { Button, ConfirmDialog } from '../../components/common';
import { cn } from '../../utils';

export function IntegrationConfig() {
  const { integrationId, appId } = useParams<{ integrationId?: string; appId?: string }>();
  const navigate = useNavigate();
  const { currentWorkspace } = useWorkspace();
  const [app, setApp] = useState<IntegrationApp | null>(null);
  const [integration, setIntegration] = useState<Integration | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<ConnectionTestResult | null>(null);
  const [integrationName, setIntegrationName] = useState('');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [settings, setSettings] = useState({
    enabled: true,
    autoRefresh: true,
    notifications: true,
  });
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false);
  const [showOAuthInfo, setShowOAuthInfo] = useState(false);
  const [oauthUrl, setOauthUrl] = useState('');

  useEffect(() => {
    if (integrationId) {
      loadIntegration();
    } else if (appId) {
      loadApp();
    }
  }, [integrationId, appId]);

  const loadIntegration = async () => {
    if (!integrationId || !currentWorkspace) return;

    setIsLoading(true);
    try {
      const data = await integrationService.getIntegration(currentWorkspace.id, integrationId);
      setIntegration(data);
      setIntegrationName(data.name);
      setSettings(data.settings);

      // Load app details
      const appData = await integrationService.getIntegrationApp(data.appId);
      setApp(appData);
    } catch (error) {
      console.error('Failed to load integration:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadApp = async () => {
    if (!appId) return;

    setIsLoading(true);
    try {
      const data = await integrationService.getIntegrationApp(appId);
      setApp(data);
      // Set default name
      setIntegrationName(data.name);
    } catch (error) {
      console.error('Failed to load app:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthConnect = async () => {
    if (!app || !currentWorkspace) return;

    setIsSaving(true);
    try {
      const result = await integrationService.startOAuthFlow(currentWorkspace.id, app.id, {});
      
      // Simulate OAuth flow (in real app, would open popup or redirect)
      console.log('OAuth URL:', result.authUrl);
      setOauthUrl(result.authUrl);
      setShowOAuthInfo(true);

      // Simulate OAuth callback
      await integrationService.completeOAuthFlow(
        currentWorkspace.id,
        'mock_code_123',
        result.state
      );

      navigate('/app/integrations');
    } catch (error) {
      console.error('Failed to start OAuth flow:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleApiKeyConnect = async () => {
    if (!app || !currentWorkspace) return;

    setIsSaving(true);
    try {
      await integrationService.configureIntegration(currentWorkspace.id, app.id, formData);
      navigate('/app/integrations');
    } catch (error) {
      console.error('Failed to configure integration:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestConnection = async () => {
    if (!integration || !currentWorkspace) return;

    setIsTesting(true);
    setTestResult(null);
    try {
      const result = await integrationService.testConnection(currentWorkspace.id, integration.id);
      setTestResult(result);
    } catch (error) {
      console.error('Failed to test connection:', error);
      setTestResult({
        success: false,
        message: 'Connection test failed',
        error: 'An unexpected error occurred',
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSaveSettings = async () => {
    if (!integration || !currentWorkspace) return;

    setIsSaving(true);
    try {
      await integrationService.updateIntegration(currentWorkspace.id, integration.id, {
        name: integrationName,
        settings,
      });
      await loadIntegration();
    } catch (error) {
      console.error('Failed to update settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDisconnectClick = () => {
    setShowDisconnectDialog(true);
  };

  const handleDisconnectConfirm = async () => {
    if (!integration || !currentWorkspace) return;

    try {
      await integrationService.disconnectIntegration(currentWorkspace.id, integration.id);
      navigate('/app/integrations');
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  const handleRefreshToken = async () => {
    if (!integration || !currentWorkspace) return;

    setIsSaving(true);
    try {
      await integrationService.refreshToken(currentWorkspace.id, integration.id);
      await loadIntegration();
      setTestResult({
        success: true,
        message: 'Token refreshed successfully',
      });
    } catch (error) {
      console.error('Failed to refresh token:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">Integration not found</h3>
        <Button onClick={() => navigate('/app/integrations')}>Back to Integrations</Button>
      </div>
    );
  }

  const isConfigured = !!integration;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/app/integrations')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Integrations
        </button>

        <div className="flex items-start gap-4">
          <span className="text-5xl">{app.icon}</span>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">{app.name}</h1>
            <p className="text-muted-foreground mt-2">{app.description}</p>
            {app.documentation && (
              <a
                href={app.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-2"
              >
                View Documentation
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Status Card (if configured) */}
      {isConfigured && integration && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Connection Status</h2>
            {integration.status === 'connected' ? (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Connected</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <XCircle className="h-5 w-5" />
                <span className="font-medium">Disconnected</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Connected by:</span>
              <p className="font-medium">{integration.metadata.connectedBy}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Connected at:</span>
              <p className="font-medium">
                {new Date(integration.metadata.connectedAt).toLocaleString()}
              </p>
            </div>
            {integration.metadata.lastTestedAt && (
              <>
                <div>
                  <span className="text-muted-foreground">Last tested:</span>
                  <p className="font-medium">
                    {new Date(integration.metadata.lastTestedAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Test status:</span>
                  <p
                    className={cn(
                      'font-medium',
                      integration.metadata.lastTestStatus === 'success'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    )}
                  >
                    {integration.metadata.lastTestStatus}
                  </p>
                </div>
              </>
            )}
          </div>

          {integration.metadata.lastError && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-600 dark:text-red-400">
              {integration.metadata.lastError}
            </div>
          )}

          {/* Test Connection */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                onClick={handleTestConnection}
                isLoading={isTesting}
              >
                <TestTube className="h-4 w-4 mr-2" />
                Test Connection
              </Button>

              {integration.authType === 'oauth2' && integration.status === 'error' && (
                <Button
                  variant="secondary"
                  onClick={handleRefreshToken}
                  isLoading={isSaving}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Token
                </Button>
              )}
            </div>

            {testResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'mt-4 p-4 rounded-lg',
                  testResult.success
                    ? 'bg-green-500/10 border border-green-500/20'
                    : 'bg-red-500/10 border border-red-500/20'
                )}
              >
                <div className="flex items-start gap-3">
                  {testResult.success ? (
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p
                      className={cn(
                        'font-medium',
                        testResult.success
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      )}
                    >
                      {testResult.message}
                    </p>
                    {testResult.details && (
                      <div className="mt-2 text-sm space-y-1">
                        {testResult.details.latency && (
                          <p>Latency: {testResult.details.latency}ms</p>
                        )}
                        {testResult.details.apiVersion && (
                          <p>API Version: {testResult.details.apiVersion}</p>
                        )}
                        {testResult.details.accountInfo && (
                          <p>Account: {String((testResult.details.accountInfo as Record<string, unknown>).email || '')}</p>
                        )}
                      </div>
                    )}
                    {testResult.error && (
                      <p className="mt-2 text-sm">{testResult.error}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* Configuration Form (if not configured) */}
      {!isConfigured && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Configure Integration</h2>

          {app.authType === 'oauth2' ? (
            <div>
              {/* Integration Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Integration Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={integrationName}
                  onChange={(e) => setIntegrationName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={`e.g., ${app.name} - Engineering Team`}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Give this integration a unique name to identify it
                </p>
              </div>

              <p className="text-muted-foreground mb-4">
                Click the button below to connect your {app.name} account via OAuth 2.0
              </p>
              <div className="space-y-2 mb-6">
                <p className="text-sm font-medium">Required Scopes:</p>
                <div className="flex flex-wrap gap-2">
                  {app.authConfig.scopes?.map((scope) => (
                    <span
                      key={scope}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                    >
                      {scope}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                variant="primary"
                onClick={handleOAuthConnect}
                isLoading={isSaving}
                disabled={!integrationName.trim()}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Connect with {app.name}
              </Button>
            </div>
          ) : (
            <div>
              <div className="space-y-4 mb-6">
                {/* Integration Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Integration Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={integrationName}
                    onChange={(e) => setIntegrationName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={`e.g., ${app.name} - Production`}
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Give this integration a unique name to identify it
                  </p>
                </div>

                {app.authConfig.requiredFields?.map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium mb-2">
                      {field.label}
                      {field.required && <span className="text-destructive ml-1">*</span>}
                    </label>
                    {field.type === 'select' ? (
                      <select
                        value={formData[field.key] || ''}
                        onChange={(e) =>
                          setFormData({ ...formData, [field.key]: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required={field.required}
                      >
                        <option value="">Select...</option>
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.key] || ''}
                        onChange={(e) =>
                          setFormData({ ...formData, [field.key]: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                    )}
                  </div>
                ))}
              </div>
              <Button
                variant="primary"
                onClick={handleApiKeyConnect}
                isLoading={isSaving}
                disabled={!integrationName.trim()}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Configuration
              </Button>
            </div>
          )}
        </motion.div>
      )}

      {/* Settings (if configured) */}
      {isConfigured && integration && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Settings</h2>

          <div className="space-y-4">
            {/* Integration Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Integration Name
              </label>
              <input
                type="text"
                value={integrationName}
                onChange={(e) => setIntegrationName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter integration name"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable Integration</p>
                <p className="text-sm text-muted-foreground">
                  Allow workflows to use this integration
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.enabled}
                onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
                className="h-5 w-5 rounded border-border text-primary focus:ring-2 focus:ring-primary"
              />
            </div>

            {integration.authType === 'oauth2' && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-refresh Tokens</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically refresh OAuth tokens before expiry
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoRefresh}
                  onChange={(e) => setSettings({ ...settings, autoRefresh: e.target.checked })}
                  className="h-5 w-5 rounded border-border text-primary focus:ring-2 focus:ring-primary"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive alerts about integration issues
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                className="h-5 w-5 rounded border-border text-primary focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              variant="primary"
              onClick={handleSaveSettings}
              isLoading={isSaving}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </motion.div>
      )}

      {/* Danger Zone (if configured) */}
      {isConfigured && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-red-500/20 rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-2 text-red-600 dark:text-red-400">
            Danger Zone
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Disconnecting will remove all credentials and stop all workflows using this integration.
          </p>
          <Button variant="danger" onClick={handleDisconnectClick}>
            <Trash2 className="h-4 w-4 mr-2" />
            Disconnect Integration
          </Button>
        </motion.div>
      )}

      {/* Disconnect Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDisconnectDialog}
        onClose={() => setShowDisconnectDialog(false)}
        onConfirm={handleDisconnectConfirm}
        title="Disconnect Integration"
        message="Are you sure you want to disconnect this integration? This will remove all credentials and stop all workflows using this integration."
        confirmText="Disconnect"
        cancelText="Cancel"
        variant="danger"
      />

      {/* OAuth Info Dialog */}
      <ConfirmDialog
        isOpen={showOAuthInfo}
        onClose={() => setShowOAuthInfo(false)}
        onConfirm={() => setShowOAuthInfo(false)}
        title="OAuth Flow Initiated"
        message={`In a real app, you would be redirected to:\n\n${oauthUrl}\n\nFor this demo, we'll simulate a successful connection.`}
        confirmText="Got it"
        cancelText=""
        variant="info"
      />
    </div>
  );
}

