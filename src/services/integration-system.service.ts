import { api } from "./api";

// MSW response wrapper type
interface MSWResponse<T> {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
  };
}

// Types based on INTEGRATION_DATA_STRUCTURE.md
export interface IntegrationDefinition {
  id: string;
  name: string;
  displayName: string;
  description: string;
  category: IntegrationCategory;
  icon: string;
  logoUrl?: string;
  version: string;
  verified: boolean;
  popular: boolean;
  new: boolean;
  beta?: boolean;
  auth: AuthConfig;
  triggers: TriggerDefinition[];
  actions: ActionDefinition[];
  docsUrl?: string;
  supportUrl?: string;
  author?: string;
  installCount?: number;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

export type IntegrationCategory =
  | "communication"
  | "email"
  | "calendar"
  | "project-management"
  | "crm"
  | "storage"
  | "database"
  | "developer-tools"
  | "scheduling"
  | "forms"
  | "ai"
  | "mcp"
  | "utilities"
  | "other";

export interface AuthConfig {
  type: AuthType;
  required: boolean;
  authUrl?: string;
  tokenUrl?: string;
  scopes?: string[];
  fields?: AuthField[];
  testConnection?: {
    method: "GET" | "POST";
    url: string;
    headers?: Record<string, string>;
  };
}

export type AuthType =
  | "oauth2"
  | "api-key"
  | "basic"
  | "bearer"
  | "custom"
  | "none";

export interface AuthField {
  key: string;
  label: string;
  type: "string" | "password";
  required: boolean;
  description?: string;
  placeholder?: string;
}

export interface TriggerDefinition {
  key: string;
  name: string;
  description: string;
  type: TriggerType;
  properties: PropertyDefinition[];
  sampleOutput: Record<string, unknown>;
  polling?: {
    defaultInterval: number;
    minInterval: number;
    maxInterval: number;
  };
  webhook?: {
    subscriptionEndpoint?: string;
    unsubscribeEndpoint?: string;
  };
}

export type TriggerType = "webhook" | "polling" | "instant" | "schedule";

export interface ActionDefinition {
  key: string;
  name: string;
  description: string;
  properties: PropertyDefinition[];
  sampleOutput: Record<string, unknown>;
  requiresConnection: boolean;
  supportsTest?: boolean;
  batchable?: boolean;
  retryable?: boolean;
}

export interface PropertyDefinition {
  key: string;
  label: string;
  type: PropertyType;
  required: boolean;
  description?: string;
  placeholder?: string;
  defaultValue?: unknown;
  options?: Array<{ label: string; value: string | number | boolean }>;
  dynamicOptions?: {
    endpoint: string;
    dependsOn: string[];
    searchable?: boolean;
    paginated?: boolean;
    pageSize?: number;
    cacheTTL?: number;
    debounceMs?: number;
    minSearchLength?: number;
  };
  showIf?: {
    field: string;
    operator: ComparisonOperator;
    value: unknown;
  };
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    customMessage?: string;
  };
  supportsExpressions?: boolean;
  itemProperties?: PropertyDefinition[];
  objectProperties?: PropertyDefinition[];
  multiline?: boolean;
  rows?: number;
  language?: string;
}

export type PropertyType =
  | "string"
  | "text"
  | "number"
  | "boolean"
  | "dropdown"
  | "multi-select"
  | "date"
  | "datetime"
  | "file"
  | "json"
  | "array"
  | "object"
  | "password"
  | "code";

export type ComparisonOperator =
  | "equals"
  | "not_equals"
  | "contains"
  | "not_contains"
  | "greater_than"
  | "less_than"
  | "is_empty"
  | "is_not_empty";

export interface InstalledApp {
  id: string;
  integrationId: string;
  workspaceId: string;
  name: string;
  credentials: Record<string, unknown>;
  status: "active" | "inactive" | "error";
  errorMessage?: string;
  lastUsed?: string;
  usageCount: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface DynamicOptionsRequest {
  installedAppId: string;
  propertyKey: string;
  searchTerm?: string;
  dependentValues?: Record<string, unknown>;
  limit?: number;
  offset?: number;
}

export interface DynamicOptionsResponse {
  options: Array<{
    label: string;
    value: string | number;
    description?: string;
    icon?: string;
  }>;
  hasMore: boolean;
  total?: number;
}

export const integrationSystemService = {
  // Browse available integrations (App Catalog)
  async listAvailableIntegrations(params?: {
    category?: IntegrationCategory;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ integrations: IntegrationDefinition[]; total: number }> {
    const response = await api.get("/integrations/catalog", { params });
    return response.data as {
      integrations: IntegrationDefinition[];
      total: number;
    };
  },

  // Alias for listAvailableIntegrations
  async listCatalog(params?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
    offset?: number;
  }): Promise<{ integrations: IntegrationDefinition[]; total: number }> {
    const response = await api.get("/integrations/catalog", { params });
    const data = response.data as MSWResponse<{ integrations: IntegrationDefinition[]; total: number }> | { integrations: IntegrationDefinition[]; total: number };
    // Handle MSW response format: { success: true, data: { integrations, total } }
    return 'data' in data && 'success' in data ? data.data : data;
  },

  // Get integration definition
  async getIntegration(integrationId: string): Promise<IntegrationDefinition> {
    const response = await api.get(`/integrations/catalog/${integrationId}`);
    const data = response.data as MSWResponse<IntegrationDefinition> | IntegrationDefinition;
    return 'data' in data && 'success' in data ? data.data : data;
  },

  // Get specific action definition
  async getAction(
    integrationId: string,
    actionKey: string
  ): Promise<ActionDefinition> {
    const response = await api.get(
      `/integrations/catalog/${integrationId}/actions/${actionKey}`
    );
    const data = response.data as MSWResponse<ActionDefinition> | ActionDefinition;
    return 'data' in data && 'success' in data ? data.data : data;
  },

  // Get specific trigger definition
  async getTrigger(
    integrationId: string,
    triggerKey: string
  ): Promise<TriggerDefinition> {
    const response = await api.get(
      `/integrations/catalog/${integrationId}/triggers/${triggerKey}`
    );
    const data = response.data as MSWResponse<TriggerDefinition> | TriggerDefinition;
    return 'data' in data && 'success' in data ? data.data : data;
  },

  // Installed integrations (workspace-specific)
  async listInstalledIntegrations(
    workspaceId: string
  ): Promise<InstalledApp[]> {
    const response = await api.get(
      `/workspaces/${workspaceId}/integrations/installed`
    );
    const data = response.data as MSWResponse<InstalledApp[]> | InstalledApp[];
    // Handle MSW response format: { success: true, data: [...] }
    return 'data' in data && 'success' in data ? data.data : data;
  },

  // Install integration (OAuth or API key)
  async installIntegration(
    workspaceId: string,
    data: {
      integrationId: string;
      name: string;
      credentials: Record<string, unknown>;
    }
  ): Promise<InstalledApp> {
    const response = await api.post(
      `/workspaces/${workspaceId}/integrations/installed`,
      data
    );
    return response.data as InstalledApp;
  },

  // Update installed integration
  async updateInstalledIntegration(
    workspaceId: string,
    installedAppId: string,
    data: {
      name?: string;
      credentials?: Record<string, unknown>;
    }
  ): Promise<InstalledApp> {
    const response = await api.patch(
      `/workspaces/${workspaceId}/integrations/installed/${installedAppId}`,
      data
    );
    return response.data as InstalledApp;
  },

  // Delete installed integration
  async deleteInstalledIntegration(
    workspaceId: string,
    installedAppId: string
  ): Promise<void> {
    await api.delete(
      `/workspaces/${workspaceId}/integrations/installed/${installedAppId}`
    );
  },

  // Test connection
  async testConnection(
    workspaceId: string,
    installedAppId: string
  ): Promise<{ success: boolean; message?: string }> {
    const response = await api.post(
      `/workspaces/${workspaceId}/integrations/installed/${installedAppId}/test`
    );
    return response.data as { success: boolean; message?: string };
  },

  // Get dynamic options for a property
  async getDynamicOptions(
    integrationId: string,
    propertyKey: string,
    request: DynamicOptionsRequest
  ): Promise<DynamicOptionsResponse> {
    const response = await api.post(
      `/integrations/${integrationId}/dynamic/${propertyKey}`,
      request
    );
    const data = response.data as MSWResponse<DynamicOptionsResponse> | DynamicOptionsResponse;
    // Handle MSW response format: { success: true, data: {...} }
    return 'data' in data && 'success' in data ? data.data : data;
  },

  // Test action
  async testAction(
    workspaceId: string,
    data: {
      integrationId: string;
      actionKey: string;
      installedAppId: string;
      config: Record<string, unknown>;
    }
  ): Promise<{ success: boolean; output?: unknown; error?: string }> {
    const response = await api.post(
      `/workspaces/${workspaceId}/integrations/test-action`,
      data
    );
    return response.data as {
      success: boolean;
      output?: unknown;
      error?: string;
    };
  },
};
