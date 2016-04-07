var express = require("express");
var router = express.Router();
var passport = require('passport');
var session = require('express-session');

var app = express();

require("../middlewares/Authentication/Passport-github2")

router.get('/login',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
  // Successful authentication, redirect home.
  res.send('/home');
});

router.get("/", function(req, res) {
  res.render("./index");
})  

module.exports = router