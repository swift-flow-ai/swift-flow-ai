import { http, HttpResponse } from "msw";
import { mockWorkspaces, getMockHome, mockWorkspaceMembers } from "../data/workspaces";
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

  // GET /workspaces/:workspaceId/home
  http.get(`${BASE_URL}/workspaces/:workspaceId/home`, () => {
    const home = getMockHome();

    return HttpResponse.json(home);
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

  // PATCH /workspaces/:workspaceId - Update workspace settings
  http.patch(`${BASE_URL}/workspaces/:workspaceId`, async ({ request, params }) => {
    const { workspaceId } = params;
    const body = await request.json() as {
      name?: string;
      slug?: string;
      color?: string;
      description?: string;
    };
    
    console.log('🔷 MSW: PATCH /workspaces/:workspaceId', { workspaceId, body });
    
    const workspace = mockWorkspaces.find(w => w.id === workspaceId);
    
    if (!workspace) {
      return HttpResponse.json(
        { error: { code: "NOT_FOUND", message: "Workspace not found" } },
        { status: 404 }
      );
    }

    // Update workspace properties
    if (body.name) workspace.name = body.name;
    if (body.slug) workspace.slug = body.slug;
    if (body.color) workspace.color = body.color;
    if (body.description) workspace.description = body.description;

    return HttpResponse.json({
      success: true,
      workspace: workspace,
    });
  }),

  // GET /workspaces/:workspaceId/members - Get workspace members
  http.get(`${BASE_URL}/workspaces/:workspaceId/members`, ({ params }) => {
    const { workspaceId } = params;
    console.log('🔷 MSW: GET /workspaces/:workspaceId/members', { workspaceId });
    
    return HttpResponse.json({
      members: mockWorkspaceMembers,
    });
  }),

  // GET /workspaces/:workspaceId/invites - Get pending invites
  http.get(`${BASE_URL}/workspaces/:workspaceId/invites`, ({ params }) => {
    const { workspaceId } = params;
    console.log('🔷 MSW: GET /workspaces/:workspaceId/invites', { workspaceId });
    
    // Mock pending invites
    const pendingInvites = [
      {
        id: 'invite_1',
        email: 'newuser@example.com',
        role: 'member',
        invitedBy: {
          id: 'usr_admin',
          name: 'Admin User'
        },
        invitedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        expiresAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days from now
      },
      {
        id: 'invite_2', 
        email: 'contractor@freelance.com',
        role: 'viewer',
        invitedBy: {
          id: 'usr_admin',
          name: 'Admin User'
        },
        invitedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
        expiresAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + 21 * 60 * 60 * 1000).toISOString(), // ~7 days from now
      }
    ];

    return HttpResponse.json({
      invites: pendingInvites,
    });
  }),

  // POST /workspaces/:workspaceId/invites - Send member invitation
  http.post(`${BASE_URL}/workspaces/:workspaceId/invites`, async ({ request, params }) => {
    const { workspaceId } = params;
    const body = await request.json() as {
      email: string;
      role: string;
    };
    
    console.log('🔷 MSW: POST /workspaces/:workspaceId/invites', { workspaceId, body });
    
    const newInvite = {
      id: `invite_${Date.now()}`,
      email: body.email,
      role: body.role,
      invitedBy: {
        id: 'usr_admin',
        name: 'Admin User'
      },
      invitedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    };

    return HttpResponse.json({
      success: true,
      invite: newInvite,
    }, { status: 201 });
  }),

  // DELETE /workspaces/:workspaceId/invites/:inviteId - Cancel invitation
  http.delete(`${BASE_URL}/workspaces/:workspaceId/invites/:inviteId`, ({ params }) => {
    const { workspaceId, inviteId } = params;
    console.log('🔷 MSW: DELETE /workspaces/:workspaceId/invites/:inviteId', { workspaceId, inviteId });
    
    return HttpResponse.json({
      success: true,
    }, { status: 204 });
  }),

  // DELETE /workspaces/:workspaceId/members/:memberId - Remove member
  http.delete(`${BASE_URL}/workspaces/:workspaceId/members/:memberId`, ({ params }) => {
    const { workspaceId, memberId } = params;
    console.log('🔷 MSW: DELETE /workspaces/:workspaceId/members/:memberId', { workspaceId, memberId });
    
    const memberIndex = mockWorkspaceMembers.findIndex(m => m.id === memberId);
    
    if (memberIndex === -1) {
      return HttpResponse.json(
        { error: { code: "NOT_FOUND", message: "Member not found" } },
        { status: 404 }
      );
    }

    // Remove member from mock data
    mockWorkspaceMembers.splice(memberIndex, 1);
    
    return HttpResponse.json({
      success: true,
    }, { status: 204 });
  }),
];
