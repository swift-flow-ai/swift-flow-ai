import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Plug, 
  Brain,
  DollarSign
} from 'lucide-react';
import { IntegrationsTab } from './IntegrationsTab';
import { MCPsTab } from './MCPsTab';
import { CustomLLMsTab } from './CustomLLMsTab';
import { integrationSystemService } from '../../services/integration-system.service';
import { useWorkspace } from '../../hooks/useWorkspace';

type Tab = 'integrations' | 'mcps' | 'custom-llms';

export function AppCenterPage() {
  const [activeTab, setActiveTab] = useState<Tab>('integrations');
  const { currentWorkspace } = useWorkspace();
  const [stats, setStats] = useState({
    integrationsInstalled: 0,
    mcpsInstalled: 0,
    customLLMs: 0,
    llmCost: 0,
  });

  const loadStats = useCallback(async () => {
    try {
      if (currentWorkspace?.id) {
        const installed = await integrationSystemService.listInstalledIntegrations(currentWorkspace.id);
        setStats({
          integrationsInstalled: installed.length,
          mcpsInstalled: 0, // TODO: Add MCP stats
          customLLMs: 0, // TODO: Add Custom LLM stats
          llmCost: 0, // TODO: Add cost tracking
        });
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  }, [currentWorkspace?.id]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const tabs = [
    { id: 'integrations' as Tab, label: 'Integrations', icon: Plug, count: stats.integrationsInstalled },
    { id: 'mcps' as Tab, label: 'MCPs', icon: Package, count: stats.mcpsInstalled },
    { id: 'custom-llms' as Tab, label: 'Custom LLMs', icon: Brain, count: stats.customLLMs },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">App Center</h1>
        <p className="text-muted-foreground mt-2">
          Extend Swift Flow AI with integrations, MCPs, and custom LLMs
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Plug className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.integrationsInstalled}</p>
              <p className="text-sm text-muted-foreground">Integrations</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.mcpsInstalled}</p>
              <p className="text-sm text-muted-foreground">MCPs Installed</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Brain className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.customLLMs}</p>
              <p className="text-sm text-muted-foreground">Custom LLMs</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">${stats.llmCost.toFixed(0)}</p>
              <p className="text-sm text-muted-foreground">LLM Cost (MTD)</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{tab.label}</span>
                <span className="px-2 py-0.5 rounded-full bg-muted text-xs">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'integrations' && <IntegrationsTab />}
        {activeTab === 'mcps' && <MCPsTab />}
        {activeTab === 'custom-llms' && <CustomLLMsTab />}
      </div>
    </div>
  );
}

