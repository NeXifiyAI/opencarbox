#!/bin/bash
# =============================================================================
# Bot Monitor - Continuous monitoring with heartbeat checks
# =============================================================================

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MONITOR_INTERVAL="${MONITOR_INTERVAL:-300}" # 5 minutes default
LOG_FILE="${LOG_FILE:-/tmp/bot-monitor.log}"

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

# Function to check system health
check_system_health() {
    log "INFO" "Running system health check..."
    
    # Run health check script
    if [ -f "$SCRIPT_DIR/health-check.sh" ]; then
        "$SCRIPT_DIR/health-check.sh" > /dev/null 2>&1
        if [ $? -eq 0 ]; then
            log "INFO" "System health check passed"
            return 0
        else
            log "WARN" "System health check failed"
            return 1
        fi
    else
        log "ERROR" "Health check script not found"
        return 1
    fi
}

# Function to trigger self-healing if needed
trigger_self_healing() {
    log "WARN" "Triggering self-healing process..."
    
    if [ -f "$SCRIPT_DIR/self-heal.sh" ]; then
        "$SCRIPT_DIR/self-heal.sh" 2>&1 | tee -a "$LOG_FILE"
        if [ $? -eq 0 ]; then
            log "INFO" "Self-healing successful"
        else
            log "ERROR" "Self-healing failed - manual intervention required"
        fi
    else
        log "ERROR" "Self-heal script not found"
    fi
}

# Function to generate heartbeat
send_heartbeat() {
    local timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    log "INFO" "Heartbeat: System monitoring active at $timestamp"
}

# Main monitoring loop
monitor_loop() {
    log "INFO" "Starting continuous monitoring (interval: ${MONITOR_INTERVAL}s)..."
    
    local iteration=0
    
    while true; do
        iteration=$((iteration + 1))
        log "INFO" "=== Monitoring iteration #$iteration ==="
        
        # Send heartbeat
        send_heartbeat
        
        # Check system health
        if ! check_system_health; then
            log "WARN" "Health check failed - initiating recovery"
            trigger_self_healing
        fi
        
        # Wait for next iteration
        log "INFO" "Next check in ${MONITOR_INTERVAL} seconds..."
        sleep "$MONITOR_INTERVAL"
    done
}

# Single check mode
run_single_check() {
    log "INFO" "Running single health check..."
    
    send_heartbeat
    
    if check_system_health; then
        echo -e "${GREEN}✓ System is healthy${NC}"
        exit 0
    else
        echo -e "${RED}✗ System health check failed${NC}"
        
        read -p "Trigger self-healing? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            trigger_self_healing
        fi
        exit 1
    fi
}

# Main script
echo -e "${BLUE}=== Bot Monitoring System ===${NC}\n"

MODE="${1:-continuous}"

case "$MODE" in
    continuous)
        echo -e "${YELLOW}Starting continuous monitoring mode${NC}"
        echo -e "Press Ctrl+C to stop\n"
        monitor_loop
        ;;
    once)
        run_single_check
        ;;
    *)
        echo "Usage: $0 [continuous|once]"
        echo ""
        echo "Modes:"
        echo "  continuous - Run continuous monitoring (default)"
        echo "  once       - Run single health check"
        exit 1
        ;;
esac
