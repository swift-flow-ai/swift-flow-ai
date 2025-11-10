import { http, HttpResponse, delay } from "msw";
import { config } from "../../config";
import { mockWorkflowShares, mockShareLinks } from "../data/shares";

export const shareHandlers = [
  // Get workflow shares
  http.get(
    `${config.apiBaseUrl}/workspaces/:workspaceId/workflows/:workflowId/shares`,
    async ({ params }) => {
      await delay(200);
      const { workflowId } = params;
      const shares = mockWorkflowShares.filter(
        (s) => s.workflowId === workflowId
      );

      return HttpResponse.json({
        success: true,
        shares,
      });
    }
  ),

  // Share workflow with user
  http.post(
    `${config.apiBaseUrl}/workspaces/:workspaceId/workflows/:workflowId/shares`,
    async ({ request, params }) => {
      await delay(300);
      const { workflowId } = params;
      const body = (await request.json()) as {
        userId: string;
        permission: string;
      };

      const newShare = {
        id: `share_${Date.now()}`,
        workflowId: workflowId as string,
        sharedWith: {
          id: body.userId,
          name: "New User",
          email: "user@example.com",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
        },
        permission: body.permission as
          | "viewer"
          | "commenter"
          | "editor"
          | "owner",
        sharedBy: {
          id: "usr_owner",
          name: "Admin User",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
        },
        sharedAt: new Date().toISOString(),
      };

      mockWorkflowShares.push(newShare);

      return HttpResponse.json({
        success: true,
        share: newShare,
      });
    }
  ),

  // Update share permission
  http.patch(
    `${config.apiBaseUrl}/workspaces/:workspaceId/workflows/:workflowId/shares/:shareId`,
    async ({ request, params }) => {
      await delay(200);
      const { shareId } = params;
      const body = (await request.json()) as { permission: string };

      const shareIndex = mockWorkflowShares.findIndex((s) => s.id === shareId);
      if (shareIndex === -1) {
        return HttpResponse.json(
          { success: false, error: "Share not found" },
          { status: 404 }
        );
      }

      mockWorkflowShares[shareIndex] = {
        ...mockWorkflowShares[shareIndex],
        permission: body.permission as
          | "viewer"
          | "commenter"
          | "editor"
          | "owner",
      };

      return HttpResponse.json({
        success: true,
        share: mockWorkflowShares[shareIndex],
      });
    }
  ),

  // Remove share
  http.delete(
    `${config.apiBaseUrl}/workspaces/:workspaceId/workflows/:workflowId/shares/:shareId`,
    async ({ params }) => {
      await delay(200);
      const { shareId } = params;

      const shareIndex = mockWorkflowShares.findIndex((s) => s.id === shareId);
      if (shareIndex === -1) {
        return HttpResponse.json(
          { success: false, error: "Share not found" },
          { status: 404 }
        );
      }

      mockWorkflowShares.splice(shareIndex, 1);

      return HttpResponse.json({
        success: true,
        message: "Share removed successfully",
      });
    }
  ),

  // Generate share link
  http.post(
    `${config.apiBaseUrl}/workspaces/:workspaceId/workflows/:workflowId/share-links`,
    async ({ request, params }) => {
      await delay(300);
      const { workflowId } = params;
      const body = (await request.json()) as {
        permission: string;
        expiresAt?: string;
      };

      const token = Math.random().toString(36).substring(2, 15);
      const newLink = {
        id: `link_${Date.now()}`,
        resourceId: workflowId as string,
        resourceType: "workflow" as const,
        token,
        url: `${window.location.origin}/shared/${token}`,
        permission: body.permission as "viewer" | "commenter" | "editor",
        createdBy: {
          id: "usr_owner",
          name: "Admin User",
        },
        createdAt: new Date().toISOString(),
        expiresAt: body.expiresAt || undefined,
        accessCount: 0,
        isActive: true,
      };

      mockShareLinks.push(newLink);

      return HttpResponse.json({
        success: true,
        link: newLink,
      });
    }
  ),

  // Get share links
  http.get(
    `${config.apiBaseUrl}/workspaces/:workspaceId/workflows/:workflowId/share-links`,
    async ({ params }) => {
      await delay(200);
      const { workflowId } = params;
      const links = mockShareLinks.filter(
        (l) => l.resourceId === workflowId && l.resourceType === "workflow"
      );

      return HttpResponse.json({
        success: true,
        links,
      });
    }
  ),

  // Revoke share link
  http.delete(
    `${config.apiBaseUrl}/workspaces/:workspaceId/workflows/:workflowId/share-links/:linkId`,
    async ({ params }) => {
      await delay(200);
      const { linkId } = params;

      const linkIndex = mockShareLinks.findIndex((l) => l.id === linkId);
      if (linkIndex === -1) {
        return HttpResponse.json(
          { success: false, error: "Link not found" },
          { status: 404 }
        );
      }

      mockShareLinks[linkIndex] = {
        ...mockShareLinks[linkIndex],
        isActive: false,
      };

      return HttpResponse.json({
        success: true,
        message: "Link revoked successfully",
      });
    }
  ),
];
