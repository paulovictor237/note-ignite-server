import { Router } from 'express';
import swagerUI from 'swagger-ui-express';
import swaggerFile from '../../../../swagger.json';

export const swagerRoutes = Router();

swagerRoutes.use(swagerUI.serve, swagerUI.setup(swaggerFile));
