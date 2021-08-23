import { Injectable } from '@nestjs/common';
import { User, UserDocument } from 'src/schemas/user.schema';
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
  ): Promise<Partial<UserDocument>> {
    const user = await this.userService.findUser(username);

    if (user && user.password === password) {
      const {
        password,
        username,
        subscriptionType,
        numberOfBoards,
        _id,
        ...rest
      } = user;
      return { username, subscriptionType, numberOfBoards, _id };
    }

    return null;
  }

  async login(user: Partial<User>): Promise<{ access_token: string }> {
    console.log(user);
    const payload = { username: user.username };
    return { access_token: this.jwtService.sign(payload) };
  }
}
