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
import cors from 'cors';
import rateLimiter from '@shared/infra/http/middlewares/reteLimiter';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

createConnection();
export const app = express();

app.use(rateLimiter);

Sentry.init({
  dsn: process.env.SENTRY_DNS,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(cors());
app.use(router);

app.use(Sentry.Handlers.errorHandler());

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
