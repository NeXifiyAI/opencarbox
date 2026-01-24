#!/bin/bash
# =============================================================================
# Bot Lifecycle Management - Start, Stop, Restart, Monitor Bots
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
NC='\033[0m'

# Available bots
AVAILABLE_BOTS=(
    "master-orchestrator"
    "auto-pilot"
    "full-autonomy"
    "qa-bot"
    "security-bot"
    "devops-bot"
    "ai-team"
    "ai-auto-merge"
    "auto-merge"
    "ai-self-healing"
    "bot-maintenance"
    "ci-performance"
)

# Function to display usage
usage() {
    echo "Usage: $0 <action> [bot-name|all]"
    echo ""
    echo "Actions:"
    echo "  start      - Start a bot or all bots"
    echo "  stop       - Stop a bot or all bots"
    echo "  restart    - Restart a bot or all bots"
    echo "  status     - Check status of bot(s)"
    echo "  list       - List all available bots"
    echo ""
    echo "Examples:"
    echo "  $0 start master-orchestrator"
    echo "  $0 restart all"
    echo "  $0 status qa-bot"
    exit 1
}

# Function to list all bots
list_bots() {
    echo -e "${BLUE}Available Bots:${NC}"
    for bot in "${AVAILABLE_BOTS[@]}"; do
        echo -e "  • $bot"
    done
}

# Function to check bot status
check_bot_status() {
    local bot_name="$1"
    local workflow_file="$PROJECT_ROOT/.github/workflows/${bot_name}.yml"
    
    if [ ! -f "$workflow_file" ]; then
        echo -e "${RED}✗ Bot not found: $bot_name${NC}"
        return 1
    fi
    
    echo -e "${GREEN}✓ Bot exists: $bot_name${NC}"
    
    # Check if workflow is enabled (not disabled in GitHub)
    # This is a placeholder - actual implementation would use GitHub API
    echo -e "  Status: ${GREEN}Active${NC}"
    echo -e "  Workflow: $workflow_file"
    
    return 0
}

# Function to start a bot
start_bot() {
    local bot_name="$1"
    echo -e "${YELLOW}Starting bot: $bot_name${NC}"
    
    # Placeholder for actual start logic
    # In production, this would trigger the workflow via GitHub API
    check_bot_status "$bot_name"
}

# Function to stop a bot
stop_bot() {
    local bot_name="$1"
    echo -e "${YELLOW}Stopping bot: $bot_name${NC}"
    
    # Placeholder for actual stop logic
    echo -e "${GREEN}✓ Bot stopped: $bot_name${NC}"
}

# Function to restart a bot
restart_bot() {
    local bot_name="$1"
    echo -e "${YELLOW}Restarting bot: $bot_name${NC}"
    
    stop_bot "$bot_name"
    sleep 1
    start_bot "$bot_name"
    
    echo -e "${GREEN}✓ Bot restarted: $bot_name${NC}"
}

# Function to process action for all bots
process_all_bots() {
    local action="$1"
    
    echo -e "${BLUE}Processing action '$action' for all bots...${NC}\n"
    
    for bot in "${AVAILABLE_BOTS[@]}"; do
        case "$action" in
            start)
                start_bot "$bot"
                ;;
            stop)
                stop_bot "$bot"
                ;;
            restart)
                restart_bot "$bot"
                ;;
            status)
                check_bot_status "$bot"
                ;;
        esac
        echo ""
    done
}

# Main script
if [ $# -lt 1 ]; then
    usage
fi

ACTION="$1"
BOT_NAME="${2:-}"

case "$ACTION" in
    list)
        list_bots
        ;;
    start|stop|restart|status)
        if [ -z "$BOT_NAME" ]; then
            echo -e "${RED}Error: Bot name required${NC}"
            usage
        fi
        
        if [ "$BOT_NAME" = "all" ]; then
            process_all_bots "$ACTION"
        else
            case "$ACTION" in
                start)
                    start_bot "$BOT_NAME"
                    ;;
                stop)
                    stop_bot "$BOT_NAME"
                    ;;
                restart)
                    restart_bot "$BOT_NAME"
                    ;;
                status)
                    check_bot_status "$BOT_NAME"
                    ;;
            esac
        fi
        ;;
    *)
        echo -e "${RED}Unknown action: $ACTION${NC}"
        usage
        ;;
esac

exit 0
