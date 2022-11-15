import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

export class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;
    const { filename: avatar_file } = req.file;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ user_id, avatar_file });
    return res.status(200).send();
  }
}
