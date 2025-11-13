import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Share2, 
  Link as LinkIcon, 
  Copy, 
  Check,
  Users,
  Globe,
  Trash2
} from 'lucide-react';
import { useWorkspace } from '../../hooks/useWorkspace';
import { shareService } from '../../services/share.service';
import { WorkflowShare, ShareLink, SharePermission } from '../../types/collaboration';
import { Avatar } from '../common/Avatar';
import { ConfirmDialog } from '../common/ConfirmDialog';

interface ShareModalProps {
  workflowId: string;
  workflowName: string;
  onClose: () => void;
}

export function ShareModal({ workflowId, workflowName, onClose }: ShareModalProps) {
  const { currentWorkspace } = useWorkspace();
  const [shares, setShares] = useState<WorkflowShare[]>([]);
  const [shareLinks, setShareLinks] = useState<ShareLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'links'>('users');
  const [showRevokeLinkDialog, setShowRevokeLinkDialog] = useState(false);
  const [revokingLinkId, setRevokingLinkId] = useState<string | null>(null);
  const [showRemoveShareDialog, setShowRemoveShareDialog] = useState(false);
  const [removingShareId, setRemovingShareId] = useState<string | null>(null);

  const loadShares = useCallback(async () => {
    if (!currentWorkspace) return;
    
    try {
      setIsLoading(true);
      const [sharesData, linksData] = await Promise.all([
        shareService.getWorkflowShares(currentWorkspace.id, workflowId),
        shareService.getShareLinks(currentWorkspace.id, workflowId),
      ]);
      setShares(sharesData);
      setShareLinks(linksData.filter(l => l.isActive));
    } catch (error) {
      console.error('Failed to load shares:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentWorkspace, workflowId]);

  useEffect(() => {
    if (currentWorkspace) {
      loadShares();
    }
  }, [currentWorkspace, loadShares]);

  const handleGenerateLink = async (permission: SharePermission) => {
    if (!currentWorkspace) return;
    
    try {
      const link = await shareService.generateShareLink(currentWorkspace.id, workflowId, {
        permission,
      });
      setShareLinks([...shareLinks, link]);
    } catch (error) {
      console.error('Failed to generate link:', error);
    }
  };

  const handleCopyLink = (link: ShareLink) => {
    const url = `${window.location.origin}/shared/${link.token}`;
    navigator.clipboard.writeText(url);
    setCopiedLinkId(link.id);
    setTimeout(() => setCopiedLinkId(null), 2000);
  };

  const handleRevokeLinkClick = (linkId: string) => {
    setRevokingLinkId(linkId);
    setShowRevokeLinkDialog(true);
  };

  const handleRevokeLinkConfirm = async () => {
    if (!currentWorkspace || !revokingLinkId) return;
    
    try {
      await shareService.revokeShareLink(currentWorkspace.id, workflowId, revokingLinkId);
      setShareLinks(shareLinks.filter(l => l.id !== revokingLinkId));
      setRevokingLinkId(null);
    } catch (error) {
      console.error('Failed to revoke link:', error);
    }
  };

  const handleRemoveShareClick = (shareId: string) => {
    setRemovingShareId(shareId);
    setShowRemoveShareDialog(true);
  };

  const handleRemoveShareConfirm = async () => {
    if (!currentWorkspace || !removingShareId) return;
    
    try {
      await shareService.removeShare(currentWorkspace.id, workflowId, removingShareId);
      setShares(shares.filter(s => s.id !== removingShareId));
      setRemovingShareId(null);
    } catch (error) {
      console.error('Failed to remove share:', error);
    }
  };

  const getPermissionColor = (permission: SharePermission) => {
    switch (permission) {
      case 'owner': return 'text-purple-500';
      case 'editor': return 'text-blue-500';
      case 'commenter': return 'text-green-500';
      case 'viewer': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Share2 className="h-5 w-5 text-primary" />
              Share Workflow
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted rounded transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground">{workflowName}</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-border px-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('users')}
              className={`pb-3 px-1 border-b-2 font-medium transition-colors ${
                activeTab === 'users'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                People ({shares.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('links')}
              className={`pb-3 px-1 border-b-2 font-medium transition-colors ${
                activeTab === 'links'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Links ({shareLinks.length})
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : activeTab === 'users' ? (
            <div className="space-y-4">
              {/* Existing Shares */}
              {shares.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">Not shared with anyone yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {shares.map((share) => {
                    if (!share.user) return null;
                    return (
                      <div
                        key={share.id}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <Avatar
                            src={share.user.avatar}
                            alt={share.user.name}
                            size="md"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{share.user.name}</p>
                            <p className="text-sm text-muted-foreground truncate">
                              {share.user.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium capitalize ${getPermissionColor(share.permission)}`}>
                            {share.permission}
                          </span>
                          <button
                            onClick={() => handleRemoveShareClick(share.id)}
                            className="p-1 hover:bg-destructive/10 text-destructive rounded transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Generate Link Button */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleGenerateLink('viewer')}
                  className="flex-1 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
                >
                  Generate Viewer Link
                </button>
                <button
                  onClick={() => handleGenerateLink('editor')}
                  className="flex-1 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
                >
                  Generate Editor Link
                </button>
              </div>

              {/* Existing Links */}
              {shareLinks.length === 0 ? (
                <div className="text-center py-8">
                  <LinkIcon className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">No share links created yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Generate a link to share this workflow
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {shareLinks.map((link) => (
                    <div
                      key={link.id}
                      className="p-4 bg-muted/30 rounded-lg space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <LinkIcon className="h-4 w-4 text-muted-foreground" />
                          <span className={`text-sm font-medium capitalize ${getPermissionColor(link.permission)}`}>
                            {link.permission} Link
                          </span>
                        </div>
                        <button
                          onClick={() => handleRevokeLinkClick(link.id)}
                          className="p-1 hover:bg-destructive/10 text-destructive rounded transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={`${window.location.origin}/shared/${link.token}`}
                          readOnly
                          className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-sm"
                        />
                        <button
                          onClick={() => handleCopyLink(link)}
                          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-2"
                        >
                          {copiedLinkId === link.id ? (
                            <>
                              <Check className="h-4 w-4" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{link.accessCount} views</span>
                        <span>Created {new Date(link.createdAt).toLocaleDateString()}</span>
                        {link.expiresAt && (
                          <span>Expires {new Date(link.expiresAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Revoke Link Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showRevokeLinkDialog}
        onClose={() => {
          setShowRevokeLinkDialog(false);
          setRevokingLinkId(null);
        }}
        onConfirm={handleRevokeLinkConfirm}
        title="Revoke Share Link"
        message="Are you sure you want to revoke this link? Anyone with this link will no longer be able to access the workflow."
        confirmText="Revoke Link"
        cancelText="Cancel"
        variant="danger"
      />

      {/* Remove Share Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showRemoveShareDialog}
        onClose={() => {
          setShowRemoveShareDialog(false);
          setRemovingShareId(null);
        }}
        onConfirm={handleRemoveShareConfirm}
        title="Remove User Access"
        message={`Are you sure you want to remove ${shares.find(s => s.id === removingShareId)?.user?.name || 'this user'}'s access to this workflow?`}
        confirmText="Remove Access"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}

