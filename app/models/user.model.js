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
            const user = new UserModel({
                firstName : userData.firstName,
                lastName : userData.lastName,
                email : userData.email,
                password : userData.password
            });
            
            user.save({},(error,data)=>{
                if(error){
                    callBack(error,null)
                }else{
                    callBack(null,data)
                }
            })
        }
}

module.exports = new UsersModule()