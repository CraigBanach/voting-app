var db = require("../DB/db");

module.exports = {
    createPoll : function (user, pollName, answerArray) {
        var database = db.getDB();
        var collection = database.collection("polls");
        var counter = 0;
        for (var option in answerArray) {
            answerArray[counter] = {
                option: option,
                value: answerArray[option]
            };
            delete answerArray[option];
            counter++;
        }
        console.log(answerArray);
        var doc = {
            "user" : user,
            "pollName" : pollName,
            options : answerArray
        }
        for (var i = 0; i < answerArray.length; i++) {
            doc.options[i] = answerArray[i];
        }
        collection.insert(doc);
        console.log(JSON.stringify(doc) + " Was inserted into the database");
    },
    
    findPollForUser : function (userID) {
        var database = db.getDB();
        var collection = database.collection("polls");
        var query = {
            "user": userID
        }
        return new Promise(function (resolve, reject) {
            collection.find(query).toArray(function(err, docs) {
            if (err) console.log(err);
            //console.log(docs);
            resolve(docs);
            })
        })
    },
    
    pullPoll : function (pollID) {
        var database = db.getDB();
        var collection = database.collection("polls");
        var id = require('mongodb').ObjectID(pollID);
        //console.log(id);
        var query = {
            _id: id
        };
        //console.log(query);
        return new Promise(function (resolve, reject) {
            collection.find(query).toArray(function(err, docs) {
                if (err) console.log(err);
                //console.log(docs);
                resolve(docs);
            });
        });
    },
    
    updatePoll : function (pollID, option, user) {
        console.log(option);
        var database = db.getDB();
        var collection = database.collection("polls");
        var id = require('mongodb').ObjectID(pollID);
        var query = {
            _id: id
        };
        return new Promise(function (resolve, reject) {
            collection.find(query).toArray(function(err, docs) {
                if (err) console.log(err);
                docs[0].options[option].value++;
                collection.update(query, docs[0]);
                resolve(docs[0].options);
            });
        });
    }
};