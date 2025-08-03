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
export type MCPServerType = 'data-connector' | 'tool-provider' | 'workflow-automation' | 'api-integration' | 'file-processor' | 'agent-services' | 'domain-tools' | 'analysis-framework';

/**
 * Authentication methods for MCP servers
 */
export type MCPAuthType = 'oauth2' | 'api-key' | 'none' | 'basic' | 'bearer';

/**
 * Individual tool configuration
 */
export interface MCPTool {
  /** Tool name */
  name: string;
  /** Tool description */
  description?: string;
  /** Whether tool is enabled */
  enabled?: boolean;
  /** Tool-specific configuration */
  config?: Record<string, any>;
  /** Rate limits for this tool */
  rateLimit?: {
    requestsPerMinute?: number;
    requestsPerHour?: number;
  };
}

/**
 * Individual resource configuration
 */
export interface MCPResource {
  /** Resource name */
  name: string;
  /** Resource description */
  description?: string;
  /** Resource access permissions */
  permissions?: ('read' | 'write' | 'delete')[];
  /** Resource-specific configuration */
  config?: Record<string, any>;
}

/**
 * Individual prompt configuration
 */
export interface MCPPrompt {
  /** Prompt name */
  name: string;
  /** Prompt description */
  description?: string;
  /** Prompt template */
  template?: string;
  /** Required parameters */
  parameters?: string[];
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
 * API Key authentication configuration
 */
export interface MCPApiKeyAuth {
  /** Where to place the API key */
  keyLocation: 'header' | 'query' | 'env';
  /** Name of the header/query parameter/env variable */
  keyName: string;
  /** Source of the key value */
  keySource: 'secret' | 'env' | 'static';
  /** Static key value (if keySource is 'static') */
  keyValue?: string;
}

/**
 * OAuth2 authentication configuration
 */
export interface MCPOAuth2Auth {
  /** OAuth2 provider */
  provider: string;
  /** Client ID */
  clientId: string;
  /** OAuth2 scopes */
  scopes?: string[];
  /** Token endpoint URL */
  tokenUrl?: string;
}

/**
 * Authentication configuration for MCP servers
 */
export interface MCPAuthentication {
  /** Type of authentication */
  type: MCPAuthType;
  /** API key configuration (if type is 'api-key') */
  apiKey?: MCPApiKeyAuth;
  /** OAuth2 configuration (if type is 'oauth2') */
  oauth2?: MCPOAuth2Auth;
  /** Basic auth configuration (if type is 'basic') */
  basic?: {
    username: string;
    passwordSource: 'secret' | 'env';
  };
  /** Bearer token configuration (if type is 'bearer') */
  bearer?: {
    tokenSource: 'secret' | 'env';
  };
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
  
  /** Rich metadata for better categorization */
  metadata?: {
    /** Tags for categorization and filtering */
    tags?: string[];
    /** Pricing information */
    pricing?: {
      model: 'free' | 'freemium' | 'paid' | 'enterprise';
      details?: string;
    };
    /** Rate limits and quotas */
    limits?: {
      requestsPerMinute?: number;
      requestsPerHour?: number;
      requestsPerDay?: number;
      maxConcurrentConnections?: number;
    };
    /** Support and documentation links */
    support?: {
      documentation?: string;
      community?: string;
      issues?: string;
      examples?: string;
    };
    /** Maturity and reliability indicators */
    maturity?: {
      stability: 'alpha' | 'beta' | 'stable' | 'mature';
      lastUpdated?: string;
      maintenanceStatus: 'active' | 'maintenance' | 'deprecated';
    };
  };
  
  /** Configuration for connecting to the server */
  configuration: MCPConfiguration;
  
  /** Authentication configuration */
  authentication?: MCPAuthentication;
  
  /** Integration guidance and setup help */
  integration?: {
    /** Quick start command or script */
    quickStart?: string;
    /** Setup instructions */
    setupInstructions?: string[];
    /** Configuration examples */
    examples?: {
      name: string;
      description: string;
      configuration: any;
    }[];
    /** Prerequisites and requirements */
    prerequisites?: string[];
    /** Common troubleshooting issues */
    troubleshooting?: {
      issue: string;
      solution: string;
    }[];
  };
  
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