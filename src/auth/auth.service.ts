import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UserService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';

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

    if (user && user.password === password) {
      const { password, username, subscriptionType, numberOfBoards, ...rest } =
        user;
      return { username, subscriptionType, numberOfBoards };
    }

    return null;
  }

  async login(user: Partial<User>): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
