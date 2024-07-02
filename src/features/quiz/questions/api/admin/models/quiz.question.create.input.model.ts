import { IsStringLength } from '../../../../../../infrastructure/decorators/validate/is.string.length';
import { IsNotEmpty } from 'class-validator';

export class QuizQuestionCreateInputModel {
  @IsStringLength(10, 500)
  public body: string;

  @IsNotEmpty()
  public correctAnswers: Array<string>;
}
