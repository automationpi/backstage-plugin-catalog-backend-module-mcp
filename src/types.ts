import { Entity } from '@backstage/catalog-model';

/**
 * Transport methods supported by MCP servers
 */
export type MCPTransport = 'stdio' | 'sse' | 'websocket' | 'http';

/**
 * Runtime environments for MCP servers
 */
export type MCPRuntime = 'node' | 'python' | 'go' | 'csharp' | 'rust' | 'java';

/**
 * MCP server types based on functionality
 */
export type MCPServerType = 'data-connector' | 'tool-provider' | 'workflow-automation' | 'api-integration' | 'file-processor';

/**
 * Authentication methods for MCP servers
 */
export type MCPAuthType = 'oauth2' | 'api-key' | 'none' | 'basic' | 'bearer';

/**
 * Tool definition with optional description
 */
export interface MCPTool {
  /** Tool name/identifier */
  name: string;
  /** Human-readable description of what the tool does */
  description?: string;
}

/**
 * Resource definition with optional description
 */
export interface MCPResource {
  /** Resource name/identifier */
  name: string;
  /** Human-readable description of the resource */
  description?: string;
}

/**
 * Prompt template definition with optional description
 */
export interface MCPPrompt {
  /** Prompt name/identifier */
  name: string;
  /** Human-readable description of the prompt */
  description?: string;
}

/**
 * Capabilities that an MCP server can provide
 */
export interface MCPCapabilities {
  /** Functions/tools that the MCP server exposes */
  tools?: (string | MCPTool)[];
  /** Resources/data that the MCP server can access */
  resources?: (string | MCPResource)[];
  /** Pre-written prompt templates */
  prompts?: (string | MCPPrompt)[];
}

/**
 * Configuration for connecting to an MCP server
 */
export interface MCPConfiguration {
  /** Command to start the server (for stdio transport) */
  command?: string;
  /** Arguments for the command */
  args?: string[];
  /** Environment variables */
  env?: Array<{
    name: string;
    value?: string;
    valueFrom?: 'secret' | 'configmap';
  }>;
  /** Connection timeout in milliseconds */
  timeout?: number;
  /** Server URL (for remote transports) */
  url?: string;
}

/**
 * Authentication configuration for MCP servers
 */
export interface MCPAuthentication {
  /** Type of authentication */
  type: MCPAuthType;
  /** OAuth2 provider (if applicable) */
  provider?: string;
  /** Configuration specific to auth type */
  config?: Record<string, any>;
}

/**
 * MCP Entity specification
 */
export interface MCPEntitySpec extends Record<string, any> {
  /** Transport method used by the MCP server */
  transport: MCPTransport;
  
  /** Runtime environment */
  runtime: MCPRuntime;
  
  /** Type/category of MCP server */
  type: MCPServerType;
  
  /** Server capabilities */
  capabilities: MCPCapabilities;
  
  /** Repository URL where the MCP server is hosted */
  repository?: string;
  
  /** Registry entry URL (e.g., PulseMCP) */
  registryEntry?: string;
  
  /** Version of the MCP server */
  version?: string;
  
  /** Configuration for connecting to the server */
  configuration: MCPConfiguration;
  
  /** Authentication configuration */
  authentication?: MCPAuthentication;
  
  /** Lifecycle stage */
  lifecycle: 'experimental' | 'production' | 'deprecated';
  
  /** Owner of the MCP server */
  owner: string;
  
  /** System this MCP belongs to */
  system?: string;
  
  /** Other entities this MCP depends on */
  dependsOn?: string[];
  
  /** Entities that consume this MCP */
  consumedBy?: string[];
}

/**
 * MCP Entity definition
 */
export interface MCPEntity extends Entity {
  apiVersion: 'backstage.io/v1alpha1';
  kind: 'MCP';
  spec: MCPEntitySpec;
}

/**
 * Type guard to check if an entity is an MCP entity
 */
export function isMCPEntity(entity: Entity): entity is MCPEntity {
  return entity.kind === 'MCP';
}

/**
 * Constant for the MCP entity kind
 */
export const MCP_ENTITY_KIND = 'MCP' as const;