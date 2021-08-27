import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/schemas/user.schema';
import { UserService } from 'src/users/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: `${configService.get<string>('JWT_ACCESS_TOKEN_SECRET')}`,
    });
  }

  async validate(payload: { username: string }): Promise<User> {
    const foundUser = await this.userService.findUser(payload.username);
    const { password, refreshToken, ...rest } = foundUser.toJSON() as User;
    return rest;
  }
}
