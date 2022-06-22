const mongoose = require("mongoose");

module.exports = (db) => {
var adminSchema = new mongoose.Schema(
  {
    userID: String,
    name: String,
    username: String,
    email: String,
    password: String,
    dob: Date
  },
  {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
  }
);
return db.model('Admins', adminSchema);
}