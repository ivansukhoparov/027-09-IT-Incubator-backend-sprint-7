import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from '../types/output';
import { UserUpdateDto } from '../types/input';
import { User } from './enities/user';
import { InterlayerNotice } from '../../../base/models/interlayer.notice';

@Injectable()
export class UsersRepository {
  constructor(@InjectRepository(User) public readonly repository: Repository<User>) {}

  async createUser(newUserDto: CreateUserDto | User) {
    // const interlayerNotice: InterlayerNotice<string> = new InterlayerNotice<string>();
    console.log('createUser');
    try {
      const response = await this.repository.save({ ...newUserDto });
      console.log('createUser', response);
      return response.id;
    } catch (err) {
      console.log(err);
      throw new NotFoundException();
    }
  }

  async getUserById(id: string) {
    try {
      const response = await this.repository.findOneBy({ id: id });
      console.log('getUserById', response);
      return response;
    } catch {
      throw new NotFoundException();
    }
  }

  async getUserByLoginOrEmail(loginOrEmail: string) {
    try {
      const response = await this.repository.findOne({ where: { login: loginOrEmail } || { email: loginOrEmail } });
      console.log('getUserByLoginOrEmail', response);
      return response;
    } catch {
      throw new NotFoundException();
    }
  }

  async deleteUser(id: string) {
    try {
      const response = await this.repository.softDelete({ id: id });
      console.log('deleteUser', response);
      return response;
    } catch {
      throw new NotFoundException();
    }
  }

  async updateUser(id: string, userUpdateDto: UserUpdateDto) {
    try {
      const response = await this.repository.update({ id: id }, { ...userUpdateDto });
      console.log('update', response);
      return response;
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
