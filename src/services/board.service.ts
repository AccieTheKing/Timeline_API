import { IBoard, Board } from '@models/board.model';
import { IServiceMethods } from '@services/interface';

export class BoardService implements IServiceMethods<IBoard> {
	private service;

	constructor() {
		this.service = Board;
	}

	async find(param: any): Promise<IBoard[]> {
		try {
			return this.service.find(param);
		} catch (error) {
			console.log(error);
		}
	}

	async findAll(): Promise<IBoard[]> {
		try {
			return this.service.find();
		} catch (error) {
			console.log(error);
		}
	}

	async create(element: IBoard): Promise<IBoard> {
		try {
			const newBoard = new Board(element);
			const createdBoard: IBoard = await newBoard.save();
			return createdBoard;
		} catch (error) {
			console.log(error);
		}
	}

	async findById(id: string): Promise<IBoard> {
		try {
			return this.service.findById(id);
		} catch (error) {
			console.log(error);
		}
	}

	async findOne(param: any): Promise<IBoard> {
		try {
			return this.service.findOne(param);
		} catch (error) {
			console.log(error);
		}
	}

	async findByIdAndDelete(id: string): Promise<IBoard> {
		try {
			return this.service.findByIdAndDelete(id);
		} catch (error) {
			console.log(error);
		}
	}

	async findByIdAndUpdate(id: string, param: any): Promise<IBoard> {
		try {
			return this.service.findByIdAndUpdate(id, param);
		} catch (error) {
			console.log(error);
		}
	}
}
