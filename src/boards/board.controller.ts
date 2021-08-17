import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MilestoneService } from 'src/milestones/milestone.service';
import { Board } from 'src/schemas/board.schema';
import { BoardService } from './board.service';

@Controller('boards')
export class BoardController {
  constructor(
    private boardService: BoardService,
    private milestoneService: MilestoneService,
  ) {}

  @Get()
  async getAllBoards(): Promise<Board[]> {
    return this.boardService.findAll();
  }

  @Get(':id')
  async getBoard(@Param('id') id: string): Promise<Board> {
    return this.boardService.find(id);
  }

  @Post()
  async createNewBoard(
    @Body('title') title: string,
    @Body('userID') userID: string,
  ): Promise<Board> {
    return this.boardService.create({
      title,
      userID,
      numberOfMilestones: 0,
    });
  }

  @Delete(':id')
  async deleteBoard(@Param('id') id: string): Promise<Board> {
    await this.milestoneService.deleteAll(id);
    return this.boardService.delete(id);
  }

  @Patch()
  async updateBoard(
    @Body('id') id: string,
    @Body('title') title: string,
  ): Promise<Board> {
    return this.boardService.update(id, { title });
  }
}
