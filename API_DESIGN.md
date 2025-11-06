# Timesheet Agent API Design

## Overview

This document outlines the minimal API endpoints required to replace the hard-coded mock data in the timesheet agent prototype with a real backend data source. The API follows RESTful principles and is designed to support all current frontend functionality while allowing for future scalability.

## Table of Contents

- [Core Resources & Endpoints](#core-resources--endpoints)
  - [Bills](#1-bills-resource)
  - [Time Entries](#2-time-entries-resource)
  - [Bill Documents](#3-bill-documents-resource)
  - [Matter Settings](#4-matter-settings-resource)
  - [Automation Rules](#5-automation-rules-resource)
  - [Action Logs](#6-action-logs-resource)
- [Authentication & Authorization](#authentication--authorization)
- [Query Parameters & Filters](#query-parameters--filters)
- [Request/Response Examples](#requestresponse-examples)
- [Real-time Updates](#real-time-updates)
- [Error Handling](#error-handling)
- [Additional Endpoints](#additional-endpoints)
- [Implementation Notes](#implementation-notes)

## Core Resources & Endpoints

### 1. Bills Resource

Manages billing periods and their associated metadata.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bills` | List all bills with optional filters |
| GET | `/api/bills/:id` | Get single bill details |
| POST | `/api/bills` | Create new bill |
| PATCH | `/api/bills/:id` | Update bill (e.g., change status, finalize) |
| DELETE | `/api/bills/:id` | Delete bill (if in draft status) |

**Bill Object Structure:**
```json
{
  "id": "bill-001",
  "matter": "Project Blackstone",
  "period": "October 2025",
  "status": "Draft" | "Past",
  "amount": 12450,
  "entries": 40,
  "issues": 15,
  "createdAt": "2024-11-01T00:00:00Z",
  "updatedAt": "2024-11-05T10:00:00Z"
}
```

### 2. Time Entries Resource

Manages individual time entries and their review status.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/time-entries` | List all time entries with filters |
| GET | `/api/time-entries/:id` | Get single entry details |
| POST | `/api/time-entries` | Create new time entry |
| PATCH | `/api/time-entries/:id` | Update entry (approve/exclude/modify) |
| DELETE | `/api/time-entries/:id` | Delete time entry |
| POST | `/api/time-entries/bulk-approve` | Approve multiple entries |
| POST | `/api/time-entries/bulk-exclude` | Exclude multiple entries |

**Time Entry Object Structure:**
```json
{
  "id": "entry-123",
  "date": "2024-11-04",
  "timekeeper": "Sarah Chen",
  "duration": 2.5,
  "task": "Reviewed contract amendments",
  "issue": "insufficient-detail" | "poor-writing" | "unusual-duration" | "missing-info" | null,
  "suggestedTask": "Reviewed contract amendments for sections 3.2 and 3.3",
  "billId": "bill-001",
  "awaitingAction": false,
  "actionLog": [
    {
      "message": "Email requesting clarification sent",
      "timestamp": "2024-11-04T10:00:00Z",
      "actor": "FixMyTime Agent",
      "undoable": false
    }
  ]
}
```

### 3. Bill Documents Resource

Manages documents associated with bills and their review workflows.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bills/:billId/documents` | List documents for a bill |
| GET | `/api/bills/:billId/documents/:id` | Get document details |
| POST | `/api/bills/:billId/documents` | Upload/create document |
| PATCH | `/api/bills/:billId/documents/:id` | Update document metadata |
| DELETE | `/api/bills/:billId/documents/:id` | Delete document |
| POST | `/api/documents/:id/request-review` | Request review from participants |
| POST | `/api/documents/:id/review` | Submit review (approve/changes) |
| GET | `/api/documents/:id/review-history` | Get review history |

**Document Object Structure:**
```json
{
  "id": "doc-1-bill-001",
  "billId": "bill-001",
  "title": "Cover Email",
  "type": "HTML" | "PDF" | "Spreadsheet",
  "downloadUrl": "https://api.example.com/files/doc-1-bill-001",
  "reviewHistory": [
    {
      "id": "h-1",
      "type": "requested" | "approved" | "changes-required" | "comment",
      "timestamp": "2024-11-01T09:00:00Z",
      "actor": "Sarah Chen",
      "role": "Senior Associate",
      "comment": "Looks good, approved.",
      "reviewerName": "John Smith",
      "reviewerRole": "Client Contact"
    }
  ]
}
```

### 4. Matter Settings Resource

Manages matter configuration, team members, and billing arrangements.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/matters/:matterId` | Get matter details & context |
| PATCH | `/api/matters/:matterId` | Update matter settings |

#### Timekeepers Sub-resource
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/matters/:matterId/timekeepers` | List timekeepers |
| POST | `/api/matters/:matterId/timekeepers` | Add timekeeper |
| PATCH | `/api/matters/:matterId/timekeepers/:id` | Update timekeeper |
| DELETE | `/api/matters/:matterId/timekeepers/:id` | Remove timekeeper |

#### Other Participants Sub-resource
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/matters/:matterId/participants` | List other participants |
| POST | `/api/matters/:matterId/participants` | Add participant |
| PATCH | `/api/matters/:matterId/participants/:id` | Update participant |
| DELETE | `/api/matters/:matterId/participants/:id` | Remove participant |

#### Context Documents Sub-resource
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/matters/:matterId/context-documents` | List context documents |
| POST | `/api/matters/:matterId/context-documents` | Add context document |
| DELETE | `/api/matters/:matterId/context-documents/:id` | Remove context document |

#### Billing Arrangements Sub-resource
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/matters/:matterId/billing-arrangements` | List billing arrangements |
| POST | `/api/matters/:matterId/billing-arrangements` | Add arrangement |
| DELETE | `/api/matters/:matterId/billing-arrangements/:id` | Remove arrangement |

**Matter Object Structure:**
```json
{
  "id": "matter-001",
  "name": "Project Blackstone",
  "description": "Development and implementation of next-generation analytics platform",
  "billingArrangements": [
    "Invoices payable within 14 days",
    "25% discount on administrative work"
  ],
  "timekeepers": [
    {
      "id": "tk-1",
      "name": "Sarah Chen",
      "role": "Senior Associate",
      "billingRate": 350
    }
  ],
  "participants": [
    {
      "id": "op-1",
      "name": "John Smith",
      "role": "Client Contact"
    }
  ]
}
```

### 5. Automation Rules Resource

Manages automation rules for processing time entries.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/automation-rules` | List all rules |
| GET | `/api/automation-rules/:id` | Get rule details |
| POST | `/api/automation-rules` | Create rule |
| PATCH | `/api/automation-rules/:id` | Update rule |
| DELETE | `/api/automation-rules/:id` | Delete rule |
| POST | `/api/automation-rules/:id/execute` | Manually trigger rule |
| GET | `/api/automation-rules/:id/logs` | Get execution logs |

**Automation Rule Object Structure:**
```json
{
  "id": "rule-1",
  "title": "Insufficient Detail",
  "description": "Automatically detect and request clarification for entries lacking sufficient detail",
  "references": ["Client Billing Guidelines", "Matter Context"],
  "steps": [
    {
      "number": "1",
      "description": "Request Clarification from Time Keeper",
      "code": "// Request clarification code"
    }
  ],
  "enabled": true,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### 6. Action Logs Resource

Manages action history for time entries.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/time-entries/:id/action-logs` | Get logs for an entry |
| POST | `/api/time-entries/:id/action-logs` | Add log entry |
| POST | `/api/action-logs/:id/undo` | Undo an action (if undoable) |

## Authentication & Authorization

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |
| GET | `/api/auth/me` | Get current user info |
| POST | `/api/auth/refresh-token` | Refresh JWT token |

**Authentication Headers:**
```http
Authorization: Bearer <jwt-token>
```

**Login Request:**
```json
{
  "email": "user@example.com",
  "password": "secure-password"
}
```

**Login Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "refresh-token-here",
  "user": {
    "id": "user-123",
    "name": "Sarah Chen",
    "email": "sarah@example.com",
    "role": "Senior Associate"
  }
}
```

## Query Parameters & Filters

Most list endpoints support the following query parameters:

### Common Parameters
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)
- `sort` - Sort field (e.g., `date`, `amount`, `name`)
- `order` - Sort order (`asc` or `desc`)
- `search` - Text search across relevant fields

### Resource-Specific Filters

**Bills:**
- `status` - Filter by status (`Draft`, `Past`)
- `matter` - Filter by matter name
- `periodFrom` - Start date for period filter
- `periodTo` - End date for period filter

**Time Entries:**
- `billId` - Filter by bill ID
- `issue` - Filter by issue type
- `timekeeper` - Filter by timekeeper name
- `dateFrom` - Start date filter
- `dateTo` - End date filter
- `awaitingAction` - Filter entries awaiting action (`true`/`false`)

**Documents:**
- `reviewStatus` - Filter by review status (`pending`, `approved`, `changes-required`)
- `type` - Filter by document type

### Example Query
```
GET /api/time-entries?billId=bill-001&issue=insufficient-detail&page=2&limit=50&sort=date&order=desc
```

## Request/Response Examples

### Create Time Entry

**Request:**
```http
POST /api/time-entries
Content-Type: application/json
Authorization: Bearer <token>

{
  "date": "2024-11-05",
  "timekeeper": "Sarah Chen",
  "duration": 2.5,
  "task": "Reviewed contract amendments for section 3.2",
  "billId": "bill-001"
}
```

**Response:**
```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "entry-123",
  "date": "2024-11-05",
  "timekeeper": "Sarah Chen",
  "duration": 2.5,
  "task": "Reviewed contract amendments for section 3.2",
  "billId": "bill-001",
  "issue": null,
  "suggestedTask": null,
  "actionLog": [],
  "createdAt": "2024-11-05T10:00:00Z",
  "updatedAt": "2024-11-05T10:00:00Z"
}
```

### Request Document Review

**Request:**
```http
POST /api/documents/doc-1-bill-001/request-review
Content-Type: application/json
Authorization: Bearer <token>

{
  "reviewers": [
    {
      "name": "John Smith",
      "role": "Client Contact",
      "email": "john@example.com"
    },
    {
      "name": "Linda Graves",
      "role": "Project Manager",
      "email": "linda@example.com"
    }
  ],
  "message": "Please review the attached billing summary for October 2025."
}
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "reviewsRequested": 2,
  "notifications": [
    {
      "recipient": "john@example.com",
      "status": "sent",
      "sentAt": "2024-11-05T10:00:00Z"
    },
    {
      "recipient": "linda@example.com",
      "status": "sent",
      "sentAt": "2024-11-05T10:00:01Z"
    }
  ]
}
```

### Bulk Approve Time Entries

**Request:**
```http
POST /api/time-entries/bulk-approve
Content-Type: application/json
Authorization: Bearer <token>

{
  "entryIds": ["entry-1", "entry-2", "entry-3"],
  "applySuggestions": true,
  "comment": "Approved after review"
}
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "processed": 3,
  "approved": 3,
  "failed": 0,
  "results": [
    {
      "id": "entry-1",
      "status": "approved",
      "suggestionApplied": true
    },
    {
      "id": "entry-2",
      "status": "approved",
      "suggestionApplied": false
    },
    {
      "id": "entry-3",
      "status": "approved",
      "suggestionApplied": true
    }
  ]
}
```

## Real-time Updates

For real-time features, implement WebSocket or Server-Sent Events:

### WebSocket Connection
```javascript
// Client-side connection example
const ws = new WebSocket('wss://api.example.com/ws/bills/bill-001');

ws.onmessage = (event) => {
  const update = JSON.parse(event.data);
  // Handle real-time updates
};
```

### Server-Sent Events
```http
GET /api/sse/time-entries
Accept: text/event-stream

// Server response
data: {"type":"entry-updated","id":"entry-123","changes":{"issue":"resolved"}}

data: {"type":"entry-created","id":"entry-124","entry":{...}}
```

## Error Handling

All errors follow a consistent format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": [
      {
        "field": "duration",
        "message": "Duration must be greater than 0"
      },
      {
        "field": "date",
        "message": "Date cannot be in the future"
      }
    ]
  },
  "timestamp": "2024-11-05T10:00:00Z",
  "requestId": "req-abc123"
}
```

### Common Error Codes
- `VALIDATION_ERROR` - Invalid request data
- `AUTHENTICATION_ERROR` - Invalid or missing authentication
- `AUTHORIZATION_ERROR` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `CONFLICT` - Resource conflict (e.g., duplicate entry)
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INTERNAL_ERROR` - Server error

### HTTP Status Codes
- `200 OK` - Successful GET, PATCH
- `201 Created` - Successful POST
- `204 No Content` - Successful DELETE
- `400 Bad Request` - Invalid request
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

## Additional Endpoints

### Export Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bills/:id/export` | Export bill (PDF, Excel, CSV) |
| GET | `/api/time-entries/export` | Export time entries |
| GET | `/api/reports/billing-summary` | Generate billing summary report |

**Export Parameters:**
- `format` - Export format (`pdf`, `xlsx`, `csv`)
- `includeDetails` - Include detailed breakdowns (`true`/`false`)

### Analytics Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/billing-summary` | Billing summary statistics |
| GET | `/api/analytics/timekeeper-productivity` | Timekeeper productivity metrics |
| GET | `/api/analytics/issue-trends` | Time entry issue trends |

### Webhook Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/webhooks` | List configured webhooks |
| POST | `/api/webhooks` | Create webhook |
| PATCH | `/api/webhooks/:id` | Update webhook |
| DELETE | `/api/webhooks/:id` | Delete webhook |

**Webhook Events:**
- `bill.created`
- `bill.finalized`
- `entry.flagged`
- `document.review_requested`
- `document.reviewed`

## Implementation Notes

### 1. Database Schema Considerations
- Use UUIDs for all IDs in production
- Implement soft deletes for audit trail
- Index frequently queried fields (billId, timekeeper, date)
- Consider partitioning time_entries table by date for large datasets

### 2. Performance Optimizations
- Implement pagination for all list endpoints
- Use database-level filtering rather than application-level
- Cache frequently accessed data (matter settings, timekeepers)
- Consider implementing GraphQL for complex nested queries

### 3. Security Best Practices
- Implement rate limiting (e.g., 100 requests per minute per user)
- Use HTTPS for all endpoints
- Validate all input data
- Implement CORS properly
- Use parameterized queries to prevent SQL injection
- Implement audit logging for all mutations

### 4. API Versioning
Consider implementing API versioning from the start:
```
/api/v1/bills
/api/v2/bills  # Future version
```

### 5. Testing Recommendations
- Unit tests for all business logic
- Integration tests for API endpoints
- Load testing for performance validation
- Security testing for authentication/authorization

### 6. Documentation
- Use OpenAPI/Swagger for API documentation
- Provide interactive API explorer
- Include code examples in multiple languages
- Maintain changelog for API updates

### 7. Monitoring & Logging
- Log all API requests with correlation IDs
- Monitor response times and error rates
- Set up alerts for critical errors
- Track API usage metrics

## Migration Strategy

1. **Phase 1: Setup**
   - Set up database schema
   - Implement authentication system
   - Create basic CRUD endpoints

2. **Phase 2: Core Features**
   - Implement time entry management
   - Add bill management
   - Document handling

3. **Phase 3: Advanced Features**
   - Automation rules
   - Real-time updates
   - Analytics and reporting

4. **Phase 4: Optimization**
   - Performance tuning
   - Caching implementation
   - Load testing

## Next Steps

1. Choose technology stack (e.g., Node.js/Express, Python/FastAPI, .NET Core)
2. Set up database (PostgreSQL recommended for complex queries)
3. Implement authentication (JWT with refresh tokens)
4. Create API scaffolding with chosen framework
5. Implement endpoints in priority order based on frontend needs
6. Add comprehensive testing
7. Deploy with proper monitoring

## Questions for Product Team

1. What are the expected user volumes and data scales?
2. Are there any specific compliance requirements (SOC2, GDPR)?
3. What third-party integrations are planned?
4. What are the SLA requirements for API availability?
5. Should the API support multi-tenancy from the start?
6. Are there specific export format requirements for clients?
7. What level of audit trail detail is required?

---

*Document Version: 1.0*  
*Last Updated: November 2024*  
*Author: OpenCode Assistant*