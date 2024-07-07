import { BlogsRepository } from '../infrastructure/blogs.repository';
import { Injectable } from '@nestjs/common';
import { CreateBlogInputModel, UpdateBlogInputModel } from '../api/admin/models/blogs.input.models';
import { BlogCreateDto } from '../types/input';

@Injectable()
export class BlogsService {
  constructor(protected blogsRepository: BlogsRepository) {}

  async getBlogById(id: string) {
    return this.blogsRepository.getById(id);
  }

  async isBLogExist(id: string) {
    return await this.blogsRepository.isExist(id);
  }

  async createNewBlog(inputModel: CreateBlogInputModel) {
    const blogCreateDto: BlogCreateDto = {
      name: inputModel.name,
      description: inputModel.description,
      websiteUrl: inputModel.websiteUrl,
      isMembership: false,
    };

    const newBlogId = await this.blogsRepository.create(blogCreateDto);
    const newBlog = await this.blogsRepository.getById(newBlogId);
    return newBlog;
  }

  async updateBlog(blogId: string, blogUpdateDto: UpdateBlogInputModel) {
    return await this.blogsRepository.update(blogId, blogUpdateDto);
  }

  async deleteBlog(blogId: string) {
    await this.blogsRepository.delete(blogId);
  }
}
