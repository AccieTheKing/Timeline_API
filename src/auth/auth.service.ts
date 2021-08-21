import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

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
}
