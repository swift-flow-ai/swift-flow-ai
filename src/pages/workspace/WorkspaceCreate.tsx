import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Users, ArrowRight } from 'lucide-react';
import { Button, Input } from '../../components/common';

export function WorkspaceCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = 'Workspace name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!formData.slug) {
      newErrors.slug = 'Workspace slug is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Call workspace creation API
      // const workspace = await workspaceService.createWorkspace(formData);
      
      // Navigate to invite team page with workspace name
      navigate(`/workspace/invite?workspace=${encodeURIComponent(formData.name)}`);
    } catch (error) {
      console.error('Failed to create workspace:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      name: value,
      // Auto-generate slug from name if slug is empty or was auto-generated
      slug: prev.slug === '' || prev.slug === prev.name.toLowerCase().replace(/\s+/g, '-')
        ? value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        : prev.slug,
    }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Create your workspace</h1>
          <p className="text-muted-foreground">Set up your team's workspace to get started</p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-8 shadow-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Workspace Name */}
            <div>
              <Input
                id="workspace-name"
                label="Workspace Name"
                placeholder="Acme Corp"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                error={errors.name}
                helperText="Choose a name for your workspace"
                required
              />
            </div>

            {/* Workspace Slug */}
            <div>
              <Input
                id="workspace-slug"
                label="Workspace URL"
                placeholder="acme-corp"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                error={errors.slug}
                helperText="This will be used in your workspace URL"
                required
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Your workspace will be accessible at: <span className="font-mono text-primary">swiftflow.ai/{formData.slug || 'your-workspace'}</span>
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-muted/50 rounded-lg p-4 border border-border">
              <div className="flex gap-3">
                <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm text-foreground mb-1">Invite your team</h4>
                  <p className="text-xs text-muted-foreground">
                    After creating your workspace, you can invite team members and set up roles and permissions.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/select-workspace')}
                disabled={isLoading}
                className="flex-1"
              >
                Skip for now
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  'Creating...'
                ) : (
                  <>
                    Create Workspace
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Example Workspaces */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">Popular workspace types:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Engineering Team', 'Marketing', 'Sales', 'Customer Support', 'HR & Operations'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleNameChange(type)}
                className="px-3 py-1.5 text-xs rounded-full bg-muted hover:bg-muted/80 transition-colors"
              >
                {type}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

