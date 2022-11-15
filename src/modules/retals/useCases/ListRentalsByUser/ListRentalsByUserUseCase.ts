import { Rental } from '@modules/retals/infra/typeorm/entities/Rental';
import { RentalsRepository } from '@modules/retals/infra/typeorm/repositories/RentalsRepositoty';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: RentalsRepository
  ) {}
  async execute(user_id: string): Promise<Rental[]> {
    const rentalByUser = await this.rentalsRepository.findByUser(user_id);
    return rentalByUser;
  }
}
