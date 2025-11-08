import { http, HttpResponse, delay } from 'msw';
import { config } from '../../config';
import { mockWorkspaces } from '../data/workspaces';
import type { Workspace } from '../../types/workspace';

// In-memory workspace storage (extends mock data)
const workspaces: Workspace[] = [...mockWorkspaces];

export const workspaceManagementHandlers = [
  // POST /api/workspaces - Create new workspace
  http.post(`${config.apiBaseUrl}/workspaces`, async ({ request }) => {
    await delay(1000);

    const body = await request.json() as { name: string; slug: string };
    const { name, slug } = body;

    // Validate input
    if (!name || !slug) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Name and slug are required',
          data: null,
        },
        { status: 400 }
      );
    }

    // Check if slug already exists
    if (workspaces.some(w => w.slug === slug)) {
      return HttpResponse.json(
        {
          success: false,
          message: 'A workspace with this URL already exists',
          data: null,
        },
        { status: 409 }
      );
    }

    // Create new workspace
    const newWorkspace: Workspace = {
      id: `ws_${Math.random().toString(36).substr(2, 9)}`,
      name,
      slug,
      logo: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
      role: 'admin',
      memberCount: 1,
      activeWorkflows: 0,
      pendingApprovals: 0,
      unreadNotifications: 0,
      lastActiveAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    workspaces.push(newWorkspace);

    return HttpResponse.json(
      {
        success: true,
        message: 'Workspace created successfully',
        data: { workspace: newWorkspace },
      },
      { status: 201 }
    );
  }),

  // POST /api/workspaces/:workspaceId/invites - Send team invites
  http.post(`${config.apiBaseUrl}/workspaces/:workspaceId/invites`, async ({ params, request }) => {
    await delay(1500);

    const { workspaceId } = params;
    const body = await request.json() as {
      invites: Array<{ email: string; role: string }>;
    };

    // Validate workspace exists
    const workspace = workspaces.find(w => w.id === workspaceId);
    if (!workspace) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Workspace not found',
          data: null,
        },
        { status: 404 }
      );
    }

    // Validate invites
    if (!body.invites || !Array.isArray(body.invites) || body.invites.length === 0) {
      return HttpResponse.json(
        {
          success: false,
          message: 'No invites provided',
          data: null,
        },
        { status: 400 }
      );
    }

    // In a real app, this would:
    // 1. Create invite records in the database
    // 2. Send email invitations
    // 3. Generate invitation tokens
    
    // For mock, just return success
    const invitedEmails = body.invites.map(inv => inv.email);

    return HttpResponse.json(
      {
        success: true,
        message: `${invitedEmails.length} invitation${invitedEmails.length !== 1 ? 's' : ''} sent successfully`,
        data: {
          invitedEmails,
          invitesSent: invitedEmails.length,
        },
      },
      { status: 200 }
    );
  }),

  // GET /api/workspaces/:workspaceId/members - Get workspace members
  http.get(`${config.apiBaseUrl}/workspaces/:workspaceId/members`, async ({ params }) => {
    await delay(500);

    const { workspaceId } = params;

    const workspace = workspaces.find(w => w.id === workspaceId);
    if (!workspace) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Workspace not found',
          data: null,
        },
        { status: 404 }
      );
    }

    // Mock members data
    const members = [
      {
        id: '1',
        name: 'You',
        email: 'you@example.com',
        role: workspace.role,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
        joinedAt: workspace.createdAt,
      },
    ];

    return HttpResponse.json(
      {
        success: true,
        message: 'Members fetched successfully',
        data: { members, total: members.length },
      },
      { status: 200 }
    );
  }),
];

