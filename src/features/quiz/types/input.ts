import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export type CreateQuestionDto = {
  body: string;
  correctAnswers: string;
};

export type UpdateQuestionDto = {
  body: string;
  correctAnswers: string;
};

export type PublishQuestionDto = {
  published: boolean;
};

type QuestionStatus = 'all' | 'published' | 'notPublished';
type QuestionSort = 'id' | 'body' | 'correctAnswers' | 'published' | 'createdAt' | 'updatedAt';

export class QueryQuizQuestionRequestType {
  @IsOptional()
  bodySearchTerm: string = '';

  @Transform(({ value }) => {
    const availableValues: QuestionStatus[] = ['all', 'published', 'notPublished'];
    const status = availableValues.find((el) => el === value);
    return status || 'all';
  })
  publishedStatus: QuestionStatus = 'all';

  @Transform(({ value }) => {
    const availableFields: QuestionSort[] = ['id', 'body', 'correctAnswers', 'published', 'createdAt', 'updatedAt'];
    const sortField: QuestionSort = availableFields.find((el) => el === value);
    return sortField || 'createdAt';
  })
  sortBy: string = 'createdAt';

  @Transform(({ value }) => {
    const availableDirections = ['asc', 'desc'];
    const direction = availableDirections.find((el) => el === value);
    return direction.toUpperCase() || 'DESC';
  })
  sortDirection: 'ASC' | 'DESC' | undefined = 'DESC';

  pageNumber: number = 1;

  pageSize: number = 10;
}
