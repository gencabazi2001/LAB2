
const mongoose = require("mongoose");
const config = require("config-yml");
const follow = require('../entities/follow')
const block = require('../entities/block')
    const conn2 = mongoose.createConnection('mongodb://localhost:27017/UserRelationsDB',{
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, () => console.log("connected to realtions db*******************")
    );
    relationdb ={}
    relationdb.Follow = follow(conn2)
    relationdb.Block = block(conn2)
  exports.relationdb = relationdb
