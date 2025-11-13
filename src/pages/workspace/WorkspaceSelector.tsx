import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useWorkspace } from '../../hooks/useWorkspace';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Building2, Plus, Users, Zap, Clock, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function WorkspaceSelector() {
  const { workspaces, isLoading, selectWorkspace } = useWorkspace();
  const navigate = useNavigate();
  const [logoErrors, setLogoErrors] = useState<Set<string>>(new Set());

  const handleSelectWorkspace = async (workspaceId: string) => {
    await selectWorkspace(workspaceId);
    navigate('/app/dashboard');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getWorkspaceColor = (id: string) => {
    const colors = [
      'bg-purple-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-red-500',
      'bg-teal-500',
    ];
    const index = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-[#1a1a1a] dark:to-[#0f0f0f] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-[#1a1a1a] dark:to-[#0f0f0f] flex">
      {/* Left Side - Visual Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-700 via-primary-600 to-indigo-700 relative overflow-hidden">
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-10"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-white">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/25 backdrop-blur-sm mb-6 border border-white/40 shadow-lg">
                <Building2 className="h-9 w-9 text-white drop-shadow-lg" />
              </div>
              <h2 className="text-4xl xl:text-5xl font-bold mb-4 leading-tight text-white drop-shadow-md">
                Welcome to your
                <br />
                <span className="text-white">workspace hub</span>
              </h2>
              <p className="text-lg xl:text-xl text-white leading-relaxed mb-8 drop-shadow-sm max-w-lg">
                Switch between workspaces seamlessly and manage all your automation projects in one place.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="group relative overflow-hidden bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/25 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/20"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/30 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="font-bold text-white mb-2 text-lg drop-shadow-md">Organize Everything</div>
                    <div className="text-sm text-white/90 leading-relaxed">Keep your workflows and teams organized across multiple workspaces</div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="group relative overflow-hidden bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/25 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/20"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/30 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="font-bold text-white mb-2 text-lg drop-shadow-md">Quick Access</div>
                    <div className="text-sm text-white/90 leading-relaxed">Switch between workspaces instantly with a single click</div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="group relative overflow-hidden bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/25 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/20"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 border border-white/30 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="font-bold text-white mb-2 text-lg drop-shadow-md">Team Collaboration</div>
                    <div className="text-sm text-white/90 leading-relaxed">Work together with your team members in shared workspaces</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-indigo-400/10 blur-3xl"></div>
      </div>

      {/* Right Side - Workspace Selector */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 mb-4 shadow-lg shadow-primary-500/20">
              <Building2 className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Select a workspace
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {workspaces.length > 0
                ? `You have ${workspaces.length} ${workspaces.length === 1 ? 'workspace' : 'workspaces'}`
                : 'Choose a workspace to continue'}
            </p>
          </motion.div>

        {/* Workspaces List */}
        {workspaces.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 px-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
              No workspaces yet
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
              Create your first workspace to start building and automating workflows
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/workspace/create')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg text-sm transition-colors shadow-sm shadow-primary-500/20"
            >
              <Plus className="h-4 w-4" />
              Create Your First Workspace
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-2 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-2">
            {workspaces.map((workspace, index) => (
              <motion.button
                key={workspace.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.03,
                  duration: 0.2,
                }}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectWorkspace(workspace.id)}
                className="group w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all text-left border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
              >
                {/* Workspace Icon/Avatar */}
                <div
                  className={`h-12 w-12 rounded-lg ${
                    workspace.logo && !logoErrors.has(workspace.id)
                      ? 'bg-white p-1.5'
                      : getWorkspaceColor(workspace.id)
                  } flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm shadow-md group-hover:shadow-lg transition-shadow overflow-hidden`}
                >
                  {workspace.logo && !logoErrors.has(workspace.id) ? (
                    <img
                      src={workspace.logo}
                      alt={workspace.name}
                      className="h-full w-full rounded object-contain"
                      onError={() => {
                        setLogoErrors((prev) => new Set(prev).add(workspace.id));
                      }}
                    />
                  ) : (
                    <span className="text-xs">{getInitials(workspace.name)}</span>
                  )}
                </div>

                {/* Workspace Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {workspace.name}
                    </div>
                    {workspace.pendingApprovals > 0 && (
                      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-[10px] font-medium">{workspace.pendingApprovals}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 capitalize mb-2">
                    {workspace.role}
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                      <Users className="h-3 w-3" />
                      <span className="font-medium">{workspace.memberCount}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                      <Zap className="h-3 w-3" />
                      <span className="font-medium">{workspace.activeWorkflows}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>
                        {formatDistanceToNow(new Date(workspace.lastActiveAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Chevron */}
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors flex-shrink-0" />
              </motion.button>
            ))}

            {/* Create New Workspace */}
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: workspaces.length * 0.03,
                duration: 0.2,
              }}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/workspace/create')}
              className="group w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all text-left border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500/50 bg-white dark:bg-gray-800/30"
            >
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center flex-shrink-0 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors border border-gray-200 dark:border-gray-600">
                <Plus className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-1">
                  Create workspace
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Start fresh with a new workspace
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors flex-shrink-0" />
            </motion.button>
          </div>
        )}

          {/* Footer Info */}
          {workspaces.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
            >
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Need help? <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">Contact support</a>
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
