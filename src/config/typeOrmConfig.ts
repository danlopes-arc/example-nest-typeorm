import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

interface CreateTypeOrmConfigOptions {
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  database?: string;
  includeMigrationOptions?: boolean;
}

export const createTypeOrmConfig = (options: CreateTypeOrmConfigOptions): TypeOrmModuleOptions => {
  const migrationOptions = {
    migrations: ['migration/*.ts'],
    cli: {
      migrationsDir: '/migration',
    },
  };

  return {
    type: 'mysql',
    host: options.host,
    port: options.port,
    username: options.username,
    password: options.password,
    database: options.database,
    entities: [User],
    ...(options.includeMigrationOptions ? migrationOptions : {}),
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
