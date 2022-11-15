import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { UsersTokens } from '@modules/accounts/infra/typeorm/entities/UsersTokens';
import { IUsersTokensRepository } from '../IUsersTokensRepository';

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UsersTokens[] = [];
  async create(data: ICreateUserTokenDTO): Promise<UsersTokens> {
    const token = new UsersTokens();
    Object.assign(token, data);
    this.usersTokens.push(token);
    return token;
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UsersTokens> {
    return this.usersTokens.find(
      (ut) => ut.user_id === user_id && ut.refresh_token === refresh_token
    );
  }
  async findByRefreshToken(refresh_token: string): Promise<UsersTokens> {
    return this.usersTokens.find((ut) => ut.refresh_token === refresh_token);
  }
  async deleteById(id: string): Promise<void> {
    const userTen = this.usersTokens.find((ut) => ut.id === id);
    this.usersTokens.splice(this.usersTokens.indexOf(userTen));
  }
}
