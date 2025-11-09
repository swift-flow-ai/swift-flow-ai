import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { GitBranch } from 'lucide-react';

interface ConditionNodeProps {
  data: {
    label: string;
    description?: string;
  };
}

export const ConditionNode = memo(({ data }: ConditionNodeProps) => {
  return (
    <div className="px-4 py-3 shadow-lg rounded-lg bg-card border-2 border-yellow-500 min-w-[200px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-yellow-500"
      />
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
          <GitBranch className="h-4 w-4 text-yellow-500" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-foreground">{data.label}</div>
          <div className="text-xs text-muted-foreground">{data.description}</div>
        </div>
      </div>
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

