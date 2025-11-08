import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { CheckSquare } from 'lucide-react';

export const ApprovalNode = memo(({ data }: any) => {
  return (
    <div className="px-4 py-3 shadow-lg rounded-lg bg-card border-2 border-green-500 min-w-[200px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-green-500"
      />
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
          <CheckSquare className="h-4 w-4 text-green-500" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-foreground">{data.label}</div>
          <div className="text-xs text-muted-foreground">{data.description}</div>
        </div>
      </div>
      {data.approvers && (
        <div className="mt-2 pt-2 border-t border-border">
          <span className="text-xs text-muted-foreground">Approvers: {data.approvers}</span>
        </div>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-green-500"
      />
    </div>
  );
});

ApprovalNode.displayName = 'ApprovalNode';

