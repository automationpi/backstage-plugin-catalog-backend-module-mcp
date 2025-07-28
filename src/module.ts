import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';
import { catalogProcessingExtensionPoint } from '@backstage/plugin-catalog-node/alpha';
import { MCPEntityProcessor } from './processor';

/**
 * Catalog backend module for MCP entities
 * 
 * @public
 */
export const catalogModuleMCP = createBackendModule({
  pluginId: 'catalog',
  moduleId: 'mcp',
  register(reg) {
    reg.registerInit({
      deps: {
        catalog: catalogProcessingExtensionPoint,
        logger: coreServices.logger,
      },
      async init({ catalog, logger }) {
        logger.info('Registering MCP entity processor');
        catalog.addProcessor(new MCPEntityProcessor());
      },
    });
  },
});

/**
 * @public
 * @deprecated Use `catalogModuleMCP` instead
 */
export default catalogModuleMCP;