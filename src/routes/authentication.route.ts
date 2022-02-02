import {
	googleStrategyMiddleware,
	localStategyMiddleware,
	twitterStrategyMiddleware,
} from '@helpers/passport.helper';
import { checkRoleMiddleWare } from '@middlewares/auth.middleware';
import {
	createUserMiddleware,
	deleteUserMiddleware,
	getAllUsersMiddleware,
} from '@middlewares/user.middleware';
import { USER_ROLES } from '@models/user.model';
import { Request, Response, Router } from 'express';
import { Handler, Method, Route } from './types';

const authRouter = Router();

enum HANDLER_TYPE {
	LOGOUT,
	LOGIN,
	REDIRECT,
}

function authHandler(message?: string, type?: HANDLER_TYPE): Handler {
	const generalHandler: Handler = async (req: Request, res: Response) => {
		try {
			switch (type) {
				case null:
				case HANDLER_TYPE.LOGIN:
					res.status(200).send({
						status: 200,
						message,
						data: req?.user,
					});
					break;
				case HANDLER_TYPE.LOGOUT:
					req.logOut();
					res.status(200).send({
						status: 200,
						message,
					});
					break;
				case HANDLER_TYPE.REDIRECT:
					res.redirect('http://localhost:3000/overview');
					break;
			}
		} catch (error) {
			res.status(500).json(`Error: ${error}`);
		}
	};

	return generalHandler;
}

const routes: Route[] = [
	{
		path: '/login',
		method: Method.POST,
		middleware: [localStategyMiddleware],
		handler: authHandler('Successfully authenticated', HANDLER_TYPE.LOGIN),
	},
	{
		path: '/register',
		method: Method.POST,
		middleware: [createUserMiddleware],
		handler: authHandler('Successfully created user'),
	},
	{
		path: '/google',
		method: Method.GET,
		middleware: [googleStrategyMiddleware({ scope: ['profile'] })], // passport.authenticate(googleStrat, param)
		handler: authHandler('Successful signed in with Google'),
	},
	{
		path: '/google/callback',
		method: Method.GET,
		middleware: [
			googleStrategyMiddleware({
				failureRedirect: '/login',
				session: false,
			}),
		], // passport.authenticate(googleStrat, param)
		handler: authHandler(null, HANDLER_TYPE.REDIRECT),
	},
	{
		path: '/twitter',
		method: Method.GET,
		middleware: [twitterStrategyMiddleware()],
		handler: authHandler('Successfully signed in with Twitter'),
	},
	{
		path: '/twitter/callback',
		method: Method.GET,
		middleware: [twitterStrategyMiddleware({ failureRedirect: '/login' })],
		handler: authHandler(null, HANDLER_TYPE.REDIRECT),
	},
	{
		path: '/user',
		method: Method.GET,
		middleware: [
			checkRoleMiddleWare(USER_ROLES.ADMIN),
			getAllUsersMiddleware,
		],
		handler: authHandler('Successfully fetched users'),
	},
	{
		path: '/user',
		method: Method.POST,
		middleware: [
			checkRoleMiddleWare(USER_ROLES.ADMIN),
			createUserMiddleware,
		],
		handler: authHandler('Successfully created user'),
	},
	{
		path: '/user',
		method: Method.PUT,
		middleware: [checkRoleMiddleWare(USER_ROLES.ADMIN)],
		handler: authHandler('Successfully updated user'),
	},
	{
		path: '/user',
		method: Method.DELETE,
		middleware: [
			checkRoleMiddleWare(USER_ROLES.ADMIN),
			deleteUserMiddleware,
		],
		handler: authHandler('Successfully updated user'),
	},
	{
		path: '/logout',
		method: Method.GET,
		middleware: [],
		handler: authHandler('Successfully logged out', HANDLER_TYPE.LOGOUT),
	},
];

routes.forEach((route) => {
	const { method, path, middleware, handler } = route;
	authRouter[method](path, middleware, handler);
});

// authRouter.post(
// 	'/login',
// 	localStategyMiddleware,
// 	async (req: Request, res: Response) => {
// 		res.send({
// 			status: 200,
// 			message: 'Successfully authenticated',
// 			data: req.user,
// 		});
// 	}
// );

export { authRouter };
