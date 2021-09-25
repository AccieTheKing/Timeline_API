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

routes.forEach((route) => {
	const { method, path, middleware, handler } = route;
	boardRouter[method](path, middleware, handler);
});

// @NOTE: Example of how it is been used
// boardRouter.get(
// 	'/:id',
// 	[checkIfAuthenticated, fetchBoardWithParamId],
// 	async (req: Request, res: Response) => {
// 		try {
// 			res.status(200).json(req.body.data);
// 		} catch (error) {
// 			res.status(500).json(`Error: ${error}`);
// 		}
// 	}
// );

export { boardRouter };
