var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var hbs = require('express-handlebars');

var index = require('./routes/index');
var register = require('./routes/register');
var tutorial = require('./routes/tutorial');
var gameRoom = require('./routes/gameRoom');
var stats = require('./routes/stats');
var offline = require('./routes/offline');
var video = require('./routes/video');
var RPG = require('./routes/RPG');
var puzzle = require('./routes/puzzle');
var review = require('./routes/review');

var app = express();

// view engine setup
app.engine('hbs', hbs({extname: 'hbs' , defaultLayout: 'layout', layoutDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "gukgעןךטןעGLIןעיךHLhl1803jkd02-p", resave: false, saveUninitialized: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/register', register);
app.use('/tutorial', tutorial);
app.use('/game_room', gameRoom);
app.use('/stats', stats);
app.use('/offline', offline);
app.use('/video', video);
app.use('/RPG', RPG);
app.use('/puzzle', puzzle);
app.use('/review', review);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

console.log("Its up");