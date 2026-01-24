# 🚀 Autonomous System Quick Start Guide

Welcome to the OpenCarBox Autonomous CI/CD Orchestration System!

## ⚡ Quick Start (5 Minutes)

### 1. Initialize the System

```bash
# Run the initialization script
bash scripts/autonomous/init-system.sh
```

This will:
- ✅ Verify all components
- ✅ Check scripts and workflows
- ✅ Run initial health check
- ✅ Generate dashboard
- ✅ Create initialization report

### 2. Review System Status

```bash
# View the dashboard
cat /tmp/bot-dashboard.md

# Check health report
cat /tmp/health-check-report.json
```

### 3. Activate the System (via GitHub Actions)

```bash
# Trigger the master orchestrator
gh workflow run enhanced-orchestrator.yml \
  -f command=activate-all-bots \
  -f priority=high
```

## 📚 Available Commands

### Health & Monitoring

```bash
# Run health check
./scripts/autonomous/health-check.sh

# Start continuous monitoring (Ctrl+C to stop)
./scripts/autonomous/monitor.sh continuous

# Single health check
./scripts/autonomous/monitor.sh once

# Generate dashboard
./scripts/autonomous/dashboard.sh
```

### Bot Management

```bash
# List all bots
./scripts/autonomous/bot-lifecycle.sh list

# Check bot status
./scripts/autonomous/bot-lifecycle.sh status master-orchestrator

# Check all bots
./scripts/autonomous/bot-lifecycle.sh status all

# Restart a bot
./scripts/autonomous/bot-lifecycle.sh restart qa-bot

# Restart all bots
./scripts/autonomous/bot-lifecycle.sh restart all
```

### Performance & Optimization

```bash
# Analyze pipeline performance
./scripts/autonomous/pipeline-optimizer.sh

# View optimization report
cat /tmp/pipeline-optimization-report.txt
```

### Recovery & Troubleshooting

```bash
# Run self-healing
./scripts/autonomous/self-heal.sh

# Generate recovery templates
./scripts/autonomous/recovery-templates.sh

# View recovery templates
ls /tmp/recovery-templates/
```

## 🎯 GitHub Actions Workflows

### Master Orchestrator Commands

```bash
# Full system check
gh workflow run enhanced-orchestrator.yml -f command=full-system-check

# Activate all bots
gh workflow run enhanced-orchestrator.yml -f command=activate-all-bots

# Optimize all pipelines
gh workflow run enhanced-orchestrator.yml -f command=optimize-all-pipelines

# Self-heal system
gh workflow run enhanced-orchestrator.yml -f command=self-heal-system

# Generate dashboard
gh workflow run enhanced-orchestrator.yml -f command=generate-dashboard

# Emergency recovery
gh workflow run enhanced-orchestrator.yml -f command=emergency-recovery

# Performance audit
gh workflow run enhanced-orchestrator.yml -f command=performance-audit

# Bot inventory
gh workflow run enhanced-orchestrator.yml -f command=bot-inventory
```

### Run Integration Tests

```bash
# Run full integration test
gh workflow run system-integration-test.yml

# Quick test
gh workflow run system-integration-test.yml -f test_mode=quick

# Scripts only
gh workflow run system-integration-test.yml -f test_mode=scripts-only
```

## 🏥 Daily Operations

### Morning Routine

```bash
# 1. Check system health
./scripts/autonomous/health-check.sh

# 2. Review dashboard
./scripts/autonomous/dashboard.sh && cat /tmp/bot-dashboard.md

# 3. If issues found, run self-heal
./scripts/autonomous/self-heal.sh
```

### Performance Check

```bash
# 1. Analyze pipelines
./scripts/autonomous/pipeline-optimizer.sh

# 2. Review recommendations
cat /tmp/pipeline-optimization-report.txt

# 3. Apply optimizations (if needed)
gh workflow run enhanced-orchestrator.yml -f command=optimize-all-pipelines
```

### Emergency Response

```bash
# 1. Quick diagnosis
./scripts/autonomous/health-check.sh

# 2. Self-heal
./scripts/autonomous/self-heal.sh

# 3. If still failing, emergency recovery
gh workflow run enhanced-orchestrator.yml \
  -f command=emergency-recovery \
  -f priority=critical

# 4. Monitor recovery
./scripts/autonomous/monitor.sh continuous
```

## 📊 Monitoring Dashboard

The system provides multiple dashboards:

1. **Bot Dashboard** (`/tmp/bot-dashboard.md`)
   - Bot inventory
   - Health status
   - Performance metrics
   - Quick commands

2. **Health Report** (`/tmp/health-check-report.json`)
   - Workflow status
   - Configuration health
   - System dependencies

3. **Optimization Report** (`/tmp/pipeline-optimization-report.txt`)
   - Performance analysis
   - Recommendations
   - Time savings estimates

4. **Initialization Report** (`/tmp/autonomous-system-init-report.txt`)
   - System setup status
   - Component verification
   - Next steps

## 🔔 Key Concepts

### Autonomous Levels

1. **Level 1: Manual** - Scripts run manually
2. **Level 2: Scheduled** - Scripts run on schedule (every 6h)
3. **Level 3: Autonomous** - Full automation with self-healing

### Bot Hierarchy

```
Master Orchestrator (Supreme Control)
    ↓
Enhanced Orchestrator (Coordination)
    ↓
┌───────────┬───────────────┬─────────────┐
↓           ↓               ↓             ↓
Auto-Pilot  Full-Autonomy   Bot-Maint   Self-Healing
    ↓           ↓               ↓             ↓
Specialized Bots (QA, Security, DevOps, etc.)
```

### Self-Healing Process

```
Detect Issue → Analyze → Apply Fix → Verify → Report
```

## 📖 Documentation

- **Complete Guide**: `.github/AUTONOMOUS_CI_CD_CENTRAL.md`
- **System Overview**: `.github/AUTONOMOUS_SYSTEM.md`
- **Scripts Guide**: `scripts/autonomous/README.md`

## 🆘 Getting Help

### Check Logs

```bash
# Health check logs
cat /tmp/health-check-report.json

# Self-heal logs
cat /tmp/self-heal.log

# Monitor logs
cat /tmp/bot-monitor.log
```

### Common Issues

1. **Scripts not executable**
   ```bash
   chmod +x scripts/autonomous/*.sh
   ```

2. **Workflows not triggering**
   ```bash
   gh workflow list
   gh workflow enable <workflow-name>
   ```

3. **Health check fails**
   ```bash
   ./scripts/autonomous/self-heal.sh
   ```

### Manual Workflow Trigger

```bash
# List all workflows
gh workflow list

# Run specific workflow
gh workflow run <workflow-name>.yml

# Watch workflow execution
gh run watch
```

## ✅ Verification Checklist

Before considering the system fully operational:

- [ ] All scripts are executable
- [ ] Health check passes
- [ ] Dashboard generates successfully
- [ ] Bot lifecycle commands work
- [ ] Workflows are enabled
- [ ] Documentation is accessible
- [ ] GitHub token is configured
- [ ] Integration tests pass

## 🎯 Success Criteria

The system is considered operational when:

✅ Health check returns all green  
✅ Dashboard shows all bots active  
✅ No errors in logs  
✅ Workflows trigger correctly  
✅ Self-healing works on test issue  
✅ Monitoring runs continuously  

## 🚀 Next Steps

1. **Test the System**
   ```bash
   gh workflow run system-integration-test.yml
   ```

2. **Monitor for 24h**
   ```bash
   ./scripts/autonomous/monitor.sh continuous
   ```

3. **Enable Full Autonomy**
   ```bash
   gh workflow run enhanced-orchestrator.yml -f command=activate-all-bots
   ```

4. **Review Daily**
   - Check dashboard
   - Review logs
   - Monitor performance

## 📞 Support

- Check documentation in `.github/`
- Review workflow files in `.github/workflows/`
- Consult script comments in `scripts/autonomous/`

---

**🤖 Welcome to the future of autonomous CI/CD!**

The system is now ready to manage itself. Sit back and let it work!
