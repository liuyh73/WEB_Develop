var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('user');
var crypto = require('crypto');

mongoose.Promise = require("bluebird");

/* GET home page. */
router.get('/', function(req, res, next) {

    if(!req.session.loginUser){
        res.render("signin", {user: {}});
    }else{
         User.findOne({"username": req.session.loginUser}, function(err, doc){
            if(req.query.username===req.session.loginUser || req.query.username===undefined)
                res.render('detail',{user: doc, error: ""});
            else
                res.render('detail',{user: doc, error: "只能够访问自己的数据!"});
        });
    }
});

router.post('/', function(req, res, next){
    var user=req.body;
    var md5 = crypto.createHash('md5');
    user.password = md5.update(user.password).digest('hex');
    checkPassword(user)
    .then(function(doc){
        if(doc!==null){
            req.session.loginUser=doc.username;
            res.render('detail', {user: doc, error: ""});
        }
        else{
            var error="用户名或密码错误!";
            res.render('signin', {user:user, error:error});
        }
    })
    .catch(function(err){

        res.render('signin', {user:user,error:""});
    });
});

router.get('/logout', function(req, res, next){
    req.session.destroy(function(err){
        if(!err){
            res.clearCookie("user");
            res.redirect('/');
        }
    });
});

function checkPassword(user){
    return new Promise(function(resolve, reject){
        User.findOne({"username": user.username, "password": user.password},function(err, doc){

            if(err) 
                reject("Confirm error: "+err);
            resolve(doc);
        });
    });
}

module.exports = router;
