import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

const migrationsDir = 'migration';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'example_nest_typeorm',
  entities: [User],
  migrations: [`${migrationsDir}/*.ts`],
  cli: {
    migrationsDir,
  },
};
