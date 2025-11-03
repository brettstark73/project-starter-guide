# Pro-Tier Template Requirements

These requirements define the scope for the upcoming paid template tier launching in 2026. Each template builds on the free starters, adding opinionated architecture, compliance features, and automation suitable for production workloads.

## Multi-Tenant SaaS (Next.js + Prisma)

- **Identity & Access**
  - Tenant-aware authentication with NextAuth, supporting SSO (SAML/OIDC) and passwordless email links.
  - Invitation and provisioning workflow with role selection at invite time.
  - Row-level tenant isolation enforced in Prisma schema and application data loaders.
- **Billing & Subscription**
  - Stripe Billing integration with tiered plans, metered usage, and proration.
  - Webhook processor for payment events plus automatic suspension/reactivation flows.
  - In-app usage dashboard combining Stripe reporting and internal metrics (Plan limits, seats, storage).
- **Tenant Administration**
  - Settings area for tenant metadata, custom domains, and feature flags.
  - Audit trail of configuration changes stored in an append-only table.
  - Support for regional data residency (US, EU) with environment-based routing.
- **Operational Requirements**
  - Background job queue (e.g., QStash, AWS SQS) for outbound email and billing reconciliation.
  - Structured logging (JSON) with log shipping to DataDog or OpenTelemetry collector.
  - Automated tenant bootstrap script to seed demo data per environment.
- **Quality & Security**
  - Playwright smoke tests covering tenant onboarding, billing update, and role invitation.
  - Security headers (Content Security Policy, Permissions Policy) with per-tenant overrides.
  - GDPR tooling: data export, delete, retention scheduler documented in README.

## RBAC API Service (Node + Prisma + PostgreSQL)

- **Authentication & Authorization**
  - OAuth 2.0 / OpenID Connect compliant auth server integration (Auth0 or AWS Cognito).
  - Fine-grained RBAC using Casbin or OSO with policy files stored alongside code.
  - Token introspection endpoint plus API key support for service-to-service calls.
- **Data & Tenancy**
  - PostgreSQL schema with tenant segmentation and optimistic locking.
  - Soft-delete support with `deleted_at` columns and purging cron job.
  - Pagination, filtering, and sorting conventions aligned with JSON:API or OpenAPI spec.
- **Platform Integrations**
  - Event outbox pattern with Kafka or SNS/SQS publisher for domain events.
  - Observability stack: pino logger, OpenTelemetry tracing, Prometheus metrics endpoint.
  - Rate limiting and abuse prevention using Redis-backed sliding window.
- **DevOps Expectations**
  - Docker Compose for local Postgres, Redis, and worker containers.
  - Migration playbooks (Prisma migrate) with rollback strategy and seed data.
  - GitHub Actions pipeline with database migration check, contract tests, and npm audit gating.
- **Compliance**
  - Security baseline aligning with OWASP ASVS L2, including automated dependency and secrets scanning.
  - Data retention policies and DLP hooks documented in `docs/security-guide.md`.
  - SOC 2 / ISO 27001 friendly logging & incident response templates.

## Backend-Enabled Mobile App (Expo + GraphQL/REST Backend)

- **Offline-First Experience**
  - React Query or Apollo cache persistence with background sync and conflict resolution.
  - Secure storage for auth tokens (Expo SecureStore) and biometric unlock.
  - Offline mutation queue with optimistic UI for critical flows.
- **Backend Connectivity**
  - Configurable API client supporting REST and GraphQL with automatic retries and exponential backoff.
  - Realtime updates via WebSockets or Expo push notifications for key events.
  - Feature flag integration (LaunchDarkly or GrowthBook) controlling UI modules.
- **Deployment & Distribution**
  - EAS Build profiles for development, staging, production with environment-specific secrets.
  - Automated app versioning tied to backend release tags.
  - App Store / Play Store metadata templates and submission checklist.
- **Quality & Monitoring**
  - Detox or Maestro end-to-end flows for login, offline sync, and push notification handling.
  - Sentry + Expo Updates integration with release health tracking.
  - Accessibility audit scripts (React Native Accessibility Engine) baked into CI.
- **Security**
  - Runtime jailbreak/root detection and basic obfuscation guidance.
  - Certificate pinning option and TLS enforcement documentation.
  - In-app privacy center surfacing data collection purposes and controls.

## Cross-Cutting Requirements

- **Documentation**
  - Detailed onboarding guides in `docs/project-types/` with architecture diagrams and data flow tables.
  - Live runbooks (incident response, disaster recovery) and quarterly test schedule references.
- **Testing**
  - Mandatory unit, integration, and e2e suites with minimum coverage thresholds (80%+ critical modules).
  - Smoke test integration via `scripts/create-quality-automation-runner.mjs --smoke` across environments.
  - Load testing profiles (k6 or Artillery) with baseline SLOs recorded.
- **Security & Compliance**
  - Secrets management via Doppler or AWS Secrets Manager; no plain `.env` usage in production.
  - Automated dependency review aligned with quarterly cadence (see `docs/dependency-monitoring.md`).
  - Privacy impact assessment template and checklist.
- **Supportability**
  - Metrics instrumentation aligned with product KPIs (conversion, churn, support load).
  - Support playbooks with escalation matrix and Zendesk integration guidance.
  - Feature flag strategy for gradual rollouts and kill switches.
