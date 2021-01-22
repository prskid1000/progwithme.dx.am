var mongoose = require('mongoose');
var ChildSchema = require('../model/comment');
var PostSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    votes: {
        type: String,
        required: true
    },
    comments:
    {
        type: [ChildSchema.Comment],
        required: false
    }
});

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;
