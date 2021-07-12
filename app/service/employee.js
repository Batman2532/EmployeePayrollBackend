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