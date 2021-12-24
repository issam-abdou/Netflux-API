// USE CRYPTO library in node js
const crypto = require('crypto');
// import { nanoid } from 'nanoid'
//  import shortid from "shortid";
// const shortid = require('shortid');
const nanoid = require('nanoid')


// Function for HASHING the password
const hashPassword = (password,salt = 'secret')=>{
    return crypto.createHmac('sha256',salt).update(password).digest('hex')
}

export {hashPassword};

// let test = nanoid();
// console.log("===========  " + test);