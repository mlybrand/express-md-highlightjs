var routes = require('./handlers');
var user = require('./handlers/users');

module.exports = function(app) {
	app.get('/', routes.index);
	app.get('/users', user.list);
}