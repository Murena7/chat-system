import session from 'express-session';
import connectRedis from 'connect-redis';
import express from 'express';
import { Redis } from 'ioredis';
import config from '../config';
import { Server } from 'socket.io';
import { Container } from 'typedi';

export default ({ app, redisConnection }: { app: express.Application; redisConnection: Redis }) => {
  const RedisStore = connectRedis(session);
  const sessionMiddleware = session({
    store: new RedisStore({ client: redisConnection }),
    secret: config.sessionSecret,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
      httpOnly: true,
      secure: false,
    },
  });

  app.use(sessionMiddleware);
  Container.set('sessionMiddleware', sessionMiddleware);
};
