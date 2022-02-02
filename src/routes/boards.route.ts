import { Request, Response, Router } from 'express';
import {
	createBoardMiddleware,
	deleteBoardMiddleware,
	fetchBoardMiddleware,
	fetchBoardWithParamId,
	updateBoardMiddleware,
} from '@middlewares/board.middleware';
import { checkIfAuthenticated } from '@middlewares/auth.middleware';
import { Route, Handler, Method } from '@routes/types';

const boardRouter = Router();

function boardsHandler(message?: string): Handler {
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
		method: Method.GET,
		path: '/',
		middleware: [checkIfAuthenticated, fetchBoardMiddleware],
		handler: boardsHandler('Successful fetched boards data'),
	},
	{
		method: Method.GET,
		path: '/:id',
		middleware: [checkIfAuthenticated, fetchBoardWithParamId],
		handler: boardsHandler('Successful fetched board'),
	},
	{
		method: Method.POST,
		path: '/',
		middleware: [checkIfAuthenticated, createBoardMiddleware],
		handler: boardsHandler('Successful created board'),
	},
	{
		method: Method.PUT,
		path: '/:id',
		middleware: [checkIfAuthenticated, updateBoardMiddleware],
		handler: boardsHandler('Successful updated board '),
	},
	{
		method: Method.DELETE,
		path: '/:id',
		middleware: [checkIfAuthenticated, deleteBoardMiddleware],
		handler: boardsHandler(
			'Successful deleted board and containing stories'
		),
	},
];

/**
 * This transforms the routes in the array to express functions
 * for routing:
 *
 * boardRouter.get('path',middleware,  handler)
 * boardRouter[method](path, middleware, handler)
 */
routes.forEach((route) => {
	const { method, path, middleware, handler } = route;
	boardRouter[method](path, middleware, handler);
});

export { boardRouter };
