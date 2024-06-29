
const bcrypt = require('bcryptjs')

// access this for hashing the password
exports.hashpassword = async(password)=>{
    try{
        const round = 10
        const hashedPassword = await bcrypt.hash(password,round)
        return hashedPassword ;
    }catch(err){
      console.log(err)
    }
}     

// compare the password
// two passwords here user pass and database pass
exports.compare = async(password,hashingPassword)=>{
    return bcrypt.compare(password,hashingPassword)
}