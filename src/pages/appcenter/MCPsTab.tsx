import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Input } from '../../components/common';
import { 
  Search, 
  Filter,
  Star,
  Download,
  Package,
  Settings,
  Trash2,
  Play,
  AlertCircle
} from 'lucide-react';
import { mockMCPAppCenter, mockInstalledMCPs } from '../../mocks/data/mcps';
import type { MCPServer, InstalledMCP } from '../../types/appcenter';

export function MCPsTab() {
  const [view, setView] = useState<'browse' | 'installed'>('installed');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'data-sources', label: 'Data Sources' },
    { id: 'tools', label: 'Tools' },
    { id: 'search', label: 'Search' },
    { id: 'actions', label: 'Actions' },
    { id: 'custom', label: 'Custom' },
  ];

  const filteredBrowse = mockMCPAppCenter.filter(mcp => {
    const matchesSearch = mcp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mcp.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || mcp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredInstalled = mockInstalledMCPs.filter(mcp => {
    const matchesSearch = mcp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mcp.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || mcp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInstallMCP = (mcp: MCPServer) => {
    console.log('Installing MCP:', mcp.name);
    // TODO: Implement actual installation
  };

  const handleTestMCP = (mcp: InstalledMCP) => {
    console.log('Testing MCP:', mcp.name);
    // TODO: Implement MCP testing
  };

  const handleUninstallMCP = (mcp: InstalledMCP) => {
    console.log('Uninstalling MCP:', mcp.name);
    // TODO: Implement uninstallation
  };

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex items-center gap-4">
        <div className="inline-flex rounded-lg border border-border p-1">
          <button
            onClick={() => setView('installed')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === 'installed'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Installed ({mockInstalledMCPs.length})
          </button>
          <button
            onClick={() => setView('browse')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              view === 'browse'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Browse ({mockMCPAppCenter.length})
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search MCPs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Category:</span>
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
          </div>
        </div>
      </div>

      {/* Content */}
      {view === 'installed' ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredInstalled.map((mcp, index) => (
            <motion.div
              key={mcp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="text-4xl">{mcp.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{mcp.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        mcp.status === 'active'
                          ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                          : mcp.status === 'inactive'
                          ? 'bg-gray-500/10 text-gray-600 dark:text-gray-400'
                          : 'bg-red-500/10 text-red-600 dark:text-red-400'
                      }`}>
                        {mcp.status}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-muted capitalize">
                        {mcp.provider}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{mcp.description}</p>
                    
                    {/* Capabilities */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {mcp.capabilities.slice(0, 3).map((cap) => (
                        <span
                          key={cap.id}
                          className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"
                        >
                          {cap.name}
                        </span>
                      ))}
                      {mcp.capabilities.length > 3 && (
                        <span className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground">
                          +{mcp.capabilities.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Used {mcp.usageCount} times</span>
                      {mcp.lastUsed && (
                        <span>Last used {new Date(mcp.lastUsed).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleTestMCP(mcp)}
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Test
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleUninstallMCP(mcp)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredInstalled.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground mb-4">No MCPs installed yet</p>
              <Button onClick={() => setView('browse')}>
                Browse App Center
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrowse.map((mcp, index) => (
            <motion.div
              key={mcp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{mcp.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{mcp.name}</h3>
                    <p className="text-xs text-muted-foreground">{mcp.author}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                  mcp.provider === 'official'
                    ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                    : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                }`}>
                  {mcp.provider}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {mcp.description}
              </p>

              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 bg-muted rounded-md text-xs capitalize">
                  {mcp.category.replace('-', ' ')}
                </span>
                {mcp.requiresAuth && (
                  <span className="px-2 py-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded-md text-xs flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Auth Required
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">{mcp.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Download className="h-4 w-4" />
                  {mcp.installCount && mcp.installCount >= 1000 
                    ? `${(mcp.installCount / 1000).toFixed(0)}K` 
                    : mcp.installCount}
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full mt-4"
                onClick={() => handleInstallMCP(mcp)}
              >
                <Download className="h-4 w-4 mr-2" />
                Install MCP
              </Button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

