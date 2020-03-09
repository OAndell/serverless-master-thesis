require('../util/connect.js');
const UserModel = require('../models/userModel')



module.exports.createUser = async function(context, req) {
    var newUser = new UserModel(req.body);
        await newUser.save().then(()=>{
            context.res = {
                status: 200,
                body: 'User Created',
              };
        }).catch((err) => {
            context.res = {
                status: 400,
                body: err,
              };
        });
};
  
module.exports.getUser = async function(context, req) {
    let userID = req.query.userID
    if(req.query.userID){
        users = await UserModel.findOne({"id": userID},  '-password');
    }
    else{
        users = await UserModel.find({}, '-password');
    }
    context.res = {
      status: 200,
      body: users,
    };
}


module.exports.login = async function(context, req) {
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