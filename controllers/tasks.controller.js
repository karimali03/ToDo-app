const tasksModel = require('../models/tasks.model');
const asyncFun = require('../middlewares/async.function');

class TaskController  {
    static getAllTasks = asyncFun( async (req, res) => {
            const tasks = await tasksModel.getTasksByUserId(req.userId);
            res.send(tasks);
    });

    static createTask = asyncFun( async (req, res) => {
        req.body.userId = req.userId;
        const newtask = await tasksModel.createTask(req.body);
        res.send({ message: "task is created", result: newtask });
    });



    static getTaskById = asyncFun( async (req, res) => {
            const task = await tasksModel.getTaskById(req.userId , req.id);
            if(task) res.send({ message: "task found", result : task });
            else res.send({ message: "task not found", result : null });
    });


    static updateTask = asyncFun( async (req, res) => {
        const updatedTask = await tasksModel.updateTaskById(req.userId , req.id, req.body );
        res.send({
                message: "task is updated",
                result: updatedTask
        });
    });

    static toggleTask = asyncFun ( async (req, res) => {
            const isCompleted =  await tasksModel.toggleTask(req.userId , req.id);
            if(!isCompleted) res.status(400).send({ message: "task not found"});
            else res.send({ message: "task is toggled"});
    });

    static deleteTask = asyncFun( async (req, res) => {
            const deletedTask = await tasksModel.deleteTaskById(req.userId , req.id);
            if(deletedTask == null) 
                res.send({ message: "task not found", result: null});
            else res.send({ message: "task is deleted", result: deletedTask });
    });

}


module.exports = TaskController;
