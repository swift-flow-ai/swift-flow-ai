import { useState, useEffect, useCallback, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useWorkspace } from '../../hooks/useWorkspace';
import { inboxService, InboxItem, InboxQueryParams } from '../../services/inbox.service';
import { approvalService } from '../../services/approval.service';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Badge } from '../../components/common/Badge';
import { 
  Inbox, 
  AlertTriangle, 
  CheckSquare,
  Square,
  Search,
  RefreshCw,
  Mail,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  X,
  Bell,
  AlertCircle,
  CheckCircle,
  UserPlus,
  Settings,
  User,
  FileText,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { format } from 'date-fns';
import { useDebounce } from '../../hooks/useDebounce';

const DEFAULT_ITEMS_PER_PAGE = 50;
const ITEM_HEIGHT = 56; // Gmail-style compact row height
const DEBOUNCE_MS = 300;
const ITEMS_PER_PAGE_OPTIONS = [25, 50, 100, 200];

export function InboxPage() {
  const { currentWorkspace } = useWorkspace();
  
  // State
  const [items, setItems] = useState<InboxItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'priority' | 'dueDate'>('newest');
  const [filter, setFilter] = useState<'all' | 'unread' | 'actionable'>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const [stats, setStats] = useState({ total: 0, unread: 0, actionable: 0 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState<number>(DEFAULT_ITEMS_PER_PAGE);

  // Debounce search
  const debouncedSearch = useDebounce(searchQuery, DEBOUNCE_MS);

  // Refs for virtualization
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ITEM_HEIGHT,
    overscan: 10, // Render more items for smooth scrolling
  });

  // Load inbox items with pagination
  const loadInboxItems = useCallback(async (
    page: number = 1,
    append: boolean = false
  ) => {
    if (!currentWorkspace) return;
    
    try {
      if (append) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
        setItems([]);
        setCurrentPage(1);
      }

      const params: InboxQueryParams = {
        page,
        limit: itemsPerPage,
        search: debouncedSearch || undefined,
        filter: filter !== 'all' ? filter : undefined,
        sortBy,
      };

      const response = await inboxService.getInboxItems(currentWorkspace.id, params);
      
      if (append) {
        setItems(prev => [...prev, ...response.items]);
      } else {
        setItems(response.items);
      }
      
      setHasMore(response.pagination.hasMore);
      setStats(response.stats);
      setCurrentPage(page);
    } catch (error) {
      console.error('Failed to load inbox items:', error);
      // Fallback: load from approvalService
      try {
        const approvalsData = await approvalService.getApprovals(
          currentWorkspace.id,
          { status: 'pending', page, limit: itemsPerPage }
        );
        
        const approvalItems: InboxItem[] = approvalsData.approvals.map(approval => ({
          id: approval.id,
          type: 'approval',
          title: approval.title,
          description: approval.description,
          priority: approval.priority,
          read: false,
          createdAt: approval.createdAt,
          dueAt: approval.sla.dueAt,
          workflowName: approval.workflowName,
          workflowId: approval.executionId,
          executionId: approval.executionId,
          submittedBy: approval.submittedBy,
          approval,
          actionUrl: `/app/inbox/${approval.id}`,
        }));

        if (append) {
          setItems(prev => [...prev, ...approvalItems]);
        } else {
          setItems(approvalItems);
        }
        
        setHasMore(approvalItems.length === itemsPerPage);
        setStats({
          total: approvalsData.total,
          unread: approvalsData.total,
          actionable: approvalsData.total,
        });
      } catch (fallbackError) {
        console.error('Fallback load failed:', fallbackError);
      }
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [currentWorkspace, debouncedSearch, filter, sortBy, itemsPerPage]);

  // Initial load
  useEffect(() => {
    if (currentWorkspace) {
      loadInboxItems(1, false);
    }
  }, [currentWorkspace, loadInboxItems]);

  // Reload when filters/search/itemsPerPage change
  useEffect(() => {
    if (currentWorkspace) {
      loadInboxItems(1, false);
    }
  }, [currentWorkspace, debouncedSearch, filter, sortBy, itemsPerPage, loadInboxItems]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (!parentRef.current || isLoadingMore || !hasMore) return;
    
    const { scrollTop, scrollHeight, clientHeight } = parentRef.current;
    const scrollBottom = scrollHeight - scrollTop - clientHeight;
    
    // Load more when within 500px of bottom
    if (scrollBottom < 500) {
      loadInboxItems(currentPage + 1, true);
    }
  }, [currentPage, hasMore, isLoadingMore, loadInboxItems]);

  useEffect(() => {
    const scrollElement = parentRef.current;
    if (!scrollElement) return;
    
    scrollElement.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Quick decision handler
  const handleQuickDecision = useCallback(async (itemId: string, decision: 'approve' | 'reject') => {
    if (!currentWorkspace) return;
    
    const item = items.find(i => i.id === itemId);
    if (!item || item.type !== 'approval' || !item.approval) return;
    
    setProcessingIds(prev => new Set(prev).add(itemId));
    
    // Optimistic update
    setItems(prev => prev.filter(i => i.id !== itemId));
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.delete(itemId);
      return next;
    });
    
    try {
      await approvalService.decide(currentWorkspace.id, itemId, decision, '');
      const newStats = await inboxService.getStats(currentWorkspace.id).catch(() => stats);
      setStats(newStats);
    } catch (error) {
      console.error('Failed to process decision:', error);
      if (item) {
        setItems(prev => [...prev, item]);
      }
    } finally {
      setProcessingIds(prev => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });
    }
  }, [currentWorkspace, items, stats]);

  // Mark as read handler
  const handleMarkAsRead = useCallback(async (itemId: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, read: true } : item
      )
    );
    
    try {
      await inboxService.markAsRead(currentWorkspace!.id, [itemId]);
      const newStats = await inboxService.getStats(currentWorkspace!.id).catch(() => stats);
      setStats(newStats);
    } catch (error) {
      console.error('Failed to mark as read:', error);
      setItems(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, read: false } : item
        )
      );
    }
  }, [currentWorkspace, stats]);

  // Mark all as read
  const handleMarkAllAsRead = useCallback(async () => {
    if (!currentWorkspace) return;
    
    const unreadIds = items.filter(item => !item.read).map(item => item.id);
    if (unreadIds.length === 0) return;
    
    setItems(prev =>
      prev.map(item => ({ ...item, read: true }))
    );
    
    try {
      await inboxService.markAllAsRead(currentWorkspace.id);
      const newStats = await inboxService.getStats(currentWorkspace.id).catch(() => stats);
      setStats(newStats);
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  }, [currentWorkspace, items, stats]);

  // Select all handler
  const handleSelectAll = useCallback(() => {
    if (selectedIds.size === items.length && items.length > 0) {
      // Deselect all
      setSelectedIds(new Set());
    } else {
      // Select all
      setSelectedIds(new Set(items.map(item => item.id)));
    }
  }, [items, selectedIds]);

  // Handle individual item selection
  const handleItemSelect = useCallback((itemId: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  }, []);

  // Mark selected as read
  const handleMarkSelectedAsRead = useCallback(async () => {
    if (!currentWorkspace || selectedIds.size === 0) return;
    
    const selectedArray = Array.from(selectedIds);
    
    // Optimistic update
    setItems(prev =>
      prev.map(item =>
        selectedIds.has(item.id) ? { ...item, read: true } : item
      )
    );
    
    // Clear selection
    setSelectedIds(new Set());
    
    try {
      await inboxService.markAsRead(currentWorkspace.id, selectedArray);
      const newStats = await inboxService.getStats(currentWorkspace.id).catch(() => stats);
      setStats(newStats);
    } catch (error) {
      console.error('Failed to mark selected as read:', error);
      // Revert optimistic update
      setItems(prev =>
        prev.map(item =>
          selectedIds.has(item.id) ? { ...item, read: false } : item
        )
      );
    }
  }, [currentWorkspace, selectedIds, stats]);

  if (isLoading && items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col -m-8" style={{ height: 'calc(100vh - 4rem)' }}>
      {/* Gmail-style Search Bar with Filters - Top */}
      <div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-4 px-2 py-2">
          {/* Select All - Left - Aligned with item checkboxes */}
          <button
            onClick={handleSelectAll}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
            title={selectedIds.size === items.length && items.length > 0 ? "Deselect all" : "Select all"}
          >
            {selectedIds.size === items.length && items.length > 0 ? (
              <CheckSquare className="h-5 w-5 text-primary fill-primary" />
            ) : selectedIds.size > 0 ? (
              <CheckSquare className="h-5 w-5 text-primary fill-primary/30" />
            ) : (
              <Square className="h-5 w-5 text-gray-400" />
            )}
          </button>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                filter === 'all'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                filter === 'unread'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Unread
              {stats.unread > 0 && (
                <span className="ml-2 px-1.5 py-0.5 rounded-full bg-primary text-white text-xs font-medium">
                  {stats.unread}
                </span>
              )}
            </button>
            <button
              onClick={() => setFilter('actionable')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                filter === 'actionable'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Actionable
              {stats.actionable > 0 && (
                <span className="ml-2 px-1.5 py-0.5 rounded-full bg-primary text-white text-xs font-medium">
                  {stats.actionable}
                </span>
              )}
            </button>
          </div>

          {/* Search Bar - Center */}
          <div className="relative flex-1 max-w-3xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search inbox..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 border-0 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary/20 transition-all text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Sort Options */}
            <div className="flex items-center gap-0.5 border-r border-gray-300 dark:border-gray-600 pr-2 mr-2">
              <button
                onClick={() => setSortBy('newest')}
                className={`px-2 py-1 text-xs font-medium transition-colors rounded ${
                  sortBy === 'newest'
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Newest
              </button>
              <button
                onClick={() => setSortBy('priority')}
                className={`px-2 py-1 text-xs font-medium transition-colors rounded ${
                  sortBy === 'priority'
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Priority
              </button>
            </div>

            {stats.unread > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors whitespace-nowrap"
              >
                Mark all as read
              </button>
            )}
            <button
              onClick={() => loadInboxItems(1, false)}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Selection Toolbar - Only shows when items are selected */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-2 px-4 py-1.5 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-blue-50/50 dark:bg-blue-950/20">
          <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
            {selectedIds.size} selected
          </span>
          <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
          <button
            onClick={handleMarkSelectedAsRead}
            className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors whitespace-nowrap"
          >
            Mark as read
          </button>
          <button
            onClick={() => setSelectedIds(new Set())}
            className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors whitespace-nowrap"
          >
            Clear
          </button>
        </div>
      )}

      {/* Gmail-style Virtualized List - Max space */}
      <div className="flex-1 min-h-0 flex flex-col">
        <div
          ref={parentRef}
          className="flex-1 overflow-auto bg-white dark:bg-gray-900 min-h-0"
          style={{ contain: 'strict' }}
        >
          {items.length === 0 ? (
            <EmptyState searchQuery={searchQuery} onClearSearch={() => setSearchQuery('')} />
          ) : (
            <div
              style={{
                height: `${virtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {virtualizer.getVirtualItems().map((virtualItem) => {
                const item = items[virtualItem.index];
                return (
                  <div
                    key={virtualItem.key}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${virtualItem.start}px)`,
                    }}
                  >
                    <InboxItemRow
                      item={item}
                      isSelected={selectedIds.has(item.id)}
                      isHovered={hoveredId === item.id}
                      onSelect={() => handleItemSelect(item.id)}
                      onHover={() => setHoveredId(item.id)}
                      onLeave={() => setHoveredId(null)}
                      onQuickDecision={handleQuickDecision}
                      onMarkAsRead={handleMarkAsRead}
                      isProcessing={processingIds.has(item.id)}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Pagination Footer - Sticky at bottom */}
        {items.length > 0 && (
          <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-600 dark:text-gray-400">
                Showing {items.length} of {stats.total.toLocaleString()} items
              </span>
              <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">Items per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                >
                  {ITEMS_PER_PAGE_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => loadInboxItems(Math.max(1, currentPage - 1), false)}
                disabled={currentPage === 1}
                className="p-1.5 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs text-gray-600 dark:text-gray-400 px-2">
                Page {currentPage}
              </span>
              <button
                onClick={() => loadInboxItems(currentPage + 1, false)}
                disabled={!hasMore}
                className="p-1.5 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Loading More Indicator */}
        {isLoadingMore && (
          <div className="flex items-center justify-center py-2 flex-shrink-0 bg-white dark:bg-gray-900">
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">Loading more...</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Gmail-style compact row component
function InboxItemRow({
  item,
  isSelected,
  isHovered,
  onSelect,
  onHover,
  onLeave,
  onQuickDecision,
  onMarkAsRead,
  isProcessing,
}: {
  item: InboxItem;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onHover: () => void;
  onLeave: () => void;
  onQuickDecision: (id: string, decision: 'approve' | 'reject') => void;
  onMarkAsRead: (id: string) => void;
  isProcessing: boolean;
}) {
  const now = Date.now();
  const dueTime = item.dueAt ? new Date(item.dueAt).getTime() : null;
  const timeRemaining = dueTime ? dueTime - now : null;
  const isUrgent = timeRemaining ? timeRemaining < 60 * 60 * 1000 : false;
  const isOverdue = timeRemaining ? timeRemaining < 0 : false;

  const getItemConfig = () => {
    const configs: Record<InboxItem['type'], {
      icon: React.ComponentType<{ className?: string }>;
      color: string;
      label: string;
    }> = {
      approval: {
        icon: CheckSquare,
        color: 'text-orange-600 dark:text-orange-400',
        label: 'Approval',
      },
      task: {
        icon: FileText,
        color: 'text-blue-600 dark:text-blue-400',
        label: 'Task',
      },
      notification: {
        icon: Bell,
        color: 'text-gray-600 dark:text-gray-400',
        label: 'Notification',
      },
      alert: {
        icon: AlertCircle,
        color: 'text-red-600 dark:text-red-400',
        label: 'Alert',
      },
      workflow_error: {
        icon: AlertTriangle,
        color: 'text-red-600 dark:text-red-400',
        label: 'Error',
      },
      workflow_success: {
        icon: CheckCircle,
        color: 'text-green-600 dark:text-green-400',
        label: 'Success',
      },
      comment: {
        icon: MessageSquare,
        color: 'text-purple-600 dark:text-purple-400',
        label: 'Comment',
      },
      mention: {
        icon: User,
        color: 'text-blue-600 dark:text-blue-400',
        label: 'Mention',
      },
      assignment: {
        icon: UserPlus,
        color: 'text-indigo-600 dark:text-indigo-400',
        label: 'Assignment',
      },
      invitation: {
        icon: Mail,
        color: 'text-pink-600 dark:text-pink-400',
        label: 'Invitation',
      },
      system: {
        icon: Settings,
        color: 'text-gray-600 dark:text-gray-400',
        label: 'System',
      },
    };
    return configs[item.type] || configs.notification;
  };

  const config = getItemConfig();
  const Icon = config.icon;

  // Format time
  const createdAt = new Date(item.createdAt);
  const isToday = createdAt.toDateString() === new Date().toDateString();
  const timeDisplay = isToday 
    ? format(createdAt, 'h:mm a')
    : format(createdAt, 'MMM d');

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`group flex items-center gap-2 px-2 py-2 border-b border-gray-100 dark:border-gray-800 transition-colors ${
        !item.read 
          ? 'bg-blue-50/50 dark:bg-blue-950/20 font-medium' 
          : 'bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800'
      } ${isSelected ? 'bg-blue-100 dark:bg-blue-900/30' : ''}`}
    >
      {/* Checkbox */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className="p-1 rounded transition-all flex-shrink-0 hover:bg-gray-100 dark:hover:bg-gray-800"
        title={isSelected ? "Deselect" : "Select"}
      >
        {isSelected ? (
          <CheckSquare className="h-5 w-5 text-primary fill-primary" />
        ) : (
          <Square className="h-5 w-5 text-gray-400" />
        )}
      </button>

      {/* Type Icon */}
      <div className={`p-1.5 rounded flex-shrink-0 ${config.color}`}>
        <Icon className="h-4 w-4" />
      </div>

      {/* Content - Gmail style */}
      <div className="flex-1 min-w-0 flex items-center gap-4">
        {/* Sender/Workflow - Fixed width for alignment */}
        <div className="flex flex-col gap-0.5 min-w-[180px] max-w-[180px]">
          {item.submittedBy ? (
            <span className="text-sm text-gray-900 dark:text-gray-100 truncate font-medium">
              {item.submittedBy.name}
            </span>
          ) : (
            <span className="text-sm text-gray-400 dark:text-gray-500 italic">System</span>
          )}
          {item.workflowName && (
            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {item.workflowName}
            </span>
          )}
        </div>

        {/* Subject/Title - Flexible width */}
        <Link
          to={item.actionUrl || '#'}
          onClick={() => onMarkAsRead(item.id)}
          className="flex-1 min-w-0 group/link"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-sm truncate ${
              !item.read 
                ? 'text-gray-900 dark:text-gray-100 font-semibold' 
                : 'text-gray-700 dark:text-gray-300'
            } group-hover/link:text-primary`}>
              {item.title}
            </span>
            {item.priority === 'critical' && (
              <Badge variant="danger" className="text-xs px-1.5 py-0 flex-shrink-0">Critical</Badge>
            )}
            {item.priority === 'high' && (
              <Badge className="text-xs px-1.5 py-0 bg-orange-500 flex-shrink-0">High</Badge>
            )}
            {isOverdue && (
              <Badge variant="danger" className="text-xs px-1.5 py-0 flex-shrink-0">Overdue</Badge>
            )}
            {isUrgent && !isOverdue && (
              <Badge className="text-xs px-1.5 py-0 bg-orange-500 flex-shrink-0">Urgent</Badge>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
            {item.description}
          </p>
        </Link>

        {/* Quick Actions - Show on hover */}
        <AnimatePresence>
          {isHovered && item.type === 'approval' && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-1 flex-shrink-0"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickDecision(item.id, 'approve');
                }}
                disabled={isProcessing}
                className="p-1.5 rounded hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400 transition-colors disabled:opacity-50"
                title="Approve"
              >
                <ThumbsUp className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickDecision(item.id, 'reject');
                }}
                disabled={isProcessing}
                className="p-1.5 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors disabled:opacity-50"
                title="Reject"
              >
                <ThumbsDown className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timestamp */}
        <div className="text-xs text-gray-500 dark:text-gray-400 min-w-[60px] text-right flex-shrink-0">
          {timeDisplay}
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  searchQuery,
  onClearSearch,
}: {
  searchQuery: string;
  onClearSearch: () => void;
}) {
  return (
    <div className="text-center py-20 px-4">
      <div className="inline-flex p-6 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 mb-6 border border-primary-200 dark:border-primary-800">
        <Inbox className="h-16 w-16 text-primary" />
      </div>
      <h3 className="text-2xl font-bold mb-2">Inbox Zero! 🎉</h3>
      <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto mb-6">
        {searchQuery
          ? 'No items match your search. Try different keywords.'
          : 'Your inbox is empty. All caught up!'}
      </p>
      {searchQuery && (
        <button
          onClick={onClearSearch}
          className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-600 transition-colors"
        >
          Clear Search
        </button>
      )}
    </div>
  );
}
