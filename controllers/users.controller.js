const usersModel = require('../models/users.model');
const hashing = require('../util/hash.password');
const asyncFun = require('../middlewares/async.function');

class UserController  {
    static getAllUsers =  asyncFun ( async (req, res) => {
            const users = await usersModel.getAllUsers();
            res.send(users); 
    });

    static getUserById = asyncFun( async (req, res) => {
            const user = await usersModel.getUserById(req.params.id);
            if(user) res.send({ message: "user found", result : user });
            else res.send({ message: "user not found", result : null }) 
    });

    static updateUser = asyncFun( async (req, res) => {
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
    });

    static createUser = asyncFun( async (req, res) => {
            const isExist = await usersModel.getUserByemail(req.body.email);
            if(isExist) return res.status(400).send({ message: "user already exist"});
            req.body.password = await hashing(req.body.password);
            const newUser = await usersModel.createUser(req.body);
            res.send({ message: "user is created", result: newUser });
    });

    static loginUser = asyncFun( async (req, res) => {
            const user = await usersModel.getUserByemail(req.body.email);
            if(!user) return res.status(400).send({ message: "invalid Email or Password"});
            const isMatch = await user.comparePassword(req.body.password);
            if(!isMatch) return res.status(400).send({ message: "invalid Email or Password"});
            let token = user.generateAuthToken();
            res.header('x-auth-token', token)
            .send({ message: "login successfully"});
    });


    static deleteUser = asyncFun(async (req, res) => {
            const user = await usersModel.deleteUserById(req.params.id);
            if(user) res.send({ message: "user is deleted", result: user });
            else res.send({ message: "user not found", result: null });
    });

}


module.exports = UserController;