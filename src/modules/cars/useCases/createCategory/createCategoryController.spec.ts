import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';
import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

const newCategory = {
  name: 'Category Supertest',
  description: 'Category Supertest',
};

let connection: Connection;

describe('Create category controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    // await connection.dropDatabase();
    await connection.runMigrations();

    const id = uuidv4();
    const password = await hash('admin', 8);

    await connection.query(`
      INSERT INTO USERS(id, name, email, password, "isAdmin", create_at, driver_license)
      values('${id}', 'admin', 'email@admin.com.br', '${password}', true, 'now()', 'xxxxxx')
    `);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it('should be able to create a new category', async () => {
    const admin = { email: 'email@admin.com.br', password: 'admin' };
    const responseToken = await request(app).post('/sessions').send(admin);
    const { refresh_token } = responseToken.body;
    const response = await request(app)
      .post('/categories')
      .send(newCategory)
      .set({ Authorization: `Bearer ${refresh_token}` });
    expect(response.status).toBe(201);
  });
  it('should be able to create a new category with the same name', async () => {
    const admin = { email: 'email@admin.com.br', password: 'admin' };
    const responseToken = await request(app).post('/sessions').send(admin);
    const { refresh_token } = responseToken.body;
    const response = await request(app)
      .post('/categories')
      .send(newCategory)
      .set({ Authorization: `Bearer ${refresh_token}` });
    expect(response.status).toBe(400);
  });
});
