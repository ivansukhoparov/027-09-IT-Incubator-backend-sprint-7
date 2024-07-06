import { QuizQuestionCreateInputModel } from '../api/admin/models/quiz.question.create.input.model';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QuizQuestionRepository } from '../infrastructure/quiz.question.repository';
import { InterlayerNotice } from '../../../base/models/interlayer.notice';
import { CreateQuestionDto } from '../types/input';

export class CreateQuizQuestionCommand {
  public body: string;
  public correctAnswers: Array<string>;

  constructor(inputModel: QuizQuestionCreateInputModel) {
    this.body = inputModel.body;
    this.correctAnswers = inputModel.correctAnswers;
  }
}

@CommandHandler(CreateQuizQuestionCommand)
export class CreateQuizQuestionUseCase implements ICommandHandler<CreateQuizQuestionCommand> {
  constructor(protected readonly quizRepository: QuizQuestionRepository) {}

  async execute(command: CreateQuizQuestionCommand): Promise<InterlayerNotice<string>> {
    const createQuestionDto: CreateQuestionDto = {
      ...command,
      correctAnswers: JSON.stringify(command.correctAnswers),
    };
    return await this.quizRepository.addNewQuestion(createQuestionDto);
  }
}
