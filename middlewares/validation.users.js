const validSignup = require('../util/valid.signup');
const validLogin = require('../util/valid.login');

class validationUser{

    static validationSignup = (req,res,next) => {
        const isValid = validSignup(req.body);
        if(!isValid){
            res.status(400).send(validSignup.errors);
            return;
        }
        next();
    }
    
    static validationLogin = (req,res,next) => {
        const isValid = validLogin(req.body);
        if(!isValid){
            res.status(400).send(validLogin.errors);
            return;
        }
        next();
    }
    
}

module.exports = validationUser;