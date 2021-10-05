import { Router, Request, Response } from 'express';
import { Board } from '@models/board.model';
import { Milestone } from '@models/milestone.model';
import { Handler, Method, Route } from './types';

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
		middleware: [],
		handler: milestoneHandler(`Succesfully fetched milestones`),
	},
	{
		path: '/:boardID',
		method: Method.GET,
		middleware: [],
		handler: milestoneHandler(`Succesfully fetched milestones`),
	},
	{
		path: '/',
		method: Method.POST,
		middleware: [],
		handler: milestoneHandler(`Succesfully created milestone`),
	},
	{
		path: '/:id',
		method: Method.PATCH,
		middleware: [],
		handler: milestoneHandler(`Succesfully updated milestone`),
	},
	{
		path: '/:id',
		method: Method.DELETE,
		middleware: [],
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

milestoneRouter.get('/', async (req, res) => {
	try {
		const story = await Milestone.find();
		res.json(story);
	} catch (err) {
		res.status(400).json(`Error: ${err}`);
	}
});

milestoneRouter.get('/:boardID', async (req, res) => {
	try {
		const story = await Milestone.find({ boardID: req.params.boardID });
		res.json(story);
	} catch (err) {
		res.status(400).json(`Error: ${err}`);
	}
});

milestoneRouter.post('/', async (req, res) => {
	try {
		const newStory = new Milestone({
			title: req.body.title,
			startDate: req.body.date.start,
			endDate: req.body.date.end,
			actualSituation: req.body.comment.actual,
			desiredSituation: req.body.comment.desired,
			boardID: req.body.boardID,
		});

		const updateBoardCounter = await Board.findById(newStory.boardID);
		updateBoardCounter.numberOfMilestones += 1;

		await updateBoardCounter.save();
		await newStory.save();
		const stories = await Milestone.find();
		res.status(201).json(stories);
	} catch (err) {
		res.status(400).json(`Error: ${err}`);
	}
});

milestoneRouter.post('/update/:id', async (req, res) => {
	try {
		const story = await Milestone.findById(req.params.id);

		const responseStory = req.body.story;

		story.title = responseStory.title;
		story.startDate = responseStory.startDate;
		story.endDate = responseStory.endDate;
		story.actualSituation = responseStory.actualSituation;
		story.desiredSituation = responseStory.desiredSituation;
		await story.save();

		res.json(story);
	} catch (err) {
		res.status(400).json(`Error: ${err}`);
	}
});

milestoneRouter.delete('/:id', async (req, res) => {
	try {
		const milestone = await Milestone.findById(req.params.id);
		const updateBoardCounter = await Board.findById(milestone.boardID);
		updateBoardCounter.numberOfMilestones -= 1;

		await milestone.remove();
		await updateBoardCounter.save();
		res.json('Milestone successfuly deleted');
	} catch (err) {
		res.status(400).json(`Error: ${err}`);
	}
});

module.exports = router;
