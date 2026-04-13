#!/bin/bash

###############################################################################
# Backend Deployment Script
# This script deploys the Spring Boot backend on the VPS server
###############################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_DIR="/var/www/apply-smart-ai"
APP_NAME="apply-smart-backend"
JAR_NAME="app.jar"
LOG_DIR="$APP_DIR/logs"
BACKUP_DIR="$APP_DIR/backups"
MAX_BACKUPS=5

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Ensure running as correct user
if [ "$EUID" -eq 0 ]; then
    log_error "Please do not run as root. Use the deploy user."
    exit 1
fi

# Change to app directory
cd "$APP_DIR" || exit 1

log_info "Starting deployment process..."

# Create necessary directories
mkdir -p "$LOG_DIR"
mkdir -p "$BACKUP_DIR"

# Stop the current service
log_info "Stopping $APP_NAME service..."
sudo systemctl stop $APP_NAME || log_warn "Service was not running"

# Backup current JAR
if [ -f "$JAR_NAME" ]; then
    log_info "Backing up current JAR..."
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    cp "$JAR_NAME" "$BACKUP_DIR/${JAR_NAME}.backup.$TIMESTAMP"

    # Keep only the last N backups
    log_info "Cleaning old backups (keeping last $MAX_BACKUPS)..."
    ls -t "$BACKUP_DIR"/*.backup.* 2>/dev/null | tail -n +$((MAX_BACKUPS + 1)) | xargs rm -f || true
fi

# The new JAR should already be in place from GitHub Actions
# Verify it exists
if [ ! -f "$JAR_NAME" ]; then
    log_error "New JAR file not found: $JAR_NAME"

    # Attempt rollback
    LATEST_BACKUP=$(ls -t "$BACKUP_DIR"/*.backup.* 2>/dev/null | head -n 1)
    if [ -n "$LATEST_BACKUP" ]; then
        log_warn "Restoring from latest backup: $LATEST_BACKUP"
        cp "$LATEST_BACKUP" "$JAR_NAME"
    else
        log_error "No backup found. Cannot recover."
        exit 1
    fi
fi

# Set correct permissions
log_info "Setting file permissions..."
chmod 644 "$JAR_NAME"
chmod 755 "$LOG_DIR"

# Start the service
log_info "Starting $APP_NAME service..."
sudo systemctl start $APP_NAME

# Wait for service to start
log_info "Waiting for service to start..."
sleep 5

# Check service status
if sudo systemctl is-active --quiet $APP_NAME; then
    log_info "✅ Service started successfully"
else
    log_error "❌ Service failed to start"

    log_info "Last 50 lines of logs:"
    sudo journalctl -u $APP_NAME -n 50 --no-pager

    exit 1
fi

# Verify health endpoint
log_info "Checking application health..."
MAX_RETRIES=30
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/actuator/health || echo "000")

    if [ "$HTTP_CODE" = "200" ]; then
        log_info "✅ Application health check passed"
        break
    fi

    RETRY_COUNT=$((RETRY_COUNT + 1))
    if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
        log_error "❌ Health check failed after $MAX_RETRIES attempts"
        log_info "Showing recent logs:"
        sudo journalctl -u $APP_NAME -n 50 --no-pager
        exit 1
    fi

    log_info "Health check attempt $RETRY_COUNT/$MAX_RETRIES (HTTP $HTTP_CODE)..."
    sleep 5
done

# Display service status
log_info "Service status:"
sudo systemctl status $APP_NAME --no-pager | head -n 10

# Display application info
log_info "Application details:"
echo "  - Location: $APP_DIR/$JAR_NAME"
echo "  - Logs: $LOG_DIR"
echo "  - Backups: $BACKUP_DIR"
echo "  - Service: $APP_NAME"

log_info "🎉 Deployment completed successfully!"
log_info "View logs: sudo journalctl -u $APP_NAME -f"

exit 0
