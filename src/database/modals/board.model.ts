const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = new Schema({
    title: { type: String, required: true },
    numberOfStories: { type: Number, required: false },
    userID: { type: String, required: true }
}, {
    timestamps: true
});

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;