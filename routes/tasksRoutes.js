const express = require('express');
const router = express.Router();
const todoController = require('../controllers/tasksController');

// param middlware
router.param('id',(req,res,next,id) => {
    console.log("id",id);
    let ID = +id;
    if(isNaN(ID)){
        res.status(400).send("Invalid Id");
        return;
    }
    req.id = ID;
    next();
 }); 
 


// Get all tasks
router.get('/', todoController.getAllTasks);

// Create a new task
router.post('/', todoController.createTask);

// Get a task
router.get('/:id', todoController.getTaskById);

// Update a task
router.put('/:id', todoController.updateTask);

// Toggle a task
router.patch('/:id', todoController.toggleTask);

// Delete a task
router.delete('/:id', todoController.deleteTask);



module.exports = router;
