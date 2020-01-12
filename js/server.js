const http = require('http');
var fs = require('fs');
var path = require('path');
const port = 3000;

const server = http.createServer(function (request, response){
    console.log('request received for: ' + request.url);
    var filePath = '.' + request.url;
    if (filePath == './'){
        filePath = './index.html';
    } else if(filePath == './videoChat'){
        filePath = './pages/videoChat.html';
    }

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./pages/404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    })
})

server.listen(port, function(error){
    if(error){
        console.log("server Error: ", error);
    } else{
        console.log("server is listening on port: " + port);
    }
})