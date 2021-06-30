const userModel = require('../models/user')

class userService{
    registerUser(userData,callBack){
        try {
            userModel.registerUser(userData,(error,data)=>{
                if(error){
                    callBack(error,null)
                }else{
                    callBack(null,data)
                }
            })
        } catch (error) {
            callBack(error,null)
        }
    }

    loginUser(loginDetails,callBack){
        try {
            userModel.loginUser(loginDetails,(error,data)=>{
                if(error){
                    callBack(error,null)
                }else{
                    callBack(null,data)
                }
            })
        } catch (error) {
            callBack(error,null)
        }
    }
}

module.exports = new userService()