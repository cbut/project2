const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const flash = require("connect-flash");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

const MongoStore = require("connect-mongo")(session);
const mongoose = require('mongoose');

const dbName = 'personality_reports';

require("dotenv").config()

// DB connect (and create DB)
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const indexRouter = require('./routes/index');
const resultsRouter = require('./routes/results');
const authRouter = require('./routes/auth');
const allReportsRouter = require('./routes/all_reports');

const app = express();

// this adds req.flash to every route
app.use(flash());

app.use(session({
  secret: "abc",
  store: new MongoStore({ // this is going to create the `sessions` collection in the db
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


require('./config/passport.js')

// this among other things adds req.user to every route
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// middleware to create a variable (we named it "theUser")
// and to make it available throughout the whole application in all the views
app.use((req, res, next) => {
  if (req.user) {
    res.locals.user = req.user;
    next();
  } else {
    next();
  }
})

app.use('/', indexRouter);
app.use('/results', resultsRouter);
app.use('/auth', authRouter);
app.use('/all_reports', allReportsRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
