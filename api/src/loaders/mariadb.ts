import 'reflect-metadata';
import { createConnections } from 'typeorm';
import { typeOrmConfig } from '../config/typeorm';

export default async (): Promise<any> => {
  return await createConnections([typeOrmConfig]);
};
