var express = require('express');
var app = express();
var path = require('path');

var indexRouter = require('./routes/index');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;