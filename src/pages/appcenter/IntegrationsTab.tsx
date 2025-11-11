import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/common';
import { 
  Search, 
  Filter,
  CheckCircle2,
  Globe,
  Sparkles,
  MessageSquare,
  Database,
  Code,
  Zap,
  Users
} from 'lucide-react';
import { integrationSystemService, IntegrationDefinition } from '../../services/integration-system.service';

export function IntegrationsTab() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [integrations, setIntegrations] = useState<IntegrationDefinition[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', label: 'All Apps', icon: Globe },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
    { id: 'productivity', label: 'Productivity', icon: Zap },
    { id: 'ai', label: 'AI & ML', icon: Sparkles },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'development', label: 'Development', icon: Code },
    { id: 'calendar', label: 'Calendar', icon: Users },
  ];

  const loadIntegrations = useCallback(async () => {
    try {
      setLoading(true);
      const response = await integrationSystemService.listCatalog({
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        search: searchQuery || undefined,
      });
      setIntegrations(response.integrations);
    } catch (error) {
      console.error('Failed to load integrations:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    loadIntegrations();
  }, [loadIntegrations]);

  const filteredApps = integrations;

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.icon || Globe;
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="flex-1">
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
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>

            <div className="ml-auto text-sm text-muted-foreground">
              {filteredApps.length} {filteredApps.length === 1 ? 'integration' : 'integrations'}
            </div>
          </div>
        </div>
      </div>

      {/* Apps Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-3"></div>
          <p className="text-muted-foreground">Loading integrations...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app, index) => {
            const CategoryIcon = getCategoryIcon(app.category);
            const actionCount = (app.actions?.length || 0) + (app.triggers?.length || 0);
            
            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigate(`/app/appcenter/integration/${app.id}`)}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all cursor-pointer group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                      {app.icon?.startsWith('http') ? (
                        <img
                          src={app.icon}
                          alt={app.name}
                          className="w-12 h-12 rounded object-contain"
                        />
                      ) : (
                        <span className="text-4xl">{app.icon}</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {app.name}
                        </h3>
                        {app.verified && (
                          <CheckCircle2 className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{app.category}</p>
                  </div>
                </div>
                {app.verified && (
                  <div className="px-2 py-1 bg-blue-500/10 rounded-md">
                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                  </div>
                )}
              </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {app.description}
                </p>

                {/* Category & Actions */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs">
                    <CategoryIcon className="h-3 w-3" />
                    {app.category}
                  </span>
                  <span className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-md text-xs font-medium">
                    {actionCount} {actionCount === 1 ? 'action' : 'actions'}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-1 text-sm">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="font-medium">{app.triggers?.length || 0} triggers</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Code className="h-4 w-4" />
                    <span>{app.actions?.length || 0} actions</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {filteredApps.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No integrations found matching your criteria</p>
        </div>
      )}
    </div>
  );
}

