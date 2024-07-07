import { Injectable } from '@nestjs/common';
import { BlogCreateDto, BlogUpdateDto } from '../types/input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { BaseRepository } from '../../../../base/base.classes/base.repository';

@Injectable()
export class BlogsRepository extends BaseRepository<Blog, BlogCreateDto, BlogUpdateDto> {
  constructor(@InjectRepository(Blog) protected readonly blogsRepository: Repository<Blog>) {
    super(blogsRepository);
  }
}
