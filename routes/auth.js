var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt')
const bcryptSalt = 10;
const User = require('../models/user')

const passport = require('passport')

// GET /login 
router.get('/login', function (req, res, next) {
  res.render('auth/login');
});

// GET /signup 
router.get('/signup', function (req, res, next) {
  res.render('auth/signup');
});

// POST /signup
router.post('/signup', (req, res, next) => {
  const password = req.body.password;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  let email = req.body.email
  console.log(req.body)

  User.create({
    email: email,
    password: hashPass
  }).then(() => {
    res.redirect('login');
  })
});

// POST /login
router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
}));

// GET /logout
router.get('/logout', (req, res, next) => {
  req.logOut()
  res.redirect('/')
})

module.exports = router;