import { Request, response, Response } from 'express';
import { container } from 'tsyringe';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';

export class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const token =
      req.body.token || req.header['x-access-token'] || req.query.token;
    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);
    const refresh_token = refreshTokenUseCase.execute(token);
    return res.json(refresh_token);
  }
}
