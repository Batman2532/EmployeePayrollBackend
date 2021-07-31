/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
 *
 * Purpose      : controller handles request and responses of crud operation
 *
 * @description  :modules need to be required before execution of this file 
 *
 * @file        : controller/employee.js
 * @overview    : Handles requests coming from clients for crud operations 
 * @module      : neccessary part (controller) of MVC Model of employee Payroll API
 * @author      : Saurabh
 * @version     : 1.0
 * @since       : 8-07-2021
 **********************************************************************************************************/

const empService = require('../service/employee')
const {employeeSchema} = require('../middlewares/employeeValidation')

class EmpController{

    createEmployee (req, res)  {
        const empData = {
            firstName : req.body.firstName, 
            lastName : req.body.lastName,
            email : req.body.email,
            department : req.body.department,
            salary : req.body.salary
        }  
        const result = employeeSchema.validate(empData)
        result.error ?
            res.status(422).send({
                success: false, message: result.error.details[0].message
            })
        
        :
        empService.createEmployee(empData,(error,data)=>{
            error?
                res.status(500).send({
                    success: false, message: "Some error occurred while creating Employee"
                })
            :
                res.status(200).send({
                    success: true, message: "Employee created successfully!", data: data
                });
            
        })
    }
    

    getEmployeesInfo (req,res){
        empService.getEmployeesInfo((error,data)=>{
            error?
                res.status(500).send({
                    success: false, message: "Some error occurred while retriving data"
                })
            :
                res.status(200).send({
                    success: true, message: "Employees retrived successfully!", data: data
                });
            
        });
    } 

    getEmployeeByID(req,res){
        let empId = req.params;
        empService.getEmployeeByID(empId,(error,data)=>{
            error?
                res.status(500).send({
                    success: false, message: "Some error occurred while retriving Employee"
                })
            :
                res.status(200).send({
                    success: true, message: "Employee retrived successfully!", data: data
                });
            
        });
    }

    updateById(req,res){
        let empId = req.params;
        const empData = {
            firstName : req.body.firstName, 
            lastName : req.body.lastName,
            email : req.body.email,
            department : req.body.department,
            salary : req.body.salary
        }  
        empService.updateById(empId,empData,(error,data)=>{
            error?
                res.status(500).send({
                    success: false, message: "Some error occurred while retriving Employee"
                })
            :
                res.status(200).send({
                    success: true, message: "Employee retrived successfully!", data: data
                })
            
        });

    }

    deleteById(req,res){
        let empId = req.params;
        empService.deleteById(empId,(error,data)=>{
            error?
                res.status(500).send({
                    success: false, message: "Some error occurred while retriving Employee"
                })
            :
                res.status(200).send({
                    success: true, message: "Employee retrived successfully!", data: data
                });
            
        });
    }
}

module.exports = new EmpController()