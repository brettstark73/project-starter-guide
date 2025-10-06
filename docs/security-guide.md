# 🔒 Security Guide

**Last updated:** 2025-10-05

## Prerequisites

- Basic understanding of web application architecture
- Familiarity with HTTP and web protocols
- Knowledge of authentication and authorization concepts
- Understanding of common web vulnerabilities (OWASP Top 10)
- For advanced sections: cryptography basics and infrastructure security

## Overview

Security is critical at every level of application development. This guide covers essential security practices organized by complexity level and application type.

---

## Security by Complexity Level

### Level 1-2: Basic Security (Simple Apps)

**Essential checklist:**
- ✅ HTTPS everywhere (SSL/TLS)
- ✅ Input validation and sanitization
- ✅ Environment variables for secrets
- ✅ CORS configuration
- ✅ Secure password storage (bcrypt, Argon2)
- ✅ Rate limiting on public endpoints
- ✅ Security headers

### Level 3-4: Production Security

**Additional requirements:**
- ✅ Authentication & authorization
- ✅ CSRF protection
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ API key management
- ✅ Security logging & monitoring
- ✅ Regular dependency updates
- ✅ Security testing (automated)

### Level 5: Enterprise Security

**Advanced requirements:**
- ✅ Zero-trust architecture
- ✅ Encryption at rest and in transit
- ✅ SOC 2 / ISO 27001 compliance
- ✅ Penetration testing
- ✅ Security incident response plan
- ✅ DDoS protection
- ✅ Secrets management (Vault)
- ✅ Security audits & compliance

---

## Authentication & Authorization

### Password Storage

❌ **Never do this:**
```typescript
// WRONG: Plain text
const user = {
  password: 'password123'  // NEVER!
};

// WRONG: Simple hashing
const user = {
  password: crypto.createHash('md5').update(password).digest('hex')  // Weak!
};
```

✅ **Do this:**
```typescript
import bcrypt from 'bcryptjs';
import { Argon2id } from 'oslo/password';

// bcrypt (good)
const hashedPassword = await bcrypt.hash(password, 12);
const isValid = await bcrypt.compare(password, hashedPassword);

// Argon2id (better - recommended)
const argon2 = new Argon2id();
const hash = await argon2.hash(password);
const isValid = await argon2.verify(hash, password);
```

### JWT Best Practices

```typescript
import jwt from 'jsonwebtoken';

// Secure JWT configuration
const accessToken = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET!,
  {
    expiresIn: '15m',  // Short-lived access tokens
    issuer: 'your-app',
    audience: 'your-api'
  }
);

const refreshToken = jwt.sign(
  { userId: user.id },
  process.env.REFRESH_SECRET!,
  {
    expiresIn: '7d',  // Longer-lived refresh tokens
  }
);

// Store refresh token securely (database)
await db.refreshTokens.create({
  userId: user.id,
  token: refreshToken,
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
});

// Set cookies with security flags
res.cookie('refreshToken', refreshToken, {
  httpOnly: true,    // Not accessible via JavaScript
  secure: true,      // HTTPS only
  sameSite: 'strict', // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000
});
```

### Token Refresh Pattern

```typescript
// Verify and refresh tokens
async function refreshTokens(refreshToken: string) {
  // Verify refresh token
  const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET!);

  // Check if token is in database (not revoked)
  const storedToken = await db.refreshTokens.findFirst({
    where: {
      userId: payload.userId,
      token: refreshToken,
      expiresAt: { gt: new Date() }
    }
  });

  if (!storedToken) {
    throw new Error('Invalid refresh token');
  }

  // Generate new tokens
  const newAccessToken = generateAccessToken(payload.userId);
  const newRefreshToken = generateRefreshToken(payload.userId);

  // Revoke old refresh token
  await db.refreshTokens.delete({ where: { id: storedToken.id } });

  // Store new refresh token
  await db.refreshTokens.create({
    userId: payload.userId,
    token: newRefreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}
```

### OAuth 2.0 / OIDC

```typescript
import { Auth0Provider } from '@auth0/nextjs-auth0';

// Auth0 configuration (recommended for production)
<Auth0Provider>
  <App />
</Auth0Provider>

// Or using NextAuth.js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
});
```

### Role-Based Access Control (RBAC)

```typescript
// Define permissions
enum Permission {
  READ_USERS = 'read:users',
  WRITE_USERS = 'write:users',
  DELETE_USERS = 'delete:users',
  ADMIN = 'admin',
}

// Role definitions
const ROLES = {
  user: [Permission.READ_USERS],
  moderator: [Permission.READ_USERS, Permission.WRITE_USERS],
  admin: [Permission.READ_USERS, Permission.WRITE_USERS, Permission.DELETE_USERS, Permission.ADMIN],
};

// Authorization middleware
function requirePermission(permission: Permission) {
  return (req, res, next) => {
    const userPermissions = ROLES[req.user.role] || [];

    if (!userPermissions.includes(permission)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    next();
  };
}

// Usage
app.delete('/users/:id',
  authenticate,
  requirePermission(Permission.DELETE_USERS),
  deleteUser
);
```

---

## Input Validation & Sanitization

### Server-Side Validation

```typescript
import { z } from 'zod';

// Define schema
const userSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8).max(128)
    .regex(/[A-Z]/, 'Must contain uppercase')
    .regex(/[a-z]/, 'Must contain lowercase')
    .regex(/[0-9]/, 'Must contain number')
    .regex(/[^A-Za-z0-9]/, 'Must contain special char'),
  age: z.number().int().min(18).max(120),
});

// Validate input
app.post('/users', async (req, res) => {
  try {
    const validated = userSchema.parse(req.body);
    const user = await createUser(validated);
    res.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    throw error;
  }
});
```

### SQL Injection Prevention

❌ **Never do this:**
```typescript
// VULNERABLE to SQL injection
const userId = req.params.id;
const user = await db.query(`SELECT * FROM users WHERE id = ${userId}`);
```

✅ **Do this:**
```typescript
// Parameterized queries (safe)
const user = await db.query('SELECT * FROM users WHERE id = $1', [userId]);

// Or use an ORM
const user = await prisma.users.findUnique({
  where: { id: userId }
});
```

### XSS Prevention

```typescript
// Server-side sanitization
import DOMPurify from 'isomorphic-dompurify';

function sanitizeHTML(dirty: string) {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p'],
    ALLOWED_ATTR: ['href']
  });
}

// Client-side (React automatically escapes)
function UserComment({ comment }) {
  // Safe: React escapes by default
  return <p>{comment.text}</p>;

  // Dangerous: Only if you trust the source
  return <p dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
}
```

---

## Security Headers

### Essential Headers

```typescript
import helmet from 'helmet';

app.use(helmet()); // Sets multiple security headers

// Or manually:
app.use((req, res, next) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');

  // XSS protection
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // HTTPS enforcement
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  // CSP
  res.setHeader('Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.example.com; style-src 'self' 'unsafe-inline';"
  );

  next();
});
```

### Next.js Security Headers

```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
    ];
  },
};
```

---

## CSRF Protection

```typescript
import csrf from 'csurf';

// CSRF middleware
const csrfProtection = csrf({ cookie: true });

app.get('/form', csrfProtection, (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});

app.post('/process', csrfProtection, (req, res) => {
  // Token validated automatically
  res.send('Data processed');
});

// Next.js API route
import { getCsrfToken } from 'next-auth/react';

export default async function handler(req, res) {
  const csrfToken = await getCsrfToken({ req });

  if (req.headers['x-csrf-token'] !== csrfToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }

  // Process request
}
```

---

## Rate Limiting & DDoS Protection

### Application-Level Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

// Global rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', limiter);

// Strict rate limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 attempts per 15 minutes
  skipSuccessfulRequests: true,
});

app.post('/api/login', authLimiter, loginHandler);
```

### Redis-Based Rate Limiting

```typescript
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: 'ratelimit',
  points: 10, // Number of points
  duration: 1, // Per second
});

app.use(async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (rejRes) {
    res.status(429).json({
      error: 'Too Many Requests',
      retryAfter: Math.round(rejRes.msBeforeNext / 1000)
    });
  }
});
```

### DDoS Protection (Cloudflare)

```typescript
// Cloudflare Workers (at the edge)
export default {
  async fetch(request) {
    const ip = request.headers.get('CF-Connecting-IP');

    // Check if IP is in rate limit
    const rateLimit = await checkRateLimit(ip);

    if (rateLimit.exceeded) {
      return new Response('Rate limit exceeded', { status: 429 });
    }

    // Verify bot traffic
    const isBot = request.headers.get('User-Agent').includes('bot');
    if (isBot) {
      // Challenge with CAPTCHA
      return challengeResponse();
    }

    return fetch(request);
  }
};
```

---

## API Security

### API Key Management

```typescript
// Secure API key storage
import crypto from 'crypto';

function generateApiKey() {
  return crypto.randomBytes(32).toString('hex');
}

// Hash API keys before storing
async function storeApiKey(userId: string) {
  const apiKey = generateApiKey();
  const hashedKey = crypto.createHash('sha256').update(apiKey).digest('hex');

  await db.apiKeys.create({
    userId,
    keyHash: hashedKey,
    keyPrefix: apiKey.slice(0, 8), // Store prefix for identification
    createdAt: new Date(),
  });

  // Return key only once (never shown again)
  return apiKey;
}

// Validate API key
async function validateApiKey(providedKey: string) {
  const hashedKey = crypto.createHash('sha256').update(providedKey).digest('hex');

  const apiKey = await db.apiKeys.findFirst({
    where: { keyHash: hashedKey }
  });

  return apiKey;
}
```

### API Request Signing

```typescript
// HMAC signature verification
import crypto from 'crypto';

function generateSignature(payload: string, secret: string) {
  return crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
}

// Middleware to verify signature
function verifySignature(req, res, next) {
  const signature = req.headers['x-signature'];
  const timestamp = req.headers['x-timestamp'];
  const body = JSON.stringify(req.body);

  // Prevent replay attacks (5 min window)
  if (Date.now() - parseInt(timestamp) > 300000) {
    return res.status(401).json({ error: 'Request expired' });
  }

  const expectedSignature = generateSignature(
    `${timestamp}.${body}`,
    process.env.API_SECRET
  );

  if (signature !== expectedSignature) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  next();
}
```

---

## Secrets Management

### Environment Variables (Basic)

```bash
# .env (never commit!)
DATABASE_URL="postgresql://user:pass@localhost:5432/db"
JWT_SECRET="random-secret-key-change-in-production"
STRIPE_SECRET_KEY="sk_test_xxx"
```

```typescript
// Load with dotenv
import 'dotenv/config';

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error('DATABASE_URL is required');
}
```

### HashiCorp Vault (Production)

```typescript
import vault from 'node-vault';

const vaultClient = vault({
  endpoint: process.env.VAULT_ADDR,
  token: process.env.VAULT_TOKEN,
});

// Read secret
async function getSecret(path: string) {
  const result = await vaultClient.read(path);
  return result.data;
}

// Usage
const dbCreds = await getSecret('secret/database');
const dbUrl = `postgresql://${dbCreds.username}:${dbCreds.password}@${dbCreds.host}`;
```

### AWS Secrets Manager

```typescript
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

const client = new SecretsManagerClient({ region: 'us-east-1' });

async function getSecret(secretName: string) {
  const command = new GetSecretValueCommand({ SecretId: secretName });
  const response = await client.send(command);

  return JSON.parse(response.SecretString);
}

// Usage
const dbCreds = await getSecret('prod/database');
```

---

## Data Encryption

### Encryption at Rest

```typescript
import crypto from 'crypto';

// Encrypt sensitive data before storing
function encrypt(text: string, key: string) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(key, 'hex'), iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag();

  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted,
    authTag: authTag.toString('hex'),
  };
}

function decrypt(encrypted: any, key: string) {
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    Buffer.from(key, 'hex'),
    Buffer.from(encrypted.iv, 'hex')
  );

  decipher.setAuthTag(Buffer.from(encrypted.authTag, 'hex'));

  let decrypted = decipher.update(encrypted.encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

// Store encrypted field
const encryptedSSN = encrypt(user.ssn, process.env.ENCRYPTION_KEY);
await db.users.create({
  ...user,
  ssn: JSON.stringify(encryptedSSN),
});
```

### Encryption in Transit (TLS)

```typescript
// Enforce HTTPS
if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
  return res.redirect(301, `https://${req.headers.host}${req.url}`);
}

// mTLS for service-to-service communication
import https from 'https';
import fs from 'fs';

const options = {
  cert: fs.readFileSync('client-cert.pem'),
  key: fs.readFileSync('client-key.pem'),
  ca: fs.readFileSync('ca-cert.pem'),
};

https.get('https://api.internal.com', options, (res) => {
  // Secure communication
});
```

---

## Security Monitoring & Logging

### Security Event Logging

```typescript
import winston from 'winston';

const securityLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'security.log' }),
  ],
});

// Log security events
function logSecurityEvent(event: string, details: any) {
  securityLogger.info({
    event,
    timestamp: new Date().toISOString(),
    ...details,
  });
}

// Usage
app.post('/login', async (req, res) => {
  try {
    const user = await authenticate(req.body);

    logSecurityEvent('login_success', {
      userId: user.id,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    });

    res.json({ token });
  } catch (error) {
    logSecurityEvent('login_failed', {
      email: req.body.email,
      ip: req.ip,
      reason: error.message,
    });

    res.status(401).json({ error: 'Invalid credentials' });
  }
});
```

### Intrusion Detection

```typescript
// Detect suspicious activity
async function detectSuspiciousActivity(userId: string, ip: string) {
  const recentAttempts = await db.loginAttempts.count({
    where: {
      userId,
      createdAt: { gte: new Date(Date.now() - 5 * 60 * 1000) }
    }
  });

  if (recentAttempts > 5) {
    // Alert security team
    await sendSecurityAlert({
      type: 'brute_force_attempt',
      userId,
      ip,
      attempts: recentAttempts,
    });

    // Lock account
    await db.users.update({
      where: { id: userId },
      data: { locked: true, lockedUntil: new Date(Date.now() + 30 * 60 * 1000) }
    });
  }
}
```

---

## Dependency Security

### Automated Scanning

```bash
# npm audit
npm audit
npm audit fix

# Snyk (comprehensive)
npm install -g snyk
snyk test
snyk monitor

# Dependabot (GitHub)
# Automatically creates PRs for vulnerable dependencies
```

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

### Runtime Protection

```typescript
// Prevent prototype pollution
import hpp from 'hpp';

app.use(hpp()); // HTTP Parameter Pollution protection

// Subresource Integrity (SRI)
<script
  src="https://cdn.example.com/lib.js"
  integrity="sha384-xxx"
  crossorigin="anonymous"
></script>
```

---

## Security Checklist by Level

### Level 1-2 Checklist
- [ ] HTTPS enabled (SSL certificate)
- [ ] Environment variables for secrets
- [ ] Input validation (all user inputs)
- [ ] Password hashing (bcrypt/Argon2)
- [ ] CORS configured properly
- [ ] Security headers (Helmet.js)
- [ ] Rate limiting on auth endpoints
- [ ] Dependencies up to date

### Level 3-4 Checklist
- [ ] Authentication implemented (JWT/OAuth)
- [ ] Authorization (RBAC/permissions)
- [ ] CSRF protection
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS protection (sanitization)
- [ ] API key management
- [ ] Audit logging
- [ ] Automated security scanning
- [ ] Secrets management (Vault/AWS Secrets)
- [ ] Data encryption (sensitive fields)

### Level 5 Checklist
- [ ] Zero-trust architecture
- [ ] Encryption at rest and in transit
- [ ] Penetration testing (annual)
- [ ] Security incident response plan
- [ ] Compliance certifications (SOC 2, ISO 27001)
- [ ] Advanced monitoring & alerting
- [ ] DDoS protection (Cloudflare)
- [ ] Bug bounty program
- [ ] Security training for team
- [ ] Regular security audits

---

## Common Security Mistakes

1. **Storing secrets in code** → Use environment variables/secrets manager
2. **Weak password policies** → Enforce strong passwords, use MFA
3. **No rate limiting** → Easy DDoS/brute force attacks
4. **Ignoring dependency vulnerabilities** → Run npm audit regularly
5. **Poor error messages** → Don't leak implementation details
6. **Missing security headers** → Use Helmet.js
7. **Client-side validation only** → Always validate server-side
8. **Outdated dependencies** → Update regularly
9. **No logging/monitoring** → Can't detect breaches
10. **Trusting user input** → Validate and sanitize everything

---

## Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [Security Headers](https://securityheaders.com/)
- [Have I Been Pwned](https://haveibeenpwned.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)
- [CWE Top 25](https://cwe.mitre.org/top25/)

---

*Remember: Security is not a one-time task, it's an ongoing process. Stay updated with the latest vulnerabilities and best practices.*
