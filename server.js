const express = require('express');
const dbConfig = require('./config/config.js');
require('dotenv').config();
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

//connecting to database
dbConfig();

// parse requests of content-type - application/json
app.use(express.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EmployeePayroll application."});
});

// Require Notes routes
require('./app/routes/routes')(app);

// listen for requests
app.listen(process.env.PORT, () => {
    console.log("Server is listening on port "+process.env.PORT);
});