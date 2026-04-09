# .gitignore Guide

## Overview

This project uses a **three-tier .gitignore strategy**:
1. **Root `.gitignore`** - Project-wide ignores (environment, Docker, OS, IDE)
2. **Backend `.gitignore`** - Java/Spring Boot/Maven specific
3. **Frontend `.gitignore`** - Node.js/React/Vite specific

---

## 🔒 Critical Files Being Ignored

### Environment & Secrets
These files contain **sensitive API keys and credentials** and must NEVER be committed:

```
.env
.env.local
.env.production
.env.development
```

**Current sensitive data in `.env`:**
- ✅ JWT_SECRET
- ✅ GOOGLE_CLIENT_SECRET
- ✅ GITHUB_CLIENT_SECRET
- ✅ MAIL_PASSWORD
- ✅ ANTHROPIC_API_KEY (Claude AI)
- ✅ CLOUDINARY_API_SECRET
- ✅ Database passwords
- ✅ Redis password

**Safe to commit:**
- ✅ `.env.example` - Template with placeholder values

---

## 📁 What's Being Ignored

### Root Level (`/.gitignore`)

#### 1. Environment & Secrets
```
.env*
*.key
*.pem
*.crt
secrets/
credentials/
```

#### 2. Docker
```
docker-compose.override.yml
.docker/
```

#### 3. Logs
```
logs/
*.log
backend/logs/
frontend/logs/
```

#### 4. Databases
```
*.db
*.sqlite
db-data/
postgres-data/
redis-data/
```

#### 5. OS-Specific Files
```
# macOS
.DS_Store

# Windows
Thumbs.db
Desktop.ini

# Linux
*~
.Trash-*
```

#### 6. IDE & Editors
```
# IntelliJ IDEA
.idea/
*.iml

# VS Code
.vscode/

# Eclipse
.classpath
.project
.settings/
```

### Backend Level (`/backend/.gitignore`)

#### 1. Maven
```
target/
.mvn/
pom.xml.releaseBackup
dependency-reduced-pom.xml
```

#### 2. Compiled Files
```
*.class
*.jar
*.war
out/
bin/
```

#### 3. Spring Boot Logs
```
logs/
*.log
spring-shell.log
```

#### 4. Database Files
```
*.db
*.sqlite
h2/
data/
```

### Frontend Level (`/frontend/.gitignore`)

#### 1. Dependencies
```
node_modules/
bower_components/
```

#### 2. Build Output
```
dist/
dist-ssr/
build/
```

#### 3. Vite
```
.vite/
vite.config.*.timestamp-*
```

#### 4. Cache
```
.cache/
.turbo/
.vercel/
```

#### 5. Testing
```
coverage/
test-results/
playwright-report/
```

---

## ⚠️ Important Security Notes

### Never Commit These Files

1. **`.env` files** - Contains API keys and passwords
2. **`application-secrets.yml`** - Backend secrets
3. **`logs/`** - May contain sensitive data
4. **Private keys** (`.key`, `.pem`, `.p12`)
5. **Database files** (`.db`, `.sqlite`)

### Files You SHOULD Commit

1. **`.env.example`** - Template with placeholder values
2. **Configuration files** - With environment variables, not hardcoded secrets
3. **Source code** - All `.java`, `.ts`, `.tsx` files
4. **Documentation** - README, guides, API docs

---

## 🔍 Verify What's Ignored

### Check if a file is ignored:
```bash
git check-ignore -v path/to/file
```

### See all ignored files:
```bash
git status --ignored
```

### Test .gitignore without committing:
```bash
git add -n .
# -n = dry run (won't actually add files)
```

---

## 📝 Common Scenarios

### 1. "I accidentally committed .env"

**Fix immediately:**
```bash
# Remove from Git but keep local file
git rm --cached .env

# Commit the removal
git commit -m "Remove .env from tracking"

# If already pushed, rotate ALL secrets in .env
```

### 2. "I need to share configuration"

**Use .env.example:**
```bash
# Copy your .env and remove sensitive values
cp .env .env.example

# Edit .env.example - replace secrets with placeholders
# Example: ANTHROPIC_API_KEY=your-claude-api-key-here

# Commit .env.example
git add .env.example
git commit -m "Add environment template"
```

### 3. "Build artifacts keep appearing"

Make sure you're at the project root:
```bash
cd /Users/fergusoniyara/Documents/projects/career-boost-ai
git status
```

If files still appear, check:
- `.gitignore` syntax (no leading spaces)
- File was never committed before
- Git cache: `git rm -r --cached . && git add .`

---

## 🛡️ Security Checklist

Before committing, verify:

- [ ] No `.env` files in staging area
- [ ] No API keys in code
- [ ] No passwords in comments
- [ ] No database dumps
- [ ] No log files with sensitive data
- [ ] No private keys or certificates
- [ ] `.env.example` has placeholders only

**Check with:**
```bash
git diff --cached | grep -i "password\|secret\|key\|token"
```

---

## 🔄 Updating .gitignore

### For already tracked files:
```bash
# Remove from Git but keep local copy
git rm -r --cached path/to/file

# Commit the change
git commit -m "Stop tracking sensitive file"
```

### For the entire project:
```bash
# Clear Git cache and reapply .gitignore
git rm -r --cached .
git add .
git commit -m "Apply updated .gitignore"
```

---

## 📚 References

- **Root .gitignore**: Covers Docker, environment, OS, IDE
- **Backend .gitignore**: Java/Maven/Spring Boot specific
- **Frontend .gitignore**: Node/React/Vite specific

All three files work together to protect your sensitive data and keep the repository clean.

---

**Last Updated**: April 10, 2026
**Project**: ApplySmart AI (CareerBoost)
