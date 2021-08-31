const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    type: { type: String, required: true },
    maxNumOfBoards: { type: Number, required: true },
    price: { type: Number, required: true }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;