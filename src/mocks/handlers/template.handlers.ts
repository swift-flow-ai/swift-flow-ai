import { http, HttpResponse } from 'msw';
import { getTemplates, getTemplateById } from '../data/templates';
import { config } from '../../config';

const BASE_URL = config.apiBaseUrl;

export const templateHandlers = [
  // GET /templates
  http.get(`${BASE_URL}/templates`, ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const featured = url.searchParams.get('featured');
    const search = url.searchParams.get('search');

    console.log('🔷 MSW: GET /templates', {
      category,
      featured,
      search,
    });

    const templates = getTemplates(
      category || undefined,
      featured === 'true' ? true : undefined,
      search || undefined
    );

    return HttpResponse.json({
      templates,
      total: templates.length,
    });
  }),

  // GET /templates/:templateId
  http.get(`${BASE_URL}/templates/:templateId`, ({ params }) => {
    const { templateId } = params;
    console.log('🔷 MSW: GET /templates/:templateId', { templateId });

    const template = getTemplateById(templateId as string);

    if (!template) {
      return HttpResponse.json(
        {
          success: false,
          message: 'Template not found',
        },
        { status: 404 }
      );
    }

    return HttpResponse.json(template);
  }),

  // POST /workspaces/:workspaceId/workflows/from-template/:templateId
  http.post(
    `${BASE_URL}/workspaces/:workspaceId/workflows/from-template/:templateId`,
    async ({ params, request }) => {
      const { workspaceId, templateId } = params;
      const body = await request.json();

      console.log('🔷 MSW: POST /workspaces/:workspaceId/workflows/from-template/:templateId', {
        workspaceId,
        templateId,
        body,
      });

      const workflowId = `wf_${Date.now()}`;

      return HttpResponse.json({
        success: true,
        workflowId,
        message: 'Workflow created from template successfully',
      });
    }
  ),

  // POST /workspaces/:workspaceId/workflows/:workflowId/save-as-template
  http.post(
    `${BASE_URL}/workspaces/:workspaceId/workflows/:workflowId/save-as-template`,
    async ({ params, request }) => {
      const { workspaceId, workflowId } = params;
      const body = await request.json();

      console.log('🔷 MSW: POST /workspaces/:workspaceId/workflows/:workflowId/save-as-template', {
        workspaceId,
        workflowId,
        body,
      });

      const templateId = `tpl_${Date.now()}`;

      return HttpResponse.json({
        success: true,
        templateId,
        message: 'Workflow saved as template successfully',
      });
    }
  ),
];

