import { IMilestone } from '@models/milestone.model';
import { IUser } from '@models/user.model';
import { MilestoneService } from '@services/milestone.service';
import { NextFunction, Request, Response } from 'express';

const milestoneService: MilestoneService = new MilestoneService(); // milestone serivce

function milestoneHandler(status: number, message: string) {
	const handlerFunction = (req: Request, res: Response): Response => {
		return res.status(status).json({
			status,
			message,
		});
	};
	return handlerFunction;
}

/**
 * CREATE MILESTONE
 *
 * This middleware function checks the signed in user and creates
 * a milstone for that user.
 */
export async function createMilestoneMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const user = req?.user as IUser;
		const newMilestone = await milestoneService.create({
			title: req.body.title,
			startDate: req.body.date.start,
			endDate: req.body.date.end,
			actualSituation: req.body.comment.actual,
			desiredSituation: req.body.comment.desired,
			boardID: req.body.boardID,
		});

		if (newMilestone) {
			req.body.data = await milestoneService.find({ userID: user._id });
			next();
		} else {
			milestoneHandler(404, 'Story could not be found');
		}
	} catch (error) {
		milestoneHandler(404, `Something went wrong: ${error}`);
	}
}

/**
 * UPDATE MILESTONE
 *
 * This middleware function checks the signed in user and updates
 * the values given in the body.
 */
export async function updateMilestoneMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const milestoneID = req?.params.id as string;
		const milestoneData = req?.body as IMilestone;
		const user = req?.user as IUser;

		const foundMilestone = await milestoneService.findOne({
			_id: milestoneID,
			userID: user._id,
		});

		if (foundMilestone) {
			await milestoneService.findByIdAndUpdate(milestoneID, {
				...milestoneData,
			});
			req.body.data = await milestoneService.find({ userID: user._id });
			next();
		} else {
			milestoneHandler(404, 'Board could not be updated');
		}
	} catch (error) {
		milestoneHandler(404, `Something went wrong: ${error}`);
		console.log('Something went wrong:', error);
	}
}

/**
 * DELETE MILESTONE
 *
 * This middelware function will check if the requested board that
 * needs to be removed belongs to him/her and remove it.
 */
export async function deleteMilestoneMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const milestoneID = req?.params?.id as string;
		const user = req?.user as IUser;

		const foundMilestone = await milestoneService.findOne({
			_id: milestoneID,
			userID: user._id,
		});

		if (foundMilestone) {
			await milestoneService.findByIdAndDelete(foundMilestone._id);
			req.body.data = await milestoneService.find({ userID: user._id });
			next();
		} else {
			res.status(403).send({
				status: 403,
				message: 'This board can not be accessed by you',
			});
		}
	} catch (error) {
		milestoneHandler(404, `Something went wrong: ${error}`);
		console.log('Something went wrong:', error);
	}
}

/**
 * FETCH ALL MILESTONES
 *
 * This middelware function will fetch all the milestones of the signed in user
 */
export async function fetchMilestoneMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const user = req?.user as IUser;
		req.body.data = await milestoneService.find({ userID: user._id });
		next();
	} catch (error) {
		milestoneHandler(404, `Something went wrong: ${error}`);
		console.log('Something went wrong:', error);
	}
}

/**
 * FETCH ALL MILESTONES OF BOARD
 */
export async function fetchMilestoneOfBoardMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const user = req?.user as IUser;
		const boardID = req?.params?.boardID;
		req.body.data = await milestoneService.find({
			userID: user._id,
			boardID,
		});
		next();
	} catch (error) {
		milestoneHandler(404, `Something went wrong: ${error}`);
		console.log('Something went wrong:', error);
	}
}

/**
 * This middleware function will check if the milestone that has been requested
 * belongs to the signed in user and if the milestone exits
 */
export async function fetchMilestoneWithParamId(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const _id = req?.params?.id as string;
		const user = req?.user as IUser;
		const foundMilestone = await milestoneService.findOne({
			_id,
			userID: user._id,
		});

		if (foundMilestone) {
			req.body.data = foundMilestone;
			next();
		} else {
			milestoneHandler(403, `This board can not be accessed by you`);
		}
	} catch (error) {
		milestoneHandler(404, `Something went wrong: ${error}`);
		console.log('Something went wrong:', error);
	}
}
