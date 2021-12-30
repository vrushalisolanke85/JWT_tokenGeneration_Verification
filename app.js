var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const middleware =require('./middelware/middelware.jwt');
var usersRouter = require('./routes/routes.users');
let authRouter= require('./routes/auth');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));


app.get('/', (req, res) => {
    res.send("Welcome to ProData");
});
app.use('/auth',authRouter);
app.use('/users',middleware.checktoken,usersRouter);

module.exports = app;
