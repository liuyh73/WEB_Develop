var url=require('url'),
    fs =require('fs'),
    http=require('http'),
    path=require('path'),
    querystring=require('querystring');
var users={};

var userSignUpHtml=[
    '<!DOCTYPE html>',
    '<html>',
        '<head>',
            '<title>用户注册</title>',
            '<meta charset="utf-8" />',
            '<link rel="stylesheet" type="text/css" href="css/Sign.css" />',
            '<link rel="icon" href="image/icon.png">',
            '<link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">',
            '<script type="text/javascript" src="js/jquery-3.1.0.js" ></script>',
            '<script type="text/javascript" src="js/Sign.js"></script>',
        '</head>',
        '<body>',
            '<div class="Container">',
                '<h1>用户注册</h1>',
                '<form method="post">',
                    '<p>',
                        '<div><label for="username">用户名: </label></div>',
                        '<input type="text" id="username" name="username" placeholder="Username" />',
                        '<span id="usernameCheck"></span><br/>',
                        '<span class="msg">6~18位英文字母,数字或下划线;英文字母开头</span>',
                    '</p>',
                    '<p>',
                        '<div><label for="id">学  号: </label></div>',
                        '<input type="text" id="id" name="id" placeholder="Id" />',
                        '<span id="idCheck"></span><br/>',
                        '<span class="msg">8位数字,不能以0开头</span>',
                    '</p>',
                    '<p>',
                        '<div><label for="telphone">电  话: </label></div>',
                        '<input type="text" id="telphone" name="telphone" placeholder="Telphone" />',
                        '<span id="telphoneCheck"></span><br/>',
                        '<span class="msg">11位数字,不能以0开头</span>',
                    '</p>',
                    '<p>',
                        '<div><label for="email">邮  箱: </label></div>',
                        '<input type="text" id="email" name="email" placeholder="Email" />' ,
                        '<span id="emailCheck"></span><br/>',
                        '<span class="msg">按照讲义中的规则,不能有数字或特殊字符</span>',
                    '</p>',
                    '<button type="button">Reset</button>',
                    '<button type="submit">Submit</button><br/>',
                    '<span class="msg">请正确填写信息之后再提交!</span><br/>',
                    '',
                '</form>',
            '</div>',
        '</body>',
    '</html>',
];

var userInfoHtml=[ 
    '<!DOCTYPE html>',
    '<html>',
        '<head>',
            '<title>用户详情</title>',
            '<meta charset="utf-8" />',
            '<link rel="icon" href="image/icon.png">',
            '<link rel="stylesheet" type="text/css" href="css/Sign1.css" />',
        '</head>',
        '<body>',
            '<div class="Container">',
                '<h1>用户详情</h1>',
                '<form>',
                    '<p><div>用户名: </div><input type="text" id="username" disabled=disabled value=username /></p>',
                    '<p><div>学  号: </div><input type="text" id="id" disabled=disabled value=id /></p>',
                    '<p><div>电  话: </div><input type="text" id="telphone" disabled=disabled value=telphone /></p>',
                    '<p><div>邮  箱: </div><input type="text" id="email" disabled=disabled value=email /></p>',
                '</form>',
            '</div>',
        '</body>',
    '</html>'
];

http.createServer(function (req, res){
    var user=querystring.parse(url.parse(req.url).query);

    if(req.method.toLowerCase()!=='post'){
        if(!user.username || newUser(user)){
            showSignUp(req,res);
        }else{
            showInfo(res,user);
        }
    }else{
        handlePost(req,res);
    }
    
}).listen(8000);

function showSignUp(req,res){
    var pathname=__dirname+url.parse(req.url).pathname;
    if(path.extname(pathname)==""&&pathname.charAt(pathname.length-1)!="/") {
        pathname+="/";
    }
    if(pathname.charAt(pathname.length-1)=="/"){
        res.end(userSignUpHtml.join(""));
    }

    //console.log(pathname);

    fs.stat(pathname,function(err, stats){
        if(!err){
            switch(path.extname(pathname)){
                case ".html":
                    res.writeHead(200,{"Content-Type": "text/html"});
                    break;
                case ".js":
                    res.writeHead(200,{"Content-Type": "text/javascript"});
                    break;
                case ".css":
                    res.writeHead(200,{"Content-Type": "text/css"});
                    break;
                case ".gif":
                    res.writeHead(200,{"Content-Type": "text/gif"});
                    break;
                case ".jpg":
                    res.writeHead(200,{"Content-Type": "text/jpg"});
                    break;
                case ".png":
                    res.writeHead(200,{"Content-Type": "text/png"});
                    break;
                default:
                    res.writeHead(200,{"Content-Type": "application/octet-stream"});
            }

            fs.readFile(pathname,function(err,data){
                res.end(data);
            });
        }
        else{
            res.writeHead(404,{"Content-Type": "test/html"});
            res.end("<h1>404 Not Found</h1>");
        }
    });
}

function showInfo(res,user){
    userInfoHtml[12]='<p><div>用户名: </div><input type="text" id="username" disabled=disabled value='+user.username+' /></p>';
    userInfoHtml[13]='<p><div>学 号: </div><input type="text" id="id" disabled=disabled value='+users[user.username].id+' /></p>';
    userInfoHtml[14]='<p><div>电 话: </div><input type="text" id="telphone" disabled=disabled value='+users[user.username].telphone+' /></p>';
    userInfoHtml[15]='<p><div>邮 箱: </div><input type="text" id="email" disabled=disabled value='+users[user.username].email+' /></p>';

    res.end(userInfoHtml.join(""));
}

function newUser(user){
    return users[user.username]===undefined;
}

function isValid(user){
    return users[user.username]===undefined && users[user.id]===undefined 
        && users[user.telphone]===undefined && users[user.email]===undefined;
}

function repeat(user){
    var repeat="";
    if(users[user.username]!==undefined){
        repeat+="用户名-";
    }
    if(users[user.id]!==undefined){
        repeat+="学号-";
    }
    if(users[user.telphone]!==undefined){
        repeat+="电话-";
    }
    if(users[user.email]!==undefined){
        repeat+="邮箱-";
    }
    return repeat;
}

function handlePost(req,res){
    var info="";
    req.on('data',function(chunk){
        info+=chunk;
    });

    req.on('end', function(){
        var user=querystring.parse(info);
        if(isValid(user)){
            res.writeHead(301, {Location: '?username='+user.username});
            res.end();
            users[user.username]=user;
            users[user.id]=user;
            users[user.telphone]=user;
            users[user.email]=user;

            //console.log(user);
        }
        else{
            var userSignUpHtmlTemp=userSignUpHtml.slice();
            userSignUpHtmlTemp[17]='<input type="text" id="username" name="username" placeholder="Username" value='+user.username+' />';
            userSignUpHtmlTemp[23]='<input type="text" id="id" name="id" placeholder="Id" value='+user.id+' />';
            userSignUpHtmlTemp[29]='<input type="text" id="telphone" name="telphone" placeholder="Telphone"  value='+user.telphone+' />';
            userSignUpHtmlTemp[35]='<input type="text" id="email" name="email" placeholder="Email" value='+user.email+' />';

            userSignUpHtmlTemp[42]='<span class="repeatMsg">'+repeat(user)+'可能已被注册!</span>';

            res.end(userSignUpHtmlTemp.join(""));
        }
    });
}

console.log("Server running at http://127.0.0.1:8000/");