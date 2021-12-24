
import { hashPassword} from "../helper"; // import the hashPasswor function
const shortid = require('shortid'); // import shortid to create salt

// 1- Import mongoose 
import {Schema, model} from "mongoose"

// 2- Create Schema and Model
//= Schema
const userSchema = new Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    birthdate: String,
    salt: String
})

userSchema.pre('save',function(next){
    if (!this.salt) {
        this.salt = shortid.generate()
        console.log('==== > '+ this.salt);
    }
    if (this.password) {
        this.password = hashPassword(this.password,this.salt)
    }
    next();
})

// = Model
const UserModel = new model('User',userSchema)

// 3- Export the model
export default UserModel;
