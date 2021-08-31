import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MilestoneDocument = Milestone & Document;

@Schema()
export class Milestone {
  @Prop({ type: Types.ObjectId, required: true })
  boardID: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: false })
  endDate: Date;

  @Prop({ required: true })
  actualSituation: string;

  @Prop({ required: false })
  desiredSituation: string;
}

export const MilestoneSchema = SchemaFactory.createForClass(Milestone);
