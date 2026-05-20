# ApplySmart AI

ApplySmart AI is a full-stack career platform for building, optimizing, storing, and managing job-search documents. The application combines a Spring Boot backend, a React/Vite frontend, Anthropic Claude workflows, Cloudinary file storage, PostgreSQL, Redis, and Dockerized deployment support.

## Current Capabilities

### Resume Optimization

- Optimize an uploaded PDF, DOCX, or TXT resume against a target job description.
- Optimize from a saved original resume without re-uploading the file.
- Analyze resumes with AI and return score, strengths, improvements, keywords, and ATS compatibility.
- Generate optimized resume PDFs with selectable templates.
- Optionally generate a matching cover letter during the resume optimization flow.
- Separate source/original resumes from optimized and built resumes in the UI.

### Resume Builder

- Build structured resumes from profile, summary, work experience, education, skills, projects, and certifications.
- Preview resumes live while editing.
- Render PDFs without saving, or save built resumes to the document vault.
- Support multiple resume templates, including modern, classic, creative, and professional layouts.

### Documents Vault

- Browse original resumes, optimized resumes, built resumes, and cover letters in dedicated tabs.
- Search documents across paginated backend results.
- Preview resume and cover-letter artifacts.
- Download and delete saved documents.
- Display accurate document counts across all tabs.

### Cover Letters

- Generate tailored cover letters from a job description and optional linked resume.
- Generate cover letters from an uploaded resume file.
- Choose tone options and add highlights.
- Regenerate and update existing cover letters.
- Store generated cover letters in the document vault.

### Job Search Workflow

- Track job applications in a job tracker.
- View dashboard analytics for application status, document coverage, funnel metrics, and trends.
- Manage profile, account, and security settings.

### Authentication and Security

- Email/password signup and login.
- Email verification and password reset by code.
- JWT access and refresh token flow.
- OAuth2 login code exchange for external providers.
- Authenticator-app two-factor setup, enable, disable, and login verification.
- BCrypt password hashing, Redis-backed token/session infrastructure, rate limiting, and centralized validation.

### Admin and Operations

- Admin APIs and dashboard areas for users and analytics.
- OpenAPI/Swagger documentation.
- Actuator health endpoints.
- Docker Compose infrastructure for PostgreSQL, Redis, and backend runtime.
- Backend Docker image includes Chromium for browser-accurate PDF rendering with OpenHTMLToPDF fallback.

## Technology Stack

### Frontend

- React 18
- TypeScript
- Vite
- React Router v7 via `react-router`
- TanStack Query
- Tailwind CSS 4
- Radix UI primitives
- Framer Motion
- Lucide icons
- Recharts
- Vitest

### Backend

- Java 17
- Spring Boot 3.2
- Spring Security
- Spring Data JPA
- PostgreSQL 15
- Redis 7
- Flyway migrations
- Anthropic Claude API through WebClient
- Cloudinary
- Spring Mail
- Bucket4j rate limiting
- Apache Tika, Apache POI, and PDFBox for document parsing
- Chromium and OpenHTMLToPDF for PDF generation
- Maven

## Repository Layout

```text
career-boost-ai/
|-- backend/
|   |-- src/main/java/ai/applysmart/
|   |   |-- config/              # Runtime configuration and properties
|   |   |-- controller/          # HTTP controllers
|   |   |-- dto/                 # API request/response DTOs
|   |   |-- entity/              # JPA entities
|   |   |-- exception/           # Domain exceptions and global handler
|   |   |-- repository/          # Spring Data repositories
|   |   |-- security/            # JWT, OAuth2, access handling, user details
|   |   |-- service/             # Domain services and focused collaborators
|   |   |-- util/                # Cross-domain utility code
|   |   `-- validation/          # Shared validation rules
|   |-- src/main/resources/
|   |   |-- db/migration/        # Flyway migrations
|   |   |-- fonts/               # Resume PDF fonts
|   |   |-- templates/           # Resume HTML templates
|   |   `-- application.yml
|   `-- pom.xml
|-- frontend/
|   |-- src/
|   |   |-- app/                 # Route definitions
|   |   |-- features/            # Feature modules
|   |   `-- shared/              # Shared UI, layout, API client, hooks, types
|   |-- package.json
|   `-- vite.config.ts
|-- docker-compose.yml
|-- docker-compose.infra.yml
|-- .env.example
`-- README.md
```

For architectural rules and agent guidance, see `docs/ENGINEERING_PATTERNS.md`.

## Prerequisites

- Java 17
- Node.js 18 or newer
- npm
- Docker and Docker Compose
- Maven 3.8 or newer, or Docker for Maven-based backend verification

External services used by the application:

- Anthropic API key
- Cloudinary account
- SMTP account for email
- PostgreSQL
- Redis
- Optional OAuth provider credentials for Google and GitHub

## Environment Setup

Create backend/root environment variables:

```bash
cp .env.example .env
```

Create frontend environment variables:

```bash
cp frontend/.env.example frontend/.env.local
```

Key frontend variables:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_API_TIMEOUT=30000
```

Key backend/root variables include:

- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`
- `JWT_SECRET`, `JWT_EXPIRATION`
- `ANTHROPIC_API_KEY`
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_FROM`
- OAuth provider credentials when OAuth login is enabled

## Local Development

Start PostgreSQL and Redis:

```bash
docker compose up -d postgres redis
```

Run the backend:

```bash
cd backend
mvn spring-boot:run
```

Run the frontend in another terminal:

```bash
cd frontend
npm install
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8080/api/v1`
- Swagger UI: `http://localhost:8080/swagger-ui/index.html`
- Health: `http://localhost:8080/actuator/health`

## Docker

Run the backend with PostgreSQL and Redis:

```bash
docker compose up -d --build
```

Run only VPS-style infrastructure:

```bash
docker compose -f docker-compose.infra.yml up -d
```

Build the backend image locally:

```bash
docker build -t career-boost-ai-backend:verify ./backend
```

Verify Chromium is available in the backend image:

```bash
docker run --rm --entrypoint sh career-boost-ai-backend:verify -lc 'command -v chromium'
```

## Verification Commands

Frontend:

```bash
cd frontend
npm run typecheck
npm test
npm run build
```

Backend:

```bash
cd backend
mvn test
```

If local Maven is unavailable:

```bash
docker run --rm -v "$PWD/backend":/app -w /app maven:3.9-eclipse-temurin-17 mvn test -B
```

Repository sanity check:

```bash
git diff --check
```

## API Overview

Base path: `/api/v1`

Primary endpoint groups:

- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/login/2fa/verify`
- `POST /auth/refresh`
- `POST /auth/request-password-reset`
- `POST /auth/reset-password`
- `POST /auth/verify-email`
- `POST /auth/oauth2/exchange`
- `GET /auth/me`
- `GET /resumes`
- `POST /resumes/upload`
- `POST /resumes/{id}/analyze`
- `POST /resumes/{id}/optimize`
- `POST /resumes/optimize-upload`
- `POST /resumes/build/from-data`
- `POST /resumes/build/pdf`
- `GET /cover-letters`
- `POST /cover-letters/generate`
- `POST /cover-letters/generate-from-file`
- `POST /cover-letters/{id}/regenerate`
- `GET /jobs`
- `GET /dashboard/*`
- `GET /settings/*`
- `GET /admin/*`

### Example: Analyze a Resume

`jobDescription` is a query parameter for this endpoint.

```bash
curl -X POST "http://localhost:8080/api/v1/resumes/1/analyze?jobDescription=Senior%20Java%20Developer" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Example: Optimize an Existing Resume

```bash
curl -X POST http://localhost:8080/api/v1/resumes/1/optimize \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "jobDescription": "We need a backend engineer with Java, Spring Boot, PostgreSQL, and AWS experience.",
    "template": "MODERN",
    "coverLetter": {
      "enabled": true,
      "tone": "professional",
      "highlights": "Backend systems, API design, data modeling"
    }
  }'
```

### Example: Build a Resume PDF From Structured Data

```bash
curl -X POST http://localhost:8080/api/v1/resumes/build/pdf \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  --output resume.pdf \
  -d '{
    "name": "Ada Lovelace",
    "template": "PROFESSIONAL",
    "resumeData": {
      "personalInfo": {
        "name": "Ada Lovelace",
        "email": "ada@example.com"
      },
      "summary": "Backend engineer focused on reliable systems.",
      "workExperience": [],
      "education": [],
      "skills": ["Java", "Spring Boot", "PostgreSQL"]
    }
  }'
```

## Architecture Notes

### Backend

- Controllers stay thin and handle HTTP concerns only.
- Services own business workflows, transactions, lookups, and orchestration.
- Domain collaborators are colocated under `service/<domain>`.
- DTO mapping is explicit and colocated with the owning domain.
- Resume optimization is split across parsing, naming, file creation, template selection, PDF rendering, and workflow orchestration.
- Template rendering is handled by dedicated section renderers and shared render support.
- Errors flow through `GlobalExceptionHandler`.

### Frontend

- Feature code lives in `frontend/src/features/<feature>`.
- Shared app layout, primitives, API client, response types, and utilities live in `frontend/src/shared`.
- Components describe UI; hooks coordinate state and mutations; services call APIs; utilities transform data.
- Server state is managed through TanStack Query.
- The Documents Vault uses paginated queries and keeps previous data while searching to avoid UI flicker.
- Conditional class composition uses the shared `cn(...)` helper.

## Security and Production Readiness

- JWT access/refresh token flow.
- Redis-backed token/session and rate-limit infrastructure.
- Two-factor authentication support.
- OAuth login code exchange without putting tokens in redirect query strings.
- Bean Validation and custom validation rules.
- Soft delete for user-owned documents.
- Centralized exception handling with safe server-error responses.
- Docker runtime uses a non-root user.
- Backend image includes Chromium for PDF generation.

## Troubleshooting

Check infrastructure health:

```bash
docker compose ps
```

Check backend health:

```bash
curl http://localhost:8080/actuator/health
```

Inspect backend logs:

```bash
docker compose logs -f backend
```

Verify frontend can reach the API:

```bash
cat frontend/.env.local
```

Common issues:

- Missing or weak `JWT_SECRET`
- PostgreSQL or Redis not running
- Incorrect `VITE_API_BASE_URL`
- Missing Anthropic, Cloudinary, or SMTP credentials
- OAuth redirect URI mismatch between provider settings and `.env`

## Author

Built by Ferguson Iyara.
