import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  // adicionar colunua avatar na tabela users
  // configuraçao upload mutter
  // refatorarusuario com coluna avatar
  // criar regra de nefocio do upload
  // criar controller
  constructor(
    @inject('UserRepository')
    private useRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}
  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.useRepository.findById(user_id);

    if (user.avatar) await this.storageProvider.delete(avatar_file, 'avatar');
    await this.storageProvider.save(avatar_file, 'avatar');

    user.avatar = avatar_file;
    await this.useRepository.create(user);
  }
}
