import { http, HttpResponse } from 'msw';
import { getWorkflowsByWorkspace, getWorkflowById } from '../data/workflows';

const BASE_URL = 'http://localhost:3000/api';

export const workflowHandlers = [
  // GET /workspaces/:workspaceId/workflows
  http.get(`${BASE_URL}/workspaces/:workspaceId/workflows`, ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const category = url.searchParams.get('category');
    const search = url.searchParams.get('search');
    
    let workflows = getWorkflowsByWorkspace();
    
    // Apply filters
    if (status) {
      workflows = workflows.filter(w => w.status === status);
    }
    if (category) {
      workflows = workflows.filter(w => w.category === category);
    }
    if (search) {
      const searchLower = search.toLowerCase();
      workflows = workflows.filter(w => 
        w.name.toLowerCase().includes(searchLower) ||
        w.description.toLowerCase().includes(searchLower)
      );
    }
    
    return HttpResponse.json({
      workflows,
      total: workflows.length,
    });
  }),

  // GET /workspaces/:workspaceId/workflows/:workflowId
  http.get(`${BASE_URL}/workspaces/:workspaceId/workflows/:workflowId`, ({ params }) => {
    const { workflowId } = params;
    const workflow = getWorkflowById(workflowId as string);
    
    if (!workflow) {
      return HttpResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Workflow not found' } },
        { status: 404 }
      );
    }

    return HttpResponse.json(workflow);
  }),

  // POST /workspaces/:workspaceId/workflows/:workflowId/execute
  http.post(`${BASE_URL}/workspaces/:workspaceId/workflows/:workflowId/execute`, async () => {
    
    return HttpResponse.json({
      executionId: `exec_${Date.now()}`,
      status: 'running',
      startedAt: new Date().toISOString(),
      estimatedDuration: '8.5 days',
    }, { status: 201 });
  }),
];

