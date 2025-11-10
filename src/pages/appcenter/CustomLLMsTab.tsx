import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Input } from '../../components/common';
import { 
  Search,
  Plus,
  Brain,
  Settings,
  Trash2,
  Play,
  DollarSign,
  Activity,
  CheckCircle2,
  XCircle,
  BarChart3
} from 'lucide-react';
import { mockCustomLLMs } from '../../mocks/data/customLLMs';
import type { CustomLLM } from '../../types/appcenter';

export function CustomLLMsTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<string>('all');

  const providers = [
    { id: 'all', label: 'All Providers' },
    { id: 'openai', label: 'OpenAI' },
    { id: 'anthropic', label: 'Anthropic' },
    { id: 'openrouter', label: 'OpenRouter' },
    { id: 'ollama', label: 'Ollama' },
    { id: 'azure-openai', label: 'Azure OpenAI' },
  ];

  const filteredLLMs = mockCustomLLMs.filter(llm => {
    const matchesSearch = llm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (llm.description && llm.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesProvider = selectedProvider === 'all' || llm.provider === selectedProvider;
    return matchesSearch && matchesProvider;
  });

  const handleTestLLM = (llm: CustomLLM) => {
    console.log('Testing LLM:', llm.name);
    // TODO: Implement LLM testing
  };

  const handleDeleteLLM = (llm: CustomLLM) => {
    console.log('Deleting LLM:', llm.name);
    // TODO: Implement deletion
  };

  const totalCost = mockCustomLLMs.reduce((sum, llm) => sum + llm.totalCost, 0);
  const totalCalls = mockCustomLLMs.reduce((sum, llm) => sum + llm.usageCount, 0);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Brain className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockCustomLLMs.filter(l => l.status === 'active').length}</p>
              <p className="text-sm text-muted-foreground">Active LLMs</p>
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
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalCalls.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Calls</p>
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
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">${totalCost.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Total Cost</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters & Add Button */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search custom LLMs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          >
            {providers.map(provider => (
              <option key={provider.id} value={provider.id}>{provider.label}</option>
            ))}
          </select>

          <Button variant="primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Custom LLM
          </Button>
        </div>
      </div>

      {/* LLMs List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredLLMs.map((llm, index) => (
          <motion.div
            key={llm.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{llm.name}</h3>
                    {llm.status === 'active' ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-gray-500" />
                    )}
                    <span className="px-2 py-0.5 rounded-full text-xs bg-muted capitalize">
                      {llm.provider}
                    </span>
                  </div>
                  {llm.description && (
                    <p className="text-sm text-muted-foreground mb-3">{llm.description}</p>
                  )}
                  
                  {/* Model Info */}
                  <div className="flex flex-wrap gap-4 mb-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Model: </span>
                      <span className="font-mono text-xs">{llm.model}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Temperature: </span>
                      <span>{llm.parameters.temperature}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Max Tokens: </span>
                      <span>{llm.parameters.maxTokens}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-4 pt-3 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Usage</p>
                      <p className="font-semibold">{llm.usageCount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Tokens</p>
                      <p className="font-semibold">{(llm.totalTokensUsed / 1000).toFixed(0)}K</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Cost</p>
                      <p className="font-semibold">${llm.totalCost.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Last Used</p>
                      <p className="font-semibold text-xs">
                        {llm.lastUsed ? new Date(llm.lastUsed).toLocaleDateString() : 'Never'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                >
                  <BarChart3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleTestLLM(llm)}
                >
                  <Play className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDeleteLLM(llm)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredLLMs.length === 0 && (
        <div className="text-center py-12">
          <Brain className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground mb-4">No custom LLMs found</p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Custom LLM
          </Button>
        </div>
      )}
    </div>
  );
}

