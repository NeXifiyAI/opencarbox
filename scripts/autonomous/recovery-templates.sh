#!/bin/bash
# =============================================================================
# Recovery Template Generator - Creates recovery procedures for common issues
# =============================================================================

set -euo pipefail

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_DIR="${OUTPUT_DIR:-/tmp/recovery-templates}"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo -e "${BLUE}=== Generating Recovery Templates ===${NC}\n"

# Template 1: Workflow Failure Recovery
cat << 'EOF' > "$OUTPUT_DIR/workflow-failure-recovery.md"
# Workflow Failure Recovery Template

## Issue
Workflow: `___WORKFLOW_NAME___`
Run ID: `___RUN_ID___`
Failed At: `___TIMESTAMP___`

## Error
```
___ERROR_MESSAGE___
```

## Root Cause Analysis
- [ ] Syntax error in workflow file
- [ ] Missing dependencies
- [ ] Environment variable issues
- [ ] Permission problems
- [ ] External service failure
- [ ] Timeout
- [ ] Other: _______________

## Recovery Steps

### 1. Immediate Actions
```bash
# Check workflow status
gh run view ___RUN_ID___

# View logs
gh run view ___RUN_ID___ --log

# Check for similar failures
gh run list --workflow=___WORKFLOW_NAME___ --limit 10
```

### 2. Diagnosis
```bash
# Run health check
./scripts/autonomous/health-check.sh

# Check specific workflow
cat .github/workflows/___WORKFLOW_NAME___
```

### 3. Apply Fix
```bash
# Option A: Run self-healing
./scripts/autonomous/self-heal.sh

# Option B: Manual fix
# [Describe manual fix here]

# Option C: Restart workflow
gh workflow run ___WORKFLOW_NAME___
```

### 4. Verification
```bash
# Monitor new run
gh run watch

# Verify health
./scripts/autonomous/health-check.sh

# Generate dashboard
./scripts/autonomous/dashboard.sh
```

## Prevention
- [ ] Add better error handling
- [ ] Increase timeout if needed
- [ ] Add retry logic
- [ ] Improve documentation
- [ ] Add pre-flight checks

## Sign-off
- Fixed by: _______________
- Verified by: _______________
- Date: _______________
EOF

# Template 2: Bot Unresponsive Recovery
cat << 'EOF' > "$OUTPUT_DIR/bot-unresponsive-recovery.md"
# Bot Unresponsive Recovery Template

## Issue
Bot: `___BOT_NAME___`
Last Active: `___LAST_ACTIVE___`
Symptoms: `___SYMPTOMS___`

## Quick Diagnosis
```bash
# Check bot status
./scripts/autonomous/bot-lifecycle.sh status ___BOT_NAME___

# View workflow file
cat .github/workflows/___BOT_NAME___.yml

# Check recent runs
gh run list --workflow=___BOT_NAME___.yml --limit 5
```

## Recovery Procedure

### Step 1: Restart Bot
```bash
# Restart the bot
./scripts/autonomous/bot-lifecycle.sh restart ___BOT_NAME___

# Verify restart
./scripts/autonomous/bot-lifecycle.sh status ___BOT_NAME___
```

### Step 2: If Restart Fails
```bash
# Run full health check
./scripts/autonomous/health-check.sh

# Check for dependency issues
cd /path/to/repo
pnpm install

# Run self-healing
./scripts/autonomous/self-heal.sh
```

### Step 3: Manual Trigger
```bash
# Trigger bot manually
gh workflow run ___BOT_NAME___.yml

# Watch execution
gh run watch
```

### Step 4: Verify Recovery
```bash
# Monitor for 30 minutes
MONITOR_INTERVAL=300 ./scripts/autonomous/monitor.sh continuous

# Generate status report
./scripts/autonomous/dashboard.sh
```

## Post-Recovery
- [ ] Document root cause
- [ ] Update bot configuration if needed
- [ ] Add monitoring alerts
- [ ] Schedule follow-up check in 24h

## Notes
___ADD_NOTES_HERE___
EOF

# Template 3: System-Wide Failure Recovery
cat << 'EOF' > "$OUTPUT_DIR/system-wide-failure-recovery.md"
# System-Wide Failure Recovery Template

## Crisis Situation
All bots down or multiple critical failures

## Emergency Response

### Phase 1: Assessment (5 minutes)
```bash
# Check all workflow statuses
gh run list --limit 20

# Run emergency health check
./scripts/autonomous/health-check.sh

# Check all bots
./scripts/autonomous/bot-lifecycle.sh status all
```

### Phase 2: Emergency Recovery (10 minutes)
```bash
# Trigger master orchestrator emergency recovery
gh workflow run enhanced-orchestrator.yml \
  -f command=emergency-recovery \
  -f priority=critical

# Run system-wide self-healing
./scripts/autonomous/self-heal.sh

# Force restart all bots
./scripts/autonomous/bot-lifecycle.sh restart all
```

### Phase 3: Verification (10 minutes)
```bash
# Monitor system recovery
./scripts/autonomous/monitor.sh once

# Generate comprehensive dashboard
./scripts/autonomous/dashboard.sh
cat /tmp/bot-dashboard.md

# Check workflow runs
gh run list --limit 10
```

### Phase 4: Stabilization (30 minutes)
```bash
# Continuous monitoring
MONITOR_INTERVAL=300 ./scripts/autonomous/monitor.sh continuous

# Watch for new failures
gh run watch
```

## Root Cause Investigation

### Common Causes
- [ ] GitHub Actions outage
- [ ] Quota/rate limit exceeded
- [ ] Repository permission changes
- [ ] Secret expiration
- [ ] Dependency breaking changes
- [ ] Configuration corruption

### Investigation Steps
```bash
# Check GitHub status
curl https://www.githubstatus.com/api/v2/status.json

# Review recent commits
git log --oneline -10

# Check secrets (in GitHub UI)
# Settings > Secrets and variables > Actions

# Review workflow changes
git diff HEAD~5 .github/workflows/
```

## Communication Plan
1. Create incident issue
2. Notify stakeholders
3. Post status updates every 30 minutes
4. Final post-mortem

## Prevention Measures
- [ ] Add redundancy
- [ ] Improve monitoring
- [ ] Add circuit breakers
- [ ] Implement gradual rollout
- [ ] Enhance error handling

## Sign-off
- Incident Commander: _______________
- Recovery Time: _______________
- Root Cause: _______________
- Prevention Plan: _______________
EOF

# Template 4: Performance Degradation Recovery
cat << 'EOF' > "$OUTPUT_DIR/performance-degradation-recovery.md"
# Performance Degradation Recovery Template

## Issue
Symptom: `___SYMPTOM___`
Affected: `___AFFECTED_WORKFLOWS___`
Impact: `___IMPACT___`

## Performance Analysis
```bash
# Run pipeline optimizer
./scripts/autonomous/pipeline-optimizer.sh

# Review report
cat /tmp/pipeline-optimization-report.txt

# Check recent workflow times
gh run list --workflow=___WORKFLOW_NAME___ --limit 10
```

## Optimization Steps

### 1. Quick Wins
```bash
# Clear caches
gh cache delete --all

# Trigger optimized rebuild
gh workflow run enhanced-orchestrator.yml \
  -f command=optimize-all-pipelines
```

### 2. Analysis
Review optimization report for:
- Missing caching opportunities
- Lack of parallelization
- Long-running sequential jobs
- Inefficient dependency installation

### 3. Apply Optimizations
Based on report recommendations:
- [ ] Add dependency caching
- [ ] Implement matrix strategy
- [ ] Set appropriate timeouts
- [ ] Add concurrency control
- [ ] Enable fail-fast

### 4. Measure Improvement
```bash
# Run optimized workflow
gh workflow run ___WORKFLOW_NAME___

# Compare times
gh run list --workflow=___WORKFLOW_NAME___ --limit 5

# Generate new optimization report
./scripts/autonomous/pipeline-optimizer.sh
```

## Expected Improvements
- Cache hit rate: ____%
- Build time reduction: ____%
- Parallel speedup: ___x
- Total time savings: ___ minutes

## Follow-up
- [ ] Monitor for 24 hours
- [ ] Adjust optimizations if needed
- [ ] Document changes
- [ ] Share learnings
EOF

echo -e "${GREEN}✓ Recovery templates generated${NC}\n"
echo -e "Templates created in: ${YELLOW}$OUTPUT_DIR${NC}"
echo ""
ls -1 "$OUTPUT_DIR"

exit 0
