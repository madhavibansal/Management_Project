
const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
   offers:{
    type:mongoose.Schema.Types.ObjectId,
        ref:'Offers',
   }
    
    
    

},{timestamps:true})

module.exports = mongoose.model("Category",categorySchema);