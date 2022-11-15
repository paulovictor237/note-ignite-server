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
    await connection.dropDatabase();
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
  it('should be able to list category', async () => {
    const admin = { email: 'email@admin.com.br', password: 'admin' };
    const responseToken = await request(app).post('/sessions').send(admin);
    const { token } = responseToken.body;
    await request(app)
      .post('/categories')
      .send(newCategory)
      .set({ Authorization: `Bearer ${token}` });

    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0].name).toEqual('Category Supertest');
  });
});
