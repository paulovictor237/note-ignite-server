import { Category } from '../infra/typeorm/entities/category';

// DTS => Data transfer object
export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export interface ICategoryRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}
