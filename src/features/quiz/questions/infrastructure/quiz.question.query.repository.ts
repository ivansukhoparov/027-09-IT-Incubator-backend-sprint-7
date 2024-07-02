import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { QuizQuestion } from './entities/quiz.question.entity';
import { query } from 'express';
import { ERRORS_CODES, InterlayerNotice } from '../../../../base/models/interlayer.notice';
import { QuizQuestionOutputModel } from '../api/admin/models/quiz.question.output.model';
import { QueryQuizQuestionRequestType } from '../types/input';
import { userMapper } from '../../../users/types/mapper';

export class ViewModel<E> {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: E[];

  constructor(dbResult: [E[], number], pageNumber: number, pageSize: number) {
    this.pagesCount = Math.ceil(dbResult[1] / pageSize);
    this.page = pageNumber;
    this.pageSize = pageSize;
    this.totalCount = dbResult[1];
    this.items = dbResult[0];
  }
}
@Injectable()
export class QuizQuestionQueryRepository {
  constructor(@InjectRepository(QuizQuestion) protected readonly questionRepository: Repository<QuizQuestion>) {}

  async getOneQuestion(id: string): Promise<InterlayerNotice<QuizQuestionOutputModel>> {
    const interlayerNotice: InterlayerNotice<QuizQuestionOutputModel> = new InterlayerNotice<QuizQuestionOutputModel>();
    try {
      const result = await this.questionRepository.findOneBy({ id: id });
      const question: QuizQuestionOutputModel = new QuizQuestionOutputModel(result);
      interlayerNotice.addData(question);
      return interlayerNotice;
    } catch (err) {
      interlayerNotice.addError('Database do not response', 'DB', ERRORS_CODES.DATA_BASE_ERROR);
      return interlayerNotice;
    }
  }

  async getManyQuestion(query: QueryQuizQuestionRequestType): Promise<InterlayerNotice<ViewModel<QuizQuestion>>> {
    const interlayerNotice: InterlayerNotice<ViewModel<QuizQuestion>> = new InterlayerNotice<ViewModel<QuizQuestion>>();
    try {
      const result = await this.questionRepository
        .createQueryBuilder('qq')
        .select('qq')
        .where('qq.body LIKE :searchTerm', { searchTerm: `${query.bodySearchTerm}%` })
        .skip((query.pageNumber - 1) * query.pageSize)
        .take(query.pageSize)
        .orderBy('qq.' + query.sortBy, query.sortDirection)
        .getManyAndCount();
      const viewModel: ViewModel<QuizQuestion> = new ViewModel<QuizQuestion>(result, query.pageNumber, query.pageSize);
      interlayerNotice.addData(viewModel);
      return interlayerNotice;
    } catch (err) {
      interlayerNotice.addError('Database do not response', 'DB', ERRORS_CODES.DATA_BASE_ERROR);
      return interlayerNotice;
    }
  }
}
