
const mongoose = require("mongoose");

module.exports = (db) => {
  var tagSchema = new mongoose.Schema(
    {
      tag: String,
      desc: String,
    }
  );
  return db.model('Tags', tagSchema);
  }