import { api } from './api';
import { Integration, IntegrationApp, ConnectionTestResult } from '../types';

export const integrationService = {
  // Get all integrations for a workspace
  async getIntegrations(workspaceId: string): Promise<{ integrations: Integration[]; total: number }> {
    const response = await api.get<{ integrations: Integration[]; total: number }>(
      `/workspaces/${workspaceId}/integrations`
    );
    return response.data;
  },

  // Get single integration
  async getIntegration(workspaceId: string, integrationId: string): Promise<Integration> {
    const response = await api.get<Integration>(
      `/workspaces/${workspaceId}/integrations/${integrationId}`
    );
    return response.data;
  },

  // Get available integration apps
  async getIntegrationApps(): Promise<{ apps: IntegrationApp[]; total: number }> {
    const response = await api.get<{ apps: IntegrationApp[]; total: number }>('/integration-apps');
    return response.data;
  },

  // Get single integration app
  async getIntegrationApp(appId: string): Promise<IntegrationApp> {
    const response = await api.get<IntegrationApp>(`/integration-apps/${appId}`);
    return response.data;
  },

  // Start OAuth flow
  async startOAuthFlow(
    workspaceId: string,
    appId: string,
    config: any
  ): Promise<{ authUrl: string; state: string }> {
    const response = await api.post<{ authUrl: string; state: string }>(
      `/workspaces/${workspaceId}/integrations/oauth/start`,
      { appId, config }
    );
    return response.data;
  },

  // Complete OAuth flow
  async completeOAuthFlow(
    workspaceId: string,
    code: string,
    state: string
  ): Promise<{ integrationId: string }> {
    const response = await api.post<{ integrationId: string }>(
      `/workspaces/${workspaceId}/integrations/oauth/callback`,
      { code, state }
    );
    return response.data;
  },

  // Configure integration with API key or custom auth
  async configureIntegration(
    workspaceId: string,
    appId: string,
    config: any
  ): Promise<{ integrationId: string }> {
    const response = await api.post<{ integrationId: string }>(
      `/workspaces/${workspaceId}/integrations`,
      { appId, config }
    );
    return response.data;
  },

  // Update integration settings
  async updateIntegration(
    workspaceId: string,
    integrationId: string,
    updates: Partial<Integration>
  ): Promise<Integration> {
    const response = await api.patch<Integration>(
      `/workspaces/${workspaceId}/integrations/${integrationId}`,
      updates
    );
    return response.data;
  },

  // Test integration connection
  async testConnection(
    workspaceId: string,
    integrationId: string
  ): Promise<ConnectionTestResult> {
    const response = await api.post<ConnectionTestResult>(
      `/workspaces/${workspaceId}/integrations/${integrationId}/test`
    );
    return response.data;
  },

  // Disconnect integration
  async disconnectIntegration(workspaceId: string, integrationId: string): Promise<void> {
    await api.delete(`/workspaces/${workspaceId}/integrations/${integrationId}`);
  },

  // Refresh OAuth token
  async refreshToken(workspaceId: string, integrationId: string): Promise<Integration> {
    const response = await api.post<Integration>(
      `/workspaces/${workspaceId}/integrations/${integrationId}/refresh`
    );
    return response.data;
  },
};

