import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Play, GitBranch, CheckSquare, Clock } from 'lucide-react';
import { IntegrationDefinition } from '../../services/integration-system.service';

interface AddNodeButtonProps {
  position: { x: number; y: number };
  onAddNode: (type: string, integration?: IntegrationDefinition) => void;
  integrations?: IntegrationDefinition[];
  visible?: boolean;
}

export function AddNodeButton({
  position,
  onAddNode,
  integrations = [],
  visible = true,
}: AddNodeButtonProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [search, setSearch] = useState('');

  const nodeTypes = [
    {
      type: 'action',
      label: 'Action',
      icon: Play,
      description: 'Add an integration action',
      color: 'purple',
      needsIntegration: true,
    },
    {
      type: 'condition',
      label: 'Condition',
      icon: GitBranch,
      description: 'Add if/else branching',
      color: 'yellow',
      needsIntegration: false,
    },
    {
      type: 'approval',
      label: 'Approval',
      icon: CheckSquare,
      description: 'Add human approval step',
      color: 'green',
      needsIntegration: false,
    },
    {
      type: 'delay',
      label: 'Delay',
      icon: Clock,
      description: 'Wait before continuing',
      color: 'blue',
      needsIntegration: false,
    },
  ];

  const filteredIntegrations = integrations.filter(
    (int) =>
      int.name.toLowerCase().includes(search.toLowerCase()) ||
      int.description.toLowerCase().includes(search.toLowerCase())
  );

  if (!visible) return null;

  return (
    <div
      className="absolute z-10"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Add Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowPicker(!showPicker)}
        className="w-8 h-8 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
      >
        <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" />
      </motion.button>

      {/* Picker Modal */}
      <AnimatePresence>
        {showPicker && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40 bg-black/20"
              onClick={() => setShowPicker(false)}
            />

            {/* Picker */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-card border border-border rounded-lg shadow-2xl w-[600px] max-h-[600px] overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-border">
                <h3 className="text-lg font-semibold mb-3">Add Step</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search integrations..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    autoFocus
                  />
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[500px]">
                {/* Quick Actions */}
                {!search && (
                  <div className="p-4 border-b border-border">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">
                      Quick Add
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {nodeTypes.map((nodeType) => (
                        <button
                          key={nodeType.type}
                          onClick={() => {
                            if (!nodeType.needsIntegration) {
                              onAddNode(nodeType.type);
                              setShowPicker(false);
                            }
                          }}
                          className={`p-3 rounded-lg border border-border hover:border-${nodeType.color}-500 hover:bg-${nodeType.color}-500/5 transition-all text-left group`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg bg-${nodeType.color}-500/10 flex items-center justify-center`}
                            >
                              <nodeType.icon
                                className={`h-5 w-5 text-${nodeType.color}-500`}
                              />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold">
                                {nodeType.label}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {nodeType.description}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Integrations */}
                <div className="p-4">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">
                    {search ? 'Search Results' : 'All Integrations'}
                  </h4>
                  <div className="space-y-2">
                    {filteredIntegrations.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <p className="text-sm">No integrations found</p>
                      </div>
                    ) : (
                      filteredIntegrations.map((integration) => (
                        <button
                          key={integration.id}
                          onClick={() => {
                            onAddNode('action', integration);
                            setShowPicker(false);
                            setSearch('');
                          }}
                          className="w-full p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
                        >
                          <div className="flex items-center gap-3">
                            {integration.icon && (
                              <img
                                src={integration.icon}
                                alt={integration.name}
                                className="w-10 h-10 rounded-lg"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            )}
                            <div className="flex-1">
                              <div className="text-sm font-semibold">
                                {integration.displayName || integration.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {integration.description}
                              </div>
                            </div>
                            {integration.verified && (
                              <div className="text-xs text-primary">
                                Verified
                              </div>
                            )}
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

