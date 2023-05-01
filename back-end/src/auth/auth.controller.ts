import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login() {
    return 'login';
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.create(body);
  }
}
