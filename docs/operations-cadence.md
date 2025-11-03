# Operational Cadence Plan

## Monthly Update Email

**Send Date:** First Tuesday of each month (starting December 2, 2025).  
**Audience:** Customers, beta testers, internal stakeholders.  
**Owner:** Product marketing (draft) + Tech lead (review).

**Template**
```
Subject: Project Starter Guide — Monthly Update ({{month}} {{year}})

Hi {{first_name or team}},

Highlights:
- ✅ {{feature/upgrade shipped}}
- 🛠️ {{in-progress initiative}}
- 📈 {{key performance stat}}

What’s New:
- Template updates (link to docs/releases/…)
- Automation improvements (link to docs/automation/premium-bundle.md or CI updates)
- Upcoming roadmap (2–3 bullets)

Quality & Ops:
- Smoke test status (pass/fail + notable actions)
- Dependency review notes (link to docs/dependency-monitoring.md)

Get Involved:
- Next community call date + registration link
- Feedback survey / Slack channel reminder

Thanks,
{{sender name}}
Product Starter Guide Team
```

**Attachments**
- Latest release notes PDF (export from `docs/releases/`).
- Metrics snapshot (see below).

## Feedback Triage Workflow

1. **Capture**
   - Primary intake: GitHub Discussions (`#feedback` category) and Intercom form.
   - Auto-sync to Linear board via Zapier with label `needs-triage`.
2. **Triage (Twice weekly — Tue/Fri)**
   - Assign `owner` and apply labels: `bug`, `feature`, `docs`, `support`.
   - Determine SLA:  
     - Critical production issue → 24h  
     - High (blocking beta) → 48h  
     - Normal → 5 business days
3. **Response**
   - Acknowledge within SLA, include workaround if available.
   - Convert accepted feedback into roadmap tickets referencing `docs/project-types/pro-tier.md` or other specs.
4. **Review & Close**
   - Update status during weekly ops stand-up (Wednesday).  
   - Post resolution summary in original channel.  
   - Tag relevant section in monthly update email.

**Tooling**
- GitHub Issue templates for `Bug Report`, `Feature Request`, `Automation Feedback`.
- Saved views:
  - `Inbox`: `label:needs-triage is:open`
  - `SLA Breach`: `is:open label:needs-triage created:<{{now-2d}}`
  - `Automation`: `label:automation`

## Core Metrics Dashboard

| Metric | Definition | Source | Target |
| --- | --- | --- | --- |
| Conversion Rate | Landing page sign-ups ÷ unique visits | Plausible analytics + form submissions | ≥ 8% |
| Trial-to-Paid | Paying customers ÷ trials started | Stripe Billing exports | ≥ 30% |
| Churn | Canceled seats per month ÷ active seats | Stripe + CRM | ≤ 3% |
| Support Load | Average tickets per customer per month | Intercom / GitHub | ≤ 1.2 |
| Smoke Test Success | Passing runs ÷ total runs per week | GitHub Actions (`template-smoke-tests`) | ≥ 95% |

**Reporting Cadence**
- Update metrics every Monday before stand-up.  
- Embed charts in shared Notion dashboard + attach CSV to monthly email.

**Forward-Looking KPIs**
- Net Promoter Score (quarterly survey).  
- Feature adoption (MAU for multi-tenant admin, RBAC policy edits, mobile offline sessions).  
- Automation health (mean time to fix failed pipeline).
