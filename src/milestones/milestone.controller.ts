import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardService } from 'src/boards/board.service';
import { Milestone } from 'src/schemas/milestone.schema';
import { MilestoneService } from './milestone.service';

@Controller('milestones')
export class MilestoneController {
  constructor(
    private milestoneService: MilestoneService,
    private boardsService: BoardService,
  ) {}

  @Get()
  async getAllMilestones(): Promise<Milestone[]> {
    return this.milestoneService.findAll();
  }

  @Get(':id')
  async getMilestone(@Param('id') id: string): Promise<Milestone> {
    return this.milestoneService.find(id);
  }

  @Get('boards/:id')
  async getAllMilestonesFromBoard(
    @Param('id') id: string,
  ): Promise<Milestone[]> {
    return this.milestoneService.findAll({ boardID: id });
  }

  @Post()
  async createNewMilestone(
    @Body('title') title: string,
    @Body('boardID') boardID: string,
    @Body('actualSituation') actualSituation: string,
    @Body('desiredSituation') desiredSituation: string,
    @Body('startDate') startDate: Date,
  ): Promise<Milestone> {
    const numberOfMilestones =
      (await this.boardsService.find(boardID)).numberOfMilestones + 1;
    this.boardsService.update(boardID, { numberOfMilestones });
    return this.milestoneService.create({
      title,
      boardID,
      actualSituation,
      desiredSituation,
      startDate,
    });
  }

  @Delete(':id/:boardID')
  async deleteMilestone(
    @Param('id') id: string,
    @Param('boardID') boardID: string,
  ): Promise<Milestone> {
    const numberOfMilestones =
      (await this.boardsService.find(boardID)).numberOfMilestones - 1;
    this.boardsService.update(boardID, { numberOfMilestones });
    return this.milestoneService.delete(id);
  }

  @Patch(':id')
  async updateMilestone(
    @Param('id') id: string,
    @Body('milestone') milestone: Milestone,
  ): Promise<Milestone> {
    return this.milestoneService.update(id, { ...milestone });
  }
}
