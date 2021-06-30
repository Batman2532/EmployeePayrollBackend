module.exports = (app) => {
    const empPayroll = require('../controllers/employee');
    const user = require('../controllers/user')
    //Create a new User
    app.post('/registerUser', user.registerUser);

    //User Login
    app.post('/login',user.loginUser);

    // Create a new Employee
    app.post('/empPayroll', empPayroll.createEmployee);

    // Retrieve all Empployee
    app.get('/empPayroll', empPayroll.getEmployeesInfo);

    // Retrieve a single Employee with employeeId
    app.get('/empPayroll/:employeeId', empPayroll.getEmployeeByID);

    // Update a Employee with employeeId
    app.put('/empPayroll/:employeeId', empPayroll.updateById);

    // Delete a Employee with employeeId
    app.delete('/empPayroll/:employeeId', empPayroll.deleteById);
}