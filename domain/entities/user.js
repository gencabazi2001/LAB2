const mongoose = require("mongoose");

module.exports = (db) => {
var userSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    email: String,
    password: String,
    dob: Date,
    settings: {
      darkMode:Boolean,
      isPrivate:Boolean
    },
    details: {
      profileImage: String,
      backgroundImage: String,
      bio: String,
      url: String
    },
    active: Boolean,
    validationString: String,
    verified: Boolean,
    tags :[String]
  },
  {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
  }
);
return db.model('Users', userSchema);
}