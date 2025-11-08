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
import { ApprovalsList } from './pages/approvals/ApprovalsList';
import { ApprovalDetail } from './pages/approvals/ApprovalDetail';
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
                path="/"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="workflows" element={<WorkflowsList />} />
                <Route path="workflows/:workflowId" element={<div>Workflow Detail (TODO)</div>} />
                <Route path="approvals" element={<ApprovalsList />} />
                <Route path="approvals/:approvalId" element={<ApprovalDetail />} />
                <Route path="marketplace" element={<div>Marketplace (TODO)</div>} />
                <Route path="team" element={<div>Team (TODO)</div>} />
                <Route path="workspace-settings" element={<WorkspaceSettings />} />
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
