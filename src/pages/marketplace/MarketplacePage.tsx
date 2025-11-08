import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/common';
import { 
  Search, 
  Filter,
  Star,
  Download,
  Zap,
  MessageSquare,
  Database,
  DollarSign,
  Code,
  Globe,
  Sparkles,
  CheckCircle2,
  Users
} from 'lucide-react';

export interface MarketplaceApp {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  category: 'communication' | 'crm' | 'database' | 'ai' | 'productivity' | 'finance' | 'hr' | 'utilities' | 'development';
  provider: string;
  rating: number;
  reviews: number;
  installs: number;
  price: 'free' | 'paid' | 'freemium';
  priceDetails?: string;
  featured: boolean;
  verified: boolean;
  capabilities: string[];
  integrationMethods: ('api' | 'webhook' | 'oauth' | 'mcp')[];
  version: string;
  lastUpdated: string;
  website?: string;
  documentation?: string;
  supportEmail?: string;
  screenshots?: string[];
  videoUrl?: string;
}

// Mock marketplace apps
export const marketplaceApps: MarketplaceApp[] = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send messages, create channels, and manage your Slack workspace',
    longDescription: 'Connect your workflows to Slack and automate team communication. Send notifications, create channels, manage users, and get real-time updates from your workflows.',
    icon: '💬',
    category: 'communication',
    provider: 'Slack Technologies',
    rating: 4.9,
    reviews: 15420,
    installs: 125000,
    price: 'free',
    featured: true,
    verified: true,
    capabilities: [
      'Send messages to channels',
      'Send direct messages',
      'Create and manage channels',
      'Upload files',
      'Manage users',
      'Get channel history',
      'Post threaded messages',
      'React to messages'
    ],
    integrationMethods: ['api', 'webhook', 'oauth'],
    version: '2.5.0',
    lastUpdated: '2025-11-01',
    website: 'https://slack.com',
    documentation: 'https://api.slack.com/docs',
  },
  {
    id: 'openai',
    name: 'OpenAI GPT-4',
    description: 'Powerful AI language model for text generation, analysis, and more',
    longDescription: 'Integrate OpenAI GPT-4 into your workflows for advanced text generation, summarization, translation, code generation, and intelligent decision-making. Perfect for automating content creation and data analysis.',
    icon: '🤖',
    category: 'ai',
    provider: 'OpenAI',
    rating: 4.8,
    reviews: 8920,
    installs: 89000,
    price: 'paid',
    priceDetails: 'Pay per token usage',
    featured: true,
    verified: true,
    capabilities: [
      'Text generation',
      'Code generation',
      'Summarization',
      'Translation',
      'Question answering',
      'Sentiment analysis',
      'Content moderation',
      'Function calling'
    ],
    integrationMethods: ['api'],
    version: '4.0.1',
    lastUpdated: '2025-10-28',
    website: 'https://openai.com',
    documentation: 'https://platform.openai.com/docs',
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'CRM platform for managing leads, contacts, and opportunities',
    longDescription: 'Seamlessly integrate Salesforce CRM with your workflows. Automatically create leads, update opportunities, manage contacts, and sync data between your systems.',
    icon: '☁️',
    category: 'crm',
    provider: 'Salesforce',
    rating: 4.6,
    reviews: 12340,
    installs: 78000,
    price: 'free',
    featured: true,
    verified: true,
    capabilities: [
      'Create and update leads',
      'Manage contacts',
      'Update opportunities',
      'Create tasks and events',
      'Query records',
      'Bulk operations',
      'Custom object support',
      'Apex integration'
    ],
    integrationMethods: ['api', 'oauth'],
    version: '3.2.1',
    lastUpdated: '2025-10-25',
    website: 'https://salesforce.com',
    documentation: 'https://developer.salesforce.com/docs',
  },
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Send and manage emails through Gmail',
    longDescription: 'Automate your email workflows with Gmail integration. Send emails, manage labels, search messages, and handle attachments directly from your workflows.',
    icon: '📧',
    category: 'communication',
    provider: 'Google',
    rating: 4.7,
    reviews: 18920,
    installs: 156000,
    price: 'free',
    featured: true,
    verified: true,
    capabilities: [
      'Send emails',
      'Read emails',
      'Search messages',
      'Manage labels',
      'Handle attachments',
      'Create drafts',
      'Mark as read/unread',
      'Archive messages'
    ],
    integrationMethods: ['api', 'oauth'],
    version: '2.8.0',
    lastUpdated: '2025-11-05',
    website: 'https://gmail.com',
    documentation: 'https://developers.google.com/gmail/api',
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    description: 'Connect and query PostgreSQL databases',
    longDescription: 'Execute SQL queries, manage data, and integrate PostgreSQL databases into your workflows. Perfect for data validation, reporting, and automated database operations.',
    icon: '🐘',
    category: 'database',
    provider: 'PostgreSQL Global Development Group',
    rating: 4.8,
    reviews: 5420,
    installs: 45000,
    price: 'free',
    featured: false,
    verified: true,
    capabilities: [
      'Execute SQL queries',
      'Insert/Update/Delete records',
      'Transactions support',
      'Stored procedures',
      'Connection pooling',
      'Batch operations',
      'JSON data support',
      'Full-text search'
    ],
    integrationMethods: ['api'],
    version: '1.5.2',
    lastUpdated: '2025-10-20',
    documentation: 'https://www.postgresql.org/docs/',
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payment processing and billing automation',
    longDescription: 'Process payments, manage subscriptions, and handle billing operations. Automate payment workflows, send invoices, and manage customer payment data securely.',
    icon: '💳',
    category: 'finance',
    provider: 'Stripe',
    rating: 4.9,
    reviews: 9870,
    installs: 67000,
    price: 'free',
    featured: true,
    verified: true,
    capabilities: [
      'Process payments',
      'Create customers',
      'Manage subscriptions',
      'Send invoices',
      'Handle refunds',
      'Payment links',
      'Webhook events',
      'Payment analytics'
    ],
    integrationMethods: ['api', 'webhook', 'oauth'],
    version: '4.1.0',
    lastUpdated: '2025-11-02',
    website: 'https://stripe.com',
    documentation: 'https://stripe.com/docs/api',
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Manage repositories, issues, and pull requests',
    longDescription: 'Integrate GitHub into your development workflows. Create issues, manage pull requests, trigger actions, and automate your software development lifecycle.',
    icon: '🐙',
    category: 'development',
    provider: 'GitHub',
    rating: 4.8,
    reviews: 11240,
    installs: 92000,
    price: 'free',
    featured: true,
    verified: true,
    capabilities: [
      'Create and update issues',
      'Manage pull requests',
      'Trigger workflows',
      'Manage repositories',
      'Handle webhooks',
      'Code search',
      'Release management',
      'Branch protection'
    ],
    integrationMethods: ['api', 'webhook', 'oauth'],
    version: '3.4.2',
    lastUpdated: '2025-10-30',
    website: 'https://github.com',
    documentation: 'https://docs.github.com/rest',
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Create and manage Notion pages and databases',
    longDescription: 'Connect Notion to your workflows to automate documentation, knowledge management, and team collaboration. Create pages, update databases, and sync content automatically.',
    icon: '📝',
    category: 'productivity',
    provider: 'Notion Labs',
    rating: 4.7,
    reviews: 7890,
    installs: 54000,
    price: 'free',
    featured: false,
    verified: true,
    capabilities: [
      'Create pages',
      'Update databases',
      'Query content',
      'Add comments',
      'Manage blocks',
      'Search pages',
      'Handle attachments',
      'Team collaboration'
    ],
    integrationMethods: ['api', 'oauth'],
    version: '2.3.1',
    lastUpdated: '2025-10-22',
    website: 'https://notion.so',
    documentation: 'https://developers.notion.com',
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Manage events and calendars',
    longDescription: 'Automate your scheduling with Google Calendar integration. Create events, manage calendars, send invitations, and handle recurring appointments.',
    icon: '📅',
    category: 'productivity',
    provider: 'Google',
    rating: 4.6,
    reviews: 6540,
    installs: 48000,
    price: 'free',
    featured: false,
    verified: true,
    capabilities: [
      'Create events',
      'Update events',
      'Manage calendars',
      'Send invitations',
      'Handle recurring events',
      'Set reminders',
      'Check availability',
      'Sync calendars'
    ],
    integrationMethods: ['api', 'oauth'],
    version: '2.1.5',
    lastUpdated: '2025-10-18',
    website: 'https://calendar.google.com',
    documentation: 'https://developers.google.com/calendar',
  },
  {
    id: 'anthropic',
    name: 'Claude (Anthropic)',
    description: 'Advanced AI assistant for analysis and generation',
    longDescription: 'Leverage Claude AI for sophisticated text analysis, code generation, and intelligent decision-making. Perfect for complex reasoning tasks and long-form content.',
    icon: '🧠',
    category: 'ai',
    provider: 'Anthropic',
    rating: 4.9,
    reviews: 4320,
    installs: 32000,
    price: 'paid',
    priceDetails: 'Token-based pricing',
    featured: true,
    verified: true,
    capabilities: [
      'Advanced reasoning',
      'Code generation',
      'Document analysis',
      'Multi-turn conversation',
      'Large context window',
      'Function calling',
      'Vision analysis',
      'JSON mode'
    ],
    integrationMethods: ['api'],
    version: '3.5.0',
    lastUpdated: '2025-11-03',
    website: 'https://anthropic.com',
    documentation: 'https://docs.anthropic.com',
  },
  {
    id: 'jira',
    name: 'Jira',
    description: 'Project management and issue tracking',
    longDescription: 'Integrate Jira with your workflows to automate project management. Create issues, update sprints, manage workflows, and sync project data.',
    icon: '🎯',
    category: 'productivity',
    provider: 'Atlassian',
    rating: 4.5,
    reviews: 8910,
    installs: 61000,
    price: 'free',
    featured: false,
    verified: true,
    capabilities: [
      'Create issues',
      'Update issues',
      'Manage sprints',
      'Handle transitions',
      'Add comments',
      'Manage attachments',
      'Custom fields',
      'JQL queries'
    ],
    integrationMethods: ['api', 'webhook', 'oauth'],
    version: '3.0.8',
    lastUpdated: '2025-10-15',
    website: 'https://atlassian.com/jira',
    documentation: 'https://developer.atlassian.com/cloud/jira',
  },
  {
    id: 'airtable',
    name: 'Airtable',
    description: 'Spreadsheet-database hybrid for data management',
    longDescription: 'Connect Airtable bases to your workflows. Create records, update tables, and automate data management across your organization.',
    icon: '📊',
    category: 'database',
    provider: 'Airtable',
    rating: 4.7,
    reviews: 5670,
    installs: 38000,
    price: 'freemium',
    priceDetails: 'Free tier available',
    featured: false,
    verified: true,
    capabilities: [
      'Create records',
      'Update records',
      'Query tables',
      'Manage attachments',
      'Link records',
      'Formula fields',
      'Views and filters',
      'Batch operations'
    ],
    integrationMethods: ['api', 'oauth'],
    version: '2.4.3',
    lastUpdated: '2025-10-28',
    website: 'https://airtable.com',
    documentation: 'https://airtable.com/developers/web/api',
  },
];

export function MarketplacePage() {
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

  const filteredApps = marketplaceApps.filter(app => {
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
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <p className="text-muted-foreground mt-2">
          Discover and install apps to power your workflows
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{marketplaceApps.length}</p>
              <p className="text-sm text-muted-foreground">Total Apps</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{marketplaceApps.filter(a => a.featured).length}</p>
              <p className="text-sm text-muted-foreground">Featured</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{marketplaceApps.filter(a => a.verified).length}</p>
              <p className="text-sm text-muted-foreground">Verified</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <Download className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {(marketplaceApps.reduce((sum, app) => sum + app.installs, 0) / 1000).toFixed(0)}K
              </p>
              <p className="text-sm text-muted-foreground">Total Installs</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search apps..."
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
              onClick={() => navigate(`/marketplace/${app.id}`)}
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
          <p className="text-muted-foreground">No apps found matching your criteria</p>
        </div>
      )}
    </div>
  );
}

