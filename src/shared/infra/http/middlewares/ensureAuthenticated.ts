import auth from '@config/auth';
import { AppError } from '@errors/AppError';
import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UserTokensRepository';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError('Token missing', 401);
  // [0] = Bearer
  // [1] = 4899203293
  const [_, token] = authHeader.split(' ');
  try {
    const { sub: user_id } = verify(token, auth.secret_token);
    const usersRepository = new UserRepository();

    req.user = {
      id: user_id as string,
    };

    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
};
