import { Category } from '@modules/cars/infra/typeorm/entities/category';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoriesRepository: ICategoryRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}
