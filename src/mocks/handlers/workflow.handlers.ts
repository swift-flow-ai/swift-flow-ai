import { http, HttpResponse } from 'msw';
import { getWorkflowsByWorkspace, getWorkflowById } from '../data/workflows';
import { config } from '../../config';

const BASE_URL = config.apiBaseUrl;

export const workflowHandlers = [
  // GET /workspaces/:workspaceId/workflows
  http.get(`${BASE_URL}/workspaces/:workspaceId/workflows`, ({ request, params }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const category = url.searchParams.get('category');
    const search = url.searchParams.get('search');
    
    console.log('🔷 MSW INTERCEPTED: GET /workspaces/:workspaceId/workflows');
    console.log('🔷 Request URL:', url.toString());
    console.log('🔷 Params:', params);
    console.log('🔷 Query params:', { status, category, search });
    console.log('🔷 BASE_URL:', BASE_URL);
    
    let workflows = getWorkflowsByWorkspace();
    const totalWorkflows = workflows.length;
    
    console.log(`🔷 Total workflows before filtering: ${totalWorkflows}`);
    
    // Apply filters
    if (status && status !== 'all') {
      const beforeFilter = workflows.length;
      workflows = workflows.filter(w => w.status === status);
      console.log(`🔷 Filtered by status="${status}": ${beforeFilter} → ${workflows.length} workflows`);
      console.log(`🔷 Filtered workflows:`, workflows.map(w => ({ name: w.name, status: w.status })));
    }
    if (category) {
      workflows = workflows.filter(w => w.category === category);
      console.log(`🔷 Filtered by category="${category}": ${workflows.length} workflows`);
    }
    if (search) {
      const searchLower = search.toLowerCase();
      workflows = workflows.filter(w => 
        w.name.toLowerCase().includes(searchLower) ||
        w.description.toLowerCase().includes(searchLower)
      );
      console.log(`🔷 Filtered by search="${search}": ${workflows.length} workflows`);
    }
    
    console.log(`🔷 FINAL RESULT: Returning ${workflows.length} of ${totalWorkflows} workflows`);
    
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

