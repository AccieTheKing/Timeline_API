import { Controller, Get, Param } from '@nestjs/common';
import { UserDocument } from 'src/schemas/user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':username')
  async getSingleUser(
    @Param('username') username: string,
  ): Promise<UserDocument> {
    return this.userService.findUser(username);
  }

  @Get()
  async getAllUsers(): Promise<UserDocument[]> {
    return this.userService.findAllUser({});
  }
}
