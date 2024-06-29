const express = require('express');
const { register,login, forgotpassword } = require('../Controller/usercontroller');
const {authlogin, Admin} = require("../middleware/userauth")
const route = express.Router()

route.post('/', register);
route.post('/login',login)
route.post('/forgotpassword',forgotpassword)

route.get("/loginverify", authlogin,(req,res)=>{
    res.send({ok:"user verify successfully"})
})
route.get("/adminverify", authlogin,Admin,(req,res)=>{
    res.send({ok:"user verify successfully"})
})

module.exports = route;