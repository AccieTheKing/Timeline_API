const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    boardID: { type: String, required: true },
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: false },
    actualSituation: { type: String, required: true },
    desiredSituation: { type: String, required: false },
});

const Story = mongoose.model('Story', storySchema);
module.exports = Story;