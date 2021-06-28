const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
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
                                let errorValue = "Some error occurred while creating User";
                                callBack(errorValue,null)
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
}
module.exports = new UsersModule()