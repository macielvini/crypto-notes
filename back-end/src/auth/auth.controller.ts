import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/users.decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: AuthLoginDTO) {
    return this.authService.login(body);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@User() user) {
    delete user.password;
    return user;
  }
}
