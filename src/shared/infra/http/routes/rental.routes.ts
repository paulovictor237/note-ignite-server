import { CreateRentalController } from '@modules/retals/useCases/CreateRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/retals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/retals/useCases/ListRentalsByUser/ListRentalsByUserControler';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle
);
rentalRoutes.get(
  '/user',
  ensureAuthenticated,
  listRentalsByUserController.handle
);
