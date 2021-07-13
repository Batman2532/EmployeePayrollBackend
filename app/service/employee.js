/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
 *
 * Purpose      : services layer handles the actual business logic of our application
 *
 * @description  :modules need to be required before execution of this file  
 *
 * @file        : services/employee.js
 * @overview    : Performs tasks to interact with controller and model layer
 * @module      : calls functions from model layer which involves db operations & return response to controller  
 * @author      : Saurabh
 * @version     : 1.0
 * @since       : 8-07-2021
 **********************************************************************************************************/
const empModel = require("../models/employee")

class EmpService{
    createEmployee (empData,callBack) {
        empModel.createEmployee(empData,(error,data)=>{
            error?
                callBack(error,null)
            :
                callBack(null,data)
            
        })
    }

    getEmployeesInfo(callBack){
        empModel.getEmployeesInfo((error,data)=>{
            error?
                callBack(error,null)
            :
                callBack(null,data)
        })
    }

    getEmployeeByID(empId,callBack){
        empModel.getEmployeeByID(empId,(error,data)=>{
            error?
                callBack(error,null)
            :
                callBack(null,data)
        })
    }

    updateById(empId,empData,callBack){
        empModel.updateById(empId,empData,(error,data)=>{
            error?
                callBack(error,null)
            :
                callBack(null,data)
        })
    }

    deleteById(empId,callBack){
        empModel.deleteById(empId,(error,data)=>{
            error?
                callBack(error,null)
            :
                callBack(null,data)
        })
    }
}
module.exports = new EmpService()     