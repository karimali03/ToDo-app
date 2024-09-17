const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users.controller');
const Authentication = require('../middlewares/auth');
const validationUser = require('../middlewares/validation.users');

// get all users
router.get('/', Authentication.adminAuth , UserController.getAllUsers);
// get user by id
router.get('/:id', Authentication.userAuth , UserController.getUserById);
// update user by id
router.put('/:id', validationUser.validationUpdateUser 
    , Authentication.userAuth , UserController.updateUser );
// delete user by id
router.delete('/:id', Authentication.userAuth , UserController.deleteUser);

module.exports = router;
