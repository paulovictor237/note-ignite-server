import { IUserResponseDTO } from '../dtos/IUserResponseDTO';
import { User } from '../infra/typeorm/entities/User';
import { instanceToInstance } from 'class-transformer';

export class UserMap {
  static toDTO({
    email,
    id,
    name,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      email,
      id,
      name,
      avatar,
      driver_license,
      avatar_url,
    });
    return user;
  }
}
