const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z]{3,15}$/
    },
    lastName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z]{3,15}$/
    },
    email: {
        type: String,
        validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]+[a-zA-Z]+$/,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});
const UserModel = mongoose.model('User', UserSchema);

class UsersModule{
        registerUser(userData,callBack){
            try {
                const user = new UserModel({
                    firstName : userData.firstName,
                    lastName : userData.lastName,
                    email : userData.email,
                    password : userData.password
                });

                UserModel.findOne({email: user.email},(error,data)=>{
                    if(error){
                        callBack(error,null)
                    }else if(data == null){
                        user.save({},(error,data)=>{
                            if(error){
                                let error = "Some error occurred while creating User";
                                callBack(error,null)
                            }else{
                                callBack(null,data)
                            }
                        })
                    }else{
                        let error = "This email alresdy exists"
                        callBack(error,null)
                    }
                })
               
            } catch (error) {
                callBack(error,null)
            }
    }

    loginUser(loginDetails,callBack){
        try {
        
            UserModel.findOne({email: loginDetails.email},(error,data)=>{
                if(error){
                    callBack(error,null)
                }
                if(!data){
                    callBack(error,null)
                }
                else{
                    callBack(null,data)
                }
            })
        } catch (error) {
            return callBack(error,null)
        }
    }
}
module.exports = new UsersModule()