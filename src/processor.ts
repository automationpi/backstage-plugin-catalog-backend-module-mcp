import {
  CatalogProcessor,
  CatalogProcessorEmit,
  processingResult,
} from '@backstage/plugin-catalog-node';
import { LocationSpec } from '@backstage/plugin-catalog-common';
import { Entity } from '@backstage/catalog-model';
import { MCPEntity, isMCPEntity, MCP_ENTITY_KIND } from './types';

/**
 * Catalog processor for MCP entities
 */
export class MCPEntityProcessor implements CatalogProcessor {
  getProcessorName(): string {
    return 'MCPEntityProcessor';
  }

  async validateEntityKind(entity: Entity): Promise<boolean> {
    return entity.kind === MCP_ENTITY_KIND;
  }

  async postProcessEntity(
    entity: Entity,
    _location: LocationSpec,
    emit: CatalogProcessorEmit,
  ): Promise<Entity> {
    if (!isMCPEntity(entity)) {
      return entity;
    }

    // Emit relations based on MCP entity configuration
    await this.emitMCPRelations(entity, emit);
    
    // Validate MCP entity structure
    this.validateMCPEntity(entity);

    return entity;
  }

  private async emitMCPRelations(
    entity: MCPEntity,
    emit: CatalogProcessorEmit,
  ): Promise<void> {
    const { metadata, spec } = entity;
    const namespace = metadata.namespace || 'default';

    // Emit ownership relation
    if (spec.owner) {
      emit(
        processingResult.relation({
          source: { kind: entity.kind, namespace, name: metadata.name },
          target: { kind: 'Group', namespace, name: spec.owner },
          type: 'ownedBy',
        }),
      );
    }

    // Emit system relation
    if (spec.system) {
      emit(
        processingResult.relation({
          source: { kind: entity.kind, namespace, name: metadata.name },
          target: { kind: 'System', namespace, name: spec.system },
          type: 'partOf',
        }),
      );
    }

    // Emit dependency relations
    if (spec.dependsOn) {
      for (const dependency of spec.dependsOn) {
        const [kind, name] = dependency.includes(':') 
          ? dependency.split(':') 
          : ['Component', dependency];
        
        emit(
          processingResult.relation({
            source: { kind: entity.kind, namespace, name: metadata.name },
            target: { kind, namespace, name },
            type: 'dependsOn',
          }),
        );
      }
    }

    // Emit consumption relations
    if (spec.consumedBy) {
      for (const consumer of spec.consumedBy) {
        const [kind, name] = consumer.includes(':') 
          ? consumer.split(':') 
          : ['Component', consumer];
        
        emit(
          processingResult.relation({
            source: { kind, namespace, name },
            target: { kind: entity.kind, namespace, name: metadata.name },
            type: 'dependsOn',
          }),
        );
      }
    }

    // Emit API relation if the MCP provides APIs
    if (spec.capabilities.tools && spec.capabilities.tools.length > 0) {
      // Create an implicit API entity name based on the MCP name
      const apiName = `${metadata.name}-api`;
      emit(
        processingResult.relation({
          source: { kind: entity.kind, namespace, name: metadata.name },
          target: { kind: 'API', namespace, name: apiName },
          type: 'providesApi',
        }),
      );
    }
  }

  private validateMCPEntity(entity: MCPEntity): void {
    const { spec } = entity;

    // Validate required fields
    if (!spec.transport) {
      throw new Error(`MCP entity ${entity.metadata.name} must specify a transport`);
    }

    if (!spec.runtime) {
      throw new Error(`MCP entity ${entity.metadata.name} must specify a runtime`);
    }

    if (!spec.type) {
      throw new Error(`MCP entity ${entity.metadata.name} must specify a type`);
    }

    if (!spec.owner) {
      throw new Error(`MCP entity ${entity.metadata.name} must specify an owner`);
    }

    if (!spec.lifecycle) {
      throw new Error(`MCP entity ${entity.metadata.name} must specify a lifecycle`);
    }

    // Validate transport-specific configuration
    if (spec.transport === 'stdio') {
      if (!spec.configuration.command) {
        throw new Error(`MCP entity ${entity.metadata.name} with stdio transport must specify a command`);
      }
    } else if (['sse', 'websocket', 'http'].includes(spec.transport)) {
      if (!spec.configuration.url) {
        throw new Error(`MCP entity ${entity.metadata.name} with ${spec.transport} transport must specify a URL`);
      }
    }

    // Validate capabilities
    const { capabilities } = spec;
    if (!capabilities.tools && !capabilities.resources && !capabilities.prompts) {
      throw new Error(`MCP entity ${entity.metadata.name} must specify at least one capability (tools, resources, or prompts)`);
    }

    // Validate lifecycle values
    const validLifecycles = ['experimental', 'production', 'deprecated'];
    if (!validLifecycles.includes(spec.lifecycle)) {
      throw new Error(`MCP entity ${entity.metadata.name} lifecycle must be one of: ${validLifecycles.join(', ')}`);
    }

    // Validate transport values
    const validTransports = ['stdio', 'sse', 'websocket', 'http'];
    if (!validTransports.includes(spec.transport)) {
      throw new Error(`MCP entity ${entity.metadata.name} transport must be one of: ${validTransports.join(', ')}`);
    }

    // Validate runtime values
    const validRuntimes = ['node', 'python', 'go', 'csharp', 'rust', 'java'];
    if (!validRuntimes.includes(spec.runtime)) {
      throw new Error(`MCP entity ${entity.metadata.name} runtime must be one of: ${validRuntimes.join(', ')}`);
    }

    // Validate type values
    const validTypes = ['data-connector', 'tool-provider', 'workflow-automation', 'api-integration', 'file-processor'];
    if (!validTypes.includes(spec.type)) {
      throw new Error(`MCP entity ${entity.metadata.name} type must be one of: ${validTypes.join(', ')}`);
    }
  }
}