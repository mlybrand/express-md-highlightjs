var express = require('express');
var http = require('http');
var app = express();
var marked = require('marked');
var fs = require('fs');
// marked.setOptions({
// 	highlight: function(code) {
// 		return require("highlight").Highlight(code);
// 	}
// })

app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.bodyParser({keepExtensions: true}));
app.use(express.cookieParser('S3CRE7'));
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware('./public'));
app.use(express.static('./public'));
app.locals.pretty = true;

app.get('/', function(req, res) {
	res.render('index', {
		title: 'Superheroes',
		heroes: [
			{ name: 'Fooman', role: 'captain', skills: ['dancing', 'invisibility']},
			{ name: 'Barman', role: 'entertainer', skills: ['bar tending', 'x-ray vision']},
			{ name: 'Napman', role: 'hacker', skills: ['computer hacking', 'nunchucks']},
			{ name: 'Zipman', role: 'collector', skills: ['zipping', 'flight']}
		],
		marked: marked,
		mdText: 'I am using __markdown__.\n```\n console.log("hello"); \n```'
	});
});

app.get('/extend/:ex', function(req, res) {
	res.render("extends"+req.params.ex, {skills: ['Dancing', 'Computer Hacking', 'Nunchucks']});
});

app.get('/search', function(req, res) {
	res.render("search", {title: "Search"});
});

app.get('/search-result', function(req, res) {
	var name = req.query.name;
	var source = req.query.source;
	console.log('Searching for: ' + name);
	console.log('From: ' + source);
	res.send(name + ' : ' + source);
});

app.get('/skills-search', function(req, res) {
	res.render("skills-search", {title: "Multiple Options"});
});

app.get('/skills-search-result', function(req, res) {
	var skills = req.query.skills;
	console.log('Skills: ');
	skills.forEach(function(skill, i) {
		console.log((i+1) + '. ' + skill);
	});
	res.json(req.query.skills);
});

app.get('/signup', function(req, res) {
	res.render('signup', {title: 'Sign Up'});
});

app.post('/signup', function(req, res, next) {
	var name = req.body.name;
	var email = req.body.email;
  var profile_image = req.files.profile_image;
  var tmp_path = profile_image.path;
  var target_path = './public/images/' + profile_image.name;
  fs.rename(tmp_path, target_path, function(err) {
    if (err) { next(err); }
    fs.unlink(tmp_path, function() {
      if (err) { next(err); }
      console.log('File uploaded from: ' + tmp_path + ' to: ' + target_path + ' - ' + profile_image.size + ' bytes');
      res.redirect('/images/' + profile_image.name);
    });
  });
});

app.get("/request", function(req, res) {
  res.render('request');
});

app.put('/request', function(req, res) {
  console.log('PUT: ' + req.body.name);
  res.send('PUT: ' + req.body.name);
});

app.get('/route/:from-:to', function(req, res) {
  var from = req.params.from;
  var to = req.params.to;

  console.log('From: ' + from);
  console.log('To: ' + to);

  var log = 'From: ' + from + '<br />' + 'To: ' + to;
  res.send(log);
});

app.get('/counter', function(req, res) {
  var count = req.signedCookies.count || 0;
  count++;
  res.cookie('count', count, { signed: true });
  res.send('Count: ' + count);
});

http.createServer(app).listen(3000, function() {
	console.log('App started');
});