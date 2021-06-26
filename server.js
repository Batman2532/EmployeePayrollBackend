const express = require('express');
const dbConfig = require('./config/config.js');
const mongoose = require('mongoose');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))


// parse requests of content-type - application/json
app.use(express.json())

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
    // useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EmployeePayroll application."});
});

// Require Notes routes
require('./app/routes/routes')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});