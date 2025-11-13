import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts';
import { WorkspaceProvider } from './contexts/WorkspaceContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import { WorkspaceSelector } from './pages/workspace/WorkspaceSelector';
import { WorkspaceCreate } from './pages/workspace/WorkspaceCreate';
import { WorkspaceSettings } from './pages/workspace/WorkspaceSettings';
import { InviteTeam } from './pages/workspace/InviteTeam';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/dashboard/Dashboard';
import { WorkflowsList } from './pages/workflows/WorkflowsList';
import { WorkflowBuilder } from './pages/workflows/WorkflowBuilder';
import { WorkflowViewer } from './pages/workflows/WorkflowViewer';
import { WorkflowAnalytics } from './pages/workflows/WorkflowAnalytics';
import { ExecutionsList } from './pages/executions/ExecutionsList';
import { ExecutionDetail } from './pages/executions/ExecutionDetail';
import { AnalyticsDashboard } from './pages/analytics/AnalyticsDashboard';
import { InboxPage } from './pages/inbox/InboxPage';
import { InboxDetail } from './pages/inbox/InboxDetail';
import { TeamPage } from './pages/team/TeamPage';
import { AppCenterPage } from './pages/appcenter/AppCenterPage';
import { AppDetailPage } from './pages/appcenter/AppDetailPage';
import { TemplatesPage } from './pages/templates/TemplatesPage';
import { TemplateDetail } from './pages/templates/TemplateDetail';
// Old integration pages removed - redirected to App Center
import { ProfilePage } from './pages/profile/ProfilePage';
import { LandingPage } from './pages/LandingPage';
import ProtectedRoute from './components/layout/ProtectedRoute';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <WorkspaceProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Protected Routes */}
              <Route
                path="/select-workspace"
                element={
                  <ProtectedRoute>
                    <WorkspaceSelector />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/workspace/create"
                element={
                  <ProtectedRoute>
                    <WorkspaceCreate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/workspace/invite"
                element={
                  <ProtectedRoute>
                    <InviteTeam />
                  </ProtectedRoute>
                }
              />

              {/* App Routes (with layout) */}
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/app/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="workflows" element={<WorkflowsList />} />
                <Route path="workflows/new" element={<WorkflowBuilder />} />
                <Route path="workflows/:workflowId" element={<WorkflowViewer />} />
                <Route path="workflows/:workflowId/edit" element={<WorkflowBuilder />} />
                <Route path="workflows/:workflowId/analytics" element={<WorkflowAnalytics />} />
                <Route path="executions" element={<ExecutionsList />} />
                <Route path="executions/:executionId" element={<ExecutionDetail />} />
                <Route path="analytics" element={<AnalyticsDashboard />} />
                <Route path="inbox" element={<InboxPage />} />
                <Route path="inbox/:itemId" element={<InboxDetail />} />
                <Route path="templates" element={<TemplatesPage />} />
                <Route path="templates/:templateId" element={<TemplateDetail />} />
                {/* Redirect old integration routes to App Center */}
                <Route path="integrations" element={<Navigate to="/app/appcenter" replace />} />
                <Route path="integrations/*" element={<Navigate to="/app/appcenter" replace />} />
                <Route path="appcenter" element={<AppCenterPage />} />
                <Route path="appcenter/integration/:appId" element={<AppDetailPage />} />
                <Route path="team" element={<TeamPage />} />
                <Route path="notifications" element={<Navigate to="/app/inbox" replace />} />
                <Route path="workspace-settings" element={<WorkspaceSettings />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </WorkspaceProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
