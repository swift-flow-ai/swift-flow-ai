import { http, HttpResponse } from 'msw';
import { getApprovalsByWorkspace, getApprovalById } from '../data/approvals';

const BASE_URL = 'http://localhost:3000/api';

export const approvalHandlers = [
  // GET /workspaces/:workspaceId/approvals
  http.get(`${BASE_URL}/workspaces/:workspaceId/approvals`, ({ request }) => {
    const url = new URL(request.url);
    
    // Axios sends params as params[key]=value, so we need to check both formats
    const status = url.searchParams.get('status') || url.searchParams.get('params[status]');
    const priority = url.searchParams.get('priority') || url.searchParams.get('params[priority]');
    
    let approvals = getApprovalsByWorkspace();
    
    if (status) {
      approvals = approvals.filter(a => a.status === status);
    }
    if (priority) {
      approvals = approvals.filter(a => a.priority === priority);
    }
    
    return HttpResponse.json({
      approvals,
      total: approvals.length,
    });
  }),

  // GET /workspaces/:workspaceId/approvals/:approvalId
  http.get(`${BASE_URL}/workspaces/:workspaceId/approvals/:approvalId`, ({ params }) => {
    const { approvalId } = params;
    const approval = getApprovalById(approvalId as string);
    
    if (!approval) {
      return HttpResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Approval not found' } },
        { status: 404 }
      );
    }

    return HttpResponse.json(approval);
  }),

  // POST /workspaces/:workspaceId/approvals/:approvalId/decide
  http.post(`${BASE_URL}/workspaces/:workspaceId/approvals/:approvalId/decide`, async ({ params, request }) => {
    const { approvalId } = params;
    const body = await request.json() as { decision: 'approve' | 'reject'; comment?: string };
    
    return HttpResponse.json({
      approvalId,
      decision: body.decision,
      decidedBy: {
        id: 'usr_current',
        name: 'Current User',
      },
      decidedAt: new Date().toISOString(),
      executionResumed: true,
    });
  }),
];

