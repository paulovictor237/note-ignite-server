import { ICreateRentalDTO } from '@modules/retals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/retals/repositories/IRentalsRepository';
import { inject } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import { Rental } from '../entities/Rental';

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;
  constructor() {
    this.repository = getRepository(Rental);
  }
  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = await this.repository.create(data);
    await this.repository.save(rental);
    return rental;
  }
  async findOpenRentalById(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { car_id, end_date: null },
    });
    return rental;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { user_id, end_date: null },
    });
    return rental;
  }
  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);
    return rental;
  }
  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { user_id },
      relations: ['car'],
    });
    return rentals;
  }
}
