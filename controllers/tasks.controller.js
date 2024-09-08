const TodoModel = require('../models/tasks.model');


const getAllTasks = (req, res) => {
    const tasks = TodoModel.readData();
    res.json(tasks);
};


const getTaskById = (req, res) => {
    const task = TodoModel.getTaskById(req.id);
    console.log("task",req.id);
    res.json(task);
};

const createTask = (req, res) => {
    const newtask = TodoModel.createTask(req.body);
    res.send("added new task");
};

const updateTask = (req, res) => {
     const updatedTask = TodoModel.updateTask( req.id, req.body );
     if(updateTask) res.send("done");
     else res.send("task not found");
};

const toggleTask = (req, res) => { 
    const isCompleted = TodoModel.toggleTask(req.id);
    if(!isCompleted) res.send("task not found");
    else res.send('done');
};

const deleteTask = (req, res) => {
    const deletedTask = TodoModel.deleteTask(req.id);
    res.send(`task with id ${req.id} is deleted`);
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
    getTaskById
};
