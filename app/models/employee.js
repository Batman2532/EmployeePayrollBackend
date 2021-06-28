const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
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
            if(error){
                callBack(error,null)
            }else{
                callBack(null,data)
            }
        })
    }

    getEmployeesInfo(callBack){
        EmployeeModel.find({},(error,data)=>{
            if(error){
                callBack(error,null)
            }else{
                callBack(null,data)
            }
        })
    }

    getEmployeeByID(empId,callBack){
        EmployeeModel.findById(empId.employeeId,(error,data)=>{
            if(error){
                callBack(error,null)
            }else{
                callBack(null,data)
            }
        })
    }

    updateById(empId,empData,callBack){
        EmployeeModel.findByIdAndUpdate(empId.employeeId,{
            firstName : empData.firstName,
            lastName :  empData.lastName,
            email : empData.email,
            password : empData.password
        },{new : true},(error,data)=>{
            if(error){
                callBack(error,null)
            }else{
                callBack(null,data)
            }
        });
    }

    deleteById(empId,callBack){
        EmployeeModel.findByIdAndDelete(empId.employeeId,(error,data)=>{
            if(error){
                callBack(error,null)
            }else{
                callBack(null,data)
            }
        })
    }
}
module.exports = new EmployeesModel()