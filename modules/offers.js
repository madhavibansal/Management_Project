const offers = require("../models/Offers")
const ucg = require("coupon-code")

module.exports.BookOffer = async(req,res) => {
    var code = ucg.generate(); 
    console.log(code)
    let newCoupon = new offers({code:code});
    try{
    const result = newCoupon.save().then(newCoupon => {
        res.json({newCoupon})
    })
}catch(err){
    res.status(400).send(err)
}
  }

module.exports.Publish = async(req,res) => {
        const Blocks = offers.findByIdAndUpdate({_id:req.params._id},{$set:{status:true}},(err,docs) => {
            if(err){
                res.send("something went wrong")
                }
            else{
                res.send("Publish")
            }
        })
}
module.exports.UnPublish = async(req,res) => {
    const Blocks = offers.findByIdAndUpdate({_id:req.params._id},{$set:{status:false}},(err,docs) => {
        if(err){
            res.send("something went wrong")
            }
        else{
            res.send("UnPublish")
        }
    })
}
module.exports.ViewOffers = async(req,res) => {
    const viewOffer = await offers.find({}).then(data => {
        res.json({data})
    })
}
module.exports.DeleteOffer = async(req,res) => {
    const deleteOffer = await offers.findByIdAndDelete({_id:req.params._id},(err,docs) => {
        if(err){
            res.send("something went wrong")
            }
        else{
            res.send("Delete Offer")
        }
    })
    
}