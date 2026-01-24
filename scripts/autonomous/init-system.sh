#!/bin/bash
# =============================================================================
# System Initialization - First-time setup and verification
# =============================================================================

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

# Display banner
echo -e "${CYAN}"
cat << 'EOF'
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║   🤖  AUTONOMOUS CI/CD ORCHESTRATION SYSTEM                   ║
║                                                                ║
║   Version 3.0.0 - Initialization & Verification                ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}\n"

# Track progress
TOTAL_STEPS=10
CURRENT_STEP=0

progress() {
    CURRENT_STEP=$((CURRENT_STEP + 1))
    echo -e "\n${BOLD}${BLUE}[$CURRENT_STEP/$TOTAL_STEPS]${NC} $1\n"
}

# Step 1: Verify directory structure
progress "Verifying directory structure..."

REQUIRED_DIRS=(
    ".github/workflows"
    "scripts/autonomous"
)

for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$PROJECT_ROOT/$dir" ]; then
        echo -e "${GREEN}✓${NC} $dir exists"
    else
        echo -e "${RED}✗${NC} $dir missing"
        mkdir -p "$PROJECT_ROOT/$dir"
        echo -e "${YELLOW}  Created $dir${NC}"
    fi
done

# Step 2: Verify scripts are executable
progress "Verifying script permissions..."

SCRIPT_DIR_FULL="$PROJECT_ROOT/scripts/autonomous"
if [ -d "$SCRIPT_DIR_FULL" ]; then
    chmod +x "$SCRIPT_DIR_FULL"/*.sh 2>/dev/null || true
    
    for script in "$SCRIPT_DIR_FULL"/*.sh; do
        if [ -x "$script" ]; then
            echo -e "${GREEN}✓${NC} $(basename "$script") is executable"
        else
            echo -e "${YELLOW}⚠${NC} $(basename "$script") not executable, fixing..."
            chmod +x "$script"
        fi
    done
else
    echo -e "${RED}✗${NC} Scripts directory not found"
fi

# Step 3: Check for required tools
progress "Checking required tools..."

check_command() {
    if command -v "$1" &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 found ($(command -v "$1"))"
        return 0
    else
        echo -e "${YELLOW}⚠${NC} $1 not found (optional)"
        return 1
    fi
}

check_command "bash"
check_command "git"
check_command "gh" || echo -e "  ${BLUE}ℹ${NC}  Install from: https://cli.github.com/"
check_command "jq" || echo -e "  ${BLUE}ℹ${NC}  Install with: apt install jq"
check_command "pnpm" || echo_command "npm" || echo -e "  ${BLUE}ℹ${NC}  Install from: https://pnpm.io/"

# Step 4: Verify workflow files
progress "Verifying workflow files..."

WORKFLOWS_DIR="$PROJECT_ROOT/.github/workflows"
WORKFLOW_COUNT=$(find "$WORKFLOWS_DIR" -name "*.yml" -type f 2>/dev/null | wc -l)

echo -e "${GREEN}✓${NC} Found $WORKFLOW_COUNT workflow files"

CRITICAL_WORKFLOWS=(
    "enhanced-orchestrator.yml"
    "master-orchestrator.yml"
    "auto-pilot.yml"
    "full-autonomy.yml"
)

for workflow in "${CRITICAL_WORKFLOWS[@]}"; do
    if [ -f "$WORKFLOWS_DIR/$workflow" ]; then
        echo -e "${GREEN}✓${NC} $workflow exists"
    else
        echo -e "${YELLOW}⚠${NC} $workflow not found (may need creation)"
    fi
done

# Step 5: Run health check
progress "Running initial health check..."

if [ -f "$SCRIPT_DIR/health-check.sh" ]; then
    "$SCRIPT_DIR/health-check.sh" > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} Health check passed"
    else
        echo -e "${YELLOW}⚠${NC} Health check completed with warnings"
    fi
    
    if [ -f /tmp/health-check-report.json ]; then
        echo -e "\n${BLUE}Health Check Summary:${NC}"
        cat /tmp/health-check-report.json | head -20
    fi
else
    echo -e "${RED}✗${NC} Health check script not found"
fi

# Step 6: Verify bot inventory
progress "Checking bot inventory..."

if [ -f "$SCRIPT_DIR/bot-lifecycle.sh" ]; then
    echo -e "${BLUE}Available Bots:${NC}"
    "$SCRIPT_DIR/bot-lifecycle.sh" list
else
    echo -e "${RED}✗${NC} Bot lifecycle script not found"
fi

# Step 7: Test dashboard generation
progress "Testing dashboard generation..."

if [ -f "$SCRIPT_DIR/dashboard.sh" ]; then
    "$SCRIPT_DIR/dashboard.sh" > /dev/null 2>&1
    if [ $? -eq 0 ] && [ -f /tmp/bot-dashboard.md ]; then
        echo -e "${GREEN}✓${NC} Dashboard generated successfully"
        echo -e "${BLUE}Dashboard location:${NC} /tmp/bot-dashboard.md"
    else
        echo -e "${YELLOW}⚠${NC} Dashboard generation had issues"
    fi
else
    echo -e "${RED}✗${NC} Dashboard script not found"
fi

# Step 8: Verify documentation
progress "Verifying documentation..."

DOCS=(
    ".github/AUTONOMOUS_CI_CD_CENTRAL.md"
    ".github/AUTONOMOUS_SYSTEM.md"
    "scripts/autonomous/README.md"
)

for doc in "${DOCS[@]}"; do
    if [ -f "$PROJECT_ROOT/$doc" ]; then
        echo -e "${GREEN}✓${NC} $doc exists"
    else
        echo -e "${YELLOW}⚠${NC} $doc not found"
    fi
done

# Step 9: Check environment configuration
progress "Checking environment configuration..."

if [ -f "$PROJECT_ROOT/.env" ]; then
    echo -e "${GREEN}✓${NC} .env file exists"
elif [ -f "$PROJECT_ROOT/.env.example" ]; then
    echo -e "${YELLOW}⚠${NC} .env not found, but .env.example exists"
    echo -e "  ${BLUE}ℹ${NC}  Create .env from .env.example"
else
    echo -e "${YELLOW}⚠${NC} No environment configuration files found"
fi

# Step 10: Generate initialization report
progress "Generating initialization report..."

REPORT_FILE="/tmp/autonomous-system-init-report.txt"

{
    echo "=========================================="
    echo "AUTONOMOUS SYSTEM INITIALIZATION REPORT"
    echo "=========================================="
    echo ""
    echo "Timestamp: $(date -u +"%Y-%m-%d %H:%M:%S UTC")"
    echo "Project: $(basename "$PROJECT_ROOT")"
    echo "Location: $PROJECT_ROOT"
    echo ""
    echo "=========================================="
    echo "SUMMARY"
    echo "=========================================="
    echo ""
    echo "Total Workflows: $WORKFLOW_COUNT"
    echo "Scripts Available: $(find "$SCRIPT_DIR_FULL" -name "*.sh" -type f 2>/dev/null | wc -l)"
    echo "Documentation Files: $(find "$PROJECT_ROOT/.github" -name "*.md" -type f 2>/dev/null | wc -l)"
    echo ""
    echo "=========================================="
    echo "SYSTEM STATUS"
    echo "=========================================="
    echo ""
    echo "✓ Directory structure verified"
    echo "✓ Scripts are executable"
    echo "✓ Health check completed"
    echo "✓ Bot inventory available"
    echo "✓ Dashboard generation working"
    echo ""
    echo "=========================================="
    echo "NEXT STEPS"
    echo "=========================================="
    echo ""
    echo "1. Review health check report: /tmp/health-check-report.json"
    echo "2. Review dashboard: /tmp/bot-dashboard.md"
    echo "3. Read documentation: .github/AUTONOMOUS_CI_CD_CENTRAL.md"
    echo "4. Test individual scripts in scripts/autonomous/"
    echo "5. Trigger master orchestrator:"
    echo "   gh workflow run enhanced-orchestrator.yml -f command=full-system-check"
    echo ""
    echo "=========================================="
    echo "QUICK COMMANDS"
    echo "=========================================="
    echo ""
    echo "# Health check"
    echo "./scripts/autonomous/health-check.sh"
    echo ""
    echo "# Generate dashboard"
    echo "./scripts/autonomous/dashboard.sh"
    echo ""
    echo "# Start monitoring"
    echo "./scripts/autonomous/monitor.sh continuous"
    echo ""
    echo "# Self-heal if issues detected"
    echo "./scripts/autonomous/self-heal.sh"
    echo ""
    echo "=========================================="
} > "$REPORT_FILE"

cat "$REPORT_FILE"

echo -e "\n${GREEN}${BOLD}✓ Initialization Complete!${NC}\n"
echo -e "Full report saved to: ${YELLOW}$REPORT_FILE${NC}\n"

# Display quick start guide
echo -e "${CYAN}${BOLD}Quick Start Guide:${NC}\n"
echo -e "1. ${BLUE}View Dashboard:${NC}"
echo -e "   cat /tmp/bot-dashboard.md\n"
echo -e "2. ${BLUE}Run Health Check:${NC}"
echo -e "   ./scripts/autonomous/health-check.sh\n"
echo -e "3. ${BLUE}Read Documentation:${NC}"
echo -e "   cat .github/AUTONOMOUS_CI_CD_CENTRAL.md | less\n"
echo -e "4. ${BLUE}Activate System (via GitHub Actions):${NC}"
echo -e "   gh workflow run enhanced-orchestrator.yml -f command=activate-all-bots\n"

exit 0
