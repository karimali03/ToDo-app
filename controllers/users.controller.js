const usersModel = require('../models/users.model');
const hashing = require('../util/hash.password');

class UserController  {
    static getAllUsers = async (req, res) => {
        try {
            const users = await usersModel.getAllUsers();
            res.send(users);
        }
        catch(err){
            res.status(400).send("Error in fetching users");   
        }
    };

    static getUserById = async (req, res) => {
        try {
            const user = await usersModel.getUserById(req.params.id);
            if(user) res.send({ message: "user found", result : user });
            else res.send({ message: "user not found", result : null })
        }
        catch(err){
            res.status(400).send("Error in fetching user");
        }
    };

    static updateUser =  async (req, res) => {
        try { 
            if(req.body.email){
                const isExist = await usersModel.getUserByemail(req.body.email);
                if(isExist) return res.status(400).send({ message: "email cannot be used"});
            }
            if(req.body.password){
                req.body.password = await hashing(req.body.password);
            }
            const updatedUser = await usersModel.updateUserById(req.params.id, req.body );
            
            res.send({
                    message: "user is updated",
                    result: updatedUser
            });
        }
        catch(err){
            res.status(400).send("Error in updating user");
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
            res.status(400).send("Error in creating user");
        }

    };

    static loginUser = async (req, res) => {
        try {
            const user = await usersModel.getUserByemail(req.body.email);
            if(!user) return res.status(400).send({ message: "invalid Email or Password"});
            const isMatch = await user.comparePassword(req.body.password);
            if(!isMatch) return res.status(400).send({ message: "invalid Email or Password"});
            let token = user.generateAuthToken();
            res.header('x-auth-token', token)
            .send({ message: "login successfully"});
        }
        catch(err){
            res.status(400).send("Error in login..");
        }
    };


    static deleteUser = async (req, res) => {
        try {
            const user = await usersModel.deleteUserById(req.params.id);
            if(user) res.send({ message: "user is deleted", result: user });
            else res.send({ message: "user not found", result: null });
        }
        catch(err){
            res.status(400).send("Error in deleting user");
        }
    };
}


module.exports = UserController;