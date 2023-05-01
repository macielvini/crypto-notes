import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { BcryptService } from 'src/encrypt/bcrypt.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  register(body: AuthRegisterDTO) {
    return this.usersService.create(body);
  }

  async login(body: AuthLoginDTO) {
    const user = await this.usersService.findByEmail(body.email);

    if (!user) throw new UnauthorizedException();

    const validPassword = this.bcryptService.compare(
      body.password,
      user.password,
    );

    if (!validPassword) throw new UnauthorizedException();

    return this.createToken(user);
  }

  private async createToken(user: User) {
    const token = this.jwtService.sign(
      {
        email: user.email,
      },
      {
        expiresIn: '30 days',
        subject: user.id,
      },
    );

    return { accessToken: token };
  }

  async checkToken(token: string) {
    try {
      const data = await this.jwtService.verify(token);
      return data;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
