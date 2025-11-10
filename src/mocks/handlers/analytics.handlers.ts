import { http, HttpResponse } from 'msw';
import { getWorkspaceAnalytics } from '../data/analytics';
import { config } from '../../config';

const BASE_URL = config.apiBaseUrl;

export const analyticsHandlers = [
  // GET /workspaces/:workspaceId/analytics/overview
  http.get(`${BASE_URL}/workspaces/:workspaceId/analytics/overview`, ({ request }) => {
    const url = new URL(request.url);
    const period = url.searchParams.get('period') || url.searchParams.get('params[period]') || '30d';

    console.log('🔷 MSW: GET /workspaces/:workspaceId/analytics/overview', {
      period,
    });

    const analytics = getWorkspaceAnalytics();

    return HttpResponse.json({
      ...analytics,
      period,
    });
  }),

  // GET /workspaces/:workspaceId/analytics/workflows/:workflowId
  http.get(`${BASE_URL}/workspaces/:workspaceId/analytics/workflows/:workflowId`, ({ params, request }) => {
    const { workflowId } = params;
    const url = new URL(request.url);
    const period = url.searchParams.get('period') || url.searchParams.get('params[period]') || '30d';

    console.log('🔷 MSW: GET /workspaces/:workspaceId/analytics/workflows/:workflowId', {
      workflowId,
      period,
    });

    // Mock workflow-specific analytics
    return HttpResponse.json({
      workflowId,
      period,
      overview: {
        totalExecutions: 127,
        avgDuration: '8.5 days',
        successRate: 92.1,
        costPerRun: 12.5,
        timeSaved: '18h per run',
      },
      timeline: [],
      bottlenecks: [],
      nodePerformance: [],
      aiRecommendations: [],
    });
  }),
];

