import { IUser, User } from '../database/modals/user.model';
import { IServiceMethods } from './service.interface';

export class UserService implements IServiceMethods<IUser> {
	constructor() {}

	async findAll(): Promise<IUser[]> {
		try {
			return await User.find();
		} catch (error) {
			console.error(error);
		}
	}

	async find(id: number): Promise<IUser> {
		try {
			return await User.findById(id);
		} catch (error) {
			console.error(error);
		}
	}

	async update(user: IUser): Promise<IUser> {
		try {
			return await User.findByIdAndUpdate(user._id, { ...user });
		} catch (error) {
			console.error(error);
		}
	}

	async create(user: IUser): Promise<IUser> {
		try {
			const newUser = new User(user);
			return await newUser.save();
		} catch (error) {
			console.error(error);
		}
	}
}
