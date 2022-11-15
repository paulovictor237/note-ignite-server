import { AppError } from '@errors/AppError';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCetegoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCetegoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });
  it('should be able to create a new category', async () => {
    const category = { name: 'Test Name', description: 'Test Description' };
    await createCetegoryUseCase.execute(category);
    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );
    expect(categoryCreated).toHaveProperty('id');
  });
  it('should not be able to create a new category with the same name', async () => {
    const category = { name: 'Test Name', description: 'Test Description' };
    await createCetegoryUseCase.execute(category);
    await expect(() => {
      createCetegoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
