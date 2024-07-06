import { QuizQuestionCreateInputModel } from '../api/admin/models/quiz.question.create.input.model';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QuizQuestionRepository } from '../infrastructure/quiz.question.repository';
import { InterlayerNotice } from '../../../base/models/interlayer.notice';
import { CreateQuestionDto, UpdateQuestionDto } from '../types/input';
import { QuizQuestionUpdateInputModel } from '../api/admin/models/quiz.question.update.input.model';

export class DeleteQuizQuestionCommand {
  public id: string;

  constructor(questionId: string) {
    this.id = questionId;
  }
}

@CommandHandler(DeleteQuizQuestionCommand)
export class DeleteQuizQuestionUseCase implements ICommandHandler<DeleteQuizQuestionCommand> {
  constructor(protected readonly quizRepository: QuizQuestionRepository) {}

  async execute(command: DeleteQuizQuestionCommand): Promise<InterlayerNotice<boolean>> {
    return await this.quizRepository.deleteQuestion(command.id);
  }
}
