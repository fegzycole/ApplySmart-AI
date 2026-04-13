#!/bin/bash

###############################################################################
# VPS Initial Setup Script
# Run this script on your VPS to set up the environment for deployment
# Usage: bash setup-vps.sh
###############################################################################

set -e  # Exit on error

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    log_error "Please run as root (sudo bash setup-vps.sh)"
    exit 1
fi

log_info "Starting VPS setup for Apply Smart AI..."

# Update system
log_info "Updating system packages..."
apt update && apt upgrade -y

# Install required packages
log_info "Installing required packages..."
apt install -y \
    curl \
    wget \
    git \
    vim \
    nano \
    ufw \
    fail2ban \
    ca-certificates \
    gnupg \
    lsb-release

# Install Docker
if ! command -v docker &> /dev/null; then
    log_info "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
else
    log_info "Docker already installed"
fi

# Install Docker Compose plugin
log_info "Installing Docker Compose..."
apt install -y docker-compose-plugin

# Install Java 17
if ! command -v java &> /dev/null; then
    log_info "Installing Java 17..."
    apt install -y openjdk-17-jre-headless
else
    log_info "Java already installed"
    java -version
fi

# Install Nginx
if ! command -v nginx &> /dev/null; then
    log_info "Installing Nginx..."
    apt install -y nginx
else
    log_info "Nginx already installed"
fi

# Install Certbot
if ! command -v certbot &> /dev/null; then
    log_info "Installing Certbot..."
    apt install -y certbot python3-certbot-nginx
else
    log_info "Certbot already installed"
fi

# Create deploy user
if ! id -u deploy &> /dev/null; then
    log_info "Creating deploy user..."
    useradd -m -s /bin/bash deploy
    usermod -aG docker deploy
    usermod -aG sudo deploy
    log_info "Deploy user created. Set password with: sudo passwd deploy"
else
    log_info "Deploy user already exists"
fi

# Create application directory
log_info "Creating application directory..."
mkdir -p /var/www/apply-smart-ai
chown -R deploy:deploy /var/www/apply-smart-ai

# Configure firewall
log_info "Configuring UFW firewall..."
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https
ufw --force enable

log_info "Firewall status:"
ufw status

# Configure fail2ban
log_info "Configuring fail2ban..."
systemctl enable fail2ban
systemctl start fail2ban

# Create logs directory
mkdir -p /var/www/apply-smart-ai/logs
chown -R deploy:deploy /var/www/apply-smart-ai/logs

# Generate SSH key for deploy user (for GitHub)
log_info "Generating SSH key for deploy user..."
sudo -u deploy ssh-keygen -t ed25519 -C "github-deploy@$(hostname)" -f /home/deploy/.ssh/id_ed25519 -N ""

log_info "✅ SSH public key (add this as a deploy key in GitHub):"
cat /home/deploy/.ssh/id_ed25519.pub

# Display Java version
log_info "Java version:"
java -version

# Display Docker version
log_info "Docker version:"
docker --version

# Display system info
log_info "System information:"
echo "  - OS: $(lsb_release -d | cut -f2)"
echo "  - Memory: $(free -h | awk '/^Mem:/ {print $2}')"
echo "  - CPU: $(nproc) cores"
echo "  - Disk: $(df -h / | awk 'NR==2 {print $2}')"

log_info "🎉 VPS setup completed!"
echo ""
echo "Next steps:"
echo "1. Add the SSH public key above as a deploy key in your GitHub repository"
echo "2. Create .env file in /var/www/apply-smart-ai/"
echo "3. Copy the systemd service file: sudo cp scripts/apply-smart-backend.service /etc/systemd/system/"
echo "4. Copy the nginx config: sudo cp scripts/nginx-backend.conf /etc/nginx/sites-available/apply-smart-backend"
echo "5. Enable the nginx site: sudo ln -s /etc/nginx/sites-available/apply-smart-backend /etc/nginx/sites-enabled/"
echo "6. Update domain in nginx config: sudo nano /etc/nginx/sites-available/apply-smart-backend"
echo "7. Test nginx: sudo nginx -t"
echo "8. Start docker services: cd /var/www/apply-smart-ai && docker compose -f docker-compose.infra.yml up -d"
echo "9. Get SSL cert: sudo certbot --nginx -d api.yourdomain.com"
echo "10. Enable systemd service: sudo systemctl enable apply-smart-backend"
echo ""
echo "View the full deployment guide in DEPLOYMENT.md"
