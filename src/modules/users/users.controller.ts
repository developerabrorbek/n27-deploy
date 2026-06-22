import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  async getAll() {
    return await this.service.getAll();
  }

  @Post()
  @ApiResponse({
    status: 201,
    example: {
      success: true,
      data: {
        id: 1,
        name: 'Alex',
        age: 25,
      },
    },
  })
  async create(@Body() payload: CreateUserDto) {
    return await this.service.create(payload);
  }
}
