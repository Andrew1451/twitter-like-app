const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const JokeSchema = require('./joke');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    jokes: [JokeSchema.schema],
    friends: [String]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);