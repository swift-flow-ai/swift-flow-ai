import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useWorkspace } from '../../hooks/useWorkspace';
import { usePermissions } from '../../hooks/usePermissions';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { TeamMemberNew, TeamPool } from '../../types/workspace';
import { 
  Users, 
  Search,
  Filter,
  Plus,
  Settings,
  TrendingUp,
  Target,
  Clock,
  BarChart3,
  Zap,
  CheckCircle2
} from 'lucide-react';
import axios from 'axios';
import { config } from '../../config';

export function TeamPage() {
  const { currentWorkspace } = useWorkspace();
  const { isAdminOrOwner } = usePermissions();
  const [activeView, setActiveView] = useState<'overview' | 'pools' | 'analytics'>('overview');
  const [members, setMembers] = useState<TeamMemberNew[]>([]);
  const [pools, setPools] = useState<TeamPool[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreatePoolModal, setShowCreatePoolModal] = useState(false);
  const [selectedPool, setSelectedPool] = useState<TeamPool | null>(null);

  const fetchTeamData = useCallback(async () => {
    try {
      const [membersRes, poolsRes] = await Promise.all([
        axios.get(`${config.apiBaseUrl}/workspaces/${currentWorkspace?.id}/team/members`),
        axios.get(`${config.apiBaseUrl}/workspaces/${currentWorkspace?.id}/team/pools`)
      ]);
      setMembers(membersRes.data.members || []);
      setPools(poolsRes.data.pools || []);
    } catch (error) {
      console.error('Error fetching team data:', error);
    }
  }, [currentWorkspace]);

  useEffect(() => {
    if (currentWorkspace) {
      fetchTeamData();
    }
  }, [currentWorkspace, fetchTeamData]);

  const filteredPools = pools.filter(pool =>
    pool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-500';
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

  const totalWorkload = pools.reduce((acc, pool) => acc + pool.stats.currentLoad, 0);
  const avgResponseTime = pools.length > 0 
    ? pools.reduce((acc, pool) => acc + parseFloat(pool.stats.avgResponseTime), 0) / pools.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Collaboration</h1>
          <p className="text-muted-foreground mt-2">
            Organize teams into pools, track performance, and optimize collaboration
          </p>
        </div>
        {isAdminOrOwner && (
          <div className="flex gap-3">
            <Button 
              variant="secondary" 
              onClick={() => window.location.href = '/app/workspace-settings?tab=members'}
            >
              <Settings className="w-4 h-4 mr-2" />
              Manage Members
            </Button>
            <Button 
              variant="primary" 
              onClick={() => setShowCreatePoolModal(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Pool
            </Button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="border-b border-border">
        <nav className="flex gap-6">
          {[
            { id: 'overview' as const, label: 'Overview', icon: BarChart3 },
            { id: 'pools' as const, label: 'Team Pools', icon: Users },
            { id: 'analytics' as const, label: 'Performance', icon: TrendingUp }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className={`pb-4 px-1 border-b-2 font-medium transition-colors ${
                activeView === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeView === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Team Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-200/20 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{members.length}</p>
                  <p className="text-sm text-blue-600">Team Members</p>
                </div>
              </div>
              <p className="text-xs text-blue-600/70">
                {members.filter(m => m.availability === 'available').length} available now
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-200/20 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-100">{pools.length}</p>
                  <p className="text-sm text-green-600">Active Pools</p>
                </div>
              </div>
              <p className="text-xs text-green-600/70">
                {pools.filter(p => p.settings.autoAssignment).length} auto-assigned
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-200/20 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">{totalWorkload}</p>
                  <p className="text-sm text-orange-600">Total Workload</p>
                </div>
              </div>
              <p className="text-xs text-orange-600/70">
                Across all pools
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-200/20 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{avgResponseTime.toFixed(1)}h</p>
                  <p className="text-sm text-purple-600">Avg Response</p>
                </div>
              </div>
              <p className="text-xs text-purple-600/70">
                Average across pools
              </p>
            </motion.div>
          </div>

          {/* Team Availability */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Team Availability</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.slice(0, 6).map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                >
                  <div className="relative">
                    <Avatar src={member.avatar} alt={member.name} size="sm" />
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${getAvailabilityColor(member.availability)}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{member.name}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        member.availability === 'available' ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300' :
                        member.availability === 'busy' ? 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300'
                      }`}>
                        {member.availability}
                      </span>
                      <span className="text-xs text-muted-foreground">Load: {member.stats.currentLoad}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Pool Activity */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Pool Performance</h3>
              <Button variant="secondary" size="sm" onClick={() => setActiveView('analytics')}>
                View Analytics
              </Button>
            </div>
            <div className="space-y-3">
              {pools.slice(0, 3).map((pool, index) => (
                <motion.div
                  key={pool.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{pool.icon || getPoolTypeIcon(pool.type)}</div>
                    <div>
                      <p className="font-medium">{pool.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {pool.stats.activeMembers} members • {pool.stats.totalAssignments} assignments
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{pool.stats.efficiency ?? 0}%</span>
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all"
                          style={{ width: `${Math.min(pool.stats.efficiency ?? 0, 100)}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{pool.stats.avgResponseTime} avg response</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Pools Tab */}
      {activeView === 'pools' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Search and Filter */}
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search pools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  className="px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>All Types</option>
                  <option>Functional</option>
                  <option>Approval</option>
                  <option>Project</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPools.map((pool, index) => (
              <motion.div
                key={pool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all cursor-pointer group"
                onClick={() => setSelectedPool(pool)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{pool.icon || getPoolTypeIcon(pool.type)}</div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{pool.name}</h3>
                      <p className="text-xs text-muted-foreground capitalize">{pool.type} Pool</p>
                    </div>
                  </div>
                  {isAdminOrOwner && (
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <Settings className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{pool.description}</p>

                {/* Pool Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-blue-50 dark:bg-blue-500/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-3 h-3 text-blue-600" />
                      <p className="text-xs text-blue-600 font-medium">Members</p>
                    </div>
                    <p className="text-lg font-bold text-blue-900 dark:text-blue-100">{pool.stats.activeMembers}</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-500/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-3 h-3 text-green-600" />
                      <p className="text-xs text-green-600 font-medium">Efficiency</p>
                    </div>
                    <p className="text-lg font-bold text-green-900 dark:text-green-100">{pool.stats.efficiency}%</p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-500/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="w-3 h-3 text-orange-600" />
                      <p className="text-xs text-orange-600 font-medium">Tasks</p>
                    </div>
                    <p className="text-lg font-bold text-orange-900 dark:text-orange-100">{pool.stats.totalAssignments}</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-500/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-3 h-3 text-purple-600" />
                      <p className="text-xs text-purple-600 font-medium">Response</p>
                    </div>
                    <p className="text-lg font-bold text-purple-900 dark:text-purple-100">{pool.stats.avgResponseTime}</p>
                  </div>
                </div>

                {/* Settings Indicators */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {pool.settings.autoAssignment && (
                    <Badge variant="default" className="text-xs">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Auto-assign
                    </Badge>
                  )}
                  {pool.settings.loadBalancing && (
                    <Badge variant="default" className="text-xs">
                      <BarChart3 className="w-3 h-3 mr-1" />
                      Load balanced
                    </Badge>
                  )}
                </div>

                {/* Members Preview */}
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {pool.members?.slice(0, 3).map((member) => (
                      <Avatar
                        key={member.id}
                        src={member.avatar}
                        alt={member.name}
                        size="sm"
                        className="border-2 border-card"
                      />
                    ))}
                    {pool.memberIds.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                        <span className="text-xs font-medium text-muted-foreground">
                          +{pool.memberIds.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    pool.stats.currentLoad > 80 ? 'bg-red-500' :
                    pool.stats.currentLoad > 50 ? 'bg-yellow-500' : 'bg-green-500'
                  }`} title={`Load: ${pool.stats.currentLoad}%`} />
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPools.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-semibold mb-2">No pools found</h3>
              <p className="text-muted-foreground mb-6">Create your first pool to organize team members</p>
              {isAdminOrOwner && (
                <Button onClick={() => setShowCreatePoolModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Pool
                </Button>
              )}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Analytics Tab */}
      {activeView === 'analytics' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Pool Efficiency
              </h3>
              <div className="space-y-3">
                {pools.map((pool) => (
                  <div key={pool.id} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{pool.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full transition-all"
                          style={{ width: `${Math.min(pool.stats.efficiency ?? 0, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{pool.stats.efficiency ?? 0}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                Response Times
              </h3>
              <div className="space-y-3">
                {pools.map((pool) => (
                  <div key={pool.id} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{pool.name}</span>
                    <span className="text-sm font-medium">{pool.stats.avgResponseTime}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-500" />
                Workload Distribution
              </h3>
              <div className="space-y-3">
                {pools.map((pool) => (
                  <div key={pool.id} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{pool.name}</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        pool.stats.currentLoad > 80 ? 'bg-red-500' :
                        pool.stats.currentLoad > 50 ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <span className="text-sm font-medium">{pool.stats.currentLoad}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team Performance */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6">Individual Performance</h3>
            <div className="space-y-4">
              {members.slice(0, 5).map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar src={member.avatar} alt={member.name} size="sm" />
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {member.poolIds?.length || 0} pools • {member.stats.workflowsCreated} workflows
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{member.stats.avgResponseTime}</p>
                    <p className="text-xs text-muted-foreground">avg response</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
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
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Pool Name</label>
                <Input placeholder="e.g., Frontend Team, Approval Committee" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <select className="w-full px-3 py-2 rounded-lg border border-border bg-background">
                  <option value="functional">Functional Team</option>
                  <option value="approval">Approval Group</option>
                  <option value="project">Project Team</option>
                  <option value="custom">Custom Pool</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea 
                  rows={3}
                  placeholder="What is this pool responsible for?"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setShowCreatePoolModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setShowCreatePoolModal(false)} className="flex-1">
                Create Pool
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Pool Detail Modal */}
      {selectedPool && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{selectedPool.icon || getPoolTypeIcon(selectedPool.type)}</div>
                <div>
                  <h2 className="text-xl font-semibold">{selectedPool.name}</h2>
                  <p className="text-sm text-muted-foreground capitalize">{selectedPool.type} Pool</p>
                </div>
              </div>
              <Button variant="secondary" size="sm" onClick={() => setSelectedPool(null)}>
                Close
              </Button>
            </div>
            
            <div className="space-y-6">
              <p className="text-muted-foreground">{selectedPool.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">{selectedPool.stats.activeMembers}</p>
                  <p className="text-sm text-muted-foreground">Members</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">{selectedPool.stats.efficiency}%</p>
                  <p className="text-sm text-muted-foreground">Efficiency</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">{selectedPool.stats.totalAssignments}</p>
                  <p className="text-sm text-muted-foreground">Assignments</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold">{selectedPool.stats.avgResponseTime}</p>
                  <p className="text-sm text-muted-foreground">Avg Response</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Pool Members</h3>
                <div className="space-y-2">
                  {selectedPool.members?.map((member) => (
                    <div key={member.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="relative">
                        <Avatar src={member.avatar} alt={member.name} size="sm" />
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${getAvailabilityColor(member.availability)}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{member.stats.currentLoad}%</p>
                        <p className="text-xs text-muted-foreground">current load</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

