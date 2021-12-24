"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashPassword = void 0;

// USE CRYPTO library in node js
const crypto = require('crypto'); // import { nanoid } from 'nanoid'
//  import shortid from "shortid";
// const shortid = require('shortid');


const nanoid = require('nanoid'); // Function for HASHING the password


const hashPassword = function hashPassword(password) {
  let salt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'secret';
  return crypto.createHmac('sha256', salt).update(password).digest('hex');
}; // let test = nanoid();
// console.log("===========  " + test);


exports.hashPassword = hashPassword;