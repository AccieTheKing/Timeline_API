import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from 'src/schemas/user.schema';
import { UserService } from 'src/users/user.service';
import { AuthService } from './auth.service';
import JwtAuthenticationGuard from './jwtAuthentication.guard';
import JwtRefreshGuard from './jwtRefresh.guard';
import { LocalAuthGuard } from './localAuthentication.guard';

interface RequestWithUser extends Request {
  user: User;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async authenticate(@Req() req: RequestWithUser) {
    const { user } = req;
    return user;
  }

  @Post('register')
  async registerUser(@Body() registrationData: User): Promise<User> {
    const user = await this.authService.registerUser({
      ...registrationData,
      subscriptionType: 'FREE',
      numberOfBoards: 0,
    });
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: RequestWithUser, @Res() res: Response) {
    const { user } = req;
    const accessTokenCookie =
      await this.authService.getCookieWithJwtAccessToken(user.username);
    const refreshTokenCookie =
      await this.authService.getCookieWithJwtRefreshToken(user.username);

    await this.userService.setCurrentRefreshToken(
      refreshTokenCookie.token,
      user.username,
    ); // store refresh token with user

    res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie.cookie]);

    return res.send(req.user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logOut(
    @Req() req: RequestWithUser,
    @Res() res: Response,
  ): Promise<void> {
    await this.userService.removeRefreshToken(req.user.username); // remove refresh token from user
    const cookie = await this.authService.getCookieForLogOut(); // clear refresh and access token
    res.setHeader('Set-Cookie', cookie);

    res.send({ message: 'successful logout' });
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async getRefreshToken(@Req() req: RequestWithUser, @Res() res: Response) {
    const { user } = req;
    const accessToken = await this.authService.getCookieWithJwtAccessToken(
      user.username,
    );

    res.setHeader('Set-Cookie', accessToken);
    return res.send(req.user);
  }
}
