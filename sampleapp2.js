var http = require('http');
var express = require('express');
var resource = require('express-resource');

//var namespace = require('express-namespace');
var app = express();

app.use(app.router);

// app.namespace('/articles', function() {
// 	app.get('/', function(req, res) {
// 		res.send('index of articles');
// 	});

// 	app.get('/new', function(req, res) {
// 		res.send('new article');
// 	});

// 	app.get('/edit/:id', function(req, res) {
// 		res.send('edit article ' + req.params.id);
// 	});

// 	app.get('/delete/:id', function(req, res) {
// 		res.send('delete article ' + req.params.id);
// 	});

// 	app.get('/2013', function(req, res) {
// 		res.send('articles from 2013');
// 	});

// 	app.namespace('/2013/jan', function() {
// 		app.get('/', function(req, res) {
// 			res.send('articles from jan 2013');
// 		});

// 		app.get('/nodejs', function(req, res) {
// 			res.send('articles about Node from jan 2013');
// 		});
// 	});
// });

app.resource('users', require('./users.js'));

http.createServer(app).listen(3000, function() {
	console.log('App started');
});