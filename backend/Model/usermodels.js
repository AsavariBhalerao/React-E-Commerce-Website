const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
require("dotenv").config();
const secretkey = process.env.KEY;

const Userschema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    secretanswer:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    role:{
        type:Number,
        default:0
    }
 
})
//token generate
Userschema.methods.generatetoken = function(){
    try{ 
        let usertoken  = jwt.sign({_id:this._id}, secretkey)
        return usertoken;
    }catch(error){
        console.log(error);
    }
}



const Usermodel = mongoose.model("User", Userschema)
module.exports = Usermodel