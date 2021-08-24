import { ConflictException, Injectable } from '@nestjs/common';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserService } from 'src/users/user.service';
import { compareHash } from '../helpers/hashing';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

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

  async registerUser(userData: User): Promise<Partial<UserDocument>> {
    const checkUser = this.userService.findUser(userData.username);

    if (checkUser) {
      throw new ConflictException('User already exist');
    }

    const { password, ...rest } = await this.userService.create(userData);
    return rest;
  }
}
