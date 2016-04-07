"use strict"

var express = require("express");
var router = express.Router();
var passport = require('passport');
var session = require('express-session');
var userDB = require("../models/users");

var app = express();

require("../middlewares/Authentication/Passport-github2")

router.get('/login',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    var userDetails;
  // Successful authentication.
    userDB.searchForUser(req.user.id).then(
      function(doc) {
        userDetails = doc;
        res.send('Welcome, ' + userDetails[0].userName);
      },   // When resolved
      function(user) {userDB.addNewUser(user, req.user._json.login)}  //when rejected
      );
  
  });

router.get("/", function(req, res) {
  res.render("./index");
})  

module.exports = router