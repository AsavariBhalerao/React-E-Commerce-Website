const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce-website").then(()=>{
    console.log("conn succeufl")
}).catch((e)=>{
    console.log(e)
})