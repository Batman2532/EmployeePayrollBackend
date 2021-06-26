const empModel = require("../models/model")

class EmpService{
    createEmployee (empData,callBack) {
        empModel.createEmployee(empData,(error,data)=>{
            if(error){
                callBack(error,null)
            }else{
                callBack(null,data)
            }
        })
    }

    getEmployeesInfo(callBack){
        empModel.getEmployeesInfo((error,data)=>{
            if(error){
                callBack(error,null)
            }else{
                callBack(null,data)
            }
        })
    }

    getEmployeeByID(empId,callBack){
        empModel.getEmployeeByID(empId,(error,data)=>{
            if(error){
                callBack(error,null)
            }else{
                callBack(null,data)
            }
        })
    }

    updateById(empId,empData,callBack){
        empModel.updateById(empId,empData,(error,data)=>{
            if(error){
                callBack(error,null)
            }else{
                callBack(null,data)
            }
        })
    }

    deleteById(empId,callBack){
        empModel.deleteById(empId,(error,data)=>{
            if(error){
                callBack(error,null)
            }else{
                callBack(null,data)
            }
        })
    }
}
module.exports = new EmpService()     