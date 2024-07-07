import { CommentsRepository } from '../infrastructure/comments.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCommentInputModel } from '../api/models/comments.input.models';
import { CommentCreateDto } from '../types/input';
import { CommentDocument, CommentsMongo } from '../infrastructure/comments.schema';
import { PostsService } from '../../posts/application/posts.service';

@Injectable()
export class CommentsService {
  constructor(
    protected commentsRepository: CommentsRepository,
    protected postService: PostsService,
  ) {}

  async getCommentById(id: string) {
    try {
      return await this.commentsRepository.getById(id);
    } catch {
      throw new NotFoundException();
    }
  }

  async createComment(createDto: CommentCreateDto): Promise<string> {
    try {
      // const createdAt = new Date();

      await this.postService.findById(createDto.postId);

      // const commentCreateModel: CommentsMongo = {
      //   content: createDto.content,
      //   postId: createDto.postId,
      //   commentatorInfo: {
      //     userId: createDto.userId,
      //     userLogin: createDto.userLogin,
      //   },
      //   createdAt: createdAt.toISOString(),
      // };
      return await this.commentsRepository.create(createDto);
    } catch {
      throw new NotFoundException();
    }
  }
  async updateComment(id: string, updateModel: UpdateCommentInputModel) {
    try {
      return await this.commentsRepository.update(id, updateModel);
    } catch {
      throw new NotFoundException();
    }
  }

  async deleteComment(id: string) {
    try {
      return await this.commentsRepository.delete(id);
    } catch {
      throw new NotFoundException();
    }
  }

  async isCommentExist(id: string) {
    return await this.commentsRepository.isExist(id);
  }
}
