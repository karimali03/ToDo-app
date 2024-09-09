const usersModel = require('../models/users.model');
const hashing = require('../util/hash.password');

class UserController  {
    static getAllUsers = async (req, res) => {
        try {
            const users = await usersModel.getAllUsers();
            res.send(users);
        }
        catch(err){
            res.status(400).send(err);   
        }
    };

    static createUser = async (req, res) => {
        try {
        const isExist = await usersModel.getUserByemail(req.body.email);
        if(isExist) return res.status(400).send({ message: "user already exist"});
        req.body.password = await hashing(req.body.password);
        const newUser = await usersModel.createUser(req.body);
        res.send({ message: "user is created", result: newUser });
        }
        catch(err){
            res.status(400).send(err);
        }

    };

    static loginUser = async (req, res) => {
        try {
            const user = await usersModel.getUserByemail(req.body.email);
            if(!user) return res.status(400).send({ message: "invalid Email or Password"});
            const isMatch = await user.comparePassword(req.body.password);
            if(!isMatch) return res.status(400).send({ message: "invalid Email or Password"});
            res.send({ message: "login successfully"});
        }
        catch(err){
            res.status(400).send("Error in login..");
        }
    }
}


module.exports = UserController;