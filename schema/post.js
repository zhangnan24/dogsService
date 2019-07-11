const mongoose = require('mongoose')
const Schema = mongoose.Schema
const objectId = Schema.Types.ObjectId

const postSchema = new Schema({
    UserId: objectId,
    account: { unique: true, type: String },
    avatar: String,
    views: Number,
    title: String,
    content: String
}, {
        versionKey: false
    })

const PostModel = mongoose.model('Post', postSchema)

module.exports = PostModel