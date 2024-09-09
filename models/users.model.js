const mongoose = require('mongoose');
const bycrypt = require('bcrypt');
const { Schema } = mongoose;


const userSchema = new Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  });


userSchema.statics = {
    async createUser(userData) {
      try {
        return await this.create(userData);
      } catch (error) {
        throw new Error('Error creating user');
      }
    },
  
    async getAllUsers() {
      try {
        return await this.find({});
      } catch (error) {
        throw new Error('Error fetching users');
      }
    },
  
    async getUserById(id) {
      try {
        return await this.findById(id , {__v: 0});
      } catch (error) {
        throw new Error('Error fetching user by ID');
      }
    },
    async getUserByemail(email) {
      try {
        return await this.findOne( {email : email } , {__v: 0} );
      } catch (error) {
        throw new Error('Error fetching user by Email');
      }
    },
  
    async updateUserById(id, updateData) {
      try {
        return await this.findByIdAndUpdate(id, updateData, {
          new: true,
          runValidators: true,
        });
      } catch (error) {
        throw new Error('Error updating user by ID');
      }
    },
  
    async deleteUserById(id) {
      try {
        return await this.findByIdAndDelete(id);
      } catch (error) {
        throw new Error('Error deleting user by ID');
      }
    },
  };
  

userSchema.methods = {
    async comparePassword(password) { 
      try {
        const isMatch = await bycrypt.compare( password , this.password );
        return isMatch;
      }
      catch(err){
        return Error("Error in compare password"); 
      }
    }

  };

// Create the models
const usersModel = mongoose.model('User', userSchema);
module.exports = usersModel;