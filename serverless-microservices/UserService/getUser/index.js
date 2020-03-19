
require('../src/util/connect.js');
const UserModel = require('../src/models/userModel')

module.exports = async function (context, req) {
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