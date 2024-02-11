const mongoose = require("mongoose");
require('dotenv').config()
const mongoDB = process.env.MONGO_CONNECTION_URI;

mongoose.connect(mongoDB)
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    balance: {type: Number, default: 10000}
})

const User = mongoose.model('User', UserSchema)

module.exports = User