# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-07-28

### Added
- Initial release of MCP entity kind support for Backstage
- Complete TypeScript type definitions for MCP entities
- Catalog processor with comprehensive validation
- Support for all MCP transport methods (stdio, sse, websocket, http)
- Support for multiple runtime environments (node, python, go, csharp, rust, java)
- Rich relationship modeling (ownedBy, partOf, dependsOn, providesApi)
- Automatic search integration
- 5 comprehensive example MCP entities
- Complete documentation and usage guide

### Features
- **Entity Types**: Complete MCP entity schema with validation
- **Transports**: stdio, SSE, WebSocket, HTTP support
- **Runtimes**: Node.js, Python, Go, C#, Rust, Java
- **Server Types**: data-connector, tool-provider, workflow-automation, api-integration, file-processor
- **Authentication**: oauth2, api-key, bearer, basic, none
- **Capabilities**: tools, resources, prompts tracking
- **Relationships**: Automatic relationship generation
- **Validation**: Comprehensive field and enum validation
- **Examples**: Production-ready example configurations