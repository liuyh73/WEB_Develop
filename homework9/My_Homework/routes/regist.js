var express = require('express');
var router = express.Router();
var validator = require('../models/validator.js');
var mongoose = require('mongoose');
var User = mongoose.model('user');

mongoose.Promise = require("bluebird");
var crypto = require('crypto');


/* GET SignUp page. */
router.get('/', function(req, res, next) {
    res.render('signup',{user: {}});
});

router.post('/', function(req, res, next){
    var NewUser=req.body;
    var error={str:""};
    var md5 = crypto.createHash('md5');

    var temp= new User({
        username: NewUser.username,
        id: NewUser.id,
        telphone: NewUser.telphone,
        email: NewUser.email,
        password: md5.update(NewUser.password).digest("hex")
    });

    checkUsername(temp, error)
    .then(function(){
        return checkId(temp, error);
    })
    .then(function(){
        return checkTelphone(temp, error);
    })
    .then(function(){
        return checkEmail(temp, error);
    })
    .then(function(){
        return saveUser(temp, error);
    })
    .catch(function(err){
        console.log('error: '+err);
    })
    .then(function(){
        if(!error.str){
            req.session.loginUser = temp.username;
            res.render('detail', {user: temp, error: ""});
        }else{
            error.str+="已被占用";
            console.log("register error: ",error.str);
            res.render('signup', {user: NewUser, error: error.str});
        }
    });

});

function checkUsername(user, error){
    return new Promise(function(resolve, reject){
        User.findOne({"username": user.username}, function(err, doc){
            if(err) reject("cheackUsername: "+err);
            if(doc)
                error.str+="用户名-";
            resolve();
        });
    });
}

function checkId(user, error){
    return new Promise(function(resolve, reject){
        User.findOne({"id": user.id}, function(err, doc){
            if(err) reject("cheackId: "+err);
            if(doc)
                error.str+="学号-";
            resolve();
        });
    });
}

function checkTelphone(user, error){
    return new Promise(function(resolve, reject){
        User.findOne({"telphone": user.telphone}, function(err, doc){
            if(err) reject("cheackTelphone: "+err);
            if(doc)
                error.str+="电话-";
            resolve();
        });
    });
}

function checkEmail(user, error){
    return new Promise(function(resolve, reject){
        User.findOne({"email": user.email}, function(err, doc){
            if(err) reject("cheackTelphone: "+err);
            if(doc)
                error.str+="邮箱-";
            resolve();
        });
    });
}

function saveUser(user, error){
    return new Promise(function(resolve, reject){
        if(error.str===""){
            user.save(function(err, doc){
                if(err) reject("saveUser: "+err);
                resolve();
            });
        }else{
            resolve();
        }
    });
}

module.exports = router;