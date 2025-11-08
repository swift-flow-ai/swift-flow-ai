import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWorkspace } from '../../hooks/useWorkspace';
import { useAuth } from '../../hooks/useAuth';
import { Button, Input } from '../../components/common';
import { Avatar } from '../../components/common/Avatar';
import { 
  Users, 
  UserPlus, 
  Mail, 
  MoreVertical,
  Crown,
  Shield,
  User as UserIcon,
  Trash2,
  Search,
  Filter
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'pending' | 'inactive';
  joinedAt: string;
  lastActiveAt: string;
  workflowsCreated?: number;
  approvalsHandled?: number;
}

// Mock team members data
const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@swiftflow.ai',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo',
    role: 'admin',
    status: 'active',
    joinedAt: '2024-01-01T00:00:00Z',
    lastActiveAt: new Date().toISOString(),
    workflowsCreated: 12,
    approvalsHandled: 87,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    role: 'editor',
    status: 'active',
    joinedAt: '2024-02-15T00:00:00Z',
    lastActiveAt: new Date(Date.now() - 3600000).toISOString(),
    workflowsCreated: 8,
    approvalsHandled: 34,
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    role: 'editor',
    status: 'active',
    joinedAt: '2024-03-10T00:00:00Z',
    lastActiveAt: new Date(Date.now() - 7200000).toISOString(),
    workflowsCreated: 5,
    approvalsHandled: 12,
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma.w@company.com',
    role: 'viewer',
    status: 'pending',
    joinedAt: '2024-11-08T00:00:00Z',
    lastActiveAt: '2024-11-08T00:00:00Z',
  },
];

export function TeamPage() {
  const { currentWorkspace } = useWorkspace();
  const { user } = useAuth();
  const [members, setMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'editor' | 'viewer'>('all');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const isAdmin = currentWorkspace?.role === 'admin';

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return Crown;
      case 'editor': return Shield;
      case 'viewer': return UserIcon;
      default: return UserIcon;
    }
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300';
      case 'editor': return 'bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300';
      case 'viewer': return 'bg-gray-100 dark:bg-gray-500/20 text-gray-800 dark:text-gray-300';
      default: return 'bg-gray-100 dark:bg-gray-500/20 text-gray-800 dark:text-gray-300';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-300';
      case 'inactive': return 'bg-gray-100 dark:bg-gray-500/20 text-gray-800 dark:text-gray-300';
      default: return 'bg-gray-100 dark:bg-gray-500/20 text-gray-800 dark:text-gray-300';
    }
  };

  const handleRemoveMember = (memberId: string) => {
    if (confirm('Are you sure you want to remove this member from the workspace?')) {
      setMembers(members.filter(m => m.id !== memberId));
      setOpenMenuId(null);
    }
  };

  const handleChangeRole = (memberId: string, newRole: 'admin' | 'editor' | 'viewer') => {
    setMembers(members.map(m => 
      m.id === memberId ? { ...m, role: newRole } : m
    ));
    setOpenMenuId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team</h1>
          <p className="text-muted-foreground mt-2">
            Manage team members and their permissions
          </p>
        </div>
        {isAdmin && (
          <Button 
            variant="primary" 
            onClick={() => setShowInviteModal(true)}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Members
          </Button>
        )}
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
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{members.length}</p>
              <p className="text-sm text-muted-foreground">Total Members</p>
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
              <Crown className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{members.filter(m => m.role === 'admin').length}</p>
              <p className="text-sm text-muted-foreground">Admins</p>
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
              <Shield className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{members.filter(m => m.status === 'active').length}</p>
              <p className="text-sm text-muted-foreground">Active</p>
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
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{members.filter(m => m.status === 'pending').length}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Role Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admins</option>
              <option value="editor">Editors</option>
              <option value="viewer">Viewers</option>
            </select>
          </div>
        </div>
      </div>

      {/* Members List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border border-border rounded-xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr className="text-left">
                <th className="px-6 py-4 text-sm font-medium text-muted-foreground">Member</th>
                <th className="px-6 py-4 text-sm font-medium text-muted-foreground">Role</th>
                <th className="px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-sm font-medium text-muted-foreground">Activity</th>
                <th className="px-6 py-4 text-sm font-medium text-muted-foreground">Joined</th>
                {isAdmin && (
                  <th className="px-6 py-4 text-sm font-medium text-muted-foreground">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredMembers.map((member, index) => {
                const RoleIcon = getRoleIcon(member.role);
                const isCurrentUser = member.email === user?.email;

                return (
                  <motion.tr
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    {/* Member Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar src={member.avatar} alt={member.name} size="md" />
                        <div>
                          <p className="font-medium text-foreground flex items-center gap-2">
                            {member.name}
                            {isCurrentUser && (
                              <span className="text-xs text-muted-foreground">(You)</span>
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getRoleBadgeClass(member.role)}`}>
                        <RoleIcon className="h-3 w-3" />
                        {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(member.status)}`}>
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </span>
                    </td>

                    {/* Activity */}
                    <td className="px-6 py-4">
                      {member.status === 'active' ? (
                        <div className="text-sm">
                          <p className="text-foreground">
                            {formatDistanceToNow(new Date(member.lastActiveAt), { addSuffix: true })}
                          </p>
                          {member.workflowsCreated !== undefined && (
                            <p className="text-xs text-muted-foreground">
                              {member.workflowsCreated} workflows, {member.approvalsHandled} approvals
                            </p>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </td>

                    {/* Joined */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-muted-foreground">
                        {new Date(member.joinedAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </td>

                    {/* Actions */}
                    {isAdmin && (
                      <td className="px-6 py-4">
                        <div className="relative">
                          <button
                            onClick={() => setOpenMenuId(openMenuId === member.id ? null : member.id)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                            disabled={isCurrentUser}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>

                          {openMenuId === member.id && !isCurrentUser && (
                            <>
                              <div 
                                className="fixed inset-0 z-10" 
                                onClick={() => setOpenMenuId(null)}
                              />
                              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-xl py-2 z-20">
                                <button
                                  onClick={() => handleChangeRole(member.id, 'admin')}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-2"
                                  disabled={member.role === 'admin'}
                                >
                                  <Crown className="h-4 w-4" />
                                  Make Admin
                                </button>
                                <button
                                  onClick={() => handleChangeRole(member.id, 'editor')}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-2"
                                  disabled={member.role === 'editor'}
                                >
                                  <Shield className="h-4 w-4" />
                                  Make Editor
                                </button>
                                <button
                                  onClick={() => handleChangeRole(member.id, 'viewer')}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center gap-2"
                                  disabled={member.role === 'viewer'}
                                >
                                  <UserIcon className="h-4 w-4" />
                                  Make Viewer
                                </button>
                                <div className="border-t border-border my-2" />
                                <button
                                  onClick={() => handleRemoveMember(member.id)}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-destructive/10 text-destructive transition-colors flex items-center gap-2"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  Remove Member
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    )}
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No members found</p>
          </div>
        )}
      </motion.div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl p-6 max-w-md w-full"
          >
            <h2 className="text-xl font-semibold mb-4">Invite Team Members</h2>
            <p className="text-sm text-muted-foreground mb-6">
              You can invite new members from the Workspace Settings page under the Members tab.
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setShowInviteModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={() => {
                  setShowInviteModal(false);
                  window.location.href = '/workspace-settings?tab=members';
                }}
                className="flex-1"
              >
                Go to Settings
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

