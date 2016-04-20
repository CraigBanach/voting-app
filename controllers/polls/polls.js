"use strict";

var express = require("express");
var router = express.Router();
var pollsDB = require("/home/ubuntu/workspace/models/polls");
var bodyParser = require("body-parser");

var jsonParser = bodyParser.json({type:"application/json"});

router.get("/", function(req, res) {


    if (req.session.hasOwnProperty("passport")) {
      pollsDB.findPollForUser(req.session.passport.user.id).then(function(docs) {
          var htmlVariables = {
            username: req.session.passport.user.username,
            polls: docs
          }
      res.render("home/polls.ejs", htmlVariables);
      });
    } else {
      res.redirect("/");
    }
});

router.get("/create", function(req, res) {
  var htmlVariables = {username: req.session.passport.user.username};
  res.render("home/create.ejs", htmlVariables);
})

router.post("/submit", jsonParser,  function(req, res) {
  pollsDB.createPoll(req.session.passport.user.id, req.body.pollName, req.body.options).then(
    function(doc) {
      console.log(doc);
      res.setHeader('Content-Type', 'application/json');
      res.send(doc);
    }
    );
})

router.post("/deletepoll", jsonParser, function(req, res) {
  pollsDB.deletePoll(req.body.pollID);
  res.status(200);
  res.end("completed");
})

router.get("/poll/*", function(req, res) {

  pollsDB.pullPoll(req.params[0]).then(function (docs) {
    if (req.session.hasOwnProperty("passport")) {
      res.render("home/poll/poll.ejs", {username:req.session.passport.user.username, poll: docs[0]});
    } else {
      res.render("home/poll/poll1.ejs", {poll: docs[0]});
    }
  });
});

router.get("/all", function(req, res) {
  pollsDB.getAllPolls().then(function(docs) {
  var user;
  
  if (req.session.hasOwnProperty("passport")) {
    user = req.session.passport.user.username;
  } else {
    user = "unregistered User";
  }
    var htmlVariables = {
          username: user,
          polls: docs
        }
    res.render("home/polls1.ejs", htmlVariables);
  })
})

router.post("/addoption", jsonParser,  function(req, res) {
  pollsDB.addOption(req.body.option, req.body.id).then(function(data) {
    res.end(JSON.stringify(data));
  });
})

router.get("/updatepoll", function(req, res) {
  
  var user;
  
  if (req.session.hasOwnProperty("passport")) {
    user = req.session.passport.user.id;
  } else {
    user = "unregistered User";
  }
  
  pollsDB.updatePoll(req.query.pollID, req.query.id, user)
  .then(function(doc) {
    res.setHeader('Content-Type', 'application/json');
    //res.status(200);
    res.send(doc);

    //console.log("message sent");
  });
});

module.exports = router;