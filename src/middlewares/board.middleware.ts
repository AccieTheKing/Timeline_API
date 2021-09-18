import { IBoard } from '@models/board.model';
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
		console.log(`boardID: ${boardID} \n
        userdata: ${req.user}`);

		// check if user owns the board of the given id
		await boardService.findByIdAndDelete(boardID);
		next();
	} catch (error) {
		console.log('Something went wrong:', error);
	}
}

// fetch all boards
export async function fetchBoardMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		console.log(req.user);
		// const boards = await boardService.find({userID:});
		next();
	} catch (error) {
		console.log('Something went wrong:', error);
	}
}
