
require('../src/util/connect.js');
const UserModel = require('../src/models/userModel')


module.exports = async function (context, req) {
    let email = req.body.email;
    let password = req.body.password;
    storedUser = await UserModel.findOne({"email": email});
    if(password === storedUser.password){
        storedUser["password"] = null;
        context.res = {
            status: 200,
            body: storedUser
        }
    }
    else {
        context.res = {
            status: 403,
            body: "Unauthorized"
      }
    }
}