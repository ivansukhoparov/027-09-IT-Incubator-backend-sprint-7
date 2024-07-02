import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { PluralNamingStrategy } from './src/common/strategies/plural.naming.strategy';

config();

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'sa',
  namingStrategy: new PluralNamingStrategy(),
  database: 'bloggers_7',
  migrations: ['migrations/*.ts'],
  entities: ['src/**/*.entity.ts'],
});
