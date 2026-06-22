import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAll() {
    const users = await this.userRepository.find({
      relations: { posts: true },
    });

    return {
      success: true,
      data: users,
    };
  }

  async create(payload: CreateUserDto) {
    const existing = await this.userRepository.findOneBy({
      name: payload.name,
    });

    if (existing) {
      throw new ConflictException('User already exists');
    }

    const user = this.userRepository.create({
      age: payload.age,
      name: payload.name,
    });

    await this.userRepository.save(user);

    return {
      success: true,
      data: user,
    };
  }
}
