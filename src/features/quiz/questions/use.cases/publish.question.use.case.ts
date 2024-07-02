import { QuizQuestionCreateInputModel } from '../api/admin/models/quiz.question.create.input.model';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QuizQuestionRepository } from '../infrastructure/quiz.question.repository';
import { InterlayerNotice } from '../../../../base/models/interlayer.notice';
import { CreateQuestionDto, PublishQuestionDto, UpdateQuestionDto } from '../types/input';
import { QuizQuestionUpdateInputModel } from '../api/admin/models/quiz.question.update.input.model';
import { QuizQuestionPublishInputModel } from '../api/admin/models/quiz.question.publish.input.model';

export class PublishQuizQuestionCommand {
  public model: PublishQuestionDto;
  public id: string;

  constructor(inputModel: QuizQuestionPublishInputModel, questionId: string) {
    this.model.published = inputModel.published;
    this.id = questionId;
  }
}

@CommandHandler(PublishQuizQuestionCommand)
export class PublishQuizQuestionUseCase implements ICommandHandler<PublishQuizQuestionCommand> {
  constructor(protected readonly quizRepository: QuizQuestionRepository) {}

  async execute(command: PublishQuizQuestionCommand): Promise<InterlayerNotice<boolean>> {
    return await this.quizRepository.updateQuestion(command.model, command.id);
  }
}
