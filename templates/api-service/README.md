# API Service Starter Template

A production-ready REST API template built with Express.js, TypeScript, PostgreSQL, and JWT authentication.

**Complexity Level:** 2-3 | **Timeline:** 3-5 days | **Tech Stack:** Express + TypeScript + PostgreSQL + Prisma

> Need the one-page checklist? See the shared [Template Quick-Start Guide](../../docs/template-quickstart.md#api-service-express--prisma).

## Features

- 🚀 **Express.js** with TypeScript for type safety
- 🔐 **JWT Authentication** with bcrypt password hashing
- 🗄️ **PostgreSQL** database with Prisma ORM
- ✅ **Input Validation** with Joi schema validation
- 🛡️ **Security** with Helmet, CORS, and rate limiting
- 📝 **Logging** with Morgan
- 🧪 **Testing** setup with Jest and Supertest
- 📚 **API Documentation** ready structure
- 🐳 **Docker** ready configuration

## Quick Start

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Setup Quality Automation** (Recommended)

   ```bash
   # Add comprehensive quality automation
   npx create-quality-automation@latest
   npm install && npm run prepare

   # Critical for API security: linting, secret detection, input validation scanning
   npm run lint              # TypeScript + security rules
   npm run security:secrets  # Scan for hardcoded secrets
   npm run security:audit    # Dependency vulnerability check
   ```

3. **Environment Setup**
   Copy the sample environment file and update values as needed:

   ```bash
   cp .env.example .env
   ```

   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE_URL="postgresql://user:password@localhost:5432/api_db"
   JWT_SECRET=your-super-secret-jwt-key
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Database Setup**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run Development Server**

   ```bash
   npm run dev
   ```

6. **Test the API**

   ```bash
   curl http://localhost:3000/health
   ```

7. **Optional CI Setup**
   Copy `.github/workflows/ci.yml` to your repository root to enable GitHub Actions lint/test/build checks.

## Project Structure

```
api-service/
├── src/
│   ├── controllers/         # Route handlers
│   │   └── authController.ts
│   ├── middleware/          # Custom middleware
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   └── notFound.ts
│   ├── routes/              # API routes
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   └── health.ts
│   ├── utils/               # Utility functions
│   │   └── validation.ts
│   └── index.ts             # App entry point
├── tests/                   # Test files
├── prisma/                  # Database schema
├── package.json
└── README.md
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Health Check

- `GET /health` - API health status

### Example Requests

**Register User:**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

**Get Profile:**

```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Environment Variables

```env
# Server
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/api_db"

# Authentication
JWT_SECRET=your-super-secret-jwt-key

# Security
CORS_ORIGIN=http://localhost:3000
```

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint

### Database Management

- `npx prisma studio` - Open database GUI
- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema changes
- `npx prisma migrate dev` - Create and apply migration

### Testing

```bash
# Run all tests (uses mocked database - no setup required)
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- auth.test.ts
```

**Test Setup:**

- Tests use **mocked Prisma client** (no database required)
- **Server isolation**: Tests import app without starting HTTP listener
- **Fast execution**: No external dependencies
- See `tests/README.md` for advanced database testing options

## Deployment

### Railway

1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

### Heroku

1. Create Heroku app
2. Add PostgreSQL addon
3. Set environment variables
4. Deploy from Git

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["npm", "start"]
```

## Security Features

- **Password Hashing:** bcrypt with salt rounds
- **JWT Tokens:** Secure token-based authentication
- **Rate Limiting:** 100 requests per 15 minutes per IP
- **CORS:** Configurable cross-origin requests
- **Helmet:** Security headers
- **Input Validation:** Joi schema validation
- **SQL Injection Protection:** Prisma ORM

## Extending the API

### Adding New Routes

1. Create controller in `src/controllers/`
2. Add route file in `src/routes/`
3. Register route in `src/index.ts`

### Adding Database Models

1. Update `prisma/schema.prisma`
2. Run `npx prisma db push`
3. Generate client with `npx prisma generate`

### Adding Middleware

1. Create middleware function in `src/middleware/`
2. Apply to routes as needed

## License

MIT License - free to use for personal and commercial projects.
