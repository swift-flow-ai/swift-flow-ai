import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Plug, 
  Brain,
  Clock,
  DollarSign
} from 'lucide-react';
import { IntegrationsTab } from './IntegrationsTab';
import { MCPsTab } from './MCPsTab';
import { CustomLLMsTab } from './CustomLLMsTab';
import { mockAppCenterStats } from '../../mocks/data/appcenter';

type Tab = 'integrations' | 'mcps' | 'custom-llms';

export function AppCenterPage() {
  const [activeTab, setActiveTab] = useState<Tab>('integrations');

  const tabs = [
    { id: 'integrations' as Tab, label: 'Integrations', icon: Plug, count: mockAppCenterStats.integrations.installed },
    { id: 'mcps' as Tab, label: 'MCPs', icon: Package, count: mockAppCenterStats.mcps.installed },
    { id: 'custom-llms' as Tab, label: 'Custom LLMs', icon: Brain, count: mockAppCenterStats.customLLMs.total },
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
              <p className="text-2xl font-bold">{mockAppCenterStats.integrations.installed}</p>
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
              <p className="text-2xl font-bold">{mockAppCenterStats.mcps.installed}</p>
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
              <p className="text-2xl font-bold">{mockAppCenterStats.customLLMs.total}</p>
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
              <p className="text-2xl font-bold">${mockAppCenterStats.customLLMs.totalCost.toFixed(0)}</p>
              <p className="text-sm text-muted-foreground">LLM Cost (MTD)</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recently Added */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Recently Added</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {mockAppCenterStats.recentlyAdded.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary transition-colors"
            >
              {item.icon && <span className="text-2xl">{item.icon}</span>}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{item.type.replace('-', ' ')}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

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

