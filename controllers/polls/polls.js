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
  //console.log("received requrest");
  pollsDB.pullPoll(req.params[0]).then(function (docs) {
    //console.log("sending render request");
    res.render("home/poll/poll.ejs", {username:req.session.passport.user.username, poll: docs[0]});
  });
});

router.get("/updatepoll", function(req, res) {
  
  pollsDB.updatePoll(req.query.pollID, req.query.option, req.session.passport.user.id)
  .then(function(doc) {
    res.setHeader('Content-Type', 'application/json');
    //res.status(200);
    res.send(doc);
    console.log(doc);
    console.log("message sent");
  });
});

module.exports = router;