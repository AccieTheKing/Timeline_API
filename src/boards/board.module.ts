import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MilestoneModule } from 'src/milestones/milestone.module';
import { BoardSchema } from 'src/schemas/board.schema';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Board', schema: BoardSchema }]),
    forwardRef(() => MilestoneModule),
  ],
  controllers: [BoardController],
  providers: [BoardService],
  exports: [BoardService],
})
export class BoardModule {}
