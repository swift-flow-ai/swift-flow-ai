/**
 * App Center Types - Integrations, MCPs, and Custom LLMs
 */

// ============================================================================
// MCP (Model Context Protocol) Types
// ============================================================================

export type MCPProvider = 'official' | 'community' | 'private';
export type MCPStatus = 'active' | 'inactive' | 'error';
export type MCPCategory = 'data-sources' | 'tools' | 'search' | 'actions' | 'custom';

export interface MCPCapability {
  id: string;
  name: string;
  description: string;
  parameters?: Record<string, unknown>;
}

export interface MCPServer {
  id: string;
  name: string;
  description: string;
  provider: MCPProvider;
  category: MCPCategory;
  icon?: string;
  version: string;
  author: string;
  endpoint?: string;
  capabilities: MCPCapability[];
  requiresAuth: boolean;
  status?: MCPStatus;
  installCount?: number;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

export interface InstalledMCP {
  id: string;
  mcpId: string;
  workspaceId: string;
  name: string;
  description: string;
  provider: MCPProvider;
  category: MCPCategory;
  icon?: string;
  endpoint: string;
  credentials?: Record<string, string>;
  capabilities: MCPCapability[];
  status: MCPStatus;
  lastUsed?: string;
  usageCount: number;
  installedAt: string;
  updatedAt: string;
}

export interface InstallMCPData {
  mcpId: string;
  credentials?: Record<string, string>;
  endpoint?: string;
}

export interface UpdateMCPData {
  credentials?: Record<string, string>;
  endpoint?: string;
  status?: MCPStatus;
}

export interface MCPTestResult {
  success: boolean;
  message: string;
  capabilities?: string[];
  latency?: number;
}

// ============================================================================
// Custom LLM Types
// ============================================================================

export type LLMProvider = 
  | 'openai'
  | 'anthropic'
  | 'openrouter'
  | 'together'
  | 'replicate'
  | 'ollama'
  | 'azure-openai'
  | 'aws-bedrock'
  | 'google-vertex'
  | 'custom';

export type LLMStatus = 'active' | 'inactive' | 'error';

export interface LLMParameters {
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  topK?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stopSequences?: string[];
}

export interface LLMCostConfig {
  inputPer1kTokens: number;
  outputPer1kTokens: number;
  currency: string;
}

export interface CustomLLM {
  id: string;
  workspaceId: string;
  name: string;
  description?: string;
  provider: LLMProvider;
  endpoint: string;
  model: string;
  apiKey: string;
  parameters: LLMParameters;
  costConfig?: LLMCostConfig;
  status: LLMStatus;
  lastUsed?: string;
  usageCount: number;
  totalTokensUsed: number;
  totalCost: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomLLMData {
  name: string;
  description?: string;
  provider: LLMProvider;
  endpoint: string;
  model: string;
  apiKey: string;
  parameters?: LLMParameters;
  costConfig?: LLMCostConfig;
}

export interface UpdateCustomLLMData {
  name?: string;
  description?: string;
  endpoint?: string;
  model?: string;
  apiKey?: string;
  parameters?: LLMParameters;
  costConfig?: LLMCostConfig;
  status?: LLMStatus;
}

export interface LLMTestResult {
  success: boolean;
  message: string;
  model?: string;
  latency?: number;
  testResponse?: string;
}

export interface LLMUsageStats {
  llmId: string;
  period: 'day' | 'week' | 'month' | 'all';
  totalCalls: number;
  totalTokens: {
    input: number;
    output: number;
    total: number;
  };
  totalCost: number;
  averageLatency: number;
  successRate: number;
  usageByWorkflow: Array<{
    workflowId: string;
    workflowName: string;
    calls: number;
    tokens: number;
    cost: number;
  }>;
  usageOverTime: Array<{
    date: string;
    calls: number;
    tokens: number;
    cost: number;
  }>;
}

// ============================================================================
// Integration Types (Extended)
// ============================================================================

export interface IntegrationApp {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  authType: 'oauth2' | 'api-key' | 'basic' | 'custom';
  authUrl?: string;
  scopes?: string[];
  capabilities: string[];
  installCount: number;
  rating: number;
  verified: boolean;
  popular: boolean;
  new: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// App Center Stats
// ============================================================================

export interface AppCenterStats {
  integrations: {
    total: number;
    installed: number;
    active: number;
  };
  mcps: {
    total: number;
    installed: number;
    active: number;
  };
  customLLMs: {
    total: number;
    active: number;
    totalCalls: number;
    totalCost: number;
  };
  recentlyAdded: Array<{
    type: 'integration' | 'mcp' | 'custom-llm';
    id: string;
    name: string;
    icon?: string;
    addedAt: string;
  }>;
}

