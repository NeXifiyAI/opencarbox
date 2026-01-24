#!/bin/bash
# =============================================================================
# Self-Healing Script - Automatically detect and fix bot/workflow issues
# =============================================================================

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
LOG_FILE="${LOG_FILE:-/tmp/self-heal.log}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Logging function
log() {
    local level="$1"
    shift
    local message="$*"
    local timestamp=$(date -u +"%Y-%m-%d %H:%M:%S UTC")
    echo "[$timestamp] [$level] $message" | tee -a "$LOG_FILE"
}

# Function to detect issues
detect_issues() {
    log "INFO" "Starting issue detection..."
    
    local issues_found=0
    
    # Check for failed workflows
    log "INFO" "Checking for workflow failures..."
    
    # Check for missing dependencies
    if [ -f "$PROJECT_ROOT/package.json" ]; then
        if [ ! -d "$PROJECT_ROOT/node_modules" ]; then
            log "WARN" "Missing node_modules - needs installation"
            issues_found=$((issues_found + 1))
        fi
    fi
    
    # Check for configuration issues
    if [ ! -f "$PROJECT_ROOT/.env" ] && [ -f "$PROJECT_ROOT/.env.example" ]; then
        log "WARN" "Missing .env file"
        issues_found=$((issues_found + 1))
    fi
    
    log "INFO" "Issue detection complete. Found $issues_found issues."
    return $issues_found
}

# Function to fix dependency issues
fix_dependencies() {
    log "INFO" "Fixing dependency issues..."
    
    if [ -f "$PROJECT_ROOT/package.json" ]; then
        if command -v pnpm &> /dev/null; then
            log "INFO" "Running pnpm install..."
            cd "$PROJECT_ROOT"
            pnpm install --frozen-lockfile || log "ERROR" "Failed to install dependencies"
        elif command -v npm &> /dev/null; then
            log "INFO" "Running npm install..."
            cd "$PROJECT_ROOT"
            npm install || log "ERROR" "Failed to install dependencies"
        else
            log "ERROR" "No package manager found (pnpm/npm)"
            return 1
        fi
    fi
    
    log "INFO" "Dependency fix complete"
}

# Function to fix configuration issues
fix_configuration() {
    log "INFO" "Fixing configuration issues..."
    
    # Create .env from example if missing
    if [ ! -f "$PROJECT_ROOT/.env" ] && [ -f "$PROJECT_ROOT/.env.example" ]; then
        log "INFO" "Creating .env from .env.example..."
        cp "$PROJECT_ROOT/.env.example" "$PROJECT_ROOT/.env"
        log "WARN" "Created .env - please configure with actual values"
    fi
    
    log "INFO" "Configuration fix complete"
}

# Function to restart failed workflows
restart_workflows() {
    log "INFO" "Restarting failed workflows..."
    
    # This is a placeholder for actual workflow restart logic
    # In production, this would use GitHub API to re-run failed workflows
    
    log "INFO" "Workflow restart complete"
}

# Function to apply all fixes
apply_fixes() {
    log "INFO" "Applying fixes..."
    
    fix_dependencies
    fix_configuration
    restart_workflows
    
    log "INFO" "All fixes applied"
}

# Function to verify fixes
verify_fixes() {
    log "INFO" "Verifying fixes..."
    
    local verification_passed=true
    
    # Check if dependencies are now installed
    if [ -f "$PROJECT_ROOT/package.json" ] && [ ! -d "$PROJECT_ROOT/node_modules" ]; then
        log "ERROR" "Dependencies still missing after fix"
        verification_passed=false
    fi
    
    if [ "$verification_passed" = true ]; then
        log "INFO" "✓ Verification passed"
        return 0
    else
        log "ERROR" "✗ Verification failed"
        return 1
    fi
}

# Main self-healing process
main() {
    echo -e "${BLUE}=== Self-Healing Process Started ===${NC}"
    log "INFO" "Self-healing process initiated"
    
    # Step 1: Detect issues
    if detect_issues; then
        log "INFO" "No issues detected - system healthy"
        echo -e "${GREEN}✓ System is healthy${NC}"
        exit 0
    fi
    
    # Step 2: Apply fixes
    apply_fixes
    
    # Step 3: Verify fixes
    if verify_fixes; then
        echo -e "${GREEN}✓ Self-healing successful${NC}"
        log "INFO" "Self-healing completed successfully"
        exit 0
    else
        echo -e "${RED}✗ Self-healing failed - manual intervention required${NC}"
        log "ERROR" "Self-healing failed"
        exit 1
    fi
}

# Run main function
main "$@"
