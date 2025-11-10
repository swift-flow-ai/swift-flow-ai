import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useWorkspace } from '../../hooks/useWorkspace';
import { workflowService } from '../../services/workflow.service';
import { folderService } from '../../services/folder.service';
import { Workflow } from '../../types/workspace';
import { WorkflowFolder } from '../../types/collaboration';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { EmptyState } from '../../components/common/EmptyState';
import { PermissionGate } from '../../components/common/PermissionGate';
import { ConfirmDialog } from '../../components/common';
import { FolderTree } from '../../components/workflows/FolderTree';
import { Zap, Plus, Search, Play, Pause, Archive, FolderPlus, X, MessageSquare, Users2, FileText, Share2, Copy, Check, Link as LinkIcon } from 'lucide-react';

export function WorkflowsList() {
  const navigate = useNavigate();
  const { currentWorkspace } = useWorkspace();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [folders, setFolders] = useState<WorkflowFolder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [newFolderParentId, setNewFolderParentId] = useState<string | null>(null);
  const [showShareFolderModal, setShowShareFolderModal] = useState(false);
  const [shareFolderId, setShareFolderId] = useState<string | null>(null);
  const [showDeleteFolderDialog, setShowDeleteFolderDialog] = useState(false);
  const [deletingFolderId, setDeletingFolderId] = useState<string | null>(null);

  const loadWorkflows = useCallback(async () => {
    if (!currentWorkspace) return;
    
    try {
      setIsLoading(true);
      const params: Record<string, string> = {};
      if (filter !== 'all') params.status = filter;
      if (search) params.search = search;
      
      const data = await workflowService.getWorkflows(currentWorkspace.id, params);
      setWorkflows(data.workflows);
      
      console.log('Loaded workflows:', {
        filter,
        search,
        count: data.workflows.length,
        total: data.total,
        workflows: data.workflows.map(w => ({ id: w.id, name: w.name, status: w.status }))
      });
    } catch (error) {
      console.error('Failed to load workflows:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentWorkspace, filter, search]);

  const loadFolders = useCallback(async () => {
    if (!currentWorkspace) return;
    
    try {
      const data = await folderService.getFolders(currentWorkspace.id);
      setFolders(data);
    } catch (error) {
      console.error('Failed to load folders:', error);
    }
  }, [currentWorkspace]);

  useEffect(() => {
    if (currentWorkspace) {
      loadWorkflows();
      loadFolders();
    }
  }, [currentWorkspace, loadWorkflows, loadFolders]);

  // Filter workflows by folder
  const filteredWorkflows = workflows.filter(w => {
    if (selectedFolderId === null) return true; // Show all when no folder selected
    return w.folderId === selectedFolderId;
  });

  const handleCreateFolder = async (parentId: string | null) => {
    setNewFolderParentId(parentId);
    setShowCreateFolderModal(true);
  };

  const handleDeleteFolderClick = (folderId: string) => {
    setDeletingFolderId(folderId);
    setShowDeleteFolderDialog(true);
  };

  const handleDeleteFolderConfirm = async () => {
    if (!currentWorkspace || !deletingFolderId) return;
    
    try {
      await folderService.deleteFolder(currentWorkspace.id, deletingFolderId);
      await loadFolders();
    } catch (error) {
      console.error('Failed to delete folder:', error);
    } finally {
      setDeletingFolderId(null);
    }
  };

  const handleShareFolder = (folderId: string) => {
    setShareFolderId(folderId);
    setShowShareFolderModal(true);
  };

  const statusVariants = {
    active: { variant: 'success' as const, icon: Play },
    draft: { variant: 'default' as const, icon: Pause },
    paused: { variant: 'warning' as const, icon: Pause },
    archived: { variant: 'default' as const, icon: Archive },
  };

  const categoryColors: Record<string, string> = {
    hr: 'bg-blue-500/10 text-blue-500',
    sales: 'bg-green-500/10 text-green-500',
    support: 'bg-purple-500/10 text-purple-500',
    finance: 'bg-yellow-500/10 text-yellow-500',
    operations: 'bg-pink-500/10 text-pink-500',
    custom: 'bg-gray-500/10 text-gray-500',
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex gap-6">
      {/* Folder Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-64 flex-shrink-0"
      >
        <div className="bg-card border border-border rounded-xl p-4 sticky top-6">
          <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
            Folders
          </h3>
          <FolderTree
            folders={folders}
            selectedFolderId={selectedFolderId}
            onSelectFolder={setSelectedFolderId}
            onCreateFolder={handleCreateFolder}
            onDeleteFolder={handleDeleteFolderClick}
            onShareFolder={handleShareFolder}
            showActions={true}
          />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Workflows</h1>
            <p className="text-muted-foreground">
              Manage and monitor your automation workflows
            </p>
          </div>
          <PermissionGate permission="workflow:create">
            <button 
              onClick={() => navigate('/app/workflows/new')}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Create Workflow
            </button>
          </PermissionGate>
        </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search workflows..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted/50 border-0 focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            All
            {filter === 'all' && (
              <span className="ml-2 px-1.5 py-0.5 rounded bg-primary-foreground/20 text-xs">
                {workflows.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'active' 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            Active
            {filter === 'active' && (
              <span className="ml-2 px-1.5 py-0.5 rounded bg-primary-foreground/20 text-xs">
                {workflows.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'draft' 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            Draft
            {filter === 'draft' && (
              <span className="ml-2 px-1.5 py-0.5 rounded bg-primary-foreground/20 text-xs">
                {workflows.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setFilter('paused')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'paused' 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            Paused
            {filter === 'paused' && (
              <span className="ml-2 px-1.5 py-0.5 rounded bg-primary-foreground/20 text-xs">
                {workflows.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Workflows Grid */}
      {filteredWorkflows.length === 0 ? (
        <EmptyState
          icon={Zap}
          title="No workflows found"
          description={selectedFolderId ? "This folder is empty" : "Create your first workflow to automate your business processes"}
          action={{
            label: 'Create Workflow',
            onClick: () => {},
          }}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredWorkflows.map((workflow, index) => {
            const statusConfig = statusVariants[workflow.status];
            const StatusIcon = statusConfig.icon;
            
            return (
              <motion.div
                key={workflow.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={`/app/workflows/${workflow.id}`}
                  className="block group rounded-xl border bg-card p-6 hover:border-primary hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                        {workflow.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {workflow.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant={statusConfig.variant} icon={StatusIcon}>
                      {workflow.status}
                    </Badge>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[workflow.category]}`}>
                      {workflow.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Avatar 
                        src={workflow.createdBy.avatar} 
                        alt={workflow.createdBy.name}
                        size="sm"
                        className="h-5 w-5"
                      />
                      <span>{workflow.createdBy.name}</span>
                    </div>
                    <span>v{workflow.version}</span>
                  </div>

                  <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-muted-foreground mb-1">Runs</div>
                      <div className="font-medium">{workflow.stats.totalRuns}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Success Rate</div>
                      <div className="font-medium">{workflow.stats.successRate}%</div>
                    </div>
                  </div>

                  {/* Collaboration Indicators */}
                  {(workflow.commentCount || workflow.shares?.length || workflow.status === 'draft') && (
                    <div className="mt-3 pt-3 border-t flex items-center gap-3 text-xs text-muted-foreground">
                      {workflow.status === 'draft' && (
                        <div className="flex items-center gap-1 text-yellow-600">
                          <FileText className="h-3 w-3" />
                          <span>Draft</span>
                        </div>
                      )}
                      {workflow.commentCount && workflow.commentCount > 0 && (
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{workflow.commentCount}</span>
                        </div>
                      )}
                      {workflow.shares && workflow.shares.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Users2 className="h-3 w-3" />
                          <span>{workflow.shares.length}</span>
                        </div>
                      )}
                    </div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Create Folder Modal */}
      {showCreateFolderModal && (
        <CreateFolderModal
          parentId={newFolderParentId}
          onClose={() => setShowCreateFolderModal(false)}
          onSuccess={() => {
            setShowCreateFolderModal(false);
            loadFolders();
          }}
        />
      )}

      {/* Share Folder Modal */}
      {showShareFolderModal && shareFolderId && (
        <FolderShareModal
          folderId={shareFolderId}
          folderName={folders.find(f => f.id === shareFolderId)?.name || ''}
          onClose={() => {
            setShowShareFolderModal(false);
            setShareFolderId(null);
          }}
        />
      )}

      {/* Delete Folder Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteFolderDialog}
        onClose={() => {
          setShowDeleteFolderDialog(false);
          setDeletingFolderId(null);
        }}
        onConfirm={handleDeleteFolderConfirm}
        title="Delete Folder"
        message="Are you sure you want to delete this folder? Workflows inside will not be deleted, they will just be moved out of the folder."
        confirmText="Delete Folder"
        cancelText="Cancel"
        variant="danger"
      />
      </div>
    </div>
  );
}

// Create Folder Modal Component
interface CreateFolderModalProps {
  parentId: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

function CreateFolderModal({ parentId, onClose, onSuccess }: CreateFolderModalProps) {
  const { currentWorkspace } = useWorkspace();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#3b82f6');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const colors = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Orange', value: '#f59e0b' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Pink', value: '#ec4899' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWorkspace || !name.trim()) return;

    setIsSubmitting(true);
    try {
      await folderService.createFolder(currentWorkspace.id, {
        name: name.trim(),
        description: description.trim() || undefined,
        parentId,
        color,
      });
      onSuccess();
    } catch (error) {
      console.error('Failed to create folder:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-xl p-6 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FolderPlus className="h-5 w-5 text-primary" />
            Create New Folder
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Folder Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., HR Workflows"
              className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border focus:ring-2 focus:ring-primary/20 transition-all"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description..."
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Color
            </label>
            <div className="flex gap-2">
              {colors.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`w-10 h-10 rounded-lg transition-all ${
                    color === c.value
                      ? 'ring-2 ring-primary ring-offset-2 ring-offset-card scale-110'
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.value }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
              disabled={isSubmitting || !name.trim()}
            >
              {isSubmitting ? 'Creating...' : 'Create Folder'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Folder Share Modal Component  
interface FolderShareModalProps {
  folderId: string;
  folderName: string;
  onClose: () => void;
}

function FolderShareModal({ folderId, folderName, onClose }: FolderShareModalProps) {
  const { currentWorkspace } = useWorkspace();
  const [shareLinks, setShareLinks] = useState<Array<{ id: string; token: string; permission: string; accessCount: number; createdAt: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);

  useEffect(() => {
    loadShares();
  }, [folderId]);

  const loadShares = async () => {
    if (!currentWorkspace) return;
    setIsLoading(true);
    try {
      // Mock data for now - in real app would call API
      setShareLinks([]);
    } catch (error) {
      console.error('Failed to load folder shares:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateLink = (permission: string) => {
    const token = Math.random().toString(36).substring(2, 15);
    const newLink = {
      id: `link_${Date.now()}`,
      token,
      permission,
      accessCount: 0,
      createdAt: new Date().toISOString(),
    };
    setShareLinks([...shareLinks, newLink]);
  };

  const handleCopyLink = (link: { id: string; token: string }) => {
    const url = `${window.location.origin}/shared/folder/${link.token}`;
    navigator.clipboard.writeText(url);
    setCopiedLinkId(link.id);
    setTimeout(() => setCopiedLinkId(null), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Share2 className="h-5 w-5 text-primary" />
              Share Folder
            </h2>
            <button onClick={onClose} className="p-1 hover:bg-muted rounded transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground">{folderName}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Share this folder and all workflows inside it
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : (
            <div className="space-y-4">
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

              {shareLinks.length === 0 ? (
                <div className="text-center py-8">
                  <LinkIcon className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">No share links created yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Generate a link to share this folder
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {shareLinks.map((link) => (
                    <div key={link.id} className="p-4 bg-muted/30 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <LinkIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium capitalize">
                            {link.permission} Link
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={`${window.location.origin}/shared/folder/${link.token}`}
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
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

