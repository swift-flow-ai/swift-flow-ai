import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWorkspace } from '../../hooks/useWorkspace';
import { useAuth } from '../../hooks/useAuth';
import { Button, Input } from '../../components/common';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
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
  Filter,
  Plus,
  Settings,
  TrendingUp
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import { config } from '../../config';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'editor' | 'approver' | 'viewer';
  status: 'active' | 'invited' | 'inactive';
  stats: {
    workflowsCreated: number;
    approvalsHandled: number;
    avgApprovalTime: string;
  };
  joinedAt: string;
  lastActiveAt: string;
  poolIds?: string[];
}

interface TeamPool {
  id: string;
  name: string;
  description: string;
  type: 'functional' | 'approval' | 'project' | 'custom';
  color?: string;
  icon?: string;
  memberIds: string[];
  members?: TeamMember[];
  settings: {
    autoAssignment: boolean;
    roundRobin: boolean;
    loadBalancing: boolean;
    notifyOnAssignment: boolean;
  };
  stats: {
    activeMembers: number;
    totalAssignments: number;
    avgResponseTime: string;
    currentLoad: number;
  };
  createdBy: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export function TeamPage() {
  const { currentWorkspace } = useWorkspace();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'members' | 'pools'>('members');
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [pools, setPools] = useState<TeamPool[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'editor' | 'viewer'>('all');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCreatePoolModal, setShowCreatePoolModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = currentWorkspace?.role === 'admin';

  useEffect(() => {
    if (currentWorkspace) {
      fetchTeamData();
    }
  }, [currentWorkspace]);

  const fetchTeamData = async () => {
    try {
      setLoading(true);
      const [membersRes, poolsRes] = await Promise.all([
        axios.get(`${config.apiBaseUrl}/workspaces/${currentWorkspace?.id}/members`),
        axios.get(`${config.apiBaseUrl}/workspaces/${currentWorkspace?.id}/pools`)
      ]);
      setMembers(membersRes.data.members || []);
      setPools(poolsRes.data.pools || []);
    } catch (error) {
      console.error('Error fetching team data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const filteredPools = pools.filter(pool =>
    pool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return Crown;
      case 'editor': return Shield;
      case 'approver': return UserIcon;
      case 'viewer': return UserIcon;
      default: return UserIcon;
    }
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300';
      case 'editor': return 'bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300';
      case 'approver': return 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-300';
      case 'viewer': return 'bg-gray-100 dark:bg-gray-500/20 text-gray-800 dark:text-gray-300';
      default: return 'bg-gray-100 dark:bg-gray-500/20 text-gray-800 dark:text-gray-300';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-300';
      case 'invited': return 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-300';
      case 'inactive': return 'bg-gray-100 dark:bg-gray-500/20 text-gray-800 dark:text-gray-300';
      default: return 'bg-gray-100 dark:bg-gray-500/20 text-gray-800 dark:text-gray-300';
    }
  };

  const getPoolTypeIcon = (type: string) => {
    switch (type) {
      case 'functional': return '👥';
      case 'approval': return '✅';
      case 'project': return '📁';
      case 'custom': return '⚙️';
      default: return '👥';
    }
  };

  const handleRemoveMember = (memberId: string) => {
    if (confirm('Are you sure you want to remove this member from the workspace?')) {
      setMembers(members.filter(m => m.id !== memberId));
      setOpenMenuId(null);
    }
  };

  const handleChangeRole = (memberId: string, newRole: 'admin' | 'editor' | 'approver' | 'viewer') => {
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
            Manage team members and organize them into pools for better collaboration
          </p>
        </div>
        {isAdmin && (
          <div className="flex gap-3">
            {activeTab === 'pools' && (
              <Button 
                variant="primary" 
                onClick={() => setShowCreatePoolModal(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Pool
              </Button>
            )}
            {activeTab === 'members' && (
              <Button 
                variant="primary" 
                onClick={() => setShowInviteModal(true)}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Members
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab('members')}
            className={`pb-4 px-1 border-b-2 font-medium transition-colors ${
              activeTab === 'members'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Members
              <Badge variant="secondary">{members.length}</Badge>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('pools')}
            className={`pb-4 px-1 border-b-2 font-medium transition-colors ${
              activeTab === 'pools'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Pools
              <Badge variant="secondary">{pools.length}</Badge>
            </div>
          </button>
        </div>
      </div>

      {/* Stats */}
      {activeTab === 'members' ? (
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
                <p className="text-2xl font-bold">{members.filter(m => m.status === 'invited').length}</p>
                <p className="text-sm text-muted-foreground">Invited</p>
              </div>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pools.length}</p>
                <p className="text-sm text-muted-foreground">Total Pools</p>
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
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {pools.reduce((acc, p) => acc + p.stats.activeMembers, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Pool Members</p>
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
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {pools.reduce((acc, p) => acc + p.stats.totalAssignments, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Assignments</p>
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
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Settings className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {pools.filter(p => p.settings.autoAssignment).length}
                </p>
                <p className="text-sm text-muted-foreground">Auto-Assigned</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Search & Filter */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={activeTab === 'members' ? 'Search members...' : 'Search pools...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {activeTab === 'members' && (
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
          )}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'members' ? (
        <MembersTable 
          members={filteredMembers}
          user={user}
          isAdmin={isAdmin}
          openMenuId={openMenuId}
          setOpenMenuId={setOpenMenuId}
          handleChangeRole={handleChangeRole}
          handleRemoveMember={handleRemoveMember}
          getRoleIcon={getRoleIcon}
          getRoleBadgeClass={getRoleBadgeClass}
          getStatusBadgeClass={getStatusBadgeClass}
        />
      ) : (
        <PoolsGrid 
          pools={filteredPools}
          members={members}
          isAdmin={isAdmin}
          getPoolTypeIcon={getPoolTypeIcon}
        />
      )}

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
                  window.location.href = '/app/workspace-settings?tab=members';
                }}
                className="flex-1"
              >
                Go to Settings
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Create Pool Modal */}
      {showCreatePoolModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl p-6 max-w-md w-full"
          >
            <h2 className="text-xl font-semibold mb-4">Create New Pool</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Pool creation functionality coming soon. You can organize team members into groups for better task assignment and collaboration.
            </p>
            <Button variant="primary" onClick={() => setShowCreatePoolModal(false)} className="w-full">
              Got it
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// Members Table Component
function MembersTable({ members, user, isAdmin, openMenuId, setOpenMenuId, handleChangeRole, handleRemoveMember, getRoleIcon, getRoleBadgeClass, getStatusBadgeClass }: any) {
  return (
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
              <th className="px-6 py-4 text-sm font-medium text-muted-foreground">Pools</th>
              <th className="px-6 py-4 text-sm font-medium text-muted-foreground">Joined</th>
              {isAdmin && (
                <th className="px-6 py-4 text-sm font-medium text-muted-foreground">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {members.map((member: TeamMember, index: number) => {
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
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getRoleBadgeClass(member.role)}`}>
                      <RoleIcon className="h-3 w-3" />
                      {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(member.status)}`}>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {member.status === 'active' ? (
                      <div className="text-sm">
                        <p className="text-foreground">
                          {formatDistanceToNow(new Date(member.lastActiveAt), { addSuffix: true })}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {member.stats.workflowsCreated} workflows, {member.stats.approvalsHandled} approvals
                        </p>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      {(member.poolIds && member.poolIds.length > 0) ? (
                        <Badge variant="secondary">{member.poolIds.length} pools</Badge>
                      ) : (
                        <span className="text-sm text-muted-foreground">No pools</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">
                      {new Date(member.joinedAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </td>
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

      {members.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No members found</p>
        </div>
      )}
    </motion.div>
  );
}

// Pools Grid Component
function PoolsGrid({ pools, members, isAdmin, getPoolTypeIcon }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {pools.map((pool: TeamPool, index: number) => (
        <motion.div
          key={pool.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors cursor-pointer"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{pool.icon || getPoolTypeIcon(pool.type)}</div>
              <div>
                <h3 className="font-semibold text-foreground">{pool.name}</h3>
                <p className="text-xs text-muted-foreground capitalize">{pool.type}</p>
              </div>
            </div>
            {isAdmin && (
              <button className="p-1 hover:bg-muted rounded transition-colors">
                <Settings className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{pool.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-muted/30 rounded-lg p-2">
              <p className="text-xs text-muted-foreground">Members</p>
              <p className="text-lg font-semibold">{pool.stats.activeMembers}</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-2">
              <p className="text-xs text-muted-foreground">Assignments</p>
              <p className="text-lg font-semibold">{pool.stats.totalAssignments}</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-2">
              <p className="text-xs text-muted-foreground">Avg Response</p>
              <p className="text-lg font-semibold">{pool.stats.avgResponseTime}</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-2">
              <p className="text-xs text-muted-foreground">Current Load</p>
              <p className="text-lg font-semibold">{pool.stats.currentLoad}</p>
            </div>
          </div>

          {/* Settings Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {pool.settings.autoAssignment && (
              <Badge variant="secondary">Auto-assign</Badge>
            )}
            {pool.settings.roundRobin && (
              <Badge variant="secondary">Round-robin</Badge>
            )}
            {pool.settings.loadBalancing && (
              <Badge variant="secondary">Load balanced</Badge>
            )}
          </div>

          {/* Members Preview */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {pool.members?.slice(0, 4).map((member: TeamMember) => (
                <Avatar
                  key={member.id}
                  src={member.avatar}
                  alt={member.name}
                  size="sm"
                  className="border-2 border-card"
                />
              ))}
            </div>
            {pool.memberIds.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{pool.memberIds.length - 4} more
              </span>
            )}
          </div>
        </motion.div>
      ))}

      {pools.length === 0 && (
        <div className="col-span-full text-center py-12">
          <Shield className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No pools found</p>
        </div>
      )}
    </motion.div>
  );
}
