import { http, HttpResponse, delay } from "msw";
import { config } from "../../config";
import {
  integrationDefinitions,
  getIntegrationById,
  getIntegrationsByCategory,
  searchIntegrations,
} from "../data/integration-definitions";
import {
  installedIntegrations,
  getInstalledIntegrationsByWorkspace,
  getInstalledIntegrationById,
  getInstalledIntegrationsByIntegrationId,
} from "../data/installed-integrations";
import { getDynamicOptionsByEndpoint } from "../data/dynamic-options";
import { DynamicOptionsRequest } from "../../services/integration-system.service";

export const integrationSystemHandlers = [
  // ============================================================================
  // INTEGRATION CATALOG (Available integrations)
  // ============================================================================

  // List available integrations (App Catalog)
  http.get(`${config.apiBaseUrl}/integrations/catalog`, async ({ request }) => {
    await delay(300);

    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    const search = url.searchParams.get("search");
    const limit = parseInt(url.searchParams.get("limit") || "50");
    const offset = parseInt(url.searchParams.get("offset") || "0");

    let filtered = integrationDefinitions;

    // Filter by category
    if (category && category !== "all") {
      filtered = getIntegrationsByCategory(category);
    }

    // Filter by search
    if (search) {
      filtered = searchIntegrations(search);
    }

    // Pagination
    const total = filtered.length;
    const paginated = filtered.slice(offset, offset + limit);

    return HttpResponse.json({
      success: true,
      data: {
        integrations: paginated,
        total,
      },
    });
  }),

  // Get integration definition
  http.get(
    `${config.apiBaseUrl}/integrations/catalog/:integrationId`,
    async ({ params }) => {
      await delay(200);

      const { integrationId } = params;
      const integration = getIntegrationById(integrationId as string);

      if (!integration) {
        return HttpResponse.json(
          {
            success: false,
            error: {
              code: "NOT_FOUND",
              message: "Integration not found",
            },
          },
          { status: 404 }
        );
      }

      return HttpResponse.json({
        success: true,
        data: integration,
      });
    }
  ),

  // Get specific action definition
  http.get(
    `${config.apiBaseUrl}/integrations/catalog/:integrationId/actions/:actionKey`,
    async ({ params }) => {
      await delay(150);

      const { integrationId, actionKey } = params;
      const integration = getIntegrationById(integrationId as string);

      if (!integration) {
        return HttpResponse.json(
          {
            success: false,
            error: {
              code: "NOT_FOUND",
              message: "Integration not found",
            },
          },
          { status: 404 }
        );
      }

      const action = integration.actions.find((a) => a.key === actionKey);

      if (!action) {
        return HttpResponse.json(
          {
            success: false,
            error: {
              code: "NOT_FOUND",
              message: "Action not found",
            },
          },
          { status: 404 }
        );
      }

      return HttpResponse.json({
        success: true,
        data: action,
      });
    }
  ),

  // Get specific trigger definition
  http.get(
    `${config.apiBaseUrl}/integrations/catalog/:integrationId/triggers/:triggerKey`,
    async ({ params }) => {
      await delay(150);

      const { integrationId, triggerKey } = params;
      const integration = getIntegrationById(integrationId as string);

      if (!integration) {
        return HttpResponse.json(
          {
            success: false,
            error: {
              code: "NOT_FOUND",
              message: "Integration not found",
            },
          },
          { status: 404 }
        );
      }

      const trigger = integration.triggers.find((t) => t.key === triggerKey);

      if (!trigger) {
        return HttpResponse.json(
          {
            success: false,
            error: {
              code: "NOT_FOUND",
              message: "Trigger not found",
            },
          },
          { status: 404 }
        );
      }

      return HttpResponse.json({
        success: true,
        data: trigger,
      });
    }
  ),

  // ============================================================================
  // INSTALLED INTEGRATIONS (Workspace-specific)
  // ============================================================================

  // List installed integrations for workspace
  http.get(
    `${config.apiBaseUrl}/workspaces/:workspaceId/integrations/installed`,
    async ({ params }) => {
      await delay(200);

      const { workspaceId } = params;
      const installed = getInstalledIntegrationsByWorkspace(
        workspaceId as string
      );

      return HttpResponse.json({
        success: true,
        data: installed,
      });
    }
  ),

  // Install integration
  http.post(
    `${config.apiBaseUrl}/workspaces/:workspaceId/integrations/installed`,
    async ({ request, params }) => {
      await delay(500);

      const { workspaceId } = params;
      const body = (await request.json()) as {
        integrationId: string;
        name: string;
        credentials: Record<string, unknown>;
      };

      // Validate integration exists
      const integration = getIntegrationById(body.integrationId);
      if (!integration) {
        return HttpResponse.json(
          {
            success: false,
            error: {
              code: "INVALID_INTEGRATION",
              message: "Integration not found",
            },
          },
          { status: 400 }
        );
      }

      // Create new installed integration
      const newInstalled = {
        id: `inst_${body.integrationId}_${Date.now()}`,
        integrationId: body.integrationId,
        workspaceId: workspaceId as string,
        name: body.name,
        credentials: body.credentials,
        status: "active" as const,
        lastUsed: undefined,
        usageCount: 0,
        createdBy: "usr_current",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add to mock data
      installedIntegrations.push(newInstalled);

      return HttpResponse.json({
        success: true,
        data: newInstalled,
      });
    }
  ),

  // Update installed integration
  http.patch(
    `${config.apiBaseUrl}/workspaces/:workspaceId/integrations/installed/:installedAppId`,
    async ({ request, params }) => {
      await delay(300);

      const { installedAppId } = params;
      const body = (await request.json()) as {
        name?: string;
        credentials?: Record<string, unknown>;
      };

      const installed = getInstalledIntegrationById(installedAppId as string);

      if (!installed) {
        return HttpResponse.json(
          {
            success: false,
            error: {
              code: "NOT_FOUND",
              message: "Installed integration not found",
            },
          },
          { status: 404 }
        );
      }

      // Update fields
      if (body.name) installed.name = body.name;
      if (body.credentials) installed.credentials = body.credentials;
      installed.updatedAt = new Date().toISOString();

      return HttpResponse.json({
        success: true,
        data: installed,
      });
    }
  ),

  // Delete installed integration
  http.delete(
    `${config.apiBaseUrl}/workspaces/:workspaceId/integrations/installed/:installedAppId`,
    async ({ params }) => {
      await delay(300);

      const { installedAppId } = params;
      const index = installedIntegrations.findIndex(
        (inst) => inst.id === installedAppId
      );

      if (index === -1) {
        return HttpResponse.json(
          {
            success: false,
            error: {
              code: "NOT_FOUND",
              message: "Installed integration not found",
            },
          },
          { status: 404 }
        );
      }

      // Remove from mock data
      installedIntegrations.splice(index, 1);

      return HttpResponse.json({
        success: true,
        data: { message: "Integration uninstalled successfully" },
      });
    }
  ),

  // Test connection
  http.post(
    `${config.apiBaseUrl}/workspaces/:workspaceId/integrations/installed/:installedAppId/test`,
    async ({ params }) => {
      await delay(1000);

      const { installedAppId } = params;
      const installed = getInstalledIntegrationById(installedAppId as string);

      if (!installed) {
        return HttpResponse.json(
          {
            success: false,
            error: {
              code: "NOT_FOUND",
              message: "Installed integration not found",
            },
          },
          { status: 404 }
        );
      }

      // Simulate connection test (always succeeds in mock)
      return HttpResponse.json({
        success: true,
        data: {
          success: true,
          message: "Connection successful",
        },
      });
    }
  ),

  // ============================================================================
  // DYNAMIC OPTIONS
  // ============================================================================

  // Get dynamic options for a property
  http.post(
    `${config.apiBaseUrl}/workspaces/:workspaceId/integrations/:integrationId/dynamic-options`,
    async ({ request }) => {
      await delay(400);

      const body = (await request.json()) as DynamicOptionsRequest;
      const { propertyKey, searchTerm, limit = 50, offset = 0 } = body;

      // Map propertyKey to endpoint (simplified)
      const endpointMap: Record<string, string> = {
        channel: "/integrations/slack/dynamic/channels",
        user: "/integrations/slack/dynamic/users",
        label: "/integrations/gmail/dynamic/labels",
        calendar: "/integrations/google-calendar/dynamic/calendars",
        project: "/integrations/jira/dynamic/projects",
        issue_type: "/integrations/jira/dynamic/issue-types",
        repository: "/integrations/github/dynamic/repositories",
        event_type: "/integrations/calendly/dynamic/event-types",
        table: "/integrations/postgresql/dynamic/tables",
        collection: "/integrations/mongodb/dynamic/collections",
      };

      const endpoint = endpointMap[propertyKey] || "";
      const data = getDynamicOptionsByEndpoint(endpoint, searchTerm);

      // Apply pagination
      const paginated = {
        ...data,
        options: data.options.slice(offset, offset + limit),
        hasMore: offset + limit < (data.total || 0),
      };

      return HttpResponse.json({
        success: true,
        data: paginated,
      });
    }
  ),

  // Get dynamic options for a property (simpler route)
  http.post(
    `${config.apiBaseUrl}/integrations/:integrationId/dynamic/:propertyKey`,
    async ({ params, request }) => {
      await delay(400);

      const { integrationId, propertyKey } = params;
      const body = (await request.json()) as DynamicOptionsRequest;
      const { searchTerm, limit = 50, offset = 0 } = body;

      // Map propertyKey to pluralized endpoint name
      const propertyKeyMap: Record<string, string> = {
        channel: "channels",
        user: "users",
        label: "labels",
        calendar: "calendars",
        project: "projects",
        issue_type: "issue-types",
        status: "statuses",
        transition: "transitions",
        repository: "repositories",
        collaborator: "collaborators",
        branch: "branches",
        event_type: "event-types",
        table: "tables",
        column: "columns",
        collection: "collections",
      };

      const endpointKey = propertyKeyMap[propertyKey as string] || propertyKey;
      const endpoint = `/integrations/${integrationId}/dynamic/${endpointKey}`;
      const data = getDynamicOptionsByEndpoint(endpoint, searchTerm);

      // Apply pagination
      const paginated = {
        ...data,
        options: data.options.slice(offset, offset + limit),
        hasMore: offset + limit < (data.total || 0),
      };

      return HttpResponse.json({
        success: true,
        data: paginated,
      });
    }
  ),

  // ============================================================================
  // TEST ACTION
  // ============================================================================

  // Test action
  http.post(
    `${config.apiBaseUrl}/workspaces/:workspaceId/integrations/test-action`,
    async ({ request }) => {
      await delay(800);

      const body = (await request.json()) as {
        integrationId: string;
        actionKey: string;
        installedAppId: string;
        config: Record<string, unknown>;
      };

      // Validate integration
      const integration = getIntegrationById(body.integrationId);
      if (!integration) {
        return HttpResponse.json(
          {
            success: false,
            error: {
              code: "INVALID_INTEGRATION",
              message: "Integration not found",
            },
          },
          { status: 400 }
        );
      }

      // Validate action
      const action = integration.actions.find((a) => a.key === body.actionKey);
      if (!action) {
        return HttpResponse.json(
          {
            success: false,
            error: {
              code: "INVALID_ACTION",
              message: "Action not found",
            },
          },
          { status: 400 }
        );
      }

      // Validate installed app
      const installed = getInstalledIntegrationById(body.installedAppId);
      if (!installed) {
        return HttpResponse.json(
          {
            success: false,
            error: {
              code: "INVALID_INSTALLED_APP",
              message: "Installed integration not found",
            },
          },
          { status: 400 }
        );
      }

      // Return sample output (simulate successful test)
      return HttpResponse.json({
        success: true,
        data: {
          success: true,
          output: action.sampleOutput,
        },
      });
    }
  ),

  // ============================================================================
  // HELPER ENDPOINTS (for specific integrations)
  // ============================================================================

  // Get installed integrations by integration ID
  http.get(
    `${config.apiBaseUrl}/workspaces/:workspaceId/integrations/:integrationId/installed`,
    async ({ params }) => {
      await delay(200);

      const { workspaceId, integrationId } = params;
      const installed = getInstalledIntegrationsByIntegrationId(
        workspaceId as string,
        integrationId as string
      );

      return HttpResponse.json({
        success: true,
        data: installed,
      });
    }
  ),
];
