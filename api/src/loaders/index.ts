import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import redisLoader from './redis';
import dbLoader from './mariadb';
import Logger from './logger';
import config from '../config';
import socketIO from './socketIO';

export default async ({ expressApp, io }) => {
  const redisConnectionSession = redisLoader(config.redisURLSession);
  Logger.info('✌️ Redis connected!');

  const dbConnection = await dbLoader();
  Logger.info('✌️ DB loaded and connected!');

  dependencyInjectorLoader();
  Logger.info('✌️ Dependency Injector loaded');

  await expressLoader({ app: expressApp, redisConnection: redisConnectionSession });
  Logger.info('✌️ Express loaded');

  socketIO(io);
  Logger.info('✌️ SocketIO loaded');
};
