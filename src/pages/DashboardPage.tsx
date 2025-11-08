import { AppLayout } from '../components/layout';
import { Card } from '../components/common';

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome to FlowAI - Your AI-Native Business Process Automation Platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-primary-500 to-primary-600 text-white border-0">
            <h3 className="text-sm font-medium opacity-90">Active Workflows</h3>
            <p className="text-3xl font-bold mt-2">12</p>
            <p className="text-sm opacity-75 mt-1">+2 from last month</p>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <h3 className="text-sm font-medium opacity-90">AI Agents</h3>
            <p className="text-3xl font-bold mt-2">8</p>
            <p className="text-sm opacity-75 mt-1">Running smoothly</p>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <h3 className="text-sm font-medium opacity-90">Pending Approvals</h3>
            <p className="text-3xl font-bold mt-2">5</p>
            <p className="text-sm opacity-75 mt-1">Requires attention</p>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <h3 className="text-sm font-medium opacity-90">Tasks Completed</h3>
            <p className="text-3xl font-bold mt-2">342</p>
            <p className="text-sm opacity-75 mt-1">This month</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Recent Activity" description="Latest workflow executions">
            <div className="space-y-4">
              {[
                { name: 'Customer Onboarding', status: 'Success', time: '5 minutes ago' },
                { name: 'Invoice Processing', status: 'Success', time: '12 minutes ago' },
                { name: 'Email Campaign', status: 'Pending', time: '23 minutes ago' },
                { name: 'Data Enrichment', status: 'Success', time: '1 hour ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900">{activity.name}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activity.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Pending Approvals" description="Items requiring your review">
            <div className="space-y-4">
              {[
                { title: 'New Supplier Registration', requestedBy: 'John Doe', priority: 'High' },
                { title: 'Purchase Order #1234', requestedBy: 'Jane Smith', priority: 'Medium' },
                { title: 'Contract Amendment', requestedBy: 'Bob Johnson', priority: 'High' },
              ].map((approval, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900">{approval.title}</p>
                    <p className="text-sm text-gray-500">Requested by {approval.requestedBy}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    approval.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {approval.priority}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card title="Quick Actions">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 text-center border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
              <div className="text-3xl mb-2">🤖</div>
              <p className="font-medium text-gray-900">Create AI Agent</p>
            </button>
            <button className="p-4 text-center border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
              <div className="text-3xl mb-2">⚡</div>
              <p className="font-medium text-gray-900">New Workflow</p>
            </button>
            <button className="p-4 text-center border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
              <div className="text-3xl mb-2">📊</div>
              <p className="font-medium text-gray-900">View Analytics</p>
            </button>
            <button className="p-4 text-center border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors">
              <div className="text-3xl mb-2">⚙️</div>
              <p className="font-medium text-gray-900">Settings</p>
            </button>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}

