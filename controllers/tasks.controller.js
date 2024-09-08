const TodoModel = require('../models/tasks.model');


class TaskController  {
    static getAllTasks = async (req, res) => {
        try {
            const tasks = await TodoModel.getAllTasks();
            res.send(tasks);
        }
        catch(err){
            res.status(400).send(err);   
        }

    };

    static createTask = async (req, res) => {
        try {
        const newtask = await TodoModel.createTask(req.body);
        res.send({ message: "task is created", result: newtask });
        }
        catch(err){
            res.status(400).send(err);
        }

    };



    static getTaskById = async (req, res) => {
        try {
            const task = await TodoModel.getTaskById(req.id);
            if(task) res.send({ message: "task found", result : task });
            else res.send({ message: "task not found", result : null })
        }
        catch(err){
            res.status(400).send(err);
        }
    };


    static updateTask =  async (req, res) => {
        try { 
        const updatedTask = await TodoModel.updateTaskById( req.id, req.body );
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
            const isCompleted =  await TodoModel.toggleTask(req.id);
            if(!isCompleted) res.status(400).send({ message: "task not found"});
            else res.send({ message: "task is toggled"});
        }
        catch(err){
            res.status(400).send(err);
        }
    };

    static deleteTask = async (req, res) => {
        try { 
            const deletedTask = await TodoModel.deleteTaskById(req.id);
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
