# Branch Protection Setup

## Manual Setup Required

GitHub public repositories do **NOT** have automatic branch protection. You must configure it manually:

### Steps to Enable Branch Protection:

1. **Go to Repository Settings**
   - Navigate to your repository
   - Click "Settings" tab
   - Click "Branches" in left sidebar

2. **Add Branch Protection Rule**
   - Click "Add rule"
   - Branch name pattern: `main` (or `master`)

3. **Recommended Protection Settings**
   - ✅ **Require a pull request before merging**
     - ✅ Require approvals: 1
     - ✅ Dismiss stale PR approvals when new commits are pushed
   - ✅ **Require status checks to pass before merging**
     - ✅ Require branches to be up to date before merging
     - Add required status checks: `test (18.x)`, `test (20.x)`
   - ✅ **Require conversation resolution before merging**
   - ✅ **Include administrators** (applies rules to repo admins too)

4. **Optional Advanced Settings**
   - ✅ **Restrict pushes that create files** (if you want to prevent large files)
   - ✅ **Allow force pushes** (disable for stricter control)
   - ✅ **Allow deletions** (disable to prevent accidental branch deletion)

### Why Branch Protection Matters:
- Prevents direct pushes to main
- Ensures CI checks pass before merge
- Requires code review
- Maintains code quality

### Alternative: GitHub CLI Setup
```bash
gh api repos/mexl/backstage-plugin-mcp/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["test (18.x)","test (20.x)"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field restrictions=null
```