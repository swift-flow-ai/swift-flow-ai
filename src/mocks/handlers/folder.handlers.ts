import { http, HttpResponse, delay } from 'msw';
import { config } from '../../config';
import { mockFolders, getFoldersByWorkspace, getFolderById } from '../data/folders';

export const folderHandlers = [
  // Get all folders for workspace
  http.get(`${config.apiBaseUrl}/workspaces/:workspaceId/folders`, async ({ params }) => {
    await delay(300);
    const { workspaceId } = params;
    const folders = getFoldersByWorkspace(workspaceId as string);
    
    return HttpResponse.json({
      success: true,
      folders,
      total: folders.length,
    });
  }),

  // Get folder by ID
  http.get(`${config.apiBaseUrl}/workspaces/:workspaceId/folders/:folderId`, async ({ params }) => {
    await delay(200);
    const { folderId } = params;
    const folder = getFolderById(folderId as string);
    
    if (!folder) {
      return HttpResponse.json(
        { success: false, error: 'Folder not found' },
        { status: 404 }
      );
    }
    
    return HttpResponse.json({
      success: true,
      folder,
    });
  }),

  // Create folder
  http.post(`${config.apiBaseUrl}/workspaces/:workspaceId/folders`, async ({ request, params }) => {
    await delay(400);
    const { workspaceId } = params;
    const body = await request.json() as { name: string; description?: string; parentId?: string; color?: string; icon?: string };
    
    const newFolder = {
      id: `folder_${Date.now()}`,
      name: body.name,
      description: body.description,
      parentId: body.parentId || null,
      workspaceId: workspaceId as string,
      color: body.color || '#3b82f6',
      icon: body.icon || '📁',
      createdBy: {
        id: 'usr_owner',
        name: 'Admin User',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      workflowCount: 0,
      subfolderCount: 0,
      path: body.parentId ? [...(getFolderById(body.parentId)?.path || []), body.parentId] : [],
    };
    
    mockFolders.push(newFolder);
    
    return HttpResponse.json({
      success: true,
      folder: newFolder,
    });
  }),

  // Update folder
  http.patch(`${config.apiBaseUrl}/workspaces/:workspaceId/folders/:folderId`, async ({ request, params }) => {
    await delay(300);
    const { folderId } = params;
    const body = await request.json() as { name?: string; description?: string; color?: string; icon?: string };
    
    const folderIndex = mockFolders.findIndex(f => f.id === folderId);
    if (folderIndex === -1) {
      return HttpResponse.json(
        { success: false, error: 'Folder not found' },
        { status: 404 }
      );
    }
    
    mockFolders[folderIndex] = {
      ...mockFolders[folderIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    return HttpResponse.json({
      success: true,
      folder: mockFolders[folderIndex],
    });
  }),

  // Delete folder
  http.delete(`${config.apiBaseUrl}/workspaces/:workspaceId/folders/:folderId`, async ({ params }) => {
    await delay(300);
    const { folderId } = params;
    
    const folderIndex = mockFolders.findIndex(f => f.id === folderId);
    if (folderIndex === -1) {
      return HttpResponse.json(
        { success: false, error: 'Folder not found' },
        { status: 404 }
      );
    }
    
    mockFolders.splice(folderIndex, 1);
    
    return HttpResponse.json({
      success: true,
      message: 'Folder deleted successfully',
    });
  }),

  // Move folder
  http.post(`${config.apiBaseUrl}/workspaces/:workspaceId/folders/:folderId/move`, async ({ request, params }) => {
    await delay(300);
    const { folderId } = params;
    const body = await request.json() as { parentId: string | null };
    
    const folderIndex = mockFolders.findIndex(f => f.id === folderId);
    if (folderIndex === -1) {
      return HttpResponse.json(
        { success: false, error: 'Folder not found' },
        { status: 404 }
      );
    }
    
    mockFolders[folderIndex] = {
      ...mockFolders[folderIndex],
      parentId: body.parentId,
      path: body.parentId ? [...(getFolderById(body.parentId)?.path || []), body.parentId] : [],
      updatedAt: new Date().toISOString(),
    };
    
    return HttpResponse.json({
      success: true,
      folder: mockFolders[folderIndex],
    });
  }),

  // Move workflow to folder
  http.post(`${config.apiBaseUrl}/workspaces/:workspaceId/workflows/:workflowId/move`, async ({ request }) => {
    await delay(300);
    const body = await request.json() as { folderId: string | null };
    
    // In a real app, this would update the workflow's folderId
    // For now, just return success
    return HttpResponse.json({
      success: true,
      message: 'Workflow moved successfully',
      folderId: body.folderId,
    });
  }),
];

