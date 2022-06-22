const mongoose = require("mongoose");

module.exports = (relationdb) => {
  var followSchema = new mongoose.Schema(
    {
      follower: String,
      following: String,
    }
  );
  return relationdb.model('Follows', followSchema);
  }