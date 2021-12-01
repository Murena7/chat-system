import express from 'express';
import { Redis } from 'ioredis';
import passport from 'passport';
import { Container } from 'typedi';
import { getRepository } from 'typeorm';
import { Strategy as LocalStrategy } from 'passport-local';
import AuthService from '../services/auth.service';
import { User } from '../entity/user';

export default ({ app, redisConnection }: { app: express.Application; redisConnection: Redis }) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      async (username, password, cb) => {
        try {
          const authServiceInstance = Container.get(AuthService);
          return await authServiceInstance.SignIn(username, password, cb);
        } catch (err) {
          cb(err);
        }
      },
    ),
  );

  passport.serializeUser(async (user: User, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser(async (id, cb) => {
    try {
      const userRepository = getRepository(User);
      const userRecord = await userRepository.findOneOrFail(id);
      cb(null, userRecord);
    } catch (err) {
      cb(err);
    }
  });

  // INIT PASSPORT
  const initPassport = passport.initialize();
  const initPassportSession = passport.session();
  app.use(initPassport);
  app.use(initPassportSession);

  Container.set('initPassport', initPassport);
  Container.set('initPassportSession', initPassportSession);
};
