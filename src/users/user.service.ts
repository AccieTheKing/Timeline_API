import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(createUser: User): Promise<User> {
    const createdUser = new this.userModel(createUser);
    return createdUser.save();
  }

  async findUser(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async findAllUser(properties?: Partial<User>): Promise<User[]> {
    return this.userModel.find(properties);
  }

  async deleteUser(username: string): Promise<User> {
    return this.userModel.findOneAndDelete({ username });
  }
}
