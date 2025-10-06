# API Service Template

A minimal, production-ready REST API starter with Express, TypeScript, and best practices.

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
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run in development mode (with auto-reload)
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

The API will be available at [http://localhost:3000](http://localhost:3000).

## Features

- ✅ Health check endpoint (`/healthz`)
- ✅ TypeScript with strict mode
- ✅ Express with security middleware (Helmet, CORS)
- ✅ Error handling
- ✅ Environment variables
- ✅ Hot reload in development
- 🚧 JWT authentication (integration needed)
- 🚧 Rate limiting (integration needed)
- 🚧 Request validation (integration needed)
- 🚧 Database integration (integration needed)
- 🚧 OpenAPI/Swagger docs (integration needed)

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

4. **Documentation**: Add OpenAPI/Swagger
   - Install swagger-ui-express
   - Define API schemas
   - Generate documentation

5. **Deploy**: Containerize with Docker
   ```dockerfile
   FROM node:20-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY dist ./dist
   CMD ["node", "dist/index.js"]
   ```

## Resources

- [APIs & Microservices Guide](../../docs/project-types/apis.md)
- [Technology Matrix](../../docs/technology-matrix.md)
- [Express Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
