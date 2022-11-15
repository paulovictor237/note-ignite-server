import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import {
  ISpecificationDTO,
  ISpecificationRepository,
} from '@modules/cars/repositories/ISpecificationRepository';
import { getRepository, Repository } from 'typeorm';

export class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;
  constructor() {
    this.repository = getRepository(Specification);
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const specification = await this.repository.findByIds(ids);
    return specification;
  }
  async create({
    name,
    description,
  }: ISpecificationDTO): Promise<Specification> {
    const specification = await this.repository.create({ name, description });
    await this.repository.save(specification);
    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    // select * from categories where name = "name" limit 1
    const specification = await this.repository.findOne({ name });
    return specification;
  }
}
