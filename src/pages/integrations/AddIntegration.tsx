import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { integrationService } from '../../services/integration.service';
import { IntegrationApp } from '../../types';
import { cn } from '../../utils';

export function AddIntegration() {
  const navigate = useNavigate();
  const [apps, setApps] = useState<IntegrationApp[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    loadApps();
  }, []);

  const loadApps = async () => {
    setIsLoading(true);
    try {
      const data = await integrationService.getIntegrationApps();
      setApps(data.apps);
    } catch (error) {
      console.error('Failed to load integration apps:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredApps = apps.filter((app) => {
    const matchesSearch = search
      ? app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.description.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesCategory = categoryFilter === 'all' || app.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(apps.map((app) => app.category)))];

  const getAuthTypeBadge = (authType: string) => {
    const colors: Record<string, string> = {
      oauth2: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      api_key: 'bg-green-500/10 text-green-600 dark:text-green-400',
      basic: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      custom: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
    };

    return (
      <span className={cn('px-2 py-0.5 rounded-md text-xs font-medium', colors[authType])}>
        {authType === 'oauth2' ? 'OAuth 2.0' : authType.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading available integrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/app/integrations')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Integrations
        </button>
        <h1 className="text-3xl font-bold tracking-tight">Add Integration</h1>
        <p className="text-muted-foreground mt-2">
          Connect your favorite apps and services
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search integrations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted border-0 focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap',
              categoryFilter === cat
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            {cat === 'all' ? 'All' : cat}
          </button>
        ))}
      </div>

      {/* Apps Grid */}
      {filteredApps.length === 0 ? (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No integrations found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/app/integrations/configure/${app.id}`)}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group"
            >
              {/* Icon & Name */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{app.icon}</span>
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {app.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">{app.category}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {app.description}
              </p>

              {/* Auth Type */}
              <div className="mb-4">
                {getAuthTypeBadge(app.authType)}
              </div>

              {/* Capabilities */}
              <div className="flex flex-wrap gap-1">
                {app.capabilities.slice(0, 3).map((cap) => (
                  <span
                    key={cap}
                    className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded"
                  >
                    {cap.replace('_', ' ')}
                  </span>
                ))}
                {app.capabilities.length > 3 && (
                  <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded">
                    +{app.capabilities.length - 3}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

