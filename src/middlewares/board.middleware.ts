import { IBoard } from '@models/board.model';
import { IMilestone } from '@models/milestone.model';
import { IUser } from '@models/user.model';
import { BoardService } from '@services/board.service';
import { MilestoneService } from '@services/milestone.service';
import { Request, Response, NextFunction } from 'express';

const boardService: BoardService = new BoardService(); // board service
const milestoneService: MilestoneService = new MilestoneService(); // milestone serivce

// create board
export async function createBoardMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const details: { title: string } = req?.body;
		const user = req?.user as IUser;

		await boardService.create({
			userID: user._id,
			title: details.title,
			numberOfMilestones: 0,
		});

		req.body.data = await boardService.find({ userID: user._id });
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
		const boardID = req?.params.id as string;
		const boardData = req?.body as IBoard;
		const user = req?.user as IUser;

		const foundBoard = await boardService.findOne({
			_id: boardID,
			userID: user._id,
		});

		if (foundBoard) {
			await boardService.findByIdAndUpdate(boardID, {
				...boardData,
			});
			req.body.data = await boardService.find({ userID: user._id });
			next();
		} else {
			res.status(404).json({
				status: 404,
				message: `Board could not be updated`,
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

/**
 * DELETE BOARD
 *
 * This middelware function will check if the requested board that
 * needs to be removed belongs to him/her and remove it.
 */
export async function deleteBoardMiddleware(
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
			await boardService.findByIdAndDelete(foundBoard._id);

			const foundMilestones: IMilestone[] = await milestoneService.find({
				boardID,
			});

			if (foundMilestones) {
				foundMilestones.forEach((milestone) => milestone.remove());
			}

			req.body.data = await boardService.find({ userID: user._id });
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
