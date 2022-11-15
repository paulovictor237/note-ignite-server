import { AppError } from '@errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);
    if (userAlreadyExists) throw new AppError('Email already exists');
    const passwordHash = await hash(data.password, 8);
    await this.userRepository.create({ ...data, password: passwordHash });
  }
}
