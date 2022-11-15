import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCarSpecificaitonUseCase } from './CreateCarSpecificaitonUseCase';

export class CreateCarSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { specifications_id } = req.body;
    const createCarSpecificationUsecase = container.resolve(
      CreateCarSpecificaitonUseCase
    );
    const cars = await createCarSpecificationUsecase.execute({
      car_id: id,
      specifications_id,
    });
    return res.json(cars);
  }
}
