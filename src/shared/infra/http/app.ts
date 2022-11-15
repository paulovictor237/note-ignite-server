import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import { AppError } from '@errors/AppError';
import '@shared/container';
import { router } from '@shared/infra/http/routes';
import '@shared/infra/typeorm';
import createConnection from '@shared/infra/typeorm';
import express, { NextFunction, Request, Response } from 'express';
import upload from '@config/upload';

createConnection();
export const app = express();

app.use(express.json());

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  const error500 = {
    status: 'error',
    message: `Internal server error ${err.message}`,
  };
  return res.status(500).json(error500);
});
