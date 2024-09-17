const tasksModel = require('../models/tasks.model');

class TaskController  {
    static getAllTasks = async (req, res) => {
        try {
            const tasks = await tasksModel.getTasksByUserId(req.userId);
            res.send(tasks);
        }
        catch(err){
            res.status(400).send(err);   
        }
    };

    static createTask = async (req, res) => {
        try {
        req.body.userId = req.userId;
        const newtask = await tasksModel.createTask(req.body);
        res.send({ message: "task is created", result: newtask });
        }
        catch(err){
            res.status(400).send(err);
        }

    };



    static getTaskById = async (req, res) => {
        try {
            const task = await tasksModel.getTaskById(req.userId , req.id);
            if(task) res.send({ message: "task found", result : task });
            else res.send({ message: "task not found", result : null })
        }
        catch(err){
            res.status(400).send(err);
        }
    };


    static updateTask =  async (req, res) => {
        try { 
        const updatedTask = await tasksModel.updateTaskById(req.userId , req.id, req.body );
        res.send({
                message: "task is updated",
                result: updatedTask
        });
        }
        catch(err){
        res.status(400).send(err);
        }
    }

    static toggleTask = async (req, res) => {
        try { 
            const isCompleted =  await tasksModel.toggleTask(req.userId , req.id);
            if(!isCompleted) res.status(400).send({ message: "task not found"});
            else res.send({ message: "task is toggled"});
        }
        catch(err){
            res.status(400).send(err);
        }
    };

    static deleteTask = async (req, res) => {
        try { 
            const deletedTask = await tasksModel.deleteTaskById(req.userId , req.id);
            if(deletedTask == null) 
                res.send({ message: "task not found", result: null});
            else res.send({ message: "task is deleted", result: deletedTask });
        }
        catch(err){
            res.status(400).send(err);
        }
};

}


module.exports = TaskController;
