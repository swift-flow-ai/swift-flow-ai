import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Star,
  Users,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import { templateService } from '../../services/template.service';
import { WorkflowTemplate } from '../../types';
import { cn } from '../../utils';
import { Container, EmptyState } from '@/design-system/components';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { Badge } from '@/components/common/Badge';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export function TemplatesPage() {
  const [templates, setTemplates] = useState<WorkflowTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const loadTemplates = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: Record<string, string | boolean> = {};
      if (categoryFilter !== 'all') {
        params.category = categoryFilter;
      }
      if (showFeaturedOnly) {
        params.featured = true;
      }

      const data = await templateService.getTemplates(params);
      setTemplates(data.templates);
    } catch (error) {
      console.error('Failed to load templates:', error);
    } finally {
      setIsLoading(false);
    }
  }, [categoryFilter, showFeaturedOnly]);

  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  const filteredTemplates = templates.filter((template) =>
    search
      ? template.name.toLowerCase().includes(search.toLowerCase()) ||
        template.description.toLowerCase().includes(search.toLowerCase()) ||
        template.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
      : true
  );

  const categories = [
    { value: 'all', label: 'All Templates', count: templates.length },
    { value: 'hr', label: 'HR', count: templates.filter((t) => t.category === 'hr').length },
    { value: 'finance', label: 'Finance', count: templates.filter((t) => t.category === 'finance').length },
    { value: 'sales', label: 'Sales', count: templates.filter((t) => t.category === 'sales').length },
    { value: 'support', label: 'Support', count: templates.filter((t) => t.category === 'support').length },
    { value: 'operations', label: 'Operations', count: templates.filter((t) => t.category === 'operations').length },
  ];

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
      <Container size="lg">
        <div className="flex items-center justify-center h-96">
          <LoadingSpinner size="lg" />
        </div>
      </Container>
    );
  }

  return (
    <Container size="lg" className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Workflow Templates</h1>
        <p className="text-muted-foreground mt-2">
          Pre-built workflows to get started quickly. Customize to fit your needs.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search templates by name, description, or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>

        <Button
          onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
          variant={showFeaturedOnly ? 'primary' : 'ghost'}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Featured Only
        </Button>
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        {categories.map((cat) => (
          <Button
            key={cat.value}
            onClick={() => setCategoryFilter(cat.value)}
            variant={categoryFilter === cat.value ? 'primary' : 'ghost'}
            size="sm"
            className="whitespace-nowrap"
          >
            {cat.label}
            {categoryFilter === cat.value && cat.count > 0 && (
              <Badge variant="info" className="ml-2">
                {cat.count}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No templates found"
          description="Try adjusting your search or filters"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                padding="none"
                variant="default"
                hover
                onClick={() => window.location.href = `/app/templates/${template.id}`}
                className="overflow-hidden group cursor-pointer"
              >
                {/* Thumbnail */}
                {template.thumbnail ? (
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {template.featured && (
                      <div className="absolute top-3 right-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-md flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        Featured
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-6xl">{template.icon}</span>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                        {template.name}
                      </h3>
                      <span
                        className={cn(
                          'inline-flex px-2 py-0.5 rounded-md text-xs font-medium',
                          getCategoryColor(template.category)
                        )}
                      >
                        {template.category}
                      </span>
                    </div>
                    {template.verified && (
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {template.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{template.usageCount.toLocaleString()} uses</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      <span>{template.rating}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  {template.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-4">
                      {template.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {template.tags.length > 3 && (
                        <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded">
                          +{template.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </Container>
  );
}

