const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const otpGenerator = require("otp-generator")
const User = require("../models/User")
const OTP = require("../models/otpModel")

module.exports.SignUp = async(req,res) => {
    const user = await User.findOne({
        email:req.body.email
    })
    if(user) return res.status(400).send("user already exist")
    const Otp = otpGenerator.generate(6,{
        digits:true,lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false
    })
    const email = req.body.email
    console.log(Otp)
    const salts = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password,salts);
    const otp = new OTP({email:email,Name:req.body.Name,password:hashedPass,address:req.body.address,otp:Otp})
    const salt = await bcrypt.genSalt(10)
    otp.otp = await bcrypt.hash(otp.otp,salt)
    await OTP.findOneAndDelete({email:email})
    const result = await otp.save()
    return res.status(200).send("otp send successfully")

}
module.exports.verifyOtp = async (req,res) => {
    const otpHolder = await OTP.findOne({email:req.body.email})
    if (otpHolder.length === 0) return res.status(400).send("expired otp")
    const valid = await bcrypt.compare(req.body.otp,otpHolder.otp)
   
    if(otpHolder.email === req.body.email && valid){
        const salts = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salts);
        const user = new User({email:req.body.email,Name:req.body.Name,password:hashedPass,address:req.body.address,category:req.body.category})
        const token = user.generateJWT()
        console.log(token)
        const result = await user.save()
        const otpDelete = await OTP.deleteMany({
            email:otpHolder.email
        })
        return res.send({
            message:"user registration successful",
            token:token,
            data:result
        })
        
    }
    else{
        return res.status(400).send("your otp was wrong")
    }
}
module.exports.login = async(req,res) => {
    const users = await User.findOne({email:req.body.email})
    if(users.isBlock) return res.status(400).send("Your account has been blocked");
    if(!users) return res.status(400).send("Email is not valid");
    
    const pass = await bcrypt.compare(req.body.password,users.password);
    if(!pass) res.status(400).send("Password is Incorrect");
    const token = jwt.sign({_id:User._id},"sdhjsdbcjdfvbjkdf");
    res.header("auth",token).status(200).json({
        message:"Succesfully Login",
        token
    })
}
module.exports.EditProfile = async(req,res) => {
    User.findByIdAndUpdate({_id:req.params._id},req.body,(err,docs) => {
        if(err){
            res.send("something went wrong")
            }
        else{
            res.send("updated")
        }
    })
}
module.exports.Block = async(req,res) => {
        const Blocks = User.findByIdAndUpdate({_id:req.params._id},{$set:{isBlock:true}},(err,docs) => {
            if(err){
                res.send("something went wrong")
                }
            else{
                res.send("Blocked")
            }
        })
}
module.exports.UnBlock = async(req,res) => {
    const Blocks = User.findByIdAndUpdate({_id:req.params._id},{$set:{isBlock:false}},(err,docs) => {
        if(err){
            res.send("something went wrong")
            }
        else{
            res.send("Unblocked")
        }
    })
}
module.exports.DeleteUser = async(req,res) => {
    const deleteUser = await User.findByIdAndDelete({_id:req.params._id},(err,docs) => {
        if(err){
            res.send("something went wrong")
            }
        else{
            res.send("deleted user")
        }
    })
    
}
module.exports.GetUser = async(req,res) => {
    const limit = parseInt(req.query.limit)
    const skip = parseInt(req.query.skip)
    try{
    const getUser = User.find({Name:{$regex:req.query.Name,$options:'$i'}})
    .limit(limit).skip(limit*skip).sort({Name:1}).then(data => {
        res.json({data})
    })
}catch(err){
    res.status(500).json({ message: e.message })
}
}
module.exports.getCat= async(req,res) => {
    const findCat = await User.findById({_id:req.params._id})
    
    const categ = await User.findByIdAndUpdate({_id:req.params._id},{$set:{category:[...findCat.category,req.body.category]}},(err,docs) => {
        if(err){
            res.send("something went wrong")
            }
        else{
            res.send(docs)
        }
    }).populate('category')


   
}