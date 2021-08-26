import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express-serve-static-core';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User, UserDocument } from 'src/schemas/user.schema';
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
    const { username, numberOfBoards, subscriptionType } =
      await this.userService.findUser(payload.username);
    return { username, numberOfBoards, subscriptionType };
  }
}
