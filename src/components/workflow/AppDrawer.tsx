import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  ChevronRight,
  Zap,
  Globe,
  Sparkles,
  MessageSquare,
  Database,
  Code,
  Calendar,
  Loader2,
} from "lucide-react";
import { Input } from "../common";
import {
  integrationSystemService,
  IntegrationDefinition,
  ActionDefinition,
  TriggerDefinition,
} from "../../services/integration-system.service";

interface AppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (
    integration: IntegrationDefinition,
    action: ActionDefinition
  ) => void;
  onSelectTrigger: (
    integration: IntegrationDefinition,
    trigger: TriggerDefinition
  ) => void;
}

export function AppDrawer({
  isOpen,
  onClose,
  onSelectAction,
  onSelectTrigger,
}: AppDrawerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [integrations, setIntegrations] = useState<IntegrationDefinition[]>([]);
  const [selectedIntegration, setSelectedIntegration] =
    useState<IntegrationDefinition | null>(null);
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: "all", label: "All", icon: Globe },
    { id: "communication", label: "Communication", icon: MessageSquare },
    { id: "productivity", label: "Productivity", icon: Zap },
    { id: "ai", label: "AI & ML", icon: Sparkles },
    { id: "database", label: "Database", icon: Database },
    { id: "development", label: "Development", icon: Code },
    { id: "calendar", label: "Calendar", icon: Calendar },
  ];

  const loadIntegrations = useCallback(async () => {
    try {
      setLoading(true);
      const response = await integrationSystemService.listCatalog({
        category: selectedCategory !== "all" ? selectedCategory : undefined,
        search: searchQuery || undefined,
      });
      setIntegrations(response.integrations);
    } catch (error) {
      console.error("Failed to load integrations:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    if (isOpen) {
      loadIntegrations();
    }
  }, [isOpen, loadIntegrations]);

  const handleIntegrationClick = (integration: IntegrationDefinition) => {
    setSelectedIntegration(integration);
  };

  const handleBack = () => {
    setSelectedIntegration(null);
  };

  const handleActionClick = (action: ActionDefinition) => {
    if (selectedIntegration) {
      onSelectAction(selectedIntegration, action);
      onClose();
    }
  };

  const handleTriggerClick = (trigger: TriggerDefinition) => {
    if (selectedIntegration) {
      onSelectTrigger(selectedIntegration, trigger);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-96 bg-card border-r border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  {selectedIntegration ? selectedIntegration.name : "Add Step"}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Search */}
              {!selectedIntegration && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search integrations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              )}
            </div>

            {/* Categories */}
            {!selectedIntegration && (
              <div className="px-4 py-3 border-b border-border overflow-x-auto">
                <div className="flex gap-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                          selectedCategory === category.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {category.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : selectedIntegration ? (
                <div className="p-4 space-y-4">
                  {/* Back Button */}
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 rotate-180" />
                    Back to integrations
                  </button>

                  {/* Integration Info */}
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                      {selectedIntegration.icon?.startsWith('http') ? (
                        <img
                          src={selectedIntegration.icon}
                          alt={selectedIntegration.name}
                          className="w-12 h-12 rounded object-contain"
                        />
                      ) : (
                        <span className="text-3xl">{selectedIntegration.icon}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {selectedIntegration.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedIntegration.description}
                      </p>
                    </div>
                  </div>

                  {/* Triggers */}
                  {selectedIntegration.triggers &&
                    selectedIntegration.triggers.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Triggers</h4>
                        <div className="space-y-2">
                          {selectedIntegration.triggers.map((trigger) => (
                            <button
                              key={trigger.key}
                              onClick={() => handleTriggerClick(trigger)}
                              className="w-full text-left p-3 bg-card border border-border rounded-lg hover:border-primary hover:shadow-sm transition-all"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <Zap className="h-4 w-4 text-primary" />
                                <span className="font-medium">
                                  {trigger.name}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {trigger.description}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Actions */}
                  {selectedIntegration.actions &&
                    selectedIntegration.actions.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Actions</h4>
                        <div className="space-y-2">
                          {selectedIntegration.actions.map((action) => (
                            <button
                              key={action.key}
                              onClick={() => handleActionClick(action)}
                              className="w-full text-left p-3 bg-card border border-border rounded-lg hover:border-primary hover:shadow-sm transition-all"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <Code className="h-4 w-4 text-blue-500" />
                                <span className="font-medium">
                                  {action.name}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {action.description}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              ) : (
                <div className="p-4 space-y-2">
                  {integrations.map((integration) => {
                    return (
                      <button
                        key={integration.id}
                        onClick={() => handleIntegrationClick(integration)}
                        className="w-full text-left p-4 bg-card border border-border rounded-lg hover:border-primary hover:shadow-sm transition-all group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 flex items-center justify-center">
                              {integration.icon?.startsWith('http') ? (
                                <img
                                  src={integration.icon}
                                  alt={integration.name}
                                  className="w-8 h-8 rounded object-contain"
                                />
                              ) : (
                                <span className="text-2xl">{integration.icon}</span>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium group-hover:text-primary transition-colors">
                                  {integration.name}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {integration.category}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </button>
                    );
                  })}

                  {integrations.length === 0 && !loading && (
                    <div className="text-center py-12">
                      <Search className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground">
                        No integrations found
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

