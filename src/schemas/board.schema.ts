import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BoardDocument = Board & Document;

@Schema({ timestamps: true })
export class Board {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  numberOfMilestones: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userID: string;

  @Prop({ required: false })
  createdAt: string;

  @Prop({ required: false })
  updatedAt: string;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
