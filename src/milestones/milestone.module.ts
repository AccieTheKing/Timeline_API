import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardModule } from 'src/boards/board.module';
import { MilestoneSchema } from 'src/schemas/milestone.schema';
import { MilestoneController } from './milestone.controller';
import { MilestoneService } from './milestone.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Milestone', schema: MilestoneSchema }]),
    forwardRef(() => BoardModule),
  ],
  controllers: [MilestoneController],
  providers: [MilestoneService],
  exports: [MilestoneService],
})
export class MilestoneModule {}
