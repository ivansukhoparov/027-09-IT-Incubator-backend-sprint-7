import { QuizQuestionCreateInputModel } from '../api/admin/models/quiz.question.create.input.model';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QuizQuestionRepository } from '../infrastructure/quiz.question.repository';
import { InterlayerNotice } from '../../../../base/models/interlayer.notice';
import { CreateQuestionDto, UpdateQuestionDto } from '../types/input';
import { QuizQuestionUpdateInputModel } from '../api/admin/models/quiz.question.update.input.model';

export class UpdateQuizQuestionCommand {
  public model: { body: string; correctAnswers: Array<string> };
  public id: string;

  constructor(inputModel: QuizQuestionUpdateInputModel, questionId: string) {
    this.model.body = inputModel.body;
    this.model.correctAnswers = inputModel.correctAnswers;
    this.id = questionId;
  }
}

@CommandHandler(UpdateQuizQuestionCommand)
export class UpdateQuizQuestionUseCase implements ICommandHandler<UpdateQuizQuestionCommand> {
  constructor(protected readonly quizRepository: QuizQuestionRepository) {}

  async execute(command: UpdateQuizQuestionCommand): Promise<InterlayerNotice<boolean>> {
    const questionQuestionDto: UpdateQuestionDto = {
      ...command.model,
      correctAnswers: JSON.stringify(command.model.correctAnswers),
    };
    return await this.quizRepository.updateQuestion(questionQuestionDto, command.id);
  }
}
