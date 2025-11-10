import { DynamicOptionsResponse } from '../../services/integration-system.service';

/**
 * Mock dynamic options data for various integrations
 * Used for dropdowns that fetch data from APIs (channels, users, projects, etc.)
 */

// Slack Channels
export const slackChannels: DynamicOptionsResponse = {
  options: [
    { label: '#general', value: 'C001', description: 'Company-wide announcements and work-based matters' },
    { label: '#engineering', value: 'C002', description: 'Engineering team discussions' },
    { label: '#sales', value: 'C003', description: 'Sales team channel' },
    { label: '#marketing', value: 'C004', description: 'Marketing campaigns and updates' },
    { label: '#support', value: 'C005', description: 'Customer support team' },
    { label: '#random', value: 'C006', description: 'Non-work banter and water cooler conversation' },
    { label: '#hr', value: 'C007', description: 'HR announcements and discussions' },
    { label: '#product', value: 'C008', description: 'Product team discussions' },
    { label: '#design', value: 'C009', description: 'Design team collaboration' },
    { label: '#devops', value: 'C010', description: 'DevOps and infrastructure' },
  ],
  hasMore: false,
  total: 10,
};

// Slack Users
export const slackUsers: DynamicOptionsResponse = {
  options: [
    { label: 'John Smith', value: 'U001', description: 'john.smith@acme.com' },
    { label: 'Sarah Lee', value: 'U002', description: 'sarah.lee@acme.com' },
    { label: 'Mike Johnson', value: 'U003', description: 'mike.johnson@acme.com' },
    { label: 'Emma Davis', value: 'U004', description: 'emma.davis@acme.com' },
    { label: 'David Chen', value: 'U005', description: 'david.chen@acme.com' },
    { label: 'Lisa Anderson', value: 'U006', description: 'lisa.anderson@acme.com' },
    { label: 'Tom Wilson', value: 'U007', description: 'tom.wilson@acme.com' },
    { label: 'Rachel Green', value: 'U008', description: 'rachel.green@acme.com' },
  ],
  hasMore: false,
  total: 8,
};

// Gmail Labels
export const gmailLabels: DynamicOptionsResponse = {
  options: [
    { label: 'INBOX', value: 'INBOX' },
    { label: 'SENT', value: 'SENT' },
    { label: 'DRAFT', value: 'DRAFT' },
    { label: 'SPAM', value: 'SPAM' },
    { label: 'TRASH', value: 'TRASH' },
    { label: 'Important', value: 'Label_1' },
    { label: 'Work', value: 'Label_2' },
    { label: 'Personal', value: 'Label_3' },
    { label: 'Follow Up', value: 'Label_4' },
    { label: 'Urgent', value: 'Label_5' },
  ],
  hasMore: false,
  total: 10,
};

// Google Calendar Calendars
export const googleCalendars: DynamicOptionsResponse = {
  options: [
    { label: 'Primary', value: 'primary', description: 'Your main calendar' },
    { label: 'Work', value: 'work@acme.com', description: 'Work events' },
    { label: 'Team Meetings', value: 'team@acme.com', description: 'Team calendar' },
    { label: 'Company Events', value: 'events@acme.com', description: 'Company-wide events' },
    { label: 'Holidays', value: 'holidays@acme.com', description: 'Company holidays' },
  ],
  hasMore: false,
  total: 5,
};

// Jira Projects
export const jiraProjects: DynamicOptionsResponse = {
  options: [
    { label: 'Engineering (ENG)', value: '10001', description: 'Engineering team project' },
    { label: 'Product (PROD)', value: '10002', description: 'Product management' },
    { label: 'Marketing (MKT)', value: '10003', description: 'Marketing campaigns' },
    { label: 'Support (SUP)', value: '10004', description: 'Customer support tickets' },
    { label: 'Operations (OPS)', value: '10005', description: 'Operations and infrastructure' },
    { label: 'Design (DES)', value: '10006', description: 'Design team' },
  ],
  hasMore: false,
  total: 6,
};

// Jira Issue Types
export const jiraIssueTypes: DynamicOptionsResponse = {
  options: [
    { label: 'Bug', value: '1', description: 'A problem which impairs or prevents the functions of the product' },
    { label: 'Task', value: '2', description: 'A task that needs to be done' },
    { label: 'Story', value: '3', description: 'A user story' },
    { label: 'Epic', value: '4', description: 'A big user story that needs to be broken down' },
    { label: 'Improvement', value: '5', description: 'An improvement or enhancement to an existing feature' },
    { label: 'Sub-task', value: '6', description: 'A sub-task of another issue' },
  ],
  hasMore: false,
  total: 6,
};

// Jira Statuses
export const jiraStatuses: DynamicOptionsResponse = {
  options: [
    { label: 'To Do', value: '1' },
    { label: 'In Progress', value: '2' },
    { label: 'In Review', value: '3' },
    { label: 'Done', value: '4' },
    { label: 'Blocked', value: '5' },
    { label: 'Cancelled', value: '6' },
  ],
  hasMore: false,
  total: 6,
};

// Jira Users
export const jiraUsers: DynamicOptionsResponse = {
  options: [
    { label: 'John Smith', value: 'john.smith', description: 'john.smith@acme.com' },
    { label: 'Sarah Lee', value: 'sarah.lee', description: 'sarah.lee@acme.com' },
    { label: 'Mike Johnson', value: 'mike.johnson', description: 'mike.johnson@acme.com' },
    { label: 'Emma Davis', value: 'emma.davis', description: 'emma.davis@acme.com' },
  ],
  hasMore: false,
  total: 4,
};

// Jira Transitions (depends on issue)
export const jiraTransitions: DynamicOptionsResponse = {
  options: [
    { label: 'Start Progress', value: '11', description: 'Move to In Progress' },
    { label: 'Stop Progress', value: '21', description: 'Move to To Do' },
    { label: 'Submit for Review', value: '31', description: 'Move to In Review' },
    { label: 'Done', value: '41', description: 'Mark as Done' },
    { label: 'Block', value: '51', description: 'Mark as Blocked' },
  ],
  hasMore: false,
  total: 5,
};

// GitHub Repositories
export const githubRepositories: DynamicOptionsResponse = {
  options: [
    { label: 'acme-corp/web-app', value: 'acme-corp/web-app', description: 'Main web application' },
    { label: 'acme-corp/mobile-app', value: 'acme-corp/mobile-app', description: 'Mobile applications' },
    { label: 'acme-corp/api', value: 'acme-corp/api', description: 'Backend API' },
    { label: 'acme-corp/infrastructure', value: 'acme-corp/infrastructure', description: 'Infrastructure as code' },
    { label: 'acme-corp/docs', value: 'acme-corp/docs', description: 'Documentation' },
    { label: 'acme-corp/design-system', value: 'acme-corp/design-system', description: 'Design system components' },
  ],
  hasMore: false,
  total: 6,
};

// GitHub Labels
export const githubLabels: DynamicOptionsResponse = {
  options: [
    { label: 'bug', value: 'bug', description: 'Something isn\'t working' },
    { label: 'enhancement', value: 'enhancement', description: 'New feature or request' },
    { label: 'documentation', value: 'documentation', description: 'Improvements or additions to documentation' },
    { label: 'good first issue', value: 'good first issue', description: 'Good for newcomers' },
    { label: 'help wanted', value: 'help wanted', description: 'Extra attention is needed' },
    { label: 'priority: high', value: 'priority-high', description: 'High priority' },
    { label: 'priority: low', value: 'priority-low', description: 'Low priority' },
  ],
  hasMore: false,
  total: 7,
};

// GitHub Collaborators
export const githubCollaborators: DynamicOptionsResponse = {
  options: [
    { label: 'johnsmith', value: 'johnsmith', description: 'John Smith' },
    { label: 'sarahlee', value: 'sarahlee', description: 'Sarah Lee' },
    { label: 'mikejohnson', value: 'mikejohnson', description: 'Mike Johnson' },
    { label: 'emmadavis', value: 'emmadavis', description: 'Emma Davis' },
  ],
  hasMore: false,
  total: 4,
};

// GitHub Branches
export const githubBranches: DynamicOptionsResponse = {
  options: [
    { label: 'main', value: 'main', description: 'Main branch' },
    { label: 'develop', value: 'develop', description: 'Development branch' },
    { label: 'staging', value: 'staging', description: 'Staging branch' },
    { label: 'feature/new-dashboard', value: 'feature/new-dashboard', description: 'Feature branch' },
    { label: 'bugfix/login-issue', value: 'bugfix/login-issue', description: 'Bug fix branch' },
  ],
  hasMore: false,
  total: 5,
};

// Calendly Event Types
export const calendlyEventTypes: DynamicOptionsResponse = {
  options: [
    {
      label: '15 Minute Meeting',
      value: 'https://api.calendly.com/event_types/abc123',
      description: 'Quick 15 minute call',
    },
    {
      label: '30 Minute Meeting',
      value: 'https://api.calendly.com/event_types/def456',
      description: 'Standard 30 minute meeting',
    },
    {
      label: '60 Minute Meeting',
      value: 'https://api.calendly.com/event_types/ghi789',
      description: 'Extended 1 hour meeting',
    },
    {
      label: 'Interview - Technical',
      value: 'https://api.calendly.com/event_types/jkl012',
      description: 'Technical interview (60 min)',
    },
    {
      label: 'Interview - HR',
      value: 'https://api.calendly.com/event_types/mno345',
      description: 'HR screening (30 min)',
    },
  ],
  hasMore: false,
  total: 5,
};

// PostgreSQL Tables
export const postgresqlTables: DynamicOptionsResponse = {
  options: [
    { label: 'users', value: 'users', description: 'User accounts' },
    { label: 'orders', value: 'orders', description: 'Customer orders' },
    { label: 'products', value: 'products', description: 'Product catalog' },
    { label: 'customers', value: 'customers', description: 'Customer information' },
    { label: 'invoices', value: 'invoices', description: 'Invoice records' },
    { label: 'transactions', value: 'transactions', description: 'Payment transactions' },
  ],
  hasMore: false,
  total: 6,
};

// PostgreSQL Columns (example for 'users' table)
export const postgresqlColumns: DynamicOptionsResponse = {
  options: [
    { label: 'id', value: 'id', description: 'integer' },
    { label: 'email', value: 'email', description: 'varchar(255)' },
    { label: 'name', value: 'name', description: 'varchar(255)' },
    { label: 'created_at', value: 'created_at', description: 'timestamp' },
    { label: 'updated_at', value: 'updated_at', description: 'timestamp' },
    { label: 'status', value: 'status', description: 'varchar(50)' },
  ],
  hasMore: false,
  total: 6,
};

// MongoDB Collections
export const mongodbCollections: DynamicOptionsResponse = {
  options: [
    { label: 'users', value: 'users', description: 'User documents' },
    { label: 'events', value: 'events', description: 'Event logs' },
    { label: 'sessions', value: 'sessions', description: 'User sessions' },
    { label: 'analytics', value: 'analytics', description: 'Analytics data' },
    { label: 'notifications', value: 'notifications', description: 'User notifications' },
  ],
  hasMore: false,
  total: 5,
};

// Helper function to get dynamic options by endpoint
export function getDynamicOptionsByEndpoint(endpoint: string, searchTerm?: string): DynamicOptionsResponse {
  // Map endpoints to data
  const endpointMap: Record<string, DynamicOptionsResponse> = {
    '/integrations/slack/dynamic/channels': slackChannels,
    '/integrations/slack/dynamic/users': slackUsers,
    '/integrations/gmail/dynamic/labels': gmailLabels,
    '/integrations/google-calendar/dynamic/calendars': googleCalendars,
    '/integrations/jira/dynamic/projects': jiraProjects,
    '/integrations/jira/dynamic/issue-types': jiraIssueTypes,
    '/integrations/jira/dynamic/statuses': jiraStatuses,
    '/integrations/jira/dynamic/users': jiraUsers,
    '/integrations/jira/dynamic/transitions': jiraTransitions,
    '/integrations/github/dynamic/repositories': githubRepositories,
    '/integrations/github/dynamic/labels': githubLabels,
    '/integrations/github/dynamic/collaborators': githubCollaborators,
    '/integrations/github/dynamic/branches': githubBranches,
    '/integrations/calendly/dynamic/event-types': calendlyEventTypes,
    '/integrations/postgresql/dynamic/tables': postgresqlTables,
    '/integrations/postgresql/dynamic/columns': postgresqlColumns,
    '/integrations/mongodb/dynamic/collections': mongodbCollections,
  };

  const data = endpointMap[endpoint] || { options: [], hasMore: false, total: 0 };

  // Filter by search term if provided
  if (searchTerm && searchTerm.length > 0) {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = data.options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(lowerSearch) ||
        (opt.description && opt.description.toLowerCase().includes(lowerSearch))
    );
    return {
      options: filtered,
      hasMore: false,
      total: filtered.length,
    };
  }

  return data;
}

