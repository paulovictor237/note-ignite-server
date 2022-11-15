import { ICreateCarDTO } from '@modules/cars/dtos/IcreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/car';
import { Category } from '@modules/cars/infra/typeorm/entities/category';
import { ICarsRepository } from '../ICarsRepository';

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];
  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, data);
    this.cars.push(car);
    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(brand, category_id, name): Promise<Car[]> {
    return this.cars.filter(
      (car) =>
        car.available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
    );
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }

  async updateAvaliable(id: string, avaliable: boolean): Promise<void> {
    const findeIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[findeIndex].available = avaliable;
  }
}
