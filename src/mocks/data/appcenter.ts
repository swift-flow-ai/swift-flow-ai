import type { AppCenterStats } from '../../types/appcenter';

/**
 * Mock App Center Statistics
 */
export const mockAppCenterStats: AppCenterStats = {
  integrations: {
    total: 523,
    installed: 12,
    active: 10,
  },
  mcps: {
    total: 47,
    installed: 3,
    active: 3,
  },
  customLLMs: {
    total: 5,
    active: 4,
    totalCalls: 2391,
    totalCost: 254.28,
  },
  recentlyAdded: [
    {
      type: 'mcp',
      id: 'installed_mcp_3',
      name: 'GitHub MCP',
      icon: '🐙',
      addedAt: '2024-10-25T11:30:00Z',
    },
    {
      type: 'custom-llm',
      id: 'llm_custom_4',
      name: 'OpenRouter Mixtral',
      addedAt: '2024-10-10T00:00:00Z',
    },
    {
      type: 'integration',
      id: 'int_salesforce',
      name: 'Salesforce',
      icon: '☁️',
      addedAt: '2024-10-05T14:20:00Z',
    },
    {
      type: 'custom-llm',
      id: 'llm_custom_3',
      name: 'Local Llama 3.1',
      addedAt: '2024-10-01T00:00:00Z',
    },
    {
      type: 'mcp',
      id: 'installed_mcp_2',
      name: 'Calculator MCP',
      icon: '🧮',
      addedAt: '2024-10-20T14:00:00Z',
    },
  ],
};

