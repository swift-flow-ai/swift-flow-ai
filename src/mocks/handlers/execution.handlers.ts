import { http, HttpResponse } from 'msw';
import { getExecutionsByWorkspace, getExecutionById } from '../data/executions';
import { config } from '../../config';

const BASE_URL = config.apiBaseUrl;

export const executionHandlers = [
  // GET /workspaces/:workspaceId/executions
  http.get(`${BASE_URL}/workspaces/:workspaceId/executions`, ({ request }) => {
    const url = new URL(request.url);
    
    // Axios sends params as params[key]=value, so we need to check both formats
    const workflowId = url.searchParams.get('workflowId') || url.searchParams.get('params[workflowId]');
    const status = url.searchParams.get('status') || url.searchParams.get('params[status]');

    console.log('🔷 MSW: GET /workspaces/:workspaceId/executions', {
      workflowId,
      status,
    });

    const executions = getExecutionsByWorkspace(
      workflowId || undefined,
      status || undefined
    );

    return HttpResponse.json({
      executions,
      total: executions.length,
    });
  }),

  // GET /workspaces/:workspaceId/executions/:executionId
  http.get(`${BASE_URL}/workspaces/:workspaceId/executions/:executionId`, ({ params }) => {
    const { executionId } = params;
    console.log('🔷 MSW: GET /workspaces/:workspaceId/executions/:executionId', {
      executionId,
    });

    const execution = getExecutionById(executionId as string);

    if (!execution) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Execution not found',
        },
        { status: 404 }
      );
    }

    return HttpResponse.json(execution);
  }),

  // POST /workspaces/:workspaceId/executions/:executionId/cancel
  http.post(`${BASE_URL}/workspaces/:workspaceId/executions/:executionId/cancel`, ({ params }) => {
    const { executionId } = params;
    console.log('🔷 MSW: POST /workspaces/:workspaceId/executions/:executionId/cancel', {
      executionId,
    });

    const execution = getExecutionById(executionId as string);

    if (!execution) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Execution not found',
        },
        { status: 404 }
      );
    }

    // Update execution status to cancelled
    const updatedExecution = {
      ...execution,
      status: 'cancelled' as const,
      completedAt: new Date().toISOString(),
    };

    return HttpResponse.json(updatedExecution);
  }),

  // POST /workspaces/:workspaceId/executions/:executionId/retry
  http.post(`${BASE_URL}/workspaces/:workspaceId/executions/:executionId/retry`, ({ params }) => {
    const { executionId } = params;
    console.log('🔷 MSW: POST /workspaces/:workspaceId/executions/:executionId/retry', {
      executionId,
    });

    const execution = getExecutionById(executionId as string);

    if (!execution) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Execution not found',
        },
        { status: 404 }
      );
    }

    // Create new execution ID
    const newExecutionId = `exec_${Date.now()}`;

    return HttpResponse.json({
      newExecutionId,
      status: 'queued',
    });
  }),

  // POST /workspaces/:workspaceId/workflows/:workflowId/execute
  http.post(`${BASE_URL}/workspaces/:workspaceId/workflows/:workflowId/execute`, async ({ request, params }) => {
    const { workflowId } = params;
    const body = await request.json();
    
    console.log('🔷 MSW: POST /workspaces/:workspaceId/workflows/:workflowId/execute', {
      workflowId,
      body,
    });

    const executionId = `exec_${Date.now()}`;

    return HttpResponse.json({
      executionId,
      status: 'queued',
      message: 'Workflow execution started',
    });
  }),
];

