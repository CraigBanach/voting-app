var assert = require("assert"); // node.js core module
var db = require("../DB/db");

describe('db.js', function(){
  describe('getDB function', function(){
    it('should return a database object after the connection to the database has been made.', function(done){
        console.log(db.getDB);
      assert(db.getDB); // 4 is not present in this array so indexOf returns -1
    })
  })
});