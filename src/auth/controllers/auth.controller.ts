import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  login(@Body() user): Promise<{ token: string }> {
    return this.authService.login(user.email, user.password);
  }
}
