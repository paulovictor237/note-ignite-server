import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ProfileUserUseCase } from './profileUserUseCase';

export class ProfileUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const profileuserUseCase = container.resolve(ProfileUserUseCase);
    const user = await profileuserUseCase.execute(id);

    return response.json(user);
  }
}
