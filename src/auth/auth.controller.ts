import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { User, UserDocument } from 'src/schemas/user.schema';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './localAuthentication.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(
    @Body() registrationData: User,
  ): Promise<Partial<UserDocument>> {
    return this.authService.registerUser({
      ...registrationData,
      subscriptionType: 'FREE',
      numberOfBoards: 0,
    });
  }
}
