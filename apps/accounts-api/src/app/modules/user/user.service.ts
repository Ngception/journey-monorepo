import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  throwError() {
    throw new HttpException(
      {
        status: HttpStatus.EXPECTATION_FAILED,
        error: 'Unexpected error. Please try again later.',
      },
      HttpStatus.EXPECTATION_FAILED
    );
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.repo.find();
    } catch (err) {
      this.throwError();
      return;
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      return await this.repo.findOneBy({
        user_id: id,
      });
    } catch (err) {
      this.throwError();
      return;
    }
  }

  async createUser(data: CreateUserDto): Promise<string> {
    try {
      const newUser = this.repo.create({
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
      });
      const { identifiers } = await this.repo.insert(newUser);

      return identifiers[0].user_id;
    } catch (err) {
      this.throwError();
      return;
    }
  }

  async updateUserById(id: string, data: UpdateUserDto): Promise<number> {
    try {
      const { affected } = await this.repo.update(id, {
        ...data,
        updated_at: new Date(),
      });

      return affected;
    } catch (err) {
      this.throwError();
      return;
    }
  }

  async deleteUserById(id: string): Promise<number> {
    try {
      const { affected } = await this.repo.delete({ user_id: id });

      return affected;
    } catch (err) {
      this.throwError();
      return;
    }
  }
}
