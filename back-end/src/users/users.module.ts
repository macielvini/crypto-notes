import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersRepository } from './users.repository';
import { EncryptModule } from 'src/encrypt/encrypt.module';

@Module({
  imports: [PrismaModule, EncryptModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
