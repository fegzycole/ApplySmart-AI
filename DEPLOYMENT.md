# Deployment Guide

Complete guide for deploying the Apply Smart AI application with backend on VPS and frontend on Vercel.

## Overview

- **Backend**: Spring Boot application deployed to VPS via GitHub Actions
- **Frontend**: React/Vite application deployed to Vercel via GitHub Actions
- **Database**: PostgreSQL on VPS (Docker)
- **Cache**: Redis on VPS (Docker)

## Prerequisites

### 1. VPS Server Requirements

Your VPS server needs:

- **OS**: Ubuntu 20.04 LTS or higher (recommended)
- **RAM**: Minimum 2GB (4GB recommended for production)
- **CPU**: 2 cores minimum
- **Storage**: 20GB minimum
- **Root/sudo access**: Yes

### 2. Software on VPS

Install the following on your VPS:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo apt install docker-compose-plugin -y

# Install Nginx (reverse proxy)
sudo apt install nginx -y

# Install certbot (SSL certificates)
sudo apt install certbot python3-certbot-nginx -y

# Install Git
sudo apt install git -y
```

### 3. Domain Names

- **Backend**: `api.yourdomain.com` (or subdomain of your choice)
- **Frontend**: Will be provided by Vercel (e.g., `yourapp.vercel.app`) or custom domain

### 4. Accounts & API Keys

#### Required Services:

1. **GitHub Account** - For CI/CD
2. **Vercel Account** - For frontend hosting ([vercel.com](https://vercel.com))
3. **Anthropic Account** - For Claude API ([anthropic.com](https://www.anthropic.com))
4. **Cloudinary Account** - For file storage ([cloudinary.com](https://cloudinary.com))
5. **Gmail Account** - For SMTP (or other email provider)

#### Optional Services:

6. **Google OAuth** - For social login ([console.cloud.google.com](https://console.cloud.google.com))
7. **GitHub OAuth** - For social login ([github.com/settings/developers](https://github.com/settings/developers))
8. **Stripe Account** - For payments (future feature) ([stripe.com](https://stripe.com))

## Backend Deployment (VPS)

### Step 1: VPS Initial Setup

```bash
# SSH into your VPS
ssh root@your-vps-ip

# Create application directory
mkdir -p /var/www/apply-smart-ai
cd /var/www/apply-smart-ai

# Create deploy user (recommended for security)
sudo useradd -m -s /bin/bash deploy
sudo usermod -aG docker deploy
sudo chown -R deploy:deploy /var/www/apply-smart-ai

# Generate SSH key for GitHub Actions
sudo -u deploy ssh-keygen -t ed25519 -C "github-actions@yourdomain.com"
# Copy the public key and add as a deploy key to your GitHub repo
sudo cat /home/deploy/.ssh/id_ed25519.pub
```

### Step 2: Configure Environment Variables on VPS

```bash
# Create .env file
sudo -u deploy nano /var/www/apply-smart-ai/.env
```

Add the following (replace with your actual values):

```env
# Application
APP_URL=https://yourapp.vercel.app
API_URL=https://api.yourdomain.com

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=applysmart
DB_USER=postgres
DB_PASSWORD=YOUR_SECURE_DB_PASSWORD

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=YOUR_SECURE_REDIS_PASSWORD

# JWT
JWT_SECRET=YOUR_SECURE_JWT_SECRET_MIN_256_BITS
JWT_EXPIRATION=86400000

# OAuth2
OAUTH2_REDIRECT_URI=https://yourapp.vercel.app/auth/oauth2/callback
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GH_OAUTH_CLIENT_ID=your-github-client-id
GH_OAUTH_CLIENT_SECRET=your-github-client-secret

# Email
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password
MAIL_FROM=your_email@gmail.com

# AI
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here

# Storage
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Stripe (optional)
STRIPE_API_KEY=sk_live_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret

# CORS
CORS_ALLOWED_ORIGINS=https://yourapp.vercel.app,https://www.yourapp.com
```

### Step 3: Start PostgreSQL and Redis

```bash
cd /var/www/apply-smart-ai

# Create docker-compose.yml for infrastructure only
nano docker-compose.infra.yml
```

Content for `docker-compose.infra.yml`:

```yaml
services:
  postgres:
    image: postgres:15-alpine
    container_name: applysmart-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: ${DB_NAME:-applysmart}
      POSTGRES_USER: ${DB_USER:-postgres}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports:
      - "127.0.0.1:5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - applysmart-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER:-postgres}"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: applysmart-redis
    restart: unless-stopped
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}
    ports:
      - "127.0.0.1:6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - applysmart-network
    healthcheck:
      test: ["CMD", "redis-cli", "-a", "${REDIS_PASSWORD}", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
  redis_data:

networks:
  applysmart-network:
    driver: bridge
```

Start the services:

```bash
docker compose -f docker-compose.infra.yml up -d
```

### Step 4: Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add the following secrets:

#### SSH/Server Secrets:
- `VPS_HOST`: Your VPS IP address
- `VPS_USERNAME`: `deploy` (or your deploy user)
- `VPS_SSH_PRIVATE_KEY`: Private key content (from `/home/deploy/.ssh/id_ed25519`)

#### Environment Variables (all from your .env file):
- `DB_HOST`: `localhost`
- `DB_PORT`: `5432`
- `DB_NAME`: `applysmart`
- `DB_USER`: `postgres`
- `DB_PASSWORD`: Your secure password
- `REDIS_HOST`: `localhost`
- `REDIS_PORT`: `6379`
- `REDIS_PASSWORD`: Your secure password
- `JWT_SECRET`: Your secure JWT secret
- `JWT_EXPIRATION`: `86400000`
- `OAUTH2_REDIRECT_URI`: Your OAuth redirect URI
- `GOOGLE_CLIENT_ID`: Your Google client ID
- `GOOGLE_CLIENT_SECRET`: Your Google client secret
- `GH_OAUTH_CLIENT_ID`: Your GitHub client ID
- `GH_OAUTH_CLIENT_SECRET`: Your GitHub client secret
- `MAIL_HOST`: `smtp.gmail.com`
- `MAIL_PORT`: `465`
- `MAIL_USERNAME`: Your email
- `MAIL_PASSWORD`: Your email app password
- `MAIL_FROM`: Your email
- `ANTHROPIC_API_KEY`: Your Anthropic API key
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Your Cloudinary API key
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
- `CORS_ALLOWED_ORIGINS`: Your allowed origins

### Step 5: Configure Nginx Reverse Proxy

```bash
sudo nano /etc/nginx/sites-available/apply-smart-backend
```

Add the following:

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Timeouts for long-running AI requests
        proxy_connect_timeout 300s;
        proxy_send_timeout 300s;
        proxy_read_timeout 300s;
    }

    # Health check endpoint
    location /actuator/health {
        proxy_pass http://localhost:8080/actuator/health;
        access_log off;
    }
}
```

Enable the site and get SSL:

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/apply-smart-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Get SSL certificate
sudo certbot --nginx -d api.yourdomain.com
```

## Frontend Deployment (Vercel)

### Step 1: Vercel Account Setup

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Import your GitHub repository
3. Select the `frontend` directory as the root directory
4. Framework preset will auto-detect as Vite

### Step 2: Configure Vercel Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables:

Add:
- `VITE_API_URL`: `https://api.yourdomain.com`
- `VITE_APP_URL`: `https://yourapp.vercel.app` (or your custom domain)

### Step 3: Get Vercel Token for GitHub Actions

1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Create a new token
3. Copy the token

### Step 4: Configure GitHub Secrets for Vercel

Add to GitHub Secrets:
- `VERCEL_TOKEN`: Your Vercel token
- `VERCEL_ORG_ID`: Your Vercel org ID (found in project settings)
- `VERCEL_PROJECT_ID`: Your Vercel project ID (found in project settings)

To find ORG_ID and PROJECT_ID:
```bash
# Install Vercel CLI locally
npm i -g vercel

# Login and link project
cd frontend
vercel link

# IDs will be in .vercel/project.json
cat .vercel/project.json
```

## CI/CD Workflows

The GitHub Actions workflows will:

### Backend Workflow (on push to main):
1. Build the Spring Boot application with Maven
2. Create JAR file
3. SSH into VPS
4. Stop current backend service
5. Deploy new JAR
6. Restart backend service
7. Run health checks

### Frontend Workflow (on push to main):
1. Build the Vite application
2. Deploy to Vercel
3. Run Vercel's built-in health checks

## Post-Deployment

### 1. Verify Backend Deployment

```bash
# Check health
curl https://api.yourdomain.com/actuator/health

# Check backend logs
sudo journalctl -u apply-smart-backend -f
```

### 2. Verify Frontend Deployment

Visit your Vercel URL and test:
- Landing page loads
- Login/signup works
- API calls to backend work

### 3. Database Migrations

Flyway migrations run automatically on backend startup.

### 4. Monitoring

Set up monitoring:
- **Backend**: Spring Boot Actuator + Prometheus
- **Frontend**: Vercel Analytics (built-in)
- **Uptime**: UptimeRobot or similar
- **Logs**: Papertrail, Logtail, or similar

## Maintenance

### Update Backend

Simply push to main branch - GitHub Actions will auto-deploy.

Or manually:
```bash
ssh deploy@your-vps-ip
cd /var/www/apply-smart-ai
git pull
./deploy.sh
```

### Update Frontend

Push to main branch - GitHub Actions will auto-deploy to Vercel.

### Database Backup

```bash
# Backup
docker exec applysmart-postgres pg_dump -U postgres applysmart > backup_$(date +%Y%m%d).sql

# Restore
docker exec -i applysmart-postgres psql -U postgres applysmart < backup.sql
```

### View Logs

```bash
# Backend logs
sudo journalctl -u apply-smart-backend -f

# Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Docker logs
docker logs -f applysmart-postgres
docker logs -f applysmart-redis
```

## Troubleshooting

### Backend won't start

```bash
# Check service status
sudo systemctl status apply-smart-backend

# Check logs
sudo journalctl -u apply-smart-backend -n 100

# Check if port 8080 is in use
sudo lsof -i :8080

# Restart services
sudo systemctl restart apply-smart-backend
```

### Database connection issues

```bash
# Check PostgreSQL is running
docker ps | grep postgres

# Test connection
docker exec -it applysmart-postgres psql -U postgres -d applysmart
```

### Frontend deployment fails

- Check Vercel build logs in dashboard
- Verify environment variables are set
- Ensure `VITE_API_URL` points to correct backend

### CORS errors

- Add your frontend URL to `CORS_ALLOWED_ORIGINS` in backend .env
- Restart backend after changing CORS settings

## Security Checklist

- [ ] Strong passwords for DB and Redis
- [ ] JWT secret is at least 256 bits
- [ ] SSL/HTTPS enabled on both frontend and backend
- [ ] Firewall configured (only ports 80, 443, 22 open)
- [ ] SSH key authentication (disable password auth)
- [ ] Regular security updates (`sudo apt update && sudo apt upgrade`)
- [ ] Database backups automated
- [ ] Environment variables never committed to git
- [ ] Admin user created with strong password
- [ ] OAuth redirect URIs properly configured
- [ ] Rate limiting enabled in Spring Boot

## Cost Estimate

- **VPS**: $5-20/month (DigitalOcean, Hetzner, Linode)
- **Vercel**: Free tier sufficient (Pro $20/month for production)
- **Domain**: $10-15/year
- **Anthropic API**: Pay as you go (~$15-50/month depending on usage)
- **Cloudinary**: Free tier sufficient (Pro $89/month for heavy usage)

**Total**: ~$20-100/month depending on traffic

## Support

For deployment issues:
1. Check logs first
2. Verify all environment variables
3. Check GitHub Actions workflow runs
4. Review this guide again
5. Check application health endpoints

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Documentation](https://vercel.com/docs)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [Docker Documentation](https://docs.docker.com/)
