import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { CheckSquare, MoreVertical } from 'lucide-react';
import { NodeStatusBadge } from '../NodeStatusBadge';
import { getNodeStatus } from '../nodeStatusUtils';
import { NodeTestResult } from '../TestResultPanel';

interface ApprovalNodeProps {
  data: {
    label: string;
    description?: string;
    approvers?: string;
    config?: Record<string, unknown>;
    testResult?: { success: boolean; output?: unknown; error?: string };
    error?: string;
    skipped?: boolean;
  };
  id: string;
  selected?: boolean;
}

export const ApprovalNode = memo(({ data, selected }: ApprovalNodeProps) => {
  const status = getNodeStatus({ data, type: 'approval' });
  const hasAssignees = data.config && 'assignees' in data.config;

  return (
    <div
      className={`px-4 py-3 shadow-lg rounded-lg bg-card border-2 transition-all min-w-[200px] group relative ${
        selected ? 'border-green-600 ring-2 ring-green-500/20' : 'border-green-500'
      } ${data.skipped ? 'opacity-50' : ''}`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-green-500"
      />

      {/* Status Badge */}
      <NodeStatusBadge status={status} message={data.error} />

      {/* Context Menu Trigger */}
      <button
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded"
        onClick={(e) => {
          e.stopPropagation();
          // Context menu will be handled by WorkflowBuilder
        }}
      >
        <MoreVertical className="h-4 w-4 text-muted-foreground" />
      </button>

      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
          <CheckSquare className="h-4 w-4 text-green-500" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-foreground">{data.label}</div>
          <div className="text-xs text-muted-foreground">{data.description}</div>
        </div>
      </div>

      {/* Approvers Summary */}
      {(data.approvers || hasAssignees) && (
        <div className="mt-2 pt-2 border-t border-border">
          <span className="text-xs text-muted-foreground">
            {data.approvers ? `Approvers: ${data.approvers}` : 'Approvers configured'}
          </span>
        </div>
      )}

      {/* Test Result */}
      {data.testResult && <NodeTestResult result={data.testResult} />}

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-green-500"
      />
    </div>
  );
});

ApprovalNode.displayName = 'ApprovalNode';

