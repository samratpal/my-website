  
var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

var port = process.env.PORT || 8100;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.type('html');
	res.sendFile('index.html', {root: path.join(__dirname, './public/pages')});
})
/*
app.get('/videoChat', function(req, res) {
    res.type('html');
	res.sendFile('videoChat.html', {root: path.join(__dirname, './public/pages')});
})*/
app.get(/^(.+)$/, function(request, response) {

    console.log('request received for: ' +  request.url);   
    var filePath, folder, fileName, extname = path.extname(request.url);
    console.log("file extension: " + extname);    
    if(extname === '' || extname === 'html'){
        extname = 'html';
        folder = './public/pages/';        
    } else{
        folder = './public/' + extname + '/';
    }
    filePath = request.url.replace('/','');
    fileName = filePath + '.' + extname;
    console.log("folder to look into: " + folder + "     fileName: " +fileName);
    try{
        if(fs.statSync(path.join(__dirname, './public/pages/', fileName)).isFile()) {
            response.type('html');
            response.sendFile(fileName, {root: path.join(__dirname, folder)});
        }
    }
    catch(e){
        console.log('error by fs: ', e);
        response.type('html');
        response.sendFile('404.html', {root: path.join(__dirname, folder)});
    }
})

app.listen(port, function() {
	console.log('server is listening on port:' + port);
})