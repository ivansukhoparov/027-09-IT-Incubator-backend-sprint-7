import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../../base/base.classes/base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CommentCreateDto, CommentUpdateDto } from '../types/input';

@Injectable()
export class CommentsRepository extends BaseRepository<Comment, CommentCreateDto, CommentUpdateDto> {
  constructor(@InjectRepository(Comment) protected readonly commentRepository: Repository<Comment>) {
    super(commentRepository);
  }
}
