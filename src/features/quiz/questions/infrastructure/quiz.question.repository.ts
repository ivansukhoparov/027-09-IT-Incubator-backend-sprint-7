import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { QuizQuestion } from './entities/quiz.question.entity';
import { query } from 'express';
import { ERRORS_CODES, InterlayerNotice } from '../../../../base/models/interlayer.notice';
import { CreateQuestionDto, PublishQuestionDto, UpdateQuestionDto } from '../types/input';

@Injectable()
export class QuizQuestionRepository {
  constructor(
    @InjectDataSource() protected readonly dataSource: DataSource,
    @InjectRepository(QuizQuestion) protected readonly questionRepository: Repository<QuizQuestion>,
  ) {}

  async addNewQuestion(createModel: CreateQuestionDto): Promise<InterlayerNotice<string>> {
    const interlayerNotice: InterlayerNotice<string> = new InterlayerNotice<string>();
    try {
      const newQuestion: QuizQuestion = this.questionRepository.create(createModel);
      const result: QuizQuestion = await this.questionRepository.save(newQuestion);
      interlayerNotice.addData(result.id);
      return interlayerNotice;
    } catch (err) {
      interlayerNotice.addError('Database do not response', 'DB', ERRORS_CODES.DATA_BASE_ERROR);
      return interlayerNotice;
    }
  }

  async updateQuestion(
    updateModel: UpdateQuestionDto | PublishQuestionDto,
    id: string,
  ): Promise<InterlayerNotice<boolean>> {
    const interlayerNotice: InterlayerNotice<boolean> = new InterlayerNotice<boolean>();
    try {
      const result = await this.questionRepository.update({ id: id }, { ...updateModel });
      console.log('updateRESULT', result);
      if (!result.affected) {
        interlayerNotice.addError('Question not found', 'DB', ERRORS_CODES.NOT_FOUND);
      } else {
        interlayerNotice.addData(true);
      }
      return interlayerNotice;
    } catch (err) {
      interlayerNotice.addError('Database do not response', 'DB', ERRORS_CODES.DATA_BASE_ERROR);
      return interlayerNotice;
    }
  }

  async deleteQuestion(id: string): Promise<InterlayerNotice<boolean>> {
    const interlayerNotice: InterlayerNotice<boolean> = new InterlayerNotice<boolean>();
    try {
      const result = await this.questionRepository.delete({ id: id });
      console.log('deleteRESULT', result);
      if (!result.affected) {
        interlayerNotice.addError('Question not found', 'DB', ERRORS_CODES.NOT_FOUND);
      } else {
        interlayerNotice.addData(true);
      }
      return interlayerNotice;
    } catch (err) {
      interlayerNotice.addError('Database do not response', 'DB', ERRORS_CODES.DATA_BASE_ERROR);
      return interlayerNotice;
    }
  }
}
