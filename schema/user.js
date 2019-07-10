const mongoose = require('mongoose')
const Schema = mongoose.Schema
const objectId = Schema.Types.ObjectId

const userSchema = new Schema({
    UserId: objectId,
    name: String,
    account: { unique: true, type: String },
    password: String
}, {
        versionKey: false
    })

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel