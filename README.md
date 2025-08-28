[![NPM Version](https://img.shields.io/npm/v/@mexl/backstage-plugin-catalog-backend-module-mcp)](https://www.npmjs.com/package/@mexl/backstage-plugin-catalog-backend-module-mcp)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)


# @mexl/backstage-plugin-catalog-backend-module-mcp

_Add full Model Context Protocol (MCP) entity support to your Backstage software catalog. Enable discovery and reuse of MCP servers across your organization, centralizing AI tool management and reducing duplication. Teams can easily find, share, and integrate MCP capabilities._

---

## Features

- Comprehensive support for MCP (Model Context Protocol) entities as a native kind in Backstage
- Configuration validation for MCP entities
- Automatic modeling of relationships (dependencies, ownership, API provision)
- Multi-transport: stdio, SSE, WebSocket, HTTP
- Multiple runtimes supported: Node.js, Python, Go, C#, Rust, Java
- Automatic search integration in Backstage
- Real-world, production-ready example YAMLs included

<img width="1591" height="675" alt="image" src="https://github.com/user-attachments/assets/ebe87bb9-109c-4249-a5e0-2987813081f8" />

New entity type in backstage

## Getting Started

### 1. Install the Backend Plugin

```sh
yarn --cwd packages/backend add @mexl/backstage-plugin-catalog-backend-module-mcp

```

### 2. Register the MCP Backend Module

In your `packages/backend/src/index.ts`:

```ts
import { createBackend } from '@backstage/backend-defaults';

const backend = createBackend();

backend.add(import('@backstage/plugin-app-backend'));
backend.add(import('@backstage/plugin-proxy-backend'));
backend.add(import('@backstage/plugin-scaffolder-backend'));
backend.add(import('@backstage/plugin-techdocs-backend'));

// Add MCP catalog module
backend.add(import('@mexl/backstage-plugin-catalog-backend-module-mcp'));

backend.start();
```

> **Note:** Requires Backstage version 1.0.0 or higher.

### 3. Configure MCP Entity Support

In `app-config.yaml`, add MCP to your allowed kinds and catalog locations:

```yaml
catalog:
  rules:
    - allow: [Component, System, API, Resource, Location, MCP]  # Add MCP here
  locations:
    - type: file
      target: ../../catalog-info/mcp-entities.yaml
      rules:
        - allow: [MCP]
```

> **Note:** This backend plugin provides the MCP entity support and catalog integration. To visualize MCP entities with rich UI components, you'll also need to install the [frontend plugin](https://github.com/automationpi/backstage-plugin-mcp-frontend).

## Test it

### Define Your First MCP Entity

Create `catalog-info/mcp-entities.yaml`:

```yaml
apiVersion: backstage.io/v1alpha1
kind: MCP
metadata:
  name: my-first-mcp
  description: "My first MCP server for file operations"
spec:
  transport: stdio
  runtime: node
  type: file-processor
  lifecycle: experimental
  owner: my-team
  capabilities:
    tools: ["read_file", "write_file", "list_files"]
  configuration:
    command: "npx"
    args: ["-y", "@my-org/file-mcp-server"]
    timeout: 30000
```

### Install Frontend Plugin for Visualization

**Important:** While this backend plugin enables MCP entities in your catalog, you'll need the frontend plugin to visualize them with enhanced UI cards:

```sh
yarn --cwd packages/app add @mexl/backstage-plugin-mcp-frontend
```

See the [frontend plugin documentation](https://github.com/automationpi/backstage-plugin-mcp-frontend) for complete setup instructions.

### Restart Backstage

```sh
yarn dev
```

### Verify Installation

- Visit your Backstage instance, open Catalog
- Filter by `Kind = MCP`
- You should see your MCP entity listed
- If you've installed the frontend plugin, clicking on an MCP entity will show rich UI cards with capabilities, configuration, and interactive features

---

## Example: MCP Entity Schema

MCP entities use this schema:

```yaml
apiVersion: backstage.io/v1alpha1
kind: MCP
metadata:
  name: my-mcp-server
  description: "Description of your MCP server"
spec:
  transport: stdio | sse | websocket | http
  runtime: node | python | go | csharp | rust | java
  type: data-connector | tool-provider | workflow-automation | api-integration | file-processor
  lifecycle: experimental | production | deprecated
  owner: team-name
  system: system-name
  capabilities:
    tools: ["tool1", "tool2"]
    resources: ["resource1", "resource2"]
    prompts: ["prompt1", "prompt2"]
  configuration:
    command: "npx"
    args: ["-y", "@my/mcp-server"]
    url: "https://my-server.com/mcp"
    timeout: 30000
    env:
      - name: "API_KEY"
        valueFrom: "secret"
  authentication:
    type: oauth2 | api-key | bearer | basic | none
    provider: "oauth-provider"
    config:
      scopes: ["read", "write"]
  dependsOn: ["api:weather-api", "database"]
  consumedBy: ["component:my-app"]
```

## Example: Example MCP Entity YAMLs

```yaml
# Basic stdio MCP Server
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

```yaml
# Remote HTTP MCP Server
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

See the `examples/` directory for more sample configurations.

---

## Complete Setup

For a complete MCP implementation in Backstage, you'll need:

1. **This backend plugin** - Provides MCP entity support and catalog integration
2. **[Frontend plugin](https://github.com/automationpi/backstage-plugin-mcp-frontend)** - Adds rich UI cards and visualization for MCP entities

Both plugins work together to provide a comprehensive MCP experience in your Backstage instance.

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## License

Apache License 2.0 

## Related Links

- [Frontend Plugin (Required for UI)](https://github.com/automationpi/backstage-plugin-mcp-frontend)
- [NPM Package](https://www.npmjs.com/package/@mexl/backstage-plugin-catalog-backend-module-mcp)
- [Backstage.io](https://backstage.io)
- [Model Context Protocol](https://modelcontextprotocol.io)
- Issues & Support: [GitHub Issues](https://github.com/automationpi/backstage-plugin-catalog-backend-module-mcp/issues)
