const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require("dotenv").config();
require("./dbconn/dbconn")


const port = process.env.PORT || 2020
const cors = require("cors")

const userroute = require('./Router/userroute');
const { register } = require('./Controller/usercontroller');

app.use(bodyParser.json());
app.use(express.json())
app.use(cors());
app.use(userroute)
app.use('/register',register)
app.listen(port, ()=>{
    console.log(`server listenning on port no: ${port}`)
})