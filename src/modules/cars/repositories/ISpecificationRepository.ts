import { Specification } from '../infra/typeorm/entities/Specification';

export interface ISpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationRepository {
  create({ name, description }: ISpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}
