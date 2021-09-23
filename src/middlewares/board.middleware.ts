import { IBoard } from '@models/board.model';
import { IUser } from '@models/user.model';
import { BoardService } from '@services/board.service';
import { Request, Response, NextFunction } from 'express';

const boardService = new BoardService(); // board service

// create board
export async function createBoardMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const details: { userID: string; title: string } = req?.body;
		await boardService.create({
			userID: details.userID,
			title: details.title,
			numberOfMilestones: 0,
		});
		next();
	} catch (error) {
		console.log('Something went wrong:', error);
	}
}

// update board
export async function updateBoardMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const board = req?.body as IBoard;
		const updatedBoard = await boardService.findByIdAndUpdate(board._id, {
			...board,
		});
		if (updatedBoard) {
			next();
		} else {
			res.status(404).json({
				status: 404,
				message: `Board cound net be updated`,
			});
		}
	} catch (error) {
		res.status(404).json({
			status: 404,
			message: `Something went wrong: ${error.message}`,
		});
		console.log('Something went wrong:', error);
	}
}

// delete board
export async function deleteBoardMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const boardID: string = req?.body?.id;
		// check if user owns the board of the given id
		await boardService.findByIdAndDelete(boardID);
		next();
	} catch (error) {
		console.log('Something went wrong:', error);
	}
}

// fetch all boards of the signed in user
export async function fetchBoardMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const user = req?.user as IUser;
		req.body.data = await boardService.find({ userID: user._id });
		next();
	} catch (error) {
		console.log('Something went wrong:', error);
	}
}

/**
 * This middleware function will check if the board that is requested
 * belongs to the signed in user and if the board exits
 */
export async function fetchBoardWithParamId(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const boardID = req?.params?.id as string;
		const user = req?.user as IUser;
		const foundBoard = await boardService.findOne({
			_id: boardID,
			userID: user._id,
		});

		if (foundBoard) {
			req.body.data = foundBoard;
			next();
		} else {
			res.status(403).send({
				status: 403,
				message: 'This board can not be accessed by you',
			});
		}
	} catch (error) {
		console.log('Something went wrong:', error);
	}
}
