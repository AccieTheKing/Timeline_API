const router = require('express').Router();
let Story = require('../database/modals/story.model');
let Board = require('../database/modals/board.model');

router.get('/', async (req, res) => {
    try {
        const story = await Story.find();
        res.json(story);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

router.get('/:boardID', async (req, res) => {
    try {
        const story = await Story.find({ boardID: req.params.boardID });
        res.json(story);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

router.post('/', async (req, res) => {
    try {
        const newStory = new Story({
            title: req.body.title,
            startDate: req.body.date.start,
            endDate: req.body.date.end,
            actualSituation: req.body.comment.actual,
            desiredSituation: req.body.comment.desired,
            boardID: req.body.boardID,
        });

        const updateBoardCounter = await Board.findById(newStory.boardID);
        updateBoardCounter.numberOfStories += 1;

        updateBoardCounter.save();
        newStory.save();
        const stories = await Story.find();
        res.json(stories);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);

        const responseStory = req.body.story;

        story.title = responseStory.title;
        story.startDate = responseStory.startDate;
        story.endDate = responseStory.endDate;
        story.actualSituation = responseStory.actualSituation;
        story.desiredSituation = responseStory.desiredSituation;
        story.save();

        res.json(story);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        const updateBoardCounter = await Board.findById(story.boardID);
        updateBoardCounter.numberOfStories -= 1;

        story.remove();
        updateBoardCounter.save();
        res.json('Story successfuly deleted');
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

module.exports = router;