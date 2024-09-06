const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/tasks.json');


class TaskModel {
    static readData() {
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    }

    static writeData(tasks) {
        fs.writeFileSync(dataPath, JSON.stringify(tasks, null, 2), 'utf8');
    }
    
    static getTaskById(id) {
        const tasks = this.readData();
        return tasks.find(task => task.id === id);
    }

    static createTask(task) {
        const tasks = this.readData();
        const newTask = { id: tasks.length + 1 , 
            title :task.title ,
             description : task.description,
              isCompleted: false };
    
        tasks.push(newTask);
        this.writeData(tasks);
        return newTask;
    }

    static updateTask(id, updates) {
        let tasks = this.readData();
        let taskIndex = tasks.findIndex(task => task.id === id);
        if(taskIndex === -1) return false;
        tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
        this.writeData(tasks);
        return true;
    }

    static toggleTask(id) {
        let tasks = this.readData();
        let taskIndex = tasks.findIndex(task => task.id === id);
        if(taskIndex === -1) return false;
        tasks[taskIndex].isCompleted = !tasks[taskIndex].isCompleted;
        this.writeData(tasks);
        return true;
    }

    static deleteTask(id) {
        let tasks = this.readData();
        tasks = tasks.filter(task => task.id !== id);
        this.writeData(tasks);
        return id;
    }


}


module.exports = TaskModel;
