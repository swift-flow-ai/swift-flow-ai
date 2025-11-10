import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/common';
import { 
  Search, 
  Filter,
  Star,
  Download,
  CheckCircle2,
  Globe,
  Sparkles,
  MessageSquare,
  Database,
  DollarSign,
  Code,
  Zap,
  Users
} from 'lucide-react';
import { appCenterApps } from '../../data/appCenterApps';

export function IntegrationsTab() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const categories = [
    { id: 'all', label: 'All Apps', icon: Globe },
    { id: 'ai', label: 'AI & ML', icon: Sparkles },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
    { id: 'crm', label: 'CRM', icon: Users },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'productivity', label: 'Productivity', icon: Zap },
    { id: 'finance', label: 'Finance', icon: DollarSign },
    { id: 'development', label: 'Development', icon: Code },
    { id: 'hr', label: 'HR', icon: Users },
  ];

  const filteredApps = appCenterApps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    const matchesPrice = selectedPrice === 'all' || app.price === selectedPrice;
    const matchesFeatured = !showFeaturedOnly || app.featured;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesFeatured;
  });

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

            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="all">All Pricing</option>
              <option value="free">Free</option>
              <option value="freemium">Freemium</option>
              <option value="paid">Paid</option>
            </select>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showFeaturedOnly}
                onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm">Featured only</span>
            </label>

            <div className="ml-auto text-sm text-muted-foreground">
              {filteredApps.length} {filteredApps.length === 1 ? 'app' : 'apps'}
            </div>
          </div>
        </div>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map((app, index) => {
          const CategoryIcon = getCategoryIcon(app.category);
          
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
                  <div className="text-4xl">{app.icon}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {app.name}
                      </h3>
                      {app.verified && (
                        <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{app.provider}</p>
                  </div>
                </div>
                {app.featured && (
                  <div className="px-2 py-1 bg-yellow-500/10 rounded-md">
                    <Star className="h-4 w-4 text-yellow-500" />
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {app.description}
              </p>

              {/* Category & Price */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-xs">
                  <CategoryIcon className="h-3 w-3" />
                  {app.category}
                </span>
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                  app.price === 'free' 
                    ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                    : app.price === 'freemium'
                    ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                    : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                }`}>
                  {app.price === 'free' ? 'Free' : app.price === 'freemium' ? 'Freemium' : 'Paid'}
                </span>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">{app.rating}</span>
                  <span className="text-muted-foreground">({app.reviews.toLocaleString()})</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Download className="h-4 w-4" />
                  {app.installs >= 1000 
                    ? `${(app.installs / 1000).toFixed(0)}K` 
                    : app.installs}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredApps.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No integrations found matching your criteria</p>
        </div>
      )}
    </div>
  );
}

