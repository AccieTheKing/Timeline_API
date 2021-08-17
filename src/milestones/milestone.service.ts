import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Milestone, MilestoneDocument } from 'src/schemas/milestone.schema';

@Injectable()
export class MilestoneService {
  constructor(
    @InjectModel('Milestone') private milestoneModel: Model<MilestoneDocument>,
  ) {}

  async create(createMilestone: Partial<Milestone>): Promise<Milestone> {
    const createdMilestone = new this.milestoneModel(createMilestone);

    return createdMilestone.save();
  }

  async find(id: string): Promise<Milestone> {
    return this.milestoneModel.findById(id);
  }

  async findAll(properties?: Partial<Milestone>): Promise<Milestone[]> {
    return this.milestoneModel.find(properties);
  }

  async update(
    id: string,
    properties?: Partial<Milestone>,
  ): Promise<Milestone> {
    return this.milestoneModel.findByIdAndUpdate(id, { ...properties });
  }

  async delete(id: string): Promise<Milestone> {
    return this.milestoneModel.findByIdAndDelete(id);
  }

  async deleteAll(boardID: string): Promise<any> {
    return this.milestoneModel.deleteMany({ boardID });
  }
}
