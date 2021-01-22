var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
        trim: true
    },
    comment: {
        type: String,
        required: true
    },
    votes: {
        type: String,
        required: true
    },
});

var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
