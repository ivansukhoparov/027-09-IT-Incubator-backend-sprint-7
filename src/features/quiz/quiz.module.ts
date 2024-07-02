import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizQuestion } from './questions/infrastructure/entities/quiz.question.entity';
import { QuizQuestionsAdminController } from './questions/api/admin/quiz.questions.admin.controller';
import { CreateQuizQuestionUseCase } from './questions/use.cases/create.question.use.case';
import { QuizQuestionRepository } from './questions/infrastructure/quiz.question.repository';
import { QuizQuestionQueryRepository } from './questions/infrastructure/quiz.question.query.repository';
import { UpdateQuizQuestionUseCase } from './questions/use.cases/update.question.use.case';
import { PublishQuizQuestionUseCase } from './questions/use.cases/publish.question.use.case';
import { DeleteQuizQuestionUseCase } from './questions/use.cases/delete.question.use.case';

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
