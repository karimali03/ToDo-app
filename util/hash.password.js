const bcrypt = require('bcrypt');

const saltRounds = 10; 
module.exports = async function hashPassword(password) {
    try{
        const hashedPassword = await bcrypt.hash( password, saltRounds);
        return hashedPassword;
    }
    catch(err){
        return Error("Problem in hashing password"); 
    }
}
