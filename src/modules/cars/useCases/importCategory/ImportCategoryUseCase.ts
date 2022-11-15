import { ICategoryRepository } from '@modules/cars/repositories/ICategoryRepository';
import { parse } from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoriesRepositoru: ICategoryRepository
  ) {}
  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];
      const parseFile = parse({});
      stream.pipe(parseFile);
      parseFile
        .on('data', async (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', (err) => reject(err));
    });
  }
  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.forEach(async (category) => {
      const { name, description } = category;
      const existcCategoty = await this.categoriesRepositoru.findByName(name);
      if (!!existcCategoty) return;
      await this.categoriesRepositoru.create({ name, description });
    });
  }
}
