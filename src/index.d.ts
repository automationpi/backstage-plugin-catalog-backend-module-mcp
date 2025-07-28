/**
 * Catalog backend module for MCP (Model Context Protocol) entities
 *
 * @packageDocumentation
 */
export { catalogModuleMCP as default } from './module';
export { catalogModuleMCP } from './module';
export { MCPEntityProcessor } from './processor';
export type { MCPEntity, MCPEntitySpec, MCPCapabilities, MCPConfiguration, MCPAuthentication, MCPTransport, MCPRuntime, MCPServerType, MCPAuthType, } from './types';
export { isMCPEntity, MCP_ENTITY_KIND } from './types';
