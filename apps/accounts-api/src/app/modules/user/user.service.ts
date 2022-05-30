import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async getAllUsers(): Promise<User[]> {
    return await this.repo.find();
  }

  async getUserById(id: string): Promise<User> {
    return await this.repo.findOneBy({
      user_id: id,
    });
  }
}
