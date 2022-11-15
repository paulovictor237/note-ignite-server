import { AppError } from '@errors/AppError';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/retals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import dayjs from 'dayjs';
import { CreateRentalUseCase } from './CreateRentalUseCase';

const datAdd24Hours = dayjs().add(1, 'day').toDate();

const rentalGenerated = {
  car_id: '123',
  user_id: '123',
  expect_return_date: datAdd24Hours,
};

const carGenerated = {
  name: 'Test',
  description: 'Car Test',
  daily_rate: 100,
  license_plate: 'Test',
  fine_amunt: 40,
  brand: 'brand',
  category_id: '123',
};

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dateDayJsProvider: DayjsDateProvider;

describe('Create Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dateDayJsProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateDayJsProvider,
      carsRepositoryInMemory
    );
  });

  it('shoud be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create(carGenerated);
    const rental = await createRentalUseCase.execute(rentalGenerated);
    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('shoud not be able to create a new rental if there is another open to the same user ', async () => {
    expect(async () => {
      await createRentalUseCase.execute(rentalGenerated);
      await createRentalUseCase.execute(rentalGenerated);
    }).rejects.toBeInstanceOf(AppError);
  });
  it('shoud not be able to create a new rental if there is another open to the same car ', async () => {
    expect(async () => {
      await createRentalUseCase.execute({ ...rentalGenerated, user_id: '1' });
      await createRentalUseCase.execute({ ...rentalGenerated, user_id: '2' });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('shoud not be able to create a new rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        ...rentalGenerated,
        expect_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
