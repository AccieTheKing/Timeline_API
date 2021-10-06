import { Board } from '@models/board.model';
import { IMilestone, Milestone } from '@models/milestone.model';
import { IServiceMethods } from '@services/interface';

export class MilestoneService implements IServiceMethods<IMilestone> {
	private service;
	private boardService;

	constructor() {
		this.service = Milestone;
		this.boardService = Board;
	}

	async find(param: any): Promise<IMilestone[]> {
		try {
			return this.service.find(param);
		} catch (error) {
			console.log(error);
		}
	}

	async findAll(): Promise<IMilestone[]> {
		try {
			return this.service.find();
		} catch (error) {
			console.log(error);
		}
	}

	async create(element: IMilestone): Promise<IMilestone> {
		try {
			const newMilestone = new Milestone(element);
			let updateBoardCounter = await this.boardService.findById(
				newMilestone.boardID
			);

			updateBoardCounter.numberOfMilestones += 1;
			await updateBoardCounter.save();

			const createdMilestone: IMilestone = await newMilestone.save();
			return createdMilestone;
		} catch (error) {
			console.log(error);
		}
	}

	async findById(id: string): Promise<IMilestone> {
		try {
			return this.service.findById(id);
		} catch (error) {
			console.log(error);
		}
	}

	async findOne(param: any): Promise<IMilestone> {
		try {
			return this.service.findOne(param);
		} catch (error) {
			console.log(error);
		}
	}

	async findByIdAndDelete(id: string): Promise<IMilestone> {
		try {
			const milestone = await this.service.findById(id);
			let updateBoardCounter = await this.boardService.findById(
				milestone.boardID
			);
			updateBoardCounter.numberOfMilestones -= 1;
			await updateBoardCounter.save();
			return this.service.findByIdAndDelete(id);
		} catch (error) {
			console.log(error);
		}
	}

	async findByIdAndUpdate(id: string, param: any): Promise<IMilestone> {
		try {
			return this.service.findByIdAndUpdate(id, param);
		} catch (error) {
			console.log(error);
		}
	}
}
