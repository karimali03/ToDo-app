const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        minlength: [1, 'Description must be at least 1 character']
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    }
});

// statics functions ( model level functions )

taskSchema.statics.createTask = async function(task){
    return await this.create(task);
}

taskSchema.statics.getAllTasks = async function(){
    return await this.find({}, {__v: 0});
}

taskSchema.statics.getTaskById = async function(id){
    return await this.findById(id);
}


taskSchema.statics.updateTaskById = async function(id, update){
       return await this.findByIdAndUpdate(id , update , 
        { new : true,runValidators : true });
}

taskSchema.statics.deleteTaskById = async function(id){
    return await this.findByIdAndDelete(id);
}

taskSchema.statics.toggleTask = async function(id){
    const task = await this.findById(id);
    if(!task) return false;
    task.isCompleted = !task.isCompleted;
    await task.save();
    return true;
}


const Task = mongoose.model('Task', taskSchema);
module.exports = Task;