var url  = require("url"),
     fs=require("fs"),
     http=require("http"),
     path = require("path");
http.createServer(function (req, res) {            //req: 事件请求; response: 事件响应
    var pathname=__dirname+url.parse(req.url).pathname; //__dirname: 当前文件的所在目录的完整绝对路径
    if (path.extname(pathname)=="") {       //extname: 文件拓展名
        pathname+="/";
    }
    if (pathname.charAt(pathname.length-1)=="/"){
        pathname+="index.html";
    }

    fs.exists(pathname,function(exists){    //fs.exists: 判断pathname路径下的文件是否存在，function是个回调函数，其参数exists，true表示文件存在，false表示不存在
        if(exists){
            switch(path.extname(pathname)){
                case ".html":
                    res.writeHead(200, {"Content-Type": "text/html"});
                    break;
                case ".js":
                    res.writeHead(200, {"Content-Type": "text/javascript"});
                    break;
                case ".css":
                    res.writeHead(200, {"Content-Type": "text/css"});
                    break;
                case ".gif":
                    res.writeHead(200, {"Content-Type": "image/gif"});
                    break;
                case ".jpg":
                    res.writeHead(200, {"Content-Type": "image/jpeg"});
                    break;
                case ".png":
                    res.writeHead(200, {"Content-Type": "image/png"});
                    break;
                default:
                    res.writeHead(200, {"Content-Type": "application/octet-stream"});
            }

            fs.readFile(pathname,function (err,data){
                res.end(data);
            });
        } else {
            res.writeHead(404, {"Content-Type": "text/html"});
            res.end("<h1>404 Not Found</h1>");
        }
    });
}).listen(8080, "127.0.0.1");
console.log("Server running at http://127.0.0.1:8080/");