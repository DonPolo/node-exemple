import express from 'express';

import TestRoutes from './test.routes';
import WebappRoutes from './webapp.routes';

const routes = express.Router();

// Test routes for the console
routes.use('/test', TestRoutes);

// Webapp routes to modified responses and training
routes.use('/webapp', WebappRoutes);

export default routes;
