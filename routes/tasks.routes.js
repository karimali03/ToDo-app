const express = require('express');
const router = express.Router();
const todoController = require('../controllers/tasks.controller');
const validationTask = require('../middlewares/validation');

// param middlware
router.param('id', validationTask.validationId); 
 


// Get all tasks
router.get('/', todoController.getAllTasks);

// Create a new task;
router.post('/', validationTask.validationCreate, todoController.createTask);

// Get a task
router.get('/:id', todoController.getTaskById);

// Update a task
router.put('/:id', validationTask.validationUpdate , todoController.updateTask);

// Toggle a task
router.patch('/:id', todoController.toggleTask);

// Delete a task
router.delete('/:id', todoController.deleteTask);



module.exports = router;
