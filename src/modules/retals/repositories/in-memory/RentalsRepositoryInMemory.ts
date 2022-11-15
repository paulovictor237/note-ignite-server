import { ICreateRentalDTO } from '@modules/retals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/retals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../IRentalsRepository';

export class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];
  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();
    Object.assign(rental, { ...data, start_date: new Date() });
    this.rentals.push(rental);
    return rental;
  }
  async findOpenRentalById(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }
  async findById(id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.user_id === id);
  }
  async findByUser(id: string): Promise<Rental[]> {
    return this.rentals.filter((user) => user.user_id === id);
  }
}
