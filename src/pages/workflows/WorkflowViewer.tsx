import { useState, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  BackgroundVariant,
  MiniMap,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/common';
import {
  ArrowLeft,
  Edit,
  Play,
  MoreVertical,
  Download,
  Copy,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  Activity,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { TriggerNode } from '../../components/workflow/nodes/TriggerNode';
import { ActionNode } from '../../components/workflow/nodes/ActionNode';
import { ConditionNode } from '../../components/workflow/nodes/ConditionNode';
import { ApprovalNode } from '../../components/workflow/nodes/ApprovalNode';
import { workflowService } from '../../services/workflow.service';
import { executionService } from '../../services/execution.service';
import { useWorkspace } from '../../hooks/useWorkspace';
import { Workflow, WorkflowExecution } from '../../types';

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
  approval: ApprovalNode,
};

export function WorkflowViewer() {
  const { workflowId } = useParams<{ workflowId: string }>();
  const navigate = useNavigate();
  const { currentWorkspace } = useWorkspace();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [executions, setExecutions] = useState<WorkflowExecution[]>([]);
  const [isLoadingExecutions, setIsLoadingExecutions] = useState(false);
  const [showExecutions, setShowExecutions] = useState(true);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useEffect(() => {
    if (workflowId && currentWorkspace) {
      loadWorkflow();
      loadExecutions();
    }
  }, [workflowId, currentWorkspace]);

  const loadWorkflow = async () => {
    if (!workflowId || !currentWorkspace) return;
    
    setIsLoading(true);
    try {
      const data = await workflowService.getWorkflow(currentWorkspace.id, workflowId);
      setWorkflow(data);
      
      // Convert workflow definition to ReactFlow nodes and edges
      if (data.definition) {
        setNodes((data.definition.nodes as Node[]) || []);
        setEdges((data.definition.edges as Edge[]) || []);
      }
    } catch (error) {
      console.error('Failed to load workflow:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadExecutions = async () => {
    if (!workflowId || !currentWorkspace) return;
    
    setIsLoadingExecutions(true);
    try {
      const data = await executionService.getExecutions(currentWorkspace.id, {
        workflowId,
        limit: 10,
      });
      setExecutions(data.executions);
    } catch (error) {
      console.error('Failed to load executions:', error);
    } finally {
      setIsLoadingExecutions(false);
    }
  };

  const handleEdit = () => {
    navigate(`/workflows/${workflowId}/edit`);
  };

  const handleRun = () => {
    console.log('Running workflow:', workflowId);
    // In real app, would trigger workflow execution
  };

  const handleDuplicate = () => {
    console.log('Duplicating workflow:', workflowId);
    // In real app, would duplicate workflow
  };

  const handleExport = () => {
    console.log('Exporting workflow:', workflowId);
    // In real app, would export workflow definition
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this workflow?')) {
      console.log('Deleting workflow:', workflowId);
      navigate('/workflows');
    }
  };

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading workflow...</p>
        </div>
      </div>
    );
  }

  if (!workflow) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <p className="text-lg font-semibold mb-2">Workflow not found</p>
          <Button onClick={() => navigate('/workflows')}>
            Back to Workflows
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-600 dark:text-green-400';
      case 'draft':
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
      case 'paused':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400';
      default:
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
    }
  };

  const getExecutionStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-600 dark:text-green-400';
      case 'running':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
      case 'failed':
        return 'bg-red-500/10 text-red-600 dark:text-red-400';
      case 'waiting':
        return 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400';
      case 'queued':
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
      default:
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
    }
  };

  const getExecutionStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'running':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'failed':
        return <XCircle className="h-4 w-4" />;
      case 'waiting':
        return <Clock className="h-4 w-4" />;
      case 'queued':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/workflows')}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold">{workflow.name}</h1>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(workflow.status)}`}>
                  {workflow.status === 'active' && <CheckCircle className="h-3 w-3" />}
                  {workflow.status === 'paused' && <Clock className="h-3 w-3" />}
                  {workflow.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {workflow.description || 'No description'}
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <span>{nodes.length} nodes • {edges.length} connections</span>
                <span>•</span>
                <span>Created by {workflow.createdBy?.name || 'Unknown'}</span>
                {workflow.stats && (
                  <>
                    <span>•</span>
                    <span>{workflow.stats.totalRuns} runs</span>
                    <span>•</span>
                    <span>{workflow.stats.successRate}% success rate</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="primary" onClick={handleRun}>
              <Play className="h-4 w-4 mr-2" />
              Run Workflow
            </Button>
            <Button variant="secondary" onClick={handleEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            
            {/* More Actions Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <MoreVertical className="h-5 w-5" />
              </button>
              
              {showMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowMenu(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-xl py-2 z-50"
                  >
                    <button
                      onClick={handleDuplicate}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors text-left"
                    >
                      <Copy className="h-4 w-4" />
                      <span className="text-sm">Duplicate</span>
                    </button>
                    <button
                      onClick={handleExport}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors text-left"
                    >
                      <Download className="h-4 w-4" />
                      <span className="text-sm">Export</span>
                    </button>
                    <div className="my-1 border-t border-border" />
                    <button
                      onClick={handleDelete}
                      className="w-full flex items-center gap-3 px-4 py-2 hover:bg-destructive/10 text-destructive transition-colors text-left"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="text-sm">Delete</span>
                    </button>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 flex relative">
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={true}
            onNodeClick={(_, node) => setSelectedNode(node)}
            className="bg-background"
          >
            <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
            <Controls showInteractive={false} />
            <MiniMap
              nodeColor={(node) => {
                switch (node.type) {
                  case 'trigger': return '#3b82f6';
                  case 'action': return '#8b5cf6';
                  case 'condition': return '#f59e0b';
                  case 'approval': return '#10b981';
                  default: return '#6b7280';
                }
              }}
              maskColor="rgba(0, 0, 0, 0.2)"
            />
            
            {/* View Mode Indicator */}
            <Panel position="top-center">
              <div className="bg-card border border-border rounded-lg px-4 py-2 shadow-xl">
                <p className="text-xs font-medium text-muted-foreground">
                  👁️ View Mode - Click "Edit" to make changes
                </p>
              </div>
            </Panel>
          </ReactFlow>
        </div>

        {/* Node Details Panel */}
        {selectedNode && (
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            className="w-96 bg-card border-l border-border overflow-y-auto p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Node Details</h3>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Node Type Badge */}
              <div>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                  selectedNode.type === 'trigger' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                  selectedNode.type === 'action' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' :
                  selectedNode.type === 'condition' ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' :
                  'bg-green-500/10 text-green-600 dark:text-green-400'
                }`}>
                  {selectedNode.type}
                </span>
              </div>

              {/* Node Name */}
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">Name</label>
                <p className="text-foreground">{selectedNode.data.label}</p>
              </div>

              {/* Description */}
              {selectedNode.data.description && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">Description</label>
                  <p className="text-foreground text-sm">{selectedNode.data.description}</p>
                </div>
              )}

              {/* Configuration */}
              {selectedNode.data.config && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">Configuration</label>
                  <pre className="text-xs bg-muted p-3 rounded-lg overflow-auto">
                    {JSON.stringify(selectedNode.data.config, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Executions Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute bottom-0 right-0 w-96 bg-card border-l border-t border-border rounded-tl-lg shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div
            className="px-4 py-3 border-b border-border flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setShowExecutions(!showExecutions)}
          >
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Recent Executions</h3>
              <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                {executions.length}
              </span>
            </div>
            {showExecutions ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            )}
          </div>

          {/* Executions List */}
          {showExecutions && (
            <div className="max-h-96 overflow-y-auto">
              {isLoadingExecutions ? (
                <div className="p-8 text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Loading executions...</p>
                </div>
              ) : executions.length === 0 ? (
                <div className="p-8 text-center">
                  <Activity className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No executions yet</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {executions.map((execution) => (
                    <div
                      key={execution.id}
                      onClick={() => navigate(`/executions/${execution.id}`)}
                      className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getExecutionStatusIcon(execution.status)}
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium ${getExecutionStatusColor(
                              execution.status
                            )}`}
                          >
                            {execution.status}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(execution.startedAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="text-sm space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Started:</span>
                          <span className="font-medium">
                            {new Date(execution.startedAt).toLocaleTimeString()}
                          </span>
                        </div>
                        {execution.duration && (
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Duration:</span>
                            <span className="font-medium">{execution.duration}</span>
                          </div>
                        )}
                        {execution.status === 'running' && execution.progress !== undefined && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">{execution.progress}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-1.5">
                              <div
                                className="bg-primary h-1.5 rounded-full transition-all"
                                style={{ width: `${execution.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {execution.error && (
                        <div className="mt-2 text-xs text-red-600 dark:text-red-400 line-clamp-2">
                          {execution.error.message}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {executions.length > 0 && (
                <div className="p-3 border-t border-border text-center">
                  <button
                    onClick={() => navigate(`/executions?workflowId=${workflowId}`)}
                    className="text-sm text-primary hover:underline"
                  >
                    View all executions →
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

