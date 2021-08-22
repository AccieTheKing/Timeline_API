import { Controller, Get, Param } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getSingleUser(@Param('id') id: string): Promise<User> {
    return this.userService.findUser(id);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAllUser({});
  }
}
