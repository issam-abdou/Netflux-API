"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helper = require("../helper");

var _mongoose = require("mongoose");

// import the hashPasswor function
const shortid = require('shortid'); // import shortid to create salt
// 1- Import mongoose 


// 2- Create Schema and Model
//= Schema
const userSchema = new _mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  birthdate: String,
  salt: String
});
userSchema.pre('save', function (next) {
  if (!this.salt) {
    this.salt = shortid.generate();
    console.log('==== > ' + this.salt);
  }

  if (this.password) {
    this.password = (0, _helper.hashPassword)(this.password, this.salt);
  }

  next();
}); // = Model

const UserModel = new _mongoose.model('User', userSchema); // 3- Export the model

var _default = UserModel;
exports.default = _default;