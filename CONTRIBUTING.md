# Contributing to @mexl/backstage-plugin-catalog-backend-module-mcp

Thank you for your interest in contributing! This guide will help you get started with contributing to the MCP Backstage plugin.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or 20.x
- Yarn package manager
- Git

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/backstage-plugin-mcp.git
   cd backstage-plugin-mcp
   ```

2. **Install Dependencies**
   ```bash
   yarn install
   ```

3. **Build the Plugin**
   ```bash
   yarn build
   ```

4. **Run Tests**
   ```bash
   yarn test
   ```

## 🔧 Development Workflow

### Making Changes

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation if needed

3. **Test Your Changes**
   ```bash
   yarn build
   yarn test
   yarn tsc --noEmit  # Type checking
   ```

4. **Local Testing**
   ```bash
   # Test the package can be built
   yarn pack --dry-run
   
   # Link for local testing in a Backstage app
   yarn link
   cd /path/to/your/backstage/app
   yarn link @mexl/backstage-plugin-catalog-backend-module-mcp
   ```

### Code Style

- **TypeScript**: All code should be written in TypeScript
- **Formatting**: Code is automatically formatted on commit
- **Linting**: Follow ESLint rules
- **Imports**: Use absolute imports where possible

### Commit Messages

Follow conventional commit format:

```
type(scope): description

Examples:
feat: add support for WebSocket transport
fix: resolve validation error for stdio transport
docs: update README examples
test: add tests for MCPEntityProcessor
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test --watch

# Run with coverage
yarn test --coverage
```

### Writing Tests

- Place tests next to the code they test (`*.test.ts`)
- Mock external dependencies
- Test both success and error cases
- Ensure good test coverage

Example test:

```typescript
import { MCPEntityProcessor } from './processor';

describe('MCPEntityProcessor', () => {
  let processor: MCPEntityProcessor;

  beforeEach(() => {
    processor = new MCPEntityProcessor();
  });

  it('should validate MCP entities correctly', async () => {
    const entity = {
      apiVersion: 'backstage.io/v1alpha1',
      kind: 'MCP',
      metadata: { name: 'test-mcp' },
      spec: {
        transport: 'stdio',
        runtime: 'node',
        type: 'tool-provider',
        lifecycle: 'production',
        owner: 'team-a',
        capabilities: { tools: ['test'] },
        configuration: { command: 'node', args: ['server.js'] }
      }
    };

    const result = await processor.validateEntityKind(entity);
    expect(result).toBe(true);
  });
});
```

## 📝 Documentation

### README Updates

When adding features:
- Update the main README.md
- Add examples if applicable
- Update the API reference section

### Code Documentation

- Add JSDoc comments for public APIs
- Include usage examples in complex functions
- Document breaking changes in CHANGELOG.md

## 🚀 Pull Request Process

### Before Submitting

- [ ] Tests pass (`yarn test`)
- [ ] Build succeeds (`yarn build`)
- [ ] Type checking passes (`yarn tsc --noEmit`)
- [ ] Documentation updated
- [ ] CHANGELOG.md updated (for notable changes)

### PR Guidelines

1. **Title**: Use descriptive title following conventional commit format
2. **Description**: 
   - Explain what changed and why
   - Link to related issues
   - Include testing instructions
3. **Scope**: Keep PRs focused and atomic
4. **Reviews**: Request review from maintainers

### PR Template

```markdown
## Summary
Brief description of changes

## Changes Made
- List of changes
- Another change

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] No breaking changes

## Documentation
- [ ] README updated
- [ ] API docs updated
- [ ] Examples added/updated
```

## 🐛 Reporting Issues

### Bug Reports

Include:
- Plugin version
- Backstage version
- Node.js version
- Steps to reproduce
- Expected vs actual behavior
- Error messages/logs

### Feature Requests

Include:
- Use case description
- Proposed solution
- Alternative solutions considered
- Impact on existing functionality

## 🎯 Areas for Contribution

### High Priority
- Additional transport method support
- Enhanced validation rules
- Performance improvements
- Documentation improvements

### Medium Priority
- Additional examples
- Integration tests
- CLI tools for MCP management
- Migration utilities

### Good First Issues
- Documentation fixes
- Example improvements
- Test coverage increases
- Type definition enhancements

## 📋 Release Process

### Version Management

- Follow semantic versioning (semver)
- Update package.json version
- Update CHANGELOG.md
- Create git tag
- GitHub release triggers NPM publication

### Release Checklist

- [ ] All tests pass
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version bumped in package.json
- [ ] Git tag created
- [ ] GitHub release created

## 🤝 Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Assume positive intent

### Getting Help

- Create an issue for bugs or feature requests
- Start discussions for questions
- Check existing issues before creating new ones
- Provide minimal reproducible examples

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the Apache License 2.0.

---

Thank you for contributing to the MCP Backstage plugin! 🎉