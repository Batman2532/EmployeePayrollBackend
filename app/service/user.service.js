const userModel = require('../models/user.model')

class userService{
    registerUser(userData,callBack){
        userModel.registerUser(userData,(error,data)=>{
            if(error){
                callBack(error,null)
            }else{
                callBack(null,data)
            }
        })
    }
}

module.exports = new userService()