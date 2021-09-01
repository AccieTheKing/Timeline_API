import { Router } from 'express';
import { BoardService } from '../services/board.service';
import { Board } from '../database/modals/board.model';
import { Milestone } from '../database/modals/milestone.model';
import { MilestoneService } from '../services/milestone.service';

const boardRouter = Router();
const boardService: BoardService = new BoardService();
// const milestoneService: MilestoneService = new MilestoneService();

boardRouter.get('/', async (req, res) => {
	try {
		const board = await boardService.findAll();
		res.status(200).json(board);
	} catch (error) {
		res.status(400).json(`Error: ${error}`);
	}
});

boardRouter.get('/:id', async (req, res) => {
	try {
		const board = await boardService.find(req.params.id);
		res.status(200).json(board);
	} catch (error) {
		res.status(400).json(`Error: ${error}`);
	}
});

boardRouter.delete('/:id', async (req, res) => {
	try {
		await boardService.findAndDelete(req.params.id);
		const foundMilestones = await Milestone.find({
			boardID: req.params.id,
		});
		foundMilestones.forEach((milestone) => milestone.remove());
		const allBoards = await boardService.findAll();
		res.status(200).json(allBoards);
	} catch (error) {
		res.status(400).json(`Error: ${error}`);
	}
});

boardRouter.post('/new', async (req, res) => {
	try {
		const title = req.body.title;
		const userID = req.body.userID;
		const newBoard = new Board({
			title,
			numberOfStories: 0,
			userID,
		});

		await newBoard.save();
		const allUserBoards = await Board.find({ userID });
		res.status(200).json(allUserBoards);
	} catch (error) {
		res.status(400).json(`Error: ${error}`);
	}
});

boardRouter.post('/update/:id', async (req, res) => {
	const board = await Board.findById(req.params.id);
	board.title = req.body.title;
	board.save();
	res.json(`Board ${req.params.id} updated!`);
});

export { boardRouter };
