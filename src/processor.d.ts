import { CatalogProcessor, CatalogProcessorEmit } from '@backstage/plugin-catalog-node';
import { LocationSpec } from '@backstage/plugin-catalog-common';
import { Entity } from '@backstage/catalog-model';
/**
 * Catalog processor for MCP entities
 */
export declare class MCPEntityProcessor implements CatalogProcessor {
    getProcessorName(): string;
    validateEntityKind(entity: Entity): Promise<boolean>;
    postProcessEntity(entity: Entity, _location: LocationSpec, emit: CatalogProcessorEmit): Promise<Entity>;
    private emitMCPRelations;
    private validateMCPEntity;
}
