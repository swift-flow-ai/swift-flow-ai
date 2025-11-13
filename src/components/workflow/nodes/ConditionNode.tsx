import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { GitBranch, MoreVertical } from 'lucide-react';
import { NodeStatusBadge } from '../NodeStatusBadge';
import { getNodeStatus } from '../nodeStatusUtils';
import { NodeTestResult } from '../TestResultPanel';

interface ConditionNodeProps {
  data: {
    label: string;
    description?: string;
    config?: Record<string, unknown>;
    testResult?: { success: boolean; output?: unknown; error?: string };
    error?: string;
    skipped?: boolean;
  };
  id: string;
  selected?: boolean;
}

export const ConditionNode = memo(({ data, selected }: ConditionNodeProps) => {
  const status = getNodeStatus({ data, type: 'condition' });
  const hasCondition = data.config && 'condition' in data.config;

  return (
    <div
      className={`px-4 py-3 shadow-lg rounded-lg bg-card border-2 transition-all min-w-[200px] group relative ${
        selected ? 'border-yellow-600 ring-2 ring-yellow-500/20' : 'border-yellow-500'
      } ${data.skipped ? 'opacity-50' : ''}`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-yellow-500"
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
        <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
          <GitBranch className="h-4 w-4 text-yellow-500" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-foreground">{data.label}</div>
          <div className="text-xs text-muted-foreground">{data.description}</div>
        </div>
      </div>

      {/* Condition Summary */}
      {hasCondition && (
        <div className="mt-2 pt-2 border-t border-border">
          <span className="text-xs text-muted-foreground">
            Condition configured
          </span>
        </div>
      )}

      {/* Test Result */}
      {data.testResult && <NodeTestResult result={data.testResult} />}

      <div className="flex gap-2 mt-2">
        <Handle
          type="source"
          position={Position.Bottom}
          id="true"
          className="w-3 h-3 !bg-green-500"
          style={{ left: '30%' }}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="false"
          className="w-3 h-3 !bg-red-500"
          style={{ left: '70%' }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-green-600 dark:text-green-400">True</span>
        <span className="text-[10px] text-red-600 dark:text-red-400">False</span>
      </div>
    </div>
  );
});

ConditionNode.displayName = 'ConditionNode';

