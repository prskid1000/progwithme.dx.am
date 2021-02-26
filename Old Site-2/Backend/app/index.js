var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://prskid1000:nIELmPiB3vZ4YkWQ@cluster0-qxsqv.mongodb.net/ichat?retryWrites=true&w=majority';
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

app.post('/isauth', control.isAuth);
app.post('/adduser',control.addUser);
app.get('/getusers', control.getUsers);
app.post('/deleteuser', control.deleteUser);

app.post('/setbox', control.setBox);
app.post('/unsetbox', control.unsetBox);
app.post('/deletebox', control.deleteBox);

app.post('/getbox', control.getBox);
app.post('/sendbox', control.sendBox);



app.listen(process.env.PORT || 3000,
    () => console.log("Server is running..."));
console.log('CodeNut BackEnd');
