import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '../../components/common';
import { marketplaceApps } from './MarketplacePage';
import {
  ArrowLeft,
  Star,
  Download,
  CheckCircle2,
  ExternalLink,
  Book,
  Mail,
  Calendar,
  Globe,
  Shield,
  Zap,
  Check
} from 'lucide-react';

export function AppDetailPage() {
  const { appId } = useParams<{ appId: string }>();
  const navigate = useNavigate();
  const [isInstalling, setIsInstalling] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  const app = marketplaceApps.find(a => a.id === appId);

  if (!app) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold mb-2">App not found</h2>
        <p className="text-muted-foreground mb-6">The app you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/marketplace')}>
          Back to Marketplace
        </Button>
      </div>
    );
  }

  const handleInstall = async () => {
    setIsInstalling(true);
    // Simulate installation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsInstalled(true);
    setIsInstalling(false);
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
        onClick={() => navigate('/marketplace')}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Marketplace
      </button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl p-8"
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* App Icon */}
          <div className="text-6xl">{app.icon}</div>

          {/* App Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{app.name}</h1>
                  {app.verified && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/10 rounded-md">
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                        Verified
                      </span>
                    </div>
                  )}
                  {app.featured && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/10 rounded-md">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground mb-1">by {app.provider}</p>
                <p className="text-sm">{app.description}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold">{app.rating}</span>
                <span className="text-muted-foreground">({app.reviews.toLocaleString()} reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Download className="h-5 w-5" />
                <span>{app.installs.toLocaleString()} installs</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <span>Updated {new Date(app.lastUpdated).toLocaleDateString()}</span>
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
              
              {app.website && (
                <Button
                  variant="secondary"
                  onClick={() => window.open(app.website, '_blank')}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Visit Website
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
            <h2 className="text-xl font-semibold mb-4">About {app.name}</h2>
            <p className="text-muted-foreground leading-relaxed">{app.longDescription}</p>
          </motion.div>

          {/* Capabilities */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {app.capabilities.map((capability, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{capability}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Integration Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Integration Methods</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {app.integrationMethods.map((method) => (
                <span
                  key={method}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getIntegrationMethodBadge(method)}`}
                >
                  {method.toUpperCase()}
                </span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              This app supports multiple integration methods for flexible workflow automation.
            </p>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h3 className="font-semibold mb-3">Pricing</h3>
            <div className={`inline-flex px-3 py-1.5 rounded-lg text-sm font-medium mb-2 ${
              app.price === 'free' 
                ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                : app.price === 'freemium'
                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
            }`}>
              {app.price === 'free' ? 'Free' : app.price === 'freemium' ? 'Freemium' : 'Paid'}
            </div>
            {app.priceDetails && (
              <p className="text-sm text-muted-foreground">{app.priceDetails}</p>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
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
                  {new Date(app.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <h3 className="font-semibold mb-4">Resources</h3>
            <div className="space-y-3">
              {app.documentation && (
                <a
                  href={app.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Book className="h-4 w-4" />
                  Documentation
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {app.website && (
                <a
                  href={app.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Globe className="h-4 w-4" />
                  Official Website
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
              {app.supportEmail && (
                <a
                  href={`mailto:${app.supportEmail}`}
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  Support Email
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
              onClick={() => navigate('/workflows')}
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

