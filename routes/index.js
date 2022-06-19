const {SignUp,verifyOtp,login,EditProfile,Block,UnBlock,DeleteUser,GetUser,getCat} = require("../modules/index")
const {AddCategory,EditCategory,DeleteCategory,GetCategory,ViewCategory,addOffer} = require("../modules/category")
const {BookOffer, Publish, UnPublish, DeleteOffer, ViewOffers} = require("../modules/offers")
const {verify} = require("../jwtVerify/verify")
const route = (app) => {
    
    //userManagement
    app.post("/signup",SignUp)
    app.post("/verifyOTP",verifyOtp)
    app.post("/login",login)
    app.put("/editProfile/:_id",verify,EditProfile)
    app.post("/block/:_id",verify,Block)
    app.post("/unblock/:_id",verify,UnBlock)
    app.delete("/delete-user/:_id",verify,DeleteUser)
    app.get("/get-user",verify,GetUser)
    app.post("/get/:_id",verify,getCat)

    //CategoryManagement
    app.post("/add-category",verify,AddCategory)
    app.put("/edit-category/:_id",verify,EditCategory)
    app.delete("/delete-category/:_id",verify,DeleteCategory)
    app.get("/get-category",verify,GetCategory)
    app.get("/view-category",verify,ViewCategory)
    app.post("/add-offer/:_id",verify,addOffer)

    //OfferManagement
    app.post("/book-offer",verify,BookOffer)
    app.post("/publish/:_id",verify,Publish)
    app.post("/unpublish/:_id",verify,UnPublish)
    app.delete("/delete-offer/:_id",verify,DeleteOffer)
    app.get("/view-offer",verify,ViewOffers)


}
module.exports = route