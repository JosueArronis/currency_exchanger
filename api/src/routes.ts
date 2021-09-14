import { Express } from 'express';
// ROUTES CONTROLLERS
import health_controller from './controllers/health.controller';
import quote_controller from './controllers/quote.controller';

const routes = (app: Express): void => {
  app.use('/api/v1/health', health_controller);
  app.use('/api/v1/quote', quote_controller);
};
export default routes;
