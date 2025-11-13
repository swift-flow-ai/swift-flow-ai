import { http, HttpResponse } from 'msw';
import { getApprovalsByWorkspace } from '../data/approvals';
import type { InboxItem, InboxResponse } from '../../services/inbox.service';
import type { Approval } from '../../types/workspace';

const BASE_URL = 'http://localhost:3000/api';

// Transform approval to inbox item
function approvalToInboxItem(approval: Approval): InboxItem {
  return {
    id: approval.id,
    type: 'approval',
    title: approval.title,
    description: approval.description,
    priority: approval.priority,
    read: false,
    createdAt: approval.createdAt,
    dueAt: approval.sla?.dueAt,
    workflowName: approval.workflowName,
    workflowId: approval.executionId,
    executionId: approval.executionId,
    submittedBy: approval.submittedBy,
    approval,
    actionUrl: `/app/inbox/${approval.id}`,
  };
}

// Mock additional inbox items with realistic metadata
function generateMockItems(count: number): InboxItem[] {
  const types: InboxItem['type'][] = ['task', 'notification', 'workflow_error', 'workflow_success', 'comment', 'alert'];
  const priorities: InboxItem['priority'][] = ['low', 'medium', 'high', 'critical'];
  
  // Use execution IDs that exist in mock data
  const validExecutionIds = ['exec_001', 'exec_002', 'exec_003', 'exec_004', 'exec_005', 'exec_006'];
  
  return Array.from({ length: count }, (_, i) => {
    const type = types[i % types.length];
    const priority = priorities[i % priorities.length];
    const createdAt = new Date(Date.now() - i * 60 * 60 * 1000).toISOString();
    const executionId = validExecutionIds[i % validExecutionIds.length];
    const workflowName = `Workflow ${i % 10}`;
    const workflowId = `wf-${i % 10}`;
    
    // Generate type-specific metadata
    let metadata: Record<string, unknown> = {};
    
    if (type === 'task') {
      metadata = {
        steps: [
          { id: 'step-1', name: 'Review requirements', completed: i % 2 === 0 },
          { id: 'step-2', name: 'Implement solution', completed: false },
          { id: 'step-3', name: 'Test and verify', completed: false },
        ],
        category: ['Development', 'Design', 'Review', 'Testing'][i % 4],
        estimatedTime: `${(i % 4 + 1) * 30} minutes`,
        attachments: i % 3 === 0 ? [
          { name: 'requirements.pdf', url: '#', type: 'PDF' },
          { name: 'design-mockup.png', url: '#', type: 'Image' },
        ] : undefined,
      };
    } else if (type === 'workflow_error') {
      metadata = {
        error: {
          message: `Error occurred in step ${i % 5 + 1}: Connection timeout`,
          type: 'ConnectionError',
          code: 'ERR_TIMEOUT',
          nodeId: `node-${i % 10}`,
          nodeName: `Step ${i % 5 + 1}`,
          stack: `Error: Connection timeout\n    at Step.execute (workflow.js:${i + 10}:5)\n    at Workflow.run (workflow.js:${i + 20}:10)`,
        },
        retryable: i % 2 === 0,
        retryCount: i % 2 === 0 ? Math.floor(i / 2) : undefined,
        maxRetries: i % 2 === 0 ? 3 : undefined,
      };
    } else if (type === 'workflow_success') {
      metadata = {
        duration: (i % 10 + 1) * 1000,
        stepsExecuted: 5,
        totalSteps: 5,
        outputData: {
          result: 'Success',
          recordsProcessed: (i % 10 + 1) * 100,
          timestamp: createdAt,
        },
        performance: {
          avgStepTime: (i % 5 + 1) * 200,
          slowestStep: `Step ${i % 5 + 1}`,
        },
      };
    } else if (type === 'notification') {
      metadata = {
        category: ['System', 'Workflow', 'Team', 'Integration'][i % 4],
        actionUrl: `/app/executions/${executionId}`,
        actionLabel: 'View Details',
        richContent: {
          markdown: `This is a detailed notification about **${workflowName}**.\n\nIt contains important information that requires your attention.`,
        },
        relatedItems: [
          { id: executionId, type: 'execution', title: `Execution ${executionId}` },
        ],
      };
    } else if (type === 'alert') {
      metadata = {
        category: 'Security',
        severity: ['low', 'medium', 'high'][i % 3],
        actionUrl: `/app/workflows/${workflowId}`,
        actionLabel: 'Review Workflow',
      };
    }
    
    return {
      id: `mock-${type}-${i}`,
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')} ${i + 1}`,
      description: type === 'task' 
        ? `Complete the task: ${metadata.steps ? (metadata.steps as Array<{name: string}>)[0].name : 'Task item'}`
        : type === 'workflow_error'
        ? `Workflow execution failed: ${(metadata.error as {message?: string})?.message || 'Unknown error'}`
        : type === 'workflow_success'
        ? `Workflow completed successfully in ${(metadata.duration as number) / 1000}s`
        : `This is a ${type} item number ${i + 1}`,
      priority,
      read: i % 3 === 0,
      createdAt,
      dueAt: type === 'task' || type === 'approval' 
        ? new Date(Date.now() + (i % 5 + 1) * 60 * 60 * 1000).toISOString()
        : undefined,
      workflowName,
      workflowId,
      executionId,
      submittedBy: { name: `User ${i % 5}`, avatar: undefined },
      actionUrl: `/app/inbox/mock-${type}-${i}`,
      metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
    };
  });
}

export const inboxHandlers = [
  // GET /workspaces/:workspaceId/inbox
  http.get(`${BASE_URL}/workspaces/:workspaceId/inbox`, ({ request }) => {
    const url = new URL(request.url);
    
    // Parse query params
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '50', 10);
    const search = url.searchParams.get('search') || '';
    const filter = url.searchParams.get('filter') || 'all';
    const sortBy = url.searchParams.get('sortBy') || 'newest';
    
    // Get approvals
    const approvals = getApprovalsByWorkspace();
    const approvalItems = approvals.map(approvalToInboxItem);
    
    // Generate mock items (in production, these would come from other services)
    const mockItems = generateMockItems(200); // Generate 200 mock items for testing
    
    // Combine all items
    let allItems = [...approvalItems, ...mockItems];
    
    // Apply search filter
    if (search) {
      const query = search.toLowerCase();
      allItems = allItems.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.workflowName?.toLowerCase().includes(query) ||
        item.submittedBy?.name.toLowerCase().includes(query)
      );
    }
    
    // Apply type filter
    if (filter === 'unread') {
      allItems = allItems.filter(item => !item.read);
    } else if (filter === 'actionable') {
      allItems = allItems.filter(item => 
        item.type === 'approval' || 
        item.type === 'task' || 
        item.type === 'workflow_error'
      );
    }
    
    // Sort
    allItems.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortBy === 'priority') {
        const priorityOrder = { critical: 1, high: 2, medium: 3, low: 4 };
        const aPriority = priorityOrder[a.priority];
        const bPriority = priorityOrder[b.priority];
        if (aPriority !== bPriority) {
          return aPriority - bPriority;
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'dueDate') {
        const aDue = a.dueAt ? new Date(a.dueAt).getTime() : Infinity;
        const bDue = b.dueAt ? new Date(b.dueAt).getTime() : Infinity;
        return aDue - bDue;
      }
      return 0;
    });
    
    // Paginate
    const total = allItems.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = allItems.slice(startIndex, endIndex);
    
    const response: InboxResponse = {
      items: paginatedItems,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
      stats: {
        total: allItems.length,
        unread: allItems.filter(item => !item.read).length,
        actionable: allItems.filter(item => 
          item.type === 'approval' || item.type === 'task' || item.type === 'workflow_error'
        ).length,
      },
    };
    
    return HttpResponse.json(response);
  }),

  // POST /workspaces/:workspaceId/inbox/mark-read
  http.post(`${BASE_URL}/workspaces/:workspaceId/inbox/mark-read`, async ({ request }) => {
    const body = await request.json() as { itemIds: string[] };
    
    return HttpResponse.json({
      success: true,
      markedCount: body.itemIds.length,
    });
  }),

  // POST /workspaces/:workspaceId/inbox/mark-all-read
  http.post(`${BASE_URL}/workspaces/:workspaceId/inbox/mark-all-read`, () => {
    return HttpResponse.json({
      success: true,
    });
  }),

  // GET /workspaces/:workspaceId/inbox/stats
  http.get(`${BASE_URL}/workspaces/:workspaceId/inbox/stats`, () => {
    const approvals = getApprovalsByWorkspace();
    const approvalItems = approvals.map(approvalToInboxItem);
    const mockItems = generateMockItems(200);
    const allItems = [...approvalItems, ...mockItems];
    
    return HttpResponse.json({
      total: allItems.length,
      unread: allItems.filter(item => !item.read).length,
      actionable: allItems.filter(item => 
        item.type === 'approval' || item.type === 'task' || item.type === 'workflow_error'
      ).length,
    });
  }),

  // GET /workspaces/:workspaceId/inbox/:itemId
  http.get(`${BASE_URL}/workspaces/:workspaceId/inbox/:itemId`, ({ params }) => {
    const { itemId } = params;
    
    // Check if it's an approval ID (starts with 'apr_')
    const itemIdStr = Array.isArray(itemId) ? itemId[0] : itemId;
    if (itemIdStr && typeof itemIdStr === 'string' && itemIdStr.startsWith('apr_')) {
      const approvals = getApprovalsByWorkspace();
      const approval = approvals.find(a => a.id === itemIdStr);
      if (approval) {
        return HttpResponse.json(approvalToInboxItem(approval));
      }
    }
    
    // Check mock items
    const mockItems = generateMockItems(200);
    const mockItem = mockItems.find(item => item.id === itemIdStr);
    if (mockItem) {
      return HttpResponse.json(mockItem);
    }
    
    // Not found
    return HttpResponse.json(
      { error: 'Inbox item not found' },
      { status: 404 }
    );
  }),
];

