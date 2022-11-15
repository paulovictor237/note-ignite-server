import { AppError } from '@errors/AppError';
import { Car } from '@modules/cars/infra/typeorm/entities/car';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
export class CreateCarSpecificaitonUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationRepository
  ) {}

  async execute(data: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(data.car_id);
    if (!carExists) throw new AppError('Car does not exists!');
    const specifications = await this.specificationsRepository.findByIds(
      data.specifications_id
    );
    carExists.specifications = specifications;
    await this.carsRepository.create(carExists);
    return carExists;
  }
}
