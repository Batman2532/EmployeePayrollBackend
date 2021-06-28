const model = require('../models/model');
const userService = require('../service/user')

class User {
    registerUser(req,res){
        userService.registerUser(req.body,(error,data)=>{
            if(error){
                res.status(500).send({
                    success: false, message: "Some error occurred while creating User"
                });
            }else{
                res.status(200).send({
                    success: true, message: "User created successfully!", data: data
                });
            }
        })
    }
}

module.exports = new User()