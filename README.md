# example-nest-typeorm

This is an example of how to setup TypeORM configuration so it can be used by both the Nest app and the TypeORM CLI.

This way we can execute commands like `typeorm migration:generate` and `typeorm migration:run` against the same
database as the app is interacting with.

The catch here is that the configuration file is written in typescript which makes things more interesting.

Also the config file has to be able to get some values from the environmet variables. So, that's how you do it:

## TypeORM config

- Create `ormconfig.ts` and export the config object with the syntax `export = {...}`.
The actual object can be imported from other sources.

## Executing TypeORM CLI commands with `.ts` config file
- Make sure `ts-node` is installed locally
- Create the following script in `package.json`:
  ```json
  "typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli -f ./ormconfig.ts"
  ```
- Now you can execute TypeORM commands using `npm run typeorm` as a proxy:
  ```bash
  $ npm run typeorm migration:run

  # make sure to use -- when passing flags
  $ npm run typeorm migration:generate -- -n migration-name
  ```

## Using environment variables in TypeORM config
`ormconfig.ts` gets the config from the factoy function `getTypeOrmConfig` from `src/config/typeOrmConfig.ts`.

TypeORM CLI loads env variables from the `.env` file before running `ormconfig.ts`, so we use `process.env` to set the config properties:
```typescript
const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User],
  cli: {
    migrationsDir: 'migration',
  },
};
```

Since we want to use `ConfigService` instead of `process.env` when the app is running, `getTypeOrmConfig` has an optional `configService` parameter.
This way when this function is called from the CLI it will get the env variables from `process.env`, and from `ConfigService` when called from the app.
```typescript
export const getTypeOrmConfig = (configService?: ConfigService): TypeOrmModuleOptions => {
  if (!configService) {
    return typeOrmConfig;
  }

  return {
    ...typeOrmConfig,
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
  };
};
```

To register `TypeormModule` we use `TypeOrmModule.forRootAsync` instead of `TypeOrmModule.forRoot`.
Then we import `ConfigModule` and inject `ConfigService` in the `forRootAsync` options:
```typescript
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
  ],
})
export class AppModule {}

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
