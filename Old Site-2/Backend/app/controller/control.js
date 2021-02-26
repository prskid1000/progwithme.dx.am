
exports.isAuth = (req, res, next) => {
    var Model = require('../model/user');
    Model.findOne({ password: req.body.password, userid: req.body.userid }, function (err, docs) {
        if (err || !docs) {
            res.json({ success: 'False', data: 'No User Found' });
        } else {
            res.json({ success: 'True', data: docs });
        }
    });
};

exports.addUser = (req, res, next) => {
    var Model = require('../model/user');
    var model = new Model({ userid: req.body.userid, password: req.body.password});
    model.save()
        .then(doc => {
            res.json({ success: 'True', data: doc });
        })
        .catch(err => {
            res.json({ success: 'False', data: err });
            
        });
};

exports.deleteUser = (req, res, next) => {
    var Model = require('../model/user');
    Model.deleteMany({ userid: req.body.userid}, function (err, docs) {
        if (err || !docs) {
            console.log("Error in deleting User");
            res.json({ success: 'False', data: "Error in Deleting User"});
        } else {
            console.log("User deleted");
            res.json({ success: 'True', data: "User Deleted Successfully" });
        }
    });
};

exports.setBox = (req, res, next) => {
    var Model = require('../model/user');
    Model.findOne({ userid: req.body.userid}, function (err, User) {
        if (err || !User) {
            res.json({ success: 'False', data: 'No User Found' });
        } else {
            Model.deleteMany({ userid: req.body.userid }, function (err, docs) {
                if (err || !docs) {
                    console.log("Error in setting box");
                    res.json({ success: 'False', data: "Error in setting box" });
                } else {
                    var model = new Model({userid: User.userid, password: User.password});
                    for (var i = 0; i < User.boxid.length; i++) {
                        model.boxid.push(User.boxid[i]);
                    }
                    model.boxid.push(req.body.boxid);
                    model.save()
                        .then(doc => {
                            console.log("Box is set");
                            res.json({ success: 'True', data: doc });
                        })
                        .catch(err => {
                            console.log("Error in setting box");
                            res.json({ success: 'False', data: "Error in setting box" });
                        });
                }
            });
        }
    });
};

exports.unsetBox = (req, res, next) => {
    var Model = require('../model/user');
    Model.findOne({ userid: req.body.userid }, function (err, User) {
        if (err || !User) {
            res.json({ success: 'False', data: 'No User Found' });
        } else {
            Model.deleteMany({ userid: req.body.userid }, function (err, docs) {
                if (err || !docs) {
                    console.log("Error in unsetting box");
                    res.json({ success: 'False', data: "Error in unsetting box" });
                } else {
                    var model = new Model({ userid: User.userid, password: User.password });
                    for (var i = 0; i < User.boxid.length; i++) {
                        if(User.boxid[i] != req.body.boxid)
                        {
                            model.boxid.push(User.boxid[i]);
                        }
                    }
                    model.save()
                        .then(doc => {
                            console.log("Box is unset");
                            res.json({ success: 'True', data: doc });
                        })
                        .catch(err => {
                            console.log("Error in unsetting box");
                            res.json({ success: 'False', data: "Error in unsetting box" });
                        });
                }
            });
        }
    });
};

exports.sendBox = (req, res, next) => {
    var Model = require('../model/box');
    Model.findOne({ boxid: req.body.boxid }, function (err, Box) {
        if (err || !Box) {
            console.log("Creating new box");
            var model = new Model({ boxid: req.body.boxid });
            model.chat.push({author: req.body.userid, message: req.body.message});
            model.save()
                .then(doc => {
                    res.json({ success: 'True', data: doc });
                })
                .catch(err => {
                    res.json({ success: 'False', data: err });

                });
        } else {
            Model.deleteMany({ boxid: req.body.boxid }, function (err, docs) {
                if (err || !docs) {
                    console.log("Error in sending message");
                    res.json({ success: 'False', data: "Error in sending message" });
                } else {
                    var model = new Model({ boxid: Box.boxid });
                    for (var i = 0; i < Box.chat.length; i++) {
                        model.chat.push(Box.chat[i]);
                    }
                    model.chat.push({ author: req.body.userid, message: req.body.message });
                    model.save()
                        .then(doc => {
                            console.log("Message sent");
                            res.json({ success: 'True', data: doc });
                        })
                        .catch(err => {
                            console.log("Error in sending message");
                            res.json({ success: 'False', data: "Error in sending message" });
                        });
                }
            });
        }
    });
};

exports.getBox = (req, res, next) => {
    var Model = require('../model/box');
    Model.findOne({ boxid: req.body.boxid }, function (err, docs) {
        if (err || !docs) {
            res.json({ success: 'False', data: 'No Box Found'});
        } else {
            res.json({ success: 'True', data: docs });
        }
    });
};

exports.deleteBox = (req, res, next) => {
    var Model = require('../model/box');
    Model.deleteMany({ boxid: req.body.boxid }, function (err, docs) {
        if (err || !docs) {
            console.log("Error in deleting Box");
            res.json({ success: 'False', data: "Error in Deleting Box" });
        } else {
            console.log("Box deleted");
            res.json({ success: 'True', data: "Box Deleted Successfully" });
        }
    });
};

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
}

exports.getUsers = (req, res, next) => {
    var Model = require('../model/user');
    Model.find({}, function (err, docs) {
        if (err || !docs) {
            res.json({ success: 'False', data: 'No Users Found' });
        } else {
            for(var i in docs)
            {
                docs[i].password = "";
            }
            res.json({ success: 'True', data: shuffle(docs) });
        }
    });
};