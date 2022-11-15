import { AppError } from '@errors/AppError';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './createCarUseCase';

const generateCar = {
  name: 'Name Car',
  description: 'Description Car',
  daily_rate: 100,
  license_plate: 'ABC-1234',
  fine_amunt: 60,
  brand: 'Brand',
  category_id: 'category',
};

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });
  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute(generateCar);
    expect(car).toHaveProperty('id');
  });
  it('should be able to create a car with exists license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({ ...generateCar, name: 'new car1' });
      await createCarUseCase.execute({ ...generateCar, name: 'new car2' });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute(generateCar);
    expect(car.available).toBe(true);
  });
});
