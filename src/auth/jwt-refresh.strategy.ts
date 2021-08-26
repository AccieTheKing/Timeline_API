import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/schemas/user.schema';
import { UserService } from 'src/users/user.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: `${configService.get<string>('JWT_REFRESH_TOKEN_SECRET')}`,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: { username: string }): Promise<User> {
    const refreshToken: string = req.cookies?.Refresh;
    const foundUser = await this.userService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.username,
    );

    const { username, numberOfBoards, subscriptionType } = foundUser;

    return {
      id: foundUser._id,
      username,
      numberOfBoards,
      subscriptionType,
    } as User;
  }
}
