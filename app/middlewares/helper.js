const bcrypt = require('bcrypt')

class Helper{

    checkPassword(userPassword,passwordFromDB){
        if(bcrypt.compareSync(userPassword,passwordFromDB)){
            return true
        }else{
            return false
        }
    }
}
module.exports = new Helper();