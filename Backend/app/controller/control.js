
exports.isAuth = (req, res, next) => {
    var Model = require('../model/user');
    Model.findOne({ password: req.body.password, userid: req.body.userid }, function (err, docs) {
        if (err || !docs) {
            res.json({ success: 'False', data: 'No User Found' });
        } else {
            res.locals.userid = docs.userid;
            res.locals.password = docs.password;
            res.locals.exp = docs.exp;
            next();
        }
    });
};

exports.verify = (req, res, next) => {
    res.json({ success: 'True'});
};

exports.addUser = (req, res, next) => {
    console.log(req.body);
    var Model = require('../model/user');
    var model = new Model({ userid: req.body.userid, password: req.body.password, exp: "0" });
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

exports.upExp = (req, res, next) => {
    var Model = require('../model/user');
    var exp_new = (parseInt(res.locals.exp) + 1).toString();
    Model.deleteMany({ userid: res.locals.userid}, function (err, docs) {
        if (err || !docs) {
            console.log("Error in Updating Experience");
            res.json({ success: 'False', data: "Error in Updating Experience" });
        } else {
            var model = new Model({ userid: res.locals.userid, password: res.locals.password, exp: exp_new });
            model.save()
                .then(doc => {
                    console.log("Experience Increased");
                    res.json({ success: 'True', data: doc });
                })
                .catch(err => {
                    console.log("Error in Updating Experience");
                    res.json({ success: 'False', data: "Error in Updating Experience" });
                });
        }
    });
};

exports.downExp = (req, res, next) => {
    var Model = require('../model/user');
    var exp_new = (parseInt(res.locals.exp) - 1).toString();
    Model.deleteMany({ userid: res.locals.userid }, function (err, docs) {
        if (err || !docs) {
            console.log("Error in Updating Experience");
            res.json({ success: 'False', data: "Error in Updating Experience" });
        } else {
            var model = new Model({ userid: res.locals.userid, password: res.locals.password, exp: exp_new });
            model.save()
                .then(doc => {
                    console.log("Experience Decreased");
                    res.json({ success: 'True', data: doc });
                })
                .catch(err => {
                    console.log("Error in Updating Experience");
                    res.json({ success: 'False', data: "Error in Updating Experience" });
                });
        }
    });
};

exports.createPost = (req, res, next) => {
    var Model = require('../model/post');
    var model = new Model({ question: req.body.question, description: req.body.description, author: req.body.author, votes: "0" });
    model.comments.push({ author: req.body.userid, comment: "Initial Read", votes: "0" });
    model.save()
        .then(doc => {
            var UserModel = require('../model/user');
            var exp_new = (parseInt(res.locals.exp) + 10).toString();
            UserModel.deleteMany({ userid: res.locals.userid }, function (err, docs) {
                if (err || !docs) {
                    console.log("Error in Creating Post");
                    res.json({ success: 'False', data: "Error in Creating Post" });
                } else {
                    var model = new UserModel({ userid: res.locals.userid, password: res.locals.password, exp: exp_new });
                    model.save()
                        .then(docu => {
                            res.json({ success: 'True', data: doc });
                        })
                        .catch(err => {
                            console.log("Error in Creating Post");
                            res.json({ success: 'False', data: "Error in Creating Post" });
                        });
                }
            });
        })
        .catch(err => {
            res.json({ success: 'False', data: "Error in Creating Post" });

        });
};

exports.deletePost = (req, res, next) => {
    var Model = require('../model/post');
    Model.deleteMany({ question: req.body.question, author: req.body.author }, function (err, doc) {
        if (err || !doc) {
            console.log("Error in Deleting Post");
            res.json({ success: 'False', data: "Error in Deleting Post" });
        } else {
            var UserModel = require('../model/user');
            var exp_new = (parseInt(res.locals.exp) - 10).toString();
            UserModel.deleteMany({ userid: res.locals.userid }, function (err, docs) {
                if (err || !docs) {
                    console.log("Error in Deleting Post");
                    res.json({ success: 'False', data: "Error in Deleting Post" });
                } else {
                    var model = new UserModel({ userid: res.locals.userid, password: res.locals.password, exp: exp_new });
                    model.save()
                        .then(docu => {
                            console.log("hi");
                            res.json({ success: 'True', data: doc });
                        })
                        .catch(err => {
                            console.log("Error in Deleting Post");
                            res.json({ success: 'False', data: "Error in Deleting Post" });
                        });
                }
            });
        }
    });
};

exports.updatePost = (req, res, next) => {
    var Model = require('../model/post');
    Model.findOne({ question: req.body.question, author: req.body.author }, function (err, post) {
        if (err || !post) {
            res.json({ success: 'False', data: 'No Post Found' });
        } else {
            Model.deleteMany({ question: req.body.question, author: req.body.author }, function (err, docs) {
                if (err || !docs) {
                    console.log("Error in Updating Post");
                    res.json({ success: 'False', data: "Error in Updating Post" });
                } else {
                    var model = new Model({ question: req.body.newquestion, description: req.body.newdescription, author: post.author, votes: post.votes });
                    for (var i = 0; i < post.comments.length; i++) {
                        model.comments.push(post.comments[i]);
                    }
                    model.save()
                        .then(doc => {
                            console.log("Post Updated");
                            res.json({ success: 'True', data: doc });
                        })
                        .catch(err => {
                            console.log("Error in Updating Post");
                            //console.log(err);
                            res.json({ success: 'False', data: "Error in Updating Post" });
                        });
                }
            });
        }
    });
};

exports.upVoteQ = (req, res, next) => {
    var Model = require('../model/post');
    Model.findOne({ question: req.body.question, author: req.body.author }, function (err, docu) {
        if (err || !docu) {
            res.json({ success: 'False', data: 'No Question Found' });
        } else {
            var vote = (parseInt(docu.votes) + 1).toString();
            Model.deleteMany({ question: req.body.question, author: req.body.author}, function (err, docs) {
                if (err || !docs) {
                    console.log("Error in Updating Post");
                    res.json({ success: 'False', data: "Error in Updating Post" });
                } else {
                    var model = new Model({ question: docu.question, description: docu.description, author: docu.author, votes: vote });
                    for (var i = 0; i < docu.comments.length; i++)
                    {
                        model.comments.push(docu.comments[i]);
                    }
                    model.save()
                        .then(doc => {
                            console.log("Vote Incresed");
                            res.json({ success: 'True', data: doc });
                        })
                        .catch(err => {
                            console.log("Error in Updating Post");
                            //console.log(err);
                            res.json({ success: 'False', data: "Error in Updating Post" });
                        });
                }
            });
        }
    });
};

exports.downVoteQ = (req, res, next) => {
    var Model = require('../model/post');
    Model.findOne({ question: req.body.question, author: req.body.author }, function (err, docu) {
        if (err || !docu) {
            res.json({ success: 'False', data: 'No Question Found' });
        } else {
            var vote = (parseInt(docu.votes) - 1).toString();
            Model.deleteMany({ question: req.body.question, author: req.body.author }, function (err, docs) {
                if (err || !docs) {
                    console.log("Error in Updating Post");
                    res.json({ success: 'False', data: "Error in Updating Post" });
                } else {
                    var model = new Model({ question: docu.question, description: docu.description, author: docu.author, votes: vote });
                    for (var i = 0; i < docu.comments.length; i++) {
                        model.comments.push(docu.comments[i]);
                    }
                    model.save()
                        .then(doc => {
                            console.log("Vote Incresed");
                            res.json({ success: 'True', data: doc });
                        })
                        .catch(err => {
                            console.log("Error in Updating Post");
                            //console.log(err);
                            res.json({ success: 'False', data: "Error in Updating Post" });
                        });
                }
            });
        }
    });
};


exports.upVoteC = (req, res, next) => {
    var Model = require('../model/post');
    Model.findOne({ question: req.body.question, author: req.body.author }, function (err, docu) {
        if (err || !docu) {
            res.json({ success: 'False', data: 'No Question Found' });
        } else {
            Model.deleteMany({ question: req.body.question, author: req.body.author }, function (err, docs) {
                if (err || !docs) {
                    console.log("Error in Updating Post");
                    res.json({ success: 'False', data: "Error in Updating Post" });
                } else {
                    var model = new Model({ question: docu.question, description: docu.description, author: docu.author, votes: docu.votes });
                    for (var i = 0; i < docu.comments.length; i++) {
                        if(i === parseInt(req.body.idx))
                        {
                            docu.comments[i].votes = (parseInt(docu.comments[i].votes) + 1).toString();
                        }
                        model.comments.push(docu.comments[i]);
                    }
                    model.save()
                        .then(doc => {
                            console.log("Vote Incresed");
                            res.json({ success: 'True', data: doc });
                        })
                        .catch(err => {
                            console.log("Error in Updating Post");
                            res.json({ success: 'False', data: "Error in Updating Post" });
                        });
                }
            });
        }
    });
};

exports.downVoteC = (req, res, next) => {
    var Model = require('../model/post');
    Model.findOne({ question: req.body.question, author: req.body.author }, function (err, docu) {
        if (err || !docu) {
            res.json({ success: 'False', data: 'No Question Found' });
        } else {
            Model.deleteMany({ question: req.body.question, author: req.body.author }, function (err, docs) {
                if (err || !docs) {
                    console.log("Error in Updating Post");
                    res.json({ success: 'False', data: "Error in Updating Post" });
                } else {
                    var model = new Model({ question: docu.question, description: docu.description, author: docu.author, votes: docu.votes });
                    for (var i = 0; i < docu.comments.length; i++) {
                        if (i === parseInt(req.body.idx)) {
                            docu.comments[i].votes = (parseInt(docu.comments[i].votes) - 1).toString();
                        }
                        model.comments.push(docu.comments[i]);
                    }
                    model.save()
                        .then(doc => {
                            console.log("Vote Decresed");
                            res.json({ success: 'True', data: doc });
                        })
                        .catch(err => {
                            console.log("Error in Updating Post");
                            res.json({ success: 'False', data: "Error in Updating Post" });
                        });
                }
            });
        }
    });
};

exports.createComment = (req, res, next) => {
    var Model = require('../model/post');
    Model.findOne({ question: req.body.question, author: req.body.author }, function (err, post) {
        if (err || !post) {
            res.json({ success: 'False', data: 'No Post Found' });
        } else {
            Model.deleteMany({ question: req.body.question, author: req.body.author }, function (err, docs) {
                if (err || !docs) {
                    console.log("Error in Updating Post");
                    res.json({ success: 'False', data: "Error in Updating Post" });
                } else {
                    var model = new Model({ question: post.question, description: post.description, author: post.author, votes: post.votes });
                    for (var i = 0; i < post.comments.length; i++) {
                        model.comments.push(post.comments[i]);
                    }
                    model.comments.push({ author: req.body.userid, comment: req.body.comment, votes: "0" });
                    model.save()
                        .then(doc => {
                            console.log("Post Updated");
                            res.json({ success: 'True', data: doc });
                        })
                        .catch(err => {
                            console.log("Error in Updating Post");
                            //console.log(err);
                            res.json({ success: 'False', data: "Error in Updating Post" });
                        });
                }
            });
        }
    });
};

exports.deleteComment = (req, res, next) => {
    var Model = require('../model/post');
    Model.findOne({ question: req.body.question, author: req.body.author }, function (err, post) {
        if (err || !post) {
            res.json({ success: 'False', data: 'No Post Found' });
        } else {
            Model.deleteMany({ question: req.body.question, author: req.body.author }, function (err, docs) {
                if (err || !docs) {
                    console.log("Error in Updating Post");
                    res.json({ success: 'False', data: "Error in Updating Post" });
                } else {
                    var model = new Model({ question: post.question, description: post.description, author: post.author, votes: post.votes });
                    for (var i = 0; i < post.comments.length; i++) {
                        if (i != parseInt(req.body.idx))
                        model.comments.push(post.comments[i]);
                    }
                    model.save()
                        .then(doc => {
                            console.log("Post Updated");
                            res.json({ success: 'True', data: doc });
                        })
                        .catch(err => {
                            console.log("Error in Updating Post");
                            res.json({ success: 'False', data: "Error in Updating Post" });
                        });
                }
            });
        }
    });
};

exports.updateComment = (req, res, next) => {
    var Model = require('../model/post');
    Model.findOne({ question: req.body.question, author: req.body.author }, function (err, post) {
        if (err || !post) {
            res.json({ success: 'False', data: 'No Post Found' });
        } else {
            Model.deleteMany({ question: req.body.question, author: req.body.author }, function (err, docs) {
                if (err || !docs) {
                    console.log("Error in Updating Post");
                    res.json({ success: 'False', data: "Error in Updating Post" });
                } else {
                    var model = new Model({ question: post.question, description: post.description, author: post.author, votes: post.votes });
                    for (var i = 0; i < post.comments.length; i++) {
                        if (i === parseInt(req.body.idx))
                        {
                            post.comments[i].comment = req.body.newcomment;
                        }
                        model.comments.push(post.comments[i]);
                    }
                    model.save()
                        .then(doc => {
                            console.log("Post Updated");
                            res.json({ success: 'True', data: doc });
                        })
                        .catch(err => {
                            console.log("Error in Updating Post");
                            res.json({ success: 'False', data: "Error in Updating Post" });
                        });
                }
            });
        }
    });
};

function GetSortOrder(prop) {
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return -1;
        } else if (a[prop] < b[prop]) {
            return 1;
        }
        return 0;
    }
}  

exports.allPost = (req, res, next) => {
    var Model = require('../model/post');
    Model.find({}, function (err, docs) {
        if (err || !docs) {
            res.json({ success: 'False', data: 'No Post Found' });
        } else {
            docs.sort(GetSortOrder("votes"));
            res.json({ success: 'True', data: docs });
        }
    });
};

exports.allUser = (req, res, next) => { 
    var Model = require('../model/user');
    Model.find({}, function (err, docs) {
        if (err || !docs) {
            res.json({ success: 'False', data: 'No Post Found' });
        } else {

            for(var i = 0; i < docs.length; i++)
            {
                docs[i].password = "";
            }
            docs.sort(GetSortOrder("exp"));
            res.json({ success: 'True', data: docs });
        }
    });
};