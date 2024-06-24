import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './features/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

const typeOrmModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'sa',
  database: 'bloggers_6',
  logging: 'all',
  autoLoadEntities: true,
  synchronize: true,
});

const appModules = [UsersModule];

@Module({
  imports: [typeOrmModule, ...appModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
