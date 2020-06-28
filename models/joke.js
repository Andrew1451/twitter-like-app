const mongoose = require('mongoose');

const JokeSchema = new mongoose.Schema({
    joke: String,
}, { timestamps: true });

const model = mongoose.model('Joke', JokeSchema);
module.exports = {
    model: model,
    schema: JokeSchema
}