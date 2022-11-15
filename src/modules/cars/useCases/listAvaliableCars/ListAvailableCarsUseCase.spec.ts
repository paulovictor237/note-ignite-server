import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

const generateCar = {
  name: 'Name Car',
  description: 'Description Car',
  daily_rate: 100,
  license_plate: 'ABC-1233',
  fine_amunt: 60,
  brand: 'Brand',
  category_id: '3e7a07c2-56ca-4fec-b360-130d4e7744bc',
};

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });
  it('shoud be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create(generateCar);
    const cars = await listCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it('shoud be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create(generateCar);
    const cars = await listCarsUseCase.execute({
      name: 'Name Car',
    });
    expect(cars).toEqual([car]);
  });
  it('shoud be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create(generateCar);
    const cars = await listCarsUseCase.execute({
      brand: 'Brand',
    });
    expect(cars).toEqual([car]);
  });
  it('shoud be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create(generateCar);
    const cars = await listCarsUseCase.execute({
      category_id: '3e7a07c2-56ca-4fec-b360-130d4e7744bc',
    });
    expect(cars).toEqual([car]);
  });
});
