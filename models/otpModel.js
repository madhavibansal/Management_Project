
const mongoose = require("mongoose");

const OtpSchema = mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
   
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        index: {expires:300}
    }
    

},{timestamps:true})

module.exports = mongoose.model("OTP",OtpSchema);