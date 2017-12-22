var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//get the routes for the api
var routes = require('./routes');

//require mongoose and express-session
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

//use bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//connect to local database user_app
mongoose.connect('mongodb://localhost:27017/user_app');
var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

//use sessions for tracking logins
app.use(session({
    secret: 'SECRET_KEY',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

//use routes
app.use('/', routes);

//start server on 3001
app.listen(3001, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('API Sever is listening on http://localhost:3001');
});