import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
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
import { MarketplacePage } from './pages/marketplace/MarketplacePage';
import { AppDetailPage } from './pages/marketplace/AppDetailPage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { TemplateMarketplace } from './pages/templates/TemplateMarketplace';
import { TemplateDetail } from './pages/templates/TemplateDetail';
import { IntegrationsList } from './pages/integrations/IntegrationsList';
import { AddIntegration } from './pages/integrations/AddIntegration';
import { IntegrationConfig } from './pages/integrations/IntegrationConfig';
import { AuditLogs } from './pages/audit/AuditLogs';
import { AuditLogDetail } from './pages/audit/AuditLogDetail';
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
                <Route path="inbox/:approvalId" element={<InboxDetail />} />
                <Route path="templates" element={<TemplateMarketplace />} />
                <Route path="templates/:templateId" element={<TemplateDetail />} />
                <Route path="integrations" element={<IntegrationsList />} />
                <Route path="integrations/add" element={<AddIntegration />} />
                <Route path="integrations/configure/:appId" element={<IntegrationConfig />} />
                <Route path="integrations/:integrationId" element={<IntegrationConfig />} />
                <Route path="audit" element={<AuditLogs />} />
                <Route path="audit/:logId" element={<AuditLogDetail />} />
                <Route path="marketplace" element={<MarketplacePage />} />
                <Route path="marketplace/:appId" element={<AppDetailPage />} />
                <Route path="team" element={<TeamPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
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
