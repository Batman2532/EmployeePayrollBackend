/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                  
 * Purpose      : define user schema for database , use mongoose methods to perform db operations 
 *
 * @description  :modules need to be required before execution of this file  
 *
 * @file        : models/employee.js
 * @overview    : Provides schema for database and performs mongoose CRUD operations
 * @module      : neccessary to define user schema for database ,define functions accessed by services layer  
 * @author      : Saurabh
 * @version     : 1.0
 * @since       : 8-07-2021
 **********************************************************************************************************/
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const EmployeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z]{3,15}$/
    },
    lastName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z]{3,15}$/
    },
    email: {
        type: String,
        validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]+[a-zA-Z]+$/,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});
const EmployeeModel = mongoose.model('Employee', EmployeeSchema);

class EmployeesModel{
    
    createEmployee (empData,callBack) {
        const empInfo = new EmployeeModel({
            firstName : empData.firstName,
            lastName :  empData.lastName,
            email : empData.email,
            password : empData.password
        });
        empInfo.save({},(error,data)=>{
            error?
                callBack(error,null)
            :
                callBack(null,data)
        })
    }

    getEmployeesInfo(callBack){
        EmployeeModel.find({},(error,data)=>{
            error?
                callBack(error,null)
            :
                callBack(null,data)
        })
    }

    getEmployeeByID(empId,callBack){
        EmployeeModel.findById(empId.employeeId,(error,data)=>{
            error?
                callBack(error,null)
            :
                callBack(null,data)
        })
    }

    updateById(empId,empData,callBack){
        EmployeeModel.findByIdAndUpdate(empId.employeeId,{
            firstName : empData.firstName,
            lastName :  empData.lastName,
            email : empData.email,
            password : empData.password
        },{new : true},(error,data)=>{
            error?
                callBack(error,null)
            :
                callBack(null,data)
        });
    }

    deleteById(empId,callBack){
        EmployeeModel.findByIdAndDelete(empId.employeeId,(error,data)=>{
            error?
                callBack(error,null)
            :
                callBack(null,data)
        })
    }
}
module.exports = new EmployeesModel()