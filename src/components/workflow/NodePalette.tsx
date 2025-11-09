import {
  Zap,
  Play,
  GitBranch,
  CheckSquare,
  Sparkles,
  Mail,
  MessageSquare,
  Database,
  Code,
  Clock,
  Filter
} from 'lucide-react';
import { marketplaceApps } from '../../data/marketplaceApps';

interface NodeData {
  label: string;
  description: string;
  app?: string;
  triggerType?: string;
}

interface NodePaletteProps {
  onAddNode: (type: string, data: NodeData) => void;
}

export function NodePalette({ onAddNode }: NodePaletteProps) {
  const nodeCategories = [
    {
      title: 'Triggers',
      nodes: [
        {
          type: 'trigger',
          icon: Play,
          label: 'Manual Trigger',
          description: 'Start manually by users',
          color: 'blue',
          triggerType: 'manual',
        },
        {
          type: 'trigger',
          icon: Zap,
          label: 'Webhook',
          description: 'Trigger via HTTP webhook',
          color: 'blue',
          triggerType: 'webhook',
        },
        {
          type: 'trigger',
          icon: GitBranch,
          label: 'Workflow Complete',
          description: 'After another workflow ends',
          color: 'blue',
          triggerType: 'workflow_complete',
        },
        {
          type: 'trigger',
          icon: Clock,
          label: 'Schedule',
          description: 'Run on a schedule',
          color: 'blue',
          triggerType: 'schedule',
        },
        {
          type: 'trigger',
          icon: Mail,
          label: 'Email Received',
          description: 'Trigger on new email',
          color: 'blue',
          triggerType: 'email',
        },
      ],
    },
    {
      title: 'Actions',
      nodes: [
        {
          type: 'action',
          icon: MessageSquare,
          label: 'Send Message',
          description: 'Send to Slack/Teams',
          color: 'purple',
          app: 'Slack',
        },
        {
          type: 'action',
          icon: Mail,
          label: 'Send Email',
          description: 'Send via Gmail',
          color: 'purple',
          app: 'Gmail',
        },
        {
          type: 'action',
          icon: Database,
          label: 'Database Query',
          description: 'Query database',
          color: 'purple',
          app: 'PostgreSQL',
        },
        {
          type: 'action',
          icon: Code,
          label: 'Run Code',
          description: 'Execute custom code',
          color: 'purple',
        },
        {
          type: 'action',
          icon: Sparkles,
          label: 'AI Generate',
          description: 'Use AI to generate',
          color: 'purple',
          app: 'OpenAI GPT-4',
        },
      ],
    },
    {
      title: 'Control Flow',
      nodes: [
        {
          type: 'condition',
          icon: GitBranch,
          label: 'Condition',
          description: 'If/else logic',
          color: 'yellow',
        },
        {
          type: 'condition',
          icon: Filter,
          label: 'Filter',
          description: 'Filter items',
          color: 'yellow',
        },
      ],
    },
    {
      title: 'Human Tasks',
      nodes: [
        {
          type: 'approval',
          icon: CheckSquare,
          label: 'Approval',
          description: 'Wait for approval',
          color: 'green',
        },
      ],
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'border-blue-500 hover:bg-blue-500/10 hover:border-blue-400';
      case 'purple': return 'border-purple-500 hover:bg-purple-500/10 hover:border-purple-400';
      case 'yellow': return 'border-yellow-500 hover:bg-yellow-500/10 hover:border-yellow-400';
      case 'green': return 'border-green-500 hover:bg-green-500/10 hover:border-green-400';
      default: return 'border-border hover:bg-muted';
    }
  };

  const getIconColorClass = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-500';
      case 'purple': return 'text-purple-500';
      case 'yellow': return 'text-yellow-500';
      case 'green': return 'text-green-500';
      default: return 'text-foreground';
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Node Palette</h3>
        <p className="text-sm text-muted-foreground">
          Drag and drop nodes to build your workflow
        </p>
      </div>

      {nodeCategories.map((category) => (
        <div key={category.title}>
          <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
            {category.title}
          </h4>
          <div className="space-y-2">
            {category.nodes.map((node, index) => {
              const Icon = node.icon;
              return (
                <button
                  key={index}
                  onClick={() => onAddNode(node.type, {
                    label: node.label,
                    description: node.description,
                    app: 'app' in node ? (node as { app: string }).app : undefined,
                    triggerType: 'triggerType' in node ? (node as { triggerType: string }).triggerType : undefined,
                  })}
                  className={`w-full p-3 rounded-lg border-2 transition-all cursor-grab active:cursor-grabbing text-left ${getColorClasses(node.color)}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-${node.color}-500/10 flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`h-4 w-4 ${getIconColorClass(node.color)}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground">{node.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {node.description}
                      </div>
                      {'app' in node && (
                        <div className="mt-1">
                          <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                            {(node as { app: string }).app}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Popular Apps Section */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
          Popular Apps
        </h4>
        <div className="space-y-2">
          {marketplaceApps.slice(0, 5).map((app) => (
            <button
              key={app.id}
              onClick={() => onAddNode('action', {
                label: `${app.name} Action`,
                description: app.description,
                app: app.name,
              })}
              className="w-full p-3 rounded-lg border-2 border-purple-500 hover:bg-purple-500/10 hover:border-purple-400 transition-all cursor-grab active:cursor-grabbing text-left"
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{app.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">{app.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {app.description}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

