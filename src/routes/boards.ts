const router = require('express').Router();
let Board = require('../database/modals/board.model');
let Story = require('../database/modals/story.model');

// TODO: Return the signed in user boards, now using the first index of list
router.get('/', async (req, res) => {
    try {
        const board = await Board.find();
        res.json(board);
    } catch (error) {
        res.status(400).json(`Error: ${error}`);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const board = await Board.findById(req.params.id);
        res.json(board);
    } catch (error) {
        res.status(400).json(`Error: ${error}`);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Board.findByIdAndDelete(req.params.id);
        const test = await Story.find({ boardID: req.params.id });
        test.forEach(story => story.remove());
        const allBoards = await Board.find();
        res.json(allBoards);
    } catch (error) {
        res.status(400).json(`Error: ${error}`);
    }
});

router.post('/new', async (req, res) => {
    try {
        const title = req.body.title;
        const userID = req.body.userID;
        const newBoard = new Board({
            title,
            numberOfStories: 0,
            userID
        });

        await newBoard.save();
        const allUserBoards = await Board.find({ userID });
        res.json(allUserBoards);
    } catch (error) {
        res.status(400).json(`Error: ${error}`);
    }
});

router.post('/update/:id', async (req, res) => {
    const board = await Board.findById(req.params.id);
    board.title = req.body.title;
    board.save();
    res.json(`Board ${req.params.id} updated!`);
});

module.exports = router;