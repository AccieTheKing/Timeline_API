import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(createUser: User): Promise<UserDocument> {
    const createdUser = new this.userModel(createUser);
    return createdUser.save();
  }

  async findUser(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username });
  }

  async findAllUser(properties?: Partial<User>): Promise<UserDocument[]> {
    return this.userModel.find(properties);
  }

  async deleteUser(username: string): Promise<UserDocument> {
    return this.userModel.findOneAndDelete({ username });
  }
}
