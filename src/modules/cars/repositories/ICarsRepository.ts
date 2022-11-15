import { ICreateCarDTO } from '../dtos/IcreateCarDTO';
import { Car } from '../infra/typeorm/entities/car';

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]>;
  findById(id: string): Promise<Car>;
  updateAvaliable(id: string, avaliable: boolean): Promise<void>;
}
