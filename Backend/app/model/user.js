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
    exp: {
        type: String,
        required: true
    },
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
