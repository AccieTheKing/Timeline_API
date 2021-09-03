const router = require('express').Router();
let User = require('../database/modals/user.model');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(400).json(`Error: ${error}`);
    }
});

router.post('/new', async (req, res) => {
    try {
        const username = req.body.username;
        const newUser = new User({
            username,
            subscriptionType: 'free',
            numberOfBoards: 0,
            lastLogin: new Date()
        });
        await newUser.save();
        res.json('New User added!');
    } catch (error) {
        res.status(400).json(`Error: ${error}`);
    }
});

module.exports = router;