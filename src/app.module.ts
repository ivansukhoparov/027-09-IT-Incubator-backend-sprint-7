import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './features/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PluralNamingStrategy } from './common/strategies/plural.naming.strategy';
import { QuizModule } from './features/quiz/quiz.module';
import { TestingModule } from './features/testing/testing.module';
import { BlogsModule } from './features/blogs/blogs.module';
import { MongooseModule } from '@nestjs/mongoose';
import { appSettings } from './settings/app.settings';
import { ThrottlerModule } from '@nestjs/throttler';

const typeOrmModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'sa',
  database: 'bloggers_7',
  namingStrategy: new PluralNamingStrategy(),
  logging: 'all',
  autoLoadEntities: true,
  synchronize: false,
});

const throttleModule = ThrottlerModule.forRoot([
  {
    ttl: 10000,
    limit: 500,
  },
]);
const mongoModule = MongooseModule.forRoot(appSettings.api.MONGO_CONNECTION_URI + '/' + appSettings.api.MONGO_DB_NAME);
const appModules = [UsersModule, QuizModule, TestingModule, BlogsModule];

@Module({
  imports: [throttleModule, typeOrmModule, mongoModule, ...appModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
