import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminAuthGuard } from '../../../../../infrastructure/guards/admin-auth-guard.service';
import { QuizQuestionCreateInputModel } from './models/quiz.question.create.input.model';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UsersQueryRepository } from '../../../../users/infrastructure/users.query.repository';
import { UsersRepository } from '../../../../users/infrastructure/users.repository';
import { CreateQuizQuestionCommand } from '../../use.cases/create.question.use.case';
import { InterlayerNotice, interlayerNoticeHandler } from '../../../../../base/models/interlayer.notice';
import { QuizQuestionQueryRepository } from '../../infrastructure/quiz.question.query.repository';
import { QueryQuizQuestionRequestType } from '../../types/input';
import { QuizQuestionUpdateInputModel } from './models/quiz.question.update.input.model';
import { UpdateQuizQuestionCommand } from '../../use.cases/update.question.use.case';
import { QuizQuestionPublishInputModel } from './models/quiz.question.publish.input.model';
import { PublishQuizQuestionCommand } from '../../use.cases/publish.question.use.case';
import { DeleteQuizQuestionCommand } from '../../use.cases/delete.question.use.case';

@Controller('sa/quiz/questions')
export class QuizQuestionsAdminController {
  constructor(
    protected commandBus: CommandBus,
    protected questionsQueryRepository: QuizQuestionQueryRepository,
  ) {}
  @Get()
  @UseGuards(AdminAuthGuard)
  public async getQuizQuestion(@Query() query: QueryQuizQuestionRequestType) {
    const interlayerNotice = await this.questionsQueryRepository.getManyQuestion(query);
    interlayerNoticeHandler(interlayerNotice);
    return interlayerNotice.data;
  }

  @Post()
  @UseGuards(AdminAuthGuard)
  public async createQuizQuestion(@Body() inputModel: QuizQuestionCreateInputModel) {
    const interlayerNotice = await this.commandBus.execute<CreateQuizQuestionCommand, InterlayerNotice<string>>(
      new CreateQuizQuestionCommand(inputModel),
    );
    interlayerNoticeHandler(interlayerNotice);
    const newQuestion = await this.questionsQueryRepository.getOneQuestion(interlayerNotice.data);
    return newQuestion.data;
  }

  @Put(':id')
  @UseGuards(AdminAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async updateQuizQuestion(@Body() inputModel: QuizQuestionUpdateInputModel, @Param('id') questionId: string) {
    const interlayerNotice = await this.commandBus.execute<UpdateQuizQuestionCommand, InterlayerNotice<boolean>>(
      new UpdateQuizQuestionCommand(inputModel, questionId),
    );
    interlayerNoticeHandler(interlayerNotice);
    return;
  }

  @Put(':id/publish')
  @UseGuards(AdminAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async publishQuizQuestion(@Body() inputModel: QuizQuestionPublishInputModel, @Param('id') questionId: string) {
    const interlayerNotice = await this.commandBus.execute<PublishQuizQuestionCommand, InterlayerNotice<boolean>>(
      new PublishQuizQuestionCommand(inputModel, questionId),
    );
    interlayerNoticeHandler(interlayerNotice);
    return;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AdminAuthGuard)
  public async deleteQuizQuestion(@Param('id') questionId: string) {
    const interlayerNotice = await this.commandBus.execute<DeleteQuizQuestionCommand, InterlayerNotice<boolean>>(
      new DeleteQuizQuestionCommand(questionId),
    );
    interlayerNoticeHandler(interlayerNotice);
    return;
  }
}
