import { DataSource } from 'typeorm';

import { CreateProducts1701550480497 } from './migrations/1701550480497-CreateProducts';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '43710',
  database: 'apivendas',
  entities: [],
  migrations: [CreateProducts1701550480497],
});