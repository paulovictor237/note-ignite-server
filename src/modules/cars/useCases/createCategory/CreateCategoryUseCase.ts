import { AppError } from '@errors/AppError';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoriesRepository: ICategoryRepository
  ) {}
  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExistis = await this.categoriesRepository.findByName(
      name
    );
    if (categoryAlreadyExistis) throw new AppError('Category already exists');
    this.categoriesRepository.create({ name, description });
  }
}
