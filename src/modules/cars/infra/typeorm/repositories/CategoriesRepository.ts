import { Category } from '@modules/cars/infra/typeorm/entities/category';
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from '@modules/cars/repositories/ICategoryRepository';
import { getRepository, Repository } from 'typeorm';

export class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });
    await this.repository.save(category);
  }
  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }
  async findByName(name: string): Promise<Category> {
    // select * from categories where name = "name" limit 1
    const category = await this.repository.findOne({ name });
    return category;
  }
}
