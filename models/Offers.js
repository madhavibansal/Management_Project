
const mongoose = require("mongoose");

const OffersSchema = mongoose.Schema({
    code: {
        type: String, 
        unique: true
    },
  status: {
    type:Boolean, 
    default: false
},
    
    createdAt:{
        type:Date,
        default:Date.now,
        index: {expires:300}
    }
    

},{timestamps:true})

module.exports = mongoose.model("Offers",OffersSchema);