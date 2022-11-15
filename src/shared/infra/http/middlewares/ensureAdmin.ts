import { AppError } from '@errors/AppError';
import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { NextFunction, Request, Response } from 'express';

export const ensureAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user;
  const usersRepository = new UserRepository();
  const user = await usersRepository.findById(id);
  if (!user.isAdmin) throw new AppError('User is not admin!');
  next();
};
