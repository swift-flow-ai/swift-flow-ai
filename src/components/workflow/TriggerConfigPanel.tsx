import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Zap, Save } from 'lucide-react';
import { Button } from '../common';
import { DynamicPropertyField } from './DynamicPropertyField';
import { IntegrationDefinition, TriggerDefinition } from '../../services/integration-system.service';

interface TriggerConfigPanelProps {
  integration: IntegrationDefinition | null;
  trigger: TriggerDefinition | null;
  initialConfig?: Record<string, unknown>;
  onSave: (config: {
    integrationId: string;
    triggerKey: string;
    config: Record<string, unknown>;
  }) => void;
  onClose: () => void;
}

export function TriggerConfigPanel({
  integration,
  trigger,
  initialConfig = {},
  onSave,
  onClose,
}: TriggerConfigPanelProps) {
  const [config, setConfig] = useState<Record<string, unknown>>(initialConfig);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setConfig(initialConfig);
  }, [initialConfig]);

  const handleFieldChange = (key: string, value: unknown) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    // Clear error for this field
    if (errors[key]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const validateConfig = (): boolean => {
    if (!trigger) return false;

    const newErrors: Record<string, string> = {};
    
    trigger.properties?.forEach((prop) => {
      if (prop.required && !config[prop.key]) {
        newErrors[prop.key] = `${prop.label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!integration || !trigger) return;

    if (!validateConfig()) {
      return;
    }

    onSave({
      integrationId: integration.id,
      triggerKey: trigger.key,
      config,
    });
  };

  if (!integration || !trigger) {
    return null;
  }

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed right-0 top-0 h-full w-[480px] bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col border-l border-gray-200 dark:border-gray-800"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Configure Trigger
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {integration.displayName} • {trigger.name}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {/* Trigger Description */}
          {trigger.description && (
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-sm text-purple-900 dark:text-purple-100">
                {trigger.description}
              </p>
            </div>
          )}

          {/* Trigger Type Badge */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Trigger Type:
            </span>
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
              {trigger.type}
            </span>
            {trigger.type === 'polling' && trigger.polling && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                (Checks every {trigger.polling.defaultInterval}s)
              </span>
            )}
          </div>

          {/* Configuration Fields */}
          {trigger.properties && trigger.properties.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Configuration
              </h3>
              {trigger.properties.map((property) => (
                <DynamicPropertyField
                  key={property.key}
                  property={property}
                  value={config[property.key]}
                  onChange={(value) => handleFieldChange(property.key, value)}
                  error={errors[property.key]}
                  integrationId={integration.id}
                />
              ))}
            </div>
          ) : (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This trigger doesn't require any configuration.
              </p>
            </div>
          )}

          {/* Sample Output */}
          {trigger.sampleOutput && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Sample Output
              </h3>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <pre className="text-xs text-gray-700 dark:text-gray-300 overflow-x-auto">
                  {JSON.stringify(trigger.sampleOutput, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-purple-600 hover:bg-purple-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Trigger
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

