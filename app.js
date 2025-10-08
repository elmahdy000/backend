var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dashboardRouter = require('./routes/dashboard');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function setCorsHeaders(req, res, next) {
  var origin = req.headers.origin || '*';
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/dashboard', dashboardRouter);

app.use(function notFoundHandler(req, res) {
  res.status(404).json({ message: 'المورد المطلوب غير موجود.' });
});

app.use(function errorHandler(err, req, res, next) {
  console.error('Unhandled application error', err);
  res.status(err.status || 500).json({
    message: err.message || 'حدث خطأ غير متوقع في الخادم.'
  });
});

module.exports = app;
