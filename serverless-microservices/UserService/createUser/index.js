
require('../src/util/connect.js');
const UserModel = require('../src/models/userModel')

module.exports = async function (context, req) {
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
}