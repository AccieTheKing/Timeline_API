import { APP_SUBSCRIPTION, IUser, User, USER_ROLES } from '@models/user.model';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

export function checkRoleMiddleWare(role: USER_ROLES) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const user = req.user as IUser;

		if (user) {
			const foundUser = await User.findById(user._id);
			if (foundUser.role === role) {
				next();
			}
		}

		res.status(403).send({
			status: 403,
			message: 'You do not have permission to access this endpoint',
		});
	};
}

export async function createUserMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { username, password }: IUser = req?.body;

		// Check empty fields
		if (!(username.trim().length > 0) || !(password.trim().length > 0)) {
			res.status(400).send({
				status: 400,
				message: 'Please check the given values',
			});
		}

		// Check if user already exist
		const foundUser = await User.findOne({ username });
		if (foundUser) {
			res.status(400).send({
				status: 400,
				message: 'Username already exist',
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const createdUser: IUser = new User({
			username,
			password: hashedPassword,
			role: USER_ROLES.USER,
			subscriptionType: APP_SUBSCRIPTION.FREE,
			numberOfBoards: 0,
		});
		await createdUser.save();
		next();
	} catch (err) {
		res.status(400).json(`Error: ${err}`);
	}
}

export async function updateUserMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
);
