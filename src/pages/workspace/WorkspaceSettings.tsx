import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useWorkspace } from '../../hooks/useWorkspace';
import { useAuth } from '../../hooks/useAuth';
import { Button, Input } from '../../components/common';
import { 
  Building2, 
  Users, 
  Shield, 
  Trash2, 
  Upload,
  Save,
  AlertCircle,
  Crown
} from 'lucide-react';

export function WorkspaceSettings() {
  const { currentWorkspace } = useWorkspace();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'general' | 'members' | 'billing' | 'danger'>('general');
  
  // General settings state
  const [workspaceName, setWorkspaceName] = useState(currentWorkspace?.name || '');
  const [workspaceSlug, setWorkspaceSlug] = useState(currentWorkspace?.slug || '');
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const isAdmin = currentWorkspace?.role === 'admin';

  const handleSaveGeneral = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSuccessMessage('Workspace settings saved successfully!');
    setIsSaving(false);
    
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  if (!currentWorkspace) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No workspace selected</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Workspace Settings</h1>
          <p className="text-muted-foreground mt-2">Workspace configuration and management</p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-yellow-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Admin Access Required</h2>
          <p className="text-muted-foreground">
            Only workspace administrators can manage workspace settings.
          </p>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'general' as const, label: 'General', icon: Building2 },
    { id: 'members' as const, label: 'Members', icon: Users },
    { id: 'billing' as const, label: 'Billing', icon: Crown },
    { id: 'danger' as const, label: 'Danger Zone', icon: AlertCircle },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Workspace Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage {currentWorkspace.name} configuration and settings
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-1 py-3 border-b-2 transition-colors
                ${activeTab === tab.id 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <tab.icon className="h-4 w-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Success Message */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/10 border border-green-500/20 rounded-lg p-4"
        >
          <p className="text-sm text-green-600 dark:text-green-400">{successMessage}</p>
        </motion.div>
      )}

      {/* General Tab */}
      {activeTab === 'general' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6">Workspace Information</h2>
            
            <form onSubmit={handleSaveGeneral} className="space-y-6">
              {/* Workspace Logo */}
              <div>
                <label className="block text-sm font-medium mb-2">Workspace Logo</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    {currentWorkspace.logo ? (
                      <img src={currentWorkspace.logo} alt="Logo" className="w-12 h-12" />
                    ) : (
                      <Building2 className="w-12 h-12 text-primary" />
                    )}
                  </div>
                  <div>
                    <Button type="button" variant="secondary" className="mb-2">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Logo
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG or SVG. Max 2MB. Recommended 200x200px.
                    </p>
                  </div>
                </div>
              </div>

              {/* Workspace Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Workspace Name</label>
                <Input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  placeholder="Acme Corp"
                  required
                />
              </div>

              {/* Workspace Slug */}
              <div>
                <label className="block text-sm font-medium mb-2">Workspace Slug</label>
                <div className="flex gap-2">
                  <span className="px-3 py-2 bg-muted rounded-lg text-muted-foreground text-sm">
                    swiftflow.ai/
                  </span>
                  <Input
                    type="text"
                    value={workspaceSlug}
                    onChange={(e) => setWorkspaceSlug(e.target.value)}
                    placeholder="acme-corp"
                    className="flex-1"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Lowercase letters, numbers, and hyphens only
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={3}
                  placeholder="What is this workspace for?"
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" variant="primary" isLoading={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </form>
          </div>

          {/* Workspace Stats */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6">Workspace Stats</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Members</p>
                <p className="text-2xl font-bold">{currentWorkspace.memberCount}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Active Workflows</p>
                <p className="text-2xl font-bold">{currentWorkspace.activeWorkflows}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Pending Approvals</p>
                <p className="text-2xl font-bold">{currentWorkspace.pendingApprovals}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Created</p>
                <p className="text-sm font-medium mt-1">
                  {new Date(currentWorkspace.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Members Tab */}
      {activeTab === 'members' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Team Members</h2>
            <Button variant="primary">
              <Users className="w-4 h-4 mr-2" />
              Invite Members
            </Button>
          </div>

          <div className="space-y-4">
            {/* Current user as admin */}
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  Admin
                </span>
              </div>
            </div>

            {/* Placeholder members */}
            <div className="text-center py-8 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No other members yet</p>
              <p className="text-sm mt-1">Invite team members to collaborate</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6">Current Plan</h2>
            
            <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Crown className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="text-xl font-semibold">Free Plan</h3>
                  <p className="text-sm text-muted-foreground">Perfect for getting started</p>
                </div>
              </div>
              <ul className="space-y-2 mb-4">
                <li className="text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Up to 5 team members
                </li>
                <li className="text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  10 active workflows
                </li>
                <li className="text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Basic integrations
                </li>
              </ul>
              <Button variant="primary" className="w-full">
                Upgrade to Pro
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Danger Zone Tab */}
      {activeTab === 'danger' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-destructive/50 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-destructive" />
            <h2 className="text-xl font-semibold text-destructive">Danger Zone</h2>
          </div>
          
          <div className="space-y-4">
            {/* Transfer Ownership */}
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-semibold mb-1">Transfer Ownership</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Transfer workspace ownership to another admin member.
              </p>
              <Button variant="secondary">Transfer Workspace</Button>
            </div>

            {/* Delete Workspace */}
            <div className="p-4 border border-destructive/50 rounded-lg">
              <h3 className="font-semibold mb-1">Delete Workspace</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Permanently delete this workspace and all its data. This action cannot be undone.
              </p>
              <Button variant="danger">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Workspace
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

