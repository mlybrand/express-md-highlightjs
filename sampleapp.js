var http = require('http');
var express = require('express');
var app = express();

app.use(app.router);

app.all('/', function(req, res, next) {
	res.set('X-Catch-All', 'true');
	next();
});

// app.get('/', function(req, res) {
// 	res.send('/ GET OK');
// });

var one = function(req, res, next) {
	res.set('X-One', 'hey!');
	next();
};

var two = function(req, res, next) {
	res.set('X-Two', 'ho!');
	next();
};

app.get('/', [one, two], function(req, res) {
	res.send("Let's go!");
});

app.put('/', function(req, res) {
	res.send('/ PUT OK');
});

app.patch('/', function(req, res) {
	res.send('/ PATCH OK');
});

app.delete('/', function(req, res) {
	res.send('/ DELETE OK');
});

app.options('/', function(req, res) {
	res.send('/ OPTIONS OK');
});

app['m-search']('/', function(req, res) {
	res.send('/ M-SEARCH OK');
});

app.notify('/', function(req, res) {
	res.send('/ NOTIFY OK');
});

app.subscribe('/', function(req, res) {
	res.send('/ SUBSCRIBE OK');
});

app.unsubscribe('/', function(req, res) {
	res.send('/ UNSUBSCRIBE OK');
});

app.get('/abc*', function(req, res, next) {
	if (req.path == '/abcd') { next(); }
	else { res.send('abc*'); }
});

app.get('/abcd', function(req, res) {
	res.send('abcd');
});

app.get('/ab?cd', function(req, res) {
	res.send('ab?cd');
});

app.get('/ab+cd', function(req, res) {
	res.send('ab+cd');
});

app.get('/ab*cd', function(req, res) {
	res.send('ab*cd');
});

app.get('/ab(cd)?e', function(req, res) {
	res.send('ab(cd)?e');
});

app.get('/user/:id', function(req, res) {
	res.send('user id: ' + req.params.id);
});

app.get('/country/:country/state/:state', function(req, res) {
	res.send(req.params.country + ', ' + req.params.state);
});

app.get('/route/:from\-:to', function(req, res) {
	res.send(req.params.from + ' to ' + req.params.to);
});

app.get('/file/:name.:ext', function(req, res) {
	res.send(req.params.name + '.' + req.params.ext.toLowerCase());
});

app.get('/feed/:format?', function(req, res) {
	if (req.params.format) { res.send('format: ' + req.params.format); }
	else { res.send('default format'); }
});

app.get(/.+app?le$/, function(req, res) {
	res.send('/.+app?le$/');
});

app.get(/a/, function(req, res) {
	res.send('/a/');
});

http.createServer(app).listen(3000, function() {
	console.log('App started');
});