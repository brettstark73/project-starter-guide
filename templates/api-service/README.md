# API Service Template

A minimal, production-ready REST API starter with Express, TypeScript, and best practices.

## Prerequisites

- **Node.js:** >=20.0.0
- **npm:** >=10.0.0
- Basic understanding of TypeScript and REST APIs

## Stack

- **Framework:** Express.js
- **Language:** TypeScript
- **Runtime:** Node.js
- **Security:** Helmet.js, CORS
- **Database:** Ready for PostgreSQL/MongoDB
- **Validation:** Ready for Zod integration
- **Testing:** Ready for Vitest/Jest
- **Deployment:** Docker-ready

## Quick Start

```bash
npm install  # Install dependencies
cp .env.example .env  # Copy environment variables
npm run dev  # Run in development mode (with auto-reload)
npm run build  # Build for production
npm start  # Run production build
```

The API will be available at [http://localhost:3000](http://localhost:3000).

## Features

- ✅ Health check endpoint (`/healthz`)
- ✅ TypeScript with strict mode
- ✅ Express with security middleware (Helmet, CORS)
- ✅ Error handling
- ✅ Environment variables
- ✅ Hot reload in development
- ✅ Vitest test setup with sample health check tests
- ✅ OpenAPI 3.0 spec stub (`openapi.yaml`)
- ✅ Docker support with multi-stage build
- 🚧 JWT authentication (integration needed)
- 🚧 Rate limiting (integration needed)
- 🚧 Request validation (integration needed)
- 🚧 Database integration (integration needed)

## Testing

```bash
npm test  # Run tests once
npm run test:watch  # Run tests in watch mode
```

The project includes a sample test suite for the health check endpoint demonstrating:
- HTTP status code testing
- Response body validation
- Timestamp and uptime verification

## API Endpoints

### Health Check
```bash
GET /healthz
```

Returns server health status, timestamp, and uptime.

### Root
```bash
GET /
```

Returns API information and available endpoints.

### Status
```bash
GET /api/v1/status
```

Returns API status and environment.

### Echo (Example POST)
```bash
POST /api/v1/echo
Content-Type: application/json

{
  "message": "Hello API"
}
```

## Project Structure

```
api-service/
├── src/
│   └── index.ts         # Main server file
├── .env.example         # Environment variables template
├── tsconfig.json        # TypeScript configuration
└── package.json
```

## Next Steps

1. **Database**: Add PostgreSQL or MongoDB
   - Install a database client (pg, mongoose)
   - Create connection module
   - Add migrations

2. **Validation**: Add request validation
   - Install Zod or Joi
   - Create validation middleware
   - Validate request bodies

3. **Authentication**: Add JWT auth
   - Install jsonwebtoken
   - Create auth middleware
   - Add login/register endpoints

4. **Documentation**: Complete the OpenAPI spec
   - A basic `openapi.yaml` stub is included
   - Validate it:
     ```bash
     # Quick validation (uses npx, no install needed)
     npm run openapi:lint

     # Or install for better performance
     npm install -D @redocly/cli
     npm run openapi:validate
     ```
   - Bundle for deployment:
     ```bash
     npm run openapi:bundle
     ```
   - Serve interactive docs:
     ```bash
     npm install swagger-ui-express
     # Then add route in src/app.ts to serve docs
     ```

5. **Deploy**: Build and run with Docker
   ```bash
   # Build the Docker image
   docker build -t api-service .

   # Run the container
   docker run -p 3000:3000 --env-file .env api-service

   # Or use docker-compose (create docker-compose.yml as needed)
   ```

   The included `Dockerfile` uses multi-stage builds for optimal image size and includes health checks.

## Security & Data Handling

### Secure Logging

**❌ Never log sensitive data:**
- Passwords, API keys, tokens
- Credit card numbers, SSN
- Full email addresses (mask them)
- Authorization headers

**✅ Safe logging practices:**
```typescript
// Redact sensitive fields
logger.info('API request', {
  method: req.method,
  path: req.path,
  ip: req.ip,
  userId: req.user?.id,  // ID only, not full user object
  // Never log: req.headers.authorization, req.body.password, etc.
});
```

### Rate Limiting

**Default protection included:** All `/api/*` routes are rate-limited to **100 requests per 15 minutes** per IP address.

The rate limiter is already configured in `src/app.ts`:
- Window: 15 minutes
- Max requests: 100 per IP
- Applies to: All `/api/*` routes

**To add stricter limits for auth endpoints:**
```typescript
const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,  // 5 minutes
  max: 10,  // Stricter limit for sensitive endpoints
  skipSuccessfulRequests: true,  // Only count failed attempts
});

app.post('/api/v1/login', authLimiter, loginHandler);
```

### Environment Variables

- Never commit `.env` files (already in `.gitignore`)
- Use `.env.example` for documentation
- Validate required environment variables at startup
- Use different secrets for dev/staging/prod

### Data Privacy

- **PII**: Hash or encrypt personally identifiable information
- **Compliance**: Follow GDPR, CCPA requirements for user data
- **Retention**: Implement data retention policies
- **Deletion**: Provide user data deletion mechanisms

See the [Security Guide](../../docs/security-guide.md) for detailed best practices.

## Resources

- [APIs & Microservices Guide](../../docs/project-types/apis.md)
- [Technology Matrix](../../docs/technology-matrix.md)
- [Express Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## License

MIT License - see [LICENSE](../../LICENSE) for details.

**Author:** Customize the `author` field in `package.json` for your project.
