import { IsStringLength } from '../../../../../infrastructure/decorators/validate/is.string.length';
import { IsNotEmpty } from 'class-validator';

export class QuizQuestionPublishInputModel {
  @IsNotEmpty()
  public published: boolean;
}
