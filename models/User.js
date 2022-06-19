
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const userSchema = mongoose.Schema({
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
   
    isBlock:{
        type:Boolean,
        default:false
    },
    category:{
        
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Category',
    }
    

},{timestamps:true})
userSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        _id:this._id,
        email:this.email
    },"dfjvbjhsvbjsvbsjkdvcbsvjbsdjvbsjhvbdsj",{expiresIn:"7d"})
    return token
}
module.exports = mongoose.model("User",userSchema);