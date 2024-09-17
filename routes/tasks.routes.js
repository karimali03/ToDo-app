const express = require('express');
const router = express.Router();
const todoController = require('../controllers/tasks.controller');
const validationTask = require('../middlewares/validation.tasks');
const auth = require('../middlewares/auth');

// param middlware
router.param('id', validationTask.validationId); 
 


// Get all tasks
router.get('/', auth.loginAuth , todoController.getAllTasks);

// Create a new task;
router.post('/', validationTask.validationCreate, auth.loginAuth , todoController.createTask);

// Get a task
router.get('/:id' , auth.loginAuth , todoController.getTaskById );

// Update a task
router.put('/:id',  validationTask.validationUpdate , auth.loginAuth , todoController.updateTask);

// Toggle a task
router.patch('/:id', auth.loginAuth ,todoController.toggleTask);

// Delete a task
router.delete('/:id', auth.loginAuth , todoController.deleteTask);



module.exports = router;
