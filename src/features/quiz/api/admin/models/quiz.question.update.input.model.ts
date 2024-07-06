import { IsStringLength } from '../../../../../infrastructure/decorators/validate/is.string.length';
import { IsNotEmpty } from 'class-validator';

export class QuizQuestionUpdateInputModel {
  @IsStringLength(10, 500)
  public body: string;

  @IsNotEmpty()
  public correctAnswers: Array<string>;
}
