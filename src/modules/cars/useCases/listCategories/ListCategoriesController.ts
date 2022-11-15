import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

export class ListCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoriesUseCases = container.resolve(ListCategoriesUseCase);
    const all = await listCategoriesUseCases.execute();
    return res.json(all);
  }
}
