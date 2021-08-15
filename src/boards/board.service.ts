import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Board, BoardDocument } from 'src/schemas/board.schema';

@Injectable()
export class BoardService {
  constructor(@InjectModel('Board') private boardModel: Model<BoardDocument>) {}

  async create(createBoard: Partial<Board>): Promise<Board> {
    const createdBoard = new this.boardModel(createBoard);
    return createdBoard.save();
  }

  async find(id: Types.ObjectId): Promise<Board> {
    return this.boardModel.findById(id);
  }

  async findAll(properties?: Partial<Board>): Promise<Board[]> {
    return this.boardModel.find(properties);
  }

  async update(id: Types.ObjectId, data: Board): Promise<Board> {
    return this.boardModel.findByIdAndUpdate(id, data);
  }

  async delete(id: Types.ObjectId): Promise<Board> {
    return this.boardModel.findByIdAndDelete(id);
  }
}
