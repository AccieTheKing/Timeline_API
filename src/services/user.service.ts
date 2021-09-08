import { IUser, User } from '@models/user.model';
import { IServiceMethods } from '@services/interface';

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
			const createdUser: IUser = await newUser.save();
			return createdUser;
		} catch (error) {
			console.error(error);
		}
	}
}
