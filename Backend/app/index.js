var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://prskid1000:nIELmPiB3vZ4YkWQ@cluster0-qxsqv.mongodb.net/codenut?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error'));
db.on('open', console.error.bind(console, 'MongoDB Connected Succesfully'));

var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({ origin: true }));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var cookieParser = require('cookie-parser');
app.use(cookieParser());

const control=require('./controller/control');

app.post('/isauth', control.isAuth, control.verify);
app.post('/adduser',control.addUser);
app.post('/deleteuser', control.deleteUser);

app.post('/upexp', control.isAuth, control.upExp);
app.post('/downexp', control.isAuth, control.downExp);

app.post('/createpost', control.isAuth, control.createPost);
app.post('/deletepost', control.isAuth, control.deletePost);
app.post('/updatepost', control.isAuth, control.updatePost);

app.post('/upvoteq', control.isAuth, control.upVoteQ);
app.post('/downvoteq', control.isAuth, control.downVoteQ);

app.post('/createcomment', control.isAuth, control.createComment);
app.post('/deletecomment', control.isAuth, control.deleteComment);
app.post('/updatecomment', control.isAuth, control.updateComment);

app.post('/upvotec', control.isAuth, control.upVoteC);
app.post('/downvotec', control.isAuth, control.downVoteC);

app.get('/getalluser', control.allUser);
app.get('/getallpost', control.allPost);


app.listen(process.env.PORT || 3000,
    () => console.log("Server is running..."));
console.log('CodeNut BackEnd');
