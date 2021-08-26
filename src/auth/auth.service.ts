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
  }
}
