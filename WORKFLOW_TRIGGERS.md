# Workflow Trigger Types

## Overview

Swift Flow AI supports multiple trigger types for workflows, allowing flexible automation patterns. Users can configure workflows to start in different ways based on their business needs.

## Supported Trigger Types

### 1. Manual Trigger

**Use Case:** User-initiated workflows that require explicit permission

**Configuration:**

- **Allowed Users:** Specify which users/roles can trigger the workflow
  - Leave empty to allow all workspace members
  - Add specific user emails to restrict access
- **Require Approval:** Optional setting to require admin approval before execution

**Example Scenarios:**

- Expense report approval workflows triggered by employees
- Custom report generation triggered by managers
- One-off data processing tasks

### 2. Webhook Trigger

**Use Case:** External systems triggering workflows via HTTP requests

**Configuration:**

- **HTTP Method:** POST, GET, or PUT
- **Webhook URL:** Auto-generated unique endpoint
  - Format: `https://api.swiftflow.ai/webhooks/{workflow-slug}`
- **Authentication:** HMAC signature verification (X-FlowAI-Signature header)
- **Payload:** Custom JSON data structure

**Example Scenarios:**

- New customer signup from website → trigger onboarding workflow
- Payment received → trigger fulfillment workflow
- Form submission → trigger approval workflow
- Third-party service event → trigger notification workflow

### 3. Workflow Complete Trigger

**Use Case:** Chain workflows together - start one workflow when another completes

**Configuration:**

- **Source Workflow:** Select the workflow that triggers this one
- **Trigger Condition:** On success, on failure, or always
- **Data Mapping:** Pass output from source workflow to this workflow

**Example Scenarios:**

- Employee onboarding completes → trigger IT setup workflow
- Invoice approval completes → trigger payment processing workflow
- Customer onboarding completes → trigger welcome email workflow
- Data import completes → trigger validation workflow

**Benefits:**

- Create complex multi-stage processes
- Decouple workflows for better maintainability
- Reuse workflows across different processes
- Better error handling and recovery

### 4. Schedule Trigger

**Use Case:** Time-based automation that runs periodically

**Configuration:**

- **Schedule Type:**
  - Cron Expression: Full cron syntax support
  - Interval: Simple interval (every X minutes/hours/days)
- **Timezone:** Workspace timezone or custom
- **Run Window:** Optional start/end times

**Cron Expression Examples:**

- `0 9 * * 1-5` - Every weekday at 9 AM
- `0 0 1 * *` - First day of every month at midnight
- `*/15 * * * *` - Every 15 minutes
- `0 18 * * 5` - Every Friday at 6 PM

**Example Scenarios:**

- Daily report generation at 9 AM
- Weekly cleanup tasks every Sunday
- Monthly billing runs on the 1st
- Quarterly compliance checks
- Hourly data sync from external systems

### 5. Email Trigger

**Use Case:** Workflows triggered by incoming emails

**Configuration:**

- **Email Address:** Auto-generated workflow email
  - Format: `workflow-{id}@swiftflow.ai`
- **Sender Whitelist:** Only accept emails from specific addresses/domains
- **Subject Filter:** Optional regex to match subject lines
- **Attachment Handling:** Parse and extract attachments

**Example Scenarios:**

- Support tickets from customer emails
- Document processing from scanned invoices
- Order processing from supplier emails
- Automated invoice data extraction

## Technical Implementation

### API Endpoints

#### Execute Manual Trigger

```
POST /workspaces/:workspaceId/workflows/:workflowId/execute
```

#### Webhook Endpoint

```
POST /webhooks/:workflowSlug
Header: X-FlowAI-Signature: <hmac_signature>
```

#### Workflow Chaining (Internal)

Automatically triggered by workflow engine when source workflow completes.

#### Schedule Management

```
GET /workspaces/:workspaceId/workflows/:workflowId/schedule
PATCH /workspaces/:workspaceId/workflows/:workflowId/schedule
```

### Database Schema

```typescript
interface WorkflowTrigger {
  id: string;
  workflowId: string;
  type: "manual" | "webhook" | "workflow_complete" | "schedule" | "email";
  config: TriggerConfig;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

type TriggerConfig =
  | ManualTriggerConfig
  | WebhookTriggerConfig
  | WorkflowCompleteTriggerConfig
  | ScheduleTriggerConfig
  | EmailTriggerConfig;

interface ManualTriggerConfig {
  allowedUsers: string[]; // User IDs or emails
  requireApproval: boolean;
}

interface WebhookTriggerConfig {
  method: "POST" | "GET" | "PUT";
  path: string;
  secret: string; // For HMAC verification
}

interface WorkflowCompleteTriggerConfig {
  sourceWorkflowId: string;
  condition: "success" | "failure" | "always";
  dataMapping?: Record<string, string>;
}

interface ScheduleTriggerConfig {
  type: "cron" | "interval";
  cronExpression?: string;
  intervalSeconds?: number;
  timezone: string;
  enabled: boolean;
}

interface EmailTriggerConfig {
  emailAddress: string;
  senderWhitelist: string[];
  subjectFilter?: string; // Regex
  parseAttachments: boolean;
}
```

## UI Components

### Trigger Configuration Panel

Located in Workflow Builder, right sidebar when trigger node is selected:

1. **Trigger Type Dropdown:** Select from available trigger types
2. **Type-Specific Configuration:** Dynamic form based on selected type
3. **Test Trigger Button:** Simulate trigger for testing
4. **Webhook URL Display:** Copy webhook URL with authentication details

### Workflow List Actions

- **Manual Trigger Button:** "Run Workflow" button for manual trigger workflows
- **Trigger Status Indicator:** Show if scheduled workflows are active
- **Last Triggered:** Display last execution timestamp and trigger source

## Security Considerations

### Manual Triggers

- Validate user permissions before execution
- Log all manual triggers with user identity
- Optional approval workflow before execution

### Webhooks

- HMAC signature verification required
- Rate limiting per webhook endpoint
- IP whitelist support for additional security
- Payload size limits (10 MB default)

### Workflow Chaining

- Validate source workflow permissions
- Prevent infinite loops (max depth: 10)
- Timeout protection (max chain duration)

### Email Triggers

- SPF/DKIM validation
- Sender whitelist enforcement
- Attachment virus scanning
- Size limits (25 MB per email)

## Monitoring & Debugging

### Trigger Logs

All triggers logged with:

- Trigger type and source
- Input payload
- Execution ID
- Success/failure status
- Duration

### Analytics

- Trigger success rate by type
- Most active trigger sources
- Failed trigger analysis
- Trigger latency metrics

## Best Practices

1. **Manual Triggers:**

   - Use for ad-hoc workflows that require human judgment
   - Always specify allowed users for sensitive workflows
   - Add clear descriptions for what the workflow does

2. **Webhooks:**

   - Always verify HMAC signatures
   - Use HTTPS endpoints only
   - Document expected payload structure
   - Implement idempotency for duplicate webhook deliveries

3. **Workflow Chaining:**

   - Keep chains shallow (max 3-4 levels)
   - Use meaningful names for clarity
   - Document data flow between workflows
   - Handle failures gracefully with error workflows

4. **Schedules:**

   - Use timezone-aware schedules
   - Avoid overlapping runs with mutex locks
   - Set reasonable timeouts
   - Monitor execution times for schedule drift

5. **Email Triggers:**
   - Always use sender whitelist
   - Parse structured data (JSON, CSV) from attachments
   - Handle duplicate emails with deduplication
   - Archive processed emails

## Example Workflows

### Example 1: Employee Onboarding Chain

```
1. Manual Trigger (HR starts onboarding)
   ↓
2. Generate onboarding plan (AI Agent)
   ↓
3. Manager approval
   ↓
4. Trigger "IT Setup Workflow" (Workflow Complete Trigger)
   ↓
5. Trigger "Welcome Email Workflow" (Workflow Complete Trigger)
```

### Example 2: Invoice Processing

```
Email Trigger (invoice@company.com)
   ↓
Extract invoice data (AI OCR)
   ↓
Validate against PO (API call)
   ↓
Approval workflow
   ↓
Payment processing (on approval)
```

### Example 3: Scheduled Reporting

```
Schedule Trigger (Daily 9 AM)
   ↓
Fetch data from databases
   ↓
Generate report (AI analysis)
   ↓
Send via Slack + Email
```

---

## Future Enhancements

- **Event-based triggers:** Database changes, file uploads, Slack messages
- **Composite triggers:** AND/OR logic for multiple trigger conditions
- **Delayed triggers:** Trigger X minutes/hours after condition met
- **Trigger versioning:** A/B test different trigger configurations
- **Custom triggers:** Developer API for custom trigger types
