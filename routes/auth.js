var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt')
const bcryptSaltRounds = 10;
const User = require('../models/user')

const passport = require('passport')

// GET /login 
router.get('/login', function (req, res, next) {
  res.render('auth/login', { message: req.flash('message') })
});

// GET /signup 
router.get('/signup', function (req, res, next) {
  res.render('auth/signup', { message: req.flash('message') })
});

// POST /signup
router.post('/signup', (req, res, next) => {
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSaltRounds);
  const hashPass = bcrypt.hashSync(password, salt);

  let email = req.body.email

  function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }


  function validateEmailUniqueness(email) {
    return User.findOne({ email: email }).then(function (result) {
      return result === null;
    });
  }

  if (!emailIsValid(email)) {
    req.flash('message', 'Email is not in a valid format')
    res.redirect('/auth/signup')
  }

  validateEmailUniqueness(email).then(function (unique) {
    if (!unique) {
      req.flash('message', 'Email is already being used');
      res.redirect('/auth/signup')
    }
  });

  if (password.length < 6) {
    req.flash('message', 'password must be at least 6 characters long')
    res.redirect('/auth/signup')
    return
  }

  User.create({
    email: email,
    password: hashPass
  }).then((user) => {
    req.login(user, function (err) {
      if (!err) {
        res.redirect('/');
      } else {
        res.render("auth/signup", { message: "Something went wrong" });
      }
    })
  })
    .catch(error => {
      next(error)
    })
});

// POST /login
router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

// GET /logout
router.get('/logout', (req, res, next) => {
  req.logOut()
  res.redirect('/')
})

module.exports = router;