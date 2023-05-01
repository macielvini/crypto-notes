import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { BcryptService } from 'src/encrypt/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly encryptService: BcryptService,
  ) {}

  async create(body: CreateUserDto) {
    return await this.usersRepo.create({
      ...body,
      password: this.encryptService.hash(body.password),
    });
  }

  async findAll() {
    return await this.usersRepo.findAll();
  }

  async findByEmail(email: string) {
    return await this.usersRepo.findByEmail(email);
  }
}
