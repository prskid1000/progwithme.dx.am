var mongoose = require('mongoose');
var BoxSchema = new mongoose.Schema({
    boxid: {
        type: String,
        required: true,
    },
    chat:[{author:String, message:String}]
});

var Box = mongoose.model('Box', BoxSchema);
module.exports = Box;
