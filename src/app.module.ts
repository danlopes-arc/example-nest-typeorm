import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrmConfig';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule],
})
export class AppModule {}
