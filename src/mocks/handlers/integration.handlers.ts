import { http, HttpResponse } from 'msw';
import {
  getIntegrations,
  getIntegrationById,
  getIntegrationApps,
  getIntegrationAppById,
} from '../data/integrations';
import { config } from '../../config';

const BASE_URL = config.apiBaseUrl;

export const integrationHandlers = [
  // GET /workspaces/:workspaceId/integrations
  http.get(`${BASE_URL}/workspaces/:workspaceId/integrations`, ({ params }) => {
    const { workspaceId } = params;
    console.log('🔷 MSW: GET /workspaces/:workspaceId/integrations', { workspaceId });

    const integrations = getIntegrations(workspaceId as string);
    
    console.log('🔷 MSW: Returning integrations:', {
      count: integrations.length,
      names: integrations.map(i => i.name),
    });

    return HttpResponse.json({
      integrations,
      total: integrations.length,
    });
  }),

  // GET /workspaces/:workspaceId/integrations/:integrationId
  http.get(`${BASE_URL}/workspaces/:workspaceId/integrations/:integrationId`, ({ params }) => {
    const { integrationId } = params;
    console.log('🔷 MSW: GET /workspaces/:workspaceId/integrations/:integrationId', { integrationId });

    const integration = getIntegrationById(integrationId as string);

    if (!integration) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Integration not found',
        },
        { status: 404 }
      );
    }

    return HttpResponse.json(integration);
  }),

  // GET /integration-apps
  http.get(`${BASE_URL}/integration-apps`, () => {
    console.log('🔷 MSW: GET /integration-apps');

    const apps = getIntegrationApps();

    return HttpResponse.json({
      apps,
      total: apps.length,
    });
  }),

  // GET /integration-apps/:appId
  http.get(`${BASE_URL}/integration-apps/:appId`, ({ params }) => {
    const { appId } = params;
    console.log('🔷 MSW: GET /integration-apps/:appId', { appId });

    const app = getIntegrationAppById(appId as string);

    if (!app) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Integration app not found',
        },
        { status: 404 }
      );
    }

    return HttpResponse.json(app);
  }),

  // POST /workspaces/:workspaceId/integrations/oauth/start
  http.post(`${BASE_URL}/workspaces/:workspaceId/integrations/oauth/start`, async ({ request, params }) => {
    const { workspaceId } = params;
    const body = await request.json() as { appId: string };
    console.log('🔷 MSW: POST /workspaces/:workspaceId/integrations/oauth/start', { workspaceId, body });

    const { appId } = body;
    const app = getIntegrationAppById(appId);

    if (!app || app.authType !== 'oauth2') {
      return HttpResponse.json(
        {
          success: false,
          message: 'Invalid OAuth app',
        },
        { status: 400 }
      );
    }

    const state = `state_${Date.now()}`;
    const authUrl = `${app.authConfig.authUrl}?client_id=mock_client&redirect_uri=http://localhost:5173/integrations/callback&state=${state}&scope=${app.authConfig.scopes?.join(' ')}`;

    return HttpResponse.json({
      success: true,
      authUrl,
      state,
    });
  }),

  // POST /workspaces/:workspaceId/integrations/oauth/callback
  http.post(`${BASE_URL}/workspaces/:workspaceId/integrations/oauth/callback`, async ({ request, params }) => {
    const { workspaceId } = params;
    const body = await request.json();
    console.log('🔷 MSW: POST /workspaces/:workspaceId/integrations/oauth/callback', { workspaceId, body });

    // Simulate OAuth callback success
    const integrationId = `int_${Date.now()}`;

    return HttpResponse.json({
      success: true,
      integrationId,
      message: 'Integration connected successfully',
    });
  }),

  // POST /workspaces/:workspaceId/integrations
  http.post(`${BASE_URL}/workspaces/:workspaceId/integrations`, async ({ request, params }) => {
    const { workspaceId } = params;
    const body = await request.json();
    console.log('🔷 MSW: POST /workspaces/:workspaceId/integrations', { workspaceId, body });

    const integrationId = `int_${Date.now()}`;

    return HttpResponse.json({
      success: true,
      integrationId,
      message: 'Integration configured successfully',
    });
  }),

  // PATCH /workspaces/:workspaceId/integrations/:integrationId
  http.patch(`${BASE_URL}/workspaces/:workspaceId/integrations/:integrationId`, async ({ request, params }) => {
    const { workspaceId, integrationId } = params;
    const body = await request.json();
    console.log('🔷 MSW: PATCH /workspaces/:workspaceId/integrations/:integrationId', {
      workspaceId,
      integrationId,
      body,
    });

    const integration = getIntegrationById(integrationId as string);

    if (!integration) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Integration not found',
        },
        { status: 404 }
      );
    }

    // Merge updates
    const updated = { ...integration, ...body };

    return HttpResponse.json(updated);
  }),

  // POST /workspaces/:workspaceId/integrations/:integrationId/test
  http.post(`${BASE_URL}/workspaces/:workspaceId/integrations/:integrationId/test`, async ({ params }) => {
    const { workspaceId, integrationId } = params;
    console.log('🔷 MSW: POST /workspaces/:workspaceId/integrations/:integrationId/test', {
      workspaceId,
      integrationId,
    });

    const integration = getIntegrationById(integrationId as string);

    if (!integration) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Integration not found',
        },
        { status: 404 }
      );
    }

    // Simulate connection test
    const isError = integration.status === 'error';

    if (isError) {
      return HttpResponse.json({
        success: false,
        message: 'Connection test failed',
        error: integration.metadata.lastError || 'Unable to connect to the service',
      });
    }

    // Simulate successful test
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

    return HttpResponse.json({
      success: true,
      message: 'Connection test successful',
      details: {
        latency: Math.floor(Math.random() * 200) + 50,
        apiVersion: '2.0',
        accountInfo: {
          name: 'Demo Account',
          email: 'demo@swiftflow.ai',
        },
      },
    });
  }),

  // DELETE /workspaces/:workspaceId/integrations/:integrationId
  http.delete(`${BASE_URL}/workspaces/:workspaceId/integrations/:integrationId`, ({ params }) => {
    const { workspaceId, integrationId } = params;
    console.log('🔷 MSW: DELETE /workspaces/:workspaceId/integrations/:integrationId', {
      workspaceId,
      integrationId,
    });

    return HttpResponse.json({
      success: true,
      message: 'Integration disconnected successfully',
    });
  }),

  // POST /workspaces/:workspaceId/integrations/:integrationId/refresh
  http.post(`${BASE_URL}/workspaces/:workspaceId/integrations/:integrationId/refresh`, async ({ params }) => {
    const { workspaceId, integrationId } = params;
    console.log('🔷 MSW: POST /workspaces/:workspaceId/integrations/:integrationId/refresh', {
      workspaceId,
      integrationId,
    });

    const integration = getIntegrationById(integrationId as string);

    if (!integration) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Integration not found',
        },
        { status: 404 }
      );
    }

    // Simulate token refresh
    const updated = {
      ...integration,
      status: 'connected' as const,
      credentials: {
        ...integration.credentials,
        accessToken: `refreshed_token_${Date.now()}`,
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
      },
      metadata: {
        ...integration.metadata,
        lastTestStatus: 'success' as const,
        lastError: undefined,
      },
    };

    return HttpResponse.json(updated);
  }),
];

