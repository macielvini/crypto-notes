import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async create(body: CreateUserDto) {
    return await this.usersRepo.create(body);
  }

  async findAll() {
    return await this.usersRepo.findAll();
  }
}
