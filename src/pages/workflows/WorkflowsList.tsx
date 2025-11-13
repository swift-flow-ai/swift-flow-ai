import { useState, useEffect, useCallback, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useWorkspace } from '../../hooks/useWorkspace';
import { workflowService } from '../../services/workflow.service';
import { folderService } from '../../services/folder.service';
import { Workflow } from '../../types/workspace';
import { WorkflowFolder } from '../../types/collaboration';
import {
  Container,
  Card,
  Button,
  Input,
  Badge,
  Avatar,
  EmptyState,
  LoadingSpinner,
  PermissionGate,
  ConfirmDialog,
} from '../../components/common';
import { Permission } from '../../types/rbac';
import { FolderTree } from '../../components/workflows/FolderTree';
import {
  Zap,
  Plus,
  Search,
  Play,
  Pause,
  Archive,
  FolderPlus,
  X,
  MessageSquare,
  Share2,
  Copy,
  Check,
  Link as LinkIcon,
  Grid3x3,
  List,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Edit,
} from 'lucide-react';
import { format } from 'date-fns';
import { useDebounce } from '../../hooks/useDebounce';

const DEFAULT_ITEMS_PER_PAGE = 50;
const ITEM_HEIGHT = 72; // Compact row height
const DEBOUNCE_MS = 300;
const ITEMS_PER_PAGE_OPTIONS = [25, 50, 100, 200];

type ViewMode = 'list' | 'grid';

export function WorkflowsList() {
  const navigate = useNavigate();
  const { currentWorkspace } = useWorkspace();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [folders, setFolders] = useState<WorkflowFolder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [itemsPerPage, setItemsPerPage] = useState<number>(DEFAULT_ITEMS_PER_PAGE);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [newFolderParentId, setNewFolderParentId] = useState<string | null>(null);
  const [showShareFolderModal, setShowShareFolderModal] = useState(false);
  const [shareFolderId, setShareFolderId] = useState<string | null>(null);
  const [showDeleteFolderDialog, setShowDeleteFolderDialog] = useState(false);
  const [deletingFolderId, setDeletingFolderId] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, DEBOUNCE_MS);
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: workflows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ITEM_HEIGHT,
    overscan: 10,
  });

  const loadWorkflows = useCallback(
    async (page: number = 1, append: boolean = false) => {
      if (!currentWorkspace) return;

      try {
        if (append) {
          setIsLoadingMore(true);
        } else {
          setIsLoading(true);
          setWorkflows([]);
          setCurrentPage(1);
        }

        const params: Record<string, string | number> = {
          page,
          limit: itemsPerPage,
        };
        if (filter !== 'all') params.status = filter;
        if (debouncedSearch) params.search = debouncedSearch;

        const data = await workflowService.getWorkflows(currentWorkspace.id, params);
        setTotal(data.total);

        if (append) {
          setWorkflows((prev) => [...prev, ...data.workflows]);
        } else {
          setWorkflows(data.workflows);
        }

        setHasMore(data.workflows.length === itemsPerPage && data.workflows.length < data.total);
        setCurrentPage(page);
      } catch (error) {
        console.error('Failed to load workflows:', error);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [currentWorkspace, filter, debouncedSearch, itemsPerPage]
  );

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
      loadWorkflows(1, false);
      loadFolders();
    }
  }, [currentWorkspace, loadWorkflows, loadFolders]);

  useEffect(() => {
    loadWorkflows(1, false);
  }, [filter, debouncedSearch, itemsPerPage, loadWorkflows]);

  // Filter workflows by folder
  const filteredWorkflows = workflows.filter((w) => {
    if (selectedFolderId === null) return true;
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

  type StatusVariantsType = {
    active: { variant: 'success'; icon: typeof Play };
    draft: { variant: 'default'; icon: typeof Pause };
    paused: { variant: 'warning'; icon: typeof Pause };
    archived: { variant: 'default'; icon: typeof Archive };
  };

  const statusVariants: StatusVariantsType = {
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

  if (isLoading && workflows.length === 0) {
    return (
      <Container size="xl" className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </Container>
    );
  }

  return (
    <Container size="xl" className="flex gap-6">
      {/* Folder Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-64 flex-shrink-0"
      >
        <Card padding="md" variant="default" className="sticky top-6">
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
        </Card>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">Workflows</h1>
            <p className="text-muted-foreground text-sm">
              {total > 0 ? `${total.toLocaleString()} workflow${total !== 1 ? 's' : ''}` : 'Manage and monitor your automation workflows'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 border border-border rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
            </div>
            <PermissionGate permission={Permission.WorkflowCreate}>
              <Button onClick={() => navigate('/app/workflows/new')} variant="primary">
                <Plus className="h-4 w-4 mr-2" />
                Create Workflow
              </Button>
            </PermissionGate>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Input
              type="text"
              placeholder="Search workflows..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>

          <div className="flex items-center gap-2">
            {(['all', 'active', 'draft', 'paused'] as const).map((status) => (
              <Button
                key={status}
                onClick={() => setFilter(status)}
                variant={filter === status ? 'primary' : 'ghost'}
                size="sm"
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Workflows List/Grid */}
        {filteredWorkflows.length === 0 && !isLoading ? (
          <EmptyState
            icon={Zap}
            title="No workflows found"
            description={
              selectedFolderId
                ? 'This folder is empty'
                : 'Create your first workflow to automate your business processes'
            }
            action={{
              label: 'Create Workflow',
              onClick: () => navigate('/app/workflows/new'),
            }}
          />
        ) : viewMode === 'list' ? (
          <Card padding="none" variant="default" className="overflow-hidden">
            <div
              ref={parentRef}
              className="h-[calc(100vh-320px)] overflow-auto"
              style={{ contain: 'strict' }}
            >
              <div
                style={{
                  height: `${virtualizer.getTotalSize()}px`,
                  width: '100%',
                  position: 'relative',
                }}
              >
                {virtualizer.getVirtualItems().map((virtualRow) => {
                  const workflow = filteredWorkflows[virtualRow.index];
                  if (!workflow) return null;

                  return (
                    <div
                      key={virtualRow.key}
                      data-index={virtualRow.index}
                      ref={virtualizer.measureElement}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      <WorkflowRow
                        workflow={workflow}
                        statusVariants={statusVariants}
                        categoryColors={categoryColors}
                        onNavigate={() => navigate(`/app/workflows/${workflow.id}`)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pagination Footer */}
            {total > 0 && (
              <div className="border-t border-border px-6 py-3 flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Items per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="text-xs border border-border rounded px-2 py-1 bg-background"
                  >
                    {ITEMS_PER_PAGE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => loadWorkflows(Math.max(1, currentPage - 1), false)}
                    disabled={currentPage === 1}
                    variant="ghost"
                    size="sm"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-xs text-muted-foreground px-2">
                    Page {currentPage} of {Math.ceil(total / itemsPerPage)}
                  </span>
                  <Button
                    onClick={() => loadWorkflows(currentPage + 1, false)}
                    disabled={!hasMore}
                    variant="ghost"
                    size="sm"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Loading More Indicator */}
            {isLoadingMore && (
              <div className="flex items-center justify-center py-3 border-t border-border">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground mr-2" />
                <span className="text-xs text-muted-foreground">Loading more...</span>
              </div>
            )}
          </Card>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredWorkflows.map((workflow, index) => {
                const statusConfig = statusVariants[workflow.status];
                const StatusIcon = statusConfig.icon;

                return (
                  <motion.div
                    key={workflow.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    <Card
                      padding="none"
                      variant="default"
                      hover
                      onClick={() => navigate(`/app/workflows/${workflow.id}`)}
                      className="group cursor-pointer overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-md hover:border-primary/30"
                    >
                      {/* Compact Header */}
                      <div className={`px-4 py-3 border-b ${
                        workflow.status === 'active' 
                          ? 'border-green-500/20 bg-green-500/5' 
                          : workflow.status === 'draft'
                          ? 'border-gray-500/20 bg-gray-500/5'
                          : workflow.status === 'paused'
                          ? 'border-yellow-500/20 bg-yellow-500/5'
                          : 'border-blue-500/20 bg-blue-500/5'
                      }`}>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <div className={`p-1.5 rounded ${
                              workflow.status === 'active'
                                ? 'bg-green-500/20 text-green-600 dark:text-green-400'
                                : workflow.status === 'draft'
                                ? 'bg-gray-500/20 text-gray-600 dark:text-gray-400'
                                : workflow.status === 'paused'
                                ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400'
                                : 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                            } flex-shrink-0`}>
                              <Zap className="h-3.5 w-3.5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-sm mb-0.5 group-hover:text-primary transition-colors truncate">
                                {workflow.name}
                              </h3>
                              <div className="flex items-center gap-1.5">
                                <Badge variant={statusConfig.variant} icon={StatusIcon} className="text-xs px-1.5 py-0">
                                  {workflow.status}
                                </Badge>
                                <span className="text-xs text-muted-foreground">v{workflow.version}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Compact Content */}
                      <div className="p-4 flex-1 flex flex-col">
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                          {workflow.description || 'No description'}
                        </p>

                        {/* Stats - Inline */}
                        <div className="flex items-center gap-4 mb-3 pb-3 border-b border-border">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-muted-foreground">Runs:</span>
                            <span className="text-sm font-semibold text-foreground">
                              {workflow.stats.totalRuns.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-muted-foreground">Success:</span>
                            <span className={`text-sm font-semibold ${
                              workflow.stats.successRate >= 95 
                                ? 'text-green-600 dark:text-green-400'
                                : workflow.stats.successRate >= 80
                                ? 'text-yellow-600 dark:text-yellow-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}>
                              {workflow.stats.successRate}%
                            </span>
                          </div>
                        </div>

                        {/* Footer - Compact */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 min-w-0">
                            <Avatar
                              src={workflow.createdBy.avatar}
                              alt={workflow.createdBy.name}
                              size="xs"
                            />
                            <span className="text-xs text-muted-foreground truncate">
                              {workflow.createdBy.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-medium ${categoryColors[workflow.category]}`}
                            >
                              {workflow.category}
                            </span>
                            {workflow.commentCount && workflow.commentCount > 0 && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <MessageSquare className="h-3 w-3" />
                                <span>{workflow.commentCount}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Pagination Footer for Grid View */}
            {total > 0 && (
              <Card padding="md" variant="default" className="mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Items per page:</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="text-xs border border-border rounded px-2 py-1 bg-background"
                    >
                      {ITEMS_PER_PAGE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => loadWorkflows(Math.max(1, currentPage - 1), false)}
                      disabled={currentPage === 1}
                      variant="ghost"
                      size="sm"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-xs text-muted-foreground px-2">
                      Page {currentPage} of {Math.ceil(total / itemsPerPage)}
                    </span>
                    <Button
                      onClick={() => loadWorkflows(currentPage + 1, false)}
                      disabled={!hasMore}
                      variant="ghost"
                      size="sm"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Loading More Indicator for Grid View */}
            {isLoadingMore && (
              <div className="flex items-center justify-center py-4 mt-4">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground mr-2" />
                <span className="text-xs text-muted-foreground">Loading more...</span>
              </div>
            )}
          </>
        )}
      </div>

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
          folderName={folders.find((f) => f.id === shareFolderId)?.name || ''}
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
    </Container>
  );
}

// Compact Workflow Row Component
type StatusVariantsType = {
  active: { variant: 'success'; icon: typeof Play };
  draft: { variant: 'default'; icon: typeof Pause };
  paused: { variant: 'warning'; icon: typeof Pause };
  archived: { variant: 'default'; icon: typeof Archive };
};

function WorkflowRow({
  workflow,
  statusVariants,
  categoryColors,
  onNavigate,
}: {
  workflow: Workflow;
  statusVariants: StatusVariantsType;
  categoryColors: Record<string, string>;
  onNavigate: () => void;
}) {
  const statusConfig = statusVariants[workflow.status];
  const StatusIcon = statusConfig.icon;

  return (
    <div
      onClick={onNavigate}
      className="px-6 py-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors cursor-pointer group"
    >
      <div className="flex items-center gap-4">
        {/* Status Badge */}
        <Badge variant={statusConfig.variant} icon={StatusIcon} className="flex-shrink-0">
          {workflow.status}
        </Badge>

        {/* Workflow Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
              {workflow.name}
            </h3>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${categoryColors[workflow.category]}`}
            >
              {workflow.category}
            </span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
            {workflow.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Avatar
                src={workflow.createdBy.avatar}
                alt={workflow.createdBy.name}
                size="xs"
              />
              <span>{workflow.createdBy.name}</span>
            </div>
            <span>•</span>
            <span>{workflow.stats.totalRuns} runs</span>
            <span>•</span>
            <span>{workflow.stats.successRate}% success</span>
            {workflow.commentCount && workflow.commentCount > 0 && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  <span>{workflow.commentCount}</span>
                </div>
              </>
            )}
            <span>•</span>
            <span className="text-xs">
              Updated {format(new Date(workflow.updatedAt), 'MMM d, yyyy')}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate();
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
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
            <label className="block text-sm font-medium mb-2">Folder Name *</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., HR Workflows"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description..."
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
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
            <Button type="button" onClick={onClose} variant="ghost" disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting || !name.trim()}>
              {isSubmitting ? 'Creating...' : 'Create Folder'}
            </Button>
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
  const [shareLinks, setShareLinks] = useState<
    Array<{
      id: string;
      token: string;
      permission: string;
      accessCount: number;
      createdAt: string;
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);

  const loadShares = useCallback(async () => {
    if (!currentWorkspace) return;
    setIsLoading(true);
    try {
      setShareLinks([]);
    } catch (error) {
      console.error('Failed to load folder shares:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentWorkspace]);

  useEffect(() => {
    loadShares();
  }, [folderId, loadShares]);

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
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted rounded transition-colors"
            >
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
              <LoadingSpinner />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button
                  onClick={() => handleGenerateLink('viewer')}
                  variant="secondary"
                  className="flex-1"
                >
                  Generate Viewer Link
                </Button>
                <Button
                  onClick={() => handleGenerateLink('editor')}
                  variant="secondary"
                  className="flex-1"
                >
                  Generate Editor Link
                </Button>
              </div>

              {shareLinks.length === 0 ? (
                <EmptyState
                  icon={LinkIcon}
                  title="No share links created yet"
                  description="Generate a link to share this folder"
                />
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
                        <Input
                          type="text"
                          value={`${window.location.origin}/shared/folder/${link.token}`}
                          readOnly
                          className="flex-1"
                        />
                        <Button
                          onClick={() => handleCopyLink(link)}
                          variant="primary"
                          size="sm"
                        >
                          {copiedLinkId === link.id ? (
                            <>
                              <Check className="h-4 w-4 mr-2" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-2" />
                              Copy
                            </>
                          )}
                        </Button>
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
