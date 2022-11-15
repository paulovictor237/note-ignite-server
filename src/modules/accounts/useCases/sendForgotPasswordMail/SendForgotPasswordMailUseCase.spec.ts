import { AppError } from '@errors/AppError';
import { UserRepositoryInMomory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let userRepositoryInMemory: UserRepositoryInMomory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe('Send Forgot MailProvider', () => {
  beforeEach(() => {
    mailProvider = new MailProviderInMemory();
    userRepositoryInMemory = new UserRepositoryInMomory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      userRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = spyOn(mailProvider, 'sendMail');
    await userRepositoryInMemory.create({
      name: 'Anthony Moran',
      password: 'Dylan McBride',
      email: 'biipa@ihofesaz.ec',
      driver_license: '3486244354',
    });
    await sendForgotPasswordMailUseCase.execute('biipa@ihofesaz.ec');
    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('no@ofioj.tt')
    ).rejects.toEqual(new AppError('User does not exist'));
  });

  it('should be able to crate an users token', async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, 'create');
    await userRepositoryInMemory.create({
      name: 'Lizzie Brock',
      password: '256982677',
      email: 'rolmur@mumfofuh.uz',
      driver_license: '2378566202',
    });
    await sendForgotPasswordMailUseCase.execute('rolmur@mumfofuh.uz');
    expect(generateTokenMail).toBeCalled();
  });
});
