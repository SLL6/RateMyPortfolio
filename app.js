
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');

var index = require('./routes/index');
var login = require('./routes/login');
var signUp = require('./routes/signUp');
var home = require('./routes/home');
var settings = require('./routes/settings');
var search = require('./routes/search');
var rate = require('./routes/rate');
var rate2 = require('./routes/rate2');
var submit = require('./routes/submit');
var categories = require('./routes/categories');
var profile = require('./routes/profile');
var help = require('./routes/help');

// Example route
// var user = require('./routes/user');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'rated';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({
    helpers: require("./public/js/helpers.js").helpers, // same file that gets used on our client
}));
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/login', login.view);
app.get('/signUp', signUp.view);
app.get('/home', home.view);
app.get('/settings', settings.view);
app.get('/search', search.displayResults);
app.get('/rate/:id', rate.displayProject);
app.get('/rate2/:id', rate2.displayProject);
app.get('/categories', categories.view);
app.get('/submit',submit.view);
app.get('/profile', profile.view);
app.get('/help', help.view);

app.post('/login', login.checkCredentials);
app.post('/signUp', signUp.createAccount);
app.post('/rate/:id', rate.updateRating);
app.post('/rate2/:id', rate2.updateRating);
app.post('/submit',submit.addNew);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
