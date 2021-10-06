import { Router, Request, Response } from 'express';
import { Handler, Method, Route } from './types';
import { checkIfAuthenticated } from '@middlewares/auth.middleware';
import {
	fetchMilestoneMiddleware,
	fetchMilestoneOfBoardMiddleware,
	createMilestoneMiddleware,
	updateMilestoneMiddleware,
	deleteMilestoneMiddleware,
} from '@middlewares/milestone.middleware';

const milestoneRouter = Router();

function milestoneHandler(message?: string): Handler {
	const generalHandler: Handler = async (req: Request, res: Response) => {
		try {
			res.status(200).send({
				status: 200,
				message,
				data: req.body.data,
			});
		} catch (error) {
			res.status(500).json(`Error: ${error}`);
		}
	};
	return generalHandler;
}

const routes: Route[] = [
	{
		path: '/',
		method: Method.GET,
		middleware: [checkIfAuthenticated, fetchMilestoneMiddleware],
		handler: milestoneHandler(`Succesfully fetched milestones`),
	},
	{
		path: '/:boardID',
		method: Method.GET,
		middleware: [checkIfAuthenticated, fetchMilestoneOfBoardMiddleware],
		handler: milestoneHandler(`Succesfully fetched milestones`),
	},
	{
		path: '/',
		method: Method.POST,
		middleware: [checkIfAuthenticated, createMilestoneMiddleware],
		handler: milestoneHandler(`Succesfully created milestone`),
	},
	{
		path: '/:id',
		method: Method.PATCH,
		middleware: [checkIfAuthenticated, updateMilestoneMiddleware],
		handler: milestoneHandler(`Succesfully updated milestone`),
	},
	{
		path: '/:id',
		method: Method.DELETE,
		middleware: [checkIfAuthenticated, deleteMilestoneMiddleware],
		handler: milestoneHandler(`Succesfully deleted milestone`),
	},
];

/**
 * This transforms the routes in the array to express functions
 * for routing:
 *
 * milestoneRouter.get('path',middleware,  handler)
 * milestoneRouter[method](path, middleware, handler)
 */
routes.forEach((route: Route) => {
	const { path, method, middleware, handler } = route;
	milestoneRouter[method](path, middleware, handler);
});

export { milestoneRouter };
