import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compareHash, createHash } from 'src/helpers/hashing';
import { UserDocument, User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(createUser: User): Promise<UserDocument> {
    const createdUser = new this.userModel(createUser);
    return createdUser.save();
  }

  async findUser(username: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new NotFoundException('User does not exists');
    }

    return user;
  }

  async findAllUser(properties?: Partial<User>): Promise<UserDocument[]> {
    return this.userModel.find(properties);
  }

  async deleteUser(username: string): Promise<UserDocument> {
    return this.userModel.findOneAndDelete({ username });
  }

  /**
   * This method is for storing the refresh token in the user schema
   *
   * @param refreshToken
   * @param username
   */
  async setCurrentRefreshToken(
    refreshToken: string,
    username: string,
  ): Promise<void> {
    const currentRefreshToken = await createHash(refreshToken);
    this.userModel.findOneAndUpdate(
      { username },
      {
        refreshToken: currentRefreshToken,
      },
    );
  }

  /**
   * This method will verify the refresh token stored with the user schema in the database
   *
   * @param refreshToken
   * @param username
   * @returns
   */
  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    username: string,
  ): Promise<UserDocument> {
    const user: UserDocument = await this.findUser(username);
    const isRefreshTokenValid: boolean = await compareHash(
      refreshToken,
      user.refreshToken,
    );

    if (isRefreshTokenValid) {
      return user;
    }
  }

  async removeRefreshToken(username: string): Promise<UserDocument> {
    const user = this.userModel.findOneAndUpdate(
      { username },
      {
        refreshToken: null,
      },
    );
    return user;
  }
}
