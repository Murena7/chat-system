import { User } from '../entity/user';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { Message } from '@/entity/message';

const typeOrmConfig: MysqlConnectionOptions = {
  name: 'default',
  type: 'mariadb',
  host: process.env.MARIADB_HOST,
  port: +process.env.MARIADB_PORT,
  username: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Message],
};

export { typeOrmConfig };
