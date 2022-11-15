import { AppError } from '@errors/AppError';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/retals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/retals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  car_id: string;
  expect_return_date: Date;
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute(data: IRequest): Promise<Rental> {
    const minimumHour = 24;
    const carUnavaliable = await this.rentalsRepository.findOpenRentalById(
      data.car_id
    );
    if (carUnavaliable) throw new AppError('car unavaliable');

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      data.user_id
    );
    if (rentalOpenToUser) throw new AppError('there is a rental in progress');

    const compare = this.dateProvider.compareInHours(
      this.dateProvider.dateNow(),
      data.expect_return_date
    );

    if (compare < minimumHour) throw new AppError('Invalid return time');
    const rental = await this.rentalsRepository.create(data);

    await this.carsRepository.updateAvaliable(data.car_id, false);

    return rental;
  }
}
