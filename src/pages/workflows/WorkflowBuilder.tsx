import { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  MiniMap,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/common';
import {
  Save,
  Play,
  Plus,
  ArrowLeft,
  Zap,
  Eye,
  BookmarkPlus,
} from 'lucide-react';
import { TriggerNode } from '../../components/workflow/nodes/TriggerNode';
import { ActionNode } from '../../components/workflow/nodes/ActionNode';
import { ConditionNode } from '../../components/workflow/nodes/ConditionNode';
import { ApprovalNode } from '../../components/workflow/nodes/ApprovalNode';
import { NodePalette } from '../../components/workflow/NodePalette';
import { workflowService } from '../../services/workflow.service';
import { templateService } from '../../services/template.service';
import { useWorkspace } from '../../hooks/useWorkspace';

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
  approval: ApprovalNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 250, y: 50 },
    data: { 
      label: 'Manual Trigger',
      description: 'Start workflow manually',
      triggerType: 'manual',
      config: { 
        allowedUsers: [],
        requireApproval: false
      }
    },
  },
];

const initialEdges: Edge[] = [];

export function WorkflowBuilder() {
  const { workflowId } = useParams<{ workflowId: string }>();
  const navigate = useNavigate();
  const { currentWorkspace } = useWorkspace();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [workflowName, setWorkflowName] = useState('Untitled Workflow');
  const [showPalette, setShowPalette] = useState(true);
  const [showSaveAsTemplate, setShowSaveAsTemplate] = useState(false);
  const [templateData, setTemplateData] = useState({
    name: '',
    description: '',
    category: 'custom',
    tags: '',
    isPublic: false,
  });
  const [isSavingTemplate, setIsSavingTemplate] = useState(false);

  // Load existing workflow if editing
  useEffect(() => {
    if (workflowId && currentWorkspace) {
      loadWorkflow();
    }
  }, [workflowId, currentWorkspace]);

  const loadWorkflow = async () => {
    if (!workflowId || !currentWorkspace) return;
    
    setIsLoading(true);
    try {
      const data = await workflowService.getWorkflow(currentWorkspace.id, workflowId);
      setWorkflowName(data.name);
      
      // Load workflow definition
      if (data.definition) {
        setNodes((data.definition.nodes as Node[]) || initialNodes);
        setEdges((data.definition.edges as Edge[]) || initialEdges);
      }
    } catch (error) {
      console.error('Failed to load workflow:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const addNode = useCallback((type: string, nodeData: Record<string, unknown>) => {
    const newNode: Node = {
      id: `${Date.now()}`,
      type,
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 200 },
      data: nodeData,
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    // In real app, would save to backend here
    console.log('Workflow saved:', { name: workflowName, nodes, edges });
  };

  const handleTest = () => {
    console.log('Testing workflow...');
    // In real app, would trigger test execution
  };

  const handleDeploy = () => {
    console.log('Deploying workflow...');
    // In real app, would deploy workflow
  };

  const handlePreview = () => {
    if (workflowId) {
      navigate(`/app/workflows/${workflowId}`);
    }
  };

  const handleSaveAsTemplate = async () => {
    if (!workflowId || !currentWorkspace) {
      alert('Please save the workflow first before creating a template');
      return;
    }

    setIsSavingTemplate(true);
    try {
      const tags = templateData.tags.split(',').map((t) => t.trim()).filter(Boolean);
      await templateService.saveAsTemplate(currentWorkspace.id, workflowId, {
        name: templateData.name,
        description: templateData.description,
        category: templateData.category,
        tags,
        isPublic: templateData.isPublic,
      });
      setShowSaveAsTemplate(false);
      alert('Template created successfully!');
    } catch (error) {
      console.error('Failed to save as template:', error);
      alert('Failed to create template');
    } finally {
      setIsSavingTemplate(false);
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

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/app/workflows')}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <input
              type="text"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              className="text-xl font-bold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary rounded px-2"
            />
            <p className="text-sm text-muted-foreground mt-1">
              {nodes.length} nodes • {edges.length} connections
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => setShowPalette(!showPalette)}
          >
            <Plus className="h-4 w-4 mr-2" />
            {showPalette ? 'Hide' : 'Show'} Palette
          </Button>
          {workflowId && (
            <>
              <Button variant="secondary" onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="secondary" onClick={() => setShowSaveAsTemplate(true)}>
                <BookmarkPlus className="h-4 w-4 mr-2" />
                Save as Template
              </Button>
            </>
          )}
          <Button variant="secondary" onClick={handleTest}>
            <Play className="h-4 w-4 mr-2" />
            Test
          </Button>
          <Button variant="primary" onClick={handleSave} isLoading={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="primary" onClick={handleDeploy}>
            <Zap className="h-4 w-4 mr-2" />
            Deploy
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex relative">
        {/* Node Palette */}
        {showPalette && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-80 bg-card border-r border-border overflow-y-auto"
          >
            <NodePalette onAddNode={addNode} />
          </motion.div>
        )}

        {/* Canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            className="bg-background"
          >
            <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
            <Controls />
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
            
            {/* Instructions Panel */}
            {nodes.length === 1 && (
              <Panel position="top-center">
                <div className="bg-card border border-border rounded-lg p-4 shadow-xl max-w-md">
                  <p className="text-sm font-medium mb-2">Get Started</p>
                  <p className="text-xs text-muted-foreground">
                    Drag nodes from the palette to build your workflow. Connect them by dragging from one node's handle to another.
                  </p>
                </div>
              </Panel>
            )}
          </ReactFlow>
        </div>

        {/* Properties Panel */}
        {selectedNode && (
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            className="w-96 bg-card border-l border-border overflow-y-auto p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Node Properties</h3>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
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
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={selectedNode.data.label}
                  onChange={(e) => {
                    setNodes((nds) =>
                      nds.map((node) =>
                        node.id === selectedNode.id
                          ? { ...node, data: { ...node.data, label: e.target.value } }
                          : node
                      )
                    );
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={selectedNode.data.description || ''}
                  onChange={(e) => {
                    setNodes((nds) =>
                      nds.map((node) =>
                        node.id === selectedNode.id
                          ? { ...node, data: { ...node.data, description: e.target.value } }
                          : node
                      )
                    );
                  }}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              {/* Configuration based on node type */}
              {selectedNode.type === 'trigger' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Trigger Type</label>
                    <select 
                      value={selectedNode.data.triggerType || 'manual'}
                      onChange={(e) => {
                        setNodes((nds) =>
                          nds.map((node) =>
                            node.id === selectedNode.id
                              ? { ...node, data: { ...node.data, triggerType: e.target.value } }
                              : node
                          )
                        );
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="manual">Manual (by users)</option>
                      <option value="webhook">Webhook (HTTP)</option>
                      <option value="workflow_complete">After Workflow Completes</option>
                      <option value="schedule">Schedule (Cron)</option>
                      <option value="email">Email Received</option>
                    </select>
                  </div>

                  {selectedNode.data.triggerType === 'manual' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Allowed Users</label>
                      <input
                        type="text"
                        placeholder="user@example.com, user2@example.com"
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Leave empty to allow all workspace members
                      </p>
                    </div>
                  )}

                  {selectedNode.data.triggerType === 'webhook' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">HTTP Method</label>
                        <select className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                          <option value="POST">POST</option>
                          <option value="GET">GET</option>
                          <option value="PUT">PUT</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Webhook URL</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value="/webhooks/my-workflow"
                            readOnly
                            className="flex-1 px-3 py-2 rounded-lg border border-border bg-muted text-foreground"
                          />
                          <Button variant="secondary" className="whitespace-nowrap">
                            Copy
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Full URL: https://api.swiftflow.ai/webhooks/my-workflow
                        </p>
                      </div>
                    </>
                  )}

                  {selectedNode.data.triggerType === 'workflow_complete' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Source Workflow</label>
                      <select className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="">Select a workflow...</option>
                        <option value="wf_1">Employee Onboarding</option>
                        <option value="wf_2">Customer Onboarding</option>
                        <option value="wf_3">Invoice Processing</option>
                      </select>
                      <p className="text-xs text-muted-foreground mt-1">
                        This workflow will start when the selected workflow completes
                      </p>
                    </div>
                  )}

                  {selectedNode.data.triggerType === 'schedule' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Schedule Type</label>
                        <select className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                          <option value="cron">Cron Expression</option>
                          <option value="interval">Interval</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Cron Expression</label>
                        <input
                          type="text"
                          placeholder="0 9 * * 1-5"
                          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Example: Every weekday at 9 AM
                        </p>
                      </div>
                    </>
                  )}
                </>
              )}

              {selectedNode.type === 'action' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Select App</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="">Select an app...</option>
                    <option value="slack">Slack</option>
                    <option value="gmail">Gmail</option>
                    <option value="salesforce">Salesforce</option>
                    <option value="github">GitHub</option>
                  </select>
                </div>
              )}

              {selectedNode.type === 'approval' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Approvers</label>
                  <input
                    type="text"
                    placeholder="email@example.com"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              )}

              {/* Delete Button */}
              <div className="pt-4 border-t border-border">
                <Button
                  variant="danger"
                  onClick={() => {
                    setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
                    setEdges((eds) => eds.filter((e) => e.source !== selectedNode.id && e.target !== selectedNode.id));
                    setSelectedNode(null);
                  }}
                  className="w-full"
                >
                  Delete Node
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Save as Template Dialog */}
      {showSaveAsTemplate && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-4">Save as Template</h2>
            <p className="text-muted-foreground mb-6">
              Make this workflow available as a template for others to use
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Template Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={templateData.name}
                  onChange={(e) => setTemplateData({ ...templateData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter template name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description <span className="text-destructive">*</span>
                </label>
                <textarea
                  value={templateData.description}
                  onChange={(e) => setTemplateData({ ...templateData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Describe what this template does..."
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={templateData.category}
                  onChange={(e) => setTemplateData({ ...templateData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="custom">Custom</option>
                  <option value="hr">HR</option>
                  <option value="finance">Finance</option>
                  <option value="sales">Sales</option>
                  <option value="support">Support</option>
                  <option value="operations">Operations</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <input
                  type="text"
                  value={templateData.tags}
                  onChange={(e) => setTemplateData({ ...templateData, tags: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="automation, approval, onboarding (comma-separated)"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={templateData.isPublic}
                  onChange={(e) => setTemplateData({ ...templateData, isPublic: e.target.checked })}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-primary"
                />
                <label htmlFor="isPublic" className="text-sm font-medium">
                  Make this template public (visible to all users)
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="secondary"
                onClick={() => setShowSaveAsTemplate(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSaveAsTemplate}
                isLoading={isSavingTemplate}
                className="flex-1"
              >
                <BookmarkPlus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

