import { createTypeOrmConfig } from './src/config/typeOrmConfig';

export = createTypeOrmConfig({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  includeMigrationOptions: true,
});
