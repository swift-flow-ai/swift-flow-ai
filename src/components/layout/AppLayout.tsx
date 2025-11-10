import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Zap, 
  CheckSquare, 
  ShoppingBag, 
  Users,
  Settings,
  ChevronDown,
  Bell,
  Search,
  Sun,
  Moon,
  LogOut,
  User,
  PanelLeftClose,
  PanelLeft,
  Activity,
  BarChart3,
  BookTemplate,
  Plug,
  FileText
} from 'lucide-react';
import { useWorkspace } from '../../hooks/useWorkspace';
import { useTheme } from '../../hooks/useTheme';
import { Avatar } from '../common/Avatar';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils';

const navigation = [
  { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
  { name: 'Workflows', href: '/app/workflows', icon: Zap },
  { name: 'Executions', href: '/app/executions', icon: Activity },
  { name: 'Analytics', href: '/app/analytics', icon: BarChart3 },
  { name: 'Templates', href: '/app/templates', icon: BookTemplate },
  { name: 'Integrations', href: '/app/integrations', icon: Plug },
  { name: 'Audit Logs', href: '/app/audit', icon: FileText },
  { name: 'Approvals', href: '/app/approvals', icon: CheckSquare },
  { name: 'Marketplace', href: '/app/marketplace', icon: ShoppingBag },
  { name: 'Team', href: '/app/team', icon: Users },
  { name: 'Workspace', href: '/app/workspace-settings', icon: Settings },
];

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentWorkspace, workspaces, selectWorkspace } = useWorkspace();
  const { user, logout } = useAuth();
  const { setTheme, actualTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Auto-collapse sidebar on workflow builder/viewer routes (but not analytics)
  const isWorkflowCanvas = (location.pathname.startsWith('/app/workflows/') && 
                           location.pathname !== '/app/workflows' &&
                           !location.pathname.endsWith('/analytics')) || 
                           location.pathname === '/app/workflows/new';

  const toggleTheme = () => {
    setTheme(actualTheme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Mock notifications data
  const notifications = [
    { id: 1, title: 'Approval Required', message: 'Invoice #1234 needs your approval', time: '5m ago', unread: true },
    { id: 2, title: 'Workflow Complete', message: 'Customer onboarding workflow finished', time: '1h ago', unread: true },
    { id: 3, title: 'New Team Member', message: 'John Doe joined your workspace', time: '2h ago', unread: false },
  ];

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundColor: actualTheme === 'dark' ? 'hsl(0, 0%, 3.9%)' : 'hsl(0, 0%, 100%)',
      }}
    >
      {/* Top Bar */}
      <header 
        className="sticky top-0 z-50 w-full border-b border-border"
        style={{
          backgroundColor: actualTheme === 'dark' ? 'hsl(0, 0%, 3.9%)' : 'hsl(0, 0%, 100%)',
        }}
      >
        <div className="flex h-16 items-center px-4 gap-4">
          {/* Workspace Switcher */}
          <div className="flex items-center gap-3 min-w-[240px]">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center">
              <img src="/logo.svg" alt="Swift Flow AI Logo" className="h-8 w-8" />
            </div>
            <div className="relative group">
              <button className="flex items-center gap-2 hover:text-primary transition-colors">
                <span className="font-semibold">{currentWorkspace?.name || 'Swift Flow AI'}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {/* Workspace dropdown */}
              <div 
                className="absolute top-full left-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-border rounded-lg shadow-xl p-2 z-50"
                style={{
                  backgroundColor: actualTheme === 'dark' ? 'hsl(240, 5%, 15%)' : 'hsl(0, 0%, 98%)',
                }}
              >
                {workspaces.map(ws => (
                  <button
                    key={ws.id}
                    onClick={() => selectWorkspace(ws.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors",
                      ws.id === currentWorkspace?.id ? "bg-primary/10 text-primary" : "hover:bg-muted"
                    )}
                  >
                    <Avatar src={ws.logo} alt={ws.name} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{ws.name}</div>
                      <div className="text-xs text-muted-foreground capitalize">{ws.role}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search workflows, approvals..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted/50 border-0 focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {actualTheme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Bell className="h-5 w-5" />
                {currentWorkspace && currentWorkspace.unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                )}
              </button>

              {/* Notifications dropdown */}
              {showNotifications && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowNotifications(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 top-full mt-2 w-80 border border-border rounded-lg shadow-xl p-2 z-50"
                    style={{
                      backgroundColor: actualTheme === 'dark' ? 'hsl(240, 5%, 15%)' : 'hsl(0, 0%, 98%)',
                    }}
                  >
                    <div className="px-3 py-2 border-b border-border mb-2">
                      <h3 className="font-semibold text-foreground">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <button
                          key={notification.id}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-md hover:bg-muted transition-colors",
                            notification.unread && "bg-primary/5"
                          )}
                        >
                          <div className="flex items-start gap-2">
                            {notification.unread && (
                              <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-foreground">{notification.title}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="px-3 py-2 border-t border-border mt-2">
                      <Link 
                        to="/app/notifications"
                        className="text-sm text-primary hover:underline block"
                        onClick={() => setShowNotifications(false)}
                      >
                        View all notifications
                      </Link>
                    </div>
                  </motion.div>
                </>
              )}
            </div>
            
            {/* User Avatar with dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Avatar src={user?.avatar} alt={user?.name || ''} size="sm" />
              </button>

              {/* User dropdown */}
              <div 
                className="absolute right-0 top-full mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-border rounded-lg shadow-xl p-2 z-50"
                style={{
                  backgroundColor: actualTheme === 'dark' ? 'hsl(240, 5%, 15%)' : 'hsl(0, 0%, 98%)',
                }}
              >
                <div className="px-3 py-2 border-b border-border mb-2">
                  <p className="font-medium text-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                
                <Link
                  to="/app/profile"
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors text-foreground"
                >
                  <User className="h-4 w-4" />
                  <span className="text-sm">Profile</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-destructive/10 transition-colors text-destructive mt-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={cn(
            "sticky top-16 h-[calc(100vh-4rem)] border-r border-border transition-all duration-300",
            sidebarCollapsed ? "w-16 p-2" : "w-64 p-4"
          )}
          style={{
            backgroundColor: actualTheme === 'dark' ? 'hsl(0, 0%, 3.9%)' : 'hsl(0, 0%, 100%)',
          }}
        >
          {/* Collapse Toggle */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? (
                <PanelLeft className="h-5 w-5" />
              ) : (
                <PanelLeftClose className="h-5 w-5" />
              )}
            </button>
          </div>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    sidebarCollapsed && "justify-center"
                  )}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <>
                      {item.name}
                      {item.name === 'Approvals' && currentWorkspace && currentWorkspace.pendingApprovals > 0 && (
                        <span className="ml-auto px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-300 text-xs font-medium">
                          {currentWorkspace.pendingApprovals}
                        </span>
                      )}
                    </>
                  )}
                  {sidebarCollapsed && item.name === 'Approvals' && currentWorkspace && currentWorkspace.pendingApprovals > 0 && (
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-yellow-500" />
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className={cn(
          "flex-1 transition-all duration-300",
          isWorkflowCanvas ? "p-0" : "p-8"
        )}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}

