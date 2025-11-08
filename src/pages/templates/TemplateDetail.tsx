import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Star,
  Users,
  CheckCircle,
  Sparkles,
  Play,
  Download,
} from 'lucide-react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { templateService } from '../../services/template.service';
import { useWorkspace } from '../../hooks/useWorkspace';
import { WorkflowTemplate } from '../../types';
import { Button } from '../../components/common';
import { TriggerNode } from '../../components/workflow/nodes/TriggerNode';
import { ActionNode } from '../../components/workflow/nodes/ActionNode';
import { ConditionNode } from '../../components/workflow/nodes/ConditionNode';
import { ApprovalNode } from '../../components/workflow/nodes/ApprovalNode';
import { cn } from '../../utils';

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
  approval: ApprovalNode,
};

export function TemplateDetail() {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const { currentWorkspace } = useWorkspace();
  const [template, setTemplate] = useState<WorkflowTemplate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showUseDialog, setShowUseDialog] = useState(false);
  const [workflowName, setWorkflowName] = useState('');
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (templateId) {
      loadTemplate();
    }
  }, [templateId]);

  const loadTemplate = async () => {
    if (!templateId) return;

    setIsLoading(true);
    try {
      const data = await templateService.getTemplate(templateId);
      setTemplate(data);
      setWorkflowName(data.name);
      
      // Initialize variables with default values
      const initialVars: Record<string, string> = {};
      data.variables.forEach((v) => {
        if (v.defaultValue) {
          initialVars[v.key] = v.defaultValue;
        }
      });
      setVariables(initialVars);
    } catch (error) {
      console.error('Failed to load template:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseTemplate = async () => {
    if (!template || !currentWorkspace) return;

    setIsCreating(true);
    try {
      const result = await templateService.useTemplate(currentWorkspace.id, template.id, {
        name: workflowName,
        variables,
      });
      navigate(`/workflows/${result.workflowId}/edit`);
    } catch (error) {
      console.error('Failed to create workflow from template:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      hr: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      finance: 'bg-green-500/10 text-green-600 dark:text-green-400',
      sales: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      support: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
      operations: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
    };
    return colors[category] || 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading template...</p>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">Template not found</h3>
        <Button onClick={() => navigate('/app/templates')}>Back to Templates</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/app/templates')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Templates
        </button>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {template.icon && <span className="text-4xl">{template.icon}</span>}
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold tracking-tight">{template.name}</h1>
                  {template.verified && (
                    <CheckCircle className="h-6 w-6 text-primary" title="Verified template" />
                  )}
                  {template.featured && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-md">
                      <Sparkles className="h-3 w-3" />
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <span
                    className={cn(
                      'inline-flex px-2 py-1 rounded-md text-sm font-medium',
                      getCategoryColor(template.category)
                    )}
                  >
                    {template.category}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{template.usageCount.toLocaleString()} uses</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span>{template.rating} rating</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground mt-4">{template.description}</p>
          </div>

          <Button variant="primary" onClick={() => setShowUseDialog(true)} className="ml-4">
            <Play className="h-4 w-4 mr-2" />
            Use Template
          </Button>
        </div>
      </div>

      {/* Tags */}
      {template.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {template.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-lg"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Workflow Preview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Workflow Preview</h3>
        <div className="h-96 bg-background rounded-lg border border-border">
          <ReactFlow
            nodes={template.definition.nodes}
            edges={template.definition.edges}
            nodeTypes={nodeTypes}
            fitView
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
          >
            <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
            <Controls showInteractive={false} />
            <MiniMap />
          </ReactFlow>
        </div>
      </div>

      {/* Use Template Dialog */}
      {showUseDialog && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-4">Create Workflow from Template</h2>
            <p className="text-muted-foreground mb-6">
              Customize the template to fit your needs
            </p>

            <div className="space-y-4">
              {/* Workflow Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Workflow Name</label>
                <input
                  type="text"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter workflow name"
                />
              </div>

              {/* Template Variables */}
              {template.variables.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold mt-6 mb-4">Configuration</h3>
                  {template.variables.map((variable) => (
                    <div key={variable.key}>
                      <label className="block text-sm font-medium mb-2">
                        {variable.label}
                        {variable.required && <span className="text-destructive ml-1">*</span>}
                      </label>
                      {variable.type === 'select' ? (
                        <select
                          value={variables[variable.key] || ''}
                          onChange={(e) =>
                            setVariables({ ...variables, [variable.key]: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          required={variable.required}
                        >
                          <option value="">Select...</option>
                          {variable.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={variable.type}
                          value={variables[variable.key] || ''}
                          onChange={(e) =>
                            setVariables({ ...variables, [variable.key]: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder={`Enter ${variable.label.toLowerCase()}`}
                          required={variable.required}
                        />
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="secondary"
                onClick={() => setShowUseDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleUseTemplate}
                isLoading={isCreating}
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                Create Workflow
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

