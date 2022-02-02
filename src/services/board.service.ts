import { IBoard, Board } from '@models/board.model';
import { User, IUser } from '@models/user.model';
import { IServiceMethods } from '@services/interface';

export class BoardService implements IServiceMethods<IBoard> {
	private service;
	private userService;

	constructor() {
		this.service = Board;
		this.userService = User;
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

			let userData: IUser = await this.userService.findOne({
				_id: createdBoard.userID,
			});
			userData.numberOfBoards += 1;
			//@ts-ignore
			userData.save();
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
			const foundBoard = await this.service.findOne({ _id: id });
			let userData: IUser = await this.userService.findOne({
				_id: foundBoard.userID,
			});
			userData.numberOfBoards -= 1;
			//@ts-ignore
			userData.save();
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
