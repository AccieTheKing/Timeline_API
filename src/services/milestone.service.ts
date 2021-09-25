import { IMilestone, Milestone } from '@models/milestone.model';
import { IServiceMethods } from '@services/interface';

export class MilestoneService implements IServiceMethods<IMilestone> {
	private service;

	constructor() {
		this.service = Milestone;
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
