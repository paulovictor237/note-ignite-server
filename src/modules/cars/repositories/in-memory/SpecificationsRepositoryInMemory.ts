import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import {
  ISpecificationDTO,
  ISpecificationRepository,
} from '../ISpecificationRepository';

export class SpecificationsRepositoryInMemory
  implements ISpecificationRepository
{
  specifications: Specification[] = [];
  async create({
    name,
    description,
  }: ISpecificationDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, { name, description });
    this.specifications.push(specification);
    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((a) => a.name === name);
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecificaitons = this.specifications.filter((a) =>
      ids.includes(a.id)
    );
    return allSpecificaitons;
  }
}
