const express = require('express');
const bodyParser = require('body-parser');
const tasksRoutes = require('./routes/tasks.routes'); // Import routes
const logging = require('./middlewares/logging');
const { default: helmet } = require('helmet');

const app = express();
const port =  process.env.PORT ||  3000;



// 3rd party Middleware
app.use(helmet()); // Secure HTTP headers
app.use(bodyParser.json()); // Parse JSON request bodies


// Custom middleware
app.use(logging); // Log requests


// Use routes
app.use('/api', tasksRoutes);


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/api`);
});
