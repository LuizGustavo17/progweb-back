var moment = require('moment'); 
moment.locale('pt-br');
var express = require('express');
var cors = require('cors');
const nodeSchedule = require('node-schedule');
var path = require('path');
var logger = require('morgan');
var usersRouter = require('./app/routes/users');
var sharkinRouter = require('./app/routes/sharkin');
require('./config/database');
var RevertAll = require('./app/OtherFunctions/RevertAll');
var MakeAllInvalid = require('./app/OtherFunctions/MakeAllInvalid');
var app = express();
const job = nodeSchedule.scheduleJob('0 20 * * *', () => {
    RevertAll();
    });
const job2 = nodeSchedule.scheduleJob('0 0 * * SUN', () => {
    MakeAllInvalid();
    });
// Connecting to routes
app.use(logger('dev'));
app.use(express.json());
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    next();
});app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/users', usersRouter);
app.use('/sharkin', sharkinRouter);

module.exports = app;
