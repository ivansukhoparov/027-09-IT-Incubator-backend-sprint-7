import { Injectable, NotFoundException } from '@nestjs/common';
import { PostCreateDto, PostUpdateDto } from '../types/input';
import { BaseRepository } from '../../../../base/base.classes/base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsRepository extends BaseRepository<Post, PostCreateDto, PostUpdateDto> {
  constructor(@InjectRepository(Post) protected readonly postsRepository: Repository<Post>) {
    super(postsRepository);
  }
}
