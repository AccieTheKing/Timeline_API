import { localStategyMiddleware } from '@helpers/passport.helper';
import { checkRoleMiddleWare } from '@middlewares/auth.middleware';
import {
	createUserMiddleware,
	deleteUserMiddleware,
	getUserMiddleware,
} from '@middlewares/user.middleware';
import { USER_ROLES } from '@models/user.model';
import { Request, Response, Router } from 'express';

const authRouter = Router();

authRouter.post(
	'/login',
	localStategyMiddleware,
	async (req: Request, res: Response) => {
		res.send({
			status: 200,
			message: 'Successfully authenticated',
			data: req.user,
		});
	}
);

authRouter.get('/logout', async (req: Request, res: Response) => {
	req.logOut();
	res.send({
		status: 200,
		message: 'Successfully logged out',
	});
});

authRouter.post(
	'/register',
	createUserMiddleware,
	async (req: Request, res: Response) => {
		res.status(200).send({
			status: 200,
			message: 'successfully created user',
		});
	}
);

/**
 * Admin routes about users
 */
authRouter.get(
	'/user',
	[checkRoleMiddleWare(USER_ROLES.ADMIN), getUserMiddleware],
	async (req: Request, res: Response) => {
		res.status(200).send({
			status: 200,
			message: 'successfully created user',
			data: req.body.allUsers,
		});
	}
);
authRouter.post(
	'/user',
	[checkRoleMiddleWare(USER_ROLES.ADMIN), createUserMiddleware],
	async (req: Request, res: Response) => {
		res.status(200).send({
			status: 200,
			message: 'successfully created user',
		});
	}
);
authRouter.put(
	'/user',
	[checkRoleMiddleWare(USER_ROLES.ADMIN)],
	async (req: Request, res: Response) => {
		res.status(200).send({
			status: 200,
			message: 'successfully updated user',
		});
	}
);
authRouter.delete(
	'/user',
	[checkRoleMiddleWare(USER_ROLES.ADMIN), deleteUserMiddleware],
	async (req: Request, res: Response) => {
		res.status(200).send({
			status: 200,
			message: 'successfully deleted user',
		});
	}
);

export { authRouter };
