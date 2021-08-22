import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: Types.ObjectId, required: true })
  id: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  subscriptionType: string;

  @Prop({ required: true })
  numberOfBoards: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
