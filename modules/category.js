const category = require("../models/Category")
const offerss = require("../models/Offers")

module.exports.AddCategory = async(req,res) => {
    const add = new category({
        Name:req.body.Name,
        title:req.body.title,
        description:req.body.description,
        price:req.body.price,
        image:req.body.image
    })
    try{
        const addCategory = await add.save().then(addCategory => {
            res.json({addCategory})
        })
    }catch(err){
        res.status(400).send(err)
    }
}
module.exports.EditCategory = async(req,res) => {
    category.findByIdAndUpdate({_id:req.params._id},req.body,(err,docs) => {
        if(err){
            res.send("something went wrong")
            }
        else{
            res.send(docs)
        }
    })
}
module.exports.DeleteCategory = async(req,res) => {
    const deleteUser = await category.findByIdAndDelete({_id:req.params._id},(err,docs) => {
        if(err){
            res.send("something went wrong")
            }
        else{
            res.send("Delete Category")
        }
    })
    
}
module.exports.GetCategory = async(req,res) => {
    const limit = parseInt(req.query.limit)
    const skip = parseInt(req.query.skip)
    try{
    const getUser = category.find({Name:{$regex:req.query.Name,$options:'$i'}})
    .limit(limit).skip(limit*skip).sort({Name:1}).then(data => {
        res.json({data})
    })
}catch(err){
    res.status(500).json({ message: e.message })
}
}
module.exports.ViewCategory = async(req,res) => {
    const viewCategory = await category.find({}).then(data => {
        res.json({data})
    })
}
module.exports.addOffer = async(req,res) => {
    const findOffer = await category.findById({_id:req.params._id})
    
    const verify = await offerss.findById({_id:req.body._id})
    if (verify.status) {
        
    const offer = await category.findByIdAndUpdate({_id:req.params._id},{$set:{offers:req.body.offers}},(err,docs) => {
        if(err){
            res.send("something went wrong")
            }
        else{
            res.send(docs)
        }
    }).populate('offers')
}
else{
    res.send("No offer in this category")
}
}
