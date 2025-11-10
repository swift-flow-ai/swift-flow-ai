# 🔌 Production-Ready Integration System

## 📋 Overview

This is a **backend-driven integration system** where:

- Apps are available in the **App Catalog**
- Users can **connect apps on-demand** during workflow creation
- Supports **multiple accounts per app** (e.g., 2 Slack workspaces)
- **Dynamic options** fetched from API (channels, users, etc.)

> **📐 Data Structure Reference:** See [INTEGRATION_DATA_STRUCTURE.md](./INTEGRATION_DATA_STRUCTURE.md) for complete technical specifications, TypeScript interfaces, and examples.

---

## 🏗️ Architecture

### Flow

```
1. APP CENTER (Configuration)
   User installs Slack → OAuth → "Engineering Slack" (active)
   User installs Slack → OAuth → "Sales Slack" (active)

2. WORKFLOW BUILDER (Usage)
   User creates workflow
   → Clicks "+" to add step
   → Searches for app: "Slack" (shows ALL apps, not just installed)
   → Selects "Slack" app
   → Selects "Send Message" event/action
   → If not connected: "Sign in to Slack" → OAuth flow → Creates connection
   → Configuration form appears:
      - Account: [Engineering Slack ▼] (dropdown of connections)
      - Channel: [Fetched dynamically from selected account]
      - Message: "Hello there!"
      - Can use data from previous steps
   → Clicks "Continue"
   → Step added to workflow
   → Can test the step before saving
```

---

## 🎯 Key Features

### 1. All Apps Available

- Shows **ALL apps** in catalog (not just installed)
- User can connect during workflow creation
- No need to pre-install in App Center

### 2. Multi-Account Support

- Can have multiple accounts per app: "Engineering Slack", "Sales Slack"
- Dropdown to switch between accounts
- "+ Add new account" option in dropdown

### 3. Dynamic Fields

- Fields load based on selected account
- Channel dropdown fetches from **selected Slack account**
- Options refresh when account changes

### 4. Data Mapping

- Insert data from previous steps
- Data picker UI: Click field → See available data
- Expression support: `{{1.Email}}` or `{{Trigger.Name}}`

### 5. Test Before Save

- Test action with real data
- See actual response
- Verify configuration works before saving

### 6. Step-by-Step Wizard

- Choose App → Choose Event → Choose Account → Configure → Test
- Clear progress indicator
- Can go back to edit previous screens

---

## 🎨 Workflow Builder UI Layout

The workflow builder consists of three main panels:

### Left: App Drawer

- Browse and select apps, triggers, actions, and utilities
- Search and filter available integrations
- Categorized view (Communication, AI, Databases, etc.)
- Drag or click to add to canvas

### Center: Canvas

- Visual workflow builder with drag-and-drop
- Connect steps with edges
- Zoom and pan controls
- Real-time validation

### Right: Config Panel

- Configure selected step/node
- Dynamic form fields based on app/action
- Data picker to insert data from previous steps
- Test action before saving

---

## 🔄 Integration Flow

```
Step 1: User clicks "+" on Canvas or selects from App Drawer
        ↓
Step 2: App Drawer opens (if not already open)
        Shows: ALL apps with search
        Categories: Communication, AI, Databases, etc.
        ↓
Step 3: User searches "Slack" and selects it
        ↓
Step 4: "Choose Event" screen in App Drawer
        Tabs: Trigger | Action
        Lists: Send Channel Message, Send Direct Message, etc.
        ↓
Step 5: User selects "Send Channel Message"
        Step appears on Canvas
        Config Panel opens on right
        ↓
Step 6: Config Panel shows "Choose Account"
        If no account connected:
          → "Sign in to Slack" button
          → OAuth popup → Creates connection
        If accounts exist:
          → Dropdown: [Engineering Slack ▼, Sales Slack, + Add new account]
        ↓
Step 7: Config Panel shows "Set up action"
        Form with dynamic fields:
        - Channel: Dropdown (loaded from Slack API)
        - Message Text: Textarea with data picker
        - Thread TS: Optional field
        Can insert data from previous steps using {{}} or picker
        ↓
Step 8: Config Panel shows "Test action"
        Button: "Test & Continue"
        Sends real test message
        Shows result: ✓ Success or ✗ Error
        ↓
Step 9: Step configured and saved
        Shows: Slack logo + "Send Channel Message in Slack" on Canvas
        Can click step to edit in Config Panel anytime
```

---

## 📦 Available Apps, Triggers & Actions

All apps and utilities are organized by category. Each can have:

- **Triggers** - Events that start a workflow
- **Actions** - Things you can do in a workflow
- Some have only Triggers, some only Actions, some have both

---

## 🔔 Built-in Triggers

### Schedule

**Triggers:**

- **Every Day** - Run daily at a specific time
- **Every Week** - Run weekly on specific days
- **Every Month** - Run monthly on a specific date
- **Every Hour** - Run hourly
- **Custom Frequency** - Run at custom intervals (every X minutes/hours/days)
- **Cron Expression** - Advanced scheduling using cron syntax

### Webhooks

**Triggers:**

- **Catch Hook** - Trigger when a webhook receives data (GET or POST)
- **Catch Raw Hook** - Receive raw webhook data without parsing
- **Retrieve Poll** - Poll a URL at regular intervals for changes

### Manual

**Triggers:**

- **Button** - Start workflow manually with a button click
- **Form** - Start workflow by submitting a form with custom fields

### Workflow

**Triggers:**

- **Workflow Complete** - Triggers when another workflow completes (success/failure/always)

---

## 🔀 Control Flow

### Filter

**Actions:**

- **Only Continue If...** - Continue the workflow only if conditions are met
- **Stop Workflow If...** - Stop the workflow if conditions are met

### Paths

**Actions:**

- **Path Rules** - Send workflow down different paths based on conditions
- **Multiple Paths** - Create multiple conditional branches

### Loop

**Actions:**

- **Loop** - Repeat actions for each item in a list
- **Loop Until** - Repeat actions until a condition is met

### Smart Routing

**Desc**: Analyze content and route to appropriate destination
**Actions:**

- **Route to Pool** - Route to specific team pool based on criteria
- **Route to User** - Route to specific user based on expertise or availability
- **Route to Path** - Send to different workflow path based on conditions

---

## 👥 Team & Collaboration

### Team Pools

**Desc:** Assign work to team pools with intelligent routing and load balancing

**Actions:**

- **Assign to Pool** - Assign task to a team pool with routing strategy
- **Round Robin** - Distribute tasks evenly across pool members
- **Load Balanced** - Assign to member with least current load
- **Skills Based** - Match task requirements with member skills
- **Smart Assignment** - AI-powered assignment based on multiple factors
- **Fallback Routing** - Auto-route to backup pool if primary unavailable
- **Escalation** - Auto-escalate to manager/senior pool on timeout

---

## 🛠️ Utilities

### Wait

**Actions:**

- **Wait For** - Wait for a specific amount of time (minutes, hours, days)
- **Wait Until** - Wait until a specific date/time
- **Wait After Queue** - Wait for other tasks to complete

### Sub-Workflow

**Actions:**

- **Run Sub-Workflow** - Call another workflow from this workflow
- **Wait for Sub-Workflow** - Wait for a sub-workflow to complete

### Forms

**Desc:** Collect data via forms using various form providers

**How it works:**

1. Add "Send Form" step to workflow
2. Choose form provider (Google Forms, Typeform, Jotform, Microsoft Forms, or built-in)
3. Select existing form or create new one in Config Panel
4. Configure access control (public, authenticated, specific users)
5. Form is sent to recipients
6. Workflow pauses and waits for form submission
7. Form data becomes available for next steps

**Actions:**

- **Send Form** - Send form to collect data (Google Forms, Typeform, Jotform, Microsoft Forms, or built-in)

### Tasks

**Desc:** Create and manage tasks using various task management apps

**How it works:**

1. Add "Create Task" step to workflow
2. Choose task provider (Jira, Asana, Monday.com, Trello, ClickUp, or Todoist)
3. Configure task details (title, description, priority, due date)
4. Assign to specific user or team pool (IT Support, Security, HR, etc.)
5. Task is created in selected system
6. Optionally wait for task completion
7. Task status and updates become available for next steps

**Actions:**

- **Create Task** - Create task in Jira, Asana, Monday.com, Trello, ClickUp, or Todoist
- **Assign to Pool** - Assign task to team pool with routing strategy
- **Wait for Completion** - Pause workflow until task is completed
- **Get Task Status** - Check current status of a task

### Approval

**Actions:**

- **Request Approval** - Pause and wait for approval/rejection
- **Accept/Decline** - Accept or decline invitations or requests
- **Custom Buttons** - Define custom decision options
- **Multi-Step Approval** - Chain multiple approval steps, with routing orders and routing groups

### Formatter

**Actions:**

- **Format Text** - Format, split, trim, find/replace, capitalize
- **Format Numbers** - Add, subtract, multiply, divide, format, round
- **Format Date/Time** - Format dates, add/subtract time, convert timezones
- **Utilities** - Encode/decode, random values, line items

### Code

**Actions:**

- **Run JavaScript** - Execute custom JavaScript code
- **Run Python** - Execute custom Python code

### HTTP & API

**Actions:**

- **HTTP Request** - Make custom API calls (GET, POST, PUT, DELETE)
- **GraphQL Query** - Execute GraphQL queries
- **SOAP Request** - Make SOAP API calls

### Schedule

**Actions:**

- **Schedule Action** - Schedule an action for later execution
- **Cancel Scheduled Action** - Cancel a previously scheduled action
- **Recurring Task** - Set up recurring tasks within workflow

### SLA

**Actions:**

- **Set SLA** - Define Service Level Agreement for workflow steps
- **SLA Alert** - Send alerts when SLA is at risk or breached
- **Track SLA** - Track time elapsed against SLA target

---

## 🤖 AI & Machine Learning

### AI Agent

**Actions:**

- **Create AI Agent** - Create autonomous AI agents with tools and memory
- **Prompt Template** - Use reusable prompt templates with variables
- **Model Router** - Route requests to different models based on criteria
- **Parse Response** - Extract structured data from AI responses

### AI Utilities

**Actions:**

- **Token Counter** - Count tokens before making API calls
- **Cost Calculator** - Estimate and track AI costs
- **Fallback Models** - Auto-fallback to alternative models on failure
- **Rate Limiter** - Manage API rate limits across models

### Custom LLM Hosting

**Actions:**

- **Deploy Model** - Deploy custom LLM to cloud (AWS, GCP, Azure)
- **Manage Endpoint** - Manage custom LLM endpoints
- **Load Balance** - Distribute requests across multiple instances
- **Monitor Model** - Monitor model performance and costs

---

## 📱 Apps

> **📊 Entity Types Summary:**
>
> | Type                                   | Follows IntegrationDefinition? | Has Triggers/Actions? | Data Structure          | Usage                   |
> | -------------------------------------- | ------------------------------ | --------------------- | ----------------------- | ----------------------- |
> | **Apps** (Slack, Gmail, etc.)          | ✅ Yes                         | ✅ Yes                | `IntegrationDefinition` | Add as workflow step    |
> | **Utilities** (Forms, Tasks, etc.)     | ✅ Yes                         | ✅ Actions only       | `IntegrationDefinition` | Add as workflow step    |
> | **Control Flow** (Filter, Paths, etc.) | ✅ Yes                         | ✅ Actions only       | `IntegrationDefinition` | Add as workflow step    |
> | **Custom LLMs**                        | ❌ No                          | ❌ No                 | `CustomLLM`             | Select in AI Agent node |
> | **MCPs**                               | ❌ No                          | ⚠️ Provides tools     | `InstalledMCP`          | Select in AI Agent node |
>
> **Key Differences:**
>
> - **Apps/Utilities/Control Flow** = Workflow steps with their own nodes
> - **Custom LLMs** = Model providers (configuration only)
> - **MCPs** = Tool providers for AI agents (capabilities only)
>
> See [INTEGRATION_DATA_STRUCTURE.md](./INTEGRATION_DATA_STRUCTURE.md) for complete schemas.

### Communication

#### Slack

**Triggers:**

- **New Message Posted to Channel** - Triggers when a new message is posted
- **New Reaction Added** - Triggers when someone reacts to a message
- **New User** - Triggers when a new user joins the workspace

**Actions:**

- **Send Channel Message** - Post a new message to a specific channel
- **Send Direct Message** - Send a direct message to a user
- **Update Message** - Update an existing message
- **Add Reaction** - Add an emoji reaction to a message
- **Create Channel** - Create a new channel
- **Invite User to Channel** - Invite a user to a channel
- **Set Status** - Update your Slack status
- **Upload File** - Upload a file to a channel or conversation
- **Find Message** - Search for a specific message
- **Find User** - Find a user by name or email

### Email

#### Gmail

**Triggers:**

- **New Email** - Triggers when a new email arrives
- **New Labeled Email** - Triggers when an email receives a specific label
- **New Starred Email** - Triggers when an email is starred
- **New Attachment** - Triggers when an email with attachment arrives

**Actions:**

- **Send Email** - Send a new email
- **Reply to Email** - Reply to an existing email
- **Create Draft** - Create a draft email
- **Add Label to Email** - Add a label to an email
- **Remove Label from Email** - Remove a label from an email
- **Mark as Read** - Mark an email as read
- **Mark as Unread** - Mark an email as unread
- **Star Email** - Add a star to an email
- **Archive Email** - Archive an email
- **Trash Email** - Move an email to trash
- **Find Email** - Search for a specific email

### Calendar & Scheduling

#### Google Calendar

**Triggers:**

- **Event Start** - Triggers when an event starts
- **New Event** - Triggers when a new event is created
- **Event Cancelled** - Triggers when an event is cancelled
- **Event Updated** - Triggers when an event is updated

**Actions:**

- **Create Detailed Event** - Create a new calendar event with all details
- **Quick Add Event** - Quickly create an event from a text description
- **Update Event** - Update an existing event
- **Delete Event** - Delete an event
- **Find Event** - Search for a specific event
- **Add Attendee to Event** - Add an attendee to an existing event
- **Create Calendar** - Create a new calendar

### Project Management

#### Jira

**Triggers:**

- **New Issue** - Triggers when a new issue is created
- **Updated Issue** - Triggers when an issue is updated
- **Issue Status Changed** - Triggers when issue status changes
- **New Comment** - Triggers when a comment is added to an issue
- **Issue Assigned** - Triggers when an issue is assigned to someone

**Actions:**

- **Create Issue** - Create a new Jira issue
- **Update Issue** - Update an existing issue
- **Add Comment** - Add a comment to an issue
- **Change Status** - Transition issue to different status
- **Assign Issue** - Assign issue to a user
- **Add Attachment** - Add attachment to an issue
- **Create Sprint** - Create a new sprint
- **Add to Sprint** - Add issue to a sprint
- **Find Issue** - Search for issues by JQL or filters
- **Find User** - Find a Jira user
- **Get Issue** - Get details of a specific issue

#### Asana

**Triggers:**

- **New Task** - Triggers when a new task is created
- **Task Completed** - Triggers when a task is marked complete
- **Task Updated** - Triggers when a task is updated
- **Task Assigned** - Triggers when a task is assigned

**Actions:**

- **Create Task** - Create a new task
- **Update Task** - Update an existing task
- **Complete Task** - Mark task as complete
- **Assign Task** - Assign task to a user
- **Add Comment** - Add comment to task
- **Add Attachment** - Add attachment to task
- **Find Task** - Search for tasks

#### Monday.com

**Triggers:**

- **New Item** - Triggers when a new item is created
- **Item Updated** - Triggers when an item is updated
- **Status Changed** - Triggers when item status changes

**Actions:**

- **Create Item** - Create a new item
- **Update Item** - Update an existing item
- **Change Status** - Change item status
- **Assign Item** - Assign item to a user
- **Add Update** - Add update/comment to item
- **Get Item** - Get item details

#### Trello

**Triggers:**

- **New Card** - Triggers when a new card is created
- **Card Moved** - Triggers when a card is moved to different list
- **Card Updated** - Triggers when a card is updated

**Actions:**

- **Create Card** - Create a new card
- **Update Card** - Update an existing card
- **Move Card** - Move card to different list
- **Add Comment** - Add comment to card
- **Add Attachment** - Add attachment to card
- **Assign Member** - Assign member to card

#### ClickUp

**Triggers:**

- **New Task** - Triggers when a new task is created
- **Task Status Changed** - Triggers when task status changes
- **Task Assigned** - Triggers when a task is assigned

**Actions:**

- **Create Task** - Create a new task
- **Update Task** - Update an existing task
- **Change Status** - Change task status
- **Assign Task** - Assign task to a user
- **Add Comment** - Add comment to task
- **Get Task** - Get task details

### Developer Tools

#### GitHub

**Triggers:**

- **New Repository** - Triggers when a new repository is created
- **New Issue** - Triggers when a new issue is opened
- **New Pull Request** - Triggers when a new PR is created
- **Pull Request Merged** - Triggers when a PR is merged
- **New Commit** - Triggers when a new commit is pushed
- **New Release** - Triggers when a new release is published
- **Issue Comment** - Triggers when a comment is added to an issue
- **Pull Request Review** - Triggers when a PR is reviewed
- **New Star** - Triggers when someone stars the repository

**Actions:**

- **Create Issue** - Create a new GitHub issue
- **Update Issue** - Update an existing issue
- **Close Issue** - Close an issue
- **Add Comment to Issue** - Add a comment to an issue
- **Create Pull Request** - Create a new pull request
- **Merge Pull Request** - Merge a pull request
- **Create Branch** - Create a new branch
- **Create Release** - Create a new release
- **Add Label** - Add label to issue or PR
- **Assign Issue** - Assign issue to a user
- **Find Issue** - Search for issues
- **Find Pull Request** - Search for pull requests
- **Get Repository** - Get repository details

### Scheduling

#### Calendly

**Triggers:**

- **Invitee Created** - Triggers when someone books a meeting
- **Invitee Cancelled** - Triggers when a meeting is cancelled
- **Invitee Rescheduled** - Triggers when a meeting is rescheduled
- **Event Type Created** - Triggers when a new event type is created

**Actions:**

- **Create Invitee** - Schedule a meeting for someone
- **Cancel Event** - Cancel a scheduled event
- **Get Event** - Get details of a scheduled event
- **Get Event Type** - Get details of an event type
- **Find Invitee** - Search for scheduled meetings

### Forms & Surveys

#### Google Forms

**Triggers:**

- **New Response** - Triggers when someone submits a form response

**Actions:**

- **Create Form** - Create a new Google Form
- **Get Form** - Get form details
- **Get Responses** - Get all form responses
- **Delete Response** - Delete a specific response

#### Typeform

**Triggers:**

- **New Entry** - Triggers when someone completes a form

**Actions:**

- **Create Form** - Create a new Typeform
- **Get Form** - Get form details
- **Get Responses** - Get all responses
- **Update Form** - Update form settings

#### Jotform

**Triggers:**

- **New Submission** - Triggers when a form is submitted

**Actions:**

- **Create Form** - Create a new Jotform
- **Get Submissions** - Get all form submissions
- **Get Form** - Get form details

#### Microsoft Forms

**Triggers:**

- **New Response** - Triggers when someone submits a response

**Actions:**

- **Create Form** - Create a new Microsoft Form
- **Get Responses** - Get all form responses
- **Get Form** - Get form details

### Databases

#### PostgreSQL

**Triggers:**

- **New Row** - Triggers when a new row is inserted
- **Updated Row** - Triggers when a row is updated
- **New or Updated Row** - Triggers on insert or update

**Actions:**

- **Execute Query** - Run a custom SQL query
- **Insert Row** - Insert a new row into a table
- **Update Row** - Update an existing row
- **Delete Row** - Delete a row from a table
- **Find Row** - Search for rows matching criteria
- **Bulk Insert** - Insert multiple rows at once
- **Execute Stored Procedure** - Run a stored procedure
- **Create Table** - Create a new table
- **Truncate Table** - Remove all rows from a table

#### MongoDB

**Triggers:**

- **New Document** - Triggers when a new document is inserted
- **Updated Document** - Triggers when a document is updated
- **Deleted Document** - Triggers when a document is deleted
- **New or Updated Document** - Triggers on insert or update

**Actions:**

- **Find Document** - Search for documents matching query
- **Find One Document** - Find a single document
- **Insert Document** - Insert a new document
- **Update Document** - Update an existing document
- **Delete Document** - Delete a document
- **Bulk Insert** - Insert multiple documents at once
- **Aggregate** - Run aggregation pipeline
- **Count Documents** - Count documents matching query
- **Create Collection** - Create a new collection
- **Drop Collection** - Delete a collection

### AI & LLM

#### OpenAI

**Actions:**

- **Chat Completion** - Generate text using GPT models (GPT-4, GPT-3.5)
- **Create Embedding** - Generate embeddings for text
- **Create Image** - Generate images using DALL-E
- **Edit Image** - Edit images using DALL-E
- **Transcribe Audio** - Transcribe audio using Whisper
- **Translate Audio** - Translate audio to English
- **Moderate Content** - Check content for policy violations

#### Anthropic (Claude)

**Actions:**

- **Create Message** - Generate text using Claude models (Claude 3 Opus, Sonnet, Haiku)
- **Stream Message** - Stream responses in real-time
- **Vision Analysis** - Analyze images with Claude
- **Long Context** - Process up to 200K tokens

#### Google AI (Gemini)

**Actions:**

- **Generate Content** - Generate text using Gemini models (Gemini Pro, Ultra)
- **Multimodal Analysis** - Analyze text, images, video, and audio
- **Code Generation** - Generate and explain code
- **Embed Content** - Generate embeddings

#### Custom LLM

> **⚠️ Note:** Custom LLMs are **NOT integrations**. They are model providers configured in App Center and selected in AI Agent nodes. They do not have triggers or actions and follow a different data structure (`CustomLLM` interface).

**Two Modes:**

1. **Connect to External Provider** - Use existing LLM APIs (OpenAI, Anthropic, OpenRouter, etc.)
2. **Host Your Own Models** - Deploy and manage your own LLM infrastructure

**Configuration Fields:**

- **Provider** - OpenAI, Anthropic, OpenRouter, Together AI, Ollama, vLLM, LM Studio, Azure OpenAI, AWS Bedrock, Google Vertex AI, or Custom
- **Endpoint** - API endpoint URL (for external providers or self-hosted)
- **Model ID** - Model identifier
- **API Key** - Authentication credentials
- **Parameters** - Temperature, max tokens, top-p, frequency penalty, presence penalty
- **Cost Tracking** - Input/output cost per 1k tokens

**Self-Hosted LLM Features:**

- **Deploy Model** - Deploy custom LLM to cloud (AWS, GCP, Azure) or on-premise
- **Manage Endpoint** - Configure and manage your LLM endpoints
- **Load Balance** - Distribute requests across multiple instances
- **Monitor Performance** - Track latency, throughput, and resource usage
- **Cost Optimization** - Monitor and optimize hosting costs
- **Auto-Scaling** - Scale instances based on demand
- **Model Versioning** - Deploy and switch between model versions
- **A/B Testing** - Test different model configurations

**Data Structure:** See `CustomLLM` interface in [INTEGRATION_DATA_STRUCTURE.md](./INTEGRATION_DATA_STRUCTURE.md)

**Usage:** Select from model dropdown in AI Agent nodes

### MCP (Model Context Protocol)

> **⚠️ Note:** MCPs are **tools for AI agents**, not standalone integrations. They are installed from App Center and provide capabilities to AI Agent nodes. Each MCP has a list of available tools/actions that AI agents can use.

**Data Structure:** MCPs follow the `InstalledMCP` interface (see [INTEGRATION_DATA_STRUCTURE.md](./INTEGRATION_DATA_STRUCTURE.md))

**Usage:** Install MCP in App Center → Select in AI Agent node → Agent can use MCP tools

#### Available MCP Servers

Below are the available MCP servers and their capabilities:

**File System MCP**

**Actions:**

- **Read File** - Read contents of a file
- **Write File** - Write contents to a file
- **List Directory** - List files and directories
- **Create Directory** - Create a new directory
- **Delete File** - Delete a file
- **Move File** - Move or rename a file

**Database MCP**

**Actions:**

- **Query Database** - Execute SQL queries with natural language
- **Get Schema** - Get database schema information
- **Execute Query** - Run raw SQL queries

**Web Search MCP**

**Actions:**

- **Search Web** - Search Google, Bing, or DuckDuckGo
- **Search Images** - Search for images
- **Search News** - Search news articles

**GitHub MCP**

**Actions:**

- **Get Repository** - Get repository information
- **List Issues** - List repository issues
- **Create Issue** - Create a new issue
- **List Pull Requests** - List pull requests
- **Get File Contents** - Read file from repository

**Slack MCP**

**Actions:**

- **Advanced Search** - Search messages across workspace
- **Get Thread** - Get full thread conversation
- **Analyze Sentiment** - Analyze message sentiment
- **Extract Action Items** - Extract action items from conversations

**Notion MCP**

**Actions:**

- **Query Database** - Query Notion databases
- **Get Page** - Get page contents
- **Create Page** - Create a new page
- **Update Page** - Update existing page

**Calculator MCP**

**Actions:**

- **Calculate** - Perform complex mathematical calculations
- **Convert Units** - Convert between units
- **Evaluate Expression** - Evaluate mathematical expressions

**Weather MCP**

**Actions:**

- **Get Current Weather** - Get current weather for location
- **Get Forecast** - Get weather forecast
- **Get Historical Weather** - Get historical weather data

**Custom MCP**

**Actions:**

- **Install from URL** - Install MCP server from custom URL
- **Configure Credentials** - Set up authentication
- **Test Connection** - Verify MCP is working
- **List Capabilities** - View available tools

---

## 📚 Related Documentation

- **[INTEGRATION_DATA_STRUCTURE.md](./INTEGRATION_DATA_STRUCTURE.md)** - Complete data structure reference with TypeScript interfaces, property types, authentication configs, and full examples
- **[COMPLETE_DESIGN.md](./COMPLETE_DESIGN.md)** - Complete platform documentation including RBAC, App Center, and workflow features

---
