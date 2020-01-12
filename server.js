  
var express = require('express')
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index.html');
})
app.get('/videoChat', function(req, res) {
	res.render('pages/videoChat.html');
})


//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.render('pages/404.html');
});

app.listen(port, function() {
	console.log('server is listening on port:' + port);
})