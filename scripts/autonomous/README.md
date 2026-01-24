# 🤖 Autonomous Scripts

This directory contains all scripts for the autonomous CI/CD orchestration system.

## 📁 Contents

| Script                  | Purpose                      | Output                                  |
| ----------------------- | ---------------------------- | --------------------------------------- |
| `health-check.sh`       | System health monitoring     | `/tmp/health-check-report.json`         |
| `bot-lifecycle.sh`      | Bot lifecycle management     | Console output                          |
| `self-heal.sh`          | Automatic issue repair       | `/tmp/self-heal.log`                    |
| `pipeline-optimizer.sh` | Performance optimization     | `/tmp/pipeline-optimization-report.txt` |
| `dashboard.sh`          | Dashboard generation         | `/tmp/bot-dashboard.md`                 |
| `monitor.sh`            | Continuous monitoring        | `/tmp/bot-monitor.log`                  |
| `recovery-templates.sh` | Recovery procedure templates | `/tmp/recovery-templates/`              |

## 🚀 Quick Start

### Health Check

```bash
./health-check.sh
cat /tmp/health-check-report.json
```

### Bot Management

```bash
# List all bots
./bot-lifecycle.sh list

# Check status
./bot-lifecycle.sh status master-orchestrator

# Restart a bot
./bot-lifecycle.sh restart qa-bot

# Restart all bots
./bot-lifecycle.sh restart all
```

### Self-Healing

```bash
# Run self-healing
./self-heal.sh

# Check logs
tail -f /tmp/self-heal.log
```

### Performance Optimization

```bash
./pipeline-optimizer.sh
cat /tmp/pipeline-optimization-report.txt
```

### Dashboard

```bash
./dashboard.sh
cat /tmp/bot-dashboard.md
```

### Monitoring

```bash
# Continuous monitoring (Ctrl+C to stop)
./monitor.sh continuous

# Single check
./monitor.sh once
```

### Recovery Templates

```bash
./recovery-templates.sh
ls /tmp/recovery-templates/
```

## 🔧 Requirements

- Bash 4.0+
- Git
- GitHub CLI (`gh`) - optional but recommended
- jq - for JSON parsing (optional)

## 📝 Usage Patterns

### Daily Operations

```bash
# Morning check
./health-check.sh && ./dashboard.sh

# If issues found
./self-heal.sh

# Verify fix
./health-check.sh
```

### Performance Tuning

```bash
# Analyze
./pipeline-optimizer.sh

# Review recommendations
cat /tmp/pipeline-optimization-report.txt

# Monitor improvements
./monitor.sh continuous
```

### Emergency Recovery

```bash
# Quick diagnosis
./health-check.sh

# Self-heal
./self-heal.sh

# Restart all
./bot-lifecycle.sh restart all

# Verify
./dashboard.sh
```

## 🎯 Integration with GitHub Actions

These scripts are called from GitHub Actions workflows:

- `enhanced-orchestrator.yml` - Calls all scripts for complete orchestration
- `bot-maintenance.yml` - Uses bot-lifecycle.sh for maintenance
- `ai-self-healing.yml` - Triggers self-heal.sh on failures

## 📊 Output Formats

### JSON (health-check.sh)

```json
{
  "timestamp": "2024-01-24T08:00:00Z",
  "checks": {
    "bot-name": {
      "status": "healthy|warning|error",
      "message": "Details"
    }
  }
}
```

### Markdown (dashboard.sh)

Comprehensive dashboard with:

- Bot inventory table
- Health summary
- Performance metrics
- Quick commands

### Plain Text (pipeline-optimizer.sh)

Detailed analysis with:

- Workflow-by-workflow breakdown
- Recommendations
- Time savings estimates

### Log Format (self-heal.sh, monitor.sh)

```
[TIMESTAMP] [LEVEL] Message
```

## 🔐 Security Notes

- Scripts require repository access
- Some operations need GitHub token (`GH_TOKEN`)
- All scripts log to `/tmp` (automatically cleaned)
- No sensitive data is logged

## 🤝 Contributing

When adding new scripts:

1. Follow the existing structure
2. Add comprehensive comments
3. Include usage examples
4. Make executable: `chmod +x script.sh`
5. Update this README
6. Add to `.github/AUTONOMOUS_CI_CD_CENTRAL.md`

## 📚 Documentation

See `.github/AUTONOMOUS_CI_CD_CENTRAL.md` for complete system documentation.

## 🐛 Troubleshooting

### Script not found

```bash
# Check if in correct directory
pwd
ls -la

# Make executable
chmod +x *.sh
```

### Permission denied

```bash
chmod +x scripts/autonomous/*.sh
```

### Command not found

```bash
# Install GitHub CLI
# See: https://cli.github.com/

# Or run without gh commands
```

---

**All scripts are production-ready and actively used by the autonomous system.**
