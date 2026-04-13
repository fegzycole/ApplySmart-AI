# Deployment Checklist

Quick reference checklist for deploying Apply Smart AI to production.

## Pre-Deployment

### 1. Accounts & Services

- [ ] VPS server provisioned (Ubuntu 20.04+, 2GB+ RAM)
- [ ] Domain name registered
- [ ] DNS A record: `api.yourdomain.com` → VPS IP
- [ ] GitHub repository access
- [ ] Vercel account created
- [ ] Anthropic API key obtained
- [ ] Cloudinary account created
- [ ] Email SMTP credentials (Gmail app password)
- [ ] (Optional) Google OAuth credentials
- [ ] (Optional) GitHub OAuth credentials

### 2. Local Preparation

- [ ] All code committed and pushed to `main` branch
- [ ] `.env.example` file up to date
- [ ] Database migrations tested
- [ ] Frontend builds successfully (`npm run build`)
- [ ] Backend builds successfully (`./mvnw clean package`)

## VPS Setup

### 1. Initial Server Configuration

```bash
# Run setup script
sudo bash scripts/setup-vps.sh
```

**Manual steps if not using script:**

- [ ] Update system: `sudo apt update && sudo apt upgrade -y`
- [ ] Install Docker and Docker Compose
- [ ] Install Java 17
- [ ] Install Nginx
- [ ] Install Certbot
- [ ] Create `deploy` user
- [ ] Configure UFW firewall (ports 22, 80, 443)
- [ ] Setup fail2ban
- [ ] Generate SSH key for GitHub

### 2. Application Directory

- [ ] Create `/var/www/apply-smart-ai`
- [ ] Set ownership: `chown -R deploy:deploy /var/www/apply-smart-ai`
- [ ] Create `.env` file with production values
- [ ] Copy `docker-compose.infra.yml` to server
- [ ] Create logs directory

### 3. Database & Cache

- [ ] Start PostgreSQL: `docker compose -f docker-compose.infra.yml up -d postgres`
- [ ] Start Redis: `docker compose -f docker-compose.infra.yml up -d redis`
- [ ] Verify containers running: `docker ps`
- [ ] Test PostgreSQL connection
- [ ] Test Redis connection

### 4. Systemd Service

- [ ] Copy service file: `sudo cp scripts/apply-smart-backend.service /etc/systemd/system/`
- [ ] Reload systemd: `sudo systemctl daemon-reload`
- [ ] Enable service: `sudo systemctl enable apply-smart-backend`
- [ ] (Don't start yet - will be started by GitHub Actions)

### 5. Nginx Configuration

- [ ] Copy nginx config: `sudo cp scripts/nginx-backend.conf /etc/nginx/sites-available/apply-smart-backend`
- [ ] Update domain name in config file
- [ ] Create symlink: `sudo ln -s /etc/nginx/sites-available/apply-smart-backend /etc/nginx/sites-enabled/`
- [ ] Test config: `sudo nginx -t`
- [ ] Reload nginx: `sudo systemctl reload nginx`

### 6. SSL Certificate

- [ ] Get certificate: `sudo certbot --nginx -d api.yourdomain.com`
- [ ] Test auto-renewal: `sudo certbot renew --dry-run`
- [ ] Verify HTTPS works

## GitHub Configuration

### 1. Repository Secrets

Add all secrets in GitHub Settings → Secrets and variables → Actions:

**Server Access:**
- [ ] `VPS_HOST` - VPS IP address
- [ ] `VPS_USERNAME` - `deploy`
- [ ] `VPS_SSH_PRIVATE_KEY` - Contents of `/home/deploy/.ssh/id_ed25519`
- [ ] `BACKEND_URL` (optional) - `https://api.yourdomain.com`

**Database:**
- [ ] `DB_HOST` - `localhost`
- [ ] `DB_PORT` - `5432`
- [ ] `DB_NAME` - `applysmart`
- [ ] `DB_USER` - `postgres`
- [ ] `DB_PASSWORD`

**Redis:**
- [ ] `REDIS_HOST` - `localhost`
- [ ] `REDIS_PORT` - `6379`
- [ ] `REDIS_PASSWORD`

**JWT:**
- [ ] `JWT_SECRET` - 256+ bit secret
- [ ] `JWT_EXPIRATION` - `86400000`

**OAuth (if using):**
- [ ] `OAUTH2_REDIRECT_URI`
- [ ] `GOOGLE_CLIENT_ID`
- [ ] `GOOGLE_CLIENT_SECRET`
- [ ] `GITHUB_CLIENT_ID`
- [ ] `GITHUB_CLIENT_SECRET`

**Email:**
- [ ] `MAIL_HOST` - `smtp.gmail.com`
- [ ] `MAIL_PORT` - `465`
- [ ] `MAIL_USERNAME`
- [ ] `MAIL_PASSWORD`
- [ ] `MAIL_FROM`

**AI & Storage:**
- [ ] `ANTHROPIC_API_KEY`
- [ ] `CLOUDINARY_CLOUD_NAME`
- [ ] `CLOUDINARY_API_KEY`
- [ ] `CLOUDINARY_API_SECRET`

**CORS:**
- [ ] `CORS_ALLOWED_ORIGINS` - Frontend URLs

### 2. Deploy Key

- [ ] Add VPS public key (`/home/deploy/.ssh/id_ed25519.pub`) as GitHub deploy key
- [ ] Grant write access (optional, for auto-commits)

## Vercel Configuration

### 1. Project Setup

- [ ] Import GitHub repository on Vercel
- [ ] Set root directory to `frontend`
- [ ] Framework auto-detected as Vite
- [ ] Get Vercel token from account settings

### 2. Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables:

- [ ] `VITE_API_URL` - `https://api.yourdomain.com`
- [ ] `VITE_APP_URL` - Vercel domain or custom domain

### 3. GitHub Secrets for Vercel

- [ ] `VERCEL_TOKEN`
- [ ] `VERCEL_ORG_ID`
- [ ] `VERCEL_PROJECT_ID`

Get ORG_ID and PROJECT_ID:
```bash
cd frontend
npm i -g vercel
vercel link
cat .vercel/project.json
```

### 4. Custom Domain (Optional)

- [ ] Add custom domain in Vercel dashboard
- [ ] Configure DNS records
- [ ] Verify SSL certificate

## Initial Deployment

### 1. Backend

- [ ] Push to `main` branch
- [ ] Watch GitHub Actions workflow
- [ ] Verify deployment completes
- [ ] Check health: `curl https://api.yourdomain.com/actuator/health`
- [ ] Check logs: `ssh deploy@vps "sudo journalctl -u apply-smart-backend -f"`

### 2. Frontend

- [ ] Push to `main` branch
- [ ] Watch GitHub Actions workflow
- [ ] Verify Vercel deployment
- [ ] Visit frontend URL
- [ ] Test login/signup
- [ ] Test API connectivity

## Post-Deployment

### 1. Verification

- [ ] Health endpoint: `https://api.yourdomain.com/actuator/health`
- [ ] Frontend loads correctly
- [ ] User registration works
- [ ] Email verification sends
- [ ] Login works
- [ ] Resume upload works
- [ ] AI features work (Claude API)
- [ ] Job tracker works
- [ ] Admin panel works (admin user)

### 2. Monitoring Setup

- [ ] Setup uptime monitoring (UptimeRobot, Pingdom)
- [ ] Configure log aggregation (Papertrail, Logtail)
- [ ] Setup error tracking (Sentry)
- [ ] Enable Vercel Analytics
- [ ] Configure database backups
- [ ] Setup backup cron job

### 3. Security

- [ ] HTTPS enabled and working
- [ ] Security headers configured
- [ ] Firewall rules active
- [ ] fail2ban configured
- [ ] Regular security updates scheduled
- [ ] Database passwords strong
- [ ] JWT secret is secure (256+ bits)
- [ ] API rate limiting active
- [ ] CORS configured correctly

### 4. Performance

- [ ] Redis caching working
- [ ] Gzip compression enabled
- [ ] Static assets cached
- [ ] Database queries optimized
- [ ] Connection pooling configured

## Ongoing Maintenance

### Daily
- [ ] Monitor uptime alerts
- [ ] Check error logs if issues reported

### Weekly
- [ ] Review application logs
- [ ] Check disk space
- [ ] Monitor database size
- [ ] Review API usage/costs

### Monthly
- [ ] Security updates: `sudo apt update && sudo apt upgrade`
- [ ] Review and rotate logs
- [ ] Check SSL certificate expiry
- [ ] Backup database
- [ ] Review monitoring metrics
- [ ] Check API costs (Anthropic, Cloudinary)

### Quarterly
- [ ] Review and update dependencies
- [ ] Security audit
- [ ] Performance review
- [ ] Cost optimization review

## Rollback Procedure

If deployment fails:

1. **Backend**:
   - Auto-rollback in GitHub Actions
   - Manual: `ssh deploy@vps && cd /var/www/apply-smart-ai && sudo systemctl stop apply-smart-backend && cp app.jar.backup.* app.jar && sudo systemctl start apply-smart-backend`

2. **Frontend**:
   - Revert to previous deployment in Vercel dashboard
   - Or: `vercel rollback` with Vercel CLI

## Common Issues

### Backend won't start
```bash
sudo systemctl status apply-smart-backend
sudo journalctl -u apply-smart-backend -n 100
```

### Database connection failed
```bash
docker ps | grep postgres
docker exec -it applysmart-postgres psql -U postgres -d applysmart
```

### Redis connection failed
```bash
docker ps | grep redis
docker exec -it applysmart-redis redis-cli -a YOUR_PASSWORD ping
```

### SSL certificate issues
```bash
sudo certbot renew
sudo systemctl reload nginx
```

### Frontend API errors
- Check CORS settings in backend .env
- Verify `CORS_ALLOWED_ORIGINS` includes frontend URL
- Check network tab in browser dev tools

## Resources

- Full guide: [DEPLOYMENT.md](./DEPLOYMENT.md)
- Architecture: [README.md](./README.md)
- API docs: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- GitHub Actions: [.github/workflows/](./.github/workflows/)

## Support

If you encounter issues:
1. Check logs (backend and nginx)
2. Verify all environment variables
3. Review GitHub Actions workflow runs
4. Check application health endpoints
5. Review this checklist again
