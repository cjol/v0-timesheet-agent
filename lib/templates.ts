import Handlebars from "handlebars"

// Email template for cover email
export const coverEmailTemplate = Handlebars.compile(`
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #333;">{{matterName}} - {{period}} Billing</h2>
  <p>Dear {{recipientName}},</p>
  <p>Please find attached our billing summary for {{period}} related to {{matterName}}.</p>
  {{#if workFocusItems}}
  <p>This month's work focused on:</p>
  <ul>
    {{#each workFocusItems}}
    <li>{{this}}</li>
    {{/each}}
  </ul>
  {{/if}}
  <p>The total amount for this period is <strong>£{{amount}}</strong>, covering {{entriesCount}} time entries from our team.</p>
  <p>Should you have any questions regarding the enclosed documentation, please don't hesitate to reach out.</p>
  <p>Best regards,<br/>{{senderName}}<br/>{{senderRole}}</p>
</div>
`)

// Helper function to generate cover email content
export function generateCoverEmail(data: {
  matterName: string
  period: string
  recipientName: string
  amount: string
  entriesCount: number
  senderName: string
  senderRole: string
  workFocusItems?: string[]
}): string {
  return coverEmailTemplate(data)
}
