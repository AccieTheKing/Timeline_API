import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { Board } from 'src/schemas/board.schema';
import { BoardService } from './board.service';

@Controller('boards')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get()
  async getAllBoards(): Promise<Board[]> {
    return this.boardService.findAll();
  }

  @Get(':id')
  async getBoard(@Param('id') id: Types.ObjectId): Promise<Board> {
    return this.boardService.find(id);
  }

  @Post()
  async createNewBoard(
    @Body('title') title: string,
    @Body('userID') userID: Types.ObjectId,
  ): Promise<Board> {
    return this.boardService.create({
      title,
      userID,
      numberOfStories: 0,
    });
  }

  @Delete(':id')
  async deleteBoard(@Param('id') id: Types.ObjectId): Promise<Board> {
    return this.boardService.delete(id);
  }

  @Patch()
  async updateBoard(
    @Body('id') id: Types.ObjectId,
    @Body('title') title: string,
  ): Promise<Board> {
    return this.boardService.update(id, title);
  }
}
