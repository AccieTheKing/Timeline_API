import { IUser, User } from '@models/user.model';
import { IServiceMethods } from '@services/interface';

/**
 * This class is for all the database functionalities for the user.
 * The creation of this class was meant for trying to know how to work with interfaces
 * and the use of generics.
 *
 * @author AccieTheKing
 */
export class UserService implements IServiceMethods<IUser> {
	private service;

	constructor() {
		this.service = User;
	}

	async find(param: any): Promise<IUser[]> {
		throw new Error('Method not implemented.');
	}

	async findAll(): Promise<IUser[]> {
		try {
			return await this.service.find();
		} catch (error) {
			console.error(error);
		}
	}

	async findById(id: string): Promise<IUser> {
		try {
			return await this.service.findById(id);
		} catch (error) {
			console.error(error);
		}
	}

	async findOne(param: any): Promise<IUser> {
		try {
			return await this.service.findOne(param);
		} catch (error) {
			console.error(error);
		}
	}

	async findByIdAndUpdate(id: string, param: any): Promise<IUser> {
		try {
			return await this.service.findByIdAndUpdate(id, param);
		} catch (error) {
			console.error(error);
		}
	}

	async findByIdAndDelete(id: string): Promise<IUser> {
		try {
			return await this.service.findByIdAndDelete(id);
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
