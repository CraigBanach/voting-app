"use strict";

var express = require("express");
var router = express.Router();
var pollsDB = require("/home/ubuntu/workspace/models/polls");
var bodyParser = require("body-parser");

var jsonParser = bodyParser.json({type:"application/json"});

router.get("/", function(req, res) {
    pollsDB.findPollForUser(req.session.passport.user.id).then(function(docs) {
        var htmlVariables = {
          username: req.session.passport.user.username,
          polls: docs
        }
    res.render("home/polls.ejs", htmlVariables);
    });
});

router.get("/create", function(req, res) {
  var htmlVariables = {username: req.session.passport.user.username};
  res.render("home/create.ejs", htmlVariables);
})

router.post("/submit", jsonParser,  function(req, res) {
  pollsDB.createPoll(req.session.passport.user.id, req.body.pollName, req.body.options);
  res.end("completed");
})

router.get("/poll/*", function(req, res) {
  console.log("received requrest");
  pollsDB.pullPoll(req.params[0]).then(function (docs) {
    console.log("sending render request");
    docs[0].username = req.session.passport.user.username;
  res.render("home/poll/poll.ejs", docs[0])});
})

module.exports = router;