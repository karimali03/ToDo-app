const express = require('express');
const router = express.Router();
const Validation = require('../middlewares/validation.users');
const UserController = require('../controllers/users.controller');

// Create a new user
router.post('/', Validation.validationSignup , UserController.createUser);


module.exports = router;
