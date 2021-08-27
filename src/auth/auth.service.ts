import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemas/user.schema';
import { UserService } from 'src/users/user.service';
import { compareHash, createHash } from '../helpers/hashing';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const foundUser = await this.userService.findUser(username); // find user
    const isMatch = await compareHash(password, foundUser.password); // check password

    if (foundUser && isMatch) {
      const { password, ...rest } = foundUser.toJSON() as User;
      return rest;
    }

    return null;
  }

  async registerUser(userData: User): Promise<User> {
    const userAlreadyExists = await this.userService.findUser(
      userData.username,
    );

    if (userAlreadyExists) {
      throw new ConflictException('User already exist');
    }

    userData.password = await createHash(userData.password); // hash user password
    const createdUser = await this.userService.create(userData);
    const { password, ...user } = createdUser.toJSON() as User; // remove user password from response

    return user;
  }

  async getCookieWithJwtAccessToken(username: string): Promise<string> {
    try {
      const payload = { username };
      const token: string = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: `${this.configService.get<string>(
          'JWT_ACCESS_TOKEN_SIGN_TIME',
        )}s`,
      });
      return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
        'JWT_REFRESH_TOKEN_SIGN_TIME',
      )}`;
    } catch (error) {
      console.log(error);
    }
  }

  async getCookieWithJwtRefreshToken(
    username: string,
  ): Promise<{ cookie: string; token: string }> {
    try {
      const payload = { username };
      const token: string = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: `${this.configService.get<string>(
          'JWT_REFRESH_TOKEN_SIGN_TIME',
        )}s`,
      });
      const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
        'JWT_REFRESH_TOKEN_SIGN_TIME',
      )}`;

      return {
        cookie,
        token,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getCookieForLogOut(): Promise<[string, string]> {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
}
