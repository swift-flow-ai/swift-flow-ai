import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  X,
  Save,
  Play,
  AlertCircle,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "../common";
import {
  integrationSystemService,
  ActionDefinition,
  InstalledApp,
} from "../../services/integration-system.service";
import { useWorkspace } from "../../hooks/useWorkspace";
import { DynamicPropertyField } from "./DynamicPropertyField";

interface ConfigPanelProps {
  isOpen: boolean;
  onClose: () => void;
  integrationId: string;
  actionKey: string;
  nodeId?: string;
  initialConfig?: Record<string, unknown>;
  initialInstalledAppId?: string;
  onSave: (config: {
    integrationId: string;
    actionKey: string;
    installedAppId: string;
    config: Record<string, unknown>;
  }) => void;
}

export function ConfigPanel({
  isOpen,
  onClose,
  integrationId,
  actionKey,
  nodeId: _nodeId, // eslint-disable-line @typescript-eslint/no-unused-vars
  initialConfig,
  initialInstalledAppId,
  onSave,
}: ConfigPanelProps) {
  const { currentWorkspace } = useWorkspace();
  const [action, setAction] = useState<ActionDefinition | null>(null);
  const [installedApps, setInstalledApps] = useState<InstalledApp[]>([]);
  const [selectedAppId, setSelectedAppId] = useState<string>(
    initialInstalledAppId || ""
  );
  const [config, setConfig] = useState<Record<string, unknown>>(
    initialConfig || {}
  );
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message?: string;
  } | null>(null);

  const loadActionAndApps = useCallback(async () => {
    try {
      setLoading(true);
      const [actionData, apps] = await Promise.all([
        integrationSystemService.getAction(integrationId, actionKey),
        currentWorkspace?.id
          ? integrationSystemService.listInstalledIntegrations(
              currentWorkspace.id
            )
          : Promise.resolve([]),
      ]);

      setAction(actionData);

      // Filter installed apps for this integration
      const relevantApps = apps.filter(
        (app) => app.integrationId === integrationId
      );
      setInstalledApps(relevantApps);

      // Auto-select if only one app is installed (and no initial app was provided)
      if (relevantApps.length === 1 && !initialInstalledAppId) {
        setSelectedAppId(relevantApps[0].id);
      }
    } catch (error) {
      console.error("Failed to load action:", error);
    } finally {
      setLoading(false);
    }
  }, [integrationId, actionKey, currentWorkspace, initialInstalledAppId]);

  useEffect(() => {
    if (isOpen && integrationId && actionKey) {
      loadActionAndApps();
    }
  }, [isOpen, integrationId, actionKey, loadActionAndApps]);

  // Reset config and selectedAppId when opening with new initial values
  useEffect(() => {
    if (isOpen) {
      setConfig(initialConfig || {});
      setSelectedAppId(initialInstalledAppId || "");
    }
  }, [isOpen, initialConfig, initialInstalledAppId]);

  const handleConfigChange = (key: string, value: unknown) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleTest = async () => {
    if (!currentWorkspace?.id || !selectedAppId) return;

    try {
      setTesting(true);
      setTestResult(null);

      const result = await integrationSystemService.testAction(
        currentWorkspace.id,
        {
          installedAppId: selectedAppId,
          integrationId,
          actionKey,
          config,
        }
      );

      setTestResult({
        success: result.success,
        message: result.success
          ? "Action tested successfully!"
          : result.error || "Test failed",
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : "Test failed",
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = () => {
    if (!selectedAppId) {
      alert("Please select a connection");
      return;
    }

    onSave({
      integrationId,
      actionKey,
      installedAppId: selectedAppId,
      config,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed right-0 top-0 h-full w-96 bg-card border-l border-border z-50 flex flex-col shadow-xl"
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Configure Action</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {action && (
          <p className="text-sm text-muted-foreground">{action.name}</p>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Connection Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Choose Account
              </label>
              {installedApps.length === 0 ? (
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                        No connection found
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Please install this integration from the App Center
                        first.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <select
                  value={selectedAppId}
                  onChange={(e) => setSelectedAppId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a connection...</option>
                  {installedApps.map((app) => (
                    <option key={app.id} value={app.id}>
                      {app.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Action Properties */}
            {action && selectedAppId && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-3">
                    Action Configuration
                  </h3>
                  <div className="space-y-3">
                    {action.properties?.map((property) => (
                      <DynamicPropertyField
                        key={property.key}
                        property={property}
                        value={config[property.key]}
                        onChange={(value) =>
                          handleConfigChange(property.key, value)
                        }
                        integrationId={integrationId}
                        installedAppId={selectedAppId}
                        allValues={config}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Test Result */}
            {testResult && (
              <div
                className={`p-4 rounded-lg border ${
                  testResult.success
                    ? "bg-green-500/10 border-green-500/20"
                    : "bg-red-500/10 border-red-500/20"
                }`}
              >
                <div className="flex items-start gap-2">
                  {testResult.success ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        testResult.success
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {testResult.success ? "Success" : "Failed"}
                    </p>
                    {testResult.message && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {testResult.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-2">
        <Button
          onClick={handleTest}
          disabled={!selectedAppId || testing || loading}
          variant="outline"
          className="w-full"
        >
          {testing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Test Action
            </>
          )}
        </Button>
        <Button
          onClick={handleSave}
          disabled={!selectedAppId || loading}
          className="w-full"
        >
          <Save className="h-4 w-4 mr-2" />
          Save & Continue
        </Button>
      </div>
    </motion.div>
  );
}

