import { IMilestone, Milestone } from '@models/milestone.model';
import { IServiceMethods } from '@services/interface';

export class MilestoneService implements IServiceMethods<IMilestone> {
	constructor() {}

	findAndDelete(id: string): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async findAll(): Promise<IMilestone[]> {
		try {
			return await Milestone.find();
		} catch (error) {
			console.error(error);
		}
	}

	async find(id: string): Promise<IMilestone> {
		try {
			return await Milestone.findById(id);
		} catch (error) {
			console.error(error);
		}
	}

	async update(milestone: IMilestone): Promise<IMilestone> {
		try {
			return await Milestone.findByIdAndUpdate(milestone._id, {
				...milestone,
			});
		} catch (error) {
			console.error(error);
		}
	}

	async create(user: IMilestone): Promise<IMilestone> {
		try {
			const newUser = new User(user);
			return await newUser.save();
		} catch (error) {
			console.error(error);
		}
	}
}
