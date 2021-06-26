const empService = require('../service/service')

class EmpController{

    createEmployee (req, res)  {
        const empData = {
            firstName : req.body.firstName, 
            lastName : req.body.lastName,
            email : req.body.email,
            password : req.body.password
        }  
        empService.createEmployee(empData,(error,data)=>{
            if(error){
                res.status(500).send({
                    success: false, message: "Some error occurred while creating Employee"
                });
            }else{
                res.status(200).send({
                    success: true, message: "Employee created successfully!", data: data
                });
            }
        })
    }

    getEmployeesInfo (req,res){
        empService.getEmployeesInfo((error,data)=>{
            if(error){
                res.status(500).send({
                    success: false, message: "Some error occurred while retriving data"
                });
            }else{
                res.status(200).send({
                    success: true, message: "Employees retrived successfully!", data: data
                });
            }
        });
    }

    getEmployeeByID(req,res){
        let empId = req.params;
        empService.getEmployeeByID(empId,(error,data)=>{
            if(error){
                res.status(500).send({
                    success: false, message: "Some error occurred while retriving Employee"
                });
            }else{
                res.status(200).send({
                    success: true, message: "Employee retrived successfully!", data: data
                });
            }
        });
    }

    updateById(req,res){
        // // Validate Request
        // if(!req.body.content) {
        //     return res.status(400).send({
        //         message: "Employee content can not be empty"
        //     });
        // }
        let empId = req.params;
        const empData = {
            firstName : req.body.firstName, 
            lastName : req.body.lastName,
            email : req.body.email,
            password : req.body.password
        }  
        empService.updateById(empId,empData,(error,data)=>{
            if(error){
                res.status(500).send({
                    success: false, message: "Some error occurred while retriving Employee"
                })
            }else{
                res.status(200).send({
                    success: true, message: "Employee retrived successfully!", data: data
                })
            }
        });

    }

    deleteById(req,res){
        let empId = req.params;
        empService.deleteById(empId,(error,data)=>{
            if(error){
                res.status(500).send({
                    success: false, message: "Some error occurred while retriving Employee"
                });
            }else{
                res.status(200).send({
                    success: true, message: "Employee retrived successfully!", data: data
                });
            }
        });
    }
}

module.exports = new EmpController()