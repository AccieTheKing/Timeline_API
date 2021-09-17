import { APP_SUBSCRIPTION, IUser, User, USER_ROLES } from '@models/user.model';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

export async function createUserMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const { username, password } = req?.body;

		// Check empty fields
		if (!(username.trim().length > 0) || !(password.trim().length > 0)) {
			res.status(400).send({
				status: 400,
				message: 'Please check the given values',
			});
			return;
		}

		// Check if user already exist
		const foundUser = await User.findOne({ 'local.username': username });
		if (foundUser) {
			res.status(400).send({
				status: 400,
				message: 'Username already exist',
			});
			return;
		} else {
			const hashedPassword = await bcrypt.hash(password, 10);
			const createdUser = new User({
				local: {
					username,
					password: hashedPassword,
				},
				displayName: username,
				role: USER_ROLES.USER,
				subscriptionType: APP_SUBSCRIPTION.FREE,
				numberOfBoards: 0,
			});
			await createdUser.save();
			next();
		}
	} catch (err) {
		res.status(400).json(`Error: ${err}`);
	}
}

export async function updateUserMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const user = req?.user as IUser;
		const updatedUser = User.findByIdAndUpdate(user._id, { ...user });
		if (updatedUser) {
			next();
		} else {
			res.status(404).json({ status: 404, message: `User not found` });
		}
	} catch (error) {
		res.status(400).json(`Error: ${error}`);
		console.error(error);
	}
}

export async function deleteUserMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const userID: string = req?.body?.id;
		const deletedUser = await User.findByIdAndDelete(userID);

		if (deletedUser) {
			next();
		} else {
			res.status(404).json({ status: 404, message: `User not found` });
		}
	} catch (error) {
		res.status(400).json(`Error: ${error}`);
		console.error(error);
	}
}

export async function getAllUsersMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const allFoundUsers: IUser[] = await User.find();

		if (allFoundUsers) {
			req.body.allUsers = allFoundUsers;
			next();
		}
	} catch (error) {
		res.status(400).json(`Error: ${error}`);
		console.error(error);
	}
}
