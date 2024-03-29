import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUser } from '../domain/models/IUser';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import BcryptHashProvider from '../providers/HashProvider/implementations/BcryptHashProvider';

@injectable()
class CreateUserService {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,
    @inject(BcryptHashProvider)
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
