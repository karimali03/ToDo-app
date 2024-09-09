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
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true, // A task must be linked to a user
    }
});

// statics functions ( model level functions )
  taskSchema.statics = {
    async createTask(taskData) {
      try {
        return await this.create(taskData);
      } catch (error) {
        throw new Error('Error creating task');
      }
    },
  
    async getTasksByUserId(userId) {
      try {
        return await this.find({ userId });
      } catch (error) {
        throw new Error('Error fetching tasks for user');
      }
    },
  
    async getTaskById(taskId) {
      try {
        return await this.findById(taskId);
      } catch (error) {
        throw new Error('Error fetching task by ID');
      }
    },
  
    async updateTaskById(taskId, updateData) {
      try {
        return await this.findByIdAndUpdate(taskId, updateData, {
          new: true,
          runValidators: true,
        });
      } catch (error) {
        throw new Error('Error updating task by ID');
      }
    },
  
    async deleteTaskById(taskId) {
      try {
        return await this.findByIdAndDelete(taskId);
      } catch (error) {
        throw new Error('Error deleting task by ID');
      }
    },
  
    async toggleTaskCompletion(taskId) {
      try {
        const task = await this.findById(taskId);
        if (!task) throw new Error('Task not found');
        task.isCompleted = !task.isCompleted;
        await task.save();
        return task;
      } catch (error) {
        throw new Error('Error toggling task completion');
      }
    },
  };



const tasksModel = mongoose.model('Task', taskSchema);
module.exports = tasksModel;