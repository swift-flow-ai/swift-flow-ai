import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Play, MoreVertical } from 'lucide-react';
import { NodeStatusBadge } from '../NodeStatusBadge';
import { getNodeStatus } from '../nodeStatusUtils';
import { NodeTestResult } from '../TestResultPanel';

interface ActionNodeProps {
  data: {
    label: string;
    description?: string;
    app?: string;
    integrationId?: string;
    actionKey?: string;
    config?: Record<string, unknown>;
    testResult?: { success: boolean; output?: unknown; error?: string };
    error?: string;
    skipped?: boolean;
    icon?: string;
  };
  id: string;
  selected?: boolean;
}

export const ActionNode = memo(({ data, selected }: ActionNodeProps) => {
  const status = getNodeStatus({ data, type: 'action' });
  const configuredFields = data.config ? Object.keys(data.config).length : 0;

  return (
    <div
      className={`px-4 py-3 shadow-lg rounded-lg bg-card border-2 transition-all min-w-[200px] group relative ${
        selected ? 'border-purple-600 ring-2 ring-purple-500/20' : 'border-purple-500'
      } ${data.skipped ? 'opacity-50' : ''}`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-purple-500"
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
        {data.icon ? (
          <img
            src={data.icon}
            alt={data.label}
            className="w-8 h-8 rounded-lg"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Play className="h-4 w-4 text-purple-500" />
          </div>
        )}
        <div className="flex-1">
          <div className="text-sm font-semibold text-foreground">{data.label}</div>
          <div className="text-xs text-muted-foreground">{data.description}</div>
        </div>
      </div>

      {/* Config Summary */}
      {data.app && (
        <div className="mt-2 pt-2 border-t border-border">
          <span className="text-xs text-muted-foreground">
            {data.app}
            {configuredFields > 0 && ` • ${configuredFields} field${configuredFields !== 1 ? 's' : ''}`}
          </span>
        </div>
      )}

      {/* Test Result */}
      {data.testResult && <NodeTestResult result={data.testResult} />}

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-purple-500"
      />
    </div>
  );
});

ActionNode.displayName = 'ActionNode';

