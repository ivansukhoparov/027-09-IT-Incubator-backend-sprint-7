import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizQuestion } from './infrastructure/entities/quiz.question.entity';
import { QuizQuestionsAdminController } from './api/admin/quiz.questions.admin.controller';
import { CreateQuizQuestionUseCase } from './use.cases/create.question.use.case';
import { QuizQuestionRepository } from './infrastructure/quiz.question.repository';
import { QuizQuestionQueryRepository } from './infrastructure/quiz.question.query.repository';
import { UpdateQuizQuestionUseCase } from './use.cases/update.question.use.case';
import { PublishQuizQuestionUseCase } from './use.cases/publish.question.use.case';
import { DeleteQuizQuestionUseCase } from './use.cases/delete.question.use.case';

const questionsUseCases = [
  CreateQuizQuestionUseCase,
  UpdateQuizQuestionUseCase,
  PublishQuizQuestionUseCase,
  DeleteQuizQuestionUseCase,
];

const useCases = [...questionsUseCases];
@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([QuizQuestion])],
  controllers: [QuizQuestionsAdminController],
  providers: [QuizQuestionRepository, QuizQuestionQueryRepository, ...useCases],
  exports: [],
})
export class QuizModule {}
