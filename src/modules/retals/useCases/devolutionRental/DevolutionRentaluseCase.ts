import { AppError } from '@errors/AppError';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/retals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/retals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
  user_id: string;
}
@injectable()
export class DevolutionRentaluseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}
  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    if (!rental) throw new AppError('Rental not found');
    const car = await this.carsRepository.findById(rental.car_id);
    const minimum_dayly = 1;

    const dateNow = this.dateProvider.dateNow();
    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);
    if (daily <= 0) daily = minimum_dayly;

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expect_return_date
    );

    let total = 0;
    if (delay > 0) total = delay * car.fine_amunt;
    total += daily * car.daily_rate;
    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvaliable(car.id, true);

    return rental;
  }
}
