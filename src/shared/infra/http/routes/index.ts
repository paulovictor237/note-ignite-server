import { Router } from 'express';
import { authenticateRoutes } from './authenticate.routes';
import { carsRouter } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { passwordRoutes } from './password.routes';
import { rentalRoutes } from './rental.routes';
import { specificationsRoutes } from './specification.routes';
import { swagerRoutes } from './swegger.routes';
import { usersRoutes } from './users.routes';

export const router = Router();

router.use(authenticateRoutes);
router.use('/users', usersRoutes);
router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/api-docs', swagerRoutes);
router.use('/cars', carsRouter);
router.use('/rentals', rentalRoutes);
router.use('/password', passwordRoutes);
