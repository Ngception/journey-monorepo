import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashData, throwError } from '../../shared/auth/auth.util';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async checkForExistingUser(data: Record<string, any>) {
    const existingUser = await this.repo.findOneBy(data);

    if (existingUser !== null) {
      throwError(409, 'User already exists.');
      return;
    }
  }

  async hashPassword(password, saltRounds = 10): Promise<string> {
    const hash = await hashData(password, saltRounds);

    if (typeof hash !== 'string') {
      throwError();
      return;
    }

    return hash;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async saveNewUser(data: Record<string, any>): Promise<string> {
    try {
      const newUser = this.repo.create(data);
      const { identifiers } = await this.repo.insert(newUser);

      return identifiers[0].user_id;
    } catch (err) {
      throwError();
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.repo.find();
    } catch (err) {
      throwError();
      return;
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      return await this.repo.findOneBy({
        user_id: id,
      });
    } catch (err) {
      throwError();
      return;
    }
  }

  async createUser(data: CreateUserDto): Promise<string> {
    await this.checkForExistingUser({
      email: data.email,
    });

    const hash = await this.hashPassword(data.password);
    const newUserUuid = await this.saveNewUser({
      ...data,
      password: hash,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return newUserUuid;
  }

  async updateUserById(id: string, data: UpdateUserDto): Promise<number> {
    try {
      const { affected } = await this.repo.update(id, {
        ...data,
        updated_at: new Date(),
      });

      return affected;
    } catch (err) {
      throwError();
      return;
    }
  }

  async deleteUserById(id: string): Promise<number> {
    try {
      const { affected } = await this.repo.delete({ user_id: id });

      return affected;
    } catch (err) {
      throwError();
      return;
    }
  }
}
