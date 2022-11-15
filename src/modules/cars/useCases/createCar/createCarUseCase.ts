import { AppError } from '@errors/AppError';
import { Car } from '@modules/cars/infra/typeorm/entities/car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amunt: number;
  brand: string;
  category_id: string;
}

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: CarsRepositoryInMemory
  ) {}

  async execute(data: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      data.license_plate
    );
    if (carAlreadyExists) throw new AppError('car alreary exists');

    const car = await this.carsRepository.create(data);
    return car;
  }
}
