var db = require("../DB/db");

module.exports = {
    createPoll : function (user, pollName, answerArray) {
        var database = db.getDB;
        var collection = database.collection("polls");
        var doc = {
            "user" : user,
            "pollName" : pollName,
            options : {}
        }
        for (var i = 0; i < answerArray.length; i++) {
            doc.options[i] = answerArray[i];
        }
        collection.insert(doc);
    }
}