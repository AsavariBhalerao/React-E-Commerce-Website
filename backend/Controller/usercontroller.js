
const userModel = require('../Model/usermodels')
const { hashpassword ,compare } = require('../middleware/helper');

//register
exports.register = async (req, res) => {                                            
    try {
        // for required every field validation
        const { name, email, password, secretanswer, address, phone } = req.body;
        if (!name || !email || !password || !secretanswer || !address || !phone) {
            //if any of the field is missing then return
            return res.status(400).send("Please fill all the fields");
        }

        // if user is already exists registered
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(200).send("User Already Registered. Please Login.");
        }

        // if user does not exist, create new user
        // we need to hash this password with bcryptjs
        // i create middleware folder inside it create helper.js and exports
        const hash = await hashpassword(password); // access this and pass from middleware
        const newUser = new userModel({ name, email, phone, password: hash, secretanswer, address });
        const userSave = await newUser.save()

        res.status(200).send({ message: "User registered Successfully", userSave });
    } catch (err) {
        res.status(400).send({ message: "User Registration Failed", error: err.message });
    }
};

//login
exports.login = async(req,res)=>{
    try{

        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).send("pls filled all your filled")
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).send("user does not exist, pls signup first")
            
        }
        const match = await compare(password, user.password)
        if(!match){
            return res.status(400).send("invalid password")

        }
        const token = await user.generatetoken();
        res.status(200).send({message:"user login successfully", token, user})
    }catch(error){
        res.status(400).send({message:"user login failed ", error})
    }
}

//forgotpassword

exports.forgotpassword = async(req,res)=>{
    try{

        const {email,secretanswer, newpassword} = req.body
        if(!email || !secretanswer || !newpassword){
            return res.status(400).send({message:"pls filled all yur filled"})
        }
        const user = await userModel.findOne({email:email,secretanswer:secretanswer,})
        if(!user){
            return res.status(400).send({message:"user not existed, pls signup "})

        }
        const hash  = await hashpassword(newpassword);
        const updatepassword = await userModel.findByIdAndUpdate(user._id,{password:hash},{new:true})   
        res.status(200).send({message:" password reset successfullyy"})
        
    
    }catch(error){
        res.status(400).send({message:"forgot password failed",error})
    }
}

