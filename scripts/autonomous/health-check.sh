#!/bin/bash
# =============================================================================
# Health Check Script - Monitors all bots and workflows
# =============================================================================

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
WORKFLOWS_DIR="$PROJECT_ROOT/.github/workflows"
REPORT_FILE="${REPORT_FILE:-/tmp/health-check-report.json}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Initialize report
echo "{" > "$REPORT_FILE"
echo '  "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",' >> "$REPORT_FILE"
echo '  "checks": {' >> "$REPORT_FILE"

# Function to check workflow file health
check_workflow_health() {
    local workflow_file="$1"
    local workflow_name=$(basename "$workflow_file" .yml)
    
    echo -e "${YELLOW}Checking workflow: $workflow_name${NC}"
    
    # Check if file is readable
    if [ ! -r "$workflow_file" ]; then
        echo -e "    \"$workflow_name\": {\"status\": \"error\", \"message\": \"File not readable\"}," >> "$REPORT_FILE"
        echo -e "${RED}  ✗ Not readable${NC}"
        return 1
    fi
    
    # Check for syntax errors (basic YAML validation)
    if ! grep -q "^name:" "$workflow_file" 2>/dev/null; then
        echo -e "    \"$workflow_name\": {\"status\": \"error\", \"message\": \"Invalid YAML structure\"}," >> "$REPORT_FILE"
        echo -e "${RED}  ✗ Invalid structure${NC}"
        return 1
    fi
    
    # Check if workflow has required permissions
    if grep -q "^permissions:" "$workflow_file"; then
        echo -e "    \"$workflow_name\": {\"status\": \"healthy\", \"message\": \"All checks passed\"}," >> "$REPORT_FILE"
        echo -e "${GREEN}  ✓ Healthy${NC}"
        return 0
    else
        echo -e "    \"$workflow_name\": {\"status\": \"warning\", \"message\": \"Missing permissions section\"}," >> "$REPORT_FILE"
        echo -e "${YELLOW}  ⚠ Warning: Missing permissions${NC}"
        return 0
    fi
}

# Function to check bot heartbeat
check_bot_heartbeat() {
    local bot_name="$1"
    echo -e "${YELLOW}Checking heartbeat: $bot_name${NC}"
    
    # Placeholder for actual heartbeat check
    # In production, this would check last run timestamp, logs, etc.
    echo -e "${GREEN}  ✓ Active${NC}"
}

# Main health check
echo -e "${GREEN}=== Starting Health Check ===${NC}\n"

# Check all workflow files
if [ -d "$WORKFLOWS_DIR" ]; then
    for workflow in "$WORKFLOWS_DIR"/*.yml; do
        if [ -f "$workflow" ]; then
            check_workflow_health "$workflow"
        fi
    done
fi

# Close JSON report
echo '    "summary": {"status": "completed"}' >> "$REPORT_FILE"
echo '  }' >> "$REPORT_FILE"
echo '}' >> "$REPORT_FILE"

echo -e "\n${GREEN}=== Health Check Complete ===${NC}"
echo -e "Report saved to: $REPORT_FILE"

exit 0
