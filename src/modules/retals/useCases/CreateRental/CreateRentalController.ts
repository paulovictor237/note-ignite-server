import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateRentalUseCase } from './CreateRentalUseCase';

export class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { car_id, expect_return_date } = req.body;
    const { id: user_id } = req.user;
    const createRentalUseCase = container.resolve(CreateRentalUseCase);
    const rental = await createRentalUseCase.execute({
      user_id,
      car_id,
      expect_return_date,
    });
    return res.status(201).json(rental);
  }
}
