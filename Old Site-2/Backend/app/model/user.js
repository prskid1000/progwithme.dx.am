var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    boxid: [{type: String}],
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
