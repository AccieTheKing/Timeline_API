import { APP_SUBSCRIPTION, IUser, User, USER_ROLES } from '@models/user.model';
import { Request, Response, NextFunction } from 'express';

export function checkRoleMiddleWare(role: USER_ROLES) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const user = req?.user as IUser;

		if (user) {
			const foundUser = await User.findById(user.id);
			if (foundUser.role === role) {
				next();
				return;
			}
		}

		res.status(403).send({
			status: 403,
			message: 'You do not have permission to access this endpoint',
		});
	};
}
