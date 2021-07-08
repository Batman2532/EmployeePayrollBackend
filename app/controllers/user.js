const userService = require('../service/user')
const {userSchema} = require('../middlewares/userValidation')

class User {

    registerUser(req,res){
        try {
            const userData = {
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
                password : req.body.password
            }

            const result = userSchema.validate(userData)
        if(result.error){
            res.status(422).send({
                success: false, message: result.error.details[0].message
            })
        }
        else{
            userService.registerUser(userData,(error,data)=>{
                if(error){
                    res.status(500).send({
                        success: false, message: "...."
                    });
                }else{
                    res.status(200).send({
                        success: true, message: "User created successfully!", data: data
                    });
                }
            })
        }
        } catch (error) {
            return res.send({message:error})
        }
        
    }

    loginUser(req,res){
        try {
            const loginDetails = {
                email: req.body.email,
                password: req.body.password
            }    
            userService.loginUser(loginDetails,(error,data)=>{
                if(error){
                    res.status(500).send({
                        success: false, message: "Please enter correct user credentials"
                    });
                }else{
                    res.status(200).send({
                        success: true, message: "User login successfully!", data: data
                    });
                }
            })
        } catch (error) {
            return res.send({message:error})
        }
    }
}

module.exports = new User()