import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './features/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PluralNamingStrategy } from './common/strategies/plural.naming.strategy';
import { QuizModule } from './features/quiz/quiz.module';
import { TestingModule } from './features/testing/testing.module';

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

const appModules = [UsersModule, QuizModule, TestingModule];

@Module({
  imports: [typeOrmModule, ...appModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
