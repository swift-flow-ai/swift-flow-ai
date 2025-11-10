import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WorkflowFolder } from '../../types/collaboration';
import { 
  Folder, 
  FolderOpen, 
  ChevronRight, 
  ChevronDown, 
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  FolderPlus,
  Share2
} from 'lucide-react';

interface FolderTreeProps {
  folders: WorkflowFolder[];
  selectedFolderId: string | null;
  onSelectFolder: (folderId: string | null) => void;
  onCreateFolder?: (parentId: string | null) => void;
  onEditFolder?: (folderId: string) => void;
  onDeleteFolder?: (folderId: string) => void;
  onShareFolder?: (folderId: string) => void;
  showActions?: boolean;
}

export function FolderTree({
  folders,
  selectedFolderId,
  onSelectFolder,
  onCreateFolder,
  onEditFolder,
  onDeleteFolder,
  onShareFolder,
  showActions = true,
}: FolderTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Build folder hierarchy
  const rootFolders = folders.filter(f => !f.parentId);
  
  const getSubfolders = (parentId: string) => {
    return folders.filter(f => f.parentId === parentId);
  };

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFolder = (folder: WorkflowFolder, level: number = 0) => {
    const isExpanded = expandedFolders.has(folder.id);
    const isSelected = selectedFolderId === folder.id;
    const subfolders = getSubfolders(folder.id);
    const hasSubfolders = subfolders.length > 0;

    return (
      <div key={folder.id}>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={`group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
            isSelected
              ? 'bg-primary/10 text-primary'
              : 'hover:bg-muted/50 text-foreground'
          }`}
          style={{ paddingLeft: `${level * 16 + 12}px` }}
        >
          {/* Expand/Collapse Button */}
          {hasSubfolders ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFolder(folder.id);
              }}
              className="p-0.5 hover:bg-muted rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          ) : (
            <div className="w-5" />
          )}

          {/* Folder Icon & Name */}
          <div
            onClick={() => onSelectFolder(folder.id)}
            className="flex items-center gap-2 flex-1 min-w-0"
          >
            {isExpanded && hasSubfolders ? (
              <FolderOpen className="h-4 w-4 flex-shrink-0" style={{ color: folder.color }} />
            ) : (
              <Folder className="h-4 w-4 flex-shrink-0" style={{ color: folder.color }} />
            )}
            <span className="text-sm font-medium truncate">{folder.name}</span>
            <span className="text-xs text-muted-foreground">
              {folder.workflowCount}
            </span>
          </div>

          {/* Actions Menu */}
          {showActions && (
            <div className="relative opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuId(openMenuId === folder.id ? null : folder.id);
                }}
                className="p-1 hover:bg-muted rounded transition-colors"
              >
                <MoreVertical className="h-4 w-4" />
              </button>

              {openMenuId === folder.id && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setOpenMenuId(null)}
                  />
                  <div className="absolute right-0 mt-1 w-48 bg-card border border-border rounded-lg shadow-xl py-2 z-20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCreateFolder?.(folder.id);
                        setOpenMenuId(null);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-2"
                    >
                      <FolderPlus className="h-4 w-4" />
                      New Subfolder
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditFolder?.(folder.id);
                        setOpenMenuId(null);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-2"
                    >
                      <Edit2 className="h-4 w-4" />
                      Rename
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onShareFolder?.(folder.id);
                        setOpenMenuId(null);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-2"
                    >
                      <Share2 className="h-4 w-4" />
                      Share Folder
                    </button>
                    <div className="border-t border-border my-2" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteFolder?.(folder.id);
                        setOpenMenuId(null);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-destructive/10 text-destructive transition-colors flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </motion.div>

        {/* Subfolders */}
        <AnimatePresence>
          {isExpanded && hasSubfolders && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {subfolders.map(subfolder => renderFolder(subfolder, level + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="space-y-1">
      {/* All Workflows */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
          selectedFolderId === null
            ? 'bg-primary/10 text-primary'
            : 'hover:bg-muted/50 text-foreground'
        }`}
        onClick={() => onSelectFolder(null)}
      >
        <Folder className="h-4 w-4" />
        <span className="text-sm font-medium">All Workflows</span>
      </motion.div>

      {/* Create Root Folder */}
      {showActions && onCreateFolder && (
        <button
          onClick={() => onCreateFolder(null)}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Folder
        </button>
      )}

      {/* Folder Tree */}
      <div className="space-y-1">
        {rootFolders.map(folder => renderFolder(folder, 0))}
      </div>
    </div>
  );
}

