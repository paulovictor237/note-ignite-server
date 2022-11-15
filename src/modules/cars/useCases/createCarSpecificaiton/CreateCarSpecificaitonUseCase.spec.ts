import { AppError } from '@errors/AppError';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { CreateCarSpecificaitonUseCase } from './CreateCarSpecificaitonUseCase';
const generateCar = {
  name: 'Name Car',
  description: 'Description Car',
  daily_rate: 100,
  license_plate: 'ABC-1233',
  fine_amunt: 60,
  brand: 'Brand',
  category_id: '3e7a07c2-56ca-4fec-b360-130d4e7744bc',
};
let createCarSpecification: CreateCarSpecificaitonUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
describe('Create car specifications', () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecification = new CreateCarSpecificaitonUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });
  it('shuld not be able to createa new specification', () => {
    expect(async () => {
      const car_id = '123';
      const specifications_id = ['54321'];
      await createCarSpecification.execute({ car_id, specifications_id });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('shuld be able to createa new specification', async () => {
    const car = await carsRepositoryInMemory.create(generateCar);
    const car_id = car.id;
    const specification = await specificationsRepositoryInMemory.create({
      description: 'test',
      name: 'test',
    });
    const specifications_id = [specification.id];
    const specificationsCars = await createCarSpecification.execute({
      car_id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
