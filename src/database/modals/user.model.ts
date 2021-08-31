const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    subscriptionType: { type: String, required: true },
    numberOfBoards: { type: Number, required: true },
});

const User = mongoose.model('User', userSchema);
module.exports = User;