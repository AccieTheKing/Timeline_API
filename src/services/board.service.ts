import { IBoard, Board } from '@models/board.model';
import { IServiceMethods } from '@services/interface';

export class BoardService implements IServiceMethods<IBoard> {
	constructor() {}

	async findAndDelete(id: string): Promise<void> {
		try {
			await Board.findByIdAndDelete(id);
		} catch (error) {
			console.error(error);
		}
	}

	async findAll(): Promise<IBoard[]> {
		try {
			return await Board.find();
		} catch (error) {
			console.error(error);
		}
	}

	async find(id: string): Promise<IBoard> {
		try {
			return await Board.findById(id);
		} catch (error) {
			console.error(error);
		}
	}

	async update(board: IBoard): Promise<IBoard> {
		try {
			return await Board.findByIdAndUpdate(board._id, {
				...board,
			});
		} catch (error) {
			console.error(error);
		}
	}

	async create(board: IBoard): Promise<IBoard> {
		try {
			const newBoard = new Board(board);
			return await newBoard.save();
		} catch (error) {
			console.error(error);
		}
	}
}
