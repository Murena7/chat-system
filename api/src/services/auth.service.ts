import { Inject, Service } from 'typedi';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entity/user';
import lodash from 'lodash';
import { IUserSignUpBody } from '@/interfaces/auth.interface';

@Service()
export default class AuthService {
  userRepository: Repository<User>;

  constructor(@Inject('logger') private logger) {
    this.userRepository = getRepository(User);
  }

  public async SignUp(userInputDTO: IUserSignUpBody): Promise<{ user: User }> {
    try {
      /*
      Check User Exist
      */
      const userExist = await this.userRepository.findOne({ username: userInputDTO.username });
      if (userExist) {
        throw new Error('This username already used');
      }
      /*
      Hash password
      */
      this.logger.silly('Hashing password');
      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
      this.logger.silly('Creating user db record');
      /*
      Create and Save New User to DB
      */
      const userRecord = await this.userRepository
        .create({
          username: userInputDTO.username,
          password: hashedPassword,
        })
        .save();

      if (!userRecord) {
        throw new Error('User cannot be created');
      }

      const user = userRecord;
      Reflect.deleteProperty(user, 'password');
      return { user };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async SignIn(username: string, password: string, cb: Function) {
    try {
      const userRecord = await this.userRepository
        .createQueryBuilder('user')
        .where({ username: username })
        .addSelect('user.password')
        .getOne();

      if (!userRecord) {
        return cb(null, false);
      }

      this.logger.silly('Checking password');
      const validPassword = await argon2.verify(userRecord.password, password);
      if (validPassword) {
        this.logger.silly('Password is valid!');
        const user = userRecord;
        Reflect.deleteProperty(user, 'password');

        return cb(null, user);
      } else {
        return cb(null, false);
      }
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
