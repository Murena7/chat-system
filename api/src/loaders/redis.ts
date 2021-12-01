import Redis from 'ioredis';
import config from '../config';

export default (uri: string): Redis.Redis => {
  return new Redis(uri);
};
