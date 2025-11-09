import { http, HttpResponse } from 'msw';
import { mockTeamMembers } from '../data/team';
import { mockTeamPools } from '../data/pools';
import { config } from '../../config';

const apiUrl = config.apiBaseUrl;

export const teamHandlers = [
  // Get team members
  http.get(`${apiUrl}/workspaces/:workspaceId/members`, ({ params }) => {
    console.log('🔷 MSW: GET /workspaces/:workspaceId/members', params);
    
    return HttpResponse.json({
      members: mockTeamMembers,
    });
  }),

  // Get team pools
  http.get(`${apiUrl}/workspaces/:workspaceId/pools`, ({ params }) => {
    console.log('🔷 MSW: GET /workspaces/:workspaceId/pools', params);
    
    // Populate members for each pool
    const poolsWithMembers = mockTeamPools.map(pool => ({
      ...pool,
      members: mockTeamMembers.filter(m => pool.memberIds.includes(m.id)),
    }));
    
    return HttpResponse.json({
      pools: poolsWithMembers,
    });
  }),

  // Get single pool
  http.get(`${apiUrl}/workspaces/:workspaceId/pools/:poolId`, ({ params }) => {
    const { poolId } = params;
    console.log('🔷 MSW: GET /workspaces/:workspaceId/pools/:poolId', { poolId });
    
    const pool = mockTeamPools.find(p => p.id === poolId);
    
    if (!pool) {
      return HttpResponse.json(
        { error: 'Pool not found' },
        { status: 404 }
      );
    }
    
    const poolWithMembers = {
      ...pool,
      members: mockTeamMembers.filter(m => pool.memberIds.includes(m.id)),
    };
    
    return HttpResponse.json(poolWithMembers);
  }),

  // Create pool
  http.post(`${apiUrl}/workspaces/:workspaceId/pools`, async ({ request, params }) => {
    const body = await request.json() as any;
    console.log('🔷 MSW: POST /workspaces/:workspaceId/pools', { body });
    
    const newPool = {
      id: `pool_${Date.now()}`,
      name: body.name,
      description: body.description,
      type: body.type || 'custom',
      color: body.color || '#6b7280',
      icon: body.icon || '👥',
      memberIds: body.memberIds || [],
      settings: {
        autoAssignment: body.settings?.autoAssignment ?? false,
        roundRobin: body.settings?.roundRobin ?? false,
        loadBalancing: body.settings?.loadBalancing ?? false,
        notifyOnAssignment: body.settings?.notifyOnAssignment ?? true,
      },
      stats: {
        activeMembers: body.memberIds?.length || 0,
        totalAssignments: 0,
        avgResponseTime: 'N/A',
        currentLoad: 0,
      },
      createdBy: {
        id: 'usr_john',
        name: 'John Smith',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mockTeamPools.push(newPool);
    
    return HttpResponse.json({
      pool: newPool,
    }, { status: 201 });
  }),

  // Update pool
  http.patch(`${apiUrl}/workspaces/:workspaceId/pools/:poolId`, async ({ request, params }) => {
    const { poolId } = params;
    const body = await request.json() as any;
    console.log('🔷 MSW: PATCH /workspaces/:workspaceId/pools/:poolId', { poolId, body });
    
    const poolIndex = mockTeamPools.findIndex(p => p.id === poolId);
    
    if (poolIndex === -1) {
      return HttpResponse.json(
        { error: 'Pool not found' },
        { status: 404 }
      );
    }
    
    const updatedPool = {
      ...mockTeamPools[poolIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    mockTeamPools[poolIndex] = updatedPool;
    
    return HttpResponse.json({
      pool: updatedPool,
    });
  }),

  // Delete pool
  http.delete(`${apiUrl}/workspaces/:workspaceId/pools/:poolId`, ({ params }) => {
    const { poolId } = params;
    console.log('🔷 MSW: DELETE /workspaces/:workspaceId/pools/:poolId', { poolId });
    
    const poolIndex = mockTeamPools.findIndex(p => p.id === poolId);
    
    if (poolIndex === -1) {
      return HttpResponse.json(
        { error: 'Pool not found' },
        { status: 404 }
      );
    }
    
    mockTeamPools.splice(poolIndex, 1);
    
    return HttpResponse.json(null, { status: 204 });
  }),

  // Add members to pool
  http.post(`${apiUrl}/workspaces/:workspaceId/pools/:poolId/members`, async ({ request, params }) => {
    const { poolId } = params;
    const body = await request.json() as any;
    console.log('🔷 MSW: POST /workspaces/:workspaceId/pools/:poolId/members', { poolId, body });
    
    const pool = mockTeamPools.find(p => p.id === poolId);
    
    if (!pool) {
      return HttpResponse.json(
        { error: 'Pool not found' },
        { status: 404 }
      );
    }
    
    const memberIds = body.memberIds || [];
    pool.memberIds = [...new Set([...pool.memberIds, ...memberIds])];
    pool.stats.activeMembers = pool.memberIds.length;
    pool.updatedAt = new Date().toISOString();
    
    // Update members' poolIds
    memberIds.forEach((memberId: string) => {
      const member = mockTeamMembers.find(m => m.id === memberId);
      if (member) {
        member.poolIds = member.poolIds || [];
        if (!member.poolIds.includes(poolId as string)) {
          member.poolIds.push(poolId as string);
        }
      }
    });
    
    return HttpResponse.json({
      pool,
      addedCount: memberIds.length,
    });
  }),

  // Remove member from pool
  http.delete(`${apiUrl}/workspaces/:workspaceId/pools/:poolId/members/:memberId`, ({ params }) => {
    const { poolId, memberId } = params;
    console.log('🔷 MSW: DELETE /workspaces/:workspaceId/pools/:poolId/members/:memberId', { poolId, memberId });
    
    const pool = mockTeamPools.find(p => p.id === poolId);
    
    if (!pool) {
      return HttpResponse.json(
        { error: 'Pool not found' },
        { status: 404 }
      );
    }
    
    pool.memberIds = pool.memberIds.filter(id => id !== memberId);
    pool.stats.activeMembers = pool.memberIds.length;
    pool.updatedAt = new Date().toISOString();
    
    // Update member's poolIds
    const member = mockTeamMembers.find(m => m.id === memberId);
    if (member && member.poolIds) {
      member.poolIds = member.poolIds.filter(id => id !== poolId);
    }
    
    return HttpResponse.json(null, { status: 204 });
  }),

  // Invite member
  http.post(`${apiUrl}/workspaces/:workspaceId/members/invite`, async ({ request, params }) => {
    const body = await request.json() as any;
    console.log('🔷 MSW: POST /workspaces/:workspaceId/members/invite', { body });
    
    const newMember = {
      id: `usr_${Date.now()}`,
      name: body.name || body.email.split('@')[0],
      email: body.email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${body.email}`,
      role: body.role || 'viewer',
      status: 'invited' as const,
      stats: {
        workflowsCreated: 0,
        approvalsHandled: 0,
        avgApprovalTime: 'N/A',
      },
      joinedAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
      poolIds: body.poolIds || [],
    };
    
    mockTeamMembers.push(newMember);
    
    return HttpResponse.json({
      member: newMember,
      inviteLink: `https://app.swiftflow.ai/invite/${newMember.id}`,
    }, { status: 201 });
  }),

  // Update member
  http.patch(`${apiUrl}/workspaces/:workspaceId/members/:memberId`, async ({ request, params }) => {
    const { memberId } = params;
    const body = await request.json() as any;
    console.log('🔷 MSW: PATCH /workspaces/:workspaceId/members/:memberId', { memberId, body });
    
    const memberIndex = mockTeamMembers.findIndex(m => m.id === memberId);
    
    if (memberIndex === -1) {
      return HttpResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      );
    }
    
    mockTeamMembers[memberIndex] = {
      ...mockTeamMembers[memberIndex],
      ...body,
    };
    
    return HttpResponse.json({
      member: mockTeamMembers[memberIndex],
    });
  }),

  // Remove member
  http.delete(`${apiUrl}/workspaces/:workspaceId/members/:memberId`, ({ params }) => {
    const { memberId } = params;
    console.log('🔷 MSW: DELETE /workspaces/:workspaceId/members/:memberId', { memberId });
    
    const memberIndex = mockTeamMembers.findIndex(m => m.id === memberId);
    
    if (memberIndex === -1) {
      return HttpResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      );
    }
    
    // Remove member from all pools
    const member = mockTeamMembers[memberIndex];
    if (member.poolIds) {
      member.poolIds.forEach(poolId => {
        const pool = mockTeamPools.find(p => p.id === poolId);
        if (pool) {
          pool.memberIds = pool.memberIds.filter(id => id !== memberId);
          pool.stats.activeMembers = pool.memberIds.length;
        }
      });
    }
    
    mockTeamMembers.splice(memberIndex, 1);
    
    return HttpResponse.json(null, { status: 204 });
  }),
];

