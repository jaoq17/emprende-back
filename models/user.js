const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    login_code: String
    // createdBy:
})

const User = mongoose.model("User", userSchema, "Users")


module.exports = { User }