import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Play } from 'lucide-react';

interface ActionNodeProps {
  data: {
    label: string;
    description?: string;
    app?: string;
  };
}

export const ActionNode = memo(({ data }: ActionNodeProps) => {
  return (
    <div className="px-4 py-3 shadow-lg rounded-lg bg-card border-2 border-purple-500 min-w-[200px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-purple-500"
      />
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
          <Play className="h-4 w-4 text-purple-500" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-foreground">{data.label}</div>
          <div className="text-xs text-muted-foreground">{data.description}</div>
        </div>
      </div>
      {data.app && (
        <div className="mt-2 pt-2 border-t border-border">
          <span className="text-xs text-muted-foreground">App: {data.app}</span>
        </div>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-purple-500"
      />
    </div>
  );
});

ActionNode.displayName = 'ActionNode';

