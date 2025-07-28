# @mexl/backstage-plugin-catalog-backend-module-mcp

Add **MCP (Model Context Protocol) entity support** to your Backstage software catalog.

[![NPM Version](https://img.shields.io/npm/v/@mexl/backstage-plugin-catalog-backend-module-mcp)](https://www.npmjs.com/package/@mexl/backstage-plugin-catalog-backend-module-mcp)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## 🌟 Features

- **Complete MCP Entity Kind**: Full support for MCP servers in your Backstage catalog
- **Rich Validation**: Comprehensive validation for MCP entity configurations
- **Relationship Modeling**: Automatic relationship generation (dependencies, ownership, API provision)
- **Multi-Transport Support**: stdio, SSE, WebSocket, and HTTP transports
- **Multiple Runtimes**: Node.js, Python, Go, C#, Rust, and Java
- **Search Integration**: Automatic inclusion in Backstage search
- **Comprehensive Examples**: 5 real-world examples included

## 🚀 Quick Start

### Installation

```bash
yarn add @mexl/backstage-plugin-catalog-backend-module-mcp
```

### Backend Integration

Add the MCP module to your Backstage backend:

```typescript
// packages/backend/src/index.ts
import { createBackend } from '@backstage/backend-defaults';

const backend = createBackend();

// ... other plugins

// Add MCP catalog module
backend.add(import('@mexl/backstage-plugin-catalog-backend-module-mcp'));

backend.start();
```

### Configuration

Update your `app-config.yaml` to allow MCP entities:

```yaml
catalog:
  rules:
    - allow: [Component, System, API, Resource, Location, MCP]
  locations:
    # Add your MCP entities
    - type: file
      target: ../../mcp-entities.yaml
      rules:
        - allow: [MCP]
```

## 📋 Entity Schema

MCP entities follow this schema:

```yaml
apiVersion: backstage.io/v1alpha1
kind: MCP
metadata:
  name: my-mcp-server
  description: "Description of your MCP server"
spec:
  # Transport method
  transport: stdio | sse | websocket | http
  
  # Runtime environment  
  runtime: node | python | go | csharp | rust | java
  
  # Server type
  type: data-connector | tool-provider | workflow-automation | api-integration | file-processor
  
  # Lifecycle stage
  lifecycle: experimental | production | deprecated
  
  # Ownership
  owner: team-name
  system: system-name  # optional
  
  # Capabilities
  capabilities:
    tools: ["tool1", "tool2"]           # Functions provided
    resources: ["resource1", "resource2"] # Data accessible  
    prompts: ["prompt1", "prompt2"]     # Template prompts
  
  # Connection configuration
  configuration:
    command: "npx"                      # For stdio transport
    args: ["-y", "@my/mcp-server"]
    url: "https://my-server.com/mcp"    # For remote transports
    timeout: 30000
    env:
      - name: "API_KEY"
        valueFrom: "secret"
  
  # Authentication (optional)
  authentication:
    type: oauth2 | api-key | bearer | basic | none
    provider: "oauth-provider"
    config:
      scopes: ["read", "write"]
  
  # Relationships (optional)
  dependsOn: ["api:weather-api", "database"]
  consumedBy: ["component:my-app"]
```

## 📚 Examples

### Basic stdio MCP Server

```yaml
apiVersion: backstage.io/v1alpha1
kind: MCP
metadata:
  name: simple-file-mcp
  description: "Simple file operations MCP server"
spec:
  transport: stdio
  runtime: node
  type: file-processor
  lifecycle: production
  owner: platform-team
  capabilities:
    tools: ["read_file", "write_file", "list_files"]
  configuration:
    command: "npx"
    args: ["-y", "@my-org/file-mcp"]
    timeout: 30000
```

### Remote HTTP MCP Server

```yaml
apiVersion: backstage.io/v1alpha1
kind: MCP
metadata:
  name: api-integration-mcp
  description: "API integration MCP server"
spec:
  transport: http
  runtime: python
  type: api-integration
  lifecycle: production
  owner: integration-team
  capabilities:
    tools: ["call_api", "transform_data"]
    resources: ["api_schemas", "response_cache"]
  configuration:
    url: "https://api-mcp.company.com/v1"
    timeout: 45000
  authentication:
    type: oauth2
    provider: "company-sso"
  dependsOn: ["api:external-service"]
```

See [examples/](./examples/) directory for comprehensive examples including all transport types and configurations.

## 🔧 Development

### Local Development

```bash
# Clone the repository
git clone https://github.com/mexl/backstage-plugin-mcp.git
cd backstage-plugin-mcp

# Install dependencies
yarn install

# Build the plugin
yarn build

# Run tests
yarn test

# Lint code
yarn lint
```

### Testing in Backstage

1. Build the plugin: `yarn build`
2. Link locally: `yarn link`
3. In your Backstage app: `yarn link @mexl/backstage-plugin-catalog-backend-module-mcp`
4. Add to backend as shown in Quick Start
5. Restart Backstage

## 🎯 Use Cases

### Prevent MCP Duplication
- **Problem**: Teams creating duplicate MCP servers
- **Solution**: Central catalog shows existing MCPs before building new ones

### MCP Discovery
- **Search**: `kind:MCP runtime:python` finds all Python MCP servers
- **Browse**: Filter catalog by MCP entities
- **Dependencies**: See what components use specific MCPs

### Integration Planning
- **Architecture**: Understand MCP relationships in your system  
- **Capacity**: See which MCPs are heavily used
- **Migration**: Plan runtime or transport changes

### Governance
- **Lifecycle**: Track experimental → production → deprecated
- **Ownership**: Clear responsibility for MCP maintenance
- **Standards**: Ensure consistency across MCP implementations

## 🔗 Entity Relationships

The plugin automatically creates these relationships:

- **ownedBy**: Links MCP to owner team/group
- **partOf**: Links MCP to parent system  
- **dependsOn**: Links to APIs, databases, etc.
- **providesApi**: Auto-created API entities for MCPs with tools
- **consumedBy**: Reverse dependency tracking

## 🔍 Search Integration

MCP entities are automatically searchable:

```bash
# Find all MCP servers
kind:MCP

# Find by runtime
kind:MCP runtime:python

# Find by transport  
kind:MCP transport:stdio

# Find by capabilities
kind:MCP tools:weather

# Find by team
kind:MCP owner:platform-team

# Combined searches
kind:MCP runtime:node transport:stdio lifecycle:production
```

## 🐛 Troubleshooting

### Plugin Not Loading
- Verify the module is imported in `packages/backend/src/index.ts`
- Check backend logs for "Registering MCP entity processor"
- Ensure plugin is built: `yarn build`

### Entities Not Appearing
- Verify `MCP` is in catalog rules: `allow: [MCP]`
- Check entity validation errors in backend logs
- Ensure required fields are present (transport, runtime, type, owner, lifecycle)

### Type Errors
- Ensure compatible Backstage versions
- Check peer dependencies match your Backstage version
- Rebuild after updates: `yarn build`

## 📖 API Reference

### MCPEntityProcessor

The main processor class that handles MCP entity validation and relationship creation.

### Types

- `MCPEntity`: Complete MCP entity interface
- `MCPEntitySpec`: MCP specification interface  
- `MCPTransport`: Transport method union type
- `MCPRuntime`: Runtime environment union type
- `MCPServerType`: Server type union type
- `MCPCapabilities`: Capabilities interface
- `MCPConfiguration`: Connection configuration interface
- `MCPAuthentication`: Authentication configuration interface

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

Apache License 2.0 - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/@mexl/backstage-plugin-catalog-backend-module-mcp)
- [GitHub Repository](https://github.com/mexl/backstage-plugin-mcp)
- [Backstage.io](https://backstage.io/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Issues & Support](https://github.com/mexl/backstage-plugin-mcp/issues)

---

**Made with ❤️ for the Backstage community**