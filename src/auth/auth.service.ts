import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UserService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareHash } from '../helpers/hashing';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Partial<User>> {
    const user = await this.userService.findUser(username);
    const isMatch = await compareHash(password, user.password);

    if (user && isMatch) {
      const {
        password,
        username,
        subscriptionType,
        numberOfBoards,
        _id,
        ...rest
      } = user;
      return { username, subscriptionType, numberOfBoards, id: _id };
    }

    return null;
  }

  async login(user: Partial<User>): Promise<{ access_token: string }> {
    const payload = { username: user.username };
    return { access_token: this.jwtService.sign(payload) };
  }
}
