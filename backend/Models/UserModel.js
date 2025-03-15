const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // fixed typo from 'require'
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // Projects: [
  //   {
  //     menuItem: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Project"
  //     },
  //     Created: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User"
  //     },
  //     contributors: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User"
  //     }
  //   }
  // ]
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
module.exports = User;
