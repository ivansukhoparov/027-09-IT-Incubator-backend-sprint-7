import { DeepPartial, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { NotFoundException } from '@nestjs/common';
import { BaseEntity } from './base.entity';

export abstract class BaseRepository<
  Entity extends BaseEntity,
  CreateDto extends DeepPartial<Entity>,
  UpdateDto extends QueryDeepPartialEntity<Entity>,
> {
  constructor(protected repository: Repository<Entity>) {}

  async create(createDto: CreateDto): Promise<string> {
    try {
      const newEntity = this.repository.create({ ...createDto });
      const result: any = await this.repository.save(newEntity);
      return result.id;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  // TODO: type of id
  async isExist(id: any): Promise<boolean> {
    try {
      const entity: Entity = await this.repository.findOneBy({ id: id });
      return !!entity;
    } catch {
      return false;
    }
  }

  // TODO: type of id
  async getById(id: any): Promise<Entity> {
    try {
      return await this.repository.findOneBy({ id: id });
    } catch {
      throw new NotFoundException();
    }
  }

  // TODO: type of updateDto
  async update(id: any, updateDto: UpdateDto): Promise<boolean> {
    try {
      const result = await this.repository.update({ id: id }, { ...updateDto });
      return !!result.affected;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async delete(id: any): Promise<boolean> {
    try {
      const result = await this.repository.softDelete({ id });
      return !!result.affected;
    } catch {
      throw new NotFoundException();
    }
  }
}
