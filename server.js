  
var express = require('express');
var path = require('path');
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.type('html');
	res.sendFile('index.html', {root: path.join(__dirname, './public/pages')});
})
app.get('/videoChat', function(req, res) {
    res.type('html');
	res.sendFile('videoChat.html', {root: path.join(__dirname, './public/pages')});
})


//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
    res.type('html');
    res.sendFile('404.html', {root: path.join(__dirname, './public/pages')});
});

app.listen(port, function() {
	console.log('server is listening on port:' + port);
})