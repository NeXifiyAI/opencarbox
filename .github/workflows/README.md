# GitHub Actions Workflows Documentation

This document describes the GitHub Actions workflows configured for this repository and best practices for maintaining them.

## 🚀 Active Workflows

### Main CI/CD Pipeline (`ci.yml`)

**Purpose:** Primary continuous integration and deployment pipeline

**Triggers:**

- Push to `main` and `develop` branches
- Pull requests to `main` and `develop`
- Manual workflow dispatch

**Jobs:**

1. **Setup** - Installs dependencies with caching
2. **Lint** - Runs ESLint and format checks
3. **TypeCheck** - Validates TypeScript types
4. **Build** - Builds the Next.js application
5. **Test** - Runs unit tests with Vitest
6. **E2E** - Runs Playwright E2E tests (main/develop only)
7. **Security** - Runs pnpm audit
8. **CodeQL** - Performs security analysis
9. **Quality Gate** - Final validation that all checks passed

**Best Practices:**

- Uses dependency caching for faster builds
- Parallel job execution for speed
- Proper timeout configuration
- Comprehensive error handling

### Workflow Health Check (`health-check.yml`)

**Purpose:** Monitors workflow health and creates alerts

**Triggers:**

- Scheduled: Every 6 hours
- Manual workflow dispatch

**Features:**

- Analyzes success rates of recent workflow runs
- Creates GitHub issues for poor health (< 75% success rate)
- Provides detailed statistics and recommendations

### Auto-Retry Failed Workflows (`auto-retry.yml`)

**Purpose:** Automatically retries workflows that fail due to transient errors

**Triggers:**

- When CI/CD Pipeline completes with failure

**Features:**

- Detects transient failures (timeouts, network issues, rate limits)
- Automatically retries up to 2 times
- Creates issue after max retries exceeded

### Performance-Optimized CI (`ci-performance.yml`)

**Purpose:** High-performance CI pipeline with advanced caching

**Features:**

- Matrix-based parallel execution
- Shared dependency caching
- Next.js build cache optimization
- Security scanning with CodeQL

### QA Bot (`qa-bot.yml`)

**Purpose:** Automated quality assurance checks

**Triggers:**

- Push to main/develop
- Pull requests to main

**Features:**

- Code quality checks (lint, types, format)
- Build validation
- Unit and E2E tests
- Security audits
- Test coverage reporting

### Security Bot (`security-bot.yml`)

**Purpose:** Security vulnerability scanning

**Features:**

- Dependency audit
- Security best practices validation

### DevOps Bot (`devops-bot.yml`)

**Purpose:** Automated deployment and infrastructure optimization

**Triggers:**

- Push to main
- Manual deployment

**Features:**

- Vercel deployment
- Knowledge sync
- Failure notifications

### AI-Powered Workflows

- **ai-self-healing.yml** - Automatically fixes common issues
- **ai-team.yml** - AI development team coordination
- **ai-auto-merge.yml** - Intelligent PR auto-merge
- **auto-merge.yml** - Standard auto-merge for approved PRs

## 🔧 Disabled Workflows

The following workflows have been disabled to prevent conflicts and reduce complexity:

- `auto-pilot.yml.disabled` - Autonomous project completion (too aggressive)
- `bot-maintenance.yml.disabled` - Bot maintenance (redundant)
- `enhanced-orchestrator.yml.disabled` - Complex orchestration (conflicts)
- `full-autonomy.yml.disabled` - Full autonomy mode (conflicts)
- `master-orchestrator.yml.disabled` - Master orchestration (conflicts)
- `system-integration-test.yml.disabled` - System integration (covered by CI)

These can be re-enabled individually if needed, but should not run simultaneously.

## 📊 Monitoring & Alerts

### Health Check System

The `health-check.yml` workflow monitors workflow health:

- **🟢 Healthy:** > 90% success rate
- **🟡 Fair:** 75-90% success rate
- **🟠 Warning:** 50-75% success rate
- **🔴 Critical:** < 50% success rate

Alerts are created as GitHub issues when health drops below 75%.

### Auto-Retry System

Failed workflows are automatically retried if:

- Failure is due to transient error (network, timeout, rate limit)
- Less than 3 retry attempts have been made

After 3 failed attempts, an issue is created for manual investigation.

## 🛠️ Troubleshooting

### Common Issues and Solutions

#### Build Failures

**Issue:** `Module not found` errors
**Solution:** Ensure all dependencies are in `package.json` and run `pnpm install`

**Issue:** Build timeout
**Solution:** Increase `timeout-minutes` in workflow or optimize build

#### Test Failures

**Issue:** Tests pass locally but fail in CI
**Solution:** Check for environment-specific issues, ensure test environment is properly configured

**Issue:** Flaky tests
**Solution:** Add retries for E2E tests, investigate and fix root cause

#### Permission Errors

**Issue:** `Resource not accessible by integration`
**Solution:** Check workflow permissions in the workflow file

#### Cache Issues

**Issue:** Slow builds despite caching
**Solution:** Clear cache by updating cache key or manually delete from GitHub

### Debugging Workflows

1. **View workflow runs:** Go to Actions tab in GitHub
2. **Check logs:** Click on failed workflow run → failed job → step
3. **Re-run with debug logging:**
   - Go to workflow run
   - Click "Re-run jobs" → "Enable debug logging"
4. **Manual trigger:** Use "Run workflow" button for testing

### Performance Optimization

#### Caching Strategy

```yaml
# pnpm store cache
- uses: actions/cache@v4
  with:
    path: ~/.local/share/pnpm/store
    key: ${{ runner.os }}-pnpm-${{ hashFiles('**/pnpm-lock.yaml') }}

# Next.js build cache
- uses: actions/cache@v4
  with:
    path: .next/cache
    key: ${{ runner.os }}-nextjs-${{ hashFiles('**/*.{js,ts,tsx}') }}
```

#### Parallel Execution

Jobs that don't depend on each other run in parallel:

- Lint, TypeCheck, Security can run together
- Tests run parallel to build (where possible)

## 🔒 Security Best Practices

### Secrets Management

Required secrets:

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `VERCEL_TOKEN` - Vercel deployment token
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_PROJECT_ID` - Vercel project ID

### Permissions

Workflows use minimal required permissions:

```yaml
permissions:
  contents: read
  pull-requests: write
  checks: write
  security-events: write
```

## 📈 Metrics & KPIs

Track these metrics for CI/CD health:

- **Success Rate:** Target > 90%
- **Average Build Time:** Target < 10 minutes
- **Test Coverage:** Target > 80%
- **Time to Deploy:** Target < 15 minutes
- **MTTR (Mean Time to Repair):** Target < 1 hour

## 🔄 Maintenance Schedule

### Weekly Tasks

- Review workflow health check reports
- Update dependencies via Dependabot PRs
- Check for GitHub Actions updates

### Monthly Tasks

- Review and optimize workflow performance
- Update documentation
- Audit secrets and permissions
- Review disabled workflows for potential re-enabling

### Quarterly Tasks

- Security audit of all workflows
- Review and update best practices
- Major version updates for actions

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Next.js CI/CD Best Practices](https://nextjs.org/docs/deployment)
- [pnpm in CI/CD](https://pnpm.io/continuous-integration)
- [Vercel Deployment](https://vercel.com/docs/deployments/overview)

## 🆘 Getting Help

If workflows are consistently failing:

1. Check the [workflow runs](https://github.com/NeXifiyAI/opencarbox/actions)
2. Review this documentation
3. Check [GitHub Status](https://www.githubstatus.com/)
4. Create an issue with:
   - Workflow name
   - Error message
   - Link to failed run
   - Steps to reproduce
