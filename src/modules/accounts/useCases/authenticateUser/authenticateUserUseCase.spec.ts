import { AppError } from '@errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UserRepositoryInMomory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMomory;
let createUserUseCase: CreateUserUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

const user: ICreateUserDTO = {
  driver_license: 'asd',
  email: 'test@test.com',
  name: 'test',
  password: 'test',
};

describe('Authenticate User', () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    userRepositoryInMemory = new UserRepositoryInMomory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });
  it('sahoud be able to authenticate an user', async () => {
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });
    expect(result).toHaveProperty('token');
  });
  it('shorld not be able to authenticate a nonexistent user', async () => {
    await expect(() => {
      authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '1234',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('shoud not be able to authenticate with incorrect password', async () => {
    await createUserUseCase.execute(user);
    await expect(() => {
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'false-password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
