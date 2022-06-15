import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUtilService } from '../../shared/auth/auth-util.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private authUtilService: AuthUtilService
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async checkForExistingUser(data: Record<string, any>) {
    const existingUser = await this.repo.findOneBy(data);

    if (existingUser !== null) {
      return this.authUtilService.throwError(409, 'User already exists.');
    }
  }

  async hashPassword(password, saltRounds = 10): Promise<string> {
    const hash = await this.authUtilService.hashData(password, saltRounds);

    if (typeof hash !== 'string') {
      this.authUtilService.throwError();
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
      this.authUtilService.throwError();
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.repo.find();
    } catch (err) {
      this.authUtilService.throwError();
      return;
    }
  }

  async getUser(data) {
    try {
      return await this.repo.findOneBy(data);
    } catch (err) {
      this.authUtilService.throwError();
      return;
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      return await this.repo.findOneBy({
        user_id: id,
      });
    } catch (err) {
      this.authUtilService.throwError();
      return;
    }
  }

  async createUser(data: CreateUserDto): Promise<{ access_token: string }> {
    await this.checkForExistingUser({
      email: data.email,
    });

    const hash = await this.hashPassword(data.password);
    const newUserUuid = await this.saveNewUser({
      email: data.email,
      password: hash,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const accessToken = await this.authUtilService.createToken({
      email: data.email,
      user_id: newUserUuid,
    });

    return accessToken;
  }

  async updateUserById(id: string, data: UpdateUserDto): Promise<number> {
    try {
      const { affected } = await this.repo.update(id, {
        ...data,
        updated_at: new Date(),
      });

      return affected;
    } catch (err) {
      this.authUtilService.throwError();
      return;
    }
  }

  async deleteUserById(id: string): Promise<number> {
    try {
      const { affected } = await this.repo.delete({ user_id: id });

      return affected;
    } catch (err) {
      this.authUtilService.throwError();
      return;
    }
  }
}
