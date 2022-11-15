import { Car } from '@modules/cars/infra/typeorm/entities/car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  brand?: string;
  category_id?: string;
  name?: string;
}

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: CarsRepositoryInMemory
  ) {}
  async execute({ brand, category_id, name }: IRequest): Promise<Car[]> {
    const cars = this.carsRepository.findAvailable(brand, category_id, name);
    return cars;
  }
}
