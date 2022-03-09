import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

interface CreateTypeOrmConfigOptions {
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  database?: string;
}

export const createTypeOrmConfig = (options: CreateTypeOrmConfigOptions): TypeOrmModuleOptions => {
  return {
    type: 'mysql',
    host: options.host,
    port: options.port,
    username: options.username,
    password: options.password,
    database: options.database,
    entities: [User],
  };
};

export const createCliTypeOrmConfig = (): TypeOrmModuleOptions => {
  return {
    ...createTypeOrmConfig({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    }),
    migrations: ['migration/*.ts'],
    cli: {
      migrationsDir: '/migration',
    },
  };
};

export const typeOrmConfigFactory = (configService: ConfigService): TypeOrmModuleOptions => {
  return createTypeOrmConfig({
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
  });
};
