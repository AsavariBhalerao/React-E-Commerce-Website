const userModel = require("../Model/usermodels")
const jwt = require("jsonwebtoken");
require("dotenv").config();

//userlogin auth
exports.authlogin = (req,res,next)=>{
    try{ 
        const decode = jwt.verify(req.headers.authorization, process.env.KEY);
        req.user = decode;
        next();
    }catch(error){
        console.log(error)
        res.status(400).send({message:"pls login first"})
    }
}

//user admin panel
exports.Admin = async(req,res,next)=>{
    try{
        const user = await userModel.findById(req.user._id);
    if(user.role!=1){
       return res.status(400).send({message:"unauhorizaion access"})

    }else{
        next();
    }
    }catch(error){
        console.log(error)
        res.status(400).send({message:"unauhorizaion access"})
        
    }
}