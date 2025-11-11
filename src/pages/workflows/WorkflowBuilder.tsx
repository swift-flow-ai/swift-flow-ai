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
import { AppDrawer } from '../../components/workflow/AppDrawer';
import { ConfigPanel } from '../../components/workflow/ConfigPanel';
import { workflowService } from '../../services/workflow.service';
import { templateService } from '../../services/template.service';
import { useWorkspace } from '../../hooks/useWorkspace';
import { IntegrationDefinition, ActionDefinition, TriggerDefinition } from '../../services/integration-system.service';

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
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [workflowName, setWorkflowName] = useState('Untitled Workflow');
  const [showSaveAsTemplate, setShowSaveAsTemplate] = useState(false);
  const [showAppDrawer, setShowAppDrawer] = useState(false);
  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<IntegrationDefinition | null>(null);
  const [selectedAction, setSelectedAction] = useState<ActionDefinition | null>(null);
  const [configNodeId, setConfigNodeId] = useState<string | undefined>(undefined);
  const [templateData, setTemplateData] = useState({
    name: '',
    description: '',
    category: 'custom',
    tags: '',
    isPublic: false,
  });
  const [isSavingTemplate, setIsSavingTemplate] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Load existing workflow if editing
  const loadWorkflow = useCallback(async () => {
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
    // setNodes and setEdges are stable functions from useNodesState/useEdgesState
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workflowId, currentWorkspace]);

  useEffect(() => {
    if (workflowId && currentWorkspace) {
      loadWorkflow();
    }
  }, [workflowId, currentWorkspace, loadWorkflow]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(async (_: React.MouseEvent, node: Node) => {
    // If it's an action node with integration data, open config panel
    if (node.type === 'action' && node.data.integrationId && node.data.actionKey) {
      try {
        // Fetch the integration and action definitions
        const { integrationSystemService } = await import('../../services/integration-system.service');
        const integration = await integrationSystemService.getIntegration(node.data.integrationId);
        const action = await integrationSystemService.getAction(node.data.integrationId, node.data.actionKey);
        
        setSelectedIntegration(integration);
        setSelectedAction(action);
        setConfigNodeId(node.id);
        setShowConfigPanel(true);
      } catch (error) {
        console.error('Failed to load integration/action:', error);
      }
    }
  }, []);

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
      setToast({ message: 'Please save the workflow first before creating a template', type: 'info' });
      setTimeout(() => setToast(null), 3000);
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
      setToast({ message: 'Template created successfully!', type: 'success' });
      setTimeout(() => setToast(null), 3000);
    } catch (error) {
      console.error('Failed to save as template:', error);
      setToast({ message: 'Failed to create template', type: 'error' });
      setTimeout(() => setToast(null), 3000);
    } finally {
      setIsSavingTemplate(false);
    }
  };

  const handleSelectAction = (integration: IntegrationDefinition, action: ActionDefinition) => {
    setSelectedIntegration(integration);
    setSelectedAction(action);
    setShowAppDrawer(false);
    setShowConfigPanel(true);
  };

  const handleSelectTrigger = (integration: IntegrationDefinition, trigger: TriggerDefinition) => {
    // Add trigger node directly
    const newNode: Node = {
      id: `${Date.now()}`,
      type: 'trigger',
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 200 },
      data: {
        label: trigger.name,
        description: trigger.description,
        integrationId: integration.id,
        triggerKey: trigger.key,
        triggerType: trigger.type,
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setShowAppDrawer(false);
  };

  const handleSaveConfig = (config: {
    integrationId: string;
    actionKey: string;
    installedAppId: string;
    config: Record<string, unknown>;
  }) => {
    const newNode: Node = {
      id: configNodeId || `${Date.now()}`,
      type: 'action',
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 200 },
      data: {
        label: selectedAction?.name || 'Action',
        description: selectedAction?.description,
        integrationId: config.integrationId,
        actionKey: config.actionKey,
        installedAppId: config.installedAppId,
        config: config.config,
      },
    };

    if (configNodeId) {
      // Update existing node
      setNodes((nds) => nds.map((n) => (n.id === configNodeId ? newNode : n)));
    } else {
      // Add new node
      setNodes((nds) => [...nds, newNode]);
    }

    setShowConfigPanel(false);
    setConfigNodeId(undefined);
    setSelectedIntegration(null);
    setSelectedAction(null);
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
            onClick={() => setShowAppDrawer(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Step
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

      {/* Toast Notification */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div
            className={`px-4 py-3 rounded-lg shadow-lg border ${
              toast.type === 'success'
                ? 'bg-green-500/10 border-green-500/20 text-green-600'
                : toast.type === 'error'
                ? 'bg-red-500/10 border-red-500/20 text-red-600'
                : 'bg-blue-500/10 border-blue-500/20 text-blue-600'
            }`}
          >
            {toast.message}
          </div>
        </motion.div>
      )}

      {/* App Drawer */}
      <AppDrawer
        isOpen={showAppDrawer}
        onClose={() => setShowAppDrawer(false)}
        onSelectAction={handleSelectAction}
        onSelectTrigger={handleSelectTrigger}
      />

      {/* Config Panel */}
      {showConfigPanel && selectedIntegration && selectedAction && (
        <ConfigPanel
          isOpen={showConfigPanel}
          onClose={() => {
            setShowConfigPanel(false);
            setSelectedIntegration(null);
            setSelectedAction(null);
            setConfigNodeId(undefined);
          }}
          integrationId={selectedIntegration.id}
          actionKey={selectedAction.key}
          nodeId={configNodeId}
          initialConfig={
            configNodeId
              ? nodes.find((n) => n.id === configNodeId)?.data.config
              : undefined
          }
          initialInstalledAppId={
            configNodeId
              ? nodes.find((n) => n.id === configNodeId)?.data.installedAppId
              : undefined
          }
          onSave={handleSaveConfig}
        />
      )}
    </div>
  );
}

