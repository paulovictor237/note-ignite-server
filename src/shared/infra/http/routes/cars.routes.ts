import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/createCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecificaiton/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvaliableCars/ListAvailableCarsController';
import { UploadCarImageController } from '@modules/cars/useCases/uploadCarImage/UploadCarImageController';
import { Router } from 'express';
import multer from 'multer';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const carsRouter = Router();

let createCarController = new CreateCarController();
let listAvailableCarsController = new ListAvailableCarsController();
let createCarSpecificationController = new CreateCarSpecificationController();
let uploadCarImageController = new UploadCarImageController();

const upload = multer(uploadConfig);

carsRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRouter.get('/available', listAvailableCarsController.handle);

carsRouter.get(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRouter.get(
  '/images',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarImageController.handle
);
