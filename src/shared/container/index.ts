import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokensRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { CategoryRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository';
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { RentalsRepository } from '@modules/retals/infra/typeorm/repositories/RentalsRepositoty';
import { IRentalsRepository } from '@modules/retals/repositories/IRentalsRepository';
import '@shared/container/providers';
import { container } from 'tsyringe';
import { LocalStorageProvider } from './providers/StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './providers/StorageProvider/implementations/S3StorageProvider';
import { IStorageProvider } from './providers/StorageProvider/IStorageProvider';

// ICategoriesRepository
container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<IUsersRepository>('UserRepository', UserRepository);

container.registerSingleton<ICarImagesRepository>(
  'ImagesRepository',
  CarsImagesRepository
);

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository
);
