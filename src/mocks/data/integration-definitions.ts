import { IntegrationDefinition } from "../../services/integration-system.service";

/**
 * Complete integration definitions following INTEGRATION_DATA_STRUCTURE.md
 * These are the apps available in the App Catalog
 */

export const integrationDefinitions: IntegrationDefinition[] = [
  // ============================================================================
  // COMMUNICATION
  // ============================================================================
  {
    id: "slack",
    name: "Slack",
    displayName: "Slack",
    description: "Team communication platform",
    category: "communication",
    icon: "https://logo.clearbit.com/slack.com",
    logoUrl: "https://logo.clearbit.com/slack.com",
    version: "1.0.0",
    verified: true,
    popular: true,
    new: false,
    auth: {
      type: "oauth2",
      required: true,
      authUrl: "https://slack.com/oauth/v2/authorize",
      tokenUrl: "https://slack.com/api/oauth.v2.access",
      scopes: [
        "channels:read",
        "channels:write",
        "chat:write",
        "users:read",
        "reactions:read",
        "reactions:write",
      ],
      testConnection: {
        method: "GET",
        url: "https://slack.com/api/auth.test",
      },
    },
    triggers: [
      {
        key: "new_message",
        name: "New Message Posted to Channel",
        description: "Triggers when a new message is posted",
        type: "webhook",
        properties: [
          {
            key: "channel",
            label: "Channel",
            type: "dropdown",
            required: true,
            description: "Select a channel to monitor",
            dynamicOptions: {
              endpoint: "/integrations/slack/dynamic/channels",
              dependsOn: [],
              searchable: true,
              cacheTTL: 300,
            },
          },
          {
            key: "include_bots",
            label: "Include Bot Messages",
            type: "boolean",
            required: false,
            defaultValue: false,
          },
        ],
        sampleOutput: {
          channel: "C123456",
          channel_name: "general",
          user: "U789012",
          user_name: "john.doe",
          text: "Hello world!",
          ts: "1234567890.123456",
          thread_ts: null,
        },
        webhook: {
          subscriptionEndpoint: "https://slack.com/api/conversations.subscribe",
        },
      },
      {
        key: "new_reaction",
        name: "New Reaction Added",
        description: "Triggers when someone reacts to a message",
        type: "webhook",
        properties: [
          {
            key: "channel",
            label: "Channel",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/slack/dynamic/channels",
              dependsOn: [],
              searchable: true,
              cacheTTL: 300,
            },
          },
        ],
        sampleOutput: {
          reaction: "thumbsup",
          user: "U789012",
          item_user: "U123456",
          ts: "1234567890.123456",
        },
      },
    ],
    actions: [
      {
        key: "send_channel_message",
        name: "Send Channel Message",
        description: "Post a new message to a specific channel",
        requiresConnection: true,
        supportsTest: true,
        retryable: true,
        properties: [
          {
            key: "channel",
            label: "Channel",
            type: "dropdown",
            required: true,
            description: "Select a channel to post to",
            dynamicOptions: {
              endpoint: "/integrations/slack/dynamic/channels",
              dependsOn: [],
              searchable: true,
              paginated: true,
              pageSize: 50,
              cacheTTL: 300,
            },
          },
          {
            key: "text",
            label: "Message Text",
            type: "text",
            required: true,
            description: "The text of your message",
            placeholder: "Enter your message here...",
            supportsExpressions: true,
            multiline: true,
            rows: 5,
          },
          {
            key: "thread_ts",
            label: "Thread Timestamp",
            type: "string",
            required: false,
            description:
              "Reply to a thread by providing the parent message timestamp",
            placeholder: "1234567890.123456",
          },
          {
            key: "as_user",
            label: "Send as User",
            type: "boolean",
            required: false,
            defaultValue: true,
            description: "Post the message as the authenticated user",
          },
        ],
        sampleOutput: {
          ok: true,
          channel: "C123456",
          ts: "1234567890.123456",
          message: {
            text: "Hello world!",
            user: "U789012",
            type: "message",
            ts: "1234567890.123456",
          },
        },
      },
      {
        key: "send_direct_message",
        name: "Send Direct Message",
        description: "Send a direct message to a user",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "user",
            label: "User",
            type: "dropdown",
            required: true,
            description: "Select a user to message",
            dynamicOptions: {
              endpoint: "/integrations/slack/dynamic/users",
              dependsOn: [],
              searchable: true,
              cacheTTL: 300,
            },
          },
          {
            key: "text",
            label: "Message Text",
            type: "text",
            required: true,
            supportsExpressions: true,
            multiline: true,
            rows: 5,
          },
        ],
        sampleOutput: {
          ok: true,
          channel: "D123456",
          ts: "1234567890.123456",
        },
      },
      {
        key: "add_reaction",
        name: "Add Reaction",
        description: "Add an emoji reaction to a message",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "channel",
            label: "Channel",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/slack/dynamic/channels",
              dependsOn: [],
              searchable: true,
            },
          },
          {
            key: "timestamp",
            label: "Message Timestamp",
            type: "string",
            required: true,
            description: "Timestamp of the message to react to",
            supportsExpressions: true,
          },
          {
            key: "reaction",
            label: "Emoji Name",
            type: "string",
            required: true,
            description: "Name of emoji to use (without colons)",
            placeholder: "thumbsup",
          },
        ],
        sampleOutput: {
          ok: true,
        },
      },
      {
        key: "create_channel",
        name: "Create Channel",
        description: "Create a new channel",
        requiresConnection: true,
        supportsTest: false,
        properties: [
          {
            key: "name",
            label: "Channel Name",
            type: "string",
            required: true,
            description: "Name of the channel (lowercase, no spaces)",
            placeholder: "new-channel",
            validation: {
              pattern: "^[a-z0-9-_]+$",
              customMessage: "Channel name must be lowercase with no spaces",
            },
          },
          {
            key: "is_private",
            label: "Private Channel",
            type: "boolean",
            required: false,
            defaultValue: false,
            description: "Make this a private channel",
          },
        ],
        sampleOutput: {
          ok: true,
          channel: {
            id: "C123456",
            name: "new-channel",
            is_channel: true,
            created: 1234567890,
          },
        },
      },
      {
        key: "find_user",
        name: "Find User",
        description: "Find a user by name or email",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "email",
            label: "Email Address",
            type: "string",
            required: true,
            description: "Email address of the user",
            supportsExpressions: true,
            validation: {
              pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
              customMessage: "Please enter a valid email address",
            },
          },
        ],
        sampleOutput: {
          ok: true,
          user: {
            id: "U123456",
            name: "john.doe",
            real_name: "John Doe",
            email: "john@example.com",
          },
        },
      },
    ],
    docsUrl: "https://docs.swiftflow.ai/integrations/slack",
    supportUrl: "https://support.swiftflow.ai",
    author: "Swift Flow AI",
    installCount: 15420,
    rating: 4.8,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-11-10T10:00:00Z",
  },

  // ============================================================================
  // EMAIL
  // ============================================================================
  {
    id: "gmail",
    name: "Gmail",
    displayName: "Gmail",
    description: "Email service by Google",
    category: "email",
    icon: "https://logo.clearbit.com/gmail.com",
    logoUrl: "https://logo.clearbit.com/gmail.com",
    version: "1.0.0",
    verified: true,
    popular: true,
    new: false,
    auth: {
      type: "oauth2",
      required: true,
      authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
      tokenUrl: "https://oauth2.googleapis.com/token",
      scopes: [
        "https://www.googleapis.com/auth/gmail.send",
        "https://www.googleapis.com/auth/gmail.readonly",
      ],
    },
    triggers: [
      {
        key: "new_email",
        name: "New Email",
        description: "Triggers when a new email arrives",
        type: "polling",
        polling: {
          defaultInterval: 300,
          minInterval: 60,
          maxInterval: 3600,
        },
        properties: [
          {
            key: "label",
            label: "Label",
            type: "dropdown",
            required: false,
            dynamicOptions: {
              endpoint: "/integrations/gmail/dynamic/labels",
              dependsOn: [],
            },
          },
        ],
        sampleOutput: {
          id: "18c1234567890abcd",
          threadId: "18c1234567890abcd",
          from: "sender@example.com",
          to: "recipient@example.com",
          subject: "Hello",
          body: "Email body text",
          date: "2025-11-10T10:30:00Z",
        },
      },
    ],
    actions: [
      {
        key: "send_email",
        name: "Send Email",
        description: "Send a new email",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "to",
            label: "To",
            type: "string",
            required: true,
            description: "Recipient email address",
            supportsExpressions: true,
            validation: {
              pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
              customMessage: "Please enter a valid email address",
            },
          },
          {
            key: "subject",
            label: "Subject",
            type: "string",
            required: true,
            supportsExpressions: true,
          },
          {
            key: "body",
            label: "Body",
            type: "text",
            required: true,
            supportsExpressions: true,
            multiline: true,
            rows: 10,
          },
          {
            key: "cc",
            label: "CC",
            type: "string",
            required: false,
            description: "CC recipients (comma-separated)",
            supportsExpressions: true,
          },
          {
            key: "bcc",
            label: "BCC",
            type: "string",
            required: false,
            description: "BCC recipients (comma-separated)",
            supportsExpressions: true,
          },
        ],
        sampleOutput: {
          id: "18c1234567890abcd",
          threadId: "18c1234567890abcd",
          labelIds: ["SENT"],
        },
      },
      {
        key: "reply_to_email",
        name: "Reply to Email",
        description: "Reply to an existing email",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "message_id",
            label: "Message ID",
            type: "string",
            required: true,
            description: "ID of the message to reply to",
            supportsExpressions: true,
          },
          {
            key: "body",
            label: "Reply Body",
            type: "text",
            required: true,
            supportsExpressions: true,
            multiline: true,
            rows: 10,
          },
        ],
        sampleOutput: {
          id: "18c1234567890abcd",
          threadId: "18c1234567890abcd",
        },
      },
      {
        key: "add_label",
        name: "Add Label to Email",
        description: "Add a label to an email",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "message_id",
            label: "Message ID",
            type: "string",
            required: true,
            supportsExpressions: true,
          },
          {
            key: "label",
            label: "Label",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/gmail/dynamic/labels",
              dependsOn: [],
            },
          },
        ],
        sampleOutput: {
          id: "18c1234567890abcd",
          labelIds: ["INBOX", "Label_123"],
        },
      },
    ],
    docsUrl: "https://docs.swiftflow.ai/integrations/gmail",
    supportUrl: "https://support.swiftflow.ai",
    author: "Swift Flow AI",
    installCount: 12300,
    rating: 4.7,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-11-10T10:00:00Z",
  },

  // ============================================================================
  // CALENDAR
  // ============================================================================
  {
    id: "google-calendar",
    name: "Google Calendar",
    displayName: "Google Calendar",
    description: "Calendar and scheduling service by Google",
    category: "calendar",
    icon: "https://logo.clearbit.com/google.com",
    logoUrl: "https://logo.clearbit.com/google.com",
    version: "1.0.0",
    verified: true,
    popular: true,
    new: false,
    auth: {
      type: "oauth2",
      required: true,
      authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
      tokenUrl: "https://oauth2.googleapis.com/token",
      scopes: [
        "https://www.googleapis.com/auth/calendar",
        "https://www.googleapis.com/auth/calendar.events",
      ],
    },
    triggers: [
      {
        key: "event_start",
        name: "Event Start",
        description: "Triggers when an event starts",
        type: "polling",
        polling: {
          defaultInterval: 60,
          minInterval: 60,
          maxInterval: 300,
        },
        properties: [
          {
            key: "calendar",
            label: "Calendar",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/google-calendar/dynamic/calendars",
              dependsOn: [],
            },
          },
          {
            key: "minutes_before",
            label: "Minutes Before Start",
            type: "number",
            required: false,
            defaultValue: 0,
            description: "Trigger X minutes before event starts",
          },
        ],
        sampleOutput: {
          id: "event123",
          summary: "Team Meeting",
          start: "2025-11-10T14:00:00Z",
          end: "2025-11-10T15:00:00Z",
          attendees: ["john@example.com", "jane@example.com"],
        },
      },
      {
        key: "new_event",
        name: "New Event",
        description: "Triggers when a new event is created",
        type: "webhook",
        properties: [
          {
            key: "calendar",
            label: "Calendar",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/google-calendar/dynamic/calendars",
              dependsOn: [],
            },
          },
        ],
        sampleOutput: {
          id: "event123",
          summary: "New Meeting",
          start: "2025-11-10T14:00:00Z",
          end: "2025-11-10T15:00:00Z",
        },
      },
    ],
    actions: [
      {
        key: "create_event",
        name: "Create Detailed Event",
        description: "Create a new calendar event with all details",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "calendar",
            label: "Calendar",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/google-calendar/dynamic/calendars",
              dependsOn: [],
            },
          },
          {
            key: "summary",
            label: "Event Title",
            type: "string",
            required: true,
            supportsExpressions: true,
          },
          {
            key: "description",
            label: "Description",
            type: "text",
            required: false,
            supportsExpressions: true,
            multiline: true,
            rows: 5,
          },
          {
            key: "start_time",
            label: "Start Time",
            type: "datetime",
            required: true,
            supportsExpressions: true,
          },
          {
            key: "end_time",
            label: "End Time",
            type: "datetime",
            required: true,
            supportsExpressions: true,
          },
          {
            key: "attendees",
            label: "Attendees",
            type: "string",
            required: false,
            description: "Email addresses (comma-separated)",
            supportsExpressions: true,
          },
          {
            key: "location",
            label: "Location",
            type: "string",
            required: false,
            supportsExpressions: true,
          },
          {
            key: "send_notifications",
            label: "Send Notifications",
            type: "boolean",
            required: false,
            defaultValue: true,
          },
        ],
        sampleOutput: {
          id: "event123",
          htmlLink: "https://calendar.google.com/event?eid=...",
          hangoutLink: "https://meet.google.com/abc-defg-hij",
        },
      },
      {
        key: "update_event",
        name: "Update Event",
        description: "Update an existing event",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "calendar",
            label: "Calendar",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/google-calendar/dynamic/calendars",
              dependsOn: [],
            },
          },
          {
            key: "event_id",
            label: "Event ID",
            type: "string",
            required: true,
            supportsExpressions: true,
          },
          {
            key: "summary",
            label: "Event Title",
            type: "string",
            required: false,
            supportsExpressions: true,
          },
          {
            key: "start_time",
            label: "Start Time",
            type: "datetime",
            required: false,
            supportsExpressions: true,
          },
          {
            key: "end_time",
            label: "End Time",
            type: "datetime",
            required: false,
            supportsExpressions: true,
          },
        ],
        sampleOutput: {
          id: "event123",
          updated: "2025-11-10T10:30:00Z",
        },
      },
      {
        key: "delete_event",
        name: "Delete Event",
        description: "Delete an event",
        requiresConnection: true,
        supportsTest: false,
        properties: [
          {
            key: "calendar",
            label: "Calendar",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/google-calendar/dynamic/calendars",
              dependsOn: [],
            },
          },
          {
            key: "event_id",
            label: "Event ID",
            type: "string",
            required: true,
            supportsExpressions: true,
          },
          {
            key: "send_notifications",
            label: "Send Notifications",
            type: "boolean",
            required: false,
            defaultValue: true,
          },
        ],
        sampleOutput: {},
      },
    ],
    docsUrl: "https://docs.swiftflow.ai/integrations/google-calendar",
    supportUrl: "https://support.swiftflow.ai",
    author: "Swift Flow AI",
    installCount: 9800,
    rating: 4.6,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-11-10T10:00:00Z",
  },

  // ============================================================================
  // PROJECT MANAGEMENT
  // ============================================================================
  {
    id: "jira",
    name: "Jira",
    displayName: "Jira",
    description: "Project management and issue tracking",
    category: "project-management",
    icon: "https://logo.clearbit.com/atlassian.com",
    logoUrl: "https://logo.clearbit.com/atlassian.com",
    version: "1.0.0",
    verified: true,
    popular: true,
    new: false,
    auth: {
      type: "oauth2",
      required: true,
      authUrl: "https://auth.atlassian.com/authorize",
      tokenUrl: "https://auth.atlassian.com/oauth/token",
      scopes: ["read:jira-work", "write:jira-work"],
    },
    triggers: [
      {
        key: "new_issue",
        name: "New Issue",
        description: "Triggers when a new issue is created",
        type: "webhook",
        properties: [
          {
            key: "project",
            label: "Project",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/jira/dynamic/projects",
              dependsOn: [],
            },
          },
          {
            key: "issue_type",
            label: "Issue Type",
            type: "dropdown",
            required: false,
            dynamicOptions: {
              endpoint: "/integrations/jira/dynamic/issue-types",
              dependsOn: ["project"],
            },
          },
        ],
        sampleOutput: {
          id: "10001",
          key: "PROJ-123",
          summary: "New bug report",
          description: "Bug description",
          status: "To Do",
          assignee: "john@example.com",
        },
      },
      {
        key: "issue_status_changed",
        name: "Issue Status Changed",
        description: "Triggers when issue status changes",
        type: "webhook",
        properties: [
          {
            key: "project",
            label: "Project",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/jira/dynamic/projects",
              dependsOn: [],
            },
          },
          {
            key: "from_status",
            label: "From Status",
            type: "dropdown",
            required: false,
            dynamicOptions: {
              endpoint: "/integrations/jira/dynamic/statuses",
              dependsOn: ["project"],
            },
          },
          {
            key: "to_status",
            label: "To Status",
            type: "dropdown",
            required: false,
            dynamicOptions: {
              endpoint: "/integrations/jira/dynamic/statuses",
              dependsOn: ["project"],
            },
          },
        ],
        sampleOutput: {
          id: "10001",
          key: "PROJ-123",
          from_status: "To Do",
          to_status: "In Progress",
        },
      },
    ],
    actions: [
      {
        key: "create_issue",
        name: "Create Issue",
        description: "Create a new Jira issue",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "project",
            label: "Project",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/jira/dynamic/projects",
              dependsOn: [],
            },
          },
          {
            key: "issue_type",
            label: "Issue Type",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/jira/dynamic/issue-types",
              dependsOn: ["project"],
            },
          },
          {
            key: "summary",
            label: "Summary",
            type: "string",
            required: true,
            supportsExpressions: true,
          },
          {
            key: "description",
            label: "Description",
            type: "text",
            required: false,
            supportsExpressions: true,
            multiline: true,
            rows: 8,
          },
          {
            key: "priority",
            label: "Priority",
            type: "dropdown",
            required: false,
            options: [
              { label: "Highest", value: "1" },
              { label: "High", value: "2" },
              { label: "Medium", value: "3" },
              { label: "Low", value: "4" },
              { label: "Lowest", value: "5" },
            ],
          },
          {
            key: "assignee",
            label: "Assignee",
            type: "dropdown",
            required: false,
            dynamicOptions: {
              endpoint: "/integrations/jira/dynamic/users",
              dependsOn: ["project"],
              searchable: true,
            },
          },
        ],
        sampleOutput: {
          id: "10001",
          key: "PROJ-123",
          self: "https://your-domain.atlassian.net/rest/api/3/issue/10001",
        },
      },
      {
        key: "update_issue",
        name: "Update Issue",
        description: "Update an existing issue",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "issue_key",
            label: "Issue Key",
            type: "string",
            required: true,
            description: "e.g., PROJ-123",
            supportsExpressions: true,
          },
          {
            key: "summary",
            label: "Summary",
            type: "string",
            required: false,
            supportsExpressions: true,
          },
          {
            key: "description",
            label: "Description",
            type: "text",
            required: false,
            supportsExpressions: true,
            multiline: true,
            rows: 8,
          },
          {
            key: "assignee",
            label: "Assignee",
            type: "dropdown",
            required: false,
            dynamicOptions: {
              endpoint: "/integrations/jira/dynamic/users",
              dependsOn: [],
              searchable: true,
            },
          },
        ],
        sampleOutput: {
          id: "10001",
          key: "PROJ-123",
        },
      },
      {
        key: "add_comment",
        name: "Add Comment",
        description: "Add a comment to an issue",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "issue_key",
            label: "Issue Key",
            type: "string",
            required: true,
            supportsExpressions: true,
          },
          {
            key: "comment",
            label: "Comment",
            type: "text",
            required: true,
            supportsExpressions: true,
            multiline: true,
            rows: 5,
          },
        ],
        sampleOutput: {
          id: "10100",
          body: "Comment text",
          created: "2025-11-10T10:30:00Z",
        },
      },
      {
        key: "change_status",
        name: "Change Status",
        description: "Transition issue to different status",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "issue_key",
            label: "Issue Key",
            type: "string",
            required: true,
            supportsExpressions: true,
          },
          {
            key: "transition",
            label: "Transition",
            type: "dropdown",
            required: true,
            description: "Available transitions for this issue",
            dynamicOptions: {
              endpoint: "/integrations/jira/dynamic/transitions",
              dependsOn: ["issue_key"],
            },
          },
        ],
        sampleOutput: {
          id: "10001",
          key: "PROJ-123",
          status: "In Progress",
        },
      },
    ],
    docsUrl: "https://docs.swiftflow.ai/integrations/jira",
    supportUrl: "https://support.swiftflow.ai",
    author: "Swift Flow AI",
    installCount: 8900,
    rating: 4.5,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-11-10T10:00:00Z",
  },

  // ============================================================================
  // DEVELOPER TOOLS
  // ============================================================================
  {
    id: "github",
    name: "GitHub",
    displayName: "GitHub",
    description: "Code hosting and collaboration platform",
    category: "developer-tools",
    icon: "https://logo.clearbit.com/github.com",
    logoUrl: "https://logo.clearbit.com/github.com",
    version: "1.0.0",
    verified: true,
    popular: true,
    new: false,
    auth: {
      type: "oauth2",
      required: true,
      authUrl: "https://github.com/login/oauth/authorize",
      tokenUrl: "https://github.com/login/oauth/access_token",
      scopes: ["repo", "user", "workflow"],
    },
    triggers: [
      {
        key: "new_issue",
        name: "New Issue",
        description: "Triggers when a new issue is opened",
        type: "webhook",
        properties: [
          {
            key: "repository",
            label: "Repository",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/github/dynamic/repositories",
              dependsOn: [],
              searchable: true,
            },
          },
        ],
        sampleOutput: {
          id: 123456,
          number: 42,
          title: "Bug report",
          body: "Issue description",
          state: "open",
          user: {
            login: "johndoe",
            id: 789,
          },
        },
      },
      {
        key: "new_pull_request",
        name: "New Pull Request",
        description: "Triggers when a new PR is created",
        type: "webhook",
        properties: [
          {
            key: "repository",
            label: "Repository",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/github/dynamic/repositories",
              dependsOn: [],
              searchable: true,
            },
          },
        ],
        sampleOutput: {
          id: 123456,
          number: 42,
          title: "Feature: Add new component",
          state: "open",
          draft: false,
        },
      },
      {
        key: "pull_request_merged",
        name: "Pull Request Merged",
        description: "Triggers when a PR is merged",
        type: "webhook",
        properties: [
          {
            key: "repository",
            label: "Repository",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/github/dynamic/repositories",
              dependsOn: [],
              searchable: true,
            },
          },
        ],
        sampleOutput: {
          id: 123456,
          number: 42,
          merged: true,
          merged_at: "2025-11-10T10:30:00Z",
        },
      },
    ],
    actions: [
      {
        key: "create_issue",
        name: "Create Issue",
        description: "Create a new GitHub issue",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "repository",
            label: "Repository",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/github/dynamic/repositories",
              dependsOn: [],
              searchable: true,
            },
          },
          {
            key: "title",
            label: "Title",
            type: "string",
            required: true,
            supportsExpressions: true,
          },
          {
            key: "body",
            label: "Body",
            type: "text",
            required: false,
            supportsExpressions: true,
            multiline: true,
            rows: 8,
          },
          {
            key: "labels",
            label: "Labels",
            type: "multi-select",
            required: false,
            dynamicOptions: {
              endpoint: "/integrations/github/dynamic/labels",
              dependsOn: ["repository"],
            },
          },
          {
            key: "assignees",
            label: "Assignees",
            type: "multi-select",
            required: false,
            dynamicOptions: {
              endpoint: "/integrations/github/dynamic/collaborators",
              dependsOn: ["repository"],
              searchable: true,
            },
          },
        ],
        sampleOutput: {
          id: 123456,
          number: 42,
          html_url: "https://github.com/owner/repo/issues/42",
        },
      },
      {
        key: "add_comment",
        name: "Add Comment to Issue",
        description: "Add a comment to an issue",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "repository",
            label: "Repository",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/github/dynamic/repositories",
              dependsOn: [],
              searchable: true,
            },
          },
          {
            key: "issue_number",
            label: "Issue Number",
            type: "number",
            required: true,
            supportsExpressions: true,
          },
          {
            key: "body",
            label: "Comment",
            type: "text",
            required: true,
            supportsExpressions: true,
            multiline: true,
            rows: 5,
          },
        ],
        sampleOutput: {
          id: 789012,
          body: "Comment text",
          created_at: "2025-11-10T10:30:00Z",
        },
      },
      {
        key: "create_pull_request",
        name: "Create Pull Request",
        description: "Create a new pull request",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "repository",
            label: "Repository",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/github/dynamic/repositories",
              dependsOn: [],
              searchable: true,
            },
          },
          {
            key: "title",
            label: "Title",
            type: "string",
            required: true,
            supportsExpressions: true,
          },
          {
            key: "head",
            label: "Head Branch",
            type: "dropdown",
            required: true,
            description: "Branch with changes",
            dynamicOptions: {
              endpoint: "/integrations/github/dynamic/branches",
              dependsOn: ["repository"],
            },
          },
          {
            key: "base",
            label: "Base Branch",
            type: "dropdown",
            required: true,
            description: "Branch to merge into",
            dynamicOptions: {
              endpoint: "/integrations/github/dynamic/branches",
              dependsOn: ["repository"],
            },
          },
          {
            key: "body",
            label: "Description",
            type: "text",
            required: false,
            supportsExpressions: true,
            multiline: true,
            rows: 8,
          },
        ],
        sampleOutput: {
          id: 123456,
          number: 42,
          html_url: "https://github.com/owner/repo/pull/42",
        },
      },
      {
        key: "merge_pull_request",
        name: "Merge Pull Request",
        description: "Merge a pull request",
        requiresConnection: true,
        supportsTest: false,
        properties: [
          {
            key: "repository",
            label: "Repository",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/github/dynamic/repositories",
              dependsOn: [],
              searchable: true,
            },
          },
          {
            key: "pull_number",
            label: "Pull Request Number",
            type: "number",
            required: true,
            supportsExpressions: true,
          },
          {
            key: "merge_method",
            label: "Merge Method",
            type: "dropdown",
            required: false,
            defaultValue: "merge",
            options: [
              { label: "Create a merge commit", value: "merge" },
              { label: "Squash and merge", value: "squash" },
              { label: "Rebase and merge", value: "rebase" },
            ],
          },
        ],
        sampleOutput: {
          sha: "abc123def456",
          merged: true,
          message: "Pull Request successfully merged",
        },
      },
    ],
    docsUrl: "https://docs.swiftflow.ai/integrations/github",
    supportUrl: "https://support.swiftflow.ai",
    author: "Swift Flow AI",
    installCount: 14200,
    rating: 4.8,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-11-10T10:00:00Z",
  },

  // ============================================================================
  // SCHEDULING
  // ============================================================================
  {
    id: "calendly",
    name: "Calendly",
    displayName: "Calendly",
    description: "Scheduling and calendar booking platform",
    category: "scheduling",
    icon: "https://logo.clearbit.com/calendly.com",
    logoUrl: "https://logo.clearbit.com/calendly.com",
    version: "1.0.0",
    verified: true,
    popular: false,
    new: false,
    auth: {
      type: "oauth2",
      required: true,
      authUrl: "https://auth.calendly.com/oauth/authorize",
      tokenUrl: "https://auth.calendly.com/oauth/token",
      scopes: ["default"],
    },
    triggers: [
      {
        key: "invitee_created",
        name: "Invitee Created",
        description: "Triggers when someone books a meeting",
        type: "webhook",
        properties: [
          {
            key: "event_type",
            label: "Event Type",
            type: "dropdown",
            required: false,
            description: "Filter by specific event type",
            dynamicOptions: {
              endpoint: "/integrations/calendly/dynamic/event-types",
              dependsOn: [],
            },
          },
        ],
        sampleOutput: {
          uri: "https://api.calendly.com/scheduled_events/abc123",
          name: "John Doe",
          email: "john@example.com",
          event: {
            name: "30 Minute Meeting",
            start_time: "2025-11-10T14:00:00Z",
            end_time: "2025-11-10T14:30:00Z",
          },
        },
      },
      {
        key: "invitee_cancelled",
        name: "Invitee Cancelled",
        description: "Triggers when a meeting is cancelled",
        type: "webhook",
        properties: [],
        sampleOutput: {
          uri: "https://api.calendly.com/scheduled_events/abc123",
          name: "John Doe",
          email: "john@example.com",
          cancelled_at: "2025-11-10T10:30:00Z",
        },
      },
    ],
    actions: [
      {
        key: "get_event",
        name: "Get Event",
        description: "Get details of a scheduled event",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "event_uri",
            label: "Event URI",
            type: "string",
            required: true,
            description: "Calendly event URI",
            supportsExpressions: true,
          },
        ],
        sampleOutput: {
          uri: "https://api.calendly.com/scheduled_events/abc123",
          name: "30 Minute Meeting",
          start_time: "2025-11-10T14:00:00Z",
          end_time: "2025-11-10T14:30:00Z",
          invitees_counter: {
            total: 1,
            active: 1,
          },
        },
      },
      {
        key: "cancel_event",
        name: "Cancel Event",
        description: "Cancel a scheduled event",
        requiresConnection: true,
        supportsTest: false,
        properties: [
          {
            key: "invitee_uri",
            label: "Invitee URI",
            type: "string",
            required: true,
            supportsExpressions: true,
          },
          {
            key: "reason",
            label: "Cancellation Reason",
            type: "text",
            required: false,
            supportsExpressions: true,
            multiline: true,
            rows: 3,
          },
        ],
        sampleOutput: {
          resource: {
            uri: "https://api.calendly.com/scheduled_events/abc123",
            cancel_url: "https://calendly.com/cancellations/abc123",
            cancellation: {
              canceled_by: "John Doe",
              reason: "Reason text",
            },
          },
        },
      },
    ],
    docsUrl: "https://docs.swiftflow.ai/integrations/calendly",
    supportUrl: "https://support.swiftflow.ai",
    author: "Swift Flow AI",
    installCount: 5600,
    rating: 4.4,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-11-10T10:00:00Z",
  },

  // ============================================================================
  // DATABASE
  // ============================================================================
  {
    id: "postgresql",
    name: "PostgreSQL",
    displayName: "PostgreSQL",
    description: "Open-source relational database",
    category: "database",
    icon: "https://logo.clearbit.com/postgresql.org",
    logoUrl: "https://logo.clearbit.com/postgresql.org",
    version: "1.0.0",
    verified: true,
    popular: false,
    new: false,
    auth: {
      type: "basic",
      required: true,
      fields: [
        {
          key: "host",
          label: "Host",
          type: "string",
          required: true,
          placeholder: "localhost",
        },
        {
          key: "port",
          label: "Port",
          type: "string",
          required: true,
          placeholder: "5432",
        },
        {
          key: "database",
          label: "Database",
          type: "string",
          required: true,
        },
        {
          key: "username",
          label: "Username",
          type: "string",
          required: true,
        },
        {
          key: "password",
          label: "Password",
          type: "password",
          required: true,
        },
      ],
    },
    triggers: [
      {
        key: "new_row",
        name: "New Row",
        description: "Triggers when a new row is inserted",
        type: "polling",
        polling: {
          defaultInterval: 300,
          minInterval: 60,
          maxInterval: 3600,
        },
        properties: [
          {
            key: "table",
            label: "Table",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/postgresql/dynamic/tables",
              dependsOn: [],
            },
          },
          {
            key: "timestamp_column",
            label: "Timestamp Column",
            type: "dropdown",
            required: true,
            description: "Column to track new rows",
            dynamicOptions: {
              endpoint: "/integrations/postgresql/dynamic/columns",
              dependsOn: ["table"],
            },
          },
        ],
        sampleOutput: {
          id: 123,
          created_at: "2025-11-10T10:30:00Z",
        },
      },
    ],
    actions: [
      {
        key: "execute_query",
        name: "Execute Query",
        description: "Run a custom SQL query",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "query",
            label: "SQL Query",
            type: "code",
            language: "sql",
            required: true,
            supportsExpressions: true,
            multiline: true,
            rows: 10,
          },
        ],
        sampleOutput: {
          rows: [],
          rowCount: 0,
        },
      },
      {
        key: "insert_row",
        name: "Insert Row",
        description: "Insert a new row into a table",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "table",
            label: "Table",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/postgresql/dynamic/tables",
              dependsOn: [],
            },
          },
          {
            key: "data",
            label: "Data",
            type: "json",
            required: true,
            description: "JSON object with column names and values",
            supportsExpressions: true,
          },
        ],
        sampleOutput: {
          id: 123,
          inserted: true,
        },
      },
      {
        key: "update_row",
        name: "Update Row",
        description: "Update an existing row",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "table",
            label: "Table",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/postgresql/dynamic/tables",
              dependsOn: [],
            },
          },
          {
            key: "where",
            label: "WHERE Clause",
            type: "string",
            required: true,
            description: "e.g., id = 123",
            supportsExpressions: true,
          },
          {
            key: "data",
            label: "Data",
            type: "json",
            required: true,
            supportsExpressions: true,
          },
        ],
        sampleOutput: {
          rowCount: 1,
          updated: true,
        },
      },
      {
        key: "find_row",
        name: "Find Row",
        description: "Search for rows matching criteria",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "table",
            label: "Table",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/postgresql/dynamic/tables",
              dependsOn: [],
            },
          },
          {
            key: "where",
            label: "WHERE Clause",
            type: "string",
            required: true,
            supportsExpressions: true,
          },
          {
            key: "limit",
            label: "Limit",
            type: "number",
            required: false,
            defaultValue: 100,
          },
        ],
        sampleOutput: {
          rows: [],
          rowCount: 0,
        },
      },
    ],
    docsUrl: "https://docs.swiftflow.ai/integrations/postgresql",
    supportUrl: "https://support.swiftflow.ai",
    author: "Swift Flow AI",
    installCount: 3200,
    rating: 4.6,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-11-10T10:00:00Z",
  },

  {
    id: "mongodb",
    name: "MongoDB",
    displayName: "MongoDB",
    description: "NoSQL document database",
    category: "database",
    icon: "https://logo.clearbit.com/mongodb.com",
    logoUrl: "https://logo.clearbit.com/mongodb.com",
    version: "1.0.0",
    verified: true,
    popular: false,
    new: false,
    auth: {
      type: "basic",
      required: true,
      fields: [
        {
          key: "connection_string",
          label: "Connection String",
          type: "string",
          required: true,
          placeholder: "mongodb://localhost:27017/mydb",
          description: "MongoDB connection string",
        },
      ],
    },
    triggers: [
      {
        key: "new_document",
        name: "New Document",
        description: "Triggers when a new document is inserted",
        type: "polling",
        polling: {
          defaultInterval: 300,
          minInterval: 60,
          maxInterval: 3600,
        },
        properties: [
          {
            key: "collection",
            label: "Collection",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/mongodb/dynamic/collections",
              dependsOn: [],
            },
          },
          {
            key: "timestamp_field",
            label: "Timestamp Field",
            type: "string",
            required: true,
            defaultValue: "createdAt",
          },
        ],
        sampleOutput: {
          _id: "507f1f77bcf86cd799439011",
          createdAt: "2025-11-10T10:30:00Z",
        },
      },
    ],
    actions: [
      {
        key: "find_document",
        name: "Find Document",
        description: "Search for documents matching query",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "collection",
            label: "Collection",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/mongodb/dynamic/collections",
              dependsOn: [],
            },
          },
          {
            key: "query",
            label: "Query",
            type: "json",
            required: true,
            description: "MongoDB query object",
            supportsExpressions: true,
          },
          {
            key: "limit",
            label: "Limit",
            type: "number",
            required: false,
            defaultValue: 100,
          },
        ],
        sampleOutput: {
          documents: [],
          count: 0,
        },
      },
      {
        key: "insert_document",
        name: "Insert Document",
        description: "Insert a new document",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "collection",
            label: "Collection",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/mongodb/dynamic/collections",
              dependsOn: [],
            },
          },
          {
            key: "document",
            label: "Document",
            type: "json",
            required: true,
            supportsExpressions: true,
          },
        ],
        sampleOutput: {
          _id: "507f1f77bcf86cd799439011",
          inserted: true,
        },
      },
      {
        key: "update_document",
        name: "Update Document",
        description: "Update an existing document",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "collection",
            label: "Collection",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/mongodb/dynamic/collections",
              dependsOn: [],
            },
          },
          {
            key: "filter",
            label: "Filter",
            type: "json",
            required: true,
            description: "Query to find document",
            supportsExpressions: true,
          },
          {
            key: "update",
            label: "Update",
            type: "json",
            required: true,
            description: "Update operations",
            supportsExpressions: true,
          },
        ],
        sampleOutput: {
          matchedCount: 1,
          modifiedCount: 1,
        },
      },
      {
        key: "delete_document",
        name: "Delete Document",
        description: "Delete a document",
        requiresConnection: true,
        supportsTest: false,
        properties: [
          {
            key: "collection",
            label: "Collection",
            type: "dropdown",
            required: true,
            dynamicOptions: {
              endpoint: "/integrations/mongodb/dynamic/collections",
              dependsOn: [],
            },
          },
          {
            key: "filter",
            label: "Filter",
            type: "json",
            required: true,
            supportsExpressions: true,
          },
        ],
        sampleOutput: {
          deletedCount: 1,
        },
      },
    ],
    docsUrl: "https://docs.swiftflow.ai/integrations/mongodb",
    supportUrl: "https://support.swiftflow.ai",
    author: "Swift Flow AI",
    installCount: 2800,
    rating: 4.5,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-11-10T10:00:00Z",
  },

  // ============================================================================
  // AI
  // ============================================================================
  {
    id: "openai",
    name: "OpenAI",
    displayName: "OpenAI",
    description: "AI models including GPT-4, DALL-E, and Whisper",
    category: "ai",
    icon: "https://logo.clearbit.com/openai.com",
    logoUrl: "https://logo.clearbit.com/openai.com",
    version: "1.0.0",
    verified: true,
    popular: true,
    new: false,
    auth: {
      type: "api-key",
      required: true,
      fields: [
        {
          key: "api_key",
          label: "API Key",
          type: "password",
          required: true,
          description: "Your OpenAI API key",
          placeholder: "sk-...",
        },
      ],
    },
    triggers: [],
    actions: [
      {
        key: "chat_completion",
        name: "Chat Completion",
        description: "Generate text using GPT models",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "model",
            label: "Model",
            type: "dropdown",
            required: true,
            defaultValue: "gpt-4",
            options: [
              { label: "GPT-4", value: "gpt-4" },
              { label: "GPT-4 Turbo", value: "gpt-4-turbo-preview" },
              { label: "GPT-3.5 Turbo", value: "gpt-3.5-turbo" },
            ],
          },
          {
            key: "messages",
            label: "Messages",
            type: "json",
            required: true,
            description: "Array of message objects",
            supportsExpressions: true,
          },
          {
            key: "temperature",
            label: "Temperature",
            type: "number",
            required: false,
            defaultValue: 0.7,
            validation: {
              min: 0,
              max: 2,
            },
          },
          {
            key: "max_tokens",
            label: "Max Tokens",
            type: "number",
            required: false,
            defaultValue: 1000,
          },
        ],
        sampleOutput: {
          id: "chatcmpl-123",
          choices: [
            {
              message: {
                role: "assistant",
                content: "Generated text response",
              },
              finish_reason: "stop",
            },
          ],
          usage: {
            prompt_tokens: 10,
            completion_tokens: 20,
            total_tokens: 30,
          },
        },
      },
      {
        key: "create_image",
        name: "Create Image",
        description: "Generate images using DALL-E",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "prompt",
            label: "Prompt",
            type: "text",
            required: true,
            supportsExpressions: true,
            multiline: true,
            rows: 5,
          },
          {
            key: "size",
            label: "Size",
            type: "dropdown",
            required: false,
            defaultValue: "1024x1024",
            options: [
              { label: "256x256", value: "256x256" },
              { label: "512x512", value: "512x512" },
              { label: "1024x1024", value: "1024x1024" },
            ],
          },
        ],
        sampleOutput: {
          data: [
            {
              url: "https://example.com/image.png",
            },
          ],
        },
      },
    ],
    docsUrl: "https://docs.swiftflow.ai/integrations/openai",
    supportUrl: "https://support.swiftflow.ai",
    author: "Swift Flow AI",
    installCount: 18900,
    rating: 4.9,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-11-10T10:00:00Z",
  },

  {
    id: "anthropic",
    name: "Anthropic",
    displayName: "Anthropic (Claude)",
    description: "Claude AI models for advanced reasoning",
    category: "ai",
    icon: "https://logo.clearbit.com/anthropic.com",
    logoUrl: "https://logo.clearbit.com/anthropic.com",
    version: "1.0.0",
    verified: true,
    popular: true,
    new: false,
    auth: {
      type: "api-key",
      required: true,
      fields: [
        {
          key: "api_key",
          label: "API Key",
          type: "password",
          required: true,
          description: "Your Anthropic API key",
        },
      ],
    },
    triggers: [],
    actions: [
      {
        key: "create_message",
        name: "Create Message",
        description: "Generate text using Claude models",
        requiresConnection: true,
        supportsTest: true,
        properties: [
          {
            key: "model",
            label: "Model",
            type: "dropdown",
            required: true,
            defaultValue: "claude-3-opus-20240229",
            options: [
              { label: "Claude 3 Opus", value: "claude-3-opus-20240229" },
              { label: "Claude 3 Sonnet", value: "claude-3-sonnet-20240229" },
              { label: "Claude 3 Haiku", value: "claude-3-haiku-20240307" },
            ],
          },
          {
            key: "messages",
            label: "Messages",
            type: "json",
            required: true,
            supportsExpressions: true,
          },
          {
            key: "max_tokens",
            label: "Max Tokens",
            type: "number",
            required: true,
            defaultValue: 1024,
          },
          {
            key: "temperature",
            label: "Temperature",
            type: "number",
            required: false,
            defaultValue: 1.0,
            validation: {
              min: 0,
              max: 1,
            },
          },
        ],
        sampleOutput: {
          id: "msg_123",
          content: [
            {
              type: "text",
              text: "Generated response",
            },
          ],
          usage: {
            input_tokens: 10,
            output_tokens: 20,
          },
        },
      },
    ],
    docsUrl: "https://docs.swiftflow.ai/integrations/anthropic",
    supportUrl: "https://support.swiftflow.ai",
    author: "Swift Flow AI",
    installCount: 8700,
    rating: 4.8,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-11-10T10:00:00Z",
  },
];

// Helper function to get integration by ID
export function getIntegrationById(
  id: string
): IntegrationDefinition | undefined {
  return integrationDefinitions.find((int) => int.id === id);
}

// Helper function to get integrations by category
export function getIntegrationsByCategory(
  category: string
): IntegrationDefinition[] {
  if (category === "all") return integrationDefinitions;
  return integrationDefinitions.filter((int) => int.category === category);
}

// Helper function to search integrations
export function searchIntegrations(query: string): IntegrationDefinition[] {
  const lowerQuery = query.toLowerCase();
  return integrationDefinitions.filter(
    (int) =>
      int.name.toLowerCase().includes(lowerQuery) ||
      int.displayName.toLowerCase().includes(lowerQuery) ||
      int.description.toLowerCase().includes(lowerQuery)
  );
}
