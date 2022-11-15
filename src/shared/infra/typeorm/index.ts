import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'database'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  const isTest = process.env.NODE_ENV === 'test';
  const envHost = isTest ? 'localhost' : host;
  const database = isTest ? 'rentx_test' : defaultOptions.database;
  return createConnection(
    Object.assign(defaultOptions, { host: envHost, database })
  );
};
