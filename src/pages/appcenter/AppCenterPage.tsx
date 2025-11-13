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
import { Container, StatCard } from '../../components/common';

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
    <Container size="lg" className="space-y-6">
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
        >
          <StatCard
            label="Integrations"
            value={stats.integrationsInstalled}
            icon={Plug}
            iconColor="text-blue-600 dark:text-blue-400"
            iconBg="bg-blue-50 dark:bg-blue-950/30"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatCard
            label="MCPs Installed"
            value={stats.mcpsInstalled}
            icon={Package}
            iconColor="text-purple-600 dark:text-purple-400"
            iconBg="bg-purple-50 dark:bg-purple-950/30"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatCard
            label="Custom LLMs"
            value={stats.customLLMs}
            icon={Brain}
            iconColor="text-green-600 dark:text-green-400"
            iconBg="bg-green-50 dark:bg-green-950/30"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatCard
            label="LLM Cost (MTD)"
            value={`$${stats.llmCost.toFixed(0)}`}
            icon={DollarSign}
            iconColor="text-yellow-600 dark:text-yellow-400"
            iconBg="bg-yellow-50 dark:bg-yellow-950/30"
          />
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
    </Container>
  );
}

