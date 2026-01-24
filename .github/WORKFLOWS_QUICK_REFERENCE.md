# GitHub Actions Quick Reference

Quick commands and solutions for common workflow tasks.

## 🚀 Quick Commands

### Trigger Manual Workflow

```bash
# Using GitHub CLI
gh workflow run ci.yml

# With inputs
gh workflow run ci.yml -f environment=production

# From specific branch
gh workflow run ci.yml --ref main
```

### View Workflow Runs

```bash
# List recent runs
gh run list

# View specific run
gh run view <run-id>

# Watch a run in progress
gh run watch <run-id>

# Download logs
gh run download <run-id>
```

### Manage Workflows

```bash
# List all workflows
gh workflow list

# View workflow details
gh workflow view ci.yml

# Disable a workflow
gh workflow disable <workflow-name>

# Enable a workflow
gh workflow enable <workflow-name>
```

### Debug Failed Run

```bash
# View failure logs
gh run view <run-id> --log-failed

# Re-run failed jobs
gh run rerun <run-id> --failed

# Re-run with debug logging
gh run rerun <run-id> --debug
```

## 🔧 Common Fixes

### Build Failing

**Error:** `Module not found`

```bash
# Add missing dependency
pnpm add <package-name>

# Update lock file
pnpm install

# Commit changes
git add package.json pnpm-lock.yaml
git commit -m "fix: add missing dependency"
```

**Error:** `Build timeout`

```yaml
# Increase timeout in workflow
jobs:
  build:
    timeout-minutes: 20 # Increase from 15
```

### Cache Issues

```bash
# Clear cache manually via GitHub UI
# Settings → Actions → Caches → Delete

# Or update cache key in workflow
key: ${{ runner.os }}-v2-pnpm-${{ hashFiles('**/pnpm-lock.yaml') }}
#                     ^^^ Increment version
```

### Permission Errors

```yaml
# Add required permissions
permissions:
  contents: write
  pull-requests: write
  issues: write
```

### Test Failures

```yaml
# Run tests locally first
pnpm test

# Add retry for flaky tests
- run: pnpm test || pnpm test || pnpm test
```

## 📊 Monitoring

### Check Workflow Status

```bash
# Overall status
gh run list --limit 10

# Specific workflow
gh run list --workflow=ci.yml

# Failed runs only
gh run list --status=failure

# By branch
gh run list --branch=main
```

### View Metrics

```bash
# Workflow usage
gh api /repos/:owner/:repo/actions/workflows/:workflow/timing

# Runner usage
gh api /repos/:owner/:repo/actions/runs
```

## 🔐 Secrets Management

### Add Secret

```bash
# Via CLI
gh secret set SECRET_NAME

# From file
gh secret set SECRET_NAME < secret.txt

# For environment
gh secret set SECRET_NAME --env production
```

### List Secrets

```bash
# Repository secrets
gh secret list

# Organization secrets
gh secret list --org <org-name>
```

### Update Secret

```bash
# Same as adding
gh secret set SECRET_NAME
```

## 🐛 Debugging Cheat Sheet

### Enable Debug Logging

**Option 1: Re-run with debug**

```
Actions tab → Run → Re-run jobs → Enable debug logging
```

**Option 2: Add to workflow**

```yaml
env:
  ACTIONS_STEP_DEBUG: true
  ACTIONS_RUNNER_DEBUG: true
```

### Common Debug Commands

```yaml
# Check environment
- run: |
    echo "Node: $(node --version)"
    echo "pnpm: $(pnpm --version)"
    echo "Working directory: $(pwd)"
    echo "Files:"
    ls -la

# Check dependencies
- run: pnpm list --depth=0

# Check build artifacts
- run: |
    ls -la .next/
    du -sh .next/

# Network debugging
- run: |
    ping -c 3 github.com
    curl -I https://registry.npmjs.org
```

## 🔄 Workflow Patterns

### Run on Specific Paths

```yaml
on:
  push:
    paths:
      - 'src/**'
      - 'package.json'
    paths-ignore:
      - '**.md'
      - 'docs/**'
```

### Run on Schedule

```yaml
on:
  schedule:
    # Every day at 9 AM UTC
    - cron: '0 9 * * *'
    # Every Monday at 6 PM UTC
    - cron: '0 18 * * 1'
```

### Matrix Strategy

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, macos-latest, windows-latest]
    node: [18, 20, 22]
  fail-fast: false
```

### Conditional Steps

```yaml
- name: Deploy
  if: github.ref == 'refs/heads/main'
  run: pnpm deploy

- name: Comment on PR
  if: github.event_name == 'pull_request'
  run: gh pr comment --body "Build successful!"
```

## 📦 Artifact Management

### Upload Artifacts

```yaml
- uses: actions/upload-artifact@v4
  with:
    name: build-output
    path: .next/
    retention-days: 7
```

### Download Artifacts

```yaml
- uses: actions/download-artifact@v4
  with:
    name: build-output
    path: .next/
```

```bash
# Via CLI
gh run download <run-id>
```

## 🎯 Performance Tips

### Speed Up Builds

1. **Use caching**

```yaml
- uses: actions/cache@v4
  with:
    path: node_modules
    key: ${{ runner.os }}-deps-${{ hashFiles('**/pnpm-lock.yaml') }}
```

2. **Parallel jobs**

```yaml
jobs:
  lint:
    # Runs in parallel with test
  test:
    # Runs in parallel with lint
```

3. **Fail fast**

```yaml
strategy:
  fail-fast: true
```

4. **Cancel in-progress**

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

### Reduce Runner Minutes

- Use `continue-on-error` for non-critical steps
- Skip jobs when not needed with `if` conditions
- Use smaller runner (ubuntu-latest vs custom runners)
- Cache dependencies aggressively

## 🔔 Notifications

### Slack Notification

```yaml
- name: Slack notification
  if: failure()
  uses: slackapi/slack-github-action@v1
  with:
    payload: |
      {
        "text": "Build failed: ${{ github.workflow }}"
      }
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

### Email Notification

```yaml
- name: Send email
  if: failure()
  uses: dawidd6/action-send-mail@v3
  with:
    server_address: smtp.gmail.com
    server_port: 465
    username: ${{ secrets.EMAIL_USERNAME }}
    password: ${{ secrets.EMAIL_PASSWORD }}
    subject: Workflow failed
    body: Build failed for ${{ github.sha }}
    to: team@example.com
```

## 🎨 Custom Actions

### Create Composite Action

```yaml
# .github/actions/setup/action.yml
name: Setup Project
description: Install dependencies and cache
runs:
  using: composite
  steps:
    - uses: pnpm/action-setup@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'pnpm'
    - run: pnpm install --frozen-lockfile
      shell: bash
```

### Use Custom Action

```yaml
- uses: ./.github/actions/setup
```

## 📋 Workflow Templates

### Minimal CI

```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm test
```

### With Build & Deploy

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - run: pnpm deploy
```

## 🆘 Emergency Procedures

### All Workflows Failing

1. Check GitHub status: https://www.githubstatus.com/
2. Check recent commits for breaking changes
3. Revert last commit if needed:
   ```bash
   git revert HEAD
   git push
   ```

### Stuck Workflow

```bash
# Cancel a running workflow
gh run cancel <run-id>

# Cancel all runs for a workflow
gh run list --workflow=ci.yml --status=in_progress \
  | awk '{print $7}' | xargs -I {} gh run cancel {}
```

### Disable All Workflows

```bash
# List and disable each
for workflow in $(gh workflow list --json name -q '.[].name'); do
  gh workflow disable "$workflow"
done
```

### Re-enable All Workflows

```bash
for workflow in $(gh workflow list --json name -q '.[].name'); do
  gh workflow enable "$workflow"
done
```

## 📚 Learn More

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [GitHub CLI Manual](https://cli.github.com/manual/)
- [Best Practices](.github/WORKFLOWS_BEST_PRACTICES.md)

---

_Need help? Check the [full documentation](.github/workflows/README.md)_
