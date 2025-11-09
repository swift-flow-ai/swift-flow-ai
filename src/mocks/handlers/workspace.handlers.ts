import { http, HttpResponse } from "msw";
import { mockWorkspaces, getMockDashboard } from "../data/workspaces";
import { mockTeamMembers } from "../data/team";

const BASE_URL = "http://localhost:3000/api";

export const workspaceHandlers = [
  // GET /workspaces
  http.get(`${BASE_URL}/workspaces`, () => {
    return HttpResponse.json({
      workspaces: mockWorkspaces,
    });
  }),

  // GET /workspaces/:workspaceId
  http.get(`${BASE_URL}/workspaces/:workspaceId`, ({ params }) => {
    const { workspaceId } = params;
    const workspace = mockWorkspaces.find((w) => w.id === workspaceId);

    if (!workspace) {
      return HttpResponse.json(
        { error: { code: "NOT_FOUND", message: "Workspace not found" } },
        { status: 404 }
      );
    }

    // Include team members with workspace
    return HttpResponse.json({
      ...workspace,
      members: mockTeamMembers,
    });
  }),

  // GET /workspaces/:workspaceId/dashboard
  http.get(`${BASE_URL}/workspaces/:workspaceId/dashboard`, () => {
    const dashboard = getMockDashboard();

    return HttpResponse.json(dashboard);
  }),

  // POST /workspaces
  http.post(`${BASE_URL}/workspaces`, async ({ request }) => {
    const body = (await request.json()) as {
      name: string;
      slug: string;
      industry?: string;
    };

    const newWorkspace = {
      id: `ws_${Date.now()}`,
      name: body.name,
      slug: body.slug,
      logo: null,
      role: "owner" as const,
      memberCount: 1,
      activeWorkflows: 0,
      pendingApprovals: 0,
      unreadNotifications: 0,
      lastActiveAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    return HttpResponse.json(newWorkspace, { status: 201 });
  }),
];
