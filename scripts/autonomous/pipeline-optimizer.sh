#!/bin/bash
# =============================================================================
# Pipeline Optimizer - Analyzes and optimizes CI/CD pipeline performance
# =============================================================================

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
WORKFLOWS_DIR="$PROJECT_ROOT/.github/workflows"
REPORT_FILE="${REPORT_FILE:-/tmp/pipeline-optimization-report.txt}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Initialize report
{
    echo "==================================================================="
    echo "Pipeline Optimization Report"
    echo "Generated: $(date -u +"%Y-%m-%d %H:%M:%S UTC")"
    echo "==================================================================="
    echo ""
} > "$REPORT_FILE"

# Function to analyze workflow for optimization opportunities
analyze_workflow() {
    local workflow_file="$1"
    local workflow_name=$(basename "$workflow_file" .yml)
    
    echo -e "${YELLOW}Analyzing: $workflow_name${NC}"
    
    {
        echo "Workflow: $workflow_name"
        echo "-------------------------------------------------------------------"
    } >> "$REPORT_FILE"
    
    local recommendations=0
    
    # Check for caching
    if ! grep -q "cache:" "$workflow_file" 2>/dev/null; then
        echo "  ⚠️  Missing dependency caching" >> "$REPORT_FILE"
        echo -e "  ${YELLOW}⚠  Missing dependency caching${NC}"
        recommendations=$((recommendations + 1))
    else
        echo "  ✓  Uses dependency caching" >> "$REPORT_FILE"
    fi
    
    # Check for parallelization (matrix strategy)
    if ! grep -q "matrix:" "$workflow_file" 2>/dev/null; then
        echo "  ℹ️  Could benefit from matrix strategy" >> "$REPORT_FILE"
        echo -e "  ${BLUE}ℹ  Could benefit from matrix strategy${NC}"
    else
        echo "  ✓  Uses matrix parallelization" >> "$REPORT_FILE"
    fi
    
    # Check for timeout settings
    if ! grep -q "timeout-minutes:" "$workflow_file" 2>/dev/null; then
        echo "  ⚠️  Missing timeout settings" >> "$REPORT_FILE"
        echo -e "  ${YELLOW}⚠  Missing timeout settings${NC}"
        recommendations=$((recommendations + 1))
    else
        echo "  ✓  Has timeout settings" >> "$REPORT_FILE"
    fi
    
    # Check for concurrency control
    if ! grep -q "concurrency:" "$workflow_file" 2>/dev/null; then
        echo "  ℹ️  Could benefit from concurrency control" >> "$REPORT_FILE"
        echo -e "  ${BLUE}ℹ  Could benefit from concurrency control${NC}"
    else
        echo "  ✓  Has concurrency control" >> "$REPORT_FILE"
    fi
    
    # Check for early-fail strategy
    if grep -q "fail-fast: false" "$workflow_file" 2>/dev/null; then
        echo "  ℹ️  Using fail-fast: false (may increase runtime)" >> "$REPORT_FILE"
    fi
    
    echo "" >> "$REPORT_FILE"
    
    if [ $recommendations -eq 0 ]; then
        echo -e "  ${GREEN}✓ Workflow is well-optimized${NC}"
    else
        echo -e "  ${YELLOW}⚠ $recommendations optimization opportunities found${NC}"
    fi
    
    echo ""
}

# Function to provide optimization recommendations
generate_recommendations() {
    {
        echo ""
        echo "==================================================================="
        echo "General Optimization Recommendations"
        echo "==================================================================="
        echo ""
        echo "1. Caching Strategy:"
        echo "   - Use actions/cache@v4 for dependencies"
        echo "   - Cache build artifacts between jobs"
        echo "   - Use pnpm/action-setup with built-in caching"
        echo ""
        echo "2. Parallelization:"
        echo "   - Use matrix strategy for multi-environment tests"
        echo "   - Run independent jobs in parallel"
        echo "   - Split large test suites across multiple runners"
        echo ""
        echo "3. Resource Optimization:"
        echo "   - Set appropriate timeout-minutes"
        echo "   - Use concurrency groups to cancel redundant runs"
        echo "   - Enable fail-fast for matrix builds"
        echo ""
        echo "4. Performance Tips:"
        echo "   - Use frozen-lockfile for faster installs"
        echo "   - Minimize checkout depth (fetch-depth: 1)"
        echo "   - Use conditional steps to skip unnecessary work"
        echo "   - Leverage GitHub's larger runners for build-heavy tasks"
        echo ""
        echo "5. Monitoring:"
        echo "   - Track workflow run times"
        echo "   - Monitor cache hit rates"
        echo "   - Set up alerts for slow or failed workflows"
        echo ""
    } >> "$REPORT_FILE"
}

# Function to calculate potential time savings
estimate_savings() {
    local total_workflows=0
    local optimizable_workflows=0
    
    for workflow in "$WORKFLOWS_DIR"/*.yml; do
        if [ -f "$workflow" ]; then
            total_workflows=$((total_workflows + 1))
            
            if ! grep -q "cache:" "$workflow" 2>/dev/null; then
                optimizable_workflows=$((optimizable_workflows + 1))
            fi
        fi
    done
    
    {
        echo "==================================================================="
        echo "Optimization Impact Estimate"
        echo "==================================================================="
        echo ""
        echo "Total workflows analyzed: $total_workflows"
        echo "Workflows with optimization opportunities: $optimizable_workflows"
        echo ""
        echo "Estimated time savings per run:"
        echo "  - With caching: 30-60 seconds per workflow"
        echo "  - With parallelization: 40-70% reduction in total time"
        echo "  - With concurrency control: Reduced queue times"
        echo ""
        echo "Potential monthly savings (based on 100 runs/month):"
        echo "  - Time saved: ~50-150 minutes"
        echo "  - Cost saved: Reduced GitHub Actions minutes"
        echo ""
    } >> "$REPORT_FILE"
}

# Main optimization process
main() {
    echo -e "${BLUE}=== Pipeline Optimization Analysis ===${NC}\n"
    
    if [ ! -d "$WORKFLOWS_DIR" ]; then
        echo -e "${RED}Error: Workflows directory not found${NC}"
        exit 1
    fi
    
    # Analyze all workflows
    for workflow in "$WORKFLOWS_DIR"/*.yml; do
        if [ -f "$workflow" ]; then
            analyze_workflow "$workflow"
        fi
    done
    
    # Generate recommendations
    generate_recommendations
    
    # Estimate savings
    estimate_savings
    
    echo -e "${GREEN}=== Analysis Complete ===${NC}"
    echo -e "Full report saved to: ${BLUE}$REPORT_FILE${NC}\n"
    
    # Display summary
    echo -e "${YELLOW}Quick Summary:${NC}"
    grep -E "^(Workflow:|Total workflows|Workflows with|Estimated time)" "$REPORT_FILE" | head -20
}

# Run main function
main "$@"
