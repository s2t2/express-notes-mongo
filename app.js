var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/notes');

var session = require('express-session');
var flash = require('connect-flash');
//var mongoSessionStore = require("connect-mongoose-session-store")(express)

var home_routes = require('./app/controllers/home_controller');
var note_routes = require('./app/controllers/notes_controller');

var app = express();

var moment = require('moment-timezone');
app.locals.moment = moment; // this makes moment available as a variable in every EJS page
app.locals.title = "Sticky Notes App!" // set a common title for all EJS views

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* SESSIONS */

//var sessionStore = new mongoSessionStore({
//    host: 'localhost',
//    port: 27017,
//    db: 'mydb',
//    stringify: false,
//    maxAge: 60 * 60 * 1000,
//    autoRemoveExpiredSession: true,
//    sessionSchema: 'any_mongoose_schema',        // optional
//    sessionHistorySchema: 'any_mongoose_schema'  // optional
//});
//app.use(express.session({
//    secret: 'mlpi',
//    key: 'mlpi.sid',
//    cookie: {
//      path: '/',
//      domain: '',
//      httpOnly: true,
//      maxAge: 60 * 60 * 1000
//    },
//    store: sessionStore
//}));

var sessionStore = new session.MemoryStore();

app.use(session({
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  store: sessionStore,
  name: 'sticky-notes-session',
  secret: process.env.SESSION_SECRET || 'sticky-notes-session-secret',
  resave: false,
  saveUninitialized: true
}));

/* FLASH MESSAGES ... should go below session and cookie parser, and above app.use('/', routes) */

app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

/* ROUTES */

app.use('/', home_routes);
app.use('/', note_routes); // could optionally orient the notes route against '/notes' instead of '/', but '/' makes for a clearer reading of paths in the notes_controller

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('_error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('_error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
