import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '../../components/common';
import { integrationSystemService, IntegrationDefinition } from '../../services/integration-system.service';
import { useWorkspace } from '../../hooks/useWorkspace';
import {
  ArrowLeft,
  Star,
  Download,
  CheckCircle2,
  ExternalLink,
  Book,
  Mail,
  Calendar,
  Shield,
  Zap,
  Check,
  Loader2
} from 'lucide-react';

export function AppDetailPage() {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();
  const { currentWorkspace } = useWorkspace();
  const [app, setApp] = useState<IntegrationDefinition | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInstalling, setIsInstalling] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    loadApp();
  }, [appId]);

  const loadApp = async () => {
    if (!appId) return;
    
    try {
      setLoading(true);
      const integration = await integrationSystemService.getIntegration(appId);
      setApp(integration);
      
      // Check if already installed
      if (currentWorkspace?.id) {
        const installed = await integrationSystemService.listInstalledIntegrations(currentWorkspace.id);
        setIsInstalled(installed.some(i => i.integrationId === appId));
      }
    } catch (error) {
      console.error('Failed to load app:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading app details...</p>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold mb-2">App not found</h2>
        <p className="text-muted-foreground mb-6">The app you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/app/appcenter')}>
          Back to App Center
        </Button>
      </div>
    );
  }

  const handleInstall = async () => {
    if (!currentWorkspace?.id) return;
    
    setIsInstalling(true);
    try {
      // Redirect to OAuth or show credentials form
      // For now, just simulate installation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsInstalled(true);
    } catch (error) {
      console.error('Failed to install app:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const getIntegrationMethodBadge = (method: string) => {
    const colors = {
      api: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      webhook: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      oauth: 'bg-green-500/10 text-green-600 dark:text-green-400',
      mcp: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
    };
    return colors[method as keyof typeof colors] || colors.api;
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Back Button */}
      <button
        onClick={() => navigate('/app/appcenter')}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to App Center
      </button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl p-8"
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* App Icon */}
          <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
            {app.icon?.startsWith('http') ? (
              <img
                src={app.icon}
                alt={app.displayName || app.name}
                className="w-16 h-16 rounded-lg object-contain"
              />
            ) : (
              <span className="text-6xl">{app.icon || '📦'}</span>
            )}
          </div>

          {/* App Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{app.displayName || app.name}</h1>
                  {app.verified && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/10 rounded-md">
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                        Verified
                      </span>
                    </div>
                  )}
                  {app.popular && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/10 rounded-md">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                        Popular
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground mb-1">by {app.author || 'Swift Flow AI'}</p>
                <p className="text-sm">{app.description}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 mt-4 pt-4 border-t border-border">
              {app.rating && (
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">{app.rating}</span>
                  <span className="text-muted-foreground">(reviews)</span>
                </div>
              )}
              {app.installCount && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Download className="h-5 w-5" />
                  <span>{app.installCount.toLocaleString()} installs</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <span>Updated {new Date(app.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Install Button */}
            <div className="mt-6 flex gap-3">
              <Button
                variant="primary"
                onClick={handleInstall}
                isLoading={isInstalling}
                disabled={isInstalled}
                className="min-w-[150px]"
              >
                {isInstalled ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Installed
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Install App
                  </>
                )}
              </Button>
              
              {app.docsUrl && (
                <Button
                  variant="secondary"
                  onClick={() => window.open(app.docsUrl, '_blank')}
                >
                  <Book className="h-4 w-4 mr-2" />
                  Documentation
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold mb-4">About {app.displayName || app.name}</h2>
            <p className="text-muted-foreground leading-relaxed">{app.description}</p>
          </motion.div>

          {/* Triggers & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Capabilities</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {app.triggers && app.triggers.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Triggers ({app.triggers.length})</h3>
                  <div className="space-y-2">
                    {app.triggers.slice(0, 5).map((trigger) => (
                      <div key={trigger.key} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{trigger.name}</span>
                      </div>
                    ))}
                    {app.triggers.length > 5 && (
                      <p className="text-xs text-muted-foreground">
                        +{app.triggers.length - 5} more triggers
                      </p>
                    )}
                  </div>
                </div>
              )}
              {app.actions && app.actions.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Actions ({app.actions.length})</h3>
                  <div className="space-y-2">
                    {app.actions.slice(0, 5).map((action) => (
                      <div key={action.key} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{action.name}</span>
                      </div>
                    ))}
                    {app.actions.length > 5 && (
                      <p className="text-xs text-muted-foreground">
                        +{app.actions.length - 5} more actions
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Authentication */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Authentication</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getIntegrationMethodBadge(app.auth.type)}`}>
                {app.auth.type.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              This app uses {app.auth.type} authentication for secure connections.
            </p>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h3 className="font-semibold mb-4">Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version</span>
                <span className="font-medium">{app.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium capitalize">{app.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-medium">
                  {new Date(app.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h3 className="font-semibold mb-4">Resources</h3>
            <div className="space-y-3">
              {app.docsUrl && (
                <a
                  href={app.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Book className="h-4 w-4" />
                  Documentation
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {app.supportUrl && (
                <a
                  href={app.supportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  Support
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Use in Workflow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6"
          >
            <h3 className="font-semibold mb-2">Ready to use?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {isInstalled 
                ? 'This app is now available in your workflow builder.'
                : 'Install this app to use it in your workflows.'
              }
            </p>
            <Button
              variant="primary"
              onClick={() => navigate('/app/workflows')}
              className="w-full"
              disabled={!isInstalled}
            >
              <Zap className="h-4 w-4 mr-2" />
              {isInstalled ? 'Go to Workflows' : 'Install First'}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

