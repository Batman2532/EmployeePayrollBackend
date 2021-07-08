const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config();

class Helper{

    checkPassword(userPassword,passwordFromDB){
        if(bcrypt.compareSync(userPassword,passwordFromDB)){
            return true
        }else{
            return false
        }
    }

    generateToken(userData){
        try {
            return jwt.sign(userData, process.env.KEY);
        } catch (error) {
            
        }
    }
}
module.exports = new Helper();