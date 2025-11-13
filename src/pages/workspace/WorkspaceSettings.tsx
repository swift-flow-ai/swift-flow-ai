import { useState, FormEvent, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useWorkspace } from '../../hooks/useWorkspace';
import { useAuth } from '../../hooks/useAuth';
import { usePermissions } from '../../hooks/usePermissions';
import { Button, Input } from '../../components/common';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { ConfirmDialog } from '../../components/common';
import { 
  Building2, 
  Users, 
  Shield, 
  Trash2, 
  Upload,
  Save,
  AlertCircle,
  Crown,
  UserPlus,
  Mail,
  MoreVertical,
  X,
  Globe,
  Key
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import { config } from '../../config';

interface WorkspaceMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  status: 'active' | 'invited' | 'pending';
  joinedAt: string;
  lastActiveAt?: string;
  invitedBy?: {
    id: string;
    name: string;
  };
}

interface PendingInvite {
  id: string;
  email: string;
  role: 'admin' | 'member' | 'viewer';
  invitedBy: {
    id: string;
    name: string;
  };
  invitedAt: string;
  expiresAt: string;
}

export function WorkspaceSettings() {
  const { currentWorkspace } = useWorkspace();
  const { user } = useAuth();
  const { isAdminOrOwner } = usePermissions();
  const [activeTab, setActiveTab] = useState<'general' | 'members' | 'security' | 'billing' | 'danger'>('general');
  
  // General settings state
  const [workspaceName, setWorkspaceName] = useState(currentWorkspace?.name || '');
  const [workspaceSlug, setWorkspaceSlug] = useState(currentWorkspace?.slug || '');
  const [workspaceColor, setWorkspaceColor] = useState(currentWorkspace?.color || '#f87855');
  const [workspaceDescription, setWorkspaceDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Members state
  const [members, setMembers] = useState<WorkspaceMember[]>([]);
  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'member' | 'viewer'>('member');
  const [isInviting, setIsInviting] = useState(false);
  const [selectedMember, setSelectedMember] = useState<WorkspaceMember | null>(null);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);

  // Fetch workspace members
  const fetchMembers = useCallback(async () => {
    if (!currentWorkspace?.id) return;
    try {
      const response = await axios.get(`${config.apiBaseUrl}/workspaces/${currentWorkspace.id}/members`);
      setMembers(response.data.members || []);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  }, [currentWorkspace?.id]);

  // Fetch pending invites
  const fetchPendingInvites = useCallback(async () => {
    if (!currentWorkspace?.id) return;
    try {
      const response = await axios.get(`${config.apiBaseUrl}/workspaces/${currentWorkspace.id}/invites`);
      setPendingInvites(response.data.invites || []);
    } catch (error) {
      console.error('Error fetching invites:', error);
    }
  }, [currentWorkspace?.id]);

  useEffect(() => {
    if (currentWorkspace) {
      fetchMembers();
      fetchPendingInvites();
    }
  }, [currentWorkspace, fetchMembers, fetchPendingInvites]);

  const handleSaveGeneral = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage('');
    
    try {
      await axios.patch(`${config.apiBaseUrl}/workspaces/${currentWorkspace?.id}`, {
        name: workspaceName,
        slug: workspaceSlug,
        color: workspaceColor,
        description: workspaceDescription
      });
      
      setSuccessMessage('Workspace settings saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving workspace settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInviteMember = async (e: FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    
    setIsInviting(true);
    try {
      await axios.post(`${config.apiBaseUrl}/workspaces/${currentWorkspace?.id}/invites`, {
        email: inviteEmail,
        role: inviteRole
      });
      
      setInviteEmail('');
      setShowInviteModal(false);
      fetchPendingInvites();
      setSuccessMessage('Invitation sent successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error inviting member:', error);
    } finally {
      setIsInviting(false);
    }
  };

  const handleRemoveMember = async () => {
    if (!selectedMember) return;
    
    try {
      await axios.delete(`${config.apiBaseUrl}/workspaces/${currentWorkspace?.id}/members/${selectedMember.id}`);
      setMembers(members.filter(m => m.id !== selectedMember.id));
      setSelectedMember(null);
      setShowRemoveDialog(false);
      setSuccessMessage('Member removed successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error removing member:', error);
    }
  };

  const handleCancelInvite = async (inviteId: string) => {
    try {
      await axios.delete(`${config.apiBaseUrl}/workspaces/${currentWorkspace?.id}/invites/${inviteId}`);
      setPendingInvites(pendingInvites.filter(i => i.id !== inviteId));
      setSuccessMessage('Invitation cancelled!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error cancelling invite:', error);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:text-purple-300';
      case 'admin': return 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300';
      case 'member': return 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300';
      case 'viewer': return 'bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-300';
    }
  };

  if (!currentWorkspace) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No workspace selected</p>
      </div>
    );
  }

  if (!isAdminOrOwner) {
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
    { id: 'security' as const, label: 'Security', icon: Shield },
    { id: 'billing' as const, label: 'Billing', icon: Crown },
    { id: 'danger' as const, label: 'Danger Zone', icon: AlertCircle },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workspace Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage {currentWorkspace.name} configuration and settings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="secondary" 
            onClick={() => window.location.href = '/app/team'}
          >
            <Users className="w-4 h-4 mr-2" />
            Team Collaboration
          </Button>
        </div>
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
              {tab.id === 'members' && (
                <Badge variant="default" className="ml-2">
                  {members.length + pendingInvites.length}
                </Badge>
              )}
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
          {/* Workspace Identity Section */}
          <div className="bg-gradient-to-br from-card to-card/50 border border-border rounded-xl overflow-hidden">
            <div className="border-b border-border bg-muted/30 px-6 py-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Workspace Identity
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Customize how your workspace appears to members
              </p>
            </div>
            
            <form onSubmit={handleSaveGeneral} className="p-6 space-y-6">
              {/* Logo & Branding */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-semibold mb-3">Workspace Logo</label>
                  <div className="flex items-start gap-4">
                    <div className="relative group">
                      <div 
                        className="w-24 h-24 rounded-xl flex items-center justify-center border-2 border-dashed border-border hover:border-primary transition-colors"
                        style={{ 
                          background: currentWorkspace.logo 
                            ? 'transparent' 
                            : `linear-gradient(135deg, ${workspaceColor}20 0%, ${workspaceColor}05 100%)`
                        }}
                      >
                        {currentWorkspace.logo ? (
                          <img src={currentWorkspace.logo} alt="Logo" className="w-full h-full object-cover rounded-xl" />
                        ) : (
                          <Building2 className="w-12 h-12" style={{ color: workspaceColor }} />
                        )}
                      </div>
                      <button
                        type="button"
                        className="absolute inset-0 bg-black/60 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <Upload className="w-6 h-6 text-white" />
                      </button>
                    </div>
                    <div className="flex-1">
                      <Button type="button" variant="secondary" size="sm" className="mb-2">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload New Logo
                      </Button>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        PNG, JPG, or SVG format<br />
                        Max file size: 2MB<br />
                        Recommended: 512x512px
                      </p>
                    </div>
                  </div>
                </div>

                {/* Color Palette */}
                <div>
                  <label className="block text-sm font-semibold mb-3">Brand Color</label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={workspaceColor}
                        onChange={(e) => setWorkspaceColor(e.target.value)}
                        className="w-16 h-16 rounded-xl border-2 border-border cursor-pointer"
                      />
                      <div className="flex-1">
                        <Input
                          type="text"
                          value={workspaceColor}
                          onChange={(e) => setWorkspaceColor(e.target.value)}
                          placeholder="#3b82f6"
                          pattern="^#[0-9A-Fa-f]{6}$"
                          className="font-mono"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Quick Presets:</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { color: '#f87855', name: 'Coral' },
                          { color: '#f85c39', name: 'Tomato' },
                          { color: '#10b981', name: 'Emerald' },
                          { color: '#3b82f6', name: 'Blue' },
                          { color: '#8b5cf6', name: 'Purple' },
                          { color: '#ec4899', name: 'Pink' },
                          { color: '#f59e0b', name: 'Amber' },
                          { color: '#06b6d4', name: 'Cyan' }
                        ].map(({ color, name }) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setWorkspaceColor(color)}
                            className={`w-10 h-10 rounded-lg border-2 transition-all hover:scale-110 ${
                              workspaceColor === color ? 'border-foreground ring-2 ring-primary' : 'border-border'
                            }`}
                            style={{ backgroundColor: color }}
                            title={name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Name & Slug */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Workspace Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Workspace Name
                    <span className="text-destructive ml-1">*</span>
                  </label>
                  <Input
                    type="text"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    placeholder="e.g., Acme Corporation"
                    required
                    className="text-base"
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">
                    This is how your workspace will be displayed
                  </p>
                </div>

                {/* Workspace Slug */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Workspace URL
                    <span className="text-destructive ml-1">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-2.5 bg-muted rounded-lg text-muted-foreground text-sm font-medium border border-border">
                      <Globe className="w-4 h-4 inline mr-1.5" />
                      swiftflow.ai/
                    </span>
                    <Input
                      type="text"
                      value={workspaceSlug}
                      onChange={(e) => setWorkspaceSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                      placeholder="acme-corp"
                      className="flex-1 font-mono"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Only lowercase letters, numbers, and hyphens
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-shadow"
                  rows={4}
                  placeholder="Describe what this workspace is used for. This helps members understand its purpose."
                  value={workspaceDescription}
                  onChange={(e) => setWorkspaceDescription(e.target.value)}
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-1.5">
                  <p className="text-xs text-muted-foreground">
                    Optional workspace description
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {workspaceDescription.length}/500
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Changes will be visible to all workspace members
                </p>
                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="secondary"
                    onClick={() => {
                      setWorkspaceName(currentWorkspace?.name || '');
                      setWorkspaceSlug(currentWorkspace?.slug || '');
                      setWorkspaceColor(currentWorkspace?.color || '#f87855');
                      setWorkspaceDescription('');
                    }}
                  >
                    Reset
                  </Button>
                  <Button type="submit" variant="primary" isLoading={isSaving}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </form>
          </div>


        </motion.div>
      )}

      {/* Members Tab */}
      {activeTab === 'members' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Members Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-200/20 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{members.length}</p>
                  <p className="text-sm text-blue-600">Active Members</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-200/20 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">{pendingInvites.length}</p>
                  <p className="text-sm text-orange-600">Pending Invites</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-200/20 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                    {members.filter(m => m.role === 'admin' || m.role === 'owner').length}
                  </p>
                  <p className="text-sm text-purple-600">Administrators</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-200/20 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                    {members.filter(m => m.status === 'active').length}
                  </p>
                  <p className="text-sm text-green-600">Online Now</p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Members */}
          <div className="bg-card border border-border rounded-xl">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-xl font-semibold">Team Members</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage who has access to your workspace
                </p>
              </div>
              <Button variant="primary" onClick={() => setShowInviteModal(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </div>

            <div className="divide-y divide-border">
              {members.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 flex items-center justify-between hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar src={member.avatar} alt={member.name} size="md" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{member.name}</p>
                        {member.email === user?.email && (
                          <Badge variant="default" className="text-xs">You</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                      {member.lastActiveAt && (
                        <p className="text-xs text-muted-foreground">
                          Last active {formatDistanceToNow(new Date(member.lastActiveAt), { addSuffix: true })}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge className={getRoleColor(member.role)}>
                      {member.role === 'owner' && <Crown className="w-3 h-3 mr-1" />}
                      {member.role === 'admin' && <Shield className="w-3 h-3 mr-1" />}
                      {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                    </Badge>

                    {member.email !== user?.email && (
                      <div className="relative">
                        <button
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                          onClick={() => {
                            setSelectedMember(member);
                            setShowRemoveDialog(true);
                          }}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pending Invitations */}
          {pendingInvites.length > 0 && (
            <div className="bg-card border border-border rounded-xl">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-semibold">Pending Invitations</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Invitations that haven't been accepted yet
                </p>
              </div>

              <div className="divide-y divide-border">
                {pendingInvites.map((invite, index) => (
                  <motion.div
                    key={invite.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{invite.email}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Invited by {invite.invitedBy.name}</span>
                          <span>•</span>
                          <span>{formatDistanceToNow(new Date(invite.invitedAt), { addSuffix: true })}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Expires {formatDistanceToNow(new Date(invite.expiresAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge className={getRoleColor(invite.role)}>
                        {invite.role.charAt(0).toUpperCase() + invite.role.slice(1)}
                      </Badge>

                      <button
                        onClick={() => handleCancelInvite(invite.id)}
                        className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                        title="Cancel invitation"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6">Access Control</h2>
            
            <div className="space-y-6">
              {/* Public Access */}
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-blue-500" />
                  <div>
                    <h3 className="font-medium">Public Workspace</h3>
                    <p className="text-sm text-muted-foreground">Allow anyone with the link to request access</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Two-Factor Authentication */}
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-green-500" />
                  <div>
                    <h3 className="font-medium">Require 2FA</h3>
                    <p className="text-sm text-muted-foreground">Require two-factor authentication for all members</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                </label>
              </div>

              {/* Single Sign-On */}
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-purple-500" />
                    <div>
                      <h3 className="font-medium">Single Sign-On (SSO)</h3>
                      <p className="text-sm text-muted-foreground">Configure SAML or OAuth for enterprise authentication</p>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-purple-100 text-purple-800">Pro</Badge>
                </div>
                <Button variant="secondary" disabled>
                  Configure SSO
                </Button>
              </div>
            </div>
          </div>

          {/* Session Management */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6">Session Management</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Active Sessions</h3>
                  <p className="text-sm text-muted-foreground">Manage active user sessions across all devices</p>
                </div>
                <Button variant="secondary">
                  View Sessions
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Session Timeout</h3>
                  <p className="text-sm text-muted-foreground">Automatically log out inactive users</p>
                </div>
                <select className="px-3 py-2 rounded-lg border border-border bg-background">
                  <option>Never</option>
                  <option>1 hour</option>
                  <option>8 hours</option>
                  <option>1 day</option>
                  <option>1 week</option>
                </select>
              </div>
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

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl p-6 max-w-md w-full"
          >
            <h2 className="text-xl font-semibold mb-4">Invite Team Member</h2>
            
            <form onSubmit={handleInviteMember} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <Input
                  type="email"
                  placeholder="colleague@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as 'admin' | 'member' | 'viewer')}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="viewer">Viewer - Can view workflows</option>
                  <option value="member">Member - Can create and edit workflows</option>
                  <option value="admin">Admin - Full workspace access</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={() => setShowInviteModal(false)} 
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="primary" 
                  isLoading={isInviting}
                  className="flex-1"
                >
                  Send Invite
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Remove Member Confirmation */}
      <ConfirmDialog
        isOpen={showRemoveDialog}
        onClose={() => {
          setShowRemoveDialog(false);
          setSelectedMember(null);
        }}
        onConfirm={handleRemoveMember}
        title="Remove Team Member"
        message={`Are you sure you want to remove ${selectedMember?.name} from the workspace? They will lose access to all workflows and data.`}
        confirmText="Remove Member"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}

