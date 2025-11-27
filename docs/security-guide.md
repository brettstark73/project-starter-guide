# 🔒 Security Considerations by Complexity Level

> **Comprehensive security guidance tailored to each project complexity level**

## Overview

Security requirements and implementation strategies vary dramatically based on project complexity, user base, and data sensitivity. This guide provides practical security measures for each complexity level, from basic static sites to enterprise-grade systems.

### Cross-Cutting Policies (apply to every template)
- **Data retention:** define retention per data class (auth logs ≤90 days, analytics ≤13 months, PII only as long as contractually required). Document default values in each template README and in infra Terraform/Helm if used.
- **Log hygiene:** strip or mask PII (emails, tokens, IPs) at log emit; ensure logs roll daily with 30–90 day retention; never log secrets. Apply masking middleware for API and request logging in SaaS.
- **Breach readiness:** document contacts/on-call path and a 72-hour notification SLA; keep a runbook alongside `SECURITY.md`.
- **Secrets management:** use `.env.example` only; store live secrets in vault (1Password/HashiCorp/Vercel env vars). Prohibit committing `.env` or console-dumping secrets during debugging.

---

## Level 1: Static Site Security 📄

### Threat Model
- **Primary Risks:** Content tampering, SEO spam, hosting compromise
- **Attack Vectors:** DNS hijacking, CDN compromise, dependency poisoning
- **Data at Risk:** Public content, contact forms, analytics data

### Essential Security Measures

#### 🌐 **Hosting & Infrastructure**
```
✅ HTTPS/TLS everywhere (minimum TLS 1.2)
✅ Content Security Policy (CSP) headers
✅ Security headers (HSTS, X-Frame-Options, etc.)
✅ Regular dependency updates
✅ Subresource Integrity (SRI) for external scripts
```

#### 📝 **Content Security Policy Example**
```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self';
               script-src 'self' 'unsafe-inline' https://analytics.google.com;
               style-src 'self' 'unsafe-inline';
               img-src 'self' data: https:;">
```

#### 🛡️ **Security Headers Checklist**
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

#### 🔍 **Static Site Security Tools**
- **Mozilla Observatory:** Security header analysis
- **SSL Labs:** HTTPS configuration testing
- **OWASP ZAP:** Basic vulnerability scanning
- **Lighthouse:** Security audit in Chrome DevTools

### Implementation Timeline: **1-2 days**

---

## Level 2: Frontend Application Security 🎮

### Threat Model
- **Primary Risks:** XSS, CSRF, data exposure, API abuse
- **Attack Vectors:** Malicious scripts, API key exposure, localStorage attacks
- **Data at Risk:** User inputs, API responses, client-side tokens

### Security Measures

#### 🔐 **Authentication & Sessions**
```javascript
// Secure token storage
const secureStorage = {
  setToken: (token) => {
    // Use httpOnly cookies for sensitive tokens
    document.cookie = `token=${token}; Secure; SameSite=Strict; Path=/`;
  },

  // Or use secure localStorage for less sensitive data
  setUserData: (data) => {
    localStorage.setItem('userData', JSON.stringify(data));
  }
};
```

#### 🛡️ **Input Validation & Sanitization**
```javascript
// Client-side validation (never trust alone)
const validateInput = (input) => {
  const sanitized = DOMPurify.sanitize(input);
  const validated = validator.escape(sanitized);
  return validated;
};

// API input validation
const apiCall = async (data) => {
  const validatedData = validateSchema(data);
  return fetch('/api/endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': getCSRFToken()
    },
    body: JSON.stringify(validatedData)
  });
};
```

#### 🔑 **API Security**
```javascript
// Secure API key management
const API_CONFIG = {
  // Use environment variables
  baseURL: process.env.REACT_APP_API_URL,
  // Never expose secret keys in frontend
  publicKey: process.env.REACT_APP_PUBLIC_KEY,
  // Use proxy for sensitive API calls
  timeout: 10000
};

// Rate limiting on frontend
const rateLimiter = new RateLimiter({
  tokensPerInterval: 100,
  interval: 'hour'
});
```

#### 🚨 **XSS Prevention**
```javascript
// Safe DOM manipulation
const safeHTML = (content) => {
  const div = document.createElement('div');
  div.textContent = content; // Safe text insertion
  return div.innerHTML;
};

// React: Use dangerouslySetInnerHTML carefully
const SafeComponent = ({ userContent }) => {
  const sanitizedContent = DOMPurify.sanitize(userContent);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};
```

### Security Tools & Libraries
- **DOMPurify:** XSS sanitization
- **OWASP CSRF Guard:** CSRF protection
- **js-cookie:** Secure cookie handling
- **validator.js:** Input validation

### Implementation Timeline: **3-5 days**

---

## Level 3: Full-Stack Application Security 🏗️

### Threat Model
- **Primary Risks:** SQL injection, broken authentication, sensitive data exposure
- **Attack Vectors:** Database attacks, session hijacking, file upload vulnerabilities
- **Data at Risk:** User accounts, personal data, business logic, payment information

### Comprehensive Security Framework

#### 🔐 **Authentication & Authorization**
```javascript
// Secure password handling
const bcrypt = require('bcrypt');
const saltRounds = 12;

const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

// JWT with secure configuration
const jwt = require('jsonwebtoken');
const generateToken = (userId) => {
  return jwt.sign(
    { userId, iat: Date.now() },
    process.env.JWT_SECRET,
    {
      expiresIn: '15m',
      issuer: 'your-app-name',
      audience: 'your-app-users'
    }
  );
};
```

#### 🗄️ **Database Security**
```javascript
// Parameterized queries (prevents SQL injection)
const getUserById = async (id) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  return await db.query(query, [id]);
};

// Input validation with Joi
const Joi = require('joi');
const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required(),
  name: Joi.string().min(2).max(50).required()
});
```

#### 🔒 **Data Protection**
```javascript
// Encryption for sensitive data
const crypto = require('crypto');
const algorithm = 'aes-256-gcm';

const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher(algorithm, process.env.ENCRYPTION_KEY);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { encrypted, iv: iv.toString('hex') };
};
```

#### 🚦 **API Security Middleware**
```javascript
// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

// Helmet for security headers
const helmet = require('helmet');
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  }
}));
```

#### 📁 **File Upload Security**
```javascript
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    // Sanitize filename
    const sanitized = path.parse(file.originalname).name.replace(/[^a-zA-Z0-9]/g, '');
    cb(null, sanitized + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});
```

### Compliance & Privacy

#### 🌍 **GDPR Compliance**
```javascript
// Data retention policy
const scheduleDataDeletion = async (userId) => {
  const retentionPeriod = 365 * 24 * 60 * 60 * 1000; // 1 year
  setTimeout(async () => {
    await deleteUserData(userId);
  }, retentionPeriod);
};

// Right to be forgotten
const deleteAllUserData = async (userId) => {
  await db.query('DELETE FROM user_activity WHERE user_id = $1', [userId]);
  await db.query('DELETE FROM user_preferences WHERE user_id = $1', [userId]);
  await db.query('UPDATE users SET deleted_at = NOW() WHERE id = $1', [userId]);
};
```

### Security Testing Tools
- **OWASP ZAP:** Comprehensive security testing
- **SQLMap:** SQL injection testing
- **Burp Suite:** Web application security testing
- **npm audit:** Dependency vulnerability scanning

### Implementation Timeline: **1-2 weeks**

---

## Level 4: Scalable System Security ⚡

### Threat Model
- **Primary Risks:** Distributed system attacks, service mesh vulnerabilities, data breaches
- **Attack Vectors:** Container escapes, network segmentation failures, API gateway compromises
- **Data at Risk:** Multi-tenant data, microservice communications, distributed databases

### Advanced Security Architecture

#### 🔐 **Zero Trust Architecture**
```yaml
# Service mesh security (Istio example)
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
spec:
  mtls:
    mode: STRICT

---
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: user-service-authz
spec:
  selector:
    matchLabels:
      app: user-service
  rules:
  - when:
    - key: source.service_account
      values: ["api-gateway-sa"]
```

#### 🐳 **Container Security**
```dockerfile
# Secure Dockerfile practices
FROM node:18-alpine AS builder
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy application code
COPY --chown=nextjs:nodejs . .
USER nextjs

# Security scanning
FROM builder AS security-scan
RUN npm audit --audit-level high
```

#### 🔑 **Secrets Management**
```javascript
// HashiCorp Vault integration
const vault = require('node-vault')({
  endpoint: process.env.VAULT_ENDPOINT,
  token: process.env.VAULT_TOKEN
});

const getSecret = async (path) => {
  try {
    const result = await vault.read(`secret/data/${path}`);
    return result.data.data;
  } catch (error) {
    throw new Error(`Failed to retrieve secret: ${error.message}`);
  }
};
```

#### 📊 **Security Monitoring**
```javascript
// Security event logging
const winston = require('winston');
const securityLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'security.log' }),
    new winston.transports.Console()
  ]
});

const logSecurityEvent = (event, userId, details) => {
  securityLogger.warn({
    event,
    userId,
    details,
    timestamp: new Date().toISOString(),
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
};
```

### Implementation Timeline: **2-4 weeks**

---

## Level 5: Enterprise Security 🏢

### Threat Model
- **Primary Risks:** Advanced persistent threats, nation-state attacks, insider threats
- **Attack Vectors:** Supply chain attacks, sophisticated social engineering, zero-day exploits
- **Data at Risk:** Critical business data, intellectual property, customer PII, financial data

### Enterprise Security Framework

#### 🛡️ **Defense in Depth**
```
1. Perimeter Security: WAF, DDoS protection, threat intelligence
2. Network Security: Segmentation, VPN, intrusion detection
3. Application Security: Code analysis, runtime protection
4. Data Security: Encryption, DLP, access controls
5. Endpoint Security: Device management, threat detection
6. Identity Security: MFA, privileged access management
```

#### 🔐 **Identity & Access Management**
```javascript
// Advanced RBAC with ABAC
const authorize = async (user, resource, action, context) => {
  const policies = await getPolicies(user.roles);

  for (const policy of policies) {
    const decision = await evaluatePolicy({
      subject: user,
      resource,
      action,
      environment: context,
      policy
    });

    if (decision === 'PERMIT') return true;
    if (decision === 'DENY') return false;
  }

  return false; // Default deny
};
```

#### 📋 **Compliance Frameworks**

##### SOC 2 Type II Requirements
```
✅ Security: Access controls, firewalls, intrusion detection
✅ Availability: Monitoring, incident response, disaster recovery
✅ Processing Integrity: Data validation, error handling
✅ Confidentiality: Encryption, access restrictions
✅ Privacy: Data collection, use, retention, disposal
```

##### HIPAA Compliance (Healthcare)
```
✅ Administrative Safeguards: Security officer, training, access management
✅ Physical Safeguards: Facility controls, device controls
✅ Technical Safeguards: Access control, audit controls, encryption
```

##### PCI DSS (Payment Processing)
```
✅ Network Security: Firewalls, secure configurations
✅ Data Protection: Encryption, access controls
✅ Vulnerability Management: Security testing, updates
✅ Access Controls: Authentication, authorization
✅ Monitoring: Logging, file integrity monitoring
✅ Security Policies: Documentation, training
```

### Implementation Timeline: **3-6 months**

---

## Security Testing Strategy

### Level 1-2: Basic Testing
```
✅ Automated dependency scanning (npm audit, Snyk)
✅ Static code analysis (ESLint security rules)
✅ Basic penetration testing (OWASP ZAP)
✅ SSL/TLS configuration testing
```

### Level 3: Comprehensive Testing
```
✅ Dynamic application security testing (DAST)
✅ Interactive application security testing (IAST)
✅ Infrastructure security scanning
✅ API security testing
✅ Database security assessment
```

### Level 4-5: Advanced Testing
```
✅ Red team exercises
✅ Bug bounty programs
✅ Threat modeling workshops
✅ Security chaos engineering
✅ Third-party security audits
```

---

## Incident Response Plan

### Preparation
1. **Security team roles and responsibilities**
2. **Communication protocols**
3. **Incident classification system**
4. **Response tools and procedures**

### Detection & Analysis
1. **Security monitoring alerts**
2. **Incident triage and classification**
3. **Initial impact assessment**
4. **Evidence collection**

### Containment & Recovery
1. **Immediate containment actions**
2. **System isolation procedures**
3. **Data backup and recovery**
4. **Service restoration**

### Post-Incident
1. **Lessons learned documentation**
2. **Security control improvements**
3. **Process updates**
4. **Team training updates**

---

## Security Resources & Tools

### Static Analysis
- **SonarQube:** Code quality and security
- **Veracode:** Application security testing
- **Checkmarx:** Static application security testing

### Dynamic Testing
- **OWASP ZAP:** Web application security scanner
- **Burp Suite:** Security testing platform
- **Nessus:** Vulnerability scanner

### Monitoring & Detection
- **Splunk:** Security information and event management
- **Elastic Security:** Threat hunting and detection
- **CrowdStrike:** Endpoint detection and response

### Compliance
- **Vanta:** SOC 2 compliance automation
- **Tugboat Logic:** GRC platform
- **AWS Config:** Compliance monitoring

---

*Next: Explore specific [project type implementations](project-types/) with security measures included.*
