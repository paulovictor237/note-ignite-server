import { AppError } from '@errors/AppError';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationsRepository: ISpecificationRepository
  ) {}
  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExistis =
      await this.specificationsRepository.findByName(name);
    if (specificationAlreadyExistis)
      throw new AppError('Category already exists');
    await this.specificationsRepository.create({ name, description });
  }
}
