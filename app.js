require('dotenv').config({path: './config/config.env'});
const express = require('express');
const bodyParser = require('body-parser');
const { default: helmet } = require('helmet');
const mongoose = require('mongoose');

// Import routes
const tasksRoutes = require('./routes/tasks.routes');
const loginRoutes = require('./routes/login.routes');
const signupRoutes = require('./routes/signup.routes');
const userRoutes = require('./routes/user.routes');
const errorHandler = require('./middlewares/error.handler');

const app = express();
const port =  process.env.PORT ||  3000;


// Error handling
process.on('unhandledRejection', (err) => {
    console.log(`Logged Error: ${err}`);
    process.exit(1);
});

process.on('uncaughtException', (err)  => {
    console.log(`Logged Error: ${err}`);
    process.exit(1);
});

// 3rd party Middleware
app.use(helmet()); // Secure HTTP headers
app.use(bodyParser.json()); // Parse JSON request bodies


// Custom middleware



// Use routes
app.use('/api/signup' ,signupRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/login' ,loginRoutes);
app.use('/api/user', userRoutes);

// error handling middleware
app.use(errorHandler);

connect().catch(err => console.log(err));

async function connect() {
  await mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.aldvb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`);
}

  
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/api`);
});
