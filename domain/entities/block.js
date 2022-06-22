const mongoose = require("mongoose");

module.exports = (relationdb) => {
  var blockSchema = new mongoose.Schema(
    {
      blocker: String,
      blocked: String,
    }
  );
  return relationdb.model('Blocks', blockSchema);
  }