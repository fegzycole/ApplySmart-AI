# Apply Smart AI - Full Stack Application

A production-ready, AI-powered career optimization platform built with React + Spring Boot.

## 🚀 Features

### Core Features

- **AI-Powered Resume Optimization** - Uses Claude AI to analyze and optimize resumes for ATS systems
- **AI Cover Letter Generation** - Personalized cover letters tailored to job descriptions
- **Job Application Tracker** - Kanban-style board to manage your job search
- **Dashboard Analytics** - Visual insights into your job search progress
- **Admin Panel** - Complete admin dashboard with user management and analytics
- **Feature Flags** - Centralized feature toggle system for controlled rollouts

### User Experience

- **Skeleton Loading States** - Professional loading animations across all pages
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark Mode** - Full dark mode support throughout the application

### Technical Features

- **File Storage** - Cloudinary integration for resume uploads
- **Email Notifications** - Automated emails for application updates
- **Secure Authentication** - JWT-based auth with refresh tokens
- **Redis Caching** - High-performance caching layer
- **PostgreSQL Database** - Reliable data persistence
- **Docker Support** - One-command deployment

## 📁 Project Structure

```
career-boost-ai/
├── frontend/                     # React + TypeScript + Vite
│   ├── src/
│   │   ├── features/            # Feature-based architecture
│   │   │   ├── admin/           # Admin panel & analytics
│   │   │   ├── authentication/  # Login, signup, landing
│   │   │   ├── cover-letter/    # AI cover letter generation
│   │   │   ├── dashboard/       # User dashboard & charts
│   │   │   ├── job-tracker/     # Kanban job tracker
│   │   │   ├── pricing/         # Pricing page
│   │   │   ├── resume/          # Resume management & AI
│   │   │   └── settings/        # User settings & profile
│   │   ├── shared/              # Shared resources
│   │   │   ├── components/      # Reusable UI components
│   │   │   │   ├── ui/          # shadcn/ui components
│   │   │   │   └── skeletons/   # Loading skeletons
│   │   │   ├── config/          # Feature flags & config
│   │   │   ├── services/        # API clients
│   │   │   ├── hooks/           # Custom React hooks
│   │   │   └── utils/           # Utility functions
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── backend/                     # Spring Boot 3.2
│   ├── src/main/java/ai/applysmart/
│   │   ├── config/              # Application configuration
│   │   │   ├── FeatureFlags.java
│   │   │   └── SecurityConfig.java
│   │   ├── security/            # Security & JWT
│   │   ├── entity/              # JPA entities
│   │   ├── repository/          # Data repositories
│   │   ├── service/             # Business logic
│   │   │   ├── impl/            # Service implementations
│   │   │   └── AdminService.java
│   │   ├── controller/          # REST controllers
│   │   │   └── AdminController.java
│   │   ├── dto/                 # Data Transfer Objects
│   │   │   └── admin/           # Admin DTOs
│   │   ├── exception/           # Exception handling
│   │   └── util/                # Utility classes
│   ├── src/main/resources/
│   │   ├── application.yml
│   │   └── db/migration/        # Flyway migrations
│   └── pom.xml
├── docker-compose.yml           # Docker services
└── .env.example                 # Environment variables template

```

## 🛠 Technology Stack

### Frontend

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **Charts**: Recharts
- **Drag & Drop**: React DnD
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Zod

### Backend

- **Framework**: Spring Boot 3.2
- **Language**: Java 17
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **AI Integration**: Anthropic Claude API
- **File Storage**: Cloudinary
- **Email**: Spring Mail (SMTP)
- **Authentication**: JWT with Redis
- **API Documentation**: OpenAPI/Swagger
- **Build Tool**: Maven

### DevOps

- **Containerization**: Docker & Docker Compose
- **Monitoring**: Spring Actuator + Prometheus
- **Logging**: SLF4J + Logback

## 📋 Prerequisites

- **Java 17 or higher**
- **Node.js 18 or higher**
- **Docker & Docker Compose**
- **Maven 3.8+**
- **Git**

### Required API Keys

1. **Anthropic Claude API** - Get from [anthropic.com](https://www.anthropic.com)
2. **Cloudinary Account** - Get from [cloudinary.com](https://cloudinary.com)
3. **Gmail App Password** - For email notifications (or other SMTP provider)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/career-boost-ai.git
cd career-boost-ai
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
# Edit .env with your actual API keys and configuration
```

### 3. Start with Docker Compose (Recommended)

```bash
# Start PostgreSQL and Redis
docker-compose up -d postgres redis

# Wait for services to be healthy (about 10 seconds)
docker-compose ps

# Build and start backend
cd backend
./mvnw clean install
./mvnw spring-boot:run

# In a new terminal, start frontend
cd frontend
npm install
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **API Documentation**: http://localhost:8080/swagger-ui.html
- **Health Check**: http://localhost:8080/actuator/health

## 🔧 Development Setup

### Backend Setup

```bash
cd backend

# Install dependencies and build
./mvnw clean install

# Run tests
./mvnw test

# Run application in dev mode
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev

# Package for production
./mvnw clean package -DskipTests
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Type check
npm run type-check
```

## 📚 API Documentation

Complete API documentation is available in [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

Quick links:

- Authentication: `/api/v1/auth/*`
- Resumes: `/api/v1/resumes/*`
- Cover Letters: `/api/v1/cover-letters/*`
- Jobs: `/api/v1/jobs/*`
- Dashboard: `/api/v1/dashboard/*`
- Settings: `/api/v1/settings/*`
- Admin: `/api/v1/admin/*` (Admin role required)

### Example API Calls

#### Register a new user

```bash
curl -X POST http://localhost:8080/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePassword123!",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

#### Analyze Resume with AI

```bash
curl -X POST http://localhost:8080/api/v1/resumes/1/analyze \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "jobDescription": "We are seeking a Senior Java Developer..."
  }'
```

#### Get Admin Analytics (Admin only)

```bash
curl -X GET http://localhost:8080/api/v1/admin/analytics \
  -H "Authorization: Bearer YOUR_ADMIN_JWT_TOKEN"
```

## 🗄 Database Schema

### Core Tables

- **users** - User accounts and authentication
- **resumes** - Resume documents and metadata
- **cover_letters** - Generated cover letters
- **jobs** - Job application tracking
- **subscriptions** - User subscription plans
- **sessions** - Active user sessions
- **ai_usage_logs** - AI API usage tracking

### Relationships

- User → Resumes (One-to-Many)
- User → CoverLetters (One-to-Many)
- User → Jobs (One-to-Many)
- User → Subscription (One-to-One)

## 🔐 Security

- **Password Hashing**: BCrypt with cost factor 12
- **JWT Tokens**: 24-hour access tokens, 30-day refresh tokens
- **Session Management**: Redis-based session tracking
- **CORS**: Configurable allowed origins
- **Rate Limiting**: Per-user and per-endpoint limits
- **Input Validation**: Bean Validation + custom validators
- **SQL Injection Protection**: JPA parameterized queries
- **XSS Protection**: Content Security Policy headers
- **HTTPS Only**: Forced SSL in production

## 📊 Performance Optimizations

### Caching Strategy

- **User data**: 5-minute TTL
- **Resume list**: 2-minute TTL
- **Dashboard data**: 5-minute TTL
- **Job list**: 1-minute TTL

### Database

- Proper indexing on frequently queried fields
- Connection pooling (HikariCP)
- Query optimization with projections
- Lazy loading for large content fields

### Async Processing

- Email sending (Spring @Async)
- File uploads to Cloudinary
- Analytics tracking

## 📈 Monitoring & Observability

### Health Checks

```bash
# Application health
curl http://localhost:8080/actuator/health

# Detailed health with components
curl http://localhost:8080/actuator/health/details
```

### Metrics

```bash
# Prometheus metrics
curl http://localhost:8080/actuator/prometheus

# Application metrics
curl http://localhost:8080/actuator/metrics
```

### Logs

```bash
# View backend logs
tail -f backend/logs/career-boost.log

# View Docker logs
docker-compose logs -f backend
```

## 🚢 Deployment

### Production Checklist

- [ ] Update `.env` with production values
- [ ] Set strong `JWT_SECRET` (min 256 bits)
- [ ] Configure production database
- [ ] Set up Redis with authentication
- [ ] Configure HTTPS/SSL
- [ ] Set up CDN for static assets
- [ ] Configure backup strategy
- [ ] Set up monitoring (Sentry, Datadog, etc.)
- [ ] Enable rate limiting
- [ ] Configure CORS properly
- [ ] Review security headers
- [ ] Set up CI/CD pipeline

### Docker Production Deployment

```bash
# Build images
docker-compose build

# Start in production mode
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Manual Deployment

```bash
# Backend
cd backend
./mvnw clean package -DskipTests
java -jar target/career-boost-backend-1.0.0.jar --spring.profiles.active=prod

# Frontend
cd frontend
npm run build
# Deploy dist/ folder to CDN or static hosting
```

## 🐛 Troubleshooting

### Backend Won't Start

1. Check if PostgreSQL is running:

   ```bash
   docker-compose ps postgres
   ```

2. Check database connection:

   ```bash
   psql -h localhost -U postgres -d careerboost
   ```

3. View backend logs:
   ```bash
   tail -f backend/logs/career-boost.log
   ```

### Frontend Build Fails

1. Clear node_modules and reinstall:

   ```bash
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Check Node.js version:
   ```bash
   node --version  # Should be 18+
   ```

### Redis Connection Issues

```bash
# Check Redis is running
docker-compose ps redis

# Test Redis connection
redis-cli -h localhost -p 6379 -a redis_password ping
```

### AI API Errors

1. Verify Anthropic API key is set:

   ```bash
   echo $ANTHROPIC_API_KEY
   ```

2. Check API quota and limits
3. Review backend logs for detailed error messages

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- **Backend**: Follow Google Java Style Guide
- **Frontend**: ESLint + Prettier configuration
- **Commits**: Conventional Commits specification

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

- **Documentation**: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Issues**: [GitHub Issues](https://github.com/your-username/career-boost-ai/issues)
- **Email**: support@careerboost.ai

## 🎯 Roadmap

### Version 1.0 (Current)

- [x] AI-powered resume optimization
- [x] Cover letter generation
- [x] Job application tracker
- [x] User dashboard with analytics
- [x] Admin panel with user management
- [x] Feature flags system
- [x] Skeleton loading states
- [ ] Subscription & billing system (planned)

## 💡 Architecture Highlights

### Backend Design Patterns

- **Layered Architecture**: Controller → Service → Repository
- **DTO Pattern**: Separate DTOs from entities
- **Repository Pattern**: Spring Data JPA repositories
- **Service Layer**: Business logic encapsulation
- **Exception Handling**: Global exception handler
- **Dependency Injection**: Constructor-based DI
- **SOLID Principles**: Throughout the codebase

### Frontend Architecture

- **Feature-Based**: Organized by domain features
- **Custom Hooks**: Reusable React hooks
- **React Query**: Server state management
- **Component Composition**: Atomic design principles
- **Type Safety**: Full TypeScript coverage

## 🔥 Key Differentiators for Recruiters

1. **Production-Ready**: Complete authentication, authorization, and security
2. **AI Integration**: Real Claude API integration, not mocked
3. **Admin Panel**: Full-featured admin dashboard with analytics and user management
4. **Feature Flags**: Centralized feature toggle system across frontend and backend
5. **Professional UX**: Skeleton loading states and responsive design
6. **Cloud Services**: Cloudinary for file storage, not local filesystem
7. **Caching Strategy**: Redis for performance optimization
8. **Email Notifications**: Real SMTP integration
9. **Docker Support**: One-command deployment
10. **Comprehensive Testing**: Unit and integration tests
11. **API Documentation**: OpenAPI/Swagger with examples
12. **Error Handling**: Graceful degradation and user-friendly errors
13. **Performance**: Optimized queries, caching, and async processing
14. **Security**: JWT, BCrypt, rate limiting, input validation
15. **Code Quality**: SOLID principles, DRY code, clean architecture

## 👨‍💻 Author

Built with ❤️ by Ferguson Iyara

---

**⭐ If you found this project impressive, please star it on GitHub!**
