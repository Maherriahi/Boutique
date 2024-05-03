var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose=require('mongoose')
require('dotenv').config()
const userRouter=require('./routes/user.Router')
const passport =require('passport')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//passport------------------------------
app.use(passport.initialize())
require('./security/passport')(passport)
//-------------------------------------------
//connect to data base
mongoose.connect(process.env.URL)
.then(()=>console.log("Data base connected !"))
.catch((err)=>console.log(err.message))

app.use('/api',userRouter)


module.exports = app;
